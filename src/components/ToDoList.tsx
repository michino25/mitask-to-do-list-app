import ToDoItem from "./ToDoItem";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface ToDoItem {
    id: string;
    content: string;
    done: boolean;
}

const TO_DO_APP_KEY = "TO_DO_APP";

const generateId = () => {
    const millisecond = new Date().getMilliseconds();
    const randomStr = Math.random().toString(36).substring(2, 10);

    return `${millisecond}${randomStr}`;
};

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

export default function ToDoList() {
    const divStyle = {
        backgroundImage: 'url("/background.png")',
        backgroundSize: "cover",
    };

    const [input, setInput] = useState("");
    const [toDoList, setToDoList] = useState<ToDoItem[]>([]);

    useEffect(() => {
        const storedToDoList = localStorage.getItem(TO_DO_APP_KEY);
        if (storedToDoList !== "[]" && storedToDoList !== null) {
            setToDoList(JSON.parse(storedToDoList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TO_DO_APP_KEY, JSON.stringify(toDoList));
    }, [toDoList]);

    const inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    const addToDoList = useCallback(() => {
        setToDoList([
            { id: generateId(), content: input, done: false },
            ...toDoList,
        ]);
        setInput("");
    }, [toDoList, input]);

    const doneItem = (id: string) => {
        setToDoList((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const updateItem = (id: string, inputValue: string) => {
        setToDoList((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, content: inputValue } : todo
            )
        );
    };

    const deleteItem = (id: string) => {
        setToDoList((prevState) => prevState.filter((item) => id !== item.id));
    };

    const sortTasks = () => {
        const sortedList = [...toDoList].sort((a, b) => {
            if (a.done === b.done) {
                return 0;
            }
            if (a.done) {
                return 1; // Put done tasks at the end
            }
            return -1;
        });
        setToDoList(sortedList);
    };

    const deleteDoneTasks = () => {
        const filteredList = toDoList.filter((task) => !task.done);
        setToDoList(filteredList);
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
                        {toDoList.map((item) => (
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                done={item.done}
                                handleToggleDone={doneItem}
                                handleUpdate={updateItem}
                                handleDelete={deleteItem}
                            />
                        ))}
                    </div>

                    <div
                        className={
                            toDoList.length === 0
                                ? "hidden"
                                : "flex justify-between"
                        }
                    >
                        <span className="inline-flex items-center select-none tracking-wider px-3 py-2 text-sm font-medium text-center bg-amber-50 text-amber-600 rounded-xl border-1 border-amber-500">
                            {toDoList.filter((item) => item.done).length}/
                            {toDoList.length}
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
