import React, { useState } from "react";
import { cn } from "@/lib/utils";
// import Icons from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleSignIn from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
// Import useNavigate
import { AiOutlineLoading } from "react-icons/ai";
import { app } from "../firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from './AuthContext';

const auth = getAuth(app);

export default function UserLogin({ ...props }) {
  const { setUid } = useAuth(); // Get setUid from useAuth hook
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    console.log(email);
    console.log(password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store UID in context
      setUid(user.uid);
      // Redirect to home page after successful login
      navigate("/teacher-dashboard");
      console.log("User logged in:", user);
    } catch (error) {
      // Handle specific Firebase errors for better user feedback
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {/* Start of the form */}
            <div className="grid gap-4">
              {/* Display error message */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && <div className="text-red-500">Error: {error}</div>}{" "}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
              <div className="relative flex justify-center text-xs uppercase">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <span className="bg-background px-2 text-muted-foreground z-10">
                  Or continue with
                </span>
              </div>
              <GoogleSignIn
                onLoginSuccess={(user) => {
                  // Handle Google sign-in success (e.g., redirect)
                  console.log("Google User signed in:", user);
                  navigate("/student-dashboard");
                }}
              />
            </div>{" "}
            {/* End of the grid gap-4 div */}
          </form>{" "}
          {/* End of the form */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/user-signup" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="assets/placeholder.svg"
          alt="img"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
