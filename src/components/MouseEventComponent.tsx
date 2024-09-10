import { useEffect, useState } from 'react';
import styles from './MouseEventComponenet.module.css';

interface IPosition {
  x: number;
  y: number;
}

export default function MouseEventComponent() {
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });

  const handleMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  console.log(mousePosition);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    };
  }, []);
  return (
    <div className={styles.eventBox}>
      <div className={styles.contentBox}>마우스이벤트</div>
    </div>
  );
}
