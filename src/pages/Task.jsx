import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import styles from "./Task.module.css";

// id: dataId.current,
// todo,
// desc,
// priority,
// date,
export default function Task({ ...item }) {
  return (
    <div className={styles.data_item_content}>
      {item.id}
      {item.todo}
      {item.desc}
    </div>
  );
}
