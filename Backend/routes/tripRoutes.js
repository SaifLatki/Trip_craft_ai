import express from "express";
import {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  shareTrip,
  getSharedTrip,
} from "../controllers/tripController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/shared/:shareId", getSharedTrip); // public, no auth

router.use(protect);
router.route("/").post(createTrip).get(getMyTrips);
router.route("/:id").get(getTripById).put(updateTrip).delete(deleteTrip);
router.post("/:id/share", shareTrip);

export default router;
