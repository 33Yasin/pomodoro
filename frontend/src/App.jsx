import React from "react";
import TimerCard from "./components/TimerCard";
import WeeklyStats from "./components/WeeklyStats";
import Quote from "./components/Quote";

const App = () => (
  <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mx-auto">
      {/* Sol taraf */}
      <div>
        <TimerCard />
      </div>

      {/* Sağ taraf: WeeklyStats ve Quote alt alta */}
      <div className="flex flex-col gap-6">
        <WeeklyStats />
        <Quote />
      </div>
    </div>
  </div>
);

export default App;
