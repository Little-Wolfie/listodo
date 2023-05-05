import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import '../../css/TaskDashboard.css';
import Map from './Map';
import 'react-datepicker/dist/react-datepicker.css';

export const TaskDashboard = ({ map, tasks = [], setTasks }) => {
	const navigate = useNavigate();
	const [editableIndex, setEditableIndex] = useState(null);
	const [editText, setEditText] = useState('');
	const [center, setCenter] = useState({ lng: -0.4, lat: 51 });
  const orderRef = useRef(null);

	const handleSaveClick = i => {
		setTaskUtil(i, 'description', editText);
		setEditableIndex(null);
		setEditText('');
	};

	const handleTimeDateChange = (index, value, key) => {
		setTaskUtil(index, key, value);
	};

  const setTaskUtil = (index, key, value) => {
    setTasks(prevTasks =>
			prevTasks.map((task, i) => {
				if (i === index) task[key] = value;
        return task;
      })
		);
  }

  const sortTasks = (sort) => {
  setTasks(current => {
    const sortedTasks = current
      .slice()
      .sort((a, b) => {
        if (sort === 'time') {
          const aDateTime = new Date(`${a.date}T${a.time}`);
          const bDateTime = new Date(`${b.date}T${b.time}`);
          return aDateTime - bDateTime;
        } else if (typeof a[sort] === 'number') {
          return b[sort] - a[sort];
        } else {
          return a[sort].localeCompare(b[sort]);
        }
      });

    if (orderRef.current) orderRef.current.value = 'desc'
    return sortedTasks;
  });
}

  const orderTasks = () => {
    setTasks(current => {
      const orderedTasks = current
        .slice()
        .reverse();
      
      return orderedTasks;
    })
  }

	useEffect(() => {
		sortTasks('score');
	}, []);

	return (
		<div className='task-dashboard'>
			<header>
				<div className='header-container'>
					<button
						onClick={() => {
							navigate('/create-task');
						}}
					>
						Create Task
					</button>
					<button
						onClick={() => {
							navigate('/profile');
						}}
					>
						Profile
					</button>
				</div>
			</header>

			<div className='filtering-container'>
        <p>Sort</p>
				<select onChange={e => sortTasks(e.target.value)}>
					<option value='score'>Score</option>
          <option value='name'>Name</option>
          <option value='time'>Time/Date</option>
          <option value='duration'>Duration</option>
          <option value='type'>Type</option>
				</select>

        <p>Order</p>
        <select onChange={() => orderTasks()} ref={orderRef}>
					<option value='desc'>Desc</option>
          <option value='asc'>Asc</option>
				</select>
				<button onClick={() => sortTasks('score')}>Auto</button>
			</div>

			<p className='info-small'>
				<em>Slide to the left to delete an item</em>
			</p>

			<div className='list-container'>
				<Accordion>
					{tasks.map((task, i) => {
						return (
							<Accordion.Item
								eventKey={i}
								key={i}
							>
								<Accordion.Header>
									<div className='card-left'>
										<h2>{task.score}</h2>
									</div>
									<div className='card-right'>
										<h2>{task.name}</h2>
									</div>
								</Accordion.Header>

								<Accordion.Body>
									<p>
										<em>{task.type}</em>
									</p>
									<input
										type='time'
										value={task.time}
										onChange={e => handleTimeDateChange(i, e.target.value, 'time')}
									/>
									<input
										type='date'
										value={task.date}
										onChange={e => handleTimeDateChange(i, e.target.value, 'date')}
									/>
									{editableIndex === i ? (
										<textarea
											style={{ height: '180px', width: '300px' }}
											type='text'
											defaultValue={task.description}
											onChange={(e) => setEditText(e.target.value)}
										/>
									) : (
										task.description
									)}
									{editableIndex === i ? (
										<button onClick={() => handleSaveClick(i)}>Save</button>
									) : (
										<button onClick={() => setEditableIndex(i)}>Edit</button>
									)}
									<button onClick={() => setCenter(task.location)}>
										Show On Map
									</button>
									<button>Completed</button>
								</Accordion.Body>
							</Accordion.Item>
						);
					})}
				</Accordion>
			</div>

			<div className='map-wrapper'>
				<Map
					center={center}
					locations={tasks}
					map={map}
				/>
			</div>
		</div>
	);
};
