import express from "express";
import { scheduleVisit, getVisitsByLead, updateVisitOutcome } from "../controllers/visitController.js";

const router = express.Router();

router.post("/schedule", scheduleVisit);
router.get("/:leadId", getVisitsByLead);
router.put("/update-outcome/:id", updateVisitOutcome);

export default router;