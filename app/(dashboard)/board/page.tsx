"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchApplications,
  selectBoardStatus,
} from "@/store/slices/boardSlice";

export default function BoardPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectBoardStatus);

  useEffect(() => {
    if (user) dispatch(fetchApplications(user.uid));
  }, [user, dispatch]);

  return (
    <main className="min-h-screen bg-[#0C0C14] text-white flex items-center justify-center">
      <p>Board status: {status}</p>
    </main>
  );
}
