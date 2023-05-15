// 좌측 메뉴
import styles from "./Leftmenu.module.css";
import cx from "clsx";

import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useRef, useState } from "react";

export default function Leftmenu() {
  const {
    isClick,
    data,
    showCate,
    setShowCate,
    easyMemo,
    setEasyMemo,
    addMemo,
    memoData,
    showMemo,
    setShowMemo,
    checkMemo,
  } = useGlobalContext();

  // 오늘 날짜 구하고 svg에 적용
  const date = new Date();
  const day = date.getDate();

  const copyData = [...data];
  const currentData = copyData.filter(
    (item) => new Date(item.date) <= new Date()
  );

  const nextData = copyData.filter((item) => new Date(item.date) > new Date());

  const showEasyMemoInput = () => {
    setShowMemo(!showMemo);
  };

  const inputRef = useRef();

  const copyMemoData = [...memoData];

  return (
    <div className={cx(styles.left_menu, { [styles.btn_toggle]: isClick })}>
      <div className={styles.left_menu_inner} role={"navigation"}>
        <div className={styles.sidebar_list_item}>
          <div className={styles.single_item_wrapper}>
            <Link to={"/"} className={styles.item_link}>
              {/* 오늘 달력 아이콘 */}
              <div className={styles.single_item_align}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={styles.item_today_svg}
                >
                  <g fill="currentColor" fillRule="evenodd">
                    <path
                      fillRule="nonzero"
                      d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                      opacity=".1"
                    ></path>
                    <path
                      fillRule="nonzero"
                      d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                    ></path>
                    <text
                      fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                      fontSize="9"
                      transform="translate(4 2)"
                      fontWeight="500"
                    >
                      <tspan x="8" y="15" textAnchor="middle">
                        {day}
                      </tspan>
                    </text>
                  </g>
                </svg>

                <span>오늘</span>
              </div>
              <div className={styles.item_quantity}>{currentData.length}</div>
            </Link>
            <Link to={"/next"} className={styles.item_link}>
              <div className={styles.single_item_align}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.item_next_svg}
                >
                  <g fill="currentColor" fillRule="nonzero">
                    <path
                      d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                      opacity="0.1"
                    ></path>
                    <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                  </g>
                </svg>

                <span>다음</span>
              </div>
              <div className={styles.item_quantity}>{nextData.length}</div>
            </Link>
          </div>
        </div>
        <div className={styles.project_item_wrapper}>
          <div className={styles.project}>
            간단메모 ({copyMemoData.length}/5)
          </div>
          <div className={styles.project_btn}>
            <button onClick={showEasyMemoInput}>
              <svg width="13" height="13" className={styles.project_icon}>
                <path
                  d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>

            <button
              aria-label={"간편메모 숨김/표시 토글"}
              onClick={() => setShowCate(!showCate)}
              className={showCate ? styles.openProject : styles.closeProject}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={styles.project_icon}
              >
                <path
                  d="M14 5.758L13.156 5 7.992 9.506l-.55-.48.002.002-4.588-4.003L2 5.77 7.992 11 14 5.758"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={addMemo}>
          <div
            className={showMemo ? styles.show_easy_memo : styles.hide_easy_memo}
          >
            <input
              className={styles.input_easy_memo}
              value={easyMemo}
              onChange={(e) => setEasyMemo(e.target.value)}
              ref={inputRef}
              maxLength={20}
            />
            <button
              className={
                showMemo
                  ? styles.show_button_easy_memo
                  : styles.hide_button_easy_memo
              }
            >
              등록
            </button>
          </div>
        </form>
        <ul>
          {copyMemoData.map((item) => (
            <div key={item.id}>
              <li className={!showCate ? styles.memo : styles.hide_memo}>
                <span>{item.memo}</span>
                <div className={styles.memo_button_wrapper}>
                  <button
                    className={
                      !showCate ? styles.show_button : styles.hide_button
                    }
                    onClick={() => checkMemo(item.id)}
                  >
                    ✔
                  </button>
                  <div className={styles.space}></div>
                  <button
                    className={
                      !showCate ? styles.show_button : styles.hide_button
                    }
                  >
                    ✘
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
