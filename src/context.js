import { useState, useContext, createContext, useReducer } from "react";
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

  const onCreate = () => {
    dispatch({ type: "CREATE", data });
  };

  // const [todoForm, setTodoForm] = useState({
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
