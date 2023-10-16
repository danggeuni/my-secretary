import { useEffect } from "react";
import Header from "../components/Header";
import Leftmenu from "../components/Leftmenu";
import MainContents from "../components/MainContents";
import { useNavigate } from "react-router-dom";

export default function Today() {
  const navigate = useNavigate();
  // local에 user 정보가 없을 경우 login 페이지로 이동합니다.
  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if (!localuser) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Header />
      <Leftmenu />
      <MainContents />
    </div>
  );
}
