import "./App.css"
import { useState } from "react"
import Todo from "./Todo"

type Todo = {
  [todo: string]: boolean
}

function App() {
  const [theme, setTheme] = useState<string>("lightTheme")

  const [newTodo, setNewTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo>({})

  const toggleTheme = (): void => {
    if (theme === "lightTheme") {
      setTheme("darkTheme")
    } else {
      setTheme("lightTheme")
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTodo !== "") {
      setTodos({ ...todos, [newTodo]: false })
      setNewTodo("")
    }
  }

  const deleteTodo = (task: string) => {
    const newTodos = { ...todos }
    delete newTodos[task]
    setTodos(newTodos)
  }

  return (
    <div className={`app ${theme}`}>
      <div className="images">
        <img
          style={theme == "lightTheme" ? { opacity: 1 } : { opacity: 0 }}
          src="/bg-desktop-light.jpg"
          alt=""
        />
        <img
          style={theme == "lightTheme" ? { opacity: 0 } : { opacity: 1 }}
          src="/bg-desktop-dark.jpg"
          alt=""
        />
      </div>
      <div className="background"></div>
      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <div className="icons">
            <button
              style={theme == "lightTheme" ? { opacity: 1 } : { opacity: 0 }}
              onClick={toggleTheme}
            >
              <img src="/icon-moon.svg" alt="" />
            </button>
            <button
              style={theme == "lightTheme" ? { opacity: 0 } : { opacity: 1 }}
              onClick={toggleTheme}
            >
              <img src="/icon-sun.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="newTodo">
          <div className="checkBox"></div>
          <input
            className="input"
            placeholder="Create a new todo..."
            type="text"
            value={newTodo}
            onChange={(e: any) => {
              setNewTodo(e.target.value)
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="todosContainer">
          <div className="todos">
            {Object.keys(todos).map((todo: string, index) => {
              return (
                <Todo
                  id={index}
                  completed={todos[todo]}
                  text={todo}
                  onClick={deleteTodo}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
