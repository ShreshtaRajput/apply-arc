"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchApplications,
  selectBoardStatus,
} from "@/store/slices/boardSlice";
import BoardContainer from "@/components/board/BoardContainer";

export default function BoardPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBoardStatus);

  useEffect(() => {
    if (user) dispatch(fetchApplications(user.uid));
  }, [user, dispatch]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0C0C14] flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading your board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C14]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF5533] flex items-center justify-center">
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
              <path
                d="M2 9 Q6 2 10 9"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm">ApplyArc</span>
        </div>
        <p className="text-white/30 text-xs">{user?.email}</p>
      </nav>

      {/* Board */}
      <BoardContainer />
    </div>
  );
}
