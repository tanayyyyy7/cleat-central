import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "../../context/AuthContext"
import { Loader2, User, Mail, Lock } from "lucide-react"

export default function UserSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      })

      if (response.ok) {
        const { user, token } = await response.json()
        login(token)
        navigate('/products-page')
      } else {
        const { error } = await response.json()
        setError(error.message)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50 backdrop-blur-[1px] flex items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <div className="relative">
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <div className="relative">
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login-user" className="underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}