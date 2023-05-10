import Accordion from 'react-bootstrap/Accordion';

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
}) => {
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
								<button>Completed</button>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
		</div>
	);
};

export default TaskList;
