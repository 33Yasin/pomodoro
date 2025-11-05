import React, { useState } from "react";

const PomodoroForm = ({ onStart }) => {
  const [title, setTitle] = useState("Focus Session");
  const [work, setWork] = useState(25);
  const [brk, setBrk] = useState(5);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onStart({ title, work_minutes: Number(work), break_minutes: Number(brk) });
      }}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Title + Start */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
            placeholder="What are you focusing on?"
          />
          <button className="w-full md:w-auto px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200 transition-all duration-200">
            Start
          </button>
        </div>

        {/* Work / Break */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
          <label className="flex items-center gap-2 text-sm text-blue-600">
            <span className="font-medium">Work</span>
            <input
              type="number"
              value={work}
              min="1"
              onChange={(e) => setWork(e.target.value)}
              className="w-16 px-3 py-1.5 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <span className="text-blue-500">min</span>
          </label>

          <div className="hidden sm:block h-8 w-px bg-blue-200"></div>

          <label className="flex items-center gap-2 text-sm text-blue-600">
            <span className="font-medium">Break</span>
            <input
              type="number"
              value={brk}
              min="1"
              onChange={(e) => setBrk(e.target.value)}
              className="w-16 px-3 py-1.5 rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <span className="text-gray-500">min</span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default PomodoroForm;
