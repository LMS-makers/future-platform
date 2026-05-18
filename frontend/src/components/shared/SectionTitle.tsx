interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  showLine?: boolean;
  linePosition?: 'center' | 'left';
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  alignment = 'center',
  showLine = true,
  linePosition = 'center',
  className = ''
}: SectionTitleProps) {
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const linePositionStyles = {
    left: 'left-0 -translate-x-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  return (
    <div className={`mb-16 ${alignmentStyles[alignment]} ${className}`}>
      <h2 className="text-primary-800 text-4xl font-extrabold relative inline-block dark:text-primary-400">
        {title}
        {showLine && (
          <div className={`absolute -bottom-3 w-24 h-1 bg-primary-600 ${linePositionStyles[linePosition]}`} />
        )}
      </h2>
      {subtitle && (
        <p className="text-primary-600 font-semibold text-lg mt-2">{subtitle}</p>
      )}
    </div>
  );
}
