# CREDIT APPROVAL SYSTEM

## Description

This is a credit approval system that allows customers to register, apply for loans, view their loan statements, and make payments. The system calculates the credit score of the customer based on their payment history and loan details. The credit score is calculated using the following formula:

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
DB_NAME= DATABASE_NAME
DB_USER= DATABASE_USER
DB_PASSWORD= DATABASE_PASSWORD
DB_HOST= DATABASE_HOST
DB_PORT= DATABASE_PORT
DB_DIALECT= DATABASE_DIALECT
```

## Run Locally

Clone the project

```bash
git clone https://github.com/sparshmahajan/credit-score-calculator.git
```

Go to the project directory

```bash
cd credit-score-calculator
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

The server will start at http://localhost:3000

## Run with Docker

First, ensure the environment variables are set in the `.env` file as

```bash
DB_NAME= credit_score_calculator
DB_USER= postgres
DB_PASSWORD= password
DB_HOST= host.docker.internal
DB_PORT= 5432
DB_DIALECT= postgres
```

Then, build and run the Docker containers using Docker Compose

```bash
docker compose up --build
```

## API Reference

This project exposes the following endpoints:

### Register a new customer

```http
  POST /api/register
```

| Body    | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `name`  | `string` | **Required**. Customer name         |
| `email` | `string` | **Required**. Customer email        |
| `phone` | `string` | **Required**. Customer phone number |

### View-Loan

```http
  GET /api/view-loan/:loanId
```

| Params   | Type     | Description           |
| :------- | :------- | :-------------------- |
| `loanId` | `string` | **Required**. Loan ID |

### view-statement

```http
  GET /api/view-statement/:customerId/:loanId
```

| Params       | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `customerId` | `string` | **Required**. Customer ID |
| `loanId`     | `string` | **Required**. Loan ID     |

### check-eligibility

```http
  GET /api/check-eligibility
```

| Body            | Type     | Description                 |
| :-------------- | :------- | :-------------------------- |
| `customerId`    | `number` | **Required**. Customer ID   |
| `loan_amount`   | `number` | **Required**. Loan amount   |
| `interest_rate` | `number` | **Required**. Interest rate |
| `tenure`        | `number` | **Required**. Loan term     |

### create-loan

```http
  POST /api/create-loan
```

| Body            | Type     | Description                 |
| :-------------- | :------- | :-------------------------- |
| `customerId`    | `number` | **Required**. Customer ID   |
| `loan_amount`   | `number` | **Required**. Loan amount   |
| `interest_rate` | `number` | **Required**. Interest rate |
| `tenure`        | `number` | **Required**. Loan term     |

### make-payment

```http
  POST /api/make-payment/:customerId/:loanId
```

| Params       | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `customerId` | `string` | **Required**. Customer ID |
| `loanId`     | `string` | **Required**. Loan ID     |

| Body           | Type      | Description                  |
| :------------- | :-------- | :--------------------------- |
| `amount`       | `number`  | **Required**. Payment amount |
| `paid_on_time` | `boolean` | **Required**. Payment status |

## POSTMAN Collection

The POSTMAN collection for the API can be found [here](https://elements.getpostman.com/redirect?entityId=22859744-9c0c2735-da76-4a6d-8723-e600f367c38d&entityType=collection)

## Tech Stack

**Server:** Node, Express, Sequelize, TypeScript

**Database:** PostgreSQL

**Containerization:** Docker
