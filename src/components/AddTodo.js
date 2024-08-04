import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ token, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendtodo-ttml.onrender.com/todos",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAdd(response.data);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Error adding todo");
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="todo-form">
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
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
