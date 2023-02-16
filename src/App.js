import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import Today from "./pages/Today";
import Task from "./pages/Task";
import Leftmenu from "./components/Leftmenu";

export const stateContext = createContext();
export const btnClickContext = createContext();

function App() {
  // 메뉴 클릭 toggle state
  const [isClick, setIsClick] = useState(false);

  // 메뉴 toggle 버튼
  const btnClick = () => {
    setIsClick(!isClick);
  };

  return (
    <stateContext.Provider value={isClick}>
      <btnClickContext.Provider value={btnClick}>
        <BrowserRouter>
          <div className={"App"}>
            <Routes>
              <Route path={"/"} element={<Today />}></Route>
              <Route path={"/task/:id"} element={<Task />}></Route>
            </Routes>

            {/* 컨텐츠 묶음 */}
            <div className={"app_holder"}>
              <div className={"content_wrapper"}>
                <Leftmenu />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </btnClickContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
