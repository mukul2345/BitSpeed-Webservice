# Bitespeed Backend Task: Identity Reconciliation

## Introduction

This project implements a web service to reconcile customer identities across multiple purchases with different contact information. The service identifies and keeps track of a customer's identity by linking different orders made with different contact information.

## Requirements

- Node.js
- MySQL

## Setup

1. Clone the repository:

    ```bash
    clone the repo
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the database connection:

    Update the database connection details in `src/models.ts` file:

    ```typescript
    const sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'mysql',
    });
    ```

4. Create the database:

    Create a MySQL database with the name specified in the `src/models.ts` file.

5. Start the application:

    ```bash
    npm start
    ```

## API Endpoint

### /identify

**Method:** POST

**Request Body:**

```json
{
  "email"?: string,
  "phoneNumber"?: number
}
```

**Response:**

```json
{
  "contact": {
    "primaryContactId": number,
    "emails": string[], // first element being email of primary contact
    "phoneNumbers": string[], // first element being phoneNumber of primary contact
    "secondaryContactIds": number[] // Array of all Contact IDs that are "secondary"
  }
}
```

## Example Requests and Responses

1. Request:

    ```json
    {
      "email": "mcfly@hillvalley.edu",
      "phoneNumber": "123456"
    }
    ```

    Response:

    ```json
    {
      "contact": {
        "primaryContactId": 1,
        "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
        "phoneNumbers": ["123456"],
        "secondaryContactIds": [23]
      }
    }
    ```

2. Request:

    ```json
    {
      "email": "lorraine@hillvalley.edu",
      "phoneNumber": null
    }
    ```

    Response:

    ```json
    {
      "contact": {
        "primaryContactId": 1,
        "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
        "phoneNumbers": ["123456"],
        "secondaryContactIds": [23]
      }
    }
    ```

## License

This project is licensed under the MIT License.
