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
        <ul className={styles.top_menu}>
          <li className={styles.filter_inbox}>
            <div className={styles.sidebar_list_item}>
              <div className={styles.single_item_wrapper}>
                <Link>
                  <span>관리함</span>
                </Link>
              </div>
            </div>
          </li>
          <li className={styles.filter_inbox}>관리함</li>
          <li className={styles.filter_inbox}>관리함</li>
        </ul>
      </div>
    </div>
  );
}
