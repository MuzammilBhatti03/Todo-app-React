import React, { useState, useContext } from "react";
import axios from "axios";
import { Wellcome } from "./Wellcome";
// import { useNavigate } from "react-router-dom";
import { TodosContext } from "./TodosContext";
import { AuthContext } from "./AuthContext";

export const Loginpage = ({ userInfo, setInfo }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [name, setName] = useState("");
  const { setTodos } = useContext(TodosContext);
  const { login } = useContext(AuthContext);

  // const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/tasks?email=${email}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response");
      }
      const data = await response.json();
      setTodos(data);
      console.log("Data came from DB is:", data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handle = async () => {
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password: pass,
      });
      console.log("Login response:", response);
      const user = response.data.user;

      if (user) {
        setName(user.name);
        setInfo((prevInfo) => [...prevInfo, { email, name }]);
        setShowComponent(true);

        // Store email in local storage
        localStorage.setItem("email", email);

        fetchTasks();

        login(); // Call the login function from AuthContext
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert("Invalid email or password: " + errorMessage);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </label>
        <button
          type="button"
          onClick={handle}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        {showComponent && <Wellcome name={name} />}
      </div>
    </div>
  );
};
