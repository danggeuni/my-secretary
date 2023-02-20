// today (첫페이지 메인 화면 표시 콘텐츠)

import styles from "./MainContents.module.css";
import cx from "clsx";

import { useContext } from "react";
import { stateContext, taskAddContext, taskAddStateContext } from "../App";

export default function MainContents() {
  const btnState = useContext(stateContext);
  const taskAddBtn = useContext(taskAddContext);
  const taskAddState = useContext(taskAddStateContext);

  // 요일, 월, 일 표시 함수
  const Nowday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const getday = week[date.getDay()];
    return getday + " " + month + "월" + day + "일";
  };

  return (
    <div
      className={cx(styles.main_contents, { [styles.btn_toggle]: !btnState })}
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
              <button className={styles.plus_add_button} onClick={taskAddBtn}>
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
                [styles.task_btn_click]: taskAddState,
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
            <form className={styles.task_editor}>
              <div className={styles.task_editor_editing_area}>
                <div className={styles.task_editor_input_fields}>
                  <div className={styles.task_editor_contents_field}>
                    <div className={styles.task_editor_contents_name}>
                      <input
                        className={styles.task_editor_contents_name_input}
                        placeholder={"작업 이름"}
                      ></input>
                      <input
                        className={styles.task_editor_contents_desc_input}
                        placeholder={"설명"}
                      ></input>
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
                      <div>마감 날짜</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
