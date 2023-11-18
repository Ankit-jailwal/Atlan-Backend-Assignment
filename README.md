# Atlan Custom Form

![Atlan Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Atlan-logo-full.svg/500px-Atlan-logo-full.svg.png)

## Table of Contents
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database](#database)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Endpoint](#api-endpoint)
- [Monitoring and Logging](#monitoring-and-logging)
- [Scalability and Fault Tolerance: Kubernetes Integration](#scalability-and-fault-tolerance-kubernetes-integration)


---

## Tech Stack

![Node.js](https://img.icons8.com/color/48/000000/nodejs.png) <img src="https://geekflare.com/wp-content/uploads/2023/01/expressjs.png" alt="ExpressJS Logo" height="48">![PostgreSQL](https://img.icons8.com/color/48/000000/postgreesql.png) <img src="https://cdn.hackr.io/uploads/topics_svg/1536904432qt5UqxetWn.svg" alt="RabbitMQ Icon" width="48" height="48"> ![Docker Compose](https://img.icons8.com/color/48/000000/docker.png)  ![Twilio](https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-twilio-is-a-cloud-communications-platform-as-a-service-company-logo-color-tal-revivo.png) ![Google Sheets](https://img.icons8.com/color/48/000000/google-sheets.png)


## Installation

### Prerequisites
1. Docker
2. PostgreSQL
3. npm
   
To get started with the project, follow these steps:

1. Clone the repository:
   ```
   https://github.com/Ankit-jailwal/Atlan-Backend-Assignment.git
   ```
   
2. Set up environment variables. Copy the `.env.example` file to `.env` and fill in the required values in all three services(main service, google sheet service and twilio service).

3. Navigate to the project directory and run:
   ``` 
   docker-compose up --build
   ```
   Note: Make sure docker is running
  

## Database

![DBMS ER diagram (UML notation) (1)](https://github.com/Ankit-jailwal/Atlan-Backend-Assignment/assets/55527244/22064398-d7d9-4855-a445-23c5526b49ff)

I have used Sequelize, a Node.js ORM, to manage the database. It defines models for forms, questions, responses, and answers with appropriate associations.

### Models
1. **Form**:
   - Attributes: `title` (string, required), `email` (string), `created_by` (string).
2. **Response**:
   - No attributes.
3. **Question**:
   - Attributes: `text` (string, required), `mandatory` (boolean, default: false).
4. **Answer**:
   - Attributes: `text` (string, required).

### Associations

- **Form** has many **Questions**, and the association deletes associated questions when a form is deleted.
- **Question** belongs to a **Form**.
- **Form** has many **Responses**, and the association deletes associated responses when a form is deleted.
- **Response** belongs to a **Form** and a **Question**.
- **Response** has many **Answers**, and the association deletes associated answers when a response is deleted.
- **Answer** belongs to a **Response** and a **Question**.
- **Question** has many **Answers**, and the association deletes associated answers when a question is deleted.

## Architecture

![Atlan Architecture drawio (2)](https://github.com/Ankit-jailwal/Atlan-Backend-Assignment/assets/55527244/6d0813a5-2211-4fee-9a90-37bd8831691e)

### Overview

This project comprises a main Node.js service and plug-and-play services for extensible functionality. The main service acts as the core application, while plug-and-play services, such as Google Sheet and Twilio SMS, can be easily integrated for various use cases.

### Main Service

The main service is the central component, processing requests, implementing logic, and interfacing with databases. It follows the MVC pattern, using Express.js for APIs and Sequelize ORM for database operations.

### Plug-and-Play Services

These services seamlessly integrate with the architecture, developed and maintained independently. They extend app capabilities as needed.

**Key Characteristics:**
- Modularity: Each service focuses on specific functionality.
- Plug-and-Play: New services can be added without altering the main service.
- Asynchronous Communication: RabbitMQ enables loose, async coupling.
- Scalability: Services scale independently.

### Communication via RabbitMQ

RabbitMQ enables async message exchange between the main service and plug-and-play services. Decoupled communication enhances flexibility.

### Google Sheet Integration

One service integrates the Google Sheets API. It acquires and writes data to a Google Sheet, expanding data storage options. 

Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1rSyxb8YEthyVU_FJyz2zsS2VVn2z97_idoPjZ4BGlGU/edit#gid=0
```

### Twilio SMS Integration

Another service integrates the Twilio SMS API. It sends SMS notifications, enhancing communication.

### Docker Compose for Containerization

Docker Compose manages services as containers. Each has an isolated environment, ensuring consistent deployments. Configuration is in the docker-compose.yml file.

### Service Provider Perspective

Providers integrate services based on needs. They can choose existing plug-and-play options or create custom services. This empowers providers to enhance app capabilities.

### Benefits of the Architecture

- Scalability: Independent service scaling.
- Modularity: Focused services for maintainability.
- Decoupled Communication: Resilient async interaction.
- Flexibility: Extensible via plug-and-play services.
- Isolation: Docker containers minimize conflicts.

## Project Structure
The project structure is organized as follows:
```
project-root/
├── controller/
├── messagequeue/
├── middleware/
├── models/
├── postprocessing/
├── route/
└── services/
    ├── googlesheetservice/
    │   ├── helper/
    │   └── controller/
    └── smsservice/
        ├── helper/
        └── controller/
```

## API Endpoint
The backend exposes the following API endpoints:
- **GET /health**: Check the health status of the service.
- **GET /form**: Retrieve a list of all forms.
- **POST /form/create**: Create a new form.
- **GET /form/:formId**: Retrieve a specific form by its ID.
- **POST /form/:formId/create**: Create a new question within a form.
- **TODO DELETE /form/:formId**: Delete a form by its ID.
- **TODO PATCH /form/:formId**: Update a form by its ID.
- **POST /form/:formId**: Fill out a form.
- **GET /question**:  Get a list of all questions.
- **TODO DELETE /question/:questionId**: Delete a question by its ID.
- **TODO PATCH /question/:questionId**: Update a question by its ID.
- **GET /response**: Get a list of all responses.
- **GET /response/:responseId**: Get a response by its ID.
- **TODO DELETE /response/:responseId**: Delete a response by its ID.
- **TODO PATCH /response/:responseId**: Update a response by its ID.

## Usage

- To check the health of the service, send a GET request to `/health`.
- To retrieve all forms, use a GET request to `/form`.
- To create a new form, send a POST request to `/form/create` with the necessary data.
- To retrieve a specific form, use a GET request to `/form/:formId`, where `:formId` is the ID of the form.
- To create a question within a form, send a POST request to `/form/:formId/create` and provide the question details.
- To delete a form, use a DELETE request to `/form/:formId`, providing the form's ID.
- To update a form, send a PATCH request to `/form/:formId` with the updated data.
- To fill out a form, send a POST request to `/form/:formId` with the form submission data.
- To retrieve all questions, use a GET request to `/question`.
- To delete a question, use a DELETE request to `/question/:questionId`, providing the question's ID.
- To update a question, send a PATCH request to `/question/:questionId` with the updated question details.
- To retrieve all responses, use a GET request to `/response`.
- To retrieve a specific response, use a GET request to `/response/:responseId`, where `:responseId` is the ID of the response.
- To delete a response, use a DELETE request to `/response/:responseId`.
- To update a response, send a PATCH request to `/response/:responseId` with the updated response details.

## Monitoring and Logging

### Logging Configuration

Each service's logging configuration is set up using the `logging` section within the Docker Compose file. The configuration includes the following details:

- `driver`: The logging driver used, which is set to `"json-file"`.
- `options`:
  - `max-size`: Specifies the maximum size of each log file (e.g., `"10m"` for 10 megabytes).
  - `max-file`: Specifies the maximum number of log files to retain (e.g., `"3"` to keep 3 files).

### Retrieving Logs

To retrieve logs for a specific service, you can use the following Docker Compose command:

```
docker-compose logs <service-name>
```

## Scalability and Fault Tolerance: Kubernetes Integration

To elevate scalability and fortify fault tolerance, we can integrate Kubernetes. This container orchestration solution offers:

- **Automated Scaling:** Utilizes Horizontal Pod Autoscaling for dynamic resource adjustments based on metrics.
- **High Availability:** Benefit from Replication Controllers and Deployments for swift recovery from pod failures.
- **Efficient Load Balancing:** Employ Kubernetes Services for even traffic distribution across pods.
- **Seamless Updates:** Facilitate controlled rolling updates and quick rollbacks.
- **Stateful Application Support:** Leverage StatefulSets for orderly scaling and recovery.
- **Robust Fault Tolerance:** Automatic pod restarts and node rescheduling in case of failures.
- **Self-Healing:** Kubernetes maintains desired application states, minimizing manual interventions.

The proposed Kubernetes integration empowers the project with advanced capabilities to handle varying demands and maintain stability even during unexpected events.



 **If you encounter any issues or have questions, please open an [issue](https://github.com/Ankit-jailwal/Atlan-Backend-Assignment/issues).**
