import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import "../../css/TaskDashboard.css";
import Map from "./Map";
import "react-datepicker/dist/react-datepicker.css";

const MAP_REFRESH = {
  min: 0.0000001,
  max: 0.000001
}

const options = [
  { label: 'Score', value: 'score'},
  { label: 'Name', value: 'name'},
  { label: 'Time', value: 'time'},
  { label: 'Duration', value: 'duration'},
  { label: 'Type', value: 'type'},
]

export const TaskDashboard = ({ map, tasks = [], setTasks }) => {
	const navigate = useNavigate();
	const [editableIndex, setEditableIndex] = useState(null);
	const [editText, setEditText] = useState('');
	const [center, setCenter] = useState({ lng: -0.4, lat: 51 });
  const [activeKey, setActiveKey] = useState(null);
	const [markers, setMarkers] = useState([]);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(false)

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

  const handleButtonClick = () => {
    setCurrentOptionIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

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

      flyToTask(sortedTasks[0])
      return sortedTasks;
    });
  }

  const orderTasks = () => {
    setCurrentOrder(current => !current);
    setTasks(current => {
      const orderedTasks = current
        .slice()
        .reverse();
      
        flyToTask(orderedTasks[0])
      return orderedTasks;
    })
  }

  const flyToTask = (task) => {
    setCenter(
      { 
        lng: task.location.lng + (Math.random() * (MAP_REFRESH.max - MAP_REFRESH.min) + MAP_REFRESH.min), 
        lat: task.location.lat + (Math.random() * (MAP_REFRESH.max - MAP_REFRESH.min) + MAP_REFRESH.min) 
      })
  }

  useEffect(() => {
    sortTasks(options[currentOptionIndex].value);
  }, [currentOptionIndex])

  useEffect(() => {
    const selectedTask = tasks.filter(task => task.id === Number(activeKey));
    if (selectedTask[0]) flyToTask(selectedTask[0])

    const selectedMarker = markers.filter(marker => marker.getElement().marker_ID === Number(activeKey))
    if (selectedMarker[0]) {
      markers.forEach(marker => {
        if (marker.getPopup().isOpen()) {

          marker.togglePopup();
        }
      })
      selectedMarker[0].togglePopup()
    };

  }, [activeKey])

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
        <div>
          <button onClick={handleButtonClick}>
            {options[currentOptionIndex].label}
          </button>
        </div>

        <div>
          <button onClick={orderTasks}>
            {currentOrder ? 'Asc' : 'Desc'}
          </button>
        </div>

				<button onClick={() => {
          setCurrentOptionIndex(0)
          if (currentOrder) orderTasks();
        }}>
          Reset
        </button>
			</div>

			<p className='info-small'>
				<em>Slide to the left to delete an item</em>
			</p>

			<div className='list-container'>
				<Accordion activeKey={activeKey} 
        onSelect={(selectedKey) => setActiveKey((prevKey) => prevKey === selectedKey ? null : selectedKey)}>

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
									<button onClick={() => flyToTask(task)}>
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
					tasks={tasks}
					map={map}
          setActiveKey={setActiveKey}
          setMarkers={setMarkers}
				/>
			</div>
		</div>
	);
};