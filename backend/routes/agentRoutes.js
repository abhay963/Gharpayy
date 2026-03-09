import express from "express";
import {
  addAgent,
  getAgents,
  deleteAgent,
} from "../controllers/agentController.js";

const router = express.Router();

/* ADD AGENT */
router.post("/add", addAgent);

/* GET ALL AGENTS */
router.get("/all", getAgents);

/* DELETE */
router.delete("/:id", deleteAgent);

export default router;