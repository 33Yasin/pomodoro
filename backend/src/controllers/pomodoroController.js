import { createPomodoro, getAllPomodoros, finishPomodoro, getWeeklyStats } from "../models/pomodoroModel.js";

export const getWeeklyStatsController = async (req, res) => {
  try {
    const stats = await getWeeklyStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
};

export const createPomodoroController = async (req, res) => {
  try {
    const pomodoro = await createPomodoro(req.body);
    res.status(201).json(pomodoro);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
};

export const listPomodorosController = async (req, res) => {
  try {
    const data = await getAllPomodoros();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
};

export const finishPomodoroController = async (req, res) => {
  try {
    const pomodoro = await finishPomodoro(req.params.id);
    res.json(pomodoro);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
};