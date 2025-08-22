"use client";

import Image from "next/image";

interface DetailCheckProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (name: string) => void;
  onCompletedChange: (isCompleted: boolean) => void;
}

export default function DetailCheck({
  name,
  isCompleted,
  onNameChange,
  onCompletedChange,
}: DetailCheckProps) {
  return (
    <section
      className={`h-[64px] rounded-3xl border-2 border-slate-900 flex justify-center items-center ${
        isCompleted ? "bg-violet-200" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <div>
          <input
            type="checkbox"
            id="todo-check"
            checked={isCompleted}
            onChange={() => onCompletedChange(!isCompleted)}
            className="sr-only"
          />
          <label
            htmlFor="todo-check"
            className={`check-btn ${
              isCompleted ? "" : "border-2 border-slate-900 bg-yellow-50"
            }`}
          >
            {isCompleted && (
              <Image
                src="/active/check.svg"
                alt="check"
                width={32}
                height={32}
              />
            )}
          </label>
        </div>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="text-xl font-bold text-slate-900 underline text-center w-[300px] max-md:w-[150px]"
        />
      </div>
    </section>
  );
}
