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
      {/* Board */}
      <BoardContainer />
    </div>
  );
}
