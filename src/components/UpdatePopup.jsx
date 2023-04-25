import styles from "./UpdatePopup.module.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

export default function UpdatePopup() {
  const { showPopup, popupDisplay } = useGlobalContext();

  return (
    <div
      className={showPopup ? styles.popup_wrapper : styles.popup_hide_wrapper}
    >
      <p className={styles.popup_content}>
        작업이{" "}
        <span className={styles.popup_type}>
          {popupDisplay === "오늘" ? (
            <Link to={"/"}>오늘</Link>
          ) : (
            <Link to={"/next"}>다음</Link>
          )}
        </span>
        에 추가됨
      </p>
    </div>
  );
}
