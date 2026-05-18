import type { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  bgColor: string;
  iconColor: string;
}

export default function MetricsCard({ icon: Icon, label, value, subtext, bgColor, iconColor }: MetricsCardProps) {
  return (
    <div className="bg-surface-card rounded-xl p-4 lg:p-6 flex items-center gap-3 lg:gap-5 shadow-card border border-blue-600">
      <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full ${bgColor} flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 lg:w-7 lg:h-7 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs lg:text-sm text-text-tertiary font-medium truncate">{label}</p>
        <p className="text-xl lg:text-2xl font-bold text-text-primary mt-0.5 lg:mt-1">{value}</p>
        <p className="text-xs text-green-500 dark:text-green-400 mt-0.5 lg:mt-1 font-medium truncate">{subtext}</p>
      </div>
    </div>
  );
}
