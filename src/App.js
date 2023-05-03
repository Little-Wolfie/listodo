import "./App.css";
import Header from "./components/Logo/Header";
import { auth, db } from "./firebase/firebase";
import AuthTest from "./components/AuthTest";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "./components/Landing Page components/LandingPage";
import { TaskDashboard } from "./components/Task Dashboard components/TaskDashboard";
import { CreateTask } from "./components/Create Task components/CreateTask";
import { EditTask } from "./components/Edit Task components/EditTask";
import { Profile } from "./components/Profile components/Profile";
import { useRef, useState } from "react";

const temp = [
  {
    type: "Business",
    score: 3,
    name: "Eat Pizza",
    date: "2023-12-25",
    time: "01:00",
    location: { lng: -0.1, lat: 50 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Personal",
    score: 5,
    name: "Netflix n chill",
    date: "2023-12-25",
    time: "02:00",
    location: { lng: -0.46, lat: 52 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Appointment",
    score: 1,
    name: "Dental",
    date: "2023-12-25",
    time: "03:00",
    location: { lng: -0.4, lat: 50 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Business",
    score: 7,
    name: "Some job over there",
    date: "2023-12-25",
    time: "04:00",
    location: { lng: -0.4, lat: 55 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Meeting",
    score: 8,
    name: "Cut grass",
    date: "2023-12-25",
    time: "05:00",
    location: { lng: -0.4, lat: 52 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Business",
    score: 1,
    name: "Lunch with mum",
    date: "2023-12-25",
    time: "06:00",
    location: { lng: -0.3, lat: 51 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Business",
    score: 6,
    name: "Gaming with the boys",
    date: "2023-12-25",
    time: "12:00",
    location: { lng: -0.1, lat: 51 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
  {
    type: "Business",
    score: 2,
    name: "Shopping",
    date: "2023-12-25",
    time: "12:00",
    location: { lng: -0.5, lat: 52 },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, accusantium error dolor atque numquam mollitia sint quae saepe illum deleniti. Asperiores, excepturi pariatur quibusdam vitae nesciunt quia. Aliquid, voluptatem! Dignissimos?",
  },
];

function App() {
  const [tasks, setTasks] = useState(temp);
  const map = useRef(null);
  const location = useLocation()
  

  return (
    <div className="App">
   {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={
            <TaskDashboard map={map} tasks={tasks} setTasks={setTasks} />
          }
        />

        <Route
          path="/create-task"
          element={<CreateTask map={map} setTasks={setTasks} />}
        />

        <Route path="/edit-task" element={<EditTask />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
