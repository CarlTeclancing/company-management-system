const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const db = require('./config/db');



const app = express();
//app.use(cors());

// Allow requests from localhost:5173 (Vite/React frontend)
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    })
)

app.use(express.json());
app.use(morgan('dev'));



const authRoutes = require('./auth/authRoutes');


app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/users', require('./routes/userRoutes'));
app.use('/v1/api/company', require('./routes/companyRoutes'));
app.use('/v1/api/projects', require('./routes/projectRoutes'));
app.use('/v1/api/tasks', require('./routes/taskRoutes'));
// app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/v1/api/finance', require('./routes/financeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
