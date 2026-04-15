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
import { motion, AnimatePresence } from "framer-motion";
import { c, g1box } from "@/lib/theme";

type Mode = "signin" | "signup";

function FlashMessage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  if (!errorMessage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-3 text-sm text-red-400 rounded-xl text-center font-medium shadow-lg"
      style={{ background: `${c.rose}15`, border: `1px solid ${c.rose}30` }}
    >
      {errorMessage}
    </motion.div>
  );
}

// Reusable SVG Components for clean markup
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

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
    <main
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden selection:bg-indigo-500/30"
      style={{ background: c.bg0 }}
    >
      {/* Ambient Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: c.indigo }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: c.emerald }}
      />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-[24px] p-8 shadow-2xl"
          style={{ ...g1box }}
        >
          {/* Internal Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight"
              style={{ color: c.t1 }}
            >
              ApplyArc
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm mt-2 font-medium"
              style={{ color: c.t3 }}
            >
              Track every app. Land your role.
            </motion.p>
          </div>

          <Suspense fallback={null}>
            <FlashMessage />
          </Suspense>

          {/* Animated Mode Toggle */}
          <div
            className="relative flex p-1.5 rounded-xl mb-6"
            style={{ background: c.b1 }}
          >
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className="relative flex-1 py-2 text-sm font-bold z-10 transition-colors"
                style={{ color: mode === m ? c.t1 : c.t3 }}
              >
                {m === "signin" ? "Sign In" : "Create Account"}
                {mode === m && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute inset-0 rounded-lg -z-10 shadow-sm"
                    style={{ background: c.g2, border: `1px solid ${c.b2}` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2"
                style={
                  {
                    background: c.g1,
                    color: c.t1,
                    border: `1px solid ${c.b1}`,
                    "--tw-ring-color": `${c.indigo}80`,
                  } as React.CSSProperties
                }
              />
              <input
                type="password"
                placeholder={
                  mode === "signup" ? "Create a secure password" : "Password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2"
                style={
                  {
                    background: c.g1,
                    color: c.t1,
                    border: `1px solid ${c.b1}`,
                    "--tw-ring-color": `${c.indigo}80`,
                  } as React.CSSProperties
                }
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs font-medium text-center"
                  style={{ color: c.rose }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mt-2 shadow-lg"
              style={{
                background: mode === "signin" ? c.indigo : c.emerald,
                color: "#ffffff",
              }}
            >
              {submitting
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: c.b1 }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: c.t3 }}
            >
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ background: c.b1 }} />
          </div>

          {/* Social Auth Providers */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="group flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: c.g1,
                border: `1px solid ${c.b1}`,
                color: c.t1,
              }}
            >
              <GoogleIcon />
              Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="group flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: c.g1,
                border: `1px solid ${c.b1}`,
                color: c.t1,
              }}
            >
              <GithubIcon />
              GitHub
            </button>
          </div>
        </motion.div>
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

// "use client";

// import { useState, useEffect, Suspense } from "react";
// import {
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { auth, googleProvider, githubProvider } from "@/lib/firebase";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/lib/AuthContext";

// type Mode = "signin" | "signup";

// function FlashMessage() {
//   const searchParams = useSearchParams();
//   const errorMessage = searchParams.get("error");

//   if (!errorMessage) return null;

//   return (
//     <div className="mb-6 p-3 text-sm text-red-400 bg-red-400/10 rounded-lg border border-red-400/20 text-center">
//       {errorMessage}
//     </div>
//   );
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   const [mode, setMode] = useState<Mode>("signin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Already logged in? Send to board
//   useEffect(() => {
//     if (!loading && user) router.push("/board");
//   }, [user, loading, router]);

//   const handleGoogleSignIn = async () => {
//     setError("");
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push("/board");
//     } catch (err: any) {
//       setError("Google sign-in failed. Please try again.");
//     }
//   };

//   const handleGithubSignIn = async () => {
//     setError("");
//     try {
//       await signInWithPopup(auth, githubProvider);
//       router.push("/board");
//     } catch (err: any) {
//       setError("GitHub sign-in failed. Please try again.");
//     }
//   };

//   const handleEmailAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     try {
//       if (mode === "signup") {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       router.push("/board");
//     } catch (err: any) {
//       setError(getFriendlyError(err.code));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return null;

//   return (
//     <main className="min-h-screen bg-[#0C0C14] flex items-center justify-center px-4">
//       <div className="w-full max-w-sm">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <h1 className="text-white text-2xl font-bold tracking-tight">
//             ApplyArc
//           </h1>
//           <p className="text-white/40 text-sm mt-1">
//             Track every app. Land your role.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-[#12121F] border border-white/8 rounded-2xl p-6">
//           <Suspense fallback={null}>
//             <FlashMessage />
//           </Suspense>
//           {/* Mode toggle */}
//           <div className="flex bg-white/5 rounded-lg p-1 mb-6">
//             {(["signin", "signup"] as Mode[]).map((m) => (
//               <button
//                 key={m}
//                 onClick={() => {
//                   setMode(m);
//                   setError("");
//                 }}
//                 className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
//                   mode === m
//                     ? "bg-white/10 text-white"
//                     : "text-white/40 hover:text-white/60"
//                 }`}
//               >
//                 {m === "signin" ? "Sign in" : "Sign up"}
//               </button>
//             ))}
//           </div>

//           {/* Google */}
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-4"
//           >
//             <span className="text-[#4285F4] font-bold text-base leading-none">
//               G
//             </span>
//             Continue with Google
//           </button>

//           {/* GitHub */}
//           <button
//             onClick={handleGithubSignIn}
//             className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-4"
//           >
//             <span className="text-[#4285F4] font-bold text-base leading-none">
//               GH
//             </span>
//             Continue with GitHub
//           </button>

//           {/* Divider */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="flex-1 h-px bg-white/8" />
//             <span className="text-white/25 text-xs">or</span>
//             <div className="flex-1 h-px bg-white/8" />
//           </div>

//           {/* Email/password form */}
//           <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/25 transition-colors"
//             />
//             <input
//               type="password"
//               placeholder={mode === "signup" ? "Create a password" : "Password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               className="bg-white/5 border border-white/10 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-white/25 transition-colors"
//             />

//             {error && (
//               <p className="text-red-400 text-xs text-center">{error}</p>
//             )}

//             <button
//               type="submit"
//               disabled={submitting}
//               className="bg-[#FF5533] text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
//             >
//               {submitting
//                 ? "Please wait..."
//                 : mode === "signin"
//                   ? "Sign in"
//                   : "Create account"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }

// // Maps Firebase error codes to human-readable messages
// function getFriendlyError(code: string): string {
//   switch (code) {
//     case "auth/user-not-found":
//     case "auth/wrong-password":
//     case "auth/invalid-credential":
//       return "Invalid email or password.";
//     case "auth/email-already-in-use":
//       return "An account with this email already exists.";
//     case "auth/weak-password":
//       return "Password must be at least 6 characters.";
//     case "auth/invalid-email":
//       return "Please enter a valid email address.";
//     case "auth/too-many-requests":
//       return "Too many attempts. Please try again later.";
//     default:
//       return "Something went wrong. Please try again.";
//   }
// }
