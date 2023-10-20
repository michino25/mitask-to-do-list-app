import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import todosSlice, { Todo } from "./todosSlice";

interface Props {
    todo: Todo;
}

export default function ToDoItem({ todo }: Props) {
    const [inputValue, setInputValue] = useState(todo.content);
    const [editFocus, setEditFocus] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (editFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editFocus]);

    const blurInput = () => {
        setTimeout(() => {
            if (document.activeElement !== buttonRef.current) {
                setInputValue(todo.content);
                setEditFocus(false);
            }
        }, 0); // Use a minimal delay
    };

    const dispatch = useDispatch();

    const completedItem = () => {
        dispatch(todosSlice.actions.toggleTodoStatus(todo.id));
    };

    const updateContentItem = () => {
        setEditFocus(false);
        dispatch(todosSlice.actions.editTodo({ ...todo, content: inputValue }));
    };

    const deleteItem = () => {
        dispatch(todosSlice.actions.removeTodo(todo.id));
    };

    return (
        <div className="flex justify-between items-center min-h-[44px] group hover:bg-amber-100/40 rounded-xl pl-4 pr-2">
            <input
                id={todo.id}
                type="checkbox"
                disabled={editFocus}
                checked={todo.completed}
                onChange={completedItem}
                className="peer w-6 h-6 text-amber-500/70 bg-gray-100/30 border-2 border-gray-400 focus:outline-none focus:ring-offset-0 focus:ring-0 rounded"
            />
            <label
                htmlFor={todo.id}
                className="w-[335px] peer-checked:line-through peer-checked:text-gray-900/50 ml-2 p-2 text-base break-words select-none font-normal text-gray-900"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={blurInput}
                    className={
                        !editFocus
                            ? "hidden"
                            : "w-full h-full bg-transparent p-0 border-b-2 border-0 border-transparent focus:border-amber-400 focus:ring-0"
                    }
                />
                <span className={editFocus ? "hidden" : ""}>
                    {todo.content}
                </span>
            </label>

            <div
                className={
                    editFocus
                        ? "hidden"
                        : "w-[81px] px-2 flex items-center justify-center"
                }
            >
                {/* Edit button */}
                <button
                    onClick={() => setEditFocus(true)}
                    className={
                        todo.completed
                            ? "p-2 text-transparent"
                            : "p-2 text-gray-700 hover:text-amber-700"
                    }
                    disabled={todo.completed}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="group-hover:block hidden"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </button>

                {/* Delete button */}
                <button
                    onClick={deleteItem}
                    className="p-2 fill-gray-700 hover:fill-amber-700"
                >
                    <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        className="fill-completed group-hover:block hidden"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M11.6357 4.36328C11.4428 4.36328 11.2579 4.4399 11.1215 4.57628C10.9851 4.71267 10.9085 4.89764 10.9085 5.09052V13.229C10.8876 13.5968 10.7223 13.9414 10.4485 14.1878C10.1747 14.4342 9.81464 14.5624 9.44673 14.5446H3.64339C3.27548 14.5624 2.91541 14.4342 2.64163 14.1878C2.36784 13.9414 2.20251 13.5968 2.18164 13.229V5.09052C2.18164 4.89764 2.10503 4.71267 1.96864 4.57628C1.83226 4.4399 1.64728 4.36328 1.45441 4.36328C1.26153 4.36328 1.07656 4.4399 0.940175 4.57628C0.803792 4.71267 0.727173 4.89764 0.727173 5.09052V13.229C0.747931 13.9826 1.06649 14.6972 1.61308 15.2164C2.15967 15.7356 2.88973 16.017 3.64339 15.9991H9.44673C10.2004 16.017 10.9305 15.7356 11.477 15.2164C12.0236 14.6972 12.3422 13.9826 12.3629 13.229V5.09052C12.3629 4.89764 12.2863 4.71267 12.1499 4.57628C12.0136 4.4399 11.8286 4.36328 11.6357 4.36328Z"></path>
                        <path d="M12.363 2.18171H9.45406V0.727236C9.45406 0.534361 9.37745 0.349386 9.24106 0.213002C9.10468 0.0766192 8.9197 0 8.72683 0H4.36341C4.17054 0 3.98556 0.0766192 3.84918 0.213002C3.7128 0.349386 3.63618 0.534361 3.63618 0.727236V2.18171H0.727236C0.534361 2.18171 0.349386 2.25833 0.213002 2.39471C0.0766192 2.53109 0 2.71607 0 2.90894C0 3.10182 0.0766192 3.28679 0.213002 3.42318C0.349386 3.55956 0.534361 3.63618 0.727236 3.63618H12.363C12.5559 3.63618 12.7409 3.55956 12.8772 3.42318C13.0136 3.28679 13.0902 3.10182 13.0902 2.90894C13.0902 2.71607 13.0136 2.53109 12.8772 2.39471C12.7409 2.25833 12.5559 2.18171 12.363 2.18171ZM5.09065 2.18171V1.45447H7.99959V2.18171H5.09065Z"></path>
                        <path d="M5.81787 11.6358V6.54511C5.81787 6.35223 5.74126 6.16726 5.60487 6.03087C5.46849 5.89449 5.28351 5.81787 5.09064 5.81787C4.89776 5.81787 4.71279 5.89449 4.57641 6.03087C4.44002 6.16726 4.3634 6.35223 4.3634 6.54511V11.6358C4.3634 11.8286 4.44002 12.0136 4.57641 12.15C4.71279 12.2864 4.89776 12.363 5.09064 12.363C5.28351 12.363 5.46849 12.2864 5.60487 12.15C5.74126 12.0136 5.81787 11.8286 5.81787 11.6358Z"></path>
                        <path d="M8.72681 11.6358V6.54511C8.72681 6.35223 8.65019 6.16726 8.51381 6.03087C8.37742 5.89449 8.19245 5.81787 7.99957 5.81787C7.8067 5.81787 7.62172 5.89449 7.48534 6.03087C7.34896 6.16726 7.27234 6.35223 7.27234 6.54511V11.6358C7.27234 11.8286 7.34896 12.0136 7.48534 12.15C7.62172 12.2864 7.8067 12.363 7.99957 12.363C8.19245 12.363 8.37742 12.2864 8.51381 12.15C8.65019 12.0136 8.72681 11.8286 8.72681 11.6358Z"></path>
                    </svg>
                </button>
            </div>

            <div
                className={
                    !editFocus
                        ? "hidden"
                        : "w-[81px] px-2 flex items-center justify-center"
                }
            >
                {/* Confirm button */}
                <button
                    ref={buttonRef}
                    onClick={updateContentItem}
                    className="p-2 text-gray-700 hover:text-amber-700"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className="group-hover:block hidden"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M4 12.6111L8.92308 17.5L20 6.5"
                                stroke="currentColor"
                                strokeWidth="2.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                    </svg>
                </button>

                {/* Cancel button */}
                <button
                    onClick={blurInput}
                    className="p-2 text-gray-700 hover:text-amber-700"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        className="group-hover:block hidden"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M6 6L18 18M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
}
