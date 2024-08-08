import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TodosContext } from './TodosContext';
import axios from 'axios';

const ADDTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { task = {}, isEditMode = false } = location.state || {};
  const { todos, setTodos } = useContext(TodosContext);
  const [taskName, setTaskName] = useState(task.name || "");
  const [taskDate, setTaskDate] = useState(task.dueDate || "");
  const email = location.state?.email || localStorage.getItem('email'); // Retrieve email from navigation state or local storage

  useEffect(() => {
    document.title = isEditMode ? 'Edit Task' : 'Add New Task';
    // Ensure taskDate is correctly set for edit mode
    if (isEditMode && task.dueDate) {
      setTaskDate(new Date(task.dueDate).toISOString().split('T')[0]);
    }
  }, [isEditMode, task.dueDate]);

  const validate = (taskDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userDate = new Date(taskDate);
    userDate.setHours(0, 0, 0, 0);
    return userDate >= today;
  };

  const handleSave = async () => {
    if (taskName.trim() && taskDate.trim()) {
      if (validate(taskDate)) {
        const newTask = {
          name: taskName,
          dueDate: taskDate,
          complete: false,
          favourite: task.favourite,
          userid: email, // Add userid here
        };
        try {
          if (isEditMode) {
            await axios.put(`http://localhost:3002/api/tasks/${task.id}`, newTask);
            const updatedTodos = todos.map(t =>
              t.id === task.id ? { ...t, name: taskName, dueDate: taskDate } : t
            );
            setTodos(updatedTodos);
          } else {
            await axios.post('http://localhost:3002/api/tasks', newTask);
            setTodos([...todos, newTask]);
          }
          navigate('/todo'); // Navigate back to the todo page
        } catch (error) {
          console.error('Error saving task:', error.message);
          if (error.response) {
            alert(`Error: ${error.response.status} ${error.response.statusText}`);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            alert('No response received from server.');
            console.error('Request data:', error.request);
          } else {
            alert('Error in setting up request.');
            console.error('Error message:', error.message);
          }
        }
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setTaskDate(today.toISOString().split('T')[0]);
        alert("The date added is in the past. Please select a valid date.");
      }
    } else {
      alert("Please provide both task name and due date.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => navigate('/todo')}>&times;</span>
        <h2>{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          placeholder="Task Date"
          min={new Date().toISOString().split('T')[0]} // Set minimum date to today
        />
        <button onClick={handleSave}>
          {isEditMode ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </div>
  );
};

export default ADDTask;
