import "./Todo.css";

function Todo({ text, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      {text}
      <div>
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;