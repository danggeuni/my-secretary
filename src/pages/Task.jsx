import React, { useEffect } from "react";
import styles from "./Task.module.css";
import { useGlobalContext } from "../context";

export default function Task() {
  const { data } = useGlobalContext();

  useEffect(() => {
    if (data.length >= 1) {
      const currentData = data.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      if (targetDiary) {
        setDate(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div className={styles.data_item_content}>
      <div className={styles.task_main_content_container}>
        <div className={styles.field_seperate}>
          <div className={styles.task_overview}>
            <div className={styles.task_overview_header}>
              {/* <div className={styles.task_name}>{item}</div>
              <div className={styles.task_desc}>{item}</div> */}
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
