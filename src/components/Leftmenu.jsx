// 좌측 메뉴

import styles from "./Leftmenu.module.css";
import cx from "clsx";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { stateContext } from "../App";

export default function Leftmenu() {
  const btnState = useContext(stateContext);

  return (
    <div className={cx(styles.left_menu, { [styles.btn_toggle]: btnState })}>
      <div className={styles.left_menu_inner} role={"navigation"}>
        <div className={styles.sidebar_list_item}>
          <div className={styles.single_item_wrapper}>
            <Link to={"/task/:id"} className={styles.item_link}>
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
                        17
                      </tspan>
                    </text>
                  </g>
                </svg>

                <span>오늘</span>
              </div>
              <div>2</div>
            </Link>
            <Link to={"/task/:id"} className={styles.item_link}>
              {/* 오늘 달력 아이콘 */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.item_next_svg}
              >
                <g fill="currentColor" fill-rule="nonzero">
                  <path
                    d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                    opacity="0.1"
                  ></path>
                  <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                </g>
              </svg>

              <span>다음</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
