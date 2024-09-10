import { useEffect, useState } from 'react';
import styles from './MouseEventComponenet.module.css';

interface IPosition {
  x: number;
  y: number;
}

export default function Refactor() {
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
      {/* <div className={styles.contentBox} style={{ top: mousePosition.y, left: mousePosition.x }}> */}
      <div
        className={styles.contentBox}
        style={{ transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))` }}
      >
        마우스이벤트
      </div>
    </div>
  );
}
