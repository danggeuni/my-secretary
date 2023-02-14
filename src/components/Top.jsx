// 메뉴 바로 하단에 위치하는 콘텐츠 표시화면, 일자 표시

import styles from "./Top.module.css";

export default function Top() {
  return (
    <header className={`${styles.view_header} ${styles.design_header}`}>
      <div className={styles.view_header_content}>
        <div className={styles.date_header}>
          <h1>
            <span className={styles.simple_content}>오늘</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
