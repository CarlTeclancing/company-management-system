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
const invoiceRoute = require('./routes/invoiceRoutes')
const itemRoutes = require('./routes/itemRoutes')


app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/users', require('./routes/userRoutes'));
app.use('/v1/api/company', require('./routes/companyRoutes'));
app.use('/v1/api/projects', require('./routes/projectRoutes'));
app.use('/v1/api/tasks', require('./routes/taskRoutes'));
app.use('/v1/api/inventory', require('./routes/inventoryRoutes'));
app.use('/v1/api/finance', require('./routes/financeRoutes'));
app.use('/v1/api/meetings', require('./routes/meetingsRoutes'));
app.use('/V1/api/clients', require('./routes/clientsRoutes'));


app.use('/v1/api/invoices', invoiceRoute)
app.use('/v1/api/items', itemRoutes)
// Add this before app.listen()
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API. Here are the available routes:",
        routes: {
            "/v1/api/auth": "Authentication (login, register, etc.)",
            "/v1/api/users": "User management (CRUD operations for users)",
            "/v1/api/company": "Company information and management",
            "/v1/api/projects": "Project management (create, update, list projects)",
            "/v1/api/tasks": "Task management for projects",
            "/v1/api/inventory": "Inventory/stock management",
            "/v1/api/finance": "Financial operations and records",
            "/v1/api/meetings": "Meeting scheduling and management",
            "/v1/api/clients": "Client information and management",
            "/v1/api/invoices": "Invoice management",
            "/v1/api/items": "Item/product management"
        }
    });
});

//handling routing issues

const path = require("path");

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
