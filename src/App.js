import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Today from "./pages/Today";
import Task from "./pages/Task";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Today />}></Route>
          <Route path={"/start"} element={<Task />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
