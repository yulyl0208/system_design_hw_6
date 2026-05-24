# 1. UserCreatedEvent

## Producer
User Service

## Consumers
- Notification Service
- Analytics Service

## Routing Key
user.created

## Delivery
at-least-once

## Payload

{
  "eventId": "uuid",
  "eventType": "UserCreatedEvent",
  "timestamp": "2026-05-24T10:00:00Z",
  "payload": {
    "userId": 1,
    "login": "john123",
    "firstName": "John",
    "lastName": "Smith"
  }
}

---

# 2. ExerciseCreatedEvent

## Producer
Exercise Service

## Consumers
- Analytics Service

## Routing Key
exercise.created

## Delivery
at-least-once

## Payload

{
  "eventId": "uuid",
  "eventType": "ExerciseCreatedEvent",
  "timestamp": "2026-05-24T10:10:00Z",
  "payload": {
    "exerciseId": 10,
    "name": "Push-ups"
  }
}

---

# 3. WorkoutCreatedEvent

## Producer
Workout Service

## Consumers
- Analytics Service

## Routing Key
workout.created

## Delivery
at-least-once

## Payload

{
  "eventId": "uuid",
  "eventType": "WorkoutCreatedEvent",
  "timestamp": "2026-05-24T11:00:00Z",
  "payload": {
    "workoutId": 100,
    "userId": 1
  }
}

---

# 4. ExerciseAddedToWorkoutEvent

## Producer
Workout Service

## Consumers
- History Service
- Analytics Service

## Routing Key
workout.exercise.added

## Delivery
at-least-once

## Payload

{
  "eventId": "uuid",
  "eventType": "ExerciseAddedToWorkoutEvent",
  "timestamp": "2026-05-24T11:10:00Z",
  "payload": {
    "workoutId": 100,
    "exerciseId": 10,
    "repetitions": 20
  }
}

---

# 5. WorkoutCompletedEvent

## Producer
Workout Service

## Consumers
- Statistics Service
- Notification Service
- Analytics Service

## Routing Key
workout.completed

## Delivery
at-least-once

## Payload

{
  "eventId": "uuid",
  "eventType": "WorkoutCompletedEvent",
  "timestamp": "2026-05-24T12:00:00Z",
  "payload": {
    "workoutId": 100,
    "userId": 1,
    "durationMinutes": 60,
    "caloriesBurned": 500
  }
}
