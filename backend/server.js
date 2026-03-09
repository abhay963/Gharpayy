import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import leadRoutes from "../routes/leadRoutes.js";
import dashboardRoutes from "../routes/dashboardRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";
import ownerRoutes from "../routes/ownerRoutes.js";
import visitRoutes from "../routes/visitRoutes.js";
import agentRoutes from "../routes/agentRoutes.js";
import inventoryRoutes from "../routes/inventoryRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
  res.send("LeadNest CRM API Running");
});

export default app;