import { useEffect, useRef, useState } from 'react';
import styles from './MouseEventComponenet.module.css';

interface IPosition {
  x: number;
  y: number;
}

export default function Refactor() {
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  const throttle = (func: any, limit: number) => {
    let lastFunc: number;
    let lastRan: number;
    return function (...args: any[]) {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = window.setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  const handleMousePosition = throttle((e: MouseEvent) => {
    const updatePosition = () => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    requestRef.current = requestAnimationFrame(updatePosition);
  }, 10);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.eventBox}>
      <div
        className={styles.contentBox}
        style={{
          transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`,
        }}
      >
        마우스이벤트
      </div>
    </div>
  );
}
