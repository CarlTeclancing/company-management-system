const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const db = require('./config/db');

const app = express();

// Allow requests from anywhere (you can restrict later if needed)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./auth/authRoutes');
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/users', require('./routes/userRoutes'));
app.use('/v1/api/company', require('./routes/companyRoutes'));
app.use('/v1/api/projects', require('./routes/projectRoutes'));
app.use('/v1/api/tasks', require('./routes/taskRoutes'));
app.use('/v1/api/finance', require('./routes/financeRoutes'));
app.use('/v1/api/meetings', require('./routes/meetingsRoutes'));
app.use('/v1/api/clients', require('./routes/clientsRoutes'));

// ✅ Export the app instead of listening
module.exports = app;


