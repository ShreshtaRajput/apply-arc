"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?error=Please+login+first");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020209]">
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020209] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import LogoutButton from "@/components/ui/LogoutButton";
// import { useAuth } from "@/lib/AuthContext";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     // Listen for changes in the user's authentication state
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         // If no user is found, boot them to the login page
//         router.push("/login?error=Please+login+first");
//       } else {
//         // If a user is found, stop loading and show the page
//         setIsLoading(false);
//       }
//     });

//     // Cleanup the listener when the component unmounts
//     return () => unsubscribe();
//   }, [router]);

//   // Prevent the protected content from flashing before the redirect happens
//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p>Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-layout">
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0C0C14]">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 rounded-full bg-[#FF5533] flex items-center justify-center">
//             <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
//               <path
//                 d="M2 9 Q6 2 10 9"
//                 stroke="white"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </div>
//           <span className="text-white font-semibold text-sm">ApplyArc</span>
//         </div>
//         <LogoutButton />
//         <p className="text-white/30 text-xs">{user?.email}</p>
//       </nav>
//       {children}
//     </div>
//   );
// }
