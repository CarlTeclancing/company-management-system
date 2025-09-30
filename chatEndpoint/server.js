// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Routes
// const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes"); // fixed duplicate
const channelRoutes = require("./routes/channelsRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

// API Routes
// app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/channels", channelRoutes);

// Health check
app.get("/", (req, res) => res.send("API running ✅"));

// Socket.io setup
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
