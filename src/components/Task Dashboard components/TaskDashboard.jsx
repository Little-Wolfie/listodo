import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/TaskDashboard.css'

export const TaskDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className='task-dashboard'>
      <header>
        <div className='header-container'>
          <button>Create Task</button>
          <button onClick={() => {
            navigate('/profile')
          }}>Profile</button>
        </div>
      </header>
      <div className='filtering-container'>
        <select>
          <option>
            Place 1
          </option>
          <option>
            Place 2
          </option>
          <option>
            Place 3
          </option>
          <option>
            Place 4
          </option>
          <option>
            Place 5
          </option>
        </select>
        <button>
          Prioritise!
        </button>
      </div>
        <p>Slide to the left to delete an item</p>
      <div className='list-container'>
        <ol>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
        </ol>
      </div>
      <div className='map-wrapper'>
        
      </div>
    </div>
  )
}
