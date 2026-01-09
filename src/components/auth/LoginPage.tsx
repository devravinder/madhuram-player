import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { AvatarContainer, Img, Input } from "../Elements";

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Logo */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <AvatarContainer className="w-20 h-20 p-1 shadow-lg">
            <Img src="/favicon.svg" alt="Logo" />
          </AvatarContainer>
          <h1 className="text-3xl font-bold">Madhuram</h1>
          <p className="text-muted-foreground">
            Your offline music player
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl border border-border hover:border-border/80 transition-all duration-300 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="input-field"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              className="bg-accent cursor-pointer rounded-lg p-2 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Demo: Enter any email and password
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Offline music player • No account required
        </p>
      </div>
    </div>
  );
}
