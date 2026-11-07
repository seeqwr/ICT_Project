"""ML-часть проекта: TF-IDF + Logistic Regression.

Что делает файл:
  - predict(text) -> (категория, {категория: вероятность})  # её вызывает server.py
  - если рядом лежит resumes.csv (колонки: text,category), обучается на нём;
    иначе на учебном наборе, который генерируется из словарей навыков (см. ниже)
  - обученная модель сохраняется в model.joblib и дальше загружается из него

Переобучить:  python model.py
"""
import os
import random

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(HERE, "model.joblib")
CSV_PATH = os.path.join(HERE, "resumes.csv")

SKILLS = {
    "Data Science": ["python", "pandas", "numpy", "scikit-learn", "nlp", "tensorflow", "pytorch",
                     "sql", "tf-idf", "статистика", "машинное обучение", "анализ данных",
                     "визуализация данных", "jupyter", "классификация", "регрессия"],
    "Веб-разработка": ["javascript", "react", "html", "css", "typescript", "node.js", "vue",
                       "django", "flask", "rest api", "frontend", "backend", "вёрстка", "webpack"],
    "Java-разработка": ["java", "spring", "hibernate", "maven", "kotlin", "junit", "микросервисы",
                        "spring boot", "jpa", "gradle", "kafka"],
    "DevOps": ["docker", "kubernetes", "ci/cd", "jenkins", "terraform", "linux", "ansible", "aws",
               "gitlab ci", "prometheus", "grafana", "bash", "мониторинг"],
    "Тестирование": ["selenium", "pytest", "тестирование", "qa", "postman", "автотесты", "jira",
                     "тест-кейсы", "баг-репорты", "регрессионное тестирование", "testrail"],
    "HR-менеджмент": ["рекрутинг", "подбор персонала", "адаптация", "hr", "onboarding", "интервью",
                      "кадровое делопроизводство", "оценка персонала", "обучение сотрудников",
                      "hh.ru", "линкедин", "мотивация персонала"],
}
COMMON = ["git", "английский язык", "командная работа", "коммуникабельность", "ответственность"]
INTROS = ["Опыт работы:", "Навыки:", "Владею:", "Ключевые компетенции:", "Использую в работе"]
ROLES = ["Junior специалист.", "Middle специалист.", "Опыт 2 года.", "Опыт 3 года.", "Стажёр."]


def synthetic_dataset(per_class=200, seed=42):
    """Учебные резюме: навыки своей категории + шум из других + общие слова."""
    rnd = random.Random(seed)
    texts, labels = [], []
    cats = list(SKILLS)
    for cat in cats:
        others = [s for c in cats if c != cat for s in SKILLS[c]]
        for _ in range(per_class):
            own = rnd.sample(SKILLS[cat], rnd.randint(3, min(8, len(SKILLS[cat]))))
            noise = rnd.sample(others, rnd.randint(0, 2))
            common = rnd.sample(COMMON, rnd.randint(1, 2))
            words = own + noise + common
            rnd.shuffle(words)
            texts.append(f"{rnd.choice(ROLES)} {rnd.choice(INTROS)} " + ", ".join(words) + ".")
            labels.append(cat)
    return texts, labels


def load_dataset():
    if os.path.exists(CSV_PATH):
        import csv
        with open(CSV_PATH, encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        return [r["text"] for r in rows], [r["category"] for r in rows], "resumes.csv"
    texts, labels = synthetic_dataset()
    return texts, labels, "учебный набор (синтетика)"


def build_pipeline():
    return Pipeline([
        ("tfidf", TfidfVectorizer(lowercase=True, ngram_range=(1, 2), sublinear_tf=True,
                                  token_pattern=r"(?u)\w[\w\.\+#/-]*\w|\w")),
        ("clf", LogisticRegression(max_iter=1000, C=5.0)),
    ])


def train(verbose=True):
    texts, labels, source = load_dataset()
    X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.2,
                                              random_state=42, stratify=labels)
    pipe = build_pipeline().fit(X_tr, y_tr)
    if verbose:
        pred = pipe.predict(X_te)
        print(f"Данные: {source}, резюме: {len(texts)}")
        print(f"Accuracy на тесте: {accuracy_score(y_te, pred):.3f}")
        print(classification_report(y_te, pred))
    pipe = build_pipeline().fit(texts, labels)  # финальная модель на всех данных
    joblib.dump(pipe, MODEL_PATH)
    return pipe


_pipe = None


def _get_pipe():
    global _pipe
    if _pipe is None:
        _pipe = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else train(verbose=False)
    return _pipe


def predict(text):
    """Возвращает (категория, {категория: вероятность}).
    Если в тексте нет ни одного слова, известного модели, категория = None."""
    pipe = _get_pipe()
    if pipe.named_steps["tfidf"].transform([text]).nnz == 0:
        return None, {str(c): 0.0 for c in pipe.classes_}
    probs = pipe.predict_proba([text])[0]
    scores = {str(c): round(float(p), 3) for c, p in zip(pipe.classes_, probs)}
    return max(scores, key=scores.get), scores


if __name__ == "__main__":
    train()
    print("Модель сохранена в", MODEL_PATH)
    print(predict("Junior Data Scientist. Python, pandas, SQL, анализ данных"))
