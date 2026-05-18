interface StatsCardProps {
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
}

export default function StatsCard({ icon, title, subtitle, badge }: StatsCardProps) {
  return (
    <div className="bg-surface-card p-6 rounded-2xl shadow-card border border-blue-600 flex items-start justify-between cursor-pointer hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">{icon}</span>
        </div>
        <div>
          <h3 className="font-bold text-text-primary">{title}</h3>
          <p className="text-xs text-text-muted mt-1 max-w-[150px]">{subtitle}</p>
        </div>
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{badge}</p>
      </div>
      <span className="material-symbols-outlined text-text-muted">chevron_right</span>
    </div>
  );
}
