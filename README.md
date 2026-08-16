# order-processing-system
**Flow:**
1. User places an order via the React frontend
2. **Order Service** saves the order (status: PENDING) and publishes `OrderCreated`
3. **Inventory Service** checks/reserves stock, publishes `InventoryReserved` or `InventoryFailed`
4. **Payment Service** (only on reserved stock) processes a mock payment, publishes `PaymentSuccess` or `PaymentFailed`
5. **Order Service** listens for the outcome and updates the order to `CONFIRMED` or `FAILED`
6. **Notification Service** listens for `PaymentSuccess` and logs a mock confirmation email

## Tech Stack

- **Backend:** Java 17, Spring Boot 4.1.0, Spring Data JPA, Spring for Apache Kafka
- **Messaging:** Apache Kafka + Zookeeper
- **Database:** PostgreSQL
- **Frontend:** React, Axios
- **Infrastructure:** Docker & Docker Compose
- **Build tool:** Maven

## Services

| Service | Port | Responsibility |
|---|---|---|
| Order Service | 8081 | Receives orders, tracks final status |
| Inventory Service | 8082 | Checks and reserves stock |
| Payment Service | 8083 | Mock payment processing |
| Notification Service | 8084 | Mock email confirmation |
| Frontend | 3000 | Order form + live status dashboard |

## Running Locally

**1. Start infrastructure:**
```bash
docker-compose up -d
```

**2. Start each backend service (separate terminals):**
```bash
cd order-service && ./mvnw spring-boot:run
cd inventory-service && ./mvnw spring-boot:run
cd payment-service && ./mvnw spring-boot:run
cd notification-service && ./mvnw spring-boot:run
```

**3. Start the frontend:**
```bash
cd frontend && npm start
```

**4. Add test inventory (via Postman or curl):**
```bash
POST http://localhost:8082/inventory
{ "productName": "Bluetooth Mouse", "stockQuantity": 5 }
```

**5. Open the app:** `http://localhost:3000`

## Key Design Decisions

- **Kafka over direct API calls:** services never call each other directly — this keeps them independently deployable, restartable, and failure-tolerant
- **Explicit Kafka bean configuration:** written manually (`KafkaProducerConfig`, `KafkaConsumerConfig`) rather than relying on Spring Boot auto-configuration, after repeatedly hitting silent auto-config failures during development
- **Shared database, separate tables:** all services currently use one Postgres instance for simplicity, with each service owning its own table — a production system would likely split these further

## What I Learned

Building this project involved real debugging beyond just writing code:
- Diagnosing silent Kafka consumer failures (no errors thrown, just nothing happening) down to a single incorrect package declaration
- Understanding Java's strict package/folder-path requirement and how it breaks silently when files are moved manually
- Resolving Docker container state corruption (Kafka/Zookeeper conflicts) via clean resets
- Handling CORS between a React frontend and a Spring Boot backend

