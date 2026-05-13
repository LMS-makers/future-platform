import type { Course } from './types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <img
        alt={course.title}
        className="w-full h-32 object-cover"
        src={course.image}
      />
      <div className="p-4 space-y-3">
        {course.tag && (
          <div className="flex">
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded uppercase">
              {course.tag}
            </span>
          </div>
        )}
        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
          {course.title}
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          {course.description}
        </p>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Progress</span>
            <span className="font-bold text-slate-900 dark:text-white">{course.progress}%</span>
          </div>
          <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
