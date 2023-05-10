import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CompletedTasks = ({setShowCompletedTaskButton, setRenderCompletedTask}) => {

  const [currentUser, setCurrentUser] = useState("")
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTasksFromDB = async () => {
    try {
      const collectionQuery =  query(collection(db, currentUser), where("completed", "==", true ))
      const completedTasks = await getDocs(collectionQuery)
      const fetchedTasks = completedTasks.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTasks(fetchedTasks)
    } catch (error) {
      console.error("Error fetching tasks from database:", error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const getUserDetails = () => {
        onAuthStateChanged(auth, (userAuth) => {
          if (userAuth) {
          setCurrentUser(userAuth.uid)
          }
        });
      };
    getUserDetails()
    if(currentUser !== ""){
      fetchTasksFromDB();
    }
    setIsLoading(false)
  }, [currentUser])

    const handleShowLess = () => {
        setShowCompletedTaskButton(true);
        setRenderCompletedTask(false)
    }

  if(isLoading) return <p>Tasks loading...</p>
    console.log(tasks)
  return (
    <div>
      {tasks.length === 0 ? <p>No completed tasks</p> : tasks.map((task) => {
        return <ul>
            <li>{task.name}</li>
        </ul>
      })}
      <button onClick={handleShowLess}>Show Less</button>
    </div>
  );
};

export default CompletedTasks;
