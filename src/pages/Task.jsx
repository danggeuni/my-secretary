import React from "react";
import styles from "./Task.module.css";
import { useGlobalContext } from "../context";

export default function Task() {
  const { data, currentId, replyComment, setReplyComment } = useGlobalContext();

  const copyData = [...data];
  const currentData = copyData.filter((item) => item.id === currentId);

  console.log(replyComment);

  return (
    <div className={styles.data_item_content}>
      <div className={styles.task_main_content_container}>
        <div className={styles.field_seperate}>
          <div className={styles.task_overview}>
            <div className={styles.task_overview_header}>
              <div className={styles.task_name}>{currentData[0].todo}</div>
              <div className={styles.task_desc}>{currentData[0].desc}</div>
            </div>
            <div className={styles.reply_wrapper}>
              <div className={styles.replyIcon}>
                <span>R</span>
              </div>
              <input
                className={styles.reply}
                placeholder={"댓글"}
                onChange={(e) => setReplyComment(e.target.value)}
                value={replyComment}
              ></input>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
