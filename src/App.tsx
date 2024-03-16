

import {useEffect, useState} from "react";
function App() {
    interface Todo {
        text: string;
        done: boolean;
        trashed: boolean;
    }

    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'done' | 'trash'>('all');

    let storedTodos = localStorage.getItem('todos');

    const [TodoTitle, setTodoTitle] = useState("To do")


    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(inputValue);
        setInputValue('');
    };


    useEffect(() => {
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const [showForm, setShowForm] = useState(false)


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    useEffect(() => {
        filterTodos();
    }, [filterType, todos]);

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { text: inputValue, done: false, trashed: false }]);
            setInputValue('');
        }
    };

    const moveTodoToTrash = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].trashed = true;
        setTodos(updatedTodos);
    };

    const restoreTodo = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].trashed = false;
        setTodos(updatedTodos);
    };

    const doneTodo = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index].done = true;
        setTodos(updatedTodos);
    };

    const deleteTodo = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    const filterTodos = () => {
        if (filterType === 'all') {
            setFilteredTodos(todos);
            setTodoTitle("To do");
        } else if (filterType === 'done') {
            setFilteredTodos(todos.filter(todo => todo.done));
            setTodoTitle("Done");
        } else if (filterType === 'trash') {
            setFilteredTodos(todos.filter(todo => todo.trashed));
            setTodoTitle("Trash");
        }
    };





    return (
        <>
            <div className="main">
                <p className="main_text">Simple To Do List</p>
                <p className="sub_text">Today is awesome day. The weather is awesome, you are awesome too!</p>
            </div>


            <div className="filters">
                <div className="buttons">
                    <button onClick={() => setFilterType('all')} className="todo">To Do</button>
                    <button onClick={() => setFilterType('done')} className="done">Done</button>
                    <button onClick={() => setFilterType('trash')} className="trash">Trash</button>

                </div>


                <div className="add_todo_window">

                    <button className="show_form_button" onClick={() => setShowForm(!showForm)}>
                        <div style={{fontSize: 32, color: "white"}}>
                            +
                        </div>
                    </button>

                    {showForm && (
                        <div className="main_container">
                            <div className="form_container">
                                <p className="add_todo_title"> Add New To Do</p>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className="add_todo_form"
                                        type="text"
                                        placeholder="Your text"
                                        onChange={(e) => setInputValue(e.target.value)}/>
                                    <button onClick= {() => {addTodo(); setShowForm(!showForm)}}  type="submit"
                                            className="add_todo_button">Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="todo_container">
                <div className="todo_title">
                    <p className="todo_title_paragraph">{TodoTitle}</p>
                    <hr/>
                </div>


                <div>
                    <ul>
                        {filteredTodos.map((todo, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => doneTodo(index)}/>
                                <span style={{textDecoration: todo.done ? 'line-through' : 'none', marginRight: "10px"}}>
                                    {todo.text}
                                </span>
                                {!todo.trashed && (
                                    <button onClick={() => moveTodoToTrash(index)}>Move to Trash</button>
                                )}
                                {todo.trashed && (
                                    <button onClick={() => restoreTodo(index)}>Move Back To To Do</button>
                                )}

                                <button onClick={() => deleteTodo(index)}>Delete Forever</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );


}

// const [showForm, setShowForm] = useState(false);
// const handleButtonClick = () => {
//     setShowForm(true);
// };
//
//
// const [todoNew, setTodoNew] = useState("");
// const [filteredStatus, setFilteredStatus] = useState("todo")
// let checkBox;
// const [todo, setTodo] = useState([{
//     id: Date.now(),
//     title: "My first todo",
    //     status: "done",
    //     inputType: checkBox,
    //     completed: false
    // }])
    //
    // function addTodo(checkBox: any) {
    //     const newTodoItem = {
    //         id: Date.now(),
    //         title: todoNew,
    //         status: "todo",
    //         inputType: checkBox,
    //         completed: false
    //     }
    //
    //     setTodo([...todo, newTodoItem]);
    //     setTodoNew("")
    //     // [{}, {}, {}] -> [{}, {}, {}, newTodoItem] -> spread operator
    // }
    //
    // function removeTodo(idx) {
    //     const newTodos = todo.filter((task) => task.id !== idx);
    //     setTodo(newTodos)
    // }
    //
    // function makeTodoDone(idx) {
    //     const newTodos = todo.map((todo_item) => todo_item.id === idx ? {...todo_item, status: "done"} : todo_item)
    //     setTodo(newTodos)
    // }
    //
    // function changeStatus(newStatus) {
    //     setFilteredStatus(newStatus)
    // }
    //
    // const filteredTodos = todo.filter((task) => {
    //     if (filteredStatus == "todo") return task;
    //     if (filteredStatus == "done" && task.status == "done") return task;
    //     if (filteredStatus == "trash" && task.status == "trash") return task;
    // })
    //
    // return (
    //     <>

    //


    //

    //
    //

    //
    //
    //
    //
    //             <div className="todo_list">
    //                 {filteredTodos.map((todo_item, idx) => (
    //                     <div className='todo_item_container'>
    //                         <p className='todo_item'>{todo_item.title + " - " + todo_item.status}</p>
    //                         <button onClick={() => removeTodo(todo_item.id)}>Remove</button>
    //                         <button onClick={() => makeTodoDone(todo_item.id)}>Done</button>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //
    //     </>
    // )


export default App
