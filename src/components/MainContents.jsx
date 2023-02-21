// today (첫페이지 메인 화면 표시 콘텐츠)

import styles from "./MainContents.module.css";
import cx from "clsx";

import { useGlobalContext } from "../context";
import { useEffect } from "react";

export default function MainContents() {
  const {
    isClick,
    taskAdd,
    taskAddClick,
    taskName,
    setTaskName,
    taskDesc,
    setTaskDesc,
    taskBtnActive,
    setTaskBtnActive,
  } = useGlobalContext();

  useEffect(() => {
    if (taskName.length > 0) {
      setTaskBtnActive(true);
    } else {
      setTaskBtnActive(false);
    }
  }, [taskName, taskBtnActive]);

  // const [date, setDate] = useState(new Date());
  // const { id, done, todo, desc, priority, deadline } = todoForm;

  // 요일, 월, 일 표시 함수
  const Nowday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const getday = week[date.getDay()];
    return getday + " " + month + "월" + day + "일";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 작업 취소 펑션
  const handleTaskCancel = () => {
    taskAddClick();
    setTaskName("");
    setTaskDesc("");
  };

  // 테스터기
  // useEffect(() => {
  //   console.log(taskDesc);
  // }, [taskDesc]);

  return (
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
            <div className={styles.view_header_action}>
              <button className={styles.view_header_action_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={styles.view_header_action_svg}
                >
                  <path
                    d="M15 14.5a2 2 0 011.936 1.498L19.5 16a.5.5 0 010 1l-2.563.001a2.001 2.001 0 01-3.874 0L4.5 17a.5.5 0 010-1l8.564-.002A2 2 0 0115 14.5zm-.982 1.81l.005-.025-.005.026-.003.014-.004.025-.007.061A.897.897 0 0014 16.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0016 16.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026a.998.998 0 00-1.843.043l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047zM9 9.5a2 2 0 011.936 1.498L19.5 11a.5.5 0 010 1l-8.563.001a2.001 2.001 0 01-3.874 0L4.5 12a.5.5 0 010-1l2.564-.002A2 2 0 019 9.5zm0 1a.998.998 0 00-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C8 11.441 8 11.471 8 11.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0010 11.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 009 10.5zm6-6a2 2 0 011.936 1.498L19.5 6a.5.5 0 010 1l-2.563.001a2.001 2.001 0 01-3.874 0L4.5 7a.5.5 0 010-1l8.564-.002A2 2 0 0115 4.5zm0 1a.998.998 0 00-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C14 6.441 14 6.471 14 6.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06C16 6.557 16 6.528 16 6.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0015 5.5z"
                    fill="currentColor"
                    fillRule="nonzero"
                  ></path>
                </svg>
                <span className={styles.action_label}>정렬</span>
              </button>
            </div>
          </div>
          <div className={styles.view_content}>
            <div className={styles.list_hold}>
              {/* 작업 추가 버튼, 클릭 시 .empty_state_holder: display none */}
              <button
                className={cx(styles.plus_add_button, {
                  [styles.task_btn_click]: taskAdd,
                })}
                onClick={taskAddClick}
              >
                <span className={styles.icon_add}>
                  <svg width="13" height="13">
                    <path
                      d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>
                작업 추가
              </button>
            </div>
            <div
              className={cx(styles.empty_state_holder, {
                [styles.task_btn_click]: taskAdd,
              })}
            >
              <div className={styles.img_box}>
                <img
                  src={`${process.env.PUBLIC_URL}/public_assets/waiter-silhouette.png`}
                  alt={"대충 고양이가 커피 마시는 짤"}
                />
              </div>

              <div className={styles.empty_state}>
                <div className={styles.empty_state_message}>
                  축하합니다! 오늘 작업을 모두 마쳤습니다!
                </div>
              </div>
              <div className={styles.empty_state_body}>
                <div>
                  기본적으로, 여기에 추가된 작업은 오늘 마감됩니다. +를 클릭하여
                  작업을 추가하세요.
                </div>
              </div>
            </div>
            <form
              className={cx(styles.task_editor, {
                [styles.task_btn_click]: !taskAdd,
              })}
              onSubmit={handleSubmit}
            >
              <div className={styles.task_editor_editing_area}>
                <div className={styles.task_editor_input_fields}>
                  <div className={styles.task_editor_contents_field}>
                    <div className={styles.task_editor_contents_name}>
                      <input
                        className={styles.task_editor_contents_name_input}
                        placeholder={"작업 이름"}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        name="todo"
                        // value={todo}
                        // onChange={onChange}
                      ></input>
                      <input
                        className={styles.task_editor_contents_desc_input}
                        placeholder={"설명"}
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        name="desc"
                        // value={desc}
                        // onChange={onChange}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={styles.task_editor_button_area} role={"button"}>
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
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className={styles.due_date_cancel_svg}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.854 11.854a.5.5 0 000-.708L8.707 8l3.147-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708 0z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className={styles.due_date}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.due_date_priority_svg}
                        data-icon-name="priority-icon"
                        data-priority="4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 3a.5.5 0 01.276-.447C3.025 2.179 4.096 2 5.5 2c.901 0 1.485.135 2.658.526C9.235 2.885 9.735 3 10.5 3c1.263 0 2.192-.155 2.776-.447A.5.5 0 0114 3v6.5a.5.5 0 01-.276.447c-.749.375-1.82.553-3.224.553-.901 0-1.485-.135-2.658-.526C6.765 9.615 6.265 9.5 5.5 9.5c-1.08 0-1.915.113-2.5.329V13.5a.5.5 0 01-1 0V3zm1 5.779v-5.45C3.585 3.113 4.42 3 5.5 3c.765 0 1.265.115 2.342.474C9.015 3.865 9.599 4 10.5 4c1.002 0 1.834-.09 2.5-.279v5.45c-.585.216-1.42.329-2.5.329-.765 0-1.265-.115-2.342-.474C6.985 8.635 6.401 8.5 5.5 8.5c-1.001 0-1.834.09-2.5.279z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <div className={styles.due_priority_text}>우선 순위</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.task_editor_footer}>
                <div className={styles.task_button_wrapper}>
                  {/* 작업 취소 버튼 */}
                  <button
                    className={styles.task_cancel_button}
                    onClick={handleTaskCancel}
                  >
                    <span>취소</span>
                  </button>
                  <button
                    className={cx(styles.task_add_button, {
                      [styles.is_task_btn_active]: taskBtnActive,
                    })}
                  >
                    <span>작업 추가</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
