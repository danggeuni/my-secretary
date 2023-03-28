import styles from "./Task.module.css";
import cx from "clsx";

import { useGlobalContext } from "../context";
import moment from "moment";
import { Calendar } from "react-calendar";
import { useEffect, useState } from "react";

export default function Task() {
  const {
    data,
    currentId,
    replyComment,
    setReplyComment,
    addReply,
    replyData,
    removeReply,
    isOnCalendarInModal,
    openCalendarInModal,
    setIsOnCalendarInModal,
    onEdit,
  } = useGlobalContext();

  const copyData = [...data];
  const currentData = copyData.filter((item) => item.id === currentId);
  const currentDesc = currentData[0].desc;
  const [modalDate, setModalDate] = useState(currentData[0].date);

  useEffect(() => {
    setIsOnCalendarInModal(false);
  }, [modalDate, setIsOnCalendarInModal]);

  const editList = () => {
    onEdit(3);
    console.log(data);
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
              <input className={styles.editDesc}></input>
            </div>
            <ul className={styles.reply_list}>
              {replyData.map((item, index) => {
                if (item.modalId === currentId) {
                  return (
                    <li key={index} className={styles.replyList}>
                      <div className={styles.reply_wrapper}>
                        <div className={styles.reply_header}>
                          <span className={styles.reply_small_icon}>R</span>
                          <span className={styles.resist_time}>
                            {item.time}
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={() => removeReply(item.id)}
                            className={styles.reply_delete_button}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                      <div className={styles.reply_content}>{item.reply}</div>
                    </li>
                  );
                }
                return null;
              })}
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
                <span onClick={openCalendarInModal}>
                  {moment(modalDate).format("MM월 DD일")}
                </span>
                <Calendar
                  formatDay={(locale, date) => moment(date).format("DD")}
                  className={cx(styles.calendar, {
                    [styles.onCalendar]: isOnCalendarInModal,
                  })}
                  minDate={new Date()}
                  d
                  onChange={setModalDate}
                  value={modalDate}
                ></Calendar>
              </div>
            </div>
            <div className={(styles.priority, styles.public_css)}>
              <span>우선순위</span>
              <div className={styles.current_priority}>
                <span>{currentData[0].priority}</span>
              </div>
            </div>
          </div>
          <div className={styles.set_modify} onClick={editList}>
            수정하기
          </div>
        </div>
      </div>
    </div>
  );
}
