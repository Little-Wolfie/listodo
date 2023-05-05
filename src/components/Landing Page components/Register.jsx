import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const createAccount = async () => {
    if (
      !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/g.test(
        email
      ) &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(password)
    ) {
      setError(true);
    }

    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
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
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
      {error && <p>Email or Password invalid</p>}
      <Button variant="primary" size="lg" onClick={createAccount}>
        Create Account
      </Button>
    </Form>
  );
};