import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const WeeklyStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/pomodoros/weekly-stats');
        setStats(res.data);
        console.log('Weekly stats:', res.data); // Gelen veriyi kontrol edelim
      } catch (err) {
        console.error('Failed to fetch weekly stats:', err);
      }
    };
    fetchStats();
  }, []);

  const maxMinutes = Math.max(...stats.map(day => Number(day.total_minutes)));
  const totalMinutes = stats.reduce((acc, day) => acc + Number(day.total_minutes), 0);
  const totalSessions = stats.reduce((acc, day) => acc + Number(day.total_sessions), 0);

  return (
    <div className="h-full p-8 bg-white rounded-3xl shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-6">
        Weekly Progress
      </h2>

      {/* Grafik */}
      <div className="grid grid-cols-7 gap-2 mb-6"> {/* mb-6 ile grafik ve kutular arası boşluk */}
        {stats.map((day) => (
          <div key={day.day_name} className="flex flex-col items-center">
            <div className="h-32 w-full bg-gray-50 rounded-lg relative flex items-end">
              <div
                className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-lg transition-all duration-500"
                style={{
                  height: `${(day.total_minutes / maxMinutes) * 100}%`,
                  minHeight: day.total_minutes > 0 ? '8px' : '0'
                }}
              />
            </div>
            <p className="text-xs font-medium text-blue-600 mt-2">{day.day_name.slice(0, 3)}</p>
            <p className="text-xs text-blue-500">{formatDuration(day.total_minutes)}</p>
          </div>
        ))}
      </div>

      {/* Toplam focus ve session kutuları */}
      <div className="grid grid-cols-2 gap-4 mt-24">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-blue-600">Total Focus Time</p>
          <p className="text-2xl font-bold text-blue-800">{formatDuration(totalMinutes)}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-blue-600">Total Sessions</p>
          <p className="text-2xl font-bold text-blue-800">{totalSessions}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;