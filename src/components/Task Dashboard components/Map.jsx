import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../css/TaskDashboard.css';

mapboxgl.accessToken =
	'pk.eyJ1Ijoid29sZmlleCIsImEiOiJjbGd5eTFzZ3EwNXg3M3JveDYzajJ2M2s1In0.2QcQiyjjzt2-vnDY55I94w';

const Map = ({ center, locations, map }) => {
	const [markers, setMarkers] = useState([]);
	const mapContainer = useRef(null);

	const createMarkers = () => {
		return locations.map(location => {
			const m = new mapboxgl.Marker({ color: '#0000FF' })
				.setLngLat([location.location.lng, location.location.lat])
				.addTo(map.current);

			const popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
				`<h3>${location.name}</h3>`
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
