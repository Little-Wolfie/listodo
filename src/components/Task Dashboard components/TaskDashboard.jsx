import React from 'react'
import '../../css/TaskDashboard.css'

export const TaskDashboard = () => {
  return (
    <div className='task-dashboard'>
      <header>
        <div className='header-container'>
          <button>Create Task</button>
          <button>Profile</button>
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
