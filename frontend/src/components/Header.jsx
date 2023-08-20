// 상단 메뉴바 (메뉴, 홈, 검색)

import styles from "./Header.module.css";
import cx from "clsx";

import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

export default function Header() {
  const { btnClick, data, search, setSearch, launchModal, setIsSuccess } =
    useGlobalContext();
  const user = JSON.parse(localStorage.getItem("user"));

  const searchData = [...data];

  const searched = searchData.filter((item) =>
    item.todo.toLowerCase().includes(search)
  );

  const logout = () => {
    localStorage.removeItem("user");
    setIsSuccess(false);
  };

  return (
    <header className={styles.top_bar}>
      {/* 상단 메뉴의 컴포넌트들 */}
      <div className={styles.top_bar_inner} role={"banner"}>
        {/* 상단 메뉴의 좌측 */}
        <div className={styles.left_control}>
          <div>
            {/* 메뉴버튼 및 아이콘 */}
            <button
              className={cx(`${styles.left_menu_toggle} ${styles.top_bar_btn}`)}
              type={"button"}
              onClick={btnClick}
            >
              <svg
                className={styles.menu_icon}
                width={"24"}
                height={"24"}
                viewBox={"0 0 24 24"}
              >
                <path
                  fill={"currentColor"}
                  fillRule={"evenodd"}
                  d={
                    "M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z"
                  }
                ></path>
              </svg>
            </button>
          </div>
          {/* 홈 아이콘, 클릭 시 메인 페이지 이동 */}
          <Link to={"/"}>
            <button
              type={"button"}
              className={`${styles.top_bar_btn} ${styles.home_btn}`}
            >
              <svg
                width={"24"}
                height={"24"}
                viewBox={"0 0 24 24"}
                xmlns={"http://www.w3.org/2000/svg"}
              >
                <path
                  fill={"currentColor"}
                  d={
                    "M12.527 3.075c.35.104.64.263 1.27.876L19.1 9.123c.374.364.49.505.601.678.11.174.185.351.232.552.042.178.062.34.066.742L20 17.718c0 .446-.046.607-.134.77a.906.906 0 01-.378.378c-.163.088-.324.134-.77.134H14v-4.718c0-.446-.046-.607-.134-.77a.906.906 0 00-.378-.378c-.142-.077-.284-.122-.616-.132L12.718 13h-1.436c-.446 0-.607.046-.77.134a.906.906 0 00-.378.378c-.077.142-.122.284-.132.616l-.002.154V19H5.282c-.446 0-.607-.046-.77-.134a.906.906 0 01-.378-.378c-.088-.163-.134-.324-.134-.77v-6.462c0-.522.02-.703.067-.903.047-.2.121-.378.232-.552l.077-.113c.098-.134.233-.282.524-.565l5.304-5.172c.629-.613.92-.772 1.269-.876a1.82 1.82 0 011.054 0zm-.286.958a.825.825 0 00-.482 0c-.18.054-.326.139-.63.418l-.227.216L5.598 9.84c-.3.293-.385.39-.456.5a.76.76 0 00-.102.242c-.026.112-.037.224-.04.531l.002 6.807.005.073.074.006L8.999 18 9 14.268l.003-.17c.013-.448.083-.749.249-1.058a1.9 1.9 0 01.788-.788c.306-.164.6-.234 1.043-.249l.199-.003h1.45l.17.003c.448.013.749.083 1.058.249.337.18.608.45.788.788.164.306.234.6.249 1.043l.003.199L14.999 18l3.92-.002.073-.006.006-.073.002-.2v-6.615l-.005-.218a1.494 1.494 0 00-.035-.305.747.747 0 00-.102-.242l-.059-.084a3.571 3.571 0 00-.294-.315l-5.407-5.273c-.425-.414-.604-.545-.798-.615l-.06-.019z"
                  }
                ></path>
              </svg>
            </button>
          </Link>
          {/* 돋보기 아이콘, input창은 이곳에 포함*/}
          <div className={styles.quick_find}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              aria-hidden="true"
              className={styles.search_icon}
            >
              <path
                d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                fill="currentColor"
              ></path>
            </svg>
            <div className={styles.search_wrapper}>
              <input
                className={styles.search_input}
                placeholder="검색"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                value={search}
              ></input>
            </div>
          </div>
        </div>
        {/* 우측 로그인/등록 메뉴 */}
        <>
          {user ? (
            <div className={styles.log_info}>
              <div className={styles.user_name}>{user.name}</div>
              <div className={styles.logout} onClick={logout}>
                로그아웃
              </div>
            </div>
          ) : null}
        </>
      </div>
      <div className={search === "" ? null : styles.search_list}>
        {searched.map((item, index) =>
          search === "" ? null : (
            <div
              className={styles.search_item}
              key={index}
              onClick={() => launchModal(item.id)}
            >
              {item.todo}
            </div>
          )
        )}
      </div>
    </header>
  );
}
