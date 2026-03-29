"use client";

import { useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAuth } from "@/lib/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectByStage,
  moveApplication,
  addApplication,
  updateApplication,
} from "@/store/slices/boardSlice";
import { Stage, STAGES, Application } from "@/types";
import KanbanColumn from "./KanbanColumn";

export default function BoardContainer() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  // dnd-kit will acitvate a dragging event as soon as the card is clicked
  // adding an activation constraint (drag 8px before it counts as a drag) makes it possible to click cards without accidentally dragging them
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  // We call useAppSelector once per stage — each column only
  // re-renders when its own applications change
  const savedApps = useAppSelector(selectByStage("saved"));
  const appliedApps = useAppSelector(selectByStage("applied"));
  const oaApps = useAppSelector(selectByStage("oa"));
  const interviewApps = useAppSelector(selectByStage("interview"));
  const offerApps = useAppSelector(selectByStage("offer"));
  const rejectedApps = useAppSelector(selectByStage("rejected"));

  const columnMap: Record<Stage, Application[]> = {
    saved: savedApps,
    applied: appliedApps,
    oa: oaApps,
    interview: interviewApps,
    offer: offerApps,
    rejected: rejectedApps,
  };

  // Called when a card is dropped
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !user) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      // Figure out which stage the card was dragged FROM
      const sourceStage = STAGES.find((s) =>
        columnMap[s].some((a) => a._id === activeId),
      );

      // Figure out which stage it was dropped INTO
      // overId could be either a stage name (dropped on empty column)
      // or another card's _id (dropped between cards)
      const targetStage = (
        STAGES.includes(overId as Stage)
          ? overId
          : STAGES.find((s) => columnMap[s].some((a) => a._id === overId))
      ) as Stage | undefined;

      if (!sourceStage || !targetStage) return;

      const targetApps = columnMap[targetStage];
      const overIndex = targetApps.findIndex((a) => a._id === overId);
      const newOrder = overIndex >= 0 ? overIndex : targetApps.length;

      // 1. Instant UI update - redux updates
      dispatch(
        moveApplication({ id: activeId, stage: targetStage, order: newOrder }),
      );

      // 2. Make changes in mongoDB in the background
      dispatch(
        updateApplication({
          uid: user.uid,
          id: activeId,
          updates: { stage: targetStage, order: newOrder },
        }),
      );
    },
    [user, dispatch, columnMap],
  );

  const handleAddCard = useCallback(
    (company: string, role: string, stage: Stage) => {
      if (!user) return;
      dispatch(addApplication({ uid: user.uid, company, role, stage }));
    },
    [user, dispatch],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 p-6 overflow-x-auto min-h-screen">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            applications={columnMap[stage]}
            onCardClick={(id) => console.log("clicked", id)} // → modal in Week 2
            onAddCard={handleAddCard}
          />
        ))}
      </div>
    </DndContext>
  );
}
