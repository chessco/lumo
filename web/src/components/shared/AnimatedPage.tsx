import { useEffect, useState } from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'bounce';
  delay?: number;
}

export default function AnimatedPage({ children, animation = 'fade', delay = 0 }: AnimatedPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    fade: 'animate-fade-in-up',
    slide: 'animate-slide-in-right',
    scale: 'animate-scale-in',
    bounce: 'animate-bounce-in',
  };

  return (
    <div className={`${isVisible ? animationClasses[animation] : 'opacity-0'}`}>
      {children}
    </div>
  );
}
