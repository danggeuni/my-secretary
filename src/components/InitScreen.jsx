import styles from "./InitScreen.module.css";
import cx from "clsx";
import { useGlobalContext } from "../context";

export default function InitScreen() {
  const { initScreen } = useGlobalContext();

  return (
    <div
      className={cx(styles.empty_state_holder, {
        [styles.show_init_holder]: initScreen,
      })}
    >
      <div className={styles.img_box}>
        <img
          src={`${process.env.PUBLIC_URL}/public_assets/waiter-silhouette.png`}
          alt={"대충 고양이가 커피 마시는 짤"}
        />
      </div>

      <div className={styles.empty_state}>
        <div className={styles.empty_state_message}>
          축하합니다! 오늘 작업을 모두 마쳤습니다!
        </div>
      </div>
      <div className={styles.empty_state_body}>
        <div>
          기본적으로, 여기에 추가된 작업은 오늘 마감됩니다. +를 클릭하여 작업을
          추가하세요.
        </div>
      </div>
    </div>
  );
}
