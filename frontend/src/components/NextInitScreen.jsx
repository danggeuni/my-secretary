import styles from "./NextInitScreen.module.css";
import cx from "clsx";
import { useGlobalContext } from "../context";

export default function NextInitScreen() {
  const { nextInitScreen } = useGlobalContext();
  return (
    <div
      className={cx(styles.empty_state_holder, {
        [styles.show_init_holder]: nextInitScreen,
      })}
    >
      <div>
        <img
          className={styles.img_box}
          src={`${process.env.PUBLIC_URL}/public_assets/dessert-6305681.png`}
          alt={"대충 고양이가 카트 미는 짤"}
        />
      </div>

      <div className={styles.empty_state}>
        <div className={styles.empty_state_message}>
          보다 먼 미래를 계획하세요.
        </div>
      </div>
      <div className={styles.empty_state_body}>
        <div>
          오늘이 아닌 일정은 여기에 추가됩니다. +를 클릭하여 작업을 추가하세요.
        </div>
      </div>
    </div>
  );
}
