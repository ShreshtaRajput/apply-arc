"use client";

import { useState, useEffect, Suspense } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

type Mode = "signin" | "signup";

function FlashMessage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  if (!errorMessage) return null;

  return (
    <div className="mb-6 p-3 text-sm text-red-400 bg-red-400/10 rounded-lg border border-red-400/20 text-center">
      {errorMessage}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Send to board
  useEffect(() => {
    if (!loading && user) router.push("/board");
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/board");
    } catch (err: any) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/board");
    } catch (err: any) {
      setError("GitHub sign-in failed. Please try again.");
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/board");
    } catch (err: any) {
      setError(getFriendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#0C0C14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold tracking-tight">
            ApplyArc
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Track every app. Land your role.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#12121F] border border-white/8 rounded-2xl p-6">
          <Suspense fallback={null}>
            <FlashMessage />
          </Suspense>
          {/* Mode toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 mb-6">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  mode === m
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-4"
          >
            <span className="text-[#4285F4] font-bold text-base leading-none">
              G
            </span>
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-4"
          >
            <span className="text-[#4285F4] font-bold text-base leading-none">
              GH
            </span>
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/25 transition-colors"
            />
            <input
              type="password"
              placeholder={mode === "signup" ? "Create a password" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/25 transition-colors"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#FF5533] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
            >
              {submitting
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// Maps Firebase error codes to human-readable messages
function getFriendlyError(code: string): string {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}
