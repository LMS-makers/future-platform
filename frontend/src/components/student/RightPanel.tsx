import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScheduleItem, Task } from './types';

interface RightPanelProps {
  schedule: ScheduleItem[];
  tasks: Task[];
  gpa: number;
  cgpa: number;
}

function deriveStanding(cgpa: number): string {
  if (cgpa >= 3.5) return 'Excellent';
  if (cgpa >= 3.0) return 'Very Good';
  if (cgpa >= 2.0) return 'Good';
  return 'At Risk';
}

export default function RightPanel({ schedule, tasks, gpa, cgpa }: RightPanelProps) {
  const { t } = useTranslation('sidebar');
  const academicStanding = useMemo(() => deriveStanding(cgpa), [cgpa]);
  const overallProgress = useMemo(() => Math.min((cgpa / 4.0) * 100, 100), [cgpa]);

  return (
    <div className="w-full lg:w-80 space-y-6 lg:space-y-8">
      <div className="bg-surface-card p-5 lg:p-6 rounded-2xl shadow-card border border-blue-600">
        <div className="flex items-center gap-3 mb-5 lg:mb-6">
          <div className="w-10 h-10 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-xl">trending_up</span>
          </div>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('currentGpa')}</span>
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-2xl lg:text-3xl font-extrabold text-text-primary">
              {gpa.toFixed(2)}
            </span>
            <span className="text-[10px] font-bold text-text-muted">
              {t('cgpaLabel')}: {cgpa.toFixed(2)}
            </span>
          </div>
          <span className="material-symbols-outlined text-blue-600 shrink-0">show_chart</span>
        </div>
        <div className="flex items-center justify-between mt-5 lg:mt-6 pt-4 border-t border-border-muted">
          <span className="text-[10px] font-bold text-text-muted uppercase">{t('academicStanding')}</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded shrink-0">
            {academicStanding}
          </span>
        </div>
        <div className="mt-4 h-1.5 bg-surface-muted rounded-full overflow-hidden">
          <div className="h-full bg-slate-900 dark:bg-blue-600 rounded-full" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      <div className="bg-surface-card p-5 lg:p-6 rounded-2xl shadow-card border border-blue-600">
        <div className="flex items-center gap-2 mb-5 lg:mb-6">
          <span className="material-symbols-outlined text-text-muted text-lg shrink-0">calendar_today</span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('weeklySchedule')}</span>
        </div>
        <div className="space-y-4 lg:space-y-5">
          {schedule.length > 0 ? (
            schedule.map((item) => (
              <div key={item.day} className="flex items-center gap-3 lg:gap-4">
                <div className="flex flex-col items-center justify-center bg-surface-muted rounded-xl w-10 lg:w-12 shrink-0">
                  <span className="text-[10px] font-bold text-text-muted uppercase">{item.day}</span>
                  <span className="text-xs lg:text-sm font-bold text-text-primary">{item.date}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-text-primary truncate">{item.title}</h4>
                  <p className="text-[10px] text-text-muted truncate">{item.time} &bull; {item.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-text-muted text-center py-4">{t('noSchedule')}</p>
          )}
        </div>
        <button className="w-full mt-5 lg:mt-6 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          {t('viewFullSchedule')}
        </button>
      </div>

      <div className="space-y-3 lg:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{t('upcomingTasks')}</span>
          <span className="bg-slate-900 dark:bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold shrink-0">
            {tasks.length} {t('due')}
          </span>
        </div>
        <div className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-surface-card p-3 lg:p-4 rounded-xl border border-blue-600 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex gap-3 items-center min-w-0">
                  <div
                    className={`w-1 h-8 rounded-full shrink-0 ${
                      task.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-500'
                    }`}
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-text-primary truncate">{task.title}</h4>
                    <p className="text-[10px] text-text-muted truncate">
                      {task.course} &bull; {task.dueDate}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg shrink-0">
                  chevron_right
                </span>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-text-muted text-center py-4">{t('noTasksDue')}</p>
          )}
        </div>
        <button className="w-full py-2.5 bg-blue-50/50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors">
          {t('viewAllTasks')}
        </button>
      </div>
    </div>
  );
}
