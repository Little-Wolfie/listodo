import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
	const navigate = useNavigate();

	return (
		<nav>
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
		</nav>
	);
};

export default NavigationButtons;
