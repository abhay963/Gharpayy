import express from "express";
import {
  getOwners,
  getOwnerProperties
} from "../controllers/ownerController.js";

const router = express.Router();

/* GET OWNERS */

router.get("/all", getOwners);

/* GET OWNER PROPERTIES */

router.get("/:owner", getOwnerProperties);

export default router;