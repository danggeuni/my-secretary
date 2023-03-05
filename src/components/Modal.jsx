import styles from "./Modal.module.css";

import { useGlobalContext } from "../context";

export default function Modal(props) {
  const { setModalIsOpen, modalIsOpen } = useGlobalContext();

  return (
    <div className={styles.modal} onClick={() => setModalIsOpen(!modalIsOpen)}>
      <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalCloseBtn}
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}
