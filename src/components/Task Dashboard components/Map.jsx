import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../css/TaskDashboard.css';
import '../../css/TaskDashboard.css';

const MARKER_COLORS = {
	Task: 'red',
	Appointment: 'blue',
	Meeting: 'green',
	Business: 'yellow',
	Personal: 'pink',
	Job: 'orange',
};

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ center, locations, map }) => {
	const [markers, setMarkers] = useState([]);
	const mapContainer = useRef(null);

	const createMarkers = () => {
		return locations.map(location => {
			const m = new mapboxgl.Marker({ color: MARKER_COLORS[location.type] })
				.setLngLat([location.location.lng, location.location.lat])
				.addTo(map.current);

			const popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
				`
        <div class="popup-content">
          <h6><strong>${location.name}</strong></h6>
          <p>${location.time}</p>
          <p>${location.date}</p>
        </div>
        `
			);

			m.setPopup(popup);
			return m;
		});
	};

	useEffect(() => {
		if (map.current) return;
		navigator.geolocation.getCurrentPosition(
			position => {
				const { longitude, latitude } = position.coords;
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/wolfiex/clh7da82l01lm01p4dnoohyo3',
					center: [longitude, latitude],
					zoom: 12,
				});

				const newMarkers = createMarkers();
				setMarkers(newMarkers);
			},
			() => {
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/wolfiex/clh7da82l01lm01p4dnoohyo3',
					center: [-0.4, 51],
					zoom: 12,
				});

				const newMarkers = createMarkers();
				setMarkers(newMarkers);
			}
		);
	}, []);

	useEffect(() => {
		if (map.current && locations.length > 0) {
			const newMarkers = createMarkers();
			setMarkers(newMarkers);
		}
	}, [locations]);

	useEffect(() => {
		if (map.current) {
			map.current.flyTo({ center: [center.lng, center.lat], zoom: 16 });
		}
	}, [center]);

	return (
		<div
			className='map-container'
			ref={mapContainer}
		/>
	);
};

export default Map;
