import "./App.css";
import { auth, db } from "./firebase/firebase";
import AuthTest from "./components/AuthTest";
import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/Landing Page components/LandingPage"
import { TaskDashboard } from "./components/Task Dashboard components/TaskDashboard"
import { CreateTask } from "./components/Create Task components/CreateTask"
import { EditTask } from "./components/Edit Task components/EditTask"
import { Profile } from "./components/Profile components/Profile"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<TaskDashboard />} />
        <Route path='/create-task' element={<CreateTask />} />
        <Route path='/edit-task' element={<EditTask />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
