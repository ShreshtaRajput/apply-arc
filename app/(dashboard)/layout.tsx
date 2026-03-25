"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is found, boot them to the login page
        router.push("/login?error=Please+login+first");
      } else {
        // If a user is found, stop loading and show the page
        setIsLoading(false);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router]);

  // Prevent the protected content from flashing before the redirect happens
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <div className="dashboard-layout">{children}</div>;
}
