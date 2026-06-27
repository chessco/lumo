import { useEffect, useState } from 'react';

interface RewardAnimationProps {
  type: 'xp' | 'badge' | 'level' | 'streak';
  amount?: number;
  name?: string;
  onComplete?: () => void;
}

export default function RewardAnimation({ type, amount, name, onComplete }: RewardAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  const config = {
    xp: { icon: '⭐', color: 'from-yellow-400 to-orange-500', text: `+${amount} XP` },
    badge: { icon: '🏆', color: 'from-purple-400 to-pink-500', text: name || 'New Badge!' },
    level: { icon: '🎉', color: 'from-green-400 to-teal-500', text: `Level ${amount}!` },
    streak: { icon: '🔥', color: 'from-red-400 to-orange-500', text: `${amount} Day Streak!` },
  };

  const { icon, color, text } = config[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-bounce-in">
        <div className={`bg-gradient-to-br ${color} p-8 rounded-3xl shadow-2xl text-center`}>
          <div className="text-6xl mb-4 animate-pulse">{icon}</div>
          <p className="text-white text-2xl font-black">{text}</p>
        </div>
      </div>
    </div>
  );
}
