import express from "express";
import {
  createLead,
  getLeads,
  getRecentLeads,
  updateLeadStatus
} from "../controllers/leadController.js";

const router = express.Router();

router.post("/create", createLead);
router.get("/all", getLeads);
router.get("/recent", getRecentLeads);   // ⭐ NEW ROUTE
router.put("/update-status/:id", updateLeadStatus);

export default router;