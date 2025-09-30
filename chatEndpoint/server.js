// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const channelRoutes = require("./routes/channels");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);

app.get("/", (req, res) => res.send("API running ✅"));

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
