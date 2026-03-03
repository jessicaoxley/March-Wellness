import React, { useState } from 'react';
import { Brain, Activity as ActivityIcon, Utensils, BatteryCharging, ChevronLeft, ChevronRight, Trophy, CheckCircle2, Circle, CalendarDays, Award } from 'lucide-react';

// --- DATA ---
const PILLARS = {
  foundation: { id: 'foundation', name: 'Foundation', subtitle: 'Mindset + Environment', icon: Brain, color: 'bg-blue-500', textColor: 'text-blue-600', lightBg: 'bg-blue-50', borderColor: 'border-blue-200' },
  activity: { id: 'activity', name: 'Activity', subtitle: 'Exercise + Movement', icon: ActivityIcon, color: 'bg-red-500', textColor: 'text-red-600', lightBg: 'bg-red-50', borderColor: 'border-red-200' },
  nutrition: { id: 'nutrition', name: 'Nutrition', subtitle: 'Fuel + Hydration', icon: Utensils, color: 'bg-green-500', textColor: 'text-green-600', lightBg: 'bg-green-50', borderColor: 'border-green-200' },
  recovery: { id: 'recovery', name: 'Recovery', subtitle: 'Rest + Recharge', icon: BatteryCharging, color: 'bg-orange-500', textColor: 'text-orange-600', lightBg: 'bg-orange-50', borderColor: 'border-orange-200' },
};

const TASKS = [
  // Foundation
  { id: 'f1_1', pillar: 'foundation', points: 1, text: '5 minutes of journaling' },
  { id: 'f1_2', pillar: 'foundation', points: 1, text: '5 min- prayer/meditation' },
  { id: 'f1_3', pillar: 'foundation', points: 1, text: '10+ min of personal growth podcast/audiobook' },
  { id: 'f2_1', pillar: 'foundation', points: 2, text: 'Keep track of your daily/weekly wins & goals!' },
  { id: 'f2_2', pillar: 'foundation', points: 2, text: 'Declutter a space of your home or work area!' },
  { id: 'f3_1', pillar: 'foundation', points: 3, text: 'Attend church, family/friend outing, or personal growth event!' },
  
  // Activity
  { id: 'a1_1', pillar: 'activity', points: 1, text: '30-60 min workout' },
  { id: 'a1_2', pillar: 'activity', points: 1, text: '7,000+ daily steps' },
  { id: 'a1_3', pillar: 'activity', points: 1, text: 'Stand up/move around every hour when awake' },
  { id: 'a2_1', pillar: 'activity', points: 2, text: 'Bring a friend to workout with you!' },
  { id: 'a2_2', pillar: 'activity', points: 2, text: 'Hit a new personal record during your exercise sesh!' },
  { id: 'a3_1', pillar: 'activity', points: 3, text: 'Inquire about, book, or complete a personal training session!' },

  // Nutrition
  { id: 'n1_1', pillar: 'nutrition', points: 1, text: 'Water -- drink half your body weight in ounces.' },
  { id: 'n1_2', pillar: 'nutrition', points: 1, text: 'Prioritize protein at every meal.' },
  { id: 'n1_3', pillar: 'nutrition', points: 1, text: 'No alcohol!' },
  { id: 'n2_1', pillar: 'nutrition', points: 2, text: 'Track your macros using app, photos, or notes!' },
  { id: 'n2_2', pillar: 'nutrition', points: 2, text: 'Plan out your meals/NO eating out!' },
  { id: 'n3_1', pillar: 'nutrition', points: 3, text: 'Follow a nutrition plan designed for you or work with a coach!' },

  // Recovery
  { id: 'r1_1', pillar: 'recovery', points: 1, text: '7+ hours of sleep' },
  { id: 'r1_2', pillar: 'recovery', points: 1, text: '5-10 min of foam rolling or stretching after workout.' },
  { id: 'r1_3', pillar: 'recovery', points: 1, text: '5+ min of breathwork.' },
  { id: 'r2_1', pillar: 'recovery', points: 2, text: 'Complete cold shower or warm bath (your choice!)' },
  { id: 'r2_2', pillar: 'recovery', points: 2, text: 'Digital detox at night- at least 1 hour before bed!' },
  { id: 'r3_1', pillar: 'recovery', points: 3, text: 'Book or complete a self-care outing (massage, spa, hobby you enjoy, etc.)' },
];

const WEEKLY_CHALLENGES = [
  { id: 'w1', week: 1, title: 'Week 1: TIP OFF!', text: 'Take your initial before picture AND write down your 5 week goal and why it\'s important!', points: 10 },
  { id: 'w2', week: 2, title: 'Week 2 Challenge', text: 'Check with your coach for this week\'s 10 point challenger!', points: 10 },
  { id: 'w3', week: 3, title: 'Week 3 Challenge', text: 'Check with your coach for this week\'s 10 point challenger!', points: 10 },
  { id: 'w4', week: 4, title: 'Week 4 Challenge', text: 'Check with your coach for this week\'s 10 point challenger!', points: 10 },
  { id: 'w5', week: 5, title: 'Week 5 Challenge', text: 'Check with your coach for this week\'s 10 point challenger!', points: 10 },
];

// --- HOOKS ---
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue] as const;
}

// --- UTILS ---
const getLocalISODate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

const formatDateDisplay = (dateStr: string) => {
  const date = new Date(dateStr + 'T12:00:00'); // Force noon to avoid timezone shifts
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(getLocalISODate(new Date()));
  const [records, setRecords] = useLocalStorage<Record<string, Record<string, boolean>>>('wellness_records', {});
  const [weeklyProgress, setWeeklyProgress] = useLocalStorage<Record<string, boolean>>('wellness_weekly', {});

  // Navigation
  const handlePrevDay = () => {
    const d = new Date(currentDate + 'T12:00:00');
    d.setDate(d.getDate() - 1);
    setCurrentDate(getLocalISODate(d));
  };

  const handleNextDay = () => {
    const d = new Date(currentDate + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    setCurrentDate(getLocalISODate(d));
  };

  const handleToday = () => {
    setCurrentDate(getLocalISODate(new Date()));
  };

  // Toggling
  const toggleTask = (taskId: string) => {
    setRecords(prev => {
      const dayRecord = prev[currentDate] || {};
      return {
        ...prev,
        [currentDate]: {
          ...dayRecord,
          [taskId]: !dayRecord[taskId]
        }
      };
    });
  };

  const toggleWeekly = (challengeId: string) => {
    setWeeklyProgress(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };

  // Calculations
  const currentDayRecord = records[currentDate] || {};
  
  const getPillarScore = (pillarId: string, record: Record<string, boolean>) => {
    const pillarTasks = TASKS.filter(t => t.pillar === pillarId);
    let score = 0;
    pillarTasks.forEach(task => {
      if (record[task.id]) {
        score += task.points;
      }
    });
    return Math.min(score, 10); // Max 10 points per pillar
  };

  const dailyTotal = Object.keys(PILLARS).reduce((sum, pillarId) => sum + getPillarScore(pillarId, currentDayRecord), 0);

  const calculateTotalScore = () => {
    let total = 0;
    // Sum all daily points
    Object.values(records).forEach(dayRecord => {
      Object.keys(PILLARS).forEach(pillarId => {
        total += getPillarScore(pillarId, dayRecord);
      });
    });
    // Sum weekly challenges
    WEEKLY_CHALLENGES.forEach(wc => {
      if (weeklyProgress[wc.id]) {
        total += wc.points;
      }
    });
    return total;
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-stone-900 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">March 'Well'ness</h1>
            <p className="text-stone-400 text-xs tracking-widest uppercase">Showdown Tracker</p>
          </div>
          <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-full border border-stone-700">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono font-bold text-yellow-500">{calculateTotalScore()}</span>
            <span className="text-xs text-stone-400 uppercase tracking-wider">Total</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-stone-200">
          <button onClick={handlePrevDay} className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <div className="flex flex-col items-center cursor-pointer" onClick={handleToday}>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-stone-400" />
              <span className="font-bold text-stone-800">{formatDateDisplay(currentDate)}</span>
            </div>
            {currentDate === getLocalISODate(new Date()) && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full mt-1">Today</span>
            )}
          </div>
          <button onClick={handleNextDay} className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* Daily Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Daily Score</h2>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-black text-stone-900 tracking-tighter">{dailyTotal}</span>
              <span className="text-lg font-medium text-stone-400">/ 40</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-32 h-3 bg-stone-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(dailyTotal / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(PILLARS).map(pillar => {
            const score = getPillarScore(pillar.id, currentDayRecord);
            const isMaxed = score === 10;
            const Icon = pillar.icon;
            
            return (
              <div key={pillar.id} className={`bg-white rounded-2xl border ${isMaxed ? pillar.borderColor : 'border-stone-200'} shadow-sm overflow-hidden flex flex-col`}>
                {/* Pillar Header */}
                <div className={`${pillar.lightBg} p-4 border-b ${isMaxed ? pillar.borderColor : 'border-stone-100'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${pillar.color} text-white shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${pillar.textColor}`}>{pillar.name}</h3>
                      <p className="text-xs text-stone-500 font-medium">{pillar.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl font-black ${isMaxed ? pillar.textColor : 'text-stone-700'}`}>{score}</span>
                      <span className="text-xs font-bold text-stone-400">/10</span>
                    </div>
                    {isMaxed && <span className={`text-[10px] font-bold uppercase tracking-wider ${pillar.textColor}`}>Maxed!</span>}
                  </div>
                </div>

                {/* Tasks List */}
                <div className="p-4 flex-1 space-y-4">
                  {[1, 2, 3].map(pointValue => {
                    const tasksForPoints = TASKS.filter(t => t.pillar === pillar.id && t.points === pointValue);
                    if (tasksForPoints.length === 0) return null;
                    
                    return (
                      <div key={pointValue}>
                        <div className="mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            {pointValue} Point{pointValue > 1 ? 's' : ''} {pointValue === 3 ? 'Bonus' : ''}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {tasksForPoints.map(task => {
                            const isChecked = !!currentDayRecord[task.id];
                            return (
                              <button
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors border ${
                                  isChecked 
                                    ? 'bg-stone-50 border-stone-200' 
                                    : 'bg-white border-transparent hover:bg-stone-50 hover:border-stone-200'
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {isChecked ? (
                                    <CheckCircle2 className={`w-5 h-5 ${pillar.textColor}`} />
                                  ) : (
                                    <Circle className="w-5 h-5 text-stone-300" />
                                  )}
                                </div>
                                <span className={`text-sm leading-snug ${isChecked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                                  {task.text}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Challenger */}
        <div className="bg-stone-900 rounded-2xl p-1 shadow-md mt-8">
          <div className="bg-stone-800 rounded-xl p-5 border border-stone-700">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">10 Point Challenger</h2>
            </div>
            
            <div className="space-y-3">
              {WEEKLY_CHALLENGES.map(challenge => {
                const isChecked = !!weeklyProgress[challenge.id];
                return (
                  <button
                    key={challenge.id}
                    onClick={() => toggleWeekly(challenge.id)}
                    className={`w-full text-left flex items-start gap-3 p-4 rounded-xl transition-colors border ${
                      isChecked 
                        ? 'bg-stone-700/50 border-stone-600' 
                        : 'bg-stone-900 border-stone-700 hover:border-stone-500'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                         <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                      ) : (
                         <Circle className="w-5 h-5 text-stone-500" />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isChecked ? 'text-yellow-500/70' : 'text-yellow-500'}`}>
                        {challenge.title}
                      </div>
                      <div className={`text-sm leading-snug ${isChecked ? 'text-stone-400 line-through' : 'text-stone-200'}`}>
                        {challenge.text}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
