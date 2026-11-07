// ===================================================================
// MODEL-START  (часть без DOM — её можно перенести на сервер / в Node)
// ===================================================================
const TRAINING_DATA = [
  // ---------- IT ----------
  ["Data Science", "Data Scientist, 3 года опыта в машинном обучении. Python, pandas, numpy, scikit-learn, PyTorch. Модели классификации и регрессии, анализ данных, SQL, Jupyter."],
  ["Data Science", "ML engineer: нейронные сети, deep learning, TensorFlow, PyTorch, NLP, computer vision, статистика, feature engineering, MLOps, Kaggle."],
  ["Data Science", "Аналитик данных: Python, SQL, pandas, визуализация matplotlib, A/B тесты, статистический анализ, дашборды Power BI, продуктовые метрики."],
  ["Data Science", "Junior data scientist: machine learning, scikit-learn, data mining, обработка текстов, TF-IDF, кластеризация, градиентный бустинг CatBoost, математическая статистика."],
  ["Data Science", "Big Data инженер: Spark, Hadoop, Airflow, ETL пайплайны, хранилища данных, ClickHouse, прогнозирование временных рядов, LLM, RAG."],

  ["Frontend", "Frontend разработчик: HTML, CSS, JavaScript, React, TypeScript, Redux, Tailwind, адаптивная верстка, Webpack, Figma."],
  ["Frontend", "Верстка и UI: Vue.js, JavaScript, SCSS, HTML5, CSS3, адаптивный дизайн, Git, интерфейсы, компоненты, браузерная разработка."],
  ["Frontend", "Frontend engineer: React, Next.js, TypeScript, оптимизация производительности, REST API на клиенте, Jest, UI/UX, верстка по макетам."],
  ["Frontend", "Web-разработчик интерфейсов: JavaScript, jQuery, Bootstrap, HTML, CSS, Angular, SPA, анимации, кроссбраузерность, Git."],
  ["Frontend", "Фронтенд-разработчик: Svelte, Vite, TypeScript, веб-доступность, SSR, Storybook, дизайн-система компонентов, CSS-анимации."],

  ["Backend", "Backend разработчик: Python, FastAPI, Django, PostgreSQL, Docker, REST API, Redis, микросервисы, Git, Linux."],
  ["Backend", "Java backend: Spring Boot, Hibernate, SQL, MySQL, микросервисы, Kafka, Docker, проектирование API, серверная логика."],
  ["Backend", "Backend engineer: Node.js, Express, MongoDB, REST API, аутентификация JWT, Docker, базы данных, оптимизация запросов."],
  ["Backend", "Серверный разработчик: Python, Flask, SQLAlchemy, PostgreSQL, Celery, RabbitMQ, разработка API и бэкенд-сервисов."],
  ["Backend", "Backend на PHP и C#: Laravel, Symfony, .NET, ASP.NET Core, Entity Framework, MS SQL, Go, gRPC, высоконагруженные сервисы."],

  ["Mobile", "iOS разработчик: Swift, SwiftUI, UIKit, Xcode, Core Data, публикация в App Store, архитектура MVVM."],
  ["Mobile", "Android разработчик: Kotlin, Java, Jetpack Compose, Android Studio, Retrofit, Room, Google Play, Coroutines."],
  ["Mobile", "Мобильный разработчик Flutter: Dart, кроссплатформенные приложения для iOS и Android, Firebase, push-уведомления, BLoC."],
  ["Mobile", "React Native разработчик: мобильные приложения, Expo, нативные модули, публикация в магазинах приложений, мобильная разработка."],
  ["Mobile", "Mobile developer: разработка мобильных приложений, Kotlin Multiplatform, Swift, офлайн-режим, мобильная аналитика, смартфоны и планшеты."],

  ["DevOps", "DevOps инженер: Docker, Kubernetes, Terraform, Ansible, CI/CD, GitLab CI, Jenkins, мониторинг Prometheus Grafana, Linux."],
  ["DevOps", "SRE: облачная инфраструктура AWS, GCP, автоматизация развертывания, Helm, отказоустойчивость, логирование ELK, инциденты, on-call."],
  ["DevOps", "Системный администратор: Linux, Windows Server, сети, Active Directory, виртуализация VMware, резервное копирование, bash скрипты."],
  ["DevOps", "Cloud engineer: Azure, AWS, инфраструктура как код, Terraform, Kubernetes, сетевые политики, оптимизация затрат на облако."],
  ["DevOps", "Платформенный инженер: CI/CD пайплайны, ArgoCD, контейнеризация, Nginx, балансировка нагрузки, алертинг, администрирование серверов."],

  ["QA", "QA инженер: ручное тестирование, тест-кейсы, чек-листы, баг-репорты, Jira, TestRail, Postman, регрессионное тестирование."],
  ["QA", "Automation QA: Selenium, Pytest, Python, автотесты, CI/CD, API тестирование, Postman, Git, тест-планы."],
  ["QA", "Тестировщик ПО: функциональное тестирование, тест-дизайн, SQL запросы к БД, Jira, баг-трекинг, мобильное тестирование."],
  ["QA", "QA Engineer: Cypress, Playwright, JavaScript, автоматизация тестирования, нагрузочное тестирование JMeter, тестовая документация, Agile."],
  ["QA", "Тестировщик игр и приложений: исследовательское тестирование, тест-кейсы, баг-репорты, проверка на разных устройствах, TestFlight, smoke тесты."],

  ["Кибербезопасность", "Специалист по информационной безопасности: пентест, анализ уязвимостей, OWASP, Burp Suite, Kali Linux, SIEM, реагирование на инциденты."],
  ["Кибербезопасность", "SOC аналитик: мониторинг событий безопасности, SIEM Splunk, анализ логов, вредоносное ПО, IDS IPS, расследование инцидентов ИБ."],
  ["Кибербезопасность", "Пентестер: тестирование на проникновение, эксплуатация уязвимостей, Metasploit, Nmap, веб-безопасность, отчеты для заказчика, CTF."],
  ["Кибербезопасность", "Инженер по защите информации: межсетевые экраны, DLP, криптография, политики доступа, ISO 27001, аудит информационной безопасности."],
  ["Кибербезопасность", "Security engineer: AppSec, безопасная разработка, статический анализ кода, управление уязвимостями, threat modeling, zero trust."],

  ["UI/UX и дизайн", "UI/UX дизайнер: Figma, прототипирование, пользовательские исследования, CJM, wireframes, дизайн-системы, юзабилити-тестирование."],
  ["UI/UX и дизайн", "Графический дизайнер: Adobe Photoshop, Illustrator, InDesign, фирменный стиль, логотипы, полиграфия, баннеры, типографика."],
  ["UI/UX и дизайн", "Продуктовый дизайнер: интервью с пользователями, гипотезы, макеты мобильных приложений, Figma, анимации интерфейса, UX-метрики."],
  ["UI/UX и дизайн", "Моушн-дизайнер: After Effects, Cinema 4D, анимация, 3D графика, визуальные эффекты, дизайн видеоконтента."],
  ["UI/UX и дизайн", "Веб-дизайнер: дизайн лендингов, Tilda, композиция, цвет, адаптивные макеты, иллюстрации, брендинг, креативность."],

  // ---------- Бизнес и управление ----------
  ["Управление проектами", "Project manager: управление проектами, Agile, Scrum, Kanban, планирование спринтов, Jira, Confluence, управление рисками, бюджет проекта."],
  ["Управление проектами", "Product manager: продуктовая стратегия, roadmap, приоритизация бэклога, анализ рынка, unit-экономика, CustDev, метрики роста."],
  ["Управление проектами", "Руководитель проектов: PMBOK, диаграмма Ганта, MS Project, координация команды, сроки и бюджет, отчетность перед заказчиком."],
  ["Управление проектами", "Scrum-мастер: фасилитация, ретроспективы, agile-коучинг, устранение блокеров, процессы команды, SAFe."],
  ["Управление проектами", "Бизнес-аналитик: сбор требований, BPMN, use cases, техническое задание, моделирование бизнес-процессов, UML, взаимодействие с заказчиком."],

  ["HR", "HR-менеджер: подбор персонала, рекрутинг, собеседования, адаптация сотрудников, кадровое делопроизводство, HR-бренд, оценка персонала."],
  ["HR", "Рекрутер: поиск кандидатов, закрытие вакансий, сорсинг, LinkedIn, hh.ru, интервью, онбординг, работа с резюме, ATS."],
  ["HR", "Специалист по персоналу: кадровый учет, трудовое законодательство, мотивация, обучение и развитие сотрудников, HR-аналитика, адаптация."],
  ["HR", "HR generalist: recruitment, onboarding, performance review, employee engagement, компенсации и льготы, корпоративная культура, soft skills."],
  ["HR", "Менеджер по обучению и развитию персонала: тренинги, оценка компетенций, кадровый резерв, корпоративный университет, вовлеченность сотрудников."],

  ["Маркетинг", "Маркетолог: SMM, таргетированная реклама, контент-план, Instagram, TikTok, продвижение бренда, анализ конкурентов, маркетинговая стратегия."],
  ["Маркетинг", "Интернет-маркетолог: SEO, контекстная реклама Google Ads, Яндекс Директ, Google Analytics, воронка, конверсия, email-маркетинг."],
  ["Маркетинг", "Бренд-менеджер: позиционирование бренда, маркетинговые исследования, запуск продуктов, ATL BTL кампании, работа с рекламными агентствами."],
  ["Маркетинг", "SMM-менеджер: ведение социальных сетей, сторис, рилсы, коммуникация с подписчиками, работа с блогерами, охваты и вовлеченность."],
  ["Маркетинг", "Performance-маркетолог: медиапланирование, CPA, ROMI, ретаргетинг, сквозная аналитика, рекламные кабинеты Meta и VK, лидогенерация."],

  ["Продажи", "Менеджер по продажам: холодные звонки, работа с возражениями, CRM Bitrix24, выполнение плана продаж, переговоры, заключение сделок."],
  ["Продажи", "Account manager B2B: ведение ключевых клиентов, коммерческие предложения, допродажи, AmoCRM, развитие клиентской базы, продажи."],
  ["Продажи", "Торговый представитель: мерчандайзинг, работа с торговыми точками, дистрибуция, выкладка товара, прием заказов, выполнение KPI."],
  ["Продажи", "Руководитель отдела продаж: построение отдела продаж, скрипты, обучение менеджеров, воронка продаж, прогноз выручки, мотивация продавцов."],
  ["Продажи", "Продавец-консультант: консультирование покупателей, кассовая дисциплина, работа в розничном магазине, клиентский сервис, продажи товаров."],

  ["Финансы и бухгалтерия", "Бухгалтер: 1С Бухгалтерия, первичная документация, налоговая отчетность, расчет заработной платы, банковские выписки, акты сверки."],
  ["Финансы и бухгалтерия", "Главный бухгалтер: МСФО, налоговое планирование, финансовая отчетность, НДС, КПН, взаимодействие с налоговыми органами, бухгалтерский учет."],
  ["Финансы и бухгалтерия", "Финансовый аналитик: финансовое моделирование, бюджетирование, Excel, DCF, анализ отклонений, управленческая отчетность, P&L."],
  ["Финансы и бухгалтерия", "Аудитор: внутренний аудит, проверка финансовой отчетности, внутренний контроль, финансовые риски, МСФО, ACCA."],
  ["Финансы и бухгалтерия", "Экономист: планирование затрат, себестоимость, казначейство, платежный календарь, кредитный анализ, банковское дело, инвестиции."],

  ["Юриспруденция", "Юрист: договорная работа, правовая экспертиза документов, судебная практика, гражданское право, претензионная работа, юридические консультации."],
  ["Юриспруденция", "Корпоративный юрист: сопровождение сделок M&A, корпоративное право, устав, собрание акционеров, комплаенс, due diligence."],
  ["Юриспруденция", "Адвокат: представительство в суде, уголовные и гражданские дела, исковые заявления, защита интересов доверителей, апелляции."],
  ["Юриспруденция", "Юрисконсульт: трудовое право, проверка договоров, нормативные правовые акты, лицензирование, взаимодействие с госорганами."],
  ["Юриспруденция", "Помощник юриста: оформление доверенностей, наследственные дела, регистрация юридических лиц, правовые базы Адилет, законодательство."],

  // ---------- Другие сферы ----------
  ["Медицина", "Врач-терапевт: диагностика и лечение пациентов, прием пациентов, назначение обследований, медицинская документация, профилактика заболеваний."],
  ["Медицина", "Медсестра: уход за пациентами, инъекции, капельницы, стерилизация, выполнение назначений врача, работа в стационаре больницы."],
  ["Медицина", "Фармацевт: отпуск лекарственных препаратов, консультирование по лекарствам, аптека, учет медикаментов, рецепты."],
  ["Медицина", "Врач-педиатр: осмотр детей, вакцинация, клиническое мышление, неотложная помощь, санитарные нормы, поликлиника."],
  ["Медицина", "Стоматолог: лечение кариеса, протезирование, эндодонтия, прием пациентов, рентген-диагностика, стоматологическая клиника."],

  ["Образование", "Учитель математики: преподавание в школе, подготовка к ЕНТ, разработка уроков, методика обучения, классное руководство, олимпиады."],
  ["Образование", "Преподаватель английского языка: IELTS, обучение взрослых и детей, учебные программы, разговорная практика, онлайн-уроки."],
  ["Образование", "Преподаватель университета: лекции, семинары, научные публикации, руководство дипломными работами, учебно-методические комплексы студентов."],
  ["Образование", "Воспитатель детского сада: развивающие занятия, работа с дошкольниками, педагогика, взаимодействие с родителями, режим дня."],
  ["Образование", "Методист и тьютор: разработка онлайн-курсов, e-learning, образовательные программы, педагогический дизайн, оценка знаний учеников."],

  ["Строительство и инженерия", "Инженер-строитель: проектирование зданий, AutoCAD, технический надзор, сметы, СНиП, строительная площадка, исполнительная документация."],
  ["Строительство и инженерия", "Инженер-конструктор: SolidWorks, КОМПАС-3D, чертежи, расчет конструкций, сопромат, разработка деталей и узлов оборудования."],
  ["Строительство и инженерия", "Прораб: управление строительной бригадой, контроль качества строительно-монтажных работ, график работ, охрана труда, стройматериалы."],
  ["Строительство и инженерия", "Инженер-электрик: электроснабжение, монтаж электрооборудования, электрические схемы, релейная защита, ПУЭ, электробезопасность."],
  ["Строительство и инженерия", "Архитектор: Revit, ArchiCAD, BIM, архитектурное проектирование, планировки, визуализация, градостроительные нормы."],

  ["Логистика и закупки", "Логист: организация перевозок, грузоперевозки, маршрутизация, работа с перевозчиками, отслеживание грузов, транспортные документы."],
  ["Логистика и закупки", "Специалист ВЭД: таможенное оформление, импорт и экспорт, Инкотермс, декларации, сертификация товаров, международные поставки."],
  ["Логистика и закупки", "Заведующий складом: складской учет, WMS, инвентаризация, приемка и отгрузка товара, адресное хранение, комплектация заказов."],
  ["Логистика и закупки", "Менеджер по закупкам: поиск поставщиков, закупки, снабжение, управление запасами, тендеры, согласование цен, цепи поставок."],
  ["Логистика и закупки", "Водитель-экспедитор: доставка грузов, категория C, путевые листы, экспедирование, сохранность груза, маршруты по городу."],

  ["HoReCa", "Повар: приготовление блюд, горячий цех, заготовки, санитарные нормы, технологические карты, европейская и национальная кухня."],
  ["HoReCa", "Официант: обслуживание гостей, сервировка столов, знание меню, рекомендации блюд и напитков, работа в ресторане."],
  ["HoReCa", "Бариста: приготовление кофе, эспрессо, латте-арт, работа с кофемашиной, обслуживание гостей кофейни."],
  ["HoReCa", "Администратор ресторана: управление сменой, бронирование столов, работа с гостями, контроль персонала зала, iiko, r_keeper."],
  ["HoReCa", "Шеф-повар: разработка меню, калькуляция себестоимости блюд, управление кухней, закупка продуктов, фудкост."],
  ["HoReCa", "Администратор гостиницы: ресепшн отеля, заселение гостей, бронирование номеров, гостиничный бизнес, Opera PMS."],

  ["Медиа и контент", "Журналист: подготовка новостей, интервью, репортажи, редактура текстов, работа с источниками, публикации в СМИ."],
  ["Медиа и контент", "Копирайтер: написание продающих текстов, статьи для блога, SEO-тексты, слоганы, рерайтинг, tone of voice."],
  ["Медиа и контент", "Редактор: вычитка и корректура, редакционная политика, план публикаций издания, стилистика, работа с авторами."],
  ["Медиа и контент", "Видеограф и контент-мейкер: съемка видео, видеомонтаж Premiere Pro, сценарии для YouTube, сторителлинг, подкасты."],
  ["Медиа и контент", "PR-менеджер: связи с общественностью, пресс-релизы, работа со СМИ, организация пресс-мероприятий, антикризисные коммуникации."],

  ["Администрирование", "Офис-менеджер: документооборот, прием звонков, организация встреч, закупка канцелярии, MS Office, деловая переписка."],
  ["Администрирование", "Секретарь-референт: ведение календаря руководителя, протоколы совещаний, организация командировок, входящая и исходящая корреспонденция."],
  ["Администрирование", "Ассистент руководителя: планирование графика, подготовка презентаций, координация поручений, перевод документов, тайм-менеджмент."],
  ["Администрирование", "Администратор офиса: ресепшн, встреча посетителей, хозяйственное обеспечение офиса, курьерская служба, учет пропусков."],
  ["Администрирование", "Делопроизводитель: архив, регистрация документов, номенклатура дел, служебные записки, электронный документооборот."]
];

const CATEGORY_META = {
  "Data Science":              { group: "IT",    color: "#8b5cf6", icon: "🧠" },
  "Frontend":                  { group: "IT",    color: "#f59e0b", icon: "🎨" },
  "Backend":                   { group: "IT",    color: "#2563eb", icon: "⚙️" },
  "Mobile":                    { group: "IT",    color: "#06b6d4", icon: "📱" },
  "DevOps":                    { group: "IT",    color: "#14b8a6", icon: "☁️" },
  "QA":                        { group: "IT",    color: "#10b981", icon: "🧪" },
  "Кибербезопасность":         { group: "IT",    color: "#ef4444", icon: "🛡️" },
  "UI/UX и дизайн":            { group: "IT",    color: "#d946ef", icon: "✏️" },
  "Управление проектами":      { group: "Не IT", color: "#6366f1", icon: "📋" },
  "HR":                        { group: "Не IT", color: "#ec4899", icon: "🤝" },
  "Маркетинг":                 { group: "Не IT", color: "#f97316", icon: "📣" },
  "Продажи":                   { group: "Не IT", color: "#eab308", icon: "💼" },
  "Финансы и бухгалтерия":     { group: "Не IT", color: "#22c55e", icon: "💰" },
  "Юриспруденция":             { group: "Не IT", color: "#78716c", icon: "⚖️" },
  "Медицина":                  { group: "Не IT", color: "#e11d48", icon: "🩺" },
  "Образование":               { group: "Не IT", color: "#3b82f6", icon: "🎓" },
  "Строительство и инженерия": { group: "Не IT", color: "#a16207", icon: "🏗️" },
  "Логистика и закупки":       { group: "Не IT", color: "#84cc16", icon: "🚚" },
  "HoReCa":                    { group: "Не IT", color: "#c2410c", icon: "🍽️" },
  "Медиа и контент":           { group: "Не IT", color: "#7c3aed", icon: "📰" },
  "Администрирование":         { group: "Не IT", color: "#64748b", icon: "🗂️" }
};

const SKILLS_DICTIONARY = {
  // IT
  "Python": String.raw`python`,
  "SQL": String.raw`sql`,
  "PostgreSQL": String.raw`postgres(?:ql)?`,
  "MySQL": String.raw`mysql`,
  "MongoDB": String.raw`mongo(?:db)?`,
  "Redis": String.raw`redis`,
  "Git": String.raw`git(?:hub|lab)?`,
  "Docker": String.raw`docker`,
  "Kubernetes": String.raw`kubernetes|k8s`,
  "Terraform": String.raw`terraform`,
  "AWS": String.raw`aws`,
  "Linux": String.raw`linux`,
  "CI/CD": String.raw`ci\s*/\s*cd`,
  "REST API": String.raw`rest(?:ful)?\s*api|api`,
  "FastAPI": String.raw`fastapi`,
  "Django": String.raw`django`,
  "Flask": String.raw`flask`,
  "Node.js": String.raw`node\.?js`,
  "Java": String.raw`java(?!script)`,
  "Spring": String.raw`spring\s*boot`,
  "C#/.NET": String.raw`c#|\.net|asp\.net`,
  "Go": String.raw`golang`,
  "PHP": String.raw`php`,
  "JavaScript": String.raw`javascript|(?<!\.)js`,
  "TypeScript": String.raw`typescript`,
  "HTML": String.raw`html5?`,
  "CSS": String.raw`css3?|scss`,
  "React": String.raw`react(?:\.?js)?`,
  "Vue": String.raw`vue(?:\.?js)?`,
  "Angular": String.raw`angular`,
  "Swift": String.raw`swift(?:ui)?`,
  "Kotlin": String.raw`kotlin`,
  "Flutter": String.raw`flutter`,
  "Pandas": String.raw`pandas`,
  "scikit-learn": String.raw`scikit[- ]?learn|sklearn`,
  "PyTorch": String.raw`pytorch`,
  "TensorFlow": String.raw`tensorflow`,
  "Machine Learning": String.raw`machine\s+learning|машинн\w+\s+обучени\w+`,
  "Deep Learning": String.raw`deep\s+learning|нейронн\w+\s+сет\w+`,
  "NLP": String.raw`nlp|обработк\w+\s+текст\w*`,
  "Selenium": String.raw`selenium`,
  "Postman": String.raw`postman`,
  "Jira": String.raw`jira`,
  "Тестирование": String.raw`тестировани\w+|тест-кейс\w*|автотест\w*`,
  "Пентест": String.raw`пентест\w*|тестировани\w+\s+на\s+проникновени\w+|pentest\w*`,
  "SIEM": String.raw`siem`,
  "Figma": String.raw`figma`,
  "Adobe Photoshop": String.raw`photoshop`,
  "Illustrator": String.raw`illustrator`,
  // Бизнес
  "Agile/Scrum": String.raw`agile|scrum|kanban`,
  "Управление проектами": String.raw`управлени\w+\s+проект\w+|project\s+management`,
  "Рекрутинг": String.raw`рекрутинг|рекрутер|подбор\s+персонала|recruitment|сорсинг`,
  "Онбординг": String.raw`онбординг|onboarding|адаптаци\w+\s+сотрудник\w+`,
  "Кадровый учёт": String.raw`кадров\w+\s+(?:учет|учёт|делопроизводств\w+)`,
  "SMM": String.raw`smm|социальн\w+\s+сет\w+`,
  "SEO": String.raw`seo`,
  "Контекстная реклама": String.raw`контекстн\w+\s+реклам\w+|google\s+ads|яндекс\.?\s*директ`,
  "Таргетинг": String.raw`таргет\w*`,
  "Google Analytics": String.raw`google\s+analytics`,
  "CRM": String.raw`crm|bitrix24|битрикс24|amocrm`,
  "Переговоры": String.raw`переговор\w*`,
  "Холодные звонки": String.raw`холодн\w+\s+звонк\w+`,
  "1С": String.raw`1[сc](?:\s*бухгалтери\w+)?`,
  "МСФО": String.raw`мсфо|ifrs`,
  "Налоговая отчётность": String.raw`налогов\w+\s+(?:отчетност\w+|отчётност\w+|учет\w*|учёт\w*)`,
  "Бюджетирование": String.raw`бюджетировани\w+`,
  "Финансовый анализ": String.raw`финансов\w+\s+(?:анализ|моделировани\w+)`,
  "Договорная работа": String.raw`договорн\w+\s+работ\w+|проверк\w+\s+договор\w+`,
  "Судебная практика": String.raw`судебн\w+\s+практик\w+|представительств\w+\s+в\s+суде`,
  // Другие сферы
  "Работа с пациентами": String.raw`(?:прием|приём|уход\w*|ухаж\w*)\s+(?:за\s+)?пациент\w+|работ\w+\s+с\s+пациент\w+`,
  "Диагностика": String.raw`диагностик\w+`,
  "Преподавание": String.raw`преподавани\w+|преподавател\w+`,
  "Методика обучения": String.raw`методик\w+\s+обучени\w+|учебн\w+\s+программ\w+`,
  "AutoCAD": String.raw`autocad|автокад`,
  "Revit/BIM": String.raw`revit|archicad|bim`,
  "Сметы": String.raw`смет\w*`,
  "Складской учёт": String.raw`складск\w+\s+(?:учет|учёт)|wms|инвентаризаци\w+`,
  "ВЭД/таможня": String.raw`вэд|таможен\w+`,
  "Закупки": String.raw`закупк\w+|снабжени\w+`,
  "Приготовление блюд": String.raw`приготовлени\w+\s+блюд|горяч\w+\s+цех\w*`,
  "Обслуживание гостей": String.raw`обслуживани\w+\s+гост\w+|работ\w+\s+с\s+гост\w+`,
  "Копирайтинг": String.raw`копирайт\w*|продающ\w+\s+текст\w+`,
  "Видеомонтаж": String.raw`монтаж\w*\s+видео|видеомонтаж\w*|premiere`,
  "Документооборот": String.raw`документооборот\w*|делопроизводств\w+`,
  // Общие
  "Excel": String.raw`excel`,
  "MS Office": String.raw`ms\s+office|microsoft\s+office|word`,
  "Power BI": String.raw`power\s*bi`,
  "Английский язык": String.raw`английск\w+|english|ielts|toefl`,
  "Казахский язык": String.raw`казахск\w+\s+язык\w*`
};

const WCH = "[\\p{L}\\p{N}_]";
// Старые Safari / iOS (< 16.4) не поддерживают lookbehind (?<!…) — без этой проверки весь скрипт падал
const HAS_LOOKBEHIND = (() => { try { new RegExp("(?<!a)b"); return true; } catch (e) { return false; } })();
const COMPILED_SKILLS = Object.entries(SKILLS_DICTIONARY).map(([name, pattern]) => {
  const body = pattern.replace(/\\w/g, WCH);
  return [name, HAS_LOOKBEHIND
    ? new RegExp("(?<!" + WCH + ")(?:" + body + ")(?!" + WCH + ")", "iu")
    : new RegExp("(?:^|[^\\p{L}\\p{N}_])(?:" + body.replace(/\(\?<![^)]*\)/g, "") + ")(?!" + WCH + ")", "iu")];
});

const STOPWORDS = new Set(("и в во на с со по для о об от до из к а но или же то не что как у за при под над " +
  "года год лет опыт опыта опытом работы работа работаю работал также the and of in with for to on a an at " +
  "my i am я мой моя мои был была было").split(" "));

const EDGE_PUNCT = HAS_LOOKBEHIND
  ? new RegExp("(?<!" + WCH + ")[.\\-/]+|[.\\-/]+(?!" + WCH + ")", "gu")
  : /(?:^|\s)[.\-/]+|[.\-/]+(?![\p{L}\p{N}_])/gu;

function preprocessText(text) {
  let t = (text || "").toLowerCase().replace(/ё/g, "е");
  t = t.replace(/[^\p{L}\p{N}+#.\s\/-]/gu, " ");   // \p{L} — сохраняем и казахские буквы
  t = t.replace(EDGE_PUNCT, " ");
  return t.replace(/\s+/g, " ").trim();
}

function tokenize(text) {
  return (preprocessText(text).match(/[\p{L}\p{N}_+#.\/-]+/gu) || [])
    .map((t) => t.replace(/^[.\/-]+|[.\/-]+$/g, ""))
    .filter((t) => t && !STOPWORDS.has(t));
}

function extractSkills(text) {
  const found = [];
  for (const [name, regex] of COMPILED_SKILLS) if (regex.test(text || "")) found.push(name);
  return found;
}

// Признаки: слова, биграммы и символьные n-граммы 3–5 внутри слова (устойчивы к падежам и опечаткам)
const FEATURE_WEIGHTS = { w: 1.0, b: 0.7, c: 0.45 };

function extractFeatures(text) {
  const tokens = tokenize(text);
  const feats = [];
  for (const t of tokens) feats.push("w:" + t);
  for (let i = 0; i < tokens.length - 1; i++) feats.push("b:" + tokens[i] + " " + tokens[i + 1]);
  for (const t of tokens) {
    const s = " " + t + " ";
    for (let n = 3; n <= 5; n++) for (let i = 0; i + n <= s.length; i++) feats.push("c:" + s.slice(i, i + n));
  }
  return feats;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class ResumeClassifier {
  constructor(options = {}) {
    this.epochs = options.epochs || 60;
    this.lr0 = options.lr || 1.0;
    this.lambda = options.lambda || 3e-5;
    this.lowConfidence = options.lowConfidence || 0.25;
    this.classes = [];
    this.vocab = new Map();
    this.idf = [];
    this.isTrained = false;
  }

  _vectorFromFeatures(feats, open) {
    const counts = new Map();
    for (const f of feats) counts.set(f, (counts.get(f) || 0) + 1);
    const idx = [], val = [], keys = [];
    let norm = 0;
    for (const [f, tf] of counts) {
      let i = this.vocab.get(f);
      let idf;
      if (i === undefined) {
        if (!open) continue;
        idf = this.maxIdf; i = -1;
      } else idf = this.idf[i];
      const w = (1 + Math.log(tf)) * idf * FEATURE_WEIGHTS[f[0]];
      idx.push(i); val.push(w); keys.push(f);
      norm += w * w;
    }
    norm = Math.sqrt(norm) || 1;
    return { idx, val: val.map((v) => v / norm), keys };
  }

  vectorize(text) { return this._vectorFromFeatures(extractFeatures(text), false); }

  // Асинхронное обучение с колбэком прогресса (чтобы не блокировать интерфейс)
  async trainAsync(onProgress) {
    const docs = TRAINING_DATA.map((d) => extractFeatures(d[1]));
    this.classes = Array.from(new Set(TRAINING_DATA.map((d) => d[0])));
    const df = [];
    this.vocab = new Map();
    for (const doc of docs) {
      for (const f of new Set(doc)) {
        if (!this.vocab.has(f)) { this.vocab.set(f, this.vocab.size); df.push(0); }
        df[this.vocab.get(f)] += 1;
      }
    }
    const n = docs.length;
    this.idf = df.map((d) => Math.log((1 + n) / (1 + d)) + 1);
    this.maxIdf = Math.log(1 + n) + 1;

    const X = docs.map((d) => this._vectorFromFeatures(d, false));
    const y = TRAINING_DATA.map((d) => this.classes.indexOf(d[0]));
    const K = this.classes.length, V = this.vocab.size;
    this.W = Array.from({ length: K }, () => new Float64Array(V));
    this.scale = new Float64Array(K).fill(1);
    this.b = new Float64Array(K);

    const rand = mulberry32(42);
    const order = Array.from({ length: n }, (_, i) => i);
    for (let ep = 0; ep < this.epochs; ep++) {
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      const lr = this.lr0 / (1 + ep * 0.15);
      for (const i of order) {
        const x = X[i];
        const p = this.softmax(this.logits(x));
        for (let k = 0; k < K; k++) {
          const d = p[k] - (y[i] === k ? 1 : 0);
          this.scale[k] *= 1 - lr * this.lambda;           // L2-регуляризация через общий множитель
          const w = this.W[k], s = this.scale[k];
          for (let j = 0; j < x.idx.length; j++) w[x.idx[j]] -= (lr * d * x.val[j]) / s;
          this.b[k] -= lr * d;
          if (s < 1e-3) { for (let j = 0; j < V; j++) w[j] *= s; this.scale[k] = 1; }
        }
      }
      if (onProgress) {
        onProgress((ep + 1) / this.epochs);
        await new Promise((r) => setTimeout(r, 0));
      }
    }
    this.isTrained = true;
  }

  train() { // синхронный вариант (для Node / тестов)
    const saved = this.trainAsync(null);
    return saved;
  }

  logits(x) {
    const out = new Array(this.classes.length);
    for (let k = 0; k < this.classes.length; k++) {
      let s = 0;
      const w = this.W[k];
      for (let j = 0; j < x.idx.length; j++) if (x.idx[j] >= 0) s += w[x.idx[j]] * x.val[j];
      out[k] = this.b[k] + s * this.scale[k];
    }
    return out;
  }

  softmax(z) {
    const m = Math.max(...z);
    const e = z.map((v) => Math.exp(v - m));
    const s = e.reduce((a, c) => a + c, 0);
    return e.map((v) => v / s);
  }

  predict(text) {
    const x = this.vectorize(text);
    const probs = this.softmax(this.logits(x));
    const ranked = this.classes.map((c, i) => ({ category: c, p: probs[i] })).sort((a, b) => b.p - a.p);
    const best = ranked[0];
    const k = this.classes.indexOf(best.category);

    // Объяснение: какие слова сильнее всего «проголосовали» за выбранное направление
    const contrib = new Map();
    for (let j = 0; j < x.idx.length; j++) {
      const key = x.keys[j];
      if (key[0] === "c") continue;
      const c = this.W[k][x.idx[j]] * x.val[j] * this.scale[k];
      if (c > 0) contrib.set(key.slice(2), (contrib.get(key.slice(2)) || 0) + c);
    }
    const reasons = [...contrib.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([t]) => t);

    return {
      category: best.category,
      confidence: Math.round(best.p * 1000) / 10,
      lowConfidence: best.p < this.lowConfidence || x.idx.length === 0,
      top: ranked.slice(0, 3).map((r) => ({ category: r.category, p: Math.round(r.p * 1000) / 10 })),
      reasons
    };
  }

  // Реальное соответствие вакансии: навыки + семантическая близость TF-IDF
  matchVacancy(resumeText, vacancyText) {
    const a = this._vectorFromFeatures(extractFeatures(resumeText), true);
    const b = this._vectorFromFeatures(extractFeatures(vacancyText), true);
    const map = new Map();
    a.keys.forEach((key, i) => map.set(key, a.val[i]));
    let cos = 0;
    b.keys.forEach((key, i) => { if (map.has(key)) cos += map.get(key) * b.val[i]; });
    const required = extractSkills(vacancyText);
    const have = new Set(extractSkills(resumeText));
    const matched = required.filter((s) => have.has(s));
    const missing = required.filter((s) => !have.has(s));
    const semantic = Math.min(1, cos / 0.45);
    const score = required.length ? 0.6 * (matched.length / required.length) + 0.4 * semantic : semantic;
    return { score: Math.round(score * 100), similarity: Math.round(cos * 100), matched, missing };
  }

  analyze(text, vacancyText) {
    const result = this.predict(text);
    result.skills = extractSkills(text);
    result.group = (CATEGORY_META[result.category] || {}).group || "Не IT";
    result.vacancy = vacancyText && vacancyText.trim().length >= 20 ? this.matchVacancy(text, vacancyText) : null;
    return result;
  }
}
// MODEL-END
// ===================================================================

window.addEventListener("error", (e) => {
  const t = document.getElementById("status-text"), d = document.getElementById("status-dot");
  if (t) t.textContent = "Ошибка: " + (e.message || "скрипт не загрузился");
  if (d) d.style.background = "#ef4444";
});

const classifier = new ResumeClassifier();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));

// ---------------- хранилище ----------------
const STORE_KEY = "hr_assistant_resumes_v1";
let memoryStore = [];

function loadStore() {
  try { const raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : memoryStore; }
  catch (err) { return memoryStore; }
}
function persistStore(list) {
  memoryStore = list;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch (err) { /* остаёмся в памяти */ }
  updateCountBadge();
}
function saveResume(name, text, r) {
  const list = loadStore();
  const id = list.reduce((m, x) => Math.max(m, x.id), 0) + 1;
  list.push({
    id, candidate_name: name, predicted_category: r.category, match_score: r.confidence,
    top: r.top, vacancy_match: r.vacancy ? r.vacancy.score : null,
    extracted_skills: r.skills, resume_text: text, created_at: new Date().toISOString()
  });
  persistStore(list);
  return id;
}
function deleteResume(id) { persistStore(loadStore().filter((r) => r.id !== id)); }
function updateCountBadge() { $("count-badge").textContent = loadStore().length; }

// ---------------- справочники ----------------
const EXAMPLES = [
  ["🧠 Data Science", "Алия Нурланова", "Data Scientist с опытом 3 года. Строю модели машинного обучения на Python: pandas, numpy, scikit-learn, PyTorch. Работаю с SQL и Git, делаю NLP-проекты по классификации текстов."],
  ["🩺 Медсестра", "Гульнара Ахметова", "Медицинская сестра процедурного кабинета, 6 лет стажа. Выполняю внутривенные инъекции и капельницы, ухаживаю за пациентами после операций, веду медицинскую документацию, соблюдаю правила стерилизации."],
  ["💰 Бухгалтер", "Ержан Касымов", "Бухгалтер на участке расчетов. Веду учет в 1С, готовлю налоговую отчетность по НДС и КПН, сверяю банковские выписки, начисляю зарплату сотрудникам, знаю МСФО."],
  ["🍽️ Повар", "Нурлан Абенов", "Повар горячего цеха в ресторане национальной кухни. Готовлю бешбармак, плов, супы, делаю заготовки, работаю по технологическим картам, слежу за санитарными нормами на кухне."],
  ["📣 Маркетолог", "Дана Серикова", "SMM и таргетолог. Веду аккаунты брендов в Instagram и TikTok, запускаю таргетированную рекламу, составляю контент-план, анализирую охваты, работаю с блогерами."],
  ["🎓 Учитель", "Айгерим Жумабаева", "Учитель английского языка в школе, готовлю учеников к IELTS и олимпиадам, разрабатываю уроки и учебные программы, провожу онлайн-занятия, классный руководитель."]
];

const DEMO_CANDIDATES = [
  ["Алия Нурланова", "Data Scientist, 3 года опыта в машинном обучении. Python, pandas, scikit-learn, PyTorch, SQL, Git. Классификация текстов, NLP."],
  ["Мария Ким", "Frontend разработчик: React, TypeScript, Tailwind, HTML, CSS, адаптивная верстка, Figma, Git, Redux."],
  ["Дмитрий Орлов", "Backend разработчик: Python, FastAPI, PostgreSQL, Docker, REST API, Redis, микросервисы, Linux, Git."],
  ["Елена Попова", "HR-менеджер: подбор персонала, рекрутинг, собеседования, онбординг, адаптация сотрудников, HR-бренд."],
  ["Айдар Сейтов", "QA инженер: тест-кейсы, ручное тестирование, Selenium, Pytest, Jira, Postman, API тестирование, баг-репорты."],
  ["Гульнара Ахметова", "Медицинская сестра: инъекции, капельницы, уход за пациентами, стерилизация инструментов, ведение медицинской документации."],
  ["Ержан Касымов", "Бухгалтер: 1С, налоговая отчетность, НДС, расчет заработной платы, банковские выписки, акты сверки."],
  ["Нурлан Абенов", "Повар горячего цеха: приготовление блюд национальной кухни, заготовки, технологические карты, санитарные нормы."],
  ["Дана Серикова", "SMM-специалист: Instagram, TikTok, таргетированная реклама, контент-план, работа с блогерами, аналитика охватов."],
  ["Айгерим Жумабаева", "Учитель английского языка: подготовка к IELTS, разработка уроков, учебные программы, онлайн-занятия."],
  ["Асель Тулегенова", "Юрист: договорная работа, судебная практика, претензионная работа, правовая экспертиза документов."],
  ["Тимур Алиев", "Логист: организация грузоперевозок, работа с перевозчиками, таможенное оформление, складской учет."]
];

const meta = (c) => CATEGORY_META[c] || { group: "Не IT", color: "#64748b", icon: "📄" };

function escapeHtml(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function skillBadge(skill, i = 0, tone = "indigo") {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    red: "bg-rose-50 text-rose-700 border-rose-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200"
  };
  return '<span class="pop inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ' + tones[tone] +
    '" style="animation-delay:' + (i * 45) + 'ms">' + escapeHtml(skill) + "</span>";
}
function categoryChip(c, small) {
  const m = meta(c);
  return '<span class="inline-flex items-center gap-1.5 rounded-full text-white font-semibold ' +
    (small ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm") + '" style="background:' + m.color +
    ';box-shadow:0 6px 16px -6px ' + m.color + '">' + m.icon + " " + escapeHtml(c) + "</span>";
}
function confidenceColor(p) { return p >= 65 ? "#10b981" : p >= 40 ? "#f59e0b" : "#ef4444"; }

function countUp(el, to, { suffix = "", decimals = 0, duration = 1000 } = {}) {
  if (reduceMotion) { el.textContent = to.toFixed(decimals) + suffix; return; }
  const start = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - start) / duration);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * e).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

function toast(message, type = "success") {
  const colors = { success: "bg-slate-900", error: "bg-rose-600", info: "bg-indigo-600" };
  const icon = { success: "✓", error: "!", info: "i" }[type];
  const el = document.createElement("div");
  el.className = "toast " + colors[type] + " text-white text-sm font-medium rounded-2xl pl-3 pr-4 py-3 shadow-xl flex items-center gap-2.5 max-w-xs";
  el.innerHTML = '<span class="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-xs font-bold">' + icon + "</span>" + escapeHtml(message);
  $("toast-root").appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 300); }, 2800);
}

// ---------------- вкладки ----------------
function moveIndicator() {
  const active = document.querySelector(".tab-btn.active");
  const ind = $("tab-indicator");
  if (!active) return;
  ind.style.left = active.offsetLeft + "px";
  ind.style.width = active.offsetWidth + "px";
}
function showTab(name) {
  document.querySelectorAll(".tab-panel").forEach((p) => { p.classList.add("hidden"); p.classList.remove("panel-enter"); });
  const panel = $("tab-" + name);
  panel.classList.remove("hidden");
  void panel.offsetWidth;
  panel.classList.add("panel-enter");
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  moveIndicator();
  if (name === "candidates") renderCandidates();
  if (name === "analytics") loadAnalytics();
}

// ---------------- файлы ----------------
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve();
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = PDFJS + "pdf.min.js";
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; res(); };
    s.onerror = () => rej(new Error("Не удалось загрузить модуль чтения PDF"));
    document.head.appendChild(s);
  });
}
async function readResumeFile(file) {
  if (/\.pdf$/i.test(file.name) || file.type === "application/pdf") {
    await loadPdfJs();
    const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let p = 1; p <= pdf.numPages; p++) {
      const content = await (await pdf.getPage(p)).getTextContent();
      text += content.items.map((i) => i.str).join(" ") + "\n";
    }
    return text.trim();
  }
  if (/\.(txt|md)$/i.test(file.name) || (file.type || "").startsWith("text/")) return (await file.text()).trim();
  throw new Error("Поддерживаются файлы .txt и .pdf (для .docx сохраните резюме в PDF)");
}
async function handleFile(file) {
  if (!file) return;
  try {
    const text = await readResumeFile(file);
    if (!text) throw new Error("В файле не найден текст (возможно, это скан)");
    $("resume-text").value = text;
    updateCharCount();
    if (!$("candidate-name").value.trim()) $("candidate-name").value = file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    toast("Файл «" + file.name + "» загружен", "info");
  } catch (err) {
    toast(err.message, "error");
  }
}

// ---------------- скрининг ----------------
function updateCharCount() { $("char-count").textContent = $("resume-text").value.length + " символов"; }

function setLoading(on) {
  const btn = $("screen-btn");
  btn.disabled = on || !classifier.isTrained;
  $("btn-spinner").classList.toggle("hidden", !on);
  $("btn-label").textContent = on ? "Анализируем…" : "Анализировать резюме";
}

async function submitScreening(event) {
  if (event) event.preventDefault();
  if (submitScreening.busy) return;
  const errorBox = $("screen-error");
  const name = $("candidate-name").value.trim();
  const text = $("resume-text").value.trim();
  const vacancy = $("vacancy-text").value.trim();
  errorBox.classList.add("hidden");

  const fail = (msg) => { errorBox.textContent = msg; errorBox.classList.remove("hidden"); errorBox.classList.remove("panel-enter"); void errorBox.offsetWidth; errorBox.classList.add("panel-enter"); };
  if (!name) return fail("Укажите имя кандидата.");
  if (text.length < 30) return fail("Текст резюме слишком короткий (минимум 30 символов).");

  submitScreening.busy = true;
  setLoading(true);
  $("result-empty").classList.add("hidden");
  $("result-box").classList.add("hidden");
  $("result-scan").classList.remove("hidden");
  const steps = ["Токенизация текста…", "Построение TF-IDF признаков…", "Классификация по 21 направлению…", "Извлечение навыков…"];
  for (const s of steps) { $("scan-step").textContent = s; await sleep(320); }

  const result = classifier.analyze(text, vacancy);
  saveResume(name, text, result);
  $("result-scan").classList.add("hidden");
  renderResult(name, result);
  submitScreening.busy = false;
  setLoading(false);
  toast("Кандидат сохранён в базу");
}

function renderResult(name, r) {
  const box = $("result-box");
  const m = meta(r.category);
  const C = 2 * Math.PI * 52;
  const col = confidenceColor(r.confidence);

  const topBars = r.top.map((t, i) =>
    '<div class="pop" style="animation-delay:' + (200 + i * 90) + 'ms">' +
      '<div class="flex justify-between text-xs mb-1"><span class="font-semibold text-slate-600">' + meta(t.category).icon + " " + escapeHtml(t.category) + '</span><span class="text-slate-500">' + t.p + "%</span></div>" +
      '<div class="h-2 rounded-full bg-slate-200/80 overflow-hidden"><div class="bar-fill h-2 rounded-full" data-w="' + t.p + '" style="width:0;background:' + meta(t.category).color + '"></div></div>' +
    "</div>").join("");

  let vacancyHtml = "";
  if (r.vacancy) {
    const v = r.vacancy;
    vacancyHtml =
      '<div class="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 pop" style="animation-delay:350ms">' +
        '<div class="flex justify-between items-center mb-2"><p class="text-sm font-bold text-slate-700">Соответствие вакансии</p><span id="vac-score" class="font-display font-bold text-lg" style="color:' + confidenceColor(v.score) + '">0%</span></div>' +
        '<div class="h-3 rounded-full bg-white overflow-hidden mb-3"><div class="bar-fill h-3 rounded-full" data-w="' + v.score + '" style="width:0;background:linear-gradient(90deg,#6366f1,' + confidenceColor(v.score) + ')"></div></div>' +
        (v.matched.length ? '<p class="text-xs text-slate-500 mb-1.5">Есть у кандидата</p><div class="flex flex-wrap gap-1.5 mb-3">' + v.matched.map((s, i) => skillBadge(s, i, "green")).join("") + "</div>" : "") +
        (v.missing.length ? '<p class="text-xs text-slate-500 mb-1.5">Не хватает</p><div class="flex flex-wrap gap-1.5">' + v.missing.map((s, i) => skillBadge(s, i, "red")).join("") + "</div>" : "") +
        (!v.matched.length && !v.missing.length ? '<p class="text-xs text-slate-500">В вакансии не найдено навыков из словаря — оценка по смысловой близости текстов (' + v.similarity + "%).</p>" : "") +
      "</div>";
  }

  box.innerHTML =
    '<div class="flex items-center gap-5 panel-enter">' +
      '<div class="relative shrink-0" style="width:128px;height:128px">' +
        '<svg width="128" height="128" viewBox="0 0 128 128"><circle class="ring-track" cx="64" cy="64" r="52" fill="none" stroke-width="12"/>' +
        '<circle id="ring" class="ring-value" cx="64" cy="64" r="52" fill="none" stroke-width="12" stroke-linecap="round" stroke="' + col + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg>' +
        '<div class="absolute inset-0 grid place-items-center text-center"><div><div id="ring-num" class="font-display text-2xl font-bold" style="color:' + col + '">0%</div><div class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">уверенность</div></div></div>' +
      "</div>" +
      '<div class="min-w-0">' +
        '<p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Кандидат</p>' +
        '<p class="text-xl font-bold truncate">' + escapeHtml(name) + "</p>" +
        '<div class="mt-2 flex flex-wrap items-center gap-2">' + categoryChip(r.category) +
          '<span class="text-xs font-semibold px-2 py-1 rounded-md ' + (m.group === "IT" ? "bg-cyan-100 text-cyan-700" : "bg-amber-100 text-amber-700") + '">' + m.group + "</span></div>" +
      "</div>" +
    "</div>" +
    (r.lowConfidence ? '<div class="pop rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-2">⚠️ Низкая уверенность: резюме не похоже ни на одно направление из обучающей выборки. Проверьте вручную.</div>' : "") +
    '<div><p class="text-sm font-bold text-slate-700 mb-2.5">Топ-3 направления</p><div class="space-y-2.5">' + topBars + "</div></div>" +
    (r.reasons.length ? '<div><p class="text-sm font-bold text-slate-700 mb-2">Почему такой вывод <span class="font-normal text-slate-400">— ключевые слова</span></p><div class="flex flex-wrap gap-1.5">' + r.reasons.map((s, i) => skillBadge(s, i, "slate")).join("") + "</div></div>" : "") +
    '<div><p class="text-sm font-bold text-slate-700 mb-2">Найденные навыки <span class="font-normal text-slate-400">(' + r.skills.length + ")</span></p><div class=\"flex flex-wrap gap-1.5\">" +
      (r.skills.length ? r.skills.map((s, i) => skillBadge(s, i)).join("") : '<span class="text-slate-400 text-sm">Навыки из словаря не найдены</span>') + "</div></div>" +
    vacancyHtml;

  box.classList.remove("hidden");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $("ring").style.strokeDashoffset = C * (1 - r.confidence / 100);
    countUp($("ring-num"), r.confidence, { suffix: "%", decimals: 1, duration: 1200 });
    box.querySelectorAll(".bar-fill").forEach((b) => (b.style.width = Math.min(100, +b.dataset.w) + "%"));
    if (r.vacancy) countUp($("vac-score"), r.vacancy.score, { suffix: "%", duration: 1100 });
  }));
}

// ---------------- кандидаты ----------------
function formatDate(iso) {
  const d = new Date(iso);
  return isNaN(d) ? "" : d.toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
}
function filteredCandidates() {
  const q = $("search-input").value.trim().toLowerCase();
  const cat = $("category-filter").value;
  const grp = $("group-filter").value;
  return loadStore().slice().reverse().filter((c) => {
    const hay = (c.candidate_name + " " + c.extracted_skills.join(" ") + " " + c.predicted_category).toLowerCase();
    return (!q || hay.includes(q)) && (!cat || c.predicted_category === cat) && (!grp || meta(c.predicted_category).group === grp);
  });
}
function renderCandidates() {
  const rows = filteredCandidates();
  $("candidates-body").innerHTML = rows.map((c, i) => {
    const vac = c.vacancy_match == null ? '<span class="text-slate-300">—</span>' :
      '<span class="font-bold" style="color:' + confidenceColor(c.vacancy_match) + '">' + c.vacancy_match + "%</span>";
    const skills = c.extracted_skills.slice(0, 4).map((s) => skillBadge(s)).join("") +
      (c.extracted_skills.length > 4 ? '<span class="text-xs text-slate-400 self-center">+' + (c.extracted_skills.length - 4) + "</span>" : "");
    return '<tr class="row-in hover:bg-indigo-50/40 transition cursor-pointer" data-id="' + c.id + '" style="animation-delay:' + Math.min(i, 15) * 40 + 'ms">' +
      '<td class="px-4 py-3"><div class="flex items-center gap-2.5"><span class="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold shrink-0" style="background:' + meta(c.predicted_category).color + '">' +
        escapeHtml(c.candidate_name.trim().charAt(0).toUpperCase()) + '</span><span class="font-semibold">' + escapeHtml(c.candidate_name) + "</span></div></td>" +
      '<td class="px-4 py-3 whitespace-nowrap">' + categoryChip(c.predicted_category, true) + "</td>" +
      '<td class="px-4 py-3"><div class="flex items-center gap-2"><div class="w-14 h-1.5 rounded-full bg-slate-200 overflow-hidden"><div class="h-full rounded-full" style="width:' + c.match_score + "%;background:" + confidenceColor(c.match_score) + '"></div></div><span class="font-semibold text-xs">' + c.match_score + "%</span></div></td>" +
      '<td class="px-4 py-3">' + vac + "</td>" +
      '<td class="px-4 py-3"><div class="flex flex-wrap gap-1">' + skills + "</div></td>" +
      '<td class="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">' + escapeHtml(formatDate(c.created_at)) + "</td>" +
      '<td class="px-2 py-3"><button type="button" class="del-btn w-8 h-8 rounded-lg grid place-items-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition" data-id="' + c.id + '" title="Удалить">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg></button></td>' +
      "</tr>";
  }).join("");
  $("candidates-empty").classList.toggle("hidden", rows.length > 0);
}

function openCandidate(id) {
  const c = loadStore().find((x) => x.id === id);
  if (!c) return;
  const top = (c.top || []).map((t) => '<div class="flex justify-between text-sm"><span>' + meta(t.category).icon + " " + escapeHtml(t.category) + '</span><span class="font-semibold">' + t.p + "%</span></div>").join("");
  $("modal-root").innerHTML =
    '<div id="modal" class="modal-backdrop fixed inset-0 z-40 grid place-items-center p-4">' +
      '<div class="modal-card bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">' +
        '<div class="flex justify-between items-start gap-4 mb-4"><div><p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Кандидат #' + c.id + '</p><h3 class="text-xl font-bold">' + escapeHtml(c.candidate_name) + "</h3></div>" +
        '<button type="button" id="modal-close" class="w-9 h-9 rounded-xl hover:bg-slate-100 grid place-items-center text-slate-500">✕</button></div>' +
        '<div class="flex flex-wrap gap-2 mb-4">' + categoryChip(c.predicted_category) +
          '<span class="px-3 py-1.5 rounded-full bg-slate-100 text-sm font-semibold">Уверенность ' + c.match_score + "%</span>" +
          (c.vacancy_match != null ? '<span class="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">Вакансия ' + c.vacancy_match + "%</span>" : "") + "</div>" +
        (top ? '<div class="space-y-1 mb-4 rounded-2xl bg-slate-50 p-3">' + top + "</div>" : "") +
        '<div class="flex flex-wrap gap-1.5 mb-4">' + c.extracted_skills.map((s, i) => skillBadge(s, i)).join("") + "</div>" +
        '<p class="text-sm font-bold mb-1.5">Текст резюме</p><p class="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed rounded-2xl border border-slate-100 p-3">' + escapeHtml(c.resume_text) + "</p>" +
      "</div></div>";
  const close = () => { $("modal-root").innerHTML = ""; };
  $("modal").addEventListener("click", (e) => { if (e.target.id === "modal") close(); });
  $("modal-close").addEventListener("click", close);
}

function exportCsv() {
  const rows = loadStore();
  if (!rows.length) return toast("База пуста — нечего экспортировать", "error");
  const q = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
  const lines = [["ID", "Кандидат", "Направление", "Группа", "Уверенность %", "Вакансия %", "Навыки", "Дата"].map(q).join(";")];
  rows.forEach((r) => lines.push([r.id, r.candidate_name, r.predicted_category, meta(r.predicted_category).group, r.match_score,
    r.vacancy_match ?? "", r.extracted_skills.join(", "), formatDate(r.created_at)].map(q).join(";")));
  const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "candidates.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("CSV выгружен", "info");
}

// ---------------- аналитика ----------------
let categoryChart = null, skillsChart = null;

function loadAnalytics() {
  const list = loadStore();
  const cats = {}, skills = {};
  let sum = 0, it = 0;
  list.forEach((r) => {
    cats[r.predicted_category] = (cats[r.predicted_category] || 0) + 1;
    r.extracted_skills.forEach((s) => (skills[s] = (skills[s] || 0) + 1));
    sum += r.match_score;
    if (meta(r.predicted_category).group === "IT") it++;
  });
  const sortDesc = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  const catList = sortDesc(cats, 21);
  const skillList = sortDesc(skills, 10);

  countUp($("kpi-total"), list.length);
  countUp($("kpi-avg"), list.length ? sum / list.length : 0, { suffix: "%", decimals: 1 });
  countUp($("kpi-it"), list.length ? (it / list.length) * 100 : 0, { suffix: "%" });
  $("kpi-top").textContent = catList.length ? meta(catList[0][0]).icon + " " + catList[0][0] : "—";
  $("analytics-empty").classList.toggle("hidden", list.length > 0);

  if (categoryChart) categoryChart.destroy();
  if (skillsChart) skillsChart.destroy();
  if (typeof Chart === "undefined") return;
  Chart.defaults.font.family = "Manrope, system-ui, sans-serif";
  Chart.defaults.color = "#64748b";

  categoryChart = new Chart($("category-chart"), {
    type: "doughnut",
    data: {
      labels: catList.map((c) => c[0]),
      datasets: [{ data: catList.map((c) => c[1]), backgroundColor: catList.map((c) => meta(c[0]).color), borderWidth: 3, borderColor: "#fff", hoverOffset: 14 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "62%",
      animation: { animateRotate: true, animateScale: true, duration: reduceMotion ? 0 : 1200, easing: "easeOutQuart" },
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 12 } } }
    }
  });

  skillsChart = new Chart($("skills-chart"), {
    type: "bar",
    data: {
      labels: skillList.map((s) => s[0]),
      datasets: [{
        label: "Резюме с навыком", data: skillList.map((s) => s[1]), borderRadius: 8, borderSkipped: false,
        backgroundColor: (ctx) => {
          const { chart } = ctx, area = chart.chartArea;
          if (!area) return "#6366f1";
          const g = chart.ctx.createLinearGradient(area.left, 0, area.right, 0);
          g.addColorStop(0, "#6366f1"); g.addColorStop(1, "#22d3ee");
          return g;
        }
      }]
    },
    options: {
      indexAxis: "y", responsive: true, maintainAspectRatio: false,
      animation: { duration: reduceMotion ? 0 : 900, delay: (c) => (c.type === "data" && c.mode === "default" && !reduceMotion ? c.dataIndex * 90 : 0) },
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "rgba(148,163,184,.15)" } }, y: { grid: { display: false } } }
    }
  });
}

function seedDemo() {
  DEMO_CANDIDATES.forEach(([name, text]) => saveResume(name, text, classifier.analyze(text)));
  toast("Добавлено " + DEMO_CANDIDATES.length + " демо-кандидатов");
  const active = document.querySelector(".tab-btn.active");
  showTab(active ? active.dataset.tab : "candidates");
}

// ---------------- инициализация ----------------
document.addEventListener("DOMContentLoaded", async () => {
  // фильтр направлений
  const sel = $("category-filter");
  sel.innerHTML = '<option value="">Все направления</option>' +
    Object.keys(CATEGORY_META).map((c) => '<option value="' + escapeHtml(c) + '">' + CATEGORY_META[c].icon + " " + escapeHtml(c) + "</option>").join("");

  // примеры
  $("examples").innerHTML = EXAMPLES.map((e, i) =>
    '<button type="button" class="chip-example pop text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200" style="animation-delay:' + (400 + i * 60) + 'ms" data-i="' + i + '">' + e[0] + "</button>").join("");
  $("examples").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-i]");
    if (!b) return;
    const ex = EXAMPLES[+b.dataset.i];
    $("candidate-name").value = ex[1];
    $("resume-text").value = ex[2];
    updateCharCount();
  });

  document.querySelectorAll(".tab-btn").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
  window.addEventListener("resize", moveIndicator);
  setTimeout(moveIndicator, 50);
  if (document.fonts) document.fonts.ready.then(moveIndicator);

  // В песочнице (предпросмотр claude.ai и т.п.) отправка форм заблокирована и событие submit не приходит,
  // поэтому анализ запускается обычным кликом по кнопке
  $("screen-form").addEventListener("submit", (e) => e.preventDefault());
  $("screen-btn").addEventListener("click", submitScreening);
  $("candidate-name").addEventListener("keydown", (e) => { if (e.key === "Enter") submitScreening(e); });
  $("resume-text").addEventListener("input", updateCharCount);
  $("search-input").addEventListener("input", renderCandidates);
  $("category-filter").addEventListener("change", renderCandidates);
  $("group-filter").addEventListener("change", renderCandidates);
  $("export-btn").addEventListener("click", exportCsv);
  document.querySelectorAll(".seed-btn").forEach((b) => b.addEventListener("click", seedDemo));
  $("clear-btn").addEventListener("click", () => {
    // confirm() тоже блокируется в песочнице — подтверждение вторым нажатием
    const btn = $("clear-btn");
    if (!btn.dataset.armed) {
      btn.dataset.armed = "1";
      btn.textContent = "Нажмите ещё раз, чтобы удалить всё";
      btn.classList.add("text-red-600", "font-semibold");
      setTimeout(() => { delete btn.dataset.armed; btn.textContent = "Очистить базу"; btn.classList.remove("text-red-600", "font-semibold"); }, 3000);
      return;
    }
    delete btn.dataset.armed;
    btn.textContent = "Очистить базу";
    btn.classList.remove("text-red-600", "font-semibold");
    persistStore([]); showTab("candidates"); toast("База очищена", "info");
  });
  $("candidates-body").addEventListener("click", (e) => {
    const del = e.target.closest(".del-btn");
    if (del) {
      e.stopPropagation();
      const tr = del.closest("tr");
      tr.style.transition = "opacity .3s, transform .3s";
      tr.style.opacity = "0"; tr.style.transform = "translateX(30px)";
      setTimeout(() => { deleteResume(+del.dataset.id); renderCandidates(); }, reduceMotion ? 0 : 280);
      return;
    }
    const row = e.target.closest("tr[data-id]");
    if (row) openCandidate(+row.dataset.id);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("modal-root").innerHTML = ""; });

  // вакансия (раскрывающийся блок)
  $("vac-toggle").addEventListener("click", () => {
    const open = $("vac-panel").classList.toggle("open");
    $("vac-chevron").style.transform = open ? "rotate(180deg)" : "";
  });

  // drag & drop файлов
  const dz = $("dropzone");
  ["dragenter", "dragover"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("dragging"); }));
  ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("dragging"); }));
  dz.addEventListener("drop", (e) => handleFile(e.dataTransfer.files[0]));
  $("file-input").addEventListener("change", (e) => { handleFile(e.target.files[0]); e.target.value = ""; });

  // подсветка карточек за курсором
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".glow");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });

  updateCountBadge();

  // обучение модели с прогрессом
  await classifier.trainAsync((p) => { $("status-text").textContent = "Модель обучается… " + Math.round(p * 100) + "%"; });
  $("status-dot").classList.add("ready");
  $("status-text").textContent = "Модель готова · " + classifier.classes.length + " направлений";
  setLoading(false);
});
