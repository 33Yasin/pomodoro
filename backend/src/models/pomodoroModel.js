import pool from "../config/db.js";

export const createPomodoro = async ({ title, work_minutes, break_minutes }) => {
  try {
    const result = await pool.query(
      `INSERT INTO pomodoros (title, work_minutes, break_minutes)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, work_minutes, break_minutes]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ createPomodoro ERROR:", err);
    throw err;
  }
};

export const finishPomodoro = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE pomodoros
       SET finished_at = NOW(), status = 'finished'
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ finishPomodoro ERROR:", err);
    throw err;
  }
};

export const getAllPomodoros = async () => {
  try {
    const result = await pool.query(`SELECT * FROM pomodoros ORDER BY id DESC`);
    return result.rows;
  } catch (err) {
    console.error("❌ getAllPomodoros ERROR:", err);
    throw err;
  }
};

export const getWeeklyStats = async () => {
  try {
    const result = await pool.query(`
      WITH days AS (
        SELECT unnest(ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) AS day_name,
               generate_series(0, 6) AS day_number
      )
      SELECT 
        d.day_name,
        COALESCE(SUM(
          CASE 
            WHEN p.finished_at IS NOT NULL THEN 
              EXTRACT(EPOCH FROM (p.finished_at - p.created_at))/60
            ELSE p.work_minutes 
          END
        ), 0)::integer as total_minutes,
        COUNT(p.id) as total_sessions
      FROM days d
      LEFT JOIN pomodoros p ON 
        EXTRACT(DOW FROM p.created_at) = d.day_number AND
        p.created_at >= NOW() - INTERVAL '7 days'
      GROUP BY d.day_name, d.day_number
      ORDER BY d.day_number;
    `);
    return result.rows;
  } catch (err) {
    console.error("❌ getWeeklyStats ERROR:", err);
    throw err;
  }
};