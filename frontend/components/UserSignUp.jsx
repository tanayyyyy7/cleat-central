
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { app } from "../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from './AuthContext';

const auth = getAuth(app);

export default function UserSignUp() {
  const { setUid } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  async function onSubmit
(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); 

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUid(user.uid);
      navigate('/teacher-dashboard'); // Redirect after successful signup
    } catch (error) {
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>} 
      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id
="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <AiOutlineLoading className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
      <p>Or sign up with Google:</p>
      <GoogleSignIn
                onLoginSuccess={(user) => {
                  // Handle Google sign-in success (e.g., redirect)
                  console.log("Google User signed in:", user);
                  navigate("/student-dashboard");
                }}
              />
    </div>
  );
}
