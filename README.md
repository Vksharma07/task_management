Features
--------------------------------
Create, update, and manage tasks

Add teams and team members

Assign tasks to users

JWT-based authentication

Retrieve tasks along with assignees

Type-safe with TypeScript

Validation with class-validator



----------------------------------------
Tech Stack
-------------------------------
Backend: NestJS (Node.js)

Database: MySQL (or other TypeORM-supported DB)

ORM: TypeORM

Authentication: JWT, Passport

Validation: class-validator / class-transformer

Dev Tools: ts-node, nodemon

---------------------------------------------------------



Setup Instructions
--------------------------
Clone the repository
---------------------------
git clone <repo-url>
cd task_management

---------------------------
Install dependencies
--------------------------
npm install

-----------------------------------------
Configure environment variables

Create a .env file in the root:
--------------------------------------
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=NewPassword123
DB_DATABASE=task_team_db

-----------------------------
Run the app (development)
-----------------------------
npm run start:dev



Notes
------------
Use Postman or Insomnia to test APIs

Use .env to configure credentials and JWT secret

All database entities support nullable for optional fields

Use strict type-checking with TypeScript for safety
