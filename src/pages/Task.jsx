import React, { useEffect } from "react";
import styles from "./Task.module.css";

export default function Task({ id, priority, desc, todo }) {
  const copyData = { todo };

  useEffect(() => {
    console.log(copyData.todo);
  });

  return (
    <div className={styles.data_item_content}>
      <div className={styles.task_main_content_container}>
        <div className={styles.field_seperate}>
          <div className={styles.task_overview}>
            <div className={styles.task_overview_header}>
              <div className={styles.task_name}>{copyData.todo}</div>
              <div className={styles.task_desc}>{copyData.desc}</div>
            </div>
            <div className={styles.reply}>
              <input></input>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
