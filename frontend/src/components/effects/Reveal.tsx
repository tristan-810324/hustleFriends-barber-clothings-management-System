import { useEffect, useRef, useState, type ReactNode } from 'react';
import './effects.css';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
};

export const Reveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`effect-reveal effect-reveal-${direction} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--effect-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
