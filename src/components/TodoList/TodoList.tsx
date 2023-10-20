import ToDoItem from "./TodoItem";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodoList } from "../../redux/selectors";
import todosSlice, { Todo, TO_DO_APP_KEY } from "./todosSlice";
// import { v4 as uuid } from "uuid";

const today = new Date();
const daysOfWeekArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const dayOfWeek = daysOfWeekArr[today.getDay()];

export default function TodoList() {
    const divStyle = {
        backgroundImage: 'url("/background.png")',
        backgroundSize: "cover",
    };

    const firstRender = useRef(true);

    const dispatch = useDispatch();
    const todos = useSelector(selectTodoList);

    const [input, setInput] = useState("");

    // get localStorage in reducer of redux (todosSlice file)
    useEffect(() => {
        if (firstRender.current) firstRender.current = false;
        else {
            localStorage.setItem(TO_DO_APP_KEY, JSON.stringify(todos));
        }
    }, [todos]);

    const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const addToDoList = () => {
        setInput("");
        dispatch(
            todosSlice.actions.addTodo({
                // uuid(),
                id: Date.now().toString(),
                content: input,
                completed: false,
                label: 1,
            })
        );
    };

    const sortTasks = () => {
        dispatch(todosSlice.actions.sortTasks());
    };

    const deleteDoneTasks = () => {
        dispatch(todosSlice.actions.removeCompletedTasks());
    };

    return (
        <div className="flex justify-center items-center p-5 w-full h-full min-h-screen">
            <div
                className="flex justify-center items-center max-w-4xl min-h-[90vh] w-[60rem] bg-white border border-gray-200 rounded-lg shadow p-5"
                style={divStyle}
            >
                <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl w-[30rem]">
                    <div>
                        <h5 className="text-3xl font-semibold text-gray-900">
                            Work Tasks
                        </h5>
                        <p className="mb-3 text-lg font-semibold text-gray-500">
                            {dayOfWeek}
                        </p>
                    </div>

                    <div className="flex w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={inputHandler}
                            className="bg-gray-50 border-1 border-gray-300 text-gray-900 text-sm rounded-xl focus:bg-gray-50/30 focus:border-amber-500 focus:outline-none focus:ring-0 block w-full py-2.5 px-3"
                        />

                        <button
                            disabled={!input}
                            onClick={addToDoList}
                            className={
                                "flex justify-center items-center w-56 px-3 py-2 ml-2 text-sm font-medium text-center text-white rounded-xl " +
                                (input
                                    ? " bg-amber-500 hover:bg-amber-600"
                                    : " bg-amber-500/60")
                            }
                        >
                            <svg
                                className="mr-1"
                                viewBox="0 0 24 24"
                                width={14}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6 12H18M12 6V18"
                                        stroke="#fff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </g>
                            </svg>
                            Add New Task
                        </button>
                    </div>

                    <div className="mt-4 mb-4">
                        {todos.map((item: Todo) => (
                            <ToDoItem key={item.id} todo={item} />
                        ))}
                    </div>

                    <div
                        className={
                            todos.length === 0
                                ? "hidden"
                                : "flex justify-between"
                        }
                    >
                        <span className="inline-flex items-center select-none tracking-wider px-3 py-2 text-sm font-medium text-center bg-amber-50 text-amber-600 rounded-xl border-1 border-amber-500">
                            {
                                todos.filter((item: Todo) => item.completed)
                                    .length
                            }
                            /{todos.length}
                        </span>
                        <div>
                            <button
                                onClick={sortTasks}
                                className="inline-flex justify-center items-center px-3 py-2 ml-2 text-sm font-medium text-center text-white rounded-xl bg-amber-400/90 hover:bg-amber-500/80"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="mr-1"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10"
                                            stroke="#fff"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                                Sort Task
                            </button>
                            <button
                                onClick={deleteDoneTasks}
                                className="inline-flex justify-center items-center px-3 py-2 ml-2 text-sm font-medium text-center text-white rounded-xl bg-amber-400/90 hover:bg-amber-500/80"
                            >
                                <svg
                                    viewBox="-2 -2 28 28"
                                    width="24"
                                    height="24"
                                    className="mr-1"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M9 14L11 16L15 12M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M4 6H20M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                                            stroke="#fff"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                                Delele Done Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
