"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
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
import { useSocket } from "@/hooks/useSocket";
import { motion, AnimatePresence } from "framer-motion";
import { c, g1box } from "@/lib/theme";
import { ChevronLeft } from "lucide-react";

// Configuration for the Mobile Grid styling
const stageConfig: Record<Stage, { label: string; color: string }> = {
  saved: { label: "Saved", color: "#94a3b8" },
  applied: { label: "Applied", color: "#60a5fa" },
  oa: { label: "OA", color: "#c084fc" },
  interview: { label: "Interview", color: "#fbbf24" },
  offer: { label: "Offer", color: "#34d399" },
  rejected: { label: "Rejected", color: "#f87171" },
};

export default function BoardContainer() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  useSocket();

  // Responsive State Management
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeStage, setActiveStage] = useState<Stage | null>(null);

  // Hydration & Window Resize listener
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !user) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const sourceStage = STAGES.find((s) =>
        columnMap[s].some((a) => a._id === activeId),
      );

      const targetStage = (
        STAGES.includes(overId as Stage)
          ? overId
          : STAGES.find((s) => columnMap[s].some((a) => a._id === overId))
      ) as Stage | undefined;

      if (!sourceStage || !targetStage) return;

      const targetApps = columnMap[targetStage];
      const overIndex = targetApps.findIndex((a) => a._id === overId);
      const newOrder = overIndex >= 0 ? overIndex : targetApps.length;

      dispatch(
        moveApplication({ id: activeId, stage: targetStage, order: newOrder }),
      );

      dispatch(
        updateApplication({
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
      dispatch(addApplication({ company, role, stage }));
    },
    [user, dispatch],
  );

  // Prevent hydration mismatch
  if (!mounted) return <div className="min-h-screen bg-[#0C0C14]" />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      {!isMobile ? (
        /* ============================ */
        /* DESKTOP VIEW: Standard Board */
        /* ============================ */
        <div className="flex gap-5 p-6 overflow-x-auto theme-scrollbar min-h-screen">
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              applications={columnMap[stage]}
              onCardClick={(id) => console.log("clicked", id)}
              onAddCard={handleAddCard}
            />
          ))}
        </div>
      ) : (
        /* ============================ */
        /* MOBILE VIEW: Stage Grid UX   */
        /* ============================ */
        <div className="p-5 min-h-screen pb-24 relative">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
              Pipeline
            </h1>
            <p className="text-sm text-white/50">
              Tap a stage to manage applications
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STAGES.map((stage) => {
              const apps = columnMap[stage];
              const config = stageConfig[stage];

              return (
                <motion.div
                  key={stage}
                  layoutId={`stage-card-${stage}`}
                  onClick={() => setActiveStage(stage)}
                  whileTap={{ scale: 0.96 }}
                  className="p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[140px] cursor-pointer shadow-lg"
                  style={{ ...g1box }}
                >
                  {/* Subtle corner glow */}
                  <div
                    className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-[30px] opacity-20 pointer-events-none"
                    style={{ background: config.color }}
                  />

                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: config.color,
                        boxShadow: `0 0 10px ${config.color}`,
                      }}
                    />
                    <span className="font-heading font-bold text-sm text-white/80 uppercase tracking-wide">
                      {config.label}
                    </span>
                  </div>

                  <div>
                    <span className="text-4xl font-extrabold font-heading text-white">
                      {apps.length}
                    </span>
                    <span className="text-xs text-white/40 block mt-1 font-medium">
                      Applications
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* ================================== */}
          /* MOBILE VIEW: Expanded Stage Overlay */
          {/* ================================== */}
          <AnimatePresence>
            {activeStage && (
              <motion.div
                layoutId={`stage-card-${activeStage}`}
                className="fixed inset-0 z-50 bg-[#0C0C14] flex flex-col overflow-hidden"
              >
                {/* Fixed Header */}
                <div
                  className="px-4 py-4 flex items-center justify-between border-b shrink-0 z-20"
                  style={{ background: c.g1, borderColor: c.b1 }}
                >
                  <button
                    onClick={() => setActiveStage(null)}
                    className="flex items-center gap-1 text-sm font-bold text-white/70 active:text-white transition-colors"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: c.t1 }}
                  >
                    {stageConfig[activeStage].label}
                  </span>
                  <div className="w-16" /> {/* Spacer for centering */}
                </div>

                {/* The Kanban Column (Forced to take full width via CSS override) */}
                <div className="flex-1 overflow-y-auto theme-scrollbar p-5 flex justify-center [&>div]:w-full [&>div]:max-w-md">
                  <KanbanColumn
                    stage={activeStage}
                    applications={columnMap[activeStage]}
                    onCardClick={(id) => console.log("clicked", id)}
                    onAddCard={handleAddCard}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </DndContext>
  );
}
