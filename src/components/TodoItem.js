import React, { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, token, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://backendtodo-ttml.onrender.com/todos/${todo._id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      alert("Error updating todo");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backendtodo-ttml.onrender.com/todos/${todo._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Todo deleted");
      onDelete(todo._id);
    } catch (error) {
      alert("Error deleting todo");
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
