import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../css/TaskDashboard.css';

mapboxgl.accessToken =
	'pk.eyJ1Ijoid29sZmlleCIsImEiOiJjbGd5eTFzZ3EwNXg3M3JveDYzajJ2M2s1In0.2QcQiyjjzt2-vnDY55I94w';

const Map = ({ center = { lng: -0.4, lat: 51 }}) => {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		navigator.geolocation.getCurrentPosition(
			position => {
				const { longitude, latitude } = position.coords;
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [longitude, latitude],
					zoom: 12,
				});
			},
			() => {
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [-0.4, 51],
					zoom: 12,
				});
			}
		);
	}, []);
	

	useEffect(() => {
		if (map.current) {
			map.current.flyTo({center: [center.lng, center.lat]})
		}
	}, [center])

	return (
		<div
			className='map-container'
			ref={mapContainer}
		/>
	);
};

export default Map;
