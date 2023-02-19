import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import Today from "./pages/Today";
import Task from "./pages/Task";

export const stateContext = createContext();
export const btnClickContext = createContext();

export const taskAddStateContext = createContext();
export const taskAddContext = createContext();

function App() {
  // 메뉴 클릭 toggle state
  const [isClick, setIsClick] = useState(false);
  // 작업 추가 toggle state
  const [taskAdd, setTaskAdd] = useState(false);

  // 메뉴 toggle 버튼
  const btnClick = () => {
    setIsClick(!isClick);
  };

  const taskAddClick = () => {
    setTaskAdd(!taskAdd);
  };

  return (
    <stateContext.Provider value={isClick}>
      <taskAddStateContext.Provider value={taskAdd}>
        <taskAddContext.Provider value={taskAddClick}>
          <btnClickContext.Provider value={btnClick}>
            <BrowserRouter>
              <div className={"App"}>
                <Routes>
                  <Route path={"/"} element={<Today />}></Route>
                  <Route path={"/task/:id"} element={<Task />}></Route>
                </Routes>
              </div>
            </BrowserRouter>
          </btnClickContext.Provider>
        </taskAddContext.Provider>
      </taskAddStateContext.Provider>
    </stateContext.Provider>
  );
}

export default App;
