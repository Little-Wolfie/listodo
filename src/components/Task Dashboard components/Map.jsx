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

const Map = ({ center, locations, map, setActiveKey }) => {
	const [markers, setMarkers] = useState([]);
	const mapContainerRef = useRef(null);

	const createMarkers = () => {
  const sortedTask = locations.slice().sort((a, b) => b.score - a.score)[0];

  return locations.map((location) => {
    const isSortedTask =
      JSON.stringify(location) === JSON.stringify(sortedTask);

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

    m.getElement().addEventListener('click', () => {
      setActiveKey(location.id.toString());
      map.current.flyTo({ center: [location.location.lng, location.location.lat], zoom: 12 });
    });

    if (isSortedTask) {
      m.togglePopup(); 
    }

    

    return m;
  });
};

	useEffect(() => {
    if (map.current) return; // Avoid reinitializing the map

    const initializeMap = (coords) => {
      const { longitude, latitude } = coords;
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/wolfiex/clh7da82l01lm01p4dnoohyo3',
        center: [longitude, latitude],
        zoom: 12,
      });

      const sortedTasks = locations
				.slice()
				.sort((a, b) => b.score - a.score);

		  map.current.flyTo({ center: [sortedTasks[0].location.lng, sortedTasks[0].location.lat], zoom: 12 });

      map.current.on('load', () => {
      // do something on map load later
      })

      const newMarkers = createMarkers();
      setMarkers(newMarkers);
    };

    

    navigator.geolocation.getCurrentPosition(
      (position) => {
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
		if (map.current && locations.length > 0) {
			const newMarkers = createMarkers();
			setMarkers(newMarkers);
		}
	}, [locations]);

	useEffect(() => {
		if (map.current) {
			map.current.flyTo({ center: [center.lng, center.lat], zoom: 12 });
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
