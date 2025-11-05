import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import PomodoroForm from "./PomodoroForm";

const TimerCard = () => {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [session, setSession] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            handleFinish();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const startPomodoro = async ({ title, work_minutes, break_minutes }) => {
    try {
      const res = await api.post("/pomodoros", { title, work_minutes, break_minutes });
      const pom = res.data;
      setSession(pom);
      const secs = Number(work_minutes) * 60;
      setTotalSeconds(secs);
      setSecondsLeft(secs);
      setRunning(true);
    } catch (err) {
      console.error("API error:", err);
      alert("Sunucuya bağlanırken hata oluştu.");
    }
  };

  const handleFinish = async () => {
    setRunning(false);
    if (session?.id) {
      try {
        const res = await api.put(`/pomodoros/${session.id}/finish`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const pct = totalSeconds ? (1 - secondsLeft / totalSeconds) * 100 : 0;
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="h-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-6 md:p-8 border border-blue-100 max-w-md mx-auto">
      {/* Başlık */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Pomodoro Timer
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-2">{session?.title || "Start a new session"}</p>
      </div>

      {/* Timer Dairesi */}
      <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 mb-6">
        <svg width="100%" height="100%" viewBox="0 0 256 256" className="transform -rotate-90">
          <circle cx="128" cy="128" r="110" stroke="#e5e7eb" strokeWidth="16" fill="none" />
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="url(#gradient)"
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={(1 - pct / 100) * 2 * Math.PI * 110}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl md:text-6xl font-extrabold text-gray-800">
            {minutes}:{secs}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-purple-600 font-medium capitalize">{session ? session.status : "—"}</span>
        </div>
        <div className="h-3 md:h-4 rounded-full bg-gray-100 overflow-hidden">
          <div
            style={{ width: `${pct}%` }}
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500"
          />
        </div>
      </div>

      {/* Kontrol Butonları */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-6">
        {!session && (
          <button
            onClick={() => setRunning(true)}
            className="px-6 py-2.5 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
          >
            Start
          </button>
        )}
        {session && running && (
          <button
            onClick={() => setRunning(false)}
            className="px-6 py-2.5 rounded-2xl font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200 w-full sm:w-auto"
          >
            Pause
          </button>
        )}
        {session && !running && secondsLeft > 0 && (
          <button
            onClick={() => setRunning(true)}
            className="px-6 py-2.5 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
          >
            Resume
          </button>
        )}
        {session && (
          <button
            onClick={() => {
              setRunning(false);
              setSecondsLeft(0);
              if (session?.id)
                api
                  .put(`/pomodoros/${session.id}/finish`)
                  .then((r) => setSession(r.data))
                  .catch(console.error);
            }}
            className="px-6 py-2.5 rounded-2xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-lg w-full sm:w-auto"
          >
            Finish
          </button>
        )}
      </div>

      {/* Pomodoro Form */}
      <div className="mt-6">
        <PomodoroForm onStart={startPomodoro} />
      </div>
    </div>
  );
};

export default TimerCard;
