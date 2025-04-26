const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const authRoutes = require('./auth/authRoutes');


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
