interface TodoProps {
  id: number
  completed: boolean
  text: string
  onClick: (task: string) => void
}

const Todo = ({ id, completed, text, onClick }: TodoProps) => {
  return (
    <div key={id} className="todo">
      <div className="todoCheckBox">
        <div
          style={completed ? { opacity: 0 } : { opacity: 1 }}
          className="todoCheckBoxInnerCircle"
        >
          <img
            style={completed ? { opacity: 1 } : { opacity: 0 }}
            src="/icon-check.svg"
            alt=""
          />
        </div>
      </div>
      <div className="todoText">
        <span>{text}</span>
      </div>
      <button className="cross" onClick={() => onClick(text)}>
        <img src="/icon-cross.svg" alt="" />
      </button>
    </div>
  )
}

export default Todo
