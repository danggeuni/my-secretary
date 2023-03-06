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

  // 우선 순위 wrapper state
  const [showPriority, setShowPriority] = useState(false);

  // 우선 순위 값 지정
  const [currentValue, setCurrentValue] = useState("우선 순위 4");

  // 작업 취소 state
  const [initScreen, setInitScreen] = useState(true);

  // 작업 추가 시 editor state
  const [taskEditor, setTaskEditor] = useState(false);

  // 모달 상태 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달 id state
  const [modalVisible, setModalVisible] = useState("");

  // 작업 취소 버튼
  const taskCancelButton = () => {
    if (data.length === 0) {
      setInitScreen(true);
      setTaskAdd(false);
      setTaskEditor(false);

      setTaskName("");
      setTaskDesc("");
    } else {
      setInitScreen(false);
      setTaskAdd(false);
      setTaskEditor(false);

      setTaskName("");
      setTaskDesc("");
    }
  };

  // 메뉴 toggle 버튼
  const btnClick = () => {
    setIsClick(!isClick);
  };

  // 작업 추가 버튼
  const taskAddClick = () => {
    setTaskAdd(true);
    setTaskEditor(true);
    setInitScreen(false);
  };

  // 작업 추가 submit 함수
  const addTask = (e) => {
    e.preventDefault();

    addTodoList(taskName, taskDesc, currentValue);
    setTaskName("");
    setTaskDesc("");
  };

  // 리스트 생성 함수
  const addTodoList = (todo, desc, priority, date) => {
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

  // 리스트 제거 함수
  const removeTodoList = (targetId) => {
    setTimeout(() => {
      dispatch({ type: "REMOVE", targetId });
    }, 500);
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
        addTodoList,

        // 작업 추가 버튼 활성화 state
        taskBtnActive,
        setTaskBtnActive,

        // 우선 순위 wrapper state
        showPriority,
        setShowPriority,

        // 우선 순위 값 지정
        currentValue,
        setCurrentValue,

        // 작업 취소 state와 작업 취소 함수
        initScreen,
        setInitScreen,
        taskCancelButton,

        // 작업 추가 버튼 클릭 시 editor state
        taskEditor,
        setTaskEditor,

        // 작업 추가 submit 함수
        addTask,

        // 모달 state
        modalIsOpen,
        setModalIsOpen,

        // 리스트 삭제 함수
        removeTodoList,
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
