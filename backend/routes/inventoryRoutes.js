import express from "express";

import {
  getInventory,
  addInventory,
  deleteInventory
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/all", getInventory);

router.post("/add", addInventory);

router.delete("/:id", deleteInventory);

export default router;