import { useState } from "react"

interface TodoProps {
	completed: boolean
	text: string
	onCrossClick: (task: string) => void
	handleCompleted: (task: string) => void
}

const Todo = ({
	completed,
	text,
	onCrossClick,
	handleCompleted,
}: TodoProps) => {
	const completedStyle = {
		background:
			"linear-gradient(to right bottom, var(--checkBackgroundColor1), var(--checkBackgroundColor2))",
	}

	const nonCompletedStyle = {
		background: "var(--completed-color)",
	}

	const [hover, setHover] = useState<boolean>(false)

	return (
		<div className="todo">
			<div
				className="clickDiv"
				onClick={() => handleCompleted(text)}
				onMouseOver={() => setHover(!hover)}
				onMouseOut={() => setHover(!hover)}
			></div>
			<div
				className="todoCheckBox"
				style={completed || hover ? completedStyle : nonCompletedStyle}
			>
				<div
					style={completed ? { opacity: 0 } : { opacity: 1 }}
					className="todoCheckBoxInnerCircle"
				></div>
				<img
					style={completed ? { opacity: 1 } : { opacity: 0 }}
					src="/icon-check.svg"
					alt=""
				/>
			</div>
			<div className="todoText">
				<span
					style={
						completed
							? {
									textDecoration: "line-through",
									color: "var(--completed-color)",
							  }
							: {}
					}
				>
					{text}
				</span>
			</div>
			<button className="cross" onClick={() => onCrossClick(text)}>
				<img src="/icon-cross.svg" alt="" />
			</button>
		</div>
	)
}

export default Todo
