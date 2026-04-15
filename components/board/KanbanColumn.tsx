"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Application, Stage, STAGE_LABELS } from "@/types";
import ApplicationCard from "./ApplicationCard";
import AddCardForm from "./AddCardForm";

interface Props {
  stage: Stage;
  applications: Application[];
  onCardClick: (id: string) => void;
  onAddCard: (company: string, role: string, stage: Stage) => void;
}

// Colour columns based on the stage
const STAGE_COLORS: Record<Stage, string> = {
  saved: "bg-white/30",
  applied: "bg-blue-400",
  oa: "bg-amber-400",
  interview: "bg-purple-400",
  offer: "bg-green-400",
  rejected: "bg-red-400",
};

export default function KanbanColumn({
  stage,
  applications,
  onCardClick,
  onAddCard,
}: Props) {
  // useDroppable marks this column as a valid drop target.
  // When a card is dragged over this column, @dnd-kit knows to
  // use this as the destination.
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div className="shrink-0 w-[85vw] md:w-[320px] snap-center md:snap-align-none flex flex-col flex w-64 flex-shrink-0">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${STAGE_COLORS[stage]}`} />
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
            {STAGE_LABELS[stage]}
          </span>
        </div>
        <span className="text-white/25 text-xs">{applications.length}</span>
      </div>

      {/* Cards container */}
      {/* SortableContext tells @dnd-kit which items live in this column
          and in what order — used to calculate drop positions */}
      <SortableContext
        items={applications.map((a) => a._id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`flex-1 min-h-24 rounded-xl p-2 transition-colors ${
            isOver ? "bg-white/5" : "bg-white/[0.02]"
          }`}
        >
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}

          <AddCardForm
            stage={stage}
            onAdd={(company, role) => onAddCard(company, role, stage)}
          />
        </div>
      </SortableContext>
    </div>
  );
}
