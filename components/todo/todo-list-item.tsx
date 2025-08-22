"use client";

import { useState } from "react";
import Link from "next/link";
import { TodoItem } from "@/app/lib/api";

interface TodoListItemProps {
  item: TodoItem;
  onToggleComplete: (id: number, isCompleted: boolean) => Promise<boolean>;
}

export default function TodoListItem({
  item,
  onToggleComplete,
}: TodoListItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await onToggleComplete(item.id, !item.isCompleted);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li>
      <Link
        href={`/detail/${item.id}`}
        className={`relative flex items-center gap-4 border-2 border-slate-900 rounded-3xl py-2 px-3 ${
          item.isCompleted ? "bg-violet-100" : "bg-white"
        }`}
      >
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`check-btn ${
            item.isCompleted ? "" : "border-2 border-slate-900 bg-yellow-50"
          } ${isUpdating ? "opacity-50" : ""}`}
          aria-label={item.isCompleted ? "완료 취소하기" : "완료하기"}
        >
          {item.isCompleted && (
            <div className="bg-[url('/active/check.svg')] w-8 h-8 bg-no-repeat bg-center" />
          )}
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
        <span
          className={`${item.isCompleted ? "line-through text-slate-500" : ""}`}
        >
          {item.name}
        </span>
      </Link>
    </li>
  );
}
