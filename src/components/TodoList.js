import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://backendtodo-ttml.onrender.com/todos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodos(response.data);
      } catch (error) {
        alert("Error fetching todos");
      }
    };

    fetchTodos();
  }, [token]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (deletedTodoId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
  };

  return (
    <div>
      <AddTodo token={token} onAdd={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          token={token}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
