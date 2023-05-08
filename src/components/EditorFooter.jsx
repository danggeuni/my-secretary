import styles from "./EditorFooter.module.css";
import cx from "clsx";
import { useGlobalContext } from "../context";

export default function NextEditorFooter() {
  const { taskBtnActive, taskCancelButton, taskEditor, addTask, taskName } =
    useGlobalContext();

  return (
    <div
      className={cx(styles.task_editor_footer, {
        [styles.task_btn_click]: taskEditor,
      })}
    >
      <div className={styles.task_button_wrapper}>
        {/* 작업 취소 버튼 */}
        <button
          className={styles.task_cancel_button}
          onClick={taskCancelButton}
        >
          <span>취소</span>
        </button>
        <button
          disabled={taskName.length > 0 ? false : true}
          className={cx(styles.task_add_button, {
            [styles.is_task_btn_active]: taskBtnActive,
          })}
          onClick={addTask}
        >
          <span>작업 추가</span>
        </button>
      </div>
    </div>
  );
}
