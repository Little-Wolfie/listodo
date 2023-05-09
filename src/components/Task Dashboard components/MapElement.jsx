import Map from './Map';

const MapElement = ({
	center,
	tasks,
	map,
	setActiveKey,
	markers,
	setMarkers,
	sortTasks,
	closeAllPopups,
}) => {
	return (
		<div className='map-wrapper'>
			<Map
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
};

export default MapElement;
