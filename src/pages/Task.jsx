import styles from "./Task.module.css";
import cx from "clsx";
import moment from "moment";

import ModalPriorityBox from "../components/ModalPriorityBox";

import { useGlobalContext } from "../context";
import { Calendar } from "react-calendar";
import { useEffect, useState } from "react";

export default function Task() {
  const {
    data,
    currentId,
    replyComment,
    setReplyComment,
    addReply,
    removeReply,
    isOnCalendarInModal,
    openCalendarInModal,
    setIsOnCalendarInModal,
    onEdit,
    modalPriority,
    setModalPriority,
    replyData,
  } = useGlobalContext();

  const copyData = [...data];
  const currentData = copyData.filter((item) => item.id === currentId);
  const currentDesc = currentData[0].desc;
  const [modalDate, setModalDate] = useState(new Date(currentData[0].date));
  const localReplyData = [...replyData];

  useEffect(() => {
    setIsOnCalendarInModal(false);
  }, [modalDate, setIsOnCalendarInModal]);

  useEffect(() => {
    setModalPriority(currentData[0].priority);
  }, []);

  // 작업 수정 submit 함수
  const editList = () => {
    if (window.confirm("수정할까요?")) {
      onEdit(
        currentData[0].id,
        currentData[0].todo,
        currentData[0].desc,
        modalPriority,
        modalDate
      );
      window.alert("수정완료");
    } else {
      setModalPriority(currentData[0].priority);
      setModalDate(new Date(currentData[0].date));
    }
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
            <ul className={styles.reply_list}>
              {localReplyData.map((item, index) => {
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
                <span>
                  <ModalPriorityBox />
                </span>
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
