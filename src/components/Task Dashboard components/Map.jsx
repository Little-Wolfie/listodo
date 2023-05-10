import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../css/TaskDashboard.css';

const MARKER_COLORS = {
	Task: '#ffdc00',
	Appointment: '#9e00ff',
	Meeting: '#00ff15',
	Business: '#e0ff00',
	Personal: '#ff0000',
	Job: '0021ff',
};

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({
	center,
	tasks,
	map,
	setActiveKey,
	markers,
	setMarkers,
	sortTasks,
	closeAllPopups,
}) => {
	const mapContainerRef = useRef(null);

	const generateColorFilter = color => {
		const dummyElement = document.createElement('div');
		dummyElement.style.color = color;
		document.body.appendChild(dummyElement);
		const rgbColor = window.getComputedStyle(dummyElement).color;
		document.body.removeChild(dummyElement);

		const rgbToHsl = (r, g, b) => {
			r /= 255;
			g /= 255;
			b /= 255;

			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			let h,
				s,
				l = (max + min) / 2;

			if (max === min) {
				h = s = 0;
			} else {
				const d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
					default:
						break;
				}

				h /= 6;
			}

			return [h, s, l];
		};

		const sepia = 1;
		const saturation = 10000;
		const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
		const [h, s, l] = rgbToHsl(r, g, b);
		const hueRotate = h * 360 - 60; // Shift hue 60 degrees back for white

		return `brightness(1) sepia(${sepia}) saturate(${saturation}%) hue-rotate(${hueRotate}deg)`;
	};

	const createMarkers = () => {
		return tasks.map(task => {
			const isSortedTask = JSON.stringify(task) === JSON.stringify(tasks[0]);

			const markerElement = document.createElement('div');
			markerElement.marker_ID = task.id;
			markerElement.innerHTML = `<img id=marker-${
				task.id
			} src="marker.png" style="width: 2rem; height: 2rem; filter: ${generateColorFilter(
				MARKER_COLORS[task.type]
			)};"/>`;
			markerElement.style.cursor = 'pointer';

			const m = new mapboxgl.Marker(markerElement)
				.setLngLat([task.location.lng, task.location.lat])
				.addTo(map.current);

			const popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
				`
          <div class="popup-content">
            <h6><strong>${task.name}</strong></h6>
            <p>${task.name}</p>
            <p>${task.date}</p>
          </div>
        `
			);

			m.setPopup(popup);

			m.getElement().addEventListener('click', () => {
				setActiveKey(task.id.toString());
			});

			if (isSortedTask) {
				console.log('isSortedTask:', isSortedTask);
				m.togglePopup();
			}

			return m;
		});
	};

	useEffect(() => {
		if (map.current) return;

		const initializeMap = coords => {
			const { longitude, latitude } = coords;
			map.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: 'mapbox://styles/wolfiex/clh7da82l01lm01p4dnoohyo3',
				center: [longitude, latitude],
				zoom: 12,
			});

			const sortedTasks = tasks.slice().sort((a, b) => b.score - a.score);

			map.current.flyTo({
				center: [sortedTasks[0].location.lng, sortedTasks[0].location.lat],
				zoom: 14,
			});

			map.current.on('load', () => {
				// do something on map load later
			});

			const newMarkers = createMarkers();
			setMarkers(newMarkers);
		};

		navigator.geolocation.getCurrentPosition(
			position => {
				initializeMap(position.coords);
			},
			() => {
				initializeMap({ longitude: -0.4, latitude: 51 });
			}
		);

		return () => {
			if (map.current) {
				map.current.remove();
				map.current = null;
			}
		};
	}, [map]);

	useEffect(() => {
		if (map.current && tasks.length > 0) {
			setMarkers(() => {
				closeAllPopups();

				return createMarkers();
			});
		}
	}, [tasks]);

	useEffect(() => {
		if (map.current) {
			map.current.flyTo({ center: [center.lng, center.lat], zoom: 14 });
		}
	}, [center]);

	return (
		<div
			className='map-container'
			ref={mapContainerRef}
		/>
	);
};

export default Map;
