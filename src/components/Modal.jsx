import styles from "./Modal.module.css";

import { useGlobalContext } from "../context";
import { useEffect } from "react";

export default function Modal(props) {
  const { setModalIsOpen, setReplyComment } = useGlobalContext();

  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeThing();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  });

  const closeThing = () => {
    setModalIsOpen(false);
    setReplyComment("");
  };

  return (
    <div className={styles.modal} onClick={closeThing}>
      <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={closeThing}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}
