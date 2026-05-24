## 1. Описание системы

Система представляет собой фитнес-трекер, позволяющий:
- регистрировать пользователей;
- создавать упражнения;
- создавать тренировки;
- добавлять упражнения в тренировки;
- просматривать историю тренировок;
- получать статистику тренировок.

---

# 2. Основные сущности

## User

Поля:
- id
- login
- firstName
- lastName
- email
- createdAt

---

## Exercise

Поля:
- id
- name
- description
- caloriesPerMinute

---

## Workout

Поля:
- id
- userId
- status
- startedAt
- finishedAt

---

# 3. Commands

| Command | Назначение |
|---|---|
| CreateUserCommand | Создание пользователя |
| CreateExerciseCommand | Создание упражнения |
| CreateWorkoutCommand | Создание тренировки |
| AddExerciseToWorkoutCommand | Добавление упражнения |
| CompleteWorkoutCommand | Завершение тренировки |

---

# 4. Events

| Event | Описание |
|---|---|
| UserCreatedEvent | Пользователь создан |
| ExerciseCreatedEvent | Упражнение создано |
| WorkoutCreatedEvent | Тренировка создана |
| ExerciseAddedToWorkoutEvent | Упражнение добавлено |
| WorkoutCompletedEvent | Тренировка завершена |

---

# 5. Event Producers

| Сервис | События |
|---|---|
| User Service | UserCreatedEvent |
| Exercise Service | ExerciseCreatedEvent |
| Workout Service | WorkoutCreatedEvent |
| Workout Service | ExerciseAddedToWorkoutEvent |
| Workout Service | WorkoutCompletedEvent |

---

# 6. Event Consumers

| Сервис | Подписка |
|---|---|
| Notification Service | UserCreatedEvent |
| Notification Service | WorkoutCompletedEvent |
| Statistics Service | WorkoutCompletedEvent |
| History Service | ExerciseAddedToWorkoutEvent |
| Analytics Service | Все события |

---

# 7. Поток событий

## Создание пользователя

1. API получает запрос
2. User Service создаёт пользователя
3. Публикуется UserCreatedEvent
4. Notification Service отправляет приветствие

---

## Создание тренировки

1. Workout Service создаёт тренировку
2. Публикуется WorkoutCreatedEvent

---

## Добавление упражнения

1. Workout Service добавляет упражнение
2. Публикуется ExerciseAddedToWorkoutEvent
3. History Service обновляет историю

---

## Завершение тренировки

1. Workout Service завершает тренировку
2. Публикуется WorkoutCompletedEvent
3. Statistics Service обновляет статистику
4. Notification Service отправляет уведомление

---

# 8. RabbitMQ

## Тип Exchange

Topic Exchange

Название:
fitness.events

---

# 9. Routing Keys

| Event | Routing Key |
|---|---|
| UserCreatedEvent | user.created |
| ExerciseCreatedEvent | exercise.created |
| WorkoutCreatedEvent | workout.created |
| ExerciseAddedToWorkoutEvent | workout.exercise.added |
| WorkoutCompletedEvent | workout.completed |

---

# 10. Формат сообщений

Формат:
JSON

Пример:

{
  "eventId": "uuid",
  "eventType": "WorkoutCompletedEvent",
  "timestamp": "2026-05-24T12:00:00Z",
  "payload": {
    "workoutId": 100,
    "userId": 1,
    "durationMinutes": 60
  }
}

---

# 11. Гарантии доставки

Используется:
- at-least-once delivery

Механизмы:
- durable queues
- acknowledgements
- persistent messages

---

# 12. CQRS

CQRS применяется.

## Write Model

Команды:
- создание пользователя
- создание упражнения
- создание тренировки
- добавление упражнения
- завершение тренировки

---

## Read Model

Запросы:
- поиск пользователя
- список упражнений
- история тренировок
- статистика тренировок

---

# 13. Синхронизация моделей

После изменения write-модели публикуются события.

Read-модель обновляется асинхронно:
- Statistics Service
- History Service

---

# 14. Преимущества архитектуры

- масштабируемость
- слабая связанность
- асинхронная обработка
- независимое развитие сервисов
- удобная аналитика
