const FilterButtons = ({
	options,
	currentOptionIndex,
	currentOrder,
	orderTasks,
	setCurrentOptionIndex,
	handleFilterButtonClick,
}) => {
	return (
		<div className='filtering-container'>
			<div>
				<button onClick={handleFilterButtonClick}>
					{options[currentOptionIndex].label}
				</button>
			</div>
			<div>
				<button onClick={orderTasks}>{currentOrder ? 'Asc' : 'Desc'}</button>
			</div>
			<button
				onClick={() => {
					setCurrentOptionIndex(0);
					if (currentOrder) orderTasks();
				}}
			>
				Reset
			</button>
		</div>
	);
};

export default FilterButtons;
