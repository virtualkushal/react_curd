import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (indexToDelete) => {
    const updated = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updated);
    if (editIndex === indexToDelete) setEditIndex(null);
  };

  const editTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

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

        {/* Input + Add/Update Button */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="action-btn" onClick={addTodo}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Delete All Button */}
        <button className="delete-all-btn" onClick={() => setTodos([])}>
          Delete All
        </button>

        {/* Todo List */}
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              text={todo}
              onEdit={() => editTodo(index)}
              onDelete={() => deleteTodo(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;