const express = require('express');
const connectDB = require('./config/db');

const app = express();
// connect mongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

//define route
app.use('/api/users', require('./api/users'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => console.log(`Server is running on ${PORT}`));