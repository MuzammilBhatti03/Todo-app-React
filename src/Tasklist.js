import React from "react";
import PropTypes from "prop-types";
import AppButton from "./AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faPenToSquare,
  faHeart,
  faPerson
} from "@fortawesome/free-solid-svg-icons";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string if date parsing fails
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero
  return `${year}-${month}-${day}`;
};

const Tasklist = ({ todos, handleComplete, handleEdit, handelfavourite }) => {
  return (
    <div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", fontSize: "2.5em" }}
              >
                No Tasks
              </td>
            </tr>
          ) : (
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <FontAwesomeIcon
                    icon={faPerson}
                    style={{ fontSize: "25px" }}
                  />
                </td>
                <td>
                  <strong>{todo.name}</strong>
                </td>
                <td>{formatDate(todo.dueDate)}</td> {/* Format the due date */}
                <td style={{ display: 'flex', flexDirection: 'row', gap: '2%' }}>
                  <AppButton
                    name={"Mark as complete"}
                    className={"btn"}
                    disabled={todo.complete}
                    icon={faCalendarCheck}
                    onClick={() => handleComplete(todo.id)}
                    style={{
                      backgroundColor: todo.complete ? "#d3d3d3" : "green",
                      color: "white",
                      fontSize: "0.8em",
                      marginRight: "2px",
                      marginLeft: "5px",
                      boxShadow: "2px 2px black",
                      cursor: todo.complete ? "not-allowed" : "pointer",
                      opacity: todo.complete ? 0.6 : 1,
                    }}
                  />
                  <AppButton
                    name={"Edit"}
                    className={"btn"}
                    disabled={todo.complete}
                    onClick={() => handleEdit(index)}
                    icon={faPenToSquare}
                    style={{
                      backgroundColor: todo.complete ? "#d3d3d3" : "grey",
                      color: "white",
                      fontSize: "0.8em",
                      cursor: todo.complete ? "not-allowed" : "pointer",
                      boxShadow: "2px 2px black",
                      opacity: todo.complete ? 0.6 : 1,
                    }}
                  />
                  <AppButton
                    name={"Mark Favourite"}
                    className={"favouritebtn"}
                    disabled={todo.favourite}
                    onClick={() => handelfavourite(todo.id)}
                    icon={faHeart}
                    style={{
                      backgroundColor: todo.favourite ? "rgb(250,23,0)" : "#d3d3d3",
                      color: "white",
                      fontSize: "0.8em",
                      cursor: todo.favourite ? "not-allowed" : "pointer",
                      boxShadow: "2px 2px black",
                      opacity: todo.favourite ? 0.6 : 1,
                      transition: "background-color 0.3s",
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Tasklist.propTypes = {
  todos: PropTypes.array.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handelfavourite: PropTypes.func.isRequired,
};

Tasklist.defaultProps = {
  todos: [],
};

export default Tasklist;
