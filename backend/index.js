import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import { PORT, NODE_ENV } from "./config.js";
import path from "path";

const app = express();

const allowedOrigins = [
  "https://reactive-notes-app.vercel.app",
  "https://mernnotesapp-production.up.railway.app",
  /\.vercel\.app$/, // Allows all Vercel preview URLs
  "http://localhost:5173",
  "http://localhost:4173",
];

app.use(
  cors({
    origin: NODE_ENV === "production" ? allowedOrigins : "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

const __dirname = path.resolve();

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server listening on port ${PORT}`);
});
