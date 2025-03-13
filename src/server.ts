import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

// Initialize the database connection
await db();

// Set the port for the server, defaulting to 3001 if not provided
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Use defined routes from the routes folder
app.use(routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
