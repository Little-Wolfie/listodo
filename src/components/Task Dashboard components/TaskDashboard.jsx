import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/TaskDashboard.css';
import FilterButtons from './FilterButtons';
import MapElement from './MapElement';
import TaskList from './TaskList';
import NavigationButtons from './NavigationButtons';
import { useNavigate } from "react-router-dom";
import "../../css/TaskDashboard.css";
import Map from "./Map";
import "react-datepicker/dist/react-datepicker.css";
// import { doc, setDoc, getDoc, query, where, collection, Timestamp, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
// import { db, auth } from  "../../firebase/firebase"
// import { onAuthStateChanged } from "firebase/auth";
// import { useSwipeable } from 'react-swipeable';
// import SwipeableAccordionItem from './SwipeableAccordionItem';

const MAP_REFRESH = {
	min: 0.0001,
	max: 0.001,
};

const options = [
	{ label: 'Score', value: 'score' },
	{ label: 'Name', value: 'name' },
	{ label: 'Time', value: 'time' },
	{ label: 'Duration', value: 'duration' },
	{ label: 'Type', value: 'type' },
];

export const TaskDashboard = ({ map, tasks = [], setTasks }) => {
	const [editableIndex, setEditableIndex] = useState(null);
	const [editText, setEditText] = useState('');
	const [center, setCenter] = useState({ lng: -0.4, lat: 51 });
	const [activeKey, setActiveKey] = useState(5);
	const [markers, setMarkers] = useState([]);
	const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
	const [currentOrder, setCurrentOrder] = useState(false);
	const [timestamp, setTimestamp] = useState(null);
	// const [currentUser, setCurrentUser] = useState('');

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
	};

	const handleFilterButtonClick = () => {
		setCurrentOptionIndex(prevIndex => (prevIndex + 1) % options.length);
		setCurrentOrder(false);
	};

	const sortTasks = sort => {
		return tasks.slice().sort((a, b) => {
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
	};

	const orderTasks = () => {
		setCurrentOrder(current => !current);
		setTasks(current => {
			const orderedTasks = current.slice().reverse();

			setActiveKey(orderedTasks[0].id.toString());
			setTimestamp(Date.now());
			return orderedTasks;
		});
	};

	const flyToTask = task => {
		setCenter({
			lng: (
				task.location.lng +
				(Math.random() * (MAP_REFRESH.max - MAP_REFRESH.min) + MAP_REFRESH.min)
			).toFixed(4),
			lat: (
				task.location.lat +
				(Math.random() * (MAP_REFRESH.max - MAP_REFRESH.min) + MAP_REFRESH.min)
			).toFixed(4),
		});
	};

	const closeAllPopups = () => {
		markers.forEach(marker => {
			if (marker.getPopup().isOpen()) {
				console.log('Close Popups Called!');
				marker.togglePopup();
			}
		});
	};

	// const handleCompletedTask = async task => {
	// 	const taskRef = doc(db, currentUser, task.name);
	// 	await updateDoc(taskRef, {
	// 		completed: true,
	// 	});
	// };

	// const handleTaskDelete = async taskId => {
	// 	setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
	// 	try {
	// 		const taskRef = doc(db, currentUser, taskId.toString());
	// 		await deleteDoc(taskRef);
	// 	} catch (error) {
	// 		console.error('Error deleteing task:', error);
	// 	}
	// };

	// const fetchTasksFromDB = async () => {
	// 	try {
	// 		const retrievedDocuments = await getDocs(collection(db, currentUser));
	// 		const fetchedTasks = retrievedDocuments.docs.map(doc => ({
	// 			id: doc.id,
	// 			...doc.data(),
	// 		}));
	// 		setTasks(fetchedTasks);
	// 		console.log('fetchedTasks:', fetchedTasks);
	// 	} catch (error) {
	// 		console.error('Error fetching tasks from database:', error);
	// 	}
	// };

	useEffect(() => {
		setTasks(() => {
			const sorted = sortTasks(options[currentOptionIndex].value);
			setActiveKey(sorted[0].id.toString());
			setTimestamp(Date.now());
			return sorted;
		});
	}, [currentOptionIndex]);

	useEffect(() => {
		const selectedTask = tasks.filter(task => task.id === Number(activeKey));
		if (selectedTask[0]) flyToTask(selectedTask[0]);

		const selectedMarker = markers.filter(
			marker => marker.getElement().marker_ID === Number(activeKey)
		);

		if (selectedMarker[0]) {
			console.log('popup toggled!');
			selectedMarker[0].togglePopup();
		}
	}, [activeKey, timestamp]);

	// useEffect(() => {
	// 	const getUserDetails = () => {
	// 		onAuthStateChanged(auth, userAuth => {
	// 			if (userAuth) {
	// 				setCurrentUser(userAuth.uid);
	// 			}
	// 		});
	// 	};
	// 	getUserDetails();
	// 	if (currentUser !== '') {
	// 		fetchTasksFromDB();
	// 	}
	// }, [currentUser]);

	return (
		<div className='task-dashboard'>
			<NavigationButtons />

			<button onClick={() => closeAllPopups()}>close</button>

			<FilterButtons
				options={options}
				currentOptionIndex={currentOptionIndex}
				currentOrder={currentOrder}
				orderTasks={orderTasks}
				setCurrentOptionIndex={setCurrentOptionIndex}
				handleFilterButtonClick={handleFilterButtonClick}
			/>

			<p className='info-small'>
				<em>Slide to the left to delete an item</em>
			</p>

			<TaskList
				activeKey={activeKey}
				setActiveKey={setActiveKey}
				tasks={tasks}
				handleTimeDateChange={handleTimeDateChange}
				setEditText={setEditText}
				editableIndex={editableIndex}
				handleSaveClick={handleSaveClick}
				setEditableIndex={setEditableIndex}
				flyToTask={flyToTask}
				closeAllPopups={closeAllPopups}
			/>

			<MapElement
				center={center}
				tasks={tasks}
				map={map}
				setActiveKey={setActiveKey}
				markers={markers}
				setMarkers={setMarkers}
				sortTasks={sortTasks}
				closeAllPopups={closeAllPopups}
			/>
		</div>
	);
}