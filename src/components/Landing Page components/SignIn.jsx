import { useState, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Form, Button, InputGroup, FormControl  } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          setUser(userCredential.user);
          navigate("/dashboard");
        }
      );
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaEnvelope />
          </InputGroup.Text>
          <FormControl
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
        <InputGroup.Text>
        <FaLock />
        </InputGroup.Text>
        <FormControl
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </InputGroup>
      </Form.Group>
      <Button onClick={signIn}>Sign In</Button>
    </Form>
  );
};
