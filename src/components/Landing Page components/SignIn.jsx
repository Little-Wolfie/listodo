import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard")
      .then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );
    } catch(error) {
      console.error(error);
      setError(error)
    }
  };
  return (
    <div>
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={signIn}>Sign In</button>
     
    </div>
  );
};
