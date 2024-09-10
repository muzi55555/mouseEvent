import { useEffect, useState } from 'react';
import styles from './MouseEventComponenet.module.css';

interface IPosition {
  x: number;
  y: number;
}

export default function Refactor() {
  const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 });

  /**
   * 주어진 함수를 지정된 시간 간격으로 호출하는 쓰로틀링 함수입니다.
   * @param func 호출할 함수
   * @param limit 호출 간격 제한 시간 (밀리초)
   * @returns 쓰로틀링된 함수
   */
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
    console.log(1);
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, 100);

  useEffect(() => {
    window.addEventListener('mousemove', handleMousePosition);
    return () => {
      window.removeEventListener('mousemove', handleMousePosition);
    };
  }, []);

  return (
    <div className={styles.eventBox}>
      <div
        className={styles.contentBox}
        style={{ transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))` }}
      >
        마우스이벤트
      </div>
    </div>
  );
}
