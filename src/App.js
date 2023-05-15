import "./App.css";
import Header from "./components/Logo/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "./components/Landing Page components/LandingPage";
import { TaskDashboard } from "./components/Task Dashboard components/TaskDashboard";
import { CreateTask } from "./components/Create Task components/CreateTask";
import { Profile } from "./components/Profile components/Profile";
import {auth} from "./firebase/firebase"
import { useRef, useState, useEffect } from "react";

function App() {
	const [tasks, setTasks] = useState([]);
	const map = useRef(null);
	const location = useLocation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<div className='App'>
			{location.pathname !== '/login' && <Header />}
			<Routes>
				<Route
					path='/'
					element={
						<Navigate
							to='/login'
							replace
						/>
					}
				/>
				<Route
					path='/login'
					element={
						user ? (
							<Navigate
								to='/dashboard'
								replace
							/>
						) : (
							<LandingPage />
						)
					}
				/>

				<Route
					path='/dashboard'
					element={
						user ? (
							<TaskDashboard
								map={map}
								tasks={tasks}
								setTasks={setTasks}
							/>
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>

				<Route
					path='/create-task'
					element={
						user ? (
							<CreateTask
								map={map}
								setTasks={setTasks}
							/>
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>

				<Route
					path='/profile'
					element={
						user ? (
							<Profile />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>

				<Route
					path='*'
					element={
						user ? (
							<TaskDashboard
								map={map}
								tasks={tasks}
								setTasks={setTasks}
							/>
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
			</Routes>
		</div>
	);
}


export default App;


