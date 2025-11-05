import express from "express";
import { 
  createPomodoroController, 
  listPomodorosController, 
  finishPomodoroController,
  getWeeklyStatsController
} from "../controllers/pomodoroController.js";

const router = express.Router();

router.post("/", createPomodoroController);
router.get("/", listPomodorosController);
router.get("/weekly-stats", getWeeklyStatsController);
router.put("/:id/finish", finishPomodoroController);

export default router;