interface XPBadgeProps {
  xp: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function XPBadge({ xp, size = 'md' }: XPBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold ${sizeClasses[size]}`}>
      <span>⭐</span>
      <span>{xp} XP</span>
    </div>
  );
}
