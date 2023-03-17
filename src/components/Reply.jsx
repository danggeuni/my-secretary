import styles from "Reply.module.css";
import { useGlobalContext } from "../context";

export default function Reply() {
  const { currentId, replyData } = useGlobalContext();

  if (currentId === item.modalId) {
    return (
      <div>
        {replyData.map((item, index) => (if(){}
          <li key={index} className={styles.replyList}>
            <div className={styles.reply_header}>
              <span className={styles.reply_small_icon}>R</span>
              <span className={styles.resist_time}>
                {item.reply ? `${getDayMinuteCounter()}` : ""}
              </span>
            </div>
            <div className={styles.reply_content}>
              {currentId === item.modalId ? item.reply : ""}
            </div>
          </li>
        ))}
      </div>
    );
  } else {
    return;
  }
}
