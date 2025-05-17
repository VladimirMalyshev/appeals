# 📬 Appeal Service API

Простое REST-приложение на базе **Express.js** и **Prisma ORM** для управления обращениями (appeals). Проект предоставляет CRUD-интерфейс с возможностью обработки, отмены и завершения обращений.

## ⚙️ Стек технологий

- **Node.js / Express** — HTTP-сервер и маршрутизация
- **Prisma** — ORM для работы с PostgreSQL
- **PostgreSQL** — хранилище данных
- **Swagger (OpenAPI)** — автогенерация документации
- **Docker Compose** — удобный запуск и изоляция окружения

---

## 🚀 Запуск проекта

> Убедитесь, что установлен Docker и Docker Compose, а так же добавлен .env для работы с бд

```bash
docker-compose up --build
