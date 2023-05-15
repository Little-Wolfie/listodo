import Accordion from 'react-bootstrap/Accordion';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from  "../../firebase/firebase"
import SwipeableAccordionItem from './SwipeableAccordionItem';

const TaskList = ({
	activeKey,
	setActiveKey,
	tasks,
	handleTimeDateChange,
	setEditText,
	editableIndex,
	handleSaveClick,
	setEditableIndex,
	flyToTask,
	closeAllPopups,
	currentUser,
	setTasks
}) => {
	const handleTaskDelete = async (taskId, taskName) => {
		setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
		try {
			const taskRef = doc(db, currentUser, taskName.toString());
			await deleteDoc(taskRef);
		} catch (error) {
			console.error('Error deleteing task:', error);
		}
	};

	const handleCompletedTask = async task => {
		const taskRef = doc(db, currentUser, task.name);
		await updateDoc(taskRef, {
			completed: true,
		});
	};

	return (
		<div className='list-container'>

			<Accordion
				activeKey={activeKey}
				onSelect={selectedKey => {
					closeAllPopups();
					setActiveKey(prevKey =>
						prevKey === selectedKey ? null : selectedKey
						);
					}}
					>
				{tasks.map((task, i) => {
					return (
						<SwipeableAccordionItem taskId={task.id} taskName={task.name} handleTaskDelete={handleTaskDelete} key={i}>
						<Accordion.Item
						eventKey={task.id.toString()}
							key={i}
							id={`accordion-item-${task.id}`}
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
									onChange={e =>
										handleTimeDateChange(i, e.target.value, 'time')
									}
									/>
								<input
									type='date'
									value={task.date}
									onChange={e =>
										handleTimeDateChange(i, e.target.value, 'date')
									}
								/>
								{editableIndex === i ? (
									<textarea
									style={{ height: '180px', width: '300px' }}
										type='text'
										defaultValue={task.description}
										onChange={e => setEditText(e.target.value)}
									/>
									) : (
										task.description
										)}
								{editableIndex === i ? (
									<button onClick={() => handleSaveClick(i)}>Save</button>
								) : (
									<button onClick={() => setEditableIndex(i)}>Edit</button>
								)}
								<button onClick={() => flyToTask(task)}>Show On Map</button>
								<button onClick={() => handleCompletedTask(task)}>Completed</button>
							</Accordion.Body>
						</Accordion.Item>
					</SwipeableAccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default TaskList;
