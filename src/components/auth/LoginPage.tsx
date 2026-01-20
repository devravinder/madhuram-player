import { useAuth } from "@/context/AuthContext";
import { Music } from "lucide-react";
import React, { useState } from "react";
import { AvatarContainer, Img, MobileContainer, MobileLayout } from "../Elements";
import { Google } from "../icons/Google";

export function LoginPage() {
  const { loginWithPopup: login, demoLogin } = useAuth();
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
    <MobileLayout>
      <MobileContainer>
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
        <button
           onClick={demoLogin}
          className="bg-accent cursor-pointer rounded-lg p-2 w-full flex flex-row gap-2 items-center justify-center"
          disabled={isLoading}
        >
          <Music className="h-5 w-5" /> {isLoading ? <span>Logging in</span> : <span>Just try without login</span>}
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Enjoy uninterrupted music
        </p>
      </MobileContainer>
    </MobileLayout>
  );
}

export default LoginPage;
