import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/free-solid-svg-icons";
import "./App.css";
import AppButton from "./AppButton";
import Seachbar from "./Seachbar";
import Tasklist from "./Tasklist";
import { faCalendarCheck, faClock, faHeart, faCirclePlus, faHandDots, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { TodosContext } from "./TodosContext";
import { AuthContext } from "./AuthContext";

export default function Todohome() {
  const { todos, setTodos } = useContext(TodosContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [allbtn, setAllbtn] = useState(true);
  const [favouritebtn, setFavouritebtn] = useState(false);
  const [completebtn, setCompletebtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const email = location.state?.email || localStorage.getItem('email');

  // Store email in local storage
  if (email) {
    localStorage.setItem('email', email);
  }

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/tasks?email=${email}`);
      const data = await response.json();
      setTodos(data);
      console.log("Data came from DB is:", data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks when component mounts or email changes
  useEffect(() => {
    fetchTasks();
  }, [email]);

  // Handle marking a task as favorite
  const handleFavourite = async (taskId) => {
    try {
      await fetch(`http://localhost:3002/api/tasks/${taskId}/favorite`, {
        method: 'PUT'
      });
      fetchTasks(); // Refresh tasks after updating
    } catch (error) {
      console.error('Error marking task as favorite:', error);
    }
  };

  // Handle marking a task as complete
  const handleComplete = async (taskId) => {
    try {
      console.log("Task ID of the task being marked complete is:", taskId);
      logTodos(); // Log todos before update
      await fetch(`http://localhost:3002/api/tasks/${taskId}/complete`, {
        method: 'PUT'
      });
      fetchTasks(); // Refresh tasks after updating
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };

  // Function to log current todos
  const logTodos = () => {
    console.log('Todos:', todos);
  };

  // Handle starting the edit process for a task
  const handleEditStart = (index) => {
    const task = todos[index];
    navigate('/add', { state: { task, isEditMode: true, email } }); // Pass email here
  };

  // Filter tasks based on search query
  const filteredTasks = (tasks) => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Display tasks based on button filters
  const displayedTasks = allbtn ? todos :
    completebtn ? todos.filter(task => task.complete) :
    favouritebtn ? todos.filter(task => task.favourite) :
    todos.filter(task => !task.complete);


  return (
    <div className="App">
      <div style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: "100px"
      }}>
        <h1 style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}>
          TO DO APP
        </h1>
        <Seachbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <AppButton name="LOGOUT"
          icon={faRightFromBracket}
          // hr={<hr style={{ margin: '5px 0', width: '50px', borderTop: '1px solid currentColor' }} />}
          onClick={()=>logout()}
          className="btn"
          style={{ backgroundColor: "rgb(238,45,77)", color: "white", fontSize: '1em', marginTop: '33%' }}
          ></AppButton>
      </div>
      <div className="button-container">
        <AppButton
          name="ADD Tasks"
          bottom={"click to add new task"}
          icon={faCirclePlus}
          hr={<hr style={{ margin: '5px 0', width: '200px', borderTop: '1px solid currentColor' }} />}
          onClick={() => navigate('/add', { state: { email } })}
          className="bt"
          style={{ backgroundColor: "rgb(37,153,255)", color: "white" }}
        />
        <AppButton
          name="TODO Tasks"
          bottom={`${todos.filter(task => !task.complete).length} tasks Left`}
          icon={faClock}
          hr={<hr style={{ margin: '5px 0', width: '200px', borderTop: '1px solid currentColor' }} />}
          onClick={() => {
            setAllbtn(false);
            setCompletebtn(false);
            setFavouritebtn(false);
          }}
          className="bt"
          style={{ backgroundColor: "rgb(24,135,84)", color: "white" }}
        />
        <AppButton
          name="Completed Tasks"
          bottom={`${todos.filter(task => task.complete).length} tasks Completed`}
          icon={faCalendarCheck}
          hr={<hr style={{ margin: '5px 0', width: '200px', borderTop: '1px solid currentColor' }} />}
          onClick={() => {
            setAllbtn(false);
            setCompletebtn(true);
            setFavouritebtn(false);
          }}
          className="bt"
          style={{ backgroundColor: "rgb(140,68,170)", color: "white", padding: '15px' }}
        />
        <AppButton
          name="Favorites"
          bottom={`${todos.filter(task => task.favourite).length} tasks `}
          icon={faHeart}
          hr={<hr style={{ margin: '5px 0', width: '200px', borderTop: '1px solid currentColor' }} />}
          onClick={() => { setAllbtn(false); setCompletebtn(false); setFavouritebtn(true); }}
          className="bt"
          style={{ backgroundColor: "rgb(240,127,28)", color: "white" }}
        />
        <AppButton
          name="ALL Tasks"
          bottom={`${todos.length} tasks `}
          icon={faHandDots}
          hr={<hr style={{ margin: '5px 0', width: '200px', borderTop: '1px solid currentColor' }} />}
          onClick={() => setAllbtn(true)}
          className="bt"
          style={{ backgroundColor: "rgb(240,127,28)", color: "white" }}
        />
      </div>
      <Tasklist
        todos={filteredTasks(displayedTasks)}
        handleComplete={handleComplete}
        handleEdit={handleEditStart}
        handelfavourite={handleFavourite}
      />
    </div>
  );
}
