
The backend is built with Node.js and Express.js following the MVC architecture. It handles routing, business logic, authentication, and interacts with the database (SQL and MongoDB).

Running the Backend
Create a .env file in the backend directory with the following variables:


MONGO_URI=mongodb://localhost:27017/your_mongo_database
SQL_DATABASE=ecommerce_db
SQL_USER=root
SQL_PASSWORD=
SQL_HOST=localhost
MONGO_URI=""
JWT_SECRET=your_jwt_secret_key

Run the server:
bash
Copy
Edit
# In the backend directory
npm run dev
