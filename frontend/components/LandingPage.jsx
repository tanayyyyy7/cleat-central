import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import NavMenuBar from "./NavMenuBar";
export default function LandingPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    // setIsSignedIn(!isSignedIn);
    navigate("/user-auth");
  };

  const ctaEmail = (email) => {
    if (email) {
      navigate("/dashboard");
      // setIsSignedIn(true);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavMenuBar />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-forground">
                  {/* Welcome to our platform! */}
                  Welcome to QPAS
                </h1>
                <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                  Get access to your institution's previous
                  <br />
                  question papers at one place.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mx-auto">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" onClick={ctaEmail}>
                    Start Now
                  </Button>
                </form>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Start your preparation today.
                  {/* <a className="underline underline-offset-2" href="#" prefetch={false}>
                  Terms & Conditions
                </a> */}
                </p>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-bottom sm:w-full lg:order-last"
              height="310"
              src="assets/qpas-illustration.svg"
              width="550"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
