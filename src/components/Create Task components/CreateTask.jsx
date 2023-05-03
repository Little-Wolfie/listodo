import React, { useState } from 'react'
import "../../css/CreateTask.css";

export const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskUrgency, setTaskUrgency] = useState(50)
  const [taskImportance, setTaskImportance] = useState(50)
  const [taskDuration, setTaskDuration] = useState()
  const [dueDate, setDueDate] = useState('0')

  const handleUrgencyChange = (e) => {
    setTaskUrgency(e.target.value)
  }
  const handleImportanceChange = (e) => {
    setTaskImportance(e.target.value)
  }
  const handleDurationChange = (e) => {
    setTaskDuration(e.target.value)
  }
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value)
  }
  return (
    <div className='create-task'>
      <h2>Create Task</h2>
      <div className='body'>
        <form>
      <input 
      type="text"
      placeholder='Task Title'
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      />
      <textarea
      type="text"
      placeholder='Task Description'
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      />
      <label htmlFor='urgency'>Task Urgency: {taskUrgency}</label>
      <input 
      id="urgency"
      type="range"
      min="0"
      max="100"
      value={taskUrgency}
      onChange={handleUrgencyChange}
      />
      <label htmlFor='importance'>Task Importance: {taskImportance}</label>
      <input 
      id="importance"
      type="range"
      min="0"
      max="100"
      value={taskImportance}
      onChange={handleImportanceChange}
      />
      <input
      type='number' style={{ width: '200px' }}
      min='0'
      value={taskDuration}
      onChange={handleDurationChange}
      placeholder={"Task duration (minutes)"}
      />
      <h3>Due date</h3>
      <input
      type='date'
      value={dueDate}
      onChange={handleDueDateChange}
      />
      <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}
