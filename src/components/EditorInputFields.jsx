import styles from "./EditorInputFields.module.css";
import { useGlobalContext } from "../context";
import { useRef } from "react";

export default function EditorInputFields() {
  const { taskName, setTaskName, taskDesc, setTaskDesc } = useGlobalContext();

  const emptyData = useRef();

  return (
    <div className={styles.task_editor_input_fields}>
      <div className={styles.task_editor_contents_field}>
        <div className={styles.task_editor_contents_name}>
          <input
            ref={emptyData}
            className={styles.task_editor_contents_name_input}
            placeholder={"작업 이름"}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></input>
          <input
            className={styles.task_editor_contents_desc_input}
            placeholder={"설명"}
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          ></input>
          <button className={styles.hidden_button}></button>
        </div>
      </div>
    </div>
  );
}
