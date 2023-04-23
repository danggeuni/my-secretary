import styles from "./UpdatePopup.module.css";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

export default function UpdatePopup() {
  const { showPopup, setShowPopup, data, control } = useGlobalContext();

  useEffect(() => {
    const originLocalData = [...control];

    const originTodayData = originLocalData.filter(
      (item) => new Date(item.date) <= new Date()
    ).length;

    const originNextData = originLocalData.filter(
      (item) => new Date(item.date) > new Date()
    ).length;

    const localData = localStorage.getItem("todo");
    const copyData = JSON.parse(localData);

    const newTodayData = copyData.filter(
      (item) => new Date(item.date) <= new Date()
    ).length;

    const newNextData = copyData.filter(
      (item) => new Date(item.date) > new Date()
    );

    if (newTodayData > originTodayData) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
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
