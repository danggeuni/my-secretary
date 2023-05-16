// today (첫페이지 메인 화면 표시 콘텐츠)

import styles from "./MainContents.module.css";
import cx from "clsx";

import PriorityBox from "./PriorityBox";

import { useGlobalContext } from "../context";
import { useEffect } from "react";
import moment from "moment";
import SortButton from "./SortButton";
import TaskAdd from "./TaskAddButton";
import InitScreen from "./InitScreen";
import Modal from "./Modal";
import Task from "../pages/Task";
import EditorInutField from "./EditorInputFields";
import DateBox from "./DateBox";
import EditorFooter from "./EditorFooter";
import UpdatePopup from "./UpdatePopup";
import { Calendar } from "react-calendar";

export default function MainContents() {
  const {
    isClick,
    taskName,
    setTaskBtnActive,
    data,
    taskEditor,
    removeTodoList,
    modalIsOpen,
    addTask,
    launchModal,
    isOnCalendar,
    setCalendar,
    calendar,
    setInitScreen,
    setTaskAdd,
    setTaskEditor,
    control,
    setControl,
  } = useGlobalContext();

  useEffect(() => {
    if (taskName.length > 0) {
      setTaskBtnActive(true);
    } else {
      setTaskBtnActive(false);
    }
  });

  useEffect(() => {
    // 아이템이 0개일 때, 메인화면 보여주기.
    const copyData = [...data];
    const currentData = copyData.filter(
      (item) => new Date(item.date) <= new Date()
    );

    if (currentData) {
      if (currentData.length === 0) {
        setInitScreen(true);
        setTaskAdd(false);
        setTaskEditor(false);
      } else {
        setInitScreen(false);
        setTaskAdd(false);
        setTaskEditor(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setControl(data);
  }, [data]);

  const launchAddTask = (e) => {
    e.preventDefault();
    addTask();
  };

  // 요일, 월, 일 표시 함수
  const Nowday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const getday = week[date.getDay()];
    return getday + " " + month + "월" + day + "일";
  };

  const currentData = control.filter(
    (item) => new Date(item.date) <= new Date()
  );

  return (
    <>
      <div
        className={cx(styles.main_contents, { [styles.btn_toggle]: !isClick })}
      >
        <div className={styles.editor}>
          <div className={styles.header}>
            <div className={styles.view_header_content}>
              <div className={styles.date_wrapper}>
                <h1 className={styles.view_header_h1}>
                  <span>오늘</span>
                  <small className={styles.view_header_small}>
                    <Nowday />
                  </small>
                </h1>
              </div>
              <SortButton />
            </div>
            <div className={styles.view_content}>
              {/* todo list 구현 화면 */}
              <div className={styles.todo_list}>
                <ul className={styles.task_list_items}>
                  {currentData.map((item) => (
                    <li
                      key={item.id}
                      className={
                        Math.floor(new Date().getTime() / 86400000) >
                        Math.floor(new Date(item.date).getTime() / 86400000)
                          ? styles.expired_task_list_item
                          : styles.task_list_item
                      }
                    >
                      <button
                        className={styles.task_checkbox}
                        onClick={() => removeTodoList(item.id)}
                      >
                        <div className={styles.task_checkbox_circle}>
                          <div
                            className={styles.task_checkbox_inner_circle}
                          ></div>
                        </div>
                      </button>
                      <div onClick={() => launchModal(item.id)}>
                        <div className={styles.task_name}>{item.todo}</div>
                        <div className={styles.task_desc}>{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                {modalIsOpen && (
                  <Modal>
                    <Task />
                  </Modal>
                )}
              </div>
              <form
                className={cx(styles.task_editor, {
                  [styles.task_btn_click]: taskEditor,
                })}
                onSubmit={launchAddTask}
              >
                <div className={styles.task_editor_editing_area}>
                  {/* 데이터 입력 input 필드 */}
                  <EditorInutField />
                  <div className={styles.task_editor_button_area}>
                    <div className={styles.seperate}>
                      {/* 날짜 선택 컨테이너 */}
                      <DateBox />

                      {/* 우선순위 선택 컨테이너 */}
                      <PriorityBox />
                    </div>
                  </div>
                  <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")}
                    className={cx(styles.calendar, {
                      [styles.onCalendar]: isOnCalendar,
                    })}
                    minDate={new Date()}
                    onChange={setCalendar}
                    value={calendar}
                  ></Calendar>
                </div>
              </form>

              {/* + 작업 추가  */}
              <TaskAdd />
              {/* 초기 화면 구현 (고양이 커피짤) */}
              <InitScreen />
              {/* 작업 추가 footer (취소, 추가 button)  */}
              <EditorFooter />
            </div>
          </div>
        </div>
      </div>
      <UpdatePopup />
    </>
  );
}
