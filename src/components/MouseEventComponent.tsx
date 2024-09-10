import { useEffect, useState } from 'react';
import styles from './MouseEventComponenet.module.css';

interface IPosition {
  x: number;
  y: number;
}

export default function MouseEventComponent() {
  const newArr = Array.from({ length: 30 }, (_, i) => i + 1);
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });

  const handleMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    };
  }, []);
  return (
    <div className={styles.eventBox}>
      {newArr.map((el) => (
        <div
          key={el}
          className={styles.contentBox}
          style={{
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          마우스 이벤트
        </div>
      ))}
    </div>
  );
}
