import { useState, useContext, createContext, useReducer, useRef } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // dispatch 함수
  const reducer = (state, action) => {
    let newState = [];

    switch (action.type) {
      case "INIT": {
        return action.data;
      }

      case "CREATE": {
        newState = [action.data, ...state];
        break;
      }

      case "REMOVE": {
        newState = state.filter((item) => item.id !== action.targetId);
        break;
      }

      case "EDIT": {
        newState = state.map((item) =>
          item.id === action.targetId ? { ...action.data } : item
        );
        break;
      }

      default:
        return state;
    }

    return newState;
  };

  // dispatch state
  const [data, dispatch] = useReducer(reducer, []);

  // 메뉴 클릭 toggle state
  const [isClick, setIsClick] = useState(false);
  // 작업 추가 toggle state
  const [taskAdd, setTaskAdd] = useState(false);

  // 작업 이름 state
  const [taskName, setTaskName] = useState("");

  // 작업 설명 state
  const [taskDesc, setTaskDesc] = useState("");

  // 작업 추가 버튼 활성화  state
  const [taskBtnActive, setTaskBtnActive] = useState(false);

  // id 생성을 위한 useRef
  const dataId = useRef(0);

  // 리스트 생성 함수
  const onCreate = (todo, desc, priority, date) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        todo,
        desc,
        priority,
        date,
      },
    });
    dataId.current = dataId.current + 1;
  };
  // const [todoList, setTodoList] = useState({
  //   id: "",
  //   done: false,
  //   todo: "",
  //   desc: "",
  //   priority: "",
  //   deadline: "",
  // });

  // 메뉴 toggle 버튼
  const btnClick = () => {
    setIsClick(!isClick);
  };

  const taskAddClick = () => {
    setTaskAdd(!taskAdd);
  };

  return (
    <AppContext.Provider
      value={{
        // dispatch 데이타
        data,
        dispatch,

        // 좌측 메뉴 state
        isClick,
        setIsClick,
        // 작업 추가 state
        taskAdd,
        setTaskAdd,

        // 좌측 메뉴 클릭 함수
        btnClick,

        // 작업 추가 클릭 함수
        taskAddClick,

        // 작업 이름 state
        taskName,
        setTaskName,

        // 작업 설명 state
        taskDesc,
        setTaskDesc,

        // 리스트 생성 함수
        onCreate,

        // 작업 추가 버튼 활성화 state
        taskBtnActive,
        setTaskBtnActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
