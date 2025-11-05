import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";

dotenv.config();

import pomodoroRoutes from "./routes/pomodoroRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

// ZenQuotes API'den rastgele alıntı çek
app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    // data bir array olarak geliyor, genelde tek elemanlı
    const quote = {
      text: data[0].q,   // alıntı metni
      author: data[0].a  // yazar
    };

    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Quote could not be fetched' });
  }
});

app.use("/api/pomodoros", pomodoroRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Backend running → http://localhost:${process.env.PORT}`)
);