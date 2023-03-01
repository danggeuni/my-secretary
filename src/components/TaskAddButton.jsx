import styles from "./TaskAddButton.module.css";

import { useGlobalContext } from "../context";
import cx from "clsx";

export default function TaskAdd() {
  const { taskAdd, taskAddClick } = useGlobalContext();

  return (
    <div
      className={cx(styles.list_hold, {
        [styles.click_task_add_button]: taskAdd,
      })}
    >
      <button className={styles.plus_add_button} onClick={taskAddClick}>
        <span className={styles.icon_add}>
          <svg width="13" height="13">
            <path
              d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        작업 추가
      </button>
    </div>
  );
}
