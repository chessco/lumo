interface StreakCounterProps {
  days: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakCounter({ days, size = 'md' }: StreakCounterProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-bold ${sizeClasses[size]}`}>
      <span>🔥</span>
      <span>{days}</span>
    </div>
  );
}
