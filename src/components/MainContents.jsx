// today (첫페이지 메인 화면 표시 콘텐츠)

import styles from "./MainContents.module.css";
import cx from "clsx";

import PriorityBox from "./PriorityBox";

import { useGlobalContext } from "../context";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SortButton from "./SortButton";
import TaskAdd from "./TaskAddButton";
import InitScreen from "./InitScreen";
import Modal from "./Modal";
import Task from "../pages/Task";
import EditorInutField from "./EditorInputFields";
import DateBox from "./DateBox";
import EditorFooter from "./EditorFooter";

export default function MainContents() {
  const {
    isClick,
    taskName,
    taskBtnActive,
    setTaskBtnActive,
    data,
    taskEditor,
    removeTodoList,
    setModalIsOpen,
    modalIsOpen,
    addTask,
  } = useGlobalContext();

  useEffect(() => {
    if (taskName.length > 0) {
      setTaskBtnActive(true);
    } else {
      setTaskBtnActive(false);
    }
  }, [taskName, taskBtnActive]);

  // 요일, 월, 일 표시 함수
  const Nowday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const getday = week[date.getDay()];
    return getday + " " + month + "월" + day + "일";
  };

  const menuRef = useRef();

  return (
    <div
      ref={menuRef}
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
                {/* 만약 item의 priority 값이 1이면 ,  */}
                {data.map((item) => (
                  <li key={item.id} className={styles.task_list_item}>
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

                    <div onClick={() => setModalIsOpen(!modalIsOpen)}>
                      {modalIsOpen && (
                        <Modal>
                          <Task {...item} />
                        </Modal>
                      )}
                      <div className={styles.task_name}>{item.todo}</div>
                      <div className={styles.task_desc}>{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <form
              className={cx(styles.task_editor, {
                [styles.task_btn_click]: taskEditor,
              })}
              onSubmit={addTask}
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
  );
}
