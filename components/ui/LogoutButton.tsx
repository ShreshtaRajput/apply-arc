"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { resetBoard } from "@/store/slices/boardSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "./button";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth); // 1. Firebase signout
    dispatch(resetBoard()); // 2. Clear Redux
    router.push("/login"); // 3. Redirect
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
