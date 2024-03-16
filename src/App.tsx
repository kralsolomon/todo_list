import { useEffect, useState } from "react";

interface Todo {
  text: string;
  todo: boolean;
  done: boolean;
  trashed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState<"done" | "todo" | "trash">(
    "todo",
  );
  const [showForm, setShowForm] = useState(false);
  const [showButtonsForTask, setShowButtonsForTask] = useState<number | null>(
    null,
  );
  const [TodoTitle, setTodoTitle] = useState("To do");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  };

  let storedTodos = localStorage.getItem("todos");

  useEffect(() => {
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    filterTodos();
  }, [filterType, todos]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          text: inputValue,
          done: false,
          trashed: false,
          todo: true,
        },
      ]);
      setInputValue("");
    }
  };

  const moveTodoToTrash = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = { ...updatedTodos[index], trashed: true };
      return updatedTodos;
    });
    setShowButtonsForTask(null);
  };

  const restoreTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = { ...updatedTodos[index], trashed: false };
      return updatedTodos;
    });
    setShowButtonsForTask(null);
  };

  const doneTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = { ...updatedTodos[index], done: true };
      return updatedTodos;
    });
    setShowButtonsForTask(null);
  };

  const deleteTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
    setShowButtonsForTask(null);
  };

  // const filterTodos = () => {
  //   if (filterType === "todo") {
  //     setFilteredTodos(todos.filter((todo) => todo.todo));
  //     setTodoTitle("To do");
  //   } else if (filterType === "done") {
  //     setFilteredTodos(todos.filter((todo) => todo.done));
  //     setTodoTitle("Done");
  //   } else if (filterType === "trash") {
  //     setFilteredTodos(todos.filter((todo) => todo.trashed));
  //     setTodoTitle("Trash");
  //   }
  // };
  const filterTodos = () => {
    if (filterType === "todo") {
      setFilteredTodos(todos.filter((todo) => !todo.done && !todo.trashed));
      setTodoTitle("To Do");
    } else if (filterType === "done") {
      setFilteredTodos(todos.filter((todo) => todo.done && !todo.trashed));
      setTodoTitle("Done");
    } else if (filterType === "trash") {
      setFilteredTodos(todos.filter((todo) => todo.trashed));
      setTodoTitle("Trash");
    }
  };

  return (
    <>
      <div className="main">
        <p className="main_text">Simple To Do List</p>
        <p className="sub_text">
          Today is awesome day. The weather is awesome, you are awesome too!
        </p>
      </div>

      <div className="filters">
        <div className="buttons">
          <button onClick={() => setFilterType("todo")} className="todo">
            To Do
          </button>
          <button onClick={() => setFilterType("done")} className="done">
            Done
          </button>
          <button onClick={() => setFilterType("trash")} className="trash">
            Trash
          </button>
        </div>

        <div className="add_todo_window">
          <button
            className="show_form_button"
            onClick={() => setShowForm(!showForm)}
          >
            <div style={{ fontSize: 32, color: "white" }}>+</div>
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
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      addTodo();
                      setShowForm(!showForm);
                    }}
                    type="submit"
                    className="add_todo_button"
                  >
                    Add
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
          <hr />
        </div>

        <div>
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index}>
                <button
                  className="show_buttons"
                  onClick={() =>
                    setShowButtonsForTask((prevIndex) =>
                      prevIndex === index ? null : index,
                    )
                  }
                  style={{ marginRight: 5 }}
                >
                  {" "}
                  &#xFE19;{" "}
                </button>

                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => doneTodo(index)}
                  style={{ marginRight: 10 }}
                />
                <span className={todo.done ? "completed-task" : ""}>
                  {todo.text}
                </span>
                {}

                {showButtonsForTask === index && (
                  <>
                    {!todo.trashed && (
                      <button
                        onClick={() => moveTodoToTrash(index)}
                        style={{
                          margin: "0 10px 0 10px",
                          borderRadius: 10,
                        }}
                      >
                        Move to Trash
                      </button>
                    )}

                    {todo.trashed && (
                      <button
                        onClick={() => restoreTodo(index)}
                        style={{
                          margin: "0 10px 0 10px",
                          borderRadius: 10,
                        }}
                      >
                        Move Back To Done
                      </button>
                    )}

                    <button
                      onClick={() => deleteTodo(index)}
                      style={{
                        margin: "0 10px 0 10px",
                        borderRadius: 10,
                      }}
                    >
                      Delete Forever
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
