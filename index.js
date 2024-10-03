// server.js or app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import FinalRoute from "./Routes/finalRoute.js";
import LiveRoute from "./Routes/liveRoute.js";
import TennisRoute from './Routes/tennisRoute.js';
import bodyParser from "body-parser";
import CricketRoute from './Routes/cricketRoute.js';
import userRoutes from './Routes/userRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app); // Attach HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/final", FinalRoute);
app.use('/live', LiveRoute);
app.use('/tennis', TennisRoute);
app.use('/cricket', CricketRoute);
app.use('/users', userRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server using server.listen
const PORT = process.env.PORT || 5000; // Use PORT from environment variables
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };
