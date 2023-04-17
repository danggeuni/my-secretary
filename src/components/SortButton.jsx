import styles from "./SortButton.module.css";
import { useGlobalContext } from "../context";
import { useEffect, useRef } from "react";

export default function SortButton() {
  const {
    showSortingMenu,
    setShowSortingMenu,
    sortArray,
    selectedSort,
    setSelectedSort,
    data,
  } = useGlobalContext();

  useEffect(() => {
    if (selectedSort === 1) {
      return;
    }
    if (selectedSort === 2) {
    }
    if (selectedSort === 3) {
      console.log("현재 3번입니다.");
    }
    if (selectedSort === 4) {
      console.log("현재 4번입니다.");
    }
  }, [selectedSort]);

  const menuRef = useRef();
  const selectedMenuRef = useRef();

  const selectMenu = (item) => {
    setSelectedSort(item.id);
    setShowSortingMenu(!showSortingMenu);
  };

  const sortingFunction = () => {
    if (selectedSort === 1) {
    }

    if (selectedSort === 2) {
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowSortingMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const toggleSortingMenu = () => {
    setShowSortingMenu(!showSortingMenu);
  };
  return (
    <div ref={menuRef} className={styles.view_header_action}>
      <button
        onClick={toggleSortingMenu}
        className={styles.view_header_action_button}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.view_header_action_svg}
        >
          <path
            d="M15 14.5a2 2 0 011.936 1.498L19.5 16a.5.5 0 010 1l-2.563.001a2.001 2.001 0 01-3.874 0L4.5 17a.5.5 0 010-1l8.564-.002A2 2 0 0115 14.5zm-.982 1.81l.005-.025-.005.026-.003.014-.004.025-.007.061A.897.897 0 0014 16.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0016 16.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026a.998.998 0 00-1.843.043l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047zM9 9.5a2 2 0 011.936 1.498L19.5 11a.5.5 0 010 1l-8.563.001a2.001 2.001 0 01-3.874 0L4.5 12a.5.5 0 010-1l2.564-.002A2 2 0 019 9.5zm0 1a.998.998 0 00-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C8 11.441 8 11.471 8 11.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06A.877.877 0 0010 11.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 009 10.5zm6-6a2 2 0 011.936 1.498L19.5 6a.5.5 0 010 1l-2.563.001a2.001 2.001 0 01-3.874 0L4.5 7a.5.5 0 010-1l8.564-.002A2 2 0 0115 4.5zm0 1a.998.998 0 00-.93.634l-.014.034-.007.022-.014.047-.002.009v.001l-.005.016-.01.047.005-.025-.005.026-.003.014-.004.025-.007.061C14 6.441 14 6.471 14 6.5l.008.125.007.047-.001.002.003.014.006.024h-.001l.004.018.016.058.007.021.004.013.009.026.013.033.012.027-.011-.026.019.043-.008-.017.029.06-.018-.037.048.09a1 1 0 001.784-.155l.015-.039.006-.018-.015.039.022-.06-.001-.001.016-.057.004-.018.005-.024.001-.006v-.001l.005-.033.008-.06C16 6.557 16 6.528 16 6.5l-.008-.124-.007-.051-.001-.001-.003-.014-.01-.047-.004-.016-.007-.024-.01-.034-.004-.012-.01-.03-.006-.013-.007-.017-.01-.026A1.002 1.002 0 0015 5.5z"
            fill="currentColor"
          ></path>
        </svg>
        <span className={styles.action_label}>정렬</span>
      </button>
      <div
        className={showSortingMenu ? styles.sort_menu : styles.hide_sort_menu}
      >
        {sortArray.map((item) => (
          <div
            className={styles.sort_menu_wrapper}
            key={item.id}
            onClick={() => selectMenu(item)}
          >
            <span
              className={styles.sort_single_menu}
              ref={selectedMenuRef}
              onClick={sortingFunction}
            >
              {item.data}
            </span>
            <span
              className={
                selectedSort === item.id
                  ? styles.show_sort_menu_check_icon
                  : styles.sort_menu_check_icon
              }
            >
              ✔
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
