import styles from "./UpdatePopup.module.css";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

export default function UpdatePopup() {
  const { showPopup, setShowPopup, data } = useGlobalContext();

  useEffect(() => {
    //
    setShowPopup(!showPopup);
  }, [data]);

  return (
    <div
      className={showPopup ? styles.popup_wrapper : styles.popup_hide_wrapper}
    >
      <p className={styles.popup_content}>
        작업이 <span className={styles.popup_type}>오늘</span>에 추가됨
      </p>
    </div>
  );
}
