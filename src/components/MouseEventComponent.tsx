import styles from './MouseEventComponenet.module.css';

export default function MouseEventComponent() {
  return (
    <div className={styles.eventBox}>
      <div className={styles.contentBox}>마우스이벤트</div>
    </div>
  );
}
