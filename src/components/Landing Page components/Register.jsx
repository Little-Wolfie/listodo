import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(auth?.currentUser?.email)
    const CreateAccount = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    return (
        <div>
            <input placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}>
            </input>
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}>
            </input>
            <button onClick={CreateAccount}>
                Create Account
            </button>
        </div>
    )
}

