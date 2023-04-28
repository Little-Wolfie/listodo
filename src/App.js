import logo from "./logo.svg";
import "./App.css";
import { auth, db } from "./firebase/firebase";
import AuthTest from "./components/AuthTest";

function App() {
  return (
    <div className="App">
      <AuthTest />
    </div>
  );
}

export default App;
