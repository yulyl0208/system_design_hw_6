# Fitness Tracker 

## Описание проекта

Проект демонстрирует:
- Event-Driven Architecture
- RabbitMQ
- CQRS
- Producer/Consumer взаимодействие

---

# Используемые технологии

- Node.js
- RabbitMQ
- Docker
- amqplib

---

# Структура проекта

system_design_hw_6/
│
├── docker-compose.yml
├── package.json
├── producer.js
├── consumer.js
├── event_driven_design.md
├── event_catalog.md
├── README.md
└── .gitignore

---

# Запуск RabbitMQ

docker compose up -d

---

# RabbitMQ Management UI

http://localhost:15672

Логин:
admin

Пароль:
admin

---

# Установка зависимостей

npm install

---

# Запуск consumer

npm run consumer

---

# Запуск producer


npm run producer
