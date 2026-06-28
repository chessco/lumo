import { useEffect, useState } from 'react';

interface ProgressAnimationProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  duration?: number;
}

export default function ProgressAnimation({ 
  value, 
  max = 100, 
  color = 'bg-purple-500',
  showLabel = true,
  duration = 1000 
}: ProgressAnimationProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (animatedValue / max) * 100;

  return (
    <div className="w-full">
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full ${color} transition-all ease-out`}
          style={{ 
            width: `${percentage}%`,
            transitionDuration: `${duration}ms`
          }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-2">
          <span className="text-sm font-bold text-gray-600">{animatedValue}</span>
          <span className="text-sm font-bold text-gray-400">{max}</span>
        </div>
      )}
    </div>
  );
}
