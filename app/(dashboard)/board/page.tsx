"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchApplications,
  selectBoardStatus,
} from "@/store/slices/boardSlice";
import BoardContainer from "@/components/board/BoardContainer";
import { c, displayFont } from "@/lib/theme";

export default function BoardPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBoardStatus);
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Next.js hydration errors by waiting for the client to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Fetch data ONLY when the status is idle to prevent infinite dispatch loops
  useEffect(() => {
    if (user && status === "idle") {
      dispatch(fetchApplications(user.uid));
    }
  }, [user, dispatch, status]);

  // 3. Shield the DND context from rendering before data and browser are ready
  if (!mounted || !user || status === "loading" || status === "idle") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: c.bg0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          className="w-10 h-10 rounded-full animate-spin border-2"
          style={{
            borderColor: `${c.indigo}30`,
            borderTopColor: c.indigo,
          }}
        />
        <p
          style={{
            ...displayFont,
            color: c.t3,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Connecting to board...
        </p>
      </div>
    );
  }

  // Handle API failure gracefully
  if (status === "failed") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: c.bg0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: c.rose, fontSize: "14px" }}>
          Failed to load applications. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: c.bg0 }}>
      <BoardContainer />
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useAuth } from "@/lib/AuthContext";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//   fetchApplications,
//   selectBoardStatus,
// } from "@/store/slices/boardSlice";
// import BoardContainer from "@/components/board/BoardContainer";
// import { c } from "@/lib/theme";

// export default function BoardPage() {
//   const { user } = useAuth();
//   const dispatch = useAppDispatch();
//   const status = useAppSelector(selectBoardStatus);

//   useEffect(() => {
//     if (user) dispatch(fetchApplications(user.uid));
//   }, [user, dispatch]);

//   if (status === "loading") {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: c.bg0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <p className="text-white/30 text-sm">Loading your board...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: c.bg0 }}>
//       {/* Board */}
//       <BoardContainer />
//     </div>
//   );
// }
