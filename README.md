# Virtual Event Management Backend with Node.js and Express.js, and TypeScript, PostgreSql

This repository contains the backend system for a virtual event management platform. The system focuses on user registration, event scheduling, and participant management, all managed through in-memory data structures. Secure user authentication is implemented using bcrypt for password hashing and JWT for session management.

## Features

### User Authentication

- Users can register and log in securely using bcrypt for password hashing and JWT for token-based authentication.
- User profiles are managed in-memory, distinguishing between event organizers and attendees.

### Event Management

- Events can be created, updated, and deleted, with details such as date, time, description, and participant list stored in-memory.
- CRUD operations for managing events are accessible only by authorized users (event organizers).

### Participant Management

- Users can register for events, and participant lists are managed Sql Database.
- The system handles attendee registrations securely.

### RESTful API Endpoints

- **POST api/v1/users/register**: User registration endpoint.
- **POST api/v1/users/login**: User login endpoint.
- **GET api/v1//events**: Retrieve all events.
- **POST api/v1//events**: Create a new event.
- **PUT api/v1//events/:id**: Update an existing event.
- **POST api/v1//events/:id/register**: Register for an event.

## Project Setup

### Prerequisites

- Node.js version 18 or later
- npm or yarn package manager
- setup config folder

config/development.json

```{
    "server": {
      "port": 3000,
      "jwtSecret": "<SECRET_KEY>",
      "expiresIn": "1d",
      "debug": true,
      "NODE_ENV": "development"
    },
    "email": {
      "host": "<host>",
      "port": 2525,
      "user": "<user>",
      "pass": "<pass>"
    }
  }
```

ormconfig.development.json

```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "<username>",
    "password": "<password>",
    "database": "<database>",
    "synchronize": true,
    "logging": true,
    "entities": ["dist/models/**/*.js"],
    "migrations": ["dist/migrations/**/*.js"],
    "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": "src/migrations"
    }
  }

```

### Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jayantc20/News-Hub.git
   cd News-Hub
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm run start:dev
   ```

## Postman Collection

You can import and test the APIs using the [Postman Collection](https://github.com/jayantc20/Virtual-Events/blob/master/virtual-Event.postman_collection.json).

### Importing the Collection in Postman

1. Download the Postman Collection File.
2. Open Postman.
3. Click on "Import" at the top-left corner.
4. Choose the downloaded collection file.
5. The collection should now be available in your Postman workspace.

6. **Test the API using Postman or a similar tool:** [Pending]

   ```bash
   npm run test
   ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the [MIT License](LICENSE).
