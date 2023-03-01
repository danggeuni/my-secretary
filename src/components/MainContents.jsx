// today (첫페이지 메인 화면 표시 콘텐츠)

import styles from "./MainContents.module.css";
import cx from "clsx";

import PriorityBox from "./PriorityBox";

import { useGlobalContext } from "../context";
import { useEffect, useRef } from "react";
import SortButton from "./SortButton";
import TaskAdd from "./TaskAddButton";
import InitScreen from "./InitScreen";

export default function MainContents() {
  const {
    isClick,
    taskName,
    setTaskName,
    taskDesc,
    setTaskDesc,
    taskBtnActive,
    setTaskBtnActive,
    data,
    showPriority,
    setShowPriority,
    addTodoList,
    currentValue,
    taskCancelButton,
    taskEditor,
  } = useGlobalContext();

  useEffect(() => {
    if (taskName.length > 0) {
      setTaskBtnActive(true);
    } else {
      setTaskBtnActive(false);
    }
  }, [taskName, taskBtnActive]);

  // 빈칸일 경우 focus
  const emptyData = useRef();

  // 요일, 월, 일 표시 함수
  const Nowday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const getday = week[date.getDay()];
    return getday + " " + month + "월" + day + "일";
  };

  // 작업 추가 submit 함수
  const addTask = (e) => {
    e.preventDefault();

    if (taskName.length < 1) {
      emptyData.current.focus();
      return;
    }

    addTodoList(taskName, taskDesc, currentValue);
    setTaskName("");
    setTaskDesc("");

    emptyData.current.focus();
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
                {data.map((item) => (
                  <li key={item.id} className={styles.task_list_item}>
                    <button className={styles.task_checkbox}>
                      <div className={styles.task_checkbox_circle}>
                        <div
                          className={styles.task_checkbox_inner_circle}
                        ></div>
                      </div>
                    </button>
                    <div>
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
                <div className={styles.task_editor_input_fields}>
                  <div className={styles.task_editor_contents_field}>
                    <div className={styles.task_editor_contents_name}>
                      <input
                        ref={emptyData}
                        className={styles.task_editor_contents_name_input}
                        placeholder={"작업 이름"}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      ></input>
                      <input
                        className={styles.task_editor_contents_desc_input}
                        placeholder={"설명"}
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                      ></input>
                      <button className={styles.hidden_button}></button>
                    </div>
                  </div>
                </div>
                <div className={styles.task_editor_button_area}>
                  <div className={styles.seperate}>
                    <div className={styles.due_date}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className={styles.no_due_date}
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h8zm0 1H4a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1zm-1.25 7a.75.75 0 110 1.5.75.75 0 010-1.5zm.75-5a.5.5 0 110 1h-7a.5.5 0 010-1h7z"
                        ></path>
                      </svg>
                      <div className={styles.due_date_text}>오늘</div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles.due_date_cancel_svg}
                      >
                        <path
                          d="M11.854 11.854a.5.5 0 000-.708L8.707 8l3.147-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708 0z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>

                    {/* 우선순위 컨테이너 */}
                    <PriorityBox />
                  </div>
                </div>
              </div>
            </form>

            {/* + 작업 추가  */}
            <TaskAdd />

            {/* 초기 화면 구현 (고양이 커피짤) */}
            <InitScreen />

            <div
              className={cx(styles.task_editor_footer, {
                [styles.task_btn_click]: taskEditor,
              })}
            >
              <div className={styles.task_button_wrapper}>
                {/* 작업 취소 버튼 */}
                <button
                  className={styles.task_cancel_button}
                  onClick={taskCancelButton}
                >
                  <span>취소</span>
                </button>
                <button
                  className={cx(styles.task_add_button, {
                    [styles.is_task_btn_active]: taskBtnActive,
                  })}
                  onClick={addTask}
                >
                  <span>작업 추가</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
