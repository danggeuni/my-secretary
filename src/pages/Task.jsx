import React, { useEffect } from "react";
import moment from "moment";
import styles from "./Task.module.css";
import cx from "clsx";

import { useGlobalContext } from "../context";

export default function Task() {
  const {
    data,
    currentId,
    replyComment,
    setReplyComment,
    addReply,
    replyData,
  } = useGlobalContext();

  const copyData = [...data];
  const currentData = copyData.filter((item) => item.id === currentId);
  const currentDate = new Date(currentData[0].date);
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentDesc = currentData[0].desc;

  const getDayMinuteCounter = (date) => {
    if (!date) {
      return "";
    }

    const today = moment();
    const postingDate = moment(date);
    const dayDiff = postingDate.diff(today, "days");
    const hourDiff = postingDate.diff(today, "hours");
    const minutesDiff = postingDate.diff(today, "minutes");

    if (dayDiff === 0 && hourDiff === 0) {
      // 작성한지 1시간도 안지났을때
      const minutes = Math.ceil(-minutesDiff);
      return minutes + "분 전"; // '분' 로 표시
    }

    if (dayDiff === 0 && hourDiff <= 24) {
      // 작성한지 1시간은 넘었지만 하루는 안지났을때,
      const hour = Math.ceil(-hourDiff);
      return hour + "시간 전"; // '시간'으로 표시
    }

    return -dayDiff + "일 전"; // '일'로 표시
  };

  return (
    <div className={styles.data_item_content}>
      <div className={styles.task_main_content_container}>
        <div className={styles.field_seperate}>
          <div className={styles.task_overview}>
            <div className={styles.task_overview_header}>
              <div className={styles.task_name}>{currentData[0].todo}</div>
              <div
                className={cx(styles.task_desc, {
                  [styles.noneDesc]: !currentDesc,
                })}
              >
                {currentData[0].desc ? currentData[0].desc : "설명"}
              </div>
            </div>
            <ul>
              {replyData.map((item, index) => (
                <li key={index} className={styles.replyList}>
                  <div className={styles.resist_date}></div>
                  {item.reply}
                </li>
              ))}
            </ul>
            <div className={styles.reply_wrapper}>
              <div className={styles.replyIcon}>
                <span>R</span>
              </div>
              <form className={styles.replyForm} onSubmit={addReply}>
                <input
                  className={styles.reply}
                  placeholder={"댓글"}
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                ></input>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.field_seperate_right}>
          <div className={styles.right_menu_wrapper}>
            <div className={(styles.project_name, styles.public_css)}>
              <span className={styles.public_text}>프로젝트</span>
              <div></div>
            </div>
            <div className={(styles.due_date, styles.public_css)}>
              <span>마감날짜</span>
              <div className={styles.current_date}>
                <span>{`${currentMonth}월 ${currentDay}일`}</span>
              </div>
            </div>
            <div className={(styles.priority, styles.public_css)}>
              <span>우선순위</span>
              <div className={styles.current_priority}>
                <span>{currentData[0].priority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
