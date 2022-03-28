const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();
// connect mongoDB
connectDB();

app.use("*", cors());
// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

//define route
app.use('/api/users', require('./route/api/users'));
app.use('/api/posts', require('./route/api/posts'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/profile', require('./route/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log(`Server is running on ${PORT}`));
