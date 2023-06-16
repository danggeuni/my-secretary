import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";

import Today from "./pages/Today";
import Next from "./pages/Next";
import Storage from "./pages/Storage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className={"App"}>
          <Routes>
            <Route path={"/"} element={<Today />}></Route>
            <Route path={"/next"} element={<Next />}></Route>
            <Route path={"/storage"} element={<Storage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
