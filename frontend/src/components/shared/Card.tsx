interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick
}: CardProps) {
  const baseStyles = 'bg-surface-card rounded-xl overflow-hidden shadow-card border border-blue-600';
  const hoverStyles = hover ? 'group hover:shadow-lg transition-all duration-300 cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardImage({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string 
}) {
  return (
    <div className={`h-56 overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    </div>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <div className={`p-8 ${className}`}>
      {children}
    </div>
  );
}
