CREATE TABLE IF NOT EXISTS pomodoros (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  work_minutes INT NOT NULL,
  break_minutes INT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'running',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);