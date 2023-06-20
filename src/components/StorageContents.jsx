// 보관함 화면 구성입니다.

import styles from "./StorageContents.module.css";
import cx from "clsx";

import PriorityBox from "./PriorityBox";

import { useGlobalContext } from "../context";
import { useEffect } from "react";
import SortButton from "./SortButton";

export default function StorageContents() {
  const { isClick, tempData, tempInitScreen, setTempInitScreen } =
    useGlobalContext();

  useEffect(() => {
    // 아이템이 0개일 때, 메인화면 보여주기.
    const copyData = [...tempData];

    if (copyData) {
      if (copyData.length === 0) {
        setTempInitScreen(true);
      } else {
        setTempInitScreen(false);
      }
    }
  }, [tempData]);

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
    <>
      <div
        className={cx(styles.main_contents, { [styles.btn_toggle]: !isClick })}
      >
        <div className={styles.editor}>
          <div className={styles.header}>
            <div className={styles.view_header_content}>
              <div className={styles.date_wrapper}>
                <h1 className={styles.view_header_h1}>
                  <span>보관함</span>
                  <small className={styles.view_header_small}>
                    <Nowday />
                  </small>
                </h1>
              </div>
              <SortButton />
            </div>
            <div className={styles.view_content}>
              {/* 초기 화면 구현 (고양이 커피짤) */}
              <div
                className={tempInitScreen ? styles.show_img : styles.hide_img}
              >
                <div className={styles.img_box}>
                  <img
                    className={styles.img}
                    src={`${process.env.PUBLIC_URL}/public_assets/bookshelf-6405185_1280.png`}
                    alt={"대충 고양이가 책정리 하는짤"}
                  />
                </div>

                <div className={styles.empty_state}>
                  <div className={styles.empty_state_message}>
                    아직 완료된 항목이 없습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
