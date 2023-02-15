import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Today from "./pages/Today";
import Task from "./pages/Task";
import Leftmenu from "./components/Leftmenu";

function App() {
  // 메뉴 클릭 시 나타나거나 사라지게 만들 state

  return (
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
  );
}

export default App;
