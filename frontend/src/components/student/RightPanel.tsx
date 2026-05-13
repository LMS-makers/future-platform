import type { ScheduleItem, Task } from './types';
import type { DashboardGpa } from '../../types/student';

interface RightPanelProps {
  schedule: ScheduleItem[];
  tasks: Task[];
  gpa: DashboardGpa | null;
}

export default function RightPanel({ schedule, tasks, gpa }: RightPanelProps) {
  return (
    <div className="w-80 space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">trending_up</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current GPA</span>
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{gpa?.currentGpa?.toFixed(2) ?? '—'}</span>
            <span className="text-[10px] font-bold text-green-500">
              {gpa?.gpaChange != null ? `${gpa.gpaChange >= 0 ? '+' : ''}${gpa.gpaChange.toFixed(2)} this term` : '—'}
            </span>
          </div>
          <span className="material-symbols-outlined text-blue-600">show_chart</span>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 dark:border-slate-700">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Academic Standing</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
            {gpa?.academicStanding ?? '—'}
          </span>
        </div>
        <div className="mt-4 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-slate-900 dark:bg-blue-600 rounded-full" style={{ width: `${gpa?.overallProgress ?? 0}%` }} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weekly Schedule</span>
        </div>
        <div className="space-y-5">
          {schedule.map((item) => (
            <div key={item.day} className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl w-12 h-12 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.day}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.date}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-[10px] text-slate-400">{item.time} &bull; {item.location}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          View Full Schedule
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Tasks</span>
          <span className="bg-slate-900 dark:bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">
            {tasks.length} Due
          </span>
        </div>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`w-1 h-8 rounded-full ${
                    task.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-500'
                  }`}
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{task.title}</h4>
                  <p className="text-[10px] text-slate-400">
                    {task.course} &bull; {task.dueDate}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                chevron_right
              </span>
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 bg-blue-50/50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors">
          View All Tasks
        </button>
      </div>
    </div>
  );
}
