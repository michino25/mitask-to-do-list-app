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

    const doneItem = useCallback(
        (id: string) => {
            setToDoList((prevState) =>
                prevState.map((todo) =>
                    todo.id === id ? { ...todo, done: !todo.done } : todo
                )
            );
        },
        [toDoList]
    );

    const deleteItem = (id: string) => {
        setToDoList((prevState) => prevState.filter((item) => id !== item.id));
    };

    return (
        <div className="flex justify-center items-center p-5 w-screen h-screen">
            <div
                className="flex justify-center items-center max-w-4xl min-h-full w-[60rem] bg-white border border-gray-200 rounded-lg shadow p-5"
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
                                handleDelete={deleteItem}
                            />
                        ))}
                    </div>

                    <span
                        className={
                            toDoList.length
                                ? "inline-flex items-center select-none tracking-wider px-3 py-2 text-sm font-medium text-center bg-amber-50 text-amber-600 rounded-xl border-1 border-amber-500"
                                : "hidden"
                        }
                    >
                        {toDoList.filter((item) => item.done).length}/
                        {toDoList.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
