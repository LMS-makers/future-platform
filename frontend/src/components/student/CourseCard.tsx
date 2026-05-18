import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ProgressCourse } from '../../types/student';

interface CourseCardProps {
  course: ProgressCourse;
}

function CourseModal({ course, onClose }: { course: ProgressCourse; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-surface-overlay" />
      <div
        className="relative bg-surface-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <span className="text-4xl font-bold tracking-wider text-white/80">
            {course.course_code}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-white/70 hover:text-white bg-black/20 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded uppercase">
              {course.department}
            </span>
            <span className="px-2.5 py-1 bg-surface-muted text-text-tertiary text-xs font-bold rounded">
              L{course.level} S{course.semester}
            </span>
          </div>

          <h2 className="text-xl font-bold text-text-primary">
            {course.course_name}
          </h2>

          <p className="text-sm text-text-secondary leading-relaxed">
            {course.course_description}
          </p>

          <div className="flex items-center gap-1.5 text-sm text-text-muted">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span>{course.credit_hours} credit hour{course.credit_hours !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCard({ course }: CourseCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation('sidebar');

  return (
    <>
      <div className="bg-surface-card rounded-2xl shadow-card border border-blue-600 overflow-hidden flex flex-col">
        <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
          <span className="text-3xl font-bold tracking-wider text-white/80">
            {course.course_code}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-1 gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded uppercase">
              {course.department}
            </span>
            <span className="px-2 py-0.5 bg-surface-muted text-text-tertiary text-[9px] font-bold rounded">
              L{course.level} S{course.semester}
            </span>
          </div>
          <h4 className="font-bold text-sm text-text-primary leading-snug">
            {course.course_name}
          </h4>
          <p className="text-[10px] text-text-muted leading-relaxed line-clamp-3">
            {course.course_description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{course.credit_hours} credit hour{course.credit_hours !== 1 ? 's' : ''}</span>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <CourseModal course={course} onClose={() => setModalOpen(false)} />}
    </>
  );
}
