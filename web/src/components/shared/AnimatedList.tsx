import { useEffect, useState } from 'react';

interface AnimatedListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
}

export default function AnimatedList({ children, staggerDelay = 100 }: AnimatedListProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * staggerDelay);
    });
  }, [children.length, staggerDelay]);

  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ${
            visibleItems.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {child}
        </div>
      ))}
    </>
  );
}
