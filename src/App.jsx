import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // DELETE function
  const deleteTodo = (indexToDelete) => {
    const updated = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updated);
    // if you were editing this todo, reset editIndex
    if (editIndex === indexToDelete) setEditIndex(null);
  };

  // EDIT function
  const editTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  // ADD / UPDATE function
  const addTodo = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, input]);
    }

    setInput("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Todo App</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
              <div>
                <button className="edit-btn" onClick={() => editTodo(index)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;