import type { ProgressCourse } from '../../types/student';

interface CourseCardProps {
  course: ProgressCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
        <span className="text-3xl font-bold tracking-wider text-white/80">
          {course.course_code}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded uppercase">
            {course.department}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[9px] font-bold rounded">
            L{course.level} S{course.semester}
          </span>
        </div>
        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
          {course.course_name}
        </h4>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          {course.course_description}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>{course.credit_hours} credit hour{course.credit_hours !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
