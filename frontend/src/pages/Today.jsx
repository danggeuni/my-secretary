import { useEffect, useState } from "react";
import Header from "../components/Header";
import Leftmenu from "../components/Leftmenu";
import MainContents from "../components/MainContents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Today() {
  const navigate = useNavigate();

  const [getToken, setGetToken] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  useEffect(() => {
    const getUserData = localStorage.getItem("user");
    if (getUserData) {
      const userData = JSON.parse(getUserData);
      const userToken = userData.token;
      setGetToken(userToken);

      localStorage.setItem("token", `${getToken}`);
    }

    if (!getUserData) {
      navigate("/login");
    }

    setTimeout(() => {
      const token = localStorage.getItem("token");

      axios
        .get("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("data", JSON.stringify(response.data));
          }
        });
    }, 1);
  }, [getToken]);

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

  const localData = localStorage.getItem("data");

  // todo api 전달 함수
  const todoFunc = async (todoData) => {
    const API_URL = "/api/goals/";
    try {
      const response = await axios.post(API_URL, todoData, config);
      if (response.data) {
        // localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error(error);
      toast.error("잘못된 접근입니다.");
    }
  };

  const data = localStorage.getItem("data");
  const dataArray = JSON.parse(data);

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
      <div>
        {dataArray.map((item, index) => {
          return <div key={index}>{item.todo}</div>;
        })}
      </div>
    </div>
  );
}
