import { io } from "socket.io-client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  remoteAddApplication,
  remoteUpdateApplication,
  remoteDeleteApplication,
} from "@/store/slices/boardSlice";

import type { Application } from "@/types";

interface BoardUpdatedPayload {
  type: "create" | "update" | "delete";
  application: Application | string;
}

export const useSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io();

    socket.on("board:updated", (payload: BoardUpdatedPayload) => {
      switch (payload.type) {
        case "create":
          dispatch(remoteAddApplication(payload.application as Application));
          break;

        case "update": {
          dispatch(remoteUpdateApplication(payload.application as Application));
          break;
        }

        case "delete": {
          const idToDelete =
            typeof payload.application === "string"
              ? payload.application
              : payload.application._id;
          dispatch(remoteDeleteApplication(idToDelete));
          break;
        }

        default:
          console.warn("Unknown socket event type:", payload);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
};
