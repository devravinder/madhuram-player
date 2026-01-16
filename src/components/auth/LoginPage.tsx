import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AvatarContainer, Img } from "../Elements";
import { Google } from "../icons/Google";

export function LoginPage() {
  const { loginWithPopup: login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);
    try {
      await login();
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
      <div className="w-full py-20 max-w-sm flex flex-col gap-8 bg-card rounded-2xl border border-border hover:border-border/80 transition-all duration-300 p-6 shadow-xl">
        {/* Logo */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <AvatarContainer className="w-20 h-20 p-1 shadow-lg">
            <Img src="/favicon.svg" alt="Logo" />
          </AvatarContainer>
          <h1 className="text-3xl font-bold">Madhuram</h1>
          <p className="text-muted-foreground">Only Music • No Ads</p>
        </div>

        {/* Login Form */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
           onClick={handleLogin}
          className="bg-accent cursor-pointer rounded-lg p-2 w-full flex flex-row gap-2 items-center justify-center"
          disabled={isLoading}
        >
          <Google className="h-5 w-5" /> {isLoading ? <span>Loggin in with google</span> : <span>Loginin with google</span>}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Enjoy uninterrupted music
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
