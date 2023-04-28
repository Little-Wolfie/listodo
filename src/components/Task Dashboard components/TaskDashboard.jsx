import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TaskDashboard.css';

const temp = [
	{ name: 'Eat Pizza', expanded: false },
	{ name: 'Netflix n chill', expanded: false },
	{ name: 'Dental', expanded: false },
	{ name: 'Some job over there', expanded: false },
	{ name: 'Cut grass', expanded: false },
	{ name: 'Lunch with mum', expanded: false },
	{ name: 'Gaming with the boys', expanded: false },
	{ name: 'Shopping', expanded: false },
	{ name: 'Eat Pizza', expanded: false },
	{ name: 'Netflix n chill', expanded: false },
	{ name: 'Dental', expanded: false },
	{ name: 'Some job over there', expanded: false },
	{ name: 'Cut grass', expanded: false },
	{ name: 'Lunch with mum', expanded: false },
	{ name: 'Gaming with the boys', expanded: false },
	{ name: 'Shopping', expanded: false },
];

export const TaskDashboard = () => {
	const [tasks, setTasks] = useState(temp);
	const [expandedCards, setExpandedCards] = useState([]);
	const navigate = useNavigate();

	const handleTaskCardClick = (e, i) => {
		console.log(e.target.innerText);
		setExpandedCards([...expandedCards, i]);

		setTasks(
			tasks.map((task, index) =>
				i === index ? { ...task, expanded: !task.expanded } : task
			)
		);
	};

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
				<button>Prioritise!</button>
			</div>
			<p className='info-small'>Slide to the left to delete an item</p>
			<div className='list-container'>
				<ol>
					{tasks.map((task, i) => {
						return (
							<li
								key={i}
								onClick={e => handleTaskCardClick(e, i)}
							>
								<div
									className={`task-card ${
										task.expanded ? 'card-slide-open' : 'card-slide-closed'
									}`}
								>
									<div className='card-container'>
										<div className='card-left'>
											<h2>5</h2>
										</div>
										<div className='card-right'>
											<h2>{task.name}</h2>
										</div>
									</div>

									<div className='card-content'>
										<h2>hwheh</h2>
									</div>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
			<div className='map-wrapper'></div>
		</div>
	);
};
