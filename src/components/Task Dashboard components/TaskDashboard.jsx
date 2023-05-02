import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import '../../css/TaskDashboard.css';
import Map from './Map';
import 'react-datepicker/dist/react-datepicker.css';


const temp = [
	{ name: 'Eat Pizza', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Netflix n chill', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Dental', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Some job over there', date: '05/02/2023',  time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Cut grass', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Lunch with mum', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Gaming with the boys', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
	{ name: 'Shopping', date: '05/02/2023', time: '12:00', location: { lat: 40.748817, lng: -73.985428 }, description: 'example' },
];

export const TaskDashboard = () => {
	const [tasks, setTasks] = useState(temp);
	const navigate = useNavigate();
	const [editableIndex, setEditableIndex] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState('')
	const [center, setCenter] = useState({ lng: -0.4, lat: 90 });


	const handleEditClick = (index) => {
		setEditableIndex(index);
	};

	const handleTextAreaChange = (e) => {
		setEditText(e.target.value);
	};

	const handleSaveClick = (i) => {

		setTasks((prevTasks) =>
			prevTasks.map((task, index) =>
				index === i ? { ...task, description: editText } : task
			)
		);
		setEditableIndex(null);
		setEditText('');
	};

	const handleTimeChange = (index, value) => {
		setTasks(prevTasks =>
			prevTasks.map((task, idx) =>
				idx === index ? { ...task, time: value } : task
			)
		);
		console.log(tasks[0].time)
	};
	const handleDateChange = (index, value) => {
		setTasks(prevTasks =>
			prevTasks.map((task, idx) =>
				idx === index ? { ...task, date: value } : task
			)
		);
	};

	const handleShowOnMap = (taskLocation) => {
		setCenter(taskLocation);
	  }
	  


	return (
		<div className='task-dashboard'>
			<header>
				<div className='header-container'>
					<button>Create Task</button>
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
				<select>
					<option>Place 1</option>
				</select>
				<button>Prioritize!</button>
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
										<h2>5</h2>
									</div>
									<div className='card-right'>
										<h2>{task.name}</h2>
									</div>
								</Accordion.Header>
								<Accordion.Body>
									<input
										type="time"
										value={task.date}
										onChange={(e) => handleDateChange(i, e.target.value)}
									/>
									<input
										type="date"
										value={task.time}
										onChange={(e) => handleTimeChange(i, e.target.value)}
									/>
									{editableIndex === i ? (
										<textarea style={{ height: '180px', width: '300px' }}
											type="text"
											defaultValue={task.description}
											onChange={handleTextAreaChange}
										/>
									) : (
										task.description
									)}
									{editableIndex === i ? (
										<button onClick={() =>
											 handleSaveClick(i)}>Save</button>
									) : (
										<button onClick={() => handleEditClick(i)}>Edit</button>
									)}
									<button onClick={() => handleShowOnMap(task.location)}>Show On Map</button>
								
								</Accordion.Body>
							</Accordion.Item>
						);
					})}
				</Accordion>
			</div>

			<div className='map-wrapper'>
				<Map center={center}/>
			</div>
		</div>
	);
};
