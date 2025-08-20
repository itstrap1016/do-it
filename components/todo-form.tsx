"use client";

import { useState } from "react";
import { useTodos } from "@/app/hooks/useTodos";
import Button from "./button";

export default function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo, loading, todos } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    try {
      await addTodo({ name: inputValue.trim() });
      setInputValue("");
    } catch (err) {
      alert(`${err}`);
    }
  };

  return (
    <form className="py-6 pb-10 flex gap-4" onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={loading.adding}
        className="w-full h-13 rounded-full bg-slate-100 px-6 text-slate-500 placeholder-slate-400 custom-shadow max-w-[1016px]"
        placeholder="할 일을 입력해주세요"
      ></input>
      <Button
        text={"추가하기"}
        disabled={loading.adding}
        loading={loading.adding}
        bgColor={todos.length > 0 ? "bg-slate-200" : "bg-violet-600"}
        textColor={todos.length > 0 ? "text-slate-900" : "text-white"}
      />
    </form>
  );
}
