import styles from "./PriorityBox.module.css";
import cx from "clsx";
import { useGlobalContext } from "../context";

export default function PriorityBox() {
  const { showPriority, currentValue, setCurrentValue } = useGlobalContext();

  // 선택 flag별 이미지 가져오기
  const CurrentValueflag = () => {
    if (currentValue === "우선 순위 1") {
      return (
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority1_svg}
            data-icon-name="priority-icon"
            data-priority="1"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 1</div>
        </div>
      );
    } else if (currentValue === "우선 순위 2") {
      return (
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority2_svg}
            data-icon-name="priority-icon"
            data-priority="2"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 2</div>
        </div>
      );
    } else if (currentValue === "우선 순위 3") {
      return (
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority3_svg}
            data-icon-name="priority-icon"
            data-priority="3"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 3</div>
        </div>
      );
    } else {
      return (
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority4_svg}
            data-icon-name="priority-icon"
            data-priority="4"
          >
            <path
              d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 4</div>
        </div>
      );
    }
  };

  // 현재 선택 확인
  const PriorityFunction = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };

  return (
    <div className={styles.due_priority_text} role={"button"}>
      <CurrentValueflag />

      <div
        className={cx(styles.priority_container, {
          [styles.priority_container_show]: showPriority,
        })}
      >
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority1_svg}
            data-icon-name="priority-icon"
            data-priority="1"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 1</div>
        </div>
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority2_svg}
            data-icon-name="priority-icon"
            data-priority="2"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 2</div>
        </div>
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority3_svg}
            data-icon-name="priority-icon"
            data-priority="3"
          >
            <path
              d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 3</div>
        </div>
        <div className={styles.due_date} onClick={PriorityFunction}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.due_date_priority4_svg}
            data-icon-name="priority-icon"
            data-priority="4"
          >
            <path
              d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z"
              fill="currentColor"
            ></path>
          </svg>
          <div className={styles.priority_text}>우선 순위 4</div>
        </div>
      </div>
    </div>
  );
}
