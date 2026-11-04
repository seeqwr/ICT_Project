"""Backend сайта «Умный помощник HR» (Участник 3).

Запуск:  python server.py   ->  http://127.0.0.1:5000
Эндпоинты:
  GET  /health      проверка, что сервер жив
  POST /predict     {"text": "..."} -> категория, проценты, навыки (+ сохранение в БД)
  GET  /candidates  история проверок (?category=Data Science&limit=50)
  GET  /stats       данные для дашборда
"""
import re
import sqlite3
from datetime import datetime, timezone

from flask import Flask, jsonify, request
from flask_cors import CORS

DB_PATH = "hr.db"
MIN_LEN, MAX_LEN = 20, 20000

app = Flask(__name__)
CORS(app)  # чтобы страница (другой порт или GitHub Pages) могла обращаться к API

# ---------------------------------------------------------------------------
# 1. Модель. День 1: заглушка по ключевым словам. День 2: подключаем model.py
#    Участника 1 проекта: функция predict(text) -> (категория, {категория: вероятность})
# ---------------------------------------------------------------------------
CATS = {
    "Data Science": ["python", "pandas", "numpy", "scikit-learn", "sklearn", "nlp", "tensorflow",
                     "pytorch", "sql", "tf-idf", "статистика", "машинное обучение", "анализ данных"],
    "Веб-разработка": ["javascript", "react", "html", "css", "typescript", "node.js", "vue",
                       "django", "flask", "rest api", "frontend", "backend"],
    "Java-разработка": ["java", "spring", "hibernate", "maven", "kotlin", "junit"],
    "DevOps": ["docker", "kubernetes", "ci/cd", "jenkins", "terraform", "linux", "ansible", "aws"],
    "Тестирование": ["selenium", "pytest", "тестирование", "qa", "postman", "автотесты", "jira"],
    "HR-менеджмент": ["рекрутинг", "подбор персонала", "адаптация", "hr", "onboarding", "интервью"],
}

try:
    from model import predict as real_predict  # файл model.py из ML-части проекта
except ImportError:
    real_predict = None


def find_skills(text):
    low = text.lower()
    found = []
    for words in CATS.values():
        for w in words:
            if re.search(r"(?<!\w)" + re.escape(w) + r"(?!\w)", low) and w not in found:
                found.append(w)
    return found


def stub_predict(text):
    low = text.lower()
    counts = {}
    for cat, words in CATS.items():
        counts[cat] = sum(
            1 for w in words if re.search(r"(?<!\w)" + re.escape(w) + r"(?!\w)", low)
        )
    total = sum(counts.values())
    if total == 0:
        return None, {c: 0.0 for c in CATS}
    scores = {c: round(n / total, 3) for c, n in counts.items()}
    return max(scores, key=scores.get), scores


def run_model(text):
    """Возвращает (категория, scores). Берёт настоящую модель, если она подключена."""
    if real_predict is not None:
        category, scores = real_predict(text)
        return category, scores
    return stub_predict(text)


# ---------------------------------------------------------------------------
# 2. База данных SQLite
# ---------------------------------------------------------------------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as db:
        db.execute(
            """CREATE TABLE IF NOT EXISTS candidates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                category TEXT,
                score REAL,
                skills TEXT,
                resume_text TEXT NOT NULL
            )"""
        )


def error(message, code=400):
    return jsonify({"error": message}), code


# ---------------------------------------------------------------------------
# 3. Эндпоинты
# ---------------------------------------------------------------------------
@app.get("/health")
def health():
    return jsonify({"status": "ok", "model": "real" if real_predict else "stub"})


@app.post("/predict")
def predict():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or not isinstance(data.get("text"), str):
        return error('Ожидается JSON вида {"text": "..."}')
    text = data["text"].strip()
    if len(text) < MIN_LEN:
        return error(f"Резюме слишком короткое (минимум {MIN_LEN} символов)")
    if len(text) > MAX_LEN:
        return error(f"Резюме слишком длинное (максимум {MAX_LEN} символов)", 413)

    try:
        category, scores = run_model(text)
    except Exception as exc:  # ошибка модели не должна ронять сервер
        return error(f"Ошибка модели: {exc}", 500)

    skills = find_skills(text)
    top_score = scores.get(category, 0.0) if category else 0.0

    with get_db() as db:
        cur = db.execute(
            "INSERT INTO candidates (created_at, category, score, skills, resume_text) VALUES (?,?,?,?,?)",
            (datetime.now(timezone.utc).isoformat(timespec="seconds"),
             category, top_score, ",".join(skills), text),
        )
        new_id = cur.lastrowid

    return jsonify({"id": new_id, "category": category, "scores": scores, "skills": skills})


@app.get("/candidates")
def candidates():
    category = request.args.get("category")
    try:
        limit = min(max(int(request.args.get("limit", 50)), 1), 200)
    except ValueError:
        return error("limit должен быть числом")

    query = "SELECT id, created_at, category, score, skills, substr(resume_text, 1, 200) AS preview FROM candidates"
    params = []
    if category:
        query += " WHERE category = ?"
        params.append(category)
    query += " ORDER BY id DESC LIMIT ?"
    params.append(limit)

    with get_db() as db:
        rows = db.execute(query, params).fetchall()
    items = [
        {**dict(r), "skills": [s for s in (r["skills"] or "").split(",") if s]} for r in rows
    ]
    return jsonify({"count": len(items), "items": items})


@app.get("/stats")
def stats():
    with get_db() as db:
        total = db.execute("SELECT COUNT(*) FROM candidates").fetchone()[0]
        by_cat = db.execute(
            "SELECT COALESCE(category, 'Не определено') AS category, COUNT(*) AS n "
            "FROM candidates GROUP BY category ORDER BY n DESC"
        ).fetchall()
        avg = db.execute("SELECT AVG(score) FROM candidates WHERE category IS NOT NULL").fetchone()[0]
        skill_rows = db.execute("SELECT skills FROM candidates WHERE skills != ''").fetchall()

    skill_count = {}
    for r in skill_rows:
        for s in r["skills"].split(","):
            skill_count[s] = skill_count.get(s, 0) + 1
    top_skills = sorted(skill_count.items(), key=lambda kv: kv[1], reverse=True)[:10]

    return jsonify({
        "total": total,
        "avg_score": round(avg, 3) if avg is not None else None,
        "by_category": [{"category": r["category"], "count": r["n"]} for r in by_cat],
        "top_skills": [{"skill": s, "count": n} for s, n in top_skills],
    })


init_db()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
