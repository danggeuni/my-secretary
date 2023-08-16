import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";

import Today from "./pages/Today";
import Next from "./pages/Next";
import Storage from "./pages/Storage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className={"App"}>
          <Routes>
            <Route path={"/"} element={<Today />}></Route>
            <Route path={"/next"} element={<Next />}></Route>
            <Route path={"/storage"} element={<Storage />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/register"} element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
