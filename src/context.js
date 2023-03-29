import { useState, useContext, createContext, useReducer, useRef } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // dispatch 함수
  const reducer = (state, action) => {
    let newState = [];

    switch (action.type) {
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
          item.id === action.data.id ? { ...action.data } : item
        );

        break;
      }

      default:
        return state;
    }

    return newState;
  };

  const replyReducer = (state, action) => {
    let replyState = [];

    switch (action.type) {
      case "INIT": {
        return action.replyData;
      }

      case "CREATEREPLY": {
        replyState = [...state, action.replyData];
        break;
      }

      case "REMOVEREPLY": {
        replyState = state.filter((item) => item.id !== action.targetId);
        break;
      }

      default:
        return state;
    }

    return replyState;
  };

  // todo dispatch state
  const [data, dispatch] = useReducer(reducer, []);

  // reply dispatch state
  const [replyData, replyDispatch] = useReducer(replyReducer, []);

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

  // 리스트 선택 시 ID state
  const [currentId, setCurrentId] = useState(0);

  // 달력 state
  const [calendar, setCalendar] = useState(new Date());

  // 댓글 state
  const [replyComment, setReplyComment] = useState("");

  // 세부 내용 state
  const [editDesc, setEditDesc] = useState(false);

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
  const addTask = () => {
    addTodoList(taskName, taskDesc, currentValue, calendar);
    setTaskName("");
    setTaskDesc("");
  };

  // 댓글 추가 submit 함수
  const addReply = (e) => {
    e.preventDefault();

    const dateData = new Date();
    const month = dateData.getMonth();
    const day = dateData.getDate();
    const hour = dateData.getHours();
    const min = dateData.getMinutes();
    const nowTime = `${hour}시${min}분 ${month + 1}월${day}일`;

    addReplyList(replyComment, nowTime);
    setReplyComment("");
  };

  // todo 리스트 생성 함수
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

  // todo 리스트 편집 함수
  const onEdit = (targetId, todo, desc, priority, date) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        todo,
        desc,
        priority,
        date,
      },
    });
  };

  // 댓글 리스트 생성 함수
  const addReplyList = (reply, time) => {
    replyDispatch({
      type: "CREATEREPLY",
      replyData: { id: dataId.current, reply, modalId: currentId, time },
    });
    dataId.current = dataId.current + 1;
  };

  // 리스트 제거 함수
  const removeTodoList = (targetId) => {
    setTimeout(() => {
      dispatch({ type: "REMOVE", targetId });
    }, 500);
  };

  // 댓글 제거 함수
  const removeReply = (targetId) => {
    setTimeout(() => {
      replyDispatch({ type: "REMOVEREPLY", targetId });
    }, 500);
  };

  // 세부 정보 모달 실행 함수
  const launchModal = (item) => {
    setModalIsOpen(!modalIsOpen);
    setCurrentId(item);
  };

  // 메인 달력 state
  const [isOnCalendar, setIsOnCalendar] = useState(false);

  // 세부 화면 달력 state
  const [isOnCalendarInModal, setIsOnCalendarInModal] = useState(false);

  // 달력 모달 실행 함수
  const openCalendar = () => {
    setIsOnCalendar(!isOnCalendar);
  };

  // 모달 내부 달력 실행 함수
  const openCalendarInModal = () => {
    setIsOnCalendarInModal(!isOnCalendarInModal);
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

        // 리스트 편집 함수
        onEdit,

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

        // 모달 실행 함수
        launchModal,

        // 모달 id 전달 state
        currentId,

        // 달력 state
        calendar,
        setCalendar,

        // 달력 모달 실행 함수
        openCalendar,

        // 달력 모달 state
        setIsOnCalendar,
        isOnCalendar,

        // 댓글 state
        replyComment,
        setReplyComment,

        // 댓글 추가 함수
        addReply,
        addReplyList,

        // 댓글 dispatch 데이타
        replyData,
        replyDispatch,

        // 댓글 제거 함수
        removeReply,

        // 세부화면 달력 state
        isOnCalendarInModal,
        setIsOnCalendarInModal,

        // 모달 내부 달력 실행 함수
        openCalendarInModal,

        // 세부 내용 state
        editDesc,
        setEditDesc,
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
