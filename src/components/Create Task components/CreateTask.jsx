import React, { useEffect, useRef, useState } from 'react';
import '../../css/CreateTask.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, auth, db } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export const CreateTask = ({ map, setTasks }) => {
	const navigate = useNavigate();
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [taskUrgency, setTaskUrgency] = useState(50);
	const [taskImportance, setTaskImportance] = useState(50);
	const [taskDuration, setTaskDuration] = useState(0);
	const [type, setType] = useState('task');
	const [dueDate, setDueDate] = useState(
		new Date().toISOString().substring(0, 10)
	);
	const [dueTime, setDueTime] = useState('00:00');
	const [location, setLocation] = useState({ name: '', lng: 0, lat: 0 });
	const [currentUser, setCurrentUser] = useState("")

	const locationInput = useRef(null);
	 const addTask = useLocation().state?.addTask;


	const handleCreateTaskSubmit = async (e) => {
		e.preventDefault();
		// const dueDateTimeString = `${dueDate}T${dueTime}`;
		// const dueDateTime = new Date(dueDateTimeString);
		// const dueDateTimestamp = Timestamp.fromDate(dueDateTime);

		// data shape
		// {
		//   id: 1,
		//   type: 'Task',
		//   score: 3,
		//   name: 'Eat Pizza',
		//   date: '2023-08-16',
		//   time: '22:00',
		//   location: { lng: -0.1, lat: 50 },
		//   duration: 10,
		//   description:
		//     'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?',
		// }
		const task = {
			// userId: auth.currentUser.uid,
			id: uuidv4(),
			type: type,
			score: Number(taskUrgency) + Number(taskImportance),
			name: taskTitle,
			date: dueDate,
			time: dueTime,
			location: location,
			duration: taskDuration,
			description: taskDescription,
			completed: false,
			// deadline: dueDateTimestamp,
			// need to deal with scoring
			//score = (urgency_weight * urgency + importance_weight * importance) / (duration_weight * duration)
		};

		try {
			const tasksCollectionRef = collection(db, currentUser);
			// const userDocRef = doc(db, currentUser, `${task.name}`)
			await setDoc(doc(tasksCollectionRef, task.name), task);
			addTask(task);
			navigate('/dashboard');
		} catch (error) {
			console.error('Error adding task to Firestore:', error);
		}

		setTasks(current => {
			const newTasks = [task, ...current];
			console.log('newTasks:', newTasks);
			return newTasks;
		});

		navigate('/dashboard');
	};

	useEffect(() => {
		const getUserDetails = () => {
			onAuthStateChanged(auth, (userAuth) => {
			  if (userAuth) {
				setCurrentUser(userAuth.uid)
			  }
			});
		  };
		getUserDetails()
	}, [])

	useEffect(() => {
		if (map) {
			const geocoder = new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
				marker: false,
				placeholder: 'Enter a location...',
			});

			geocoder.on('result', e => {
				console.log(e.result);
				setLocation({
					name: e.result.text,
					lng: e.result.center[0],
					lat: e.result.center[1],
				});
			});

			locationInput.current.appendChild(geocoder.onAdd(map.current));
		}
	}, []);

	return (
		<div className='create-task'>
			<h2>Create Task</h2>
			<div className='body'>
				<form onSubmit={handleCreateTaskSubmit}>
					<label htmlFor='input-type'>Task type</label>
					<select
						id='input-type'
						value={type}
						onChange={e => setType(e.target.value)}
					>
						<option value='Task'>Task</option>
						<option value='Appointment'>Appointment</option>
						<option value='Meeting'>Meeting</option>
						<option value='Business'>Business</option>
						<option value='Personal'>Personal</option>
						<option value='Job'>Job</option>
					</select>

					<label htmlFor='input-title'>Task title</label>
					<input
						id='input-title'
						type='text'
						placeholder='Enter a title...'
						value={taskTitle}
						onChange={e => setTaskTitle(e.target.value)}
						required
					/>

					<label htmlFor='input-desc'>Task Details</label>
					<textarea
						id='input-desc'
						type='text'
						cols='30'
						rows='4'
						placeholder='Enter a desc...'
						value={taskDescription}
						onChange={e => setTaskDescription(e.target.value)}
					/>

					<label htmlFor='urgency'>Task Urgency: {taskUrgency}</label>
					<input
						id='urgency'
						type='range'
						min='0'
						max='100'
						value={taskUrgency}
						onChange={e => setTaskUrgency(e.target.value)}
					/>

					<label htmlFor='importance'>Task Importance: {taskImportance}</label>
					<input
						id='importance'
						type='range'
						min='0'
						max='100'
						value={taskImportance}
						onChange={e => setTaskImportance(e.target.value)}
					/>

					<label htmlFor='input-dur'>Task duration (Mins)</label>
					<input
						type='number'
						style={{ width: '200px' }}
						min='0'
						value={taskDuration}
						onChange={e => setTaskDuration(e.target.value)}
						placeholder='Enter a duration...'
					/>

					<label htmlFor='dueTime'>Due time</label>
					<input
						type='time'
						id='dueTime'
						value={dueTime}
						onChange={e => setDueTime(e.target.value)}
					/>

					<label htmlFor='input-date'>Due date</label>
					<input
						id='input-date'
						type='date'
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
					/>

					<article>
						<label>Location</label>
						<div
							className='location-input'
							ref={locationInput}
						></div>
					</article>

					<button type='submit'>Create</button>
				</form>
			</div>
		</div>
	);
}