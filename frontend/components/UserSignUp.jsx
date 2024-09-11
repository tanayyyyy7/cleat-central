import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "./AuthContext";

export default function UserSignUp() {

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const { login } = useAuth();
  const navigate = useNavigate(); 



  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); 

    try {
      // Make an HTTP request to the signup API endpoint
      const response = await fetch('/api/signup-user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        console.log(token);
        login(token); // Authenticate the user with the returned token
        navigate('/products-page-02'); // Redirect after successful signup
      } else {
        const { error } = await response.json();
        setError(error.message);
      }
    } catch (error) {
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input 
                id="first-name" 
                placeholder="Max" 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input 
                id="last-name" 
                placeholder="Robinson" 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <AiOutlineLoading className="animate-spin" /> : "Create an account"}
          </Button>
          {/* Remove or adjust the GitHub button as needed */}
          {/* <GoogleSignIn
          onLoginSuccess={(user) => {
            console.log("Google User signed in:", user);
          }} /> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/user-auth" className="underline">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
