import { useEffect, useState } from 'react';

interface CelebrationAnimationProps {
  type: 'confetti' | 'stars' | 'fireworks';
  onComplete?: () => void;
}

const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const starEmojis = ['⭐', '🌟', '✨', '💫', '🌠'];

export default function CelebrationAnimation({ type, onComplete }: CelebrationAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color?: string; emoji?: string; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      emoji: starEmojis[Math.floor(Math.random() * starEmojis.length)],
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {type === 'confetti' && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: particle.color }}
            />
          )}
          {type === 'stars' && (
            <span className="text-2xl">{particle.emoji}</span>
          )}
          {type === 'fireworks' && (
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          )}
        </div>
      ))}
    </div>
  );
}
