import { useEffect, useState } from "react";
import Header from "../components/Header";
import Leftmenu from "../components/Leftmenu";
import MainContents from "../components/MainContents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Today() {
  const navigate = useNavigate();

  const getUserData = localStorage.getItem("user");
  const userData = JSON.parse(getUserData);
  const token = userData.token;

  // local에 user 정보가 없을 경우 login 페이지로 이동합니다.
  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if (!localuser) {
      navigate("/login");
    }
  });

  const [todoForm, setTodoForm] = useState({
    todo: "",
    priority: "",
  });

  const { todo, priority } = todoForm;
  const onChange = (e) => {
    setTodoForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    todoFunc(todoForm);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const todoFunc = async (todoData) => {
    const API_URL = "/api/goals/";
    try {
      const response = await axios.post(API_URL, todoData, config);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
      toast.error("잘못된 접근입니다.");
    }
  };

  return (
    <div>
      <Header />
      <Leftmenu />
      <MainContents />
      <form onSubmit={onSubmit}>
        <input
          type="todo"
          name="todo"
          value={todo}
          placeholder="할일작성"
          onChange={onChange}
        />
        <input
          type="priority"
          name="priority"
          value={priority}
          placeholder="우선순위"
          onChange={onChange}
        />

        <button>테스트버튼</button>
      </form>
    </div>
  );
}
