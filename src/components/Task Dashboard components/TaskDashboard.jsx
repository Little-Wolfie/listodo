import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import "../../css/TaskDashboard.css";
import Map from "./Map";
import "react-datepicker/dist/react-datepicker.css";

export const TaskDashboard = ({ map, tasks, setTasks }) => {
  const navigate = useNavigate();
  const [editableIndex, setEditableIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [center, setCenter] = useState({ lng: -0.4, lat: 51 });

  const handleEditClick = (index) => {
    setEditableIndex(index);
  };

  const handleTextAreaChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveClick = (i) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        i === index ? { ...task, description: editText } : task
      )
    );
    setEditableIndex(null);
    setEditText("");
  };

  const handleTimeChange = (index, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, time: value } : task
      )
    );
  };
  const handleDateChange = (index, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, date: value } : task
      )
    );
  };

  const handleShowOnMap = (taskLocation) => {
    setCenter(taskLocation);
  };

  const sortTasksByScore = () => {
    setTasks((current) => {
      const sortedTasks = current
        .slice()
        .sort((a, b) => b["score"] - a["score"]);

      return sortedTasks;
    });
  };

  useEffect(() => {
    sortTasksByScore();
  }, []);

  return (
    <div className="task-dashboard">
      <header>
        <div className="header-container">
          <button
            onClick={() => {
              navigate("/create-task");
            }}
          >
            Create Task
          </button>
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </button>
        </div>
      </header>

      <div className="filtering-container">
        <select>
          <option>Place 1</option>
        </select>
        <button onClick={sortTasksByScore}>Prioritize!</button>
      </div>

      <p className="info-small">
        <em>Slide to the left to delete an item</em>
      </p>

      <div className="list-container">
        <Accordion>
          {tasks.map((task, i) => {
            return (
              <Accordion.Item eventKey={i} key={i}>
                <Accordion.Header>
                  <div className="card-left">
                    <h2>{task.score}</h2>
                  </div>
                  <div className="card-right">
                    <h2>{task.name}</h2>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <p>
                    <em>{task.type}</em>
                  </p>
                  <input
                    type="time"
                    value={task.time}
                    onChange={(e) => handleTimeChange(i, e.target.value)}
                  />
                  <input
                    type="date"
                    value={task.date}
                    onChange={(e) => handleDateChange(i, e.target.value)}
                  />
                  {editableIndex === i ? (
                    <textarea
                      style={{ height: "180px", width: "300px" }}
                      type="text"
                      defaultValue={task.description}
                      onChange={handleTextAreaChange}
                    />
                  ) : (
                    task.description
                  )}
                  {editableIndex === i ? (
                    <button onClick={() => handleSaveClick(i)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(i)}>Edit</button>
                  )}
                  <button onClick={() => handleShowOnMap(task.location)}>
                    Show On Map
                  </button>
                  <button>Completed</button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>

      <div className="map-wrapper">
        <Map center={center} locations={tasks} map={map} />
      </div>
    </div>
  );
};
