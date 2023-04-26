import styles from "./NextDateBox.module.css";
import "react-calendar/dist/Calendar.css";
import { useGlobalContext } from "../context";
import moment from "moment";
import { useEffect } from "react";

export default function NextDateBox() {
  const { calendar, setIsOnCalendar, openCalendar, nextCalendar } =
    useGlobalContext();
  useEffect(() => {
    setIsOnCalendar(false);
  }, [calendar, setIsOnCalendar]);

  return (
    <div className={styles.due_date} onClick={openCalendar}>
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
      <div className={styles.due_date_text}>
        {moment(nextCalendar).format("MM월 DD일")}
      </div>
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
  );
}
