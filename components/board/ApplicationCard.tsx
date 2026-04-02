"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Application } from "@/types";
import { useState } from "react";
import ApplicationModal from "../modals/ApplicationModal";

interface Props {
  application: Application;
  // onClick: (id: string) => void;
}

export default function ApplicationCard({ application }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // useSortable gives us everything needed to make this card
  // both draggable AND droppable within a column
  const {
    attributes, // accessibility attributes (role, aria-*)
    listeners, // event handlers (onMouseDown, onTouchStart, etc.)
    setNodeRef, // ref to attach to the DOM element
    transform, // current x/y offset while dragging
    transition, // CSS transition string for smooth snap-back
    isDragging, // true while this card is being dragged
  } = useSortable({ id: application._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1, // ghost effect while dragging
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleCardClick = () => {
    if (!isDragging) {
      setIsOpen(true);
      // onClick(application._id);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={handleCardClick}
        className="bg-[#1C1C2E] border border-white/7 rounded-xl p-3 mb-2 hover:border-white/15 transition-colors select-none"
      >
        <p className="text-white text-sm font-medium leading-snug">
          {application.company}
        </p>
        <p className="text-white/40 text-xs mt-0.5">{application.role}</p>

        {/* Optional tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {application.deadline && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400">
              Due {new Date(application.deadline).toLocaleDateString()}
            </span>
          )}
          {application.salary && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-500/15 text-green-400">
              {application.salary}
            </span>
          )}
        </div>
      </div>

      {/* 3. Render the placeholder ApplicationModal */}
      {isOpen && (
        <ApplicationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          application={application}
        />
      )}
    </>
  );
}
