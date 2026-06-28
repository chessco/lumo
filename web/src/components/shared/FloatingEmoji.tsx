import { useEffect, useState } from 'react';

interface FloatingEmojiProps {
  emoji: string;
  count?: number;
  duration?: number;
}

export default function FloatingEmoji({ emoji, count = 5, duration = 2000 }: FloatingEmojiProps) {
  const [emojis, setEmojis] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setEmojis(newEmojis);
  }, [count]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {emojis.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: `${item.x}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${duration}ms`,
          }}
        >
          <span className="text-3xl">{emoji}</span>
        </div>
      ))}
    </div>
  );
}
