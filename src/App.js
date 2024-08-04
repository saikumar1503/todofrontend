import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import "./index.css";

const App = () => {
  const [token, setToken] = useState("");
  const [view, setView] = useState("login");

  const handleLogin = (token) => {
    setToken(token);
    setView("todos");
  };

  const handleLogout = () => {
    setToken("");
    setView("login");
  };

  return (
    <div className="app">
      {view === "login" && <Login setToken={handleLogin} />}
      {view === "register" && <Register />}
      {view === "todos" && <TodoList token={token} />}
      {view !== "todos" && (
        <p>
          {view === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setView("register")}>Register</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setView("login")}>Login</button>
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default App;
