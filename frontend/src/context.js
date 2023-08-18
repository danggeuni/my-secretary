import {
  useState,
  useContext,
  createContext,
  useReducer,
  useRef,
  useEffect,
} from "react";

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
          item.id === action.data.id ? { ...action.data } : item
        );

        break;
      }

      default:
        return state;
    }

    localStorage.setItem("todo", JSON.stringify(newState));
    return newState;
  };

  // 임시 저장함에 사용될 reducer 입니다.
  const tempReducer = (state, action) => {
    let tempState = [];

    switch (action.type) {
      case "INIT": {
        return action.tempData;
      }

      case "CREATE": {
        tempState = [action.tempData, ...state];
        break;
      }

      case "REMOVE": {
        tempState = state.filter((item) => item.id !== action.targetId);
        break;
      }

      default:
        return tempState;
    }

    localStorage.setItem("temp", JSON.stringify(tempState));
    return tempState;
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

    localStorage.setItem("reply", JSON.stringify(replyState));
    return replyState;
  };

  const memoReducer = (state, action) => {
    let memoState = [];

    switch (action.type) {
      case "INIT": {
        return action.memoData;
      }

      case "CREATEMEMO": {
        memoState = [...state, action.memoData];
        break;
      }

      case "REMOVEMEMO": {
        memoState = state.filter((item) => item.id !== action.targetId);
        break;
      }

      case "CHECK": {
        memoState = [...state];
        memoState.map((item) => {
          if (item.id === action.item) {
            item.isChecked = !item.isChecked;
          }
        });
        break;
      }

      default:
        return state;
    }

    localStorage.setItem("memo", JSON.stringify(memoState));
    return memoState;
  };

  // local 데이터 불러온 후 id순으로 정렬(id값이 높으면 위로 올라오게)
  // local 데이터가 존재할 경우, 마지막 id 값에 + 1 하여 리스트 생성하도록. ditpatch 통해 리스트 구현
  useEffect(() => {
    const localData = localStorage.getItem("todo");

    if (localData) {
      const todoList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id) + 1;
        dispatch({ type: "INIT", data: todoList });
      }
    }
  }, []);

  useEffect(() => {
    const localReplyData = localStorage.getItem("reply");

    if (localReplyData) {
      const todoReplyList = JSON.parse(localReplyData).sort(
        (a, b) => parseInt(a.id) - parseInt(b.id)
      );

      if (todoReplyList.length >= 1) {
        ReplyDataId.current = parseInt(todoReplyList[0].id) + 1;
        replyDispatch({ type: "INIT", replyData: todoReplyList });
      }
    }
  }, []);

  useEffect(() => {
    const localMemoData = localStorage.getItem("memo");

    if (localMemoData) {
      const todoMemoList = JSON.parse(localMemoData).sort(
        (a, b) => parseInt(a.id) - parseInt(b.id)
      );

      if (todoMemoList.length >= 1) {
        memoDataId.current = parseInt(todoMemoList[0].id) + 1;
        memoDispatch({ type: "INIT", memoData: todoMemoList });
      }
    }
  }, []);

  useEffect(() => {
    const localTempData = localStorage.getItem("temp");

    if (localTempData) {
      tempDispatch({ type: "INIT", tempData: JSON.parse(localTempData) });
    }
  }, []);

  // 날짜 데이터
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);

  // todo dispatch state
  const [data, dispatch] = useReducer(reducer, []);

  // 임시보관함 dispatch state
  const [tempData, tempDispatch] = useReducer(tempReducer, []);

  // reply dispatch state
  const [replyData, replyDispatch] = useReducer(replyReducer, []);

  // memo dispatch state
  const [memoData, memoDispatch] = useReducer(memoReducer, []);

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

  // todo list id 생성을 위한 useRef
  const dataId = useRef(0);

  // reply list id 생성을 위한 useRef
  const ReplyDataId = useRef(0);

  // memo list id 생성을 위한 useRef
  const memoDataId = useRef(0);

  // 우선 순위 wrapper state
  const [showPriority, setShowPriority] = useState(false);

  // 우선 순위 값 지정
  const [currentValue, setCurrentValue] = useState("우선 순위 4");

  // 작업 취소 state
  const [initScreen, setInitScreen] = useState(true);

  // 다음 작업 취소 state
  const [nextInitScreen, setNextInitScreen] = useState(true);

  // 작업 추가 시 editor state
  const [taskEditor, setTaskEditor] = useState(false);

  // 모달 상태 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 리스트 선택 시 ID state
  const [currentId, setCurrentId] = useState(0);

  // 오늘 달력 state
  const [calendar, setCalendar] = useState(new Date());

  // 오늘 달력 state
  const [nextCalendar, setNextCalendar] = useState(new Date(tomorrow));

  // 댓글 state
  const [replyComment, setReplyComment] = useState("");

  // 세부 내용 state
  const [editDesc, setEditDesc] = useState(false);

  // 모달 우선 순위 state
  const [modalPriority, setModalPriority] = useState();

  // 정렬 view state
  const [showSortingMenu, setShowSortingMenu] = useState(false);

  // 정렬 배열 선택 여부
  const [selectedSort, setSelectedSort] = useState(1);

  // localStorage 데이터 보관 state
  const [control, setControl] = useState([]);

  // 메인 달력 state
  const [isOnCalendar, setIsOnCalendar] = useState(false);

  // 세부 화면 달력 state
  const [isOnCalendarInModal, setIsOnCalendarInModal] = useState(false);

  // left menu 프로젝트 on/off 토글 state
  const [showCate, setShowCate] = useState(false);

  // popup display 관리 state
  const [showPopup, setShowPopup] = useState(false);

  // popup disyplay 표시 state
  const [popupDisplay, setPopupDisplay] = useState("오늘");

  // header 검색창 state
  const [search, setSearch] = useState("");

  // 좌측 메뉴 memo 값 state
  const [easyMemo, setEasyMemo] = useState("");

  // memo 표시 / 숨기기 state
  const [showMemo, setShowMemo] = useState(false);

  // 메모 확인 id
  const [checkMemoId, setCheckMemoId] = useState(0);

  // 모달 제목 편집 state
  const [editTitle, setEditTitle] = useState(false);

  // 임시보관함 이미지 표시 state
  const [tempInitScreen, setTempInitScreen] = useState(false);

  // 로딩 중이면 스피너 돌아가는 state
  const [isLoading, setIsLoading] = useState(false);

  // 작업 취소 버튼
  const taskCancelButton = () => {
    if (data.length === 0) {
      setInitScreen(true);
      setNextInitScreen(true);
      setTaskAdd(false);
      setTaskEditor(false);

      setTaskName("");
      setTaskDesc("");
    } else {
      setInitScreen(false);
      setNextInitScreen(false);
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
    setNextInitScreen(false);
  };

  // 작업 추가 submit 함수
  const addTask = () => {
    addTodoList(taskName, taskDesc, currentValue, calendar);

    if (new Date(calendar) < new Date()) {
      setPopupDisplay("오늘");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } else {
      setPopupDisplay("다음");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    setTaskName("");
    setTaskDesc("");
    setCurrentValue("우선 순위 4");
    setCalendar(new Date());

    setSelectedSort(1);
  };

  // 다음 작업 추가 submit 함수
  const nextAddTask = () => {
    addTodoList(taskName, taskDesc, currentValue, nextCalendar);

    if (new Date(tomorrow) < new Date()) {
      setPopupDisplay("오늘");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } else {
      setPopupDisplay("다음");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    setTaskName("");
    setTaskDesc("");
    setCurrentValue("우선 순위 4");
    setNextCalendar(new Date(tomorrow));

    setSelectedSort(1);
  };

  // 메모 추가 submit 함수
  const addMemo = (e) => {
    if (memoData.length < 5) {
      e.preventDefault();

      addMemoList(easyMemo);
      setEasyMemo("");
    } else {
      e.preventDefault();
      alert("간단 메모는 최대 5개까지 사용할 수 있습니다. :)");
      setEasyMemo("");
    }
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

  // 임시보관함 리스트 생성 함수
  const addTempList = (id, todo, desc, priority, date) => {
    tempDispatch({
      type: "CREATE",
      tempData: {
        id,
        todo,
        desc,
        priority,
        date,
      },
    });
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
      replyData: { id: ReplyDataId.current, reply, modalId: currentId, time },
    });
    ReplyDataId.current = ReplyDataId.current + 1;
  };

  // memo 리스트 생성 함수
  const addMemoList = (memo) => {
    memoDispatch({
      type: "CREATEMEMO",
      memoData: {
        id: memoDataId.current,
        isChecked: false,
        memo,
      },
    });
    memoDataId.current = memoDataId.current + 1;
  };

  // 메모 체크 함수
  const checkMemo = (item) => {
    memoDispatch({
      type: "CHECK",
      item,
    });

    setCheckMemoId(item);
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

  // 메모 제거 함수
  const removeMemo = (targetId) => {
    setTimeout(() => {
      memoDispatch({ type: "REMOVEMEMO", targetId });
    }, 500);
  };

  // 세부 정보 모달 실행 함수
  const launchModal = (item) => {
    setModalIsOpen(!modalIsOpen);
    setCurrentId(item);
    setSearch("");
  };

  // 달력 모달 실행 함수
  const openCalendar = () => {
    setIsOnCalendar(!isOnCalendar);
  };

  // 모달 내부 달력 실행 함수
  const openCalendarInModal = () => {
    setIsOnCalendarInModal(!isOnCalendarInModal);
  };

  // 정렬 배열 값
  const sortArray = [
    { id: 1, data: "기본값" },
    { id: 2, data: "이름" },
    { id: 3, data: "마감 날짜" },
    { id: 4, data: "우선 순위" },
  ];

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

        // 다음 작업 취소 state
        nextInitScreen,
        setNextInitScreen,

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

        // 모달 우선 순위 state
        modalPriority,
        setModalPriority,

        // sorting view state
        showSortingMenu,
        setShowSortingMenu,

        // 정렬 배열 값
        sortArray,

        // 정렬 배열 선택 여부
        selectedSort,
        setSelectedSort,

        // localStorage 데이터 보관 state
        control,
        setControl,

        // left menu 프로젝트 on/off 토글 state
        showCate,
        setShowCate,

        // popup display 관리 state
        showPopup,
        setShowPopup,

        // popup disyplay 표시 state
        popupDisplay,
        setPopupDisplay,

        // 날짜 데이터
        today,
        tomorrow,

        nextCalendar,
        setNextCalendar,

        nextAddTask,

        // header 검색창 state
        search,
        setSearch,

        // 좌측 메뉴 memo 값 state
        easyMemo,
        setEasyMemo,

        // memo submit 함수
        addMemo,

        // 메모 저장 배열 데이타
        memoData,

        // memo 표시 / 숨기기 state
        showMemo,
        setShowMemo,

        // 메모 체크 함수
        checkMemo,

        // 메모 확인 id
        checkMemoId,
        setCheckMemoId,

        // 메모 삭제 함수
        removeMemo,

        // 모달 제목 편집 state
        editTitle,
        setEditTitle,

        // 임시보관함 데이터 추가 함수
        addTempList,
        tempData,

        // 임시보관함 이미지 표시 state
        tempInitScreen,
        setTempInitScreen,
        tempDispatch,

        // 로딩 중이면 스피너 돌아가는 state
        isLoading,
        setIsLoading,
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
