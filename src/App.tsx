import "./App.css"
import { useEffect, useState } from "react"
import Todo from "./Todo"

type Todo = {
	[todo: string]: boolean
}

function App() {
	const [theme, setTheme] = useState<string>("lightTheme")

	const [newTodo, setNewTodo] = useState<string>("")

	const [todos, setTodos] = useState<Todo>({})
	const [completedTodos, setCompletedTodos] = useState<Todo>({})
	const [activeTodos, setActiveTodos] = useState<Todo>({})

	const [activeOption, setActiveOption] = useState<string>("all")

	const noShadow: Object = {
		boxShadow: "none",
		MozBoxShadow: "none",
		WebkitBoxShadow: "none",
		color: "red",
	}

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
			setActiveOption("all")
		}
	}

	const deleteTodo = (task: string) => {
		const newTodos = { ...todos }
		delete newTodos[task]
		setTodos(newTodos)
	}

	const toggleTodo = (task: string) => {
		const newTodos = { ...todos }
		newTodos[task] = !newTodos[task]
		setTodos(newTodos)
	}

	useEffect(() => {
		const active: Todo = {}
		const completed: Todo = {}
		for (const todo in todos) {
			if (todos[todo]) {
				completed[todo] = todos[todo]
			} else {
				active[todo] = todos[todo]
			}
		}
		setActiveTodos(active)
		setCompletedTodos(completed)
	}, [todos])

	const clearCompleted = () => {
		const newTodos = { ...todos }
		const newCompletedTodos = { ...completedTodos }
		for (const todo in completedTodos) {
			delete newTodos[todo]
			delete newCompletedTodos[todo]
		}
		setTodos(newTodos)
		setCompletedTodos(newCompletedTodos)
		setActiveOption("all")
	}

	// for (let todo in todos) {
	// 	if (todos[todo] === true) {
	// 		completedTodos[todo] = todos[todo]
	// 	} else {
	// 		activeTodos[todo] = todos[todo]
	// 	}
	// }

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
				<div
					className="todosContainer"
					style={Object.keys(todos).length == 0 ? noShadow : {}}
				>
					<div className="todos">
						{Object.keys(
							activeOption === "all" ? todos : activeOption === "active" ? activeTodos : completedTodos
						).map((todo: string, index) => {
							return (
								<Todo
									key={index}
									completed={todos[todo]}
									text={todo}
									onCrossClick={deleteTodo}
									handleCompleted={toggleTodo}
								/>
							)
						})}
					</div>
					<div
						className="footer"
						style={
							Object.keys(todos).length == 0 ? { opacity: 0 } : { opacity: 1 }
						}
					>
						<span className="todoCount">
							{Object.keys(activeTodos).length} items left
						</span>
						<ul className="options">
							<li>
								<button
									className={activeOption == "all" ? "active" : ""}
									onClick={() => setActiveOption("all")}
								>
									All
								</button>
							</li>
							<li>
								<button
									className={activeOption == "active" ? "active" : ""}
									onClick={() => setActiveOption("active")}
								>
									Active
								</button>
							</li>
							<li>
								<button
									className={activeOption == "completed" ? "active" : ""}
									onClick={() => setActiveOption("completed")}
								>
									Completed
								</button>
							</li>
						</ul>
						<button className="clearComplete" onClick={clearCompleted}>Clear Completed</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
