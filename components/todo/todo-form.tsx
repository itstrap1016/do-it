"use client";

import { useState } from "react";
import Button from "../ui/button";

interface TodoFormProps {
  onSubmit: (value: string) => Promise<boolean>; // Promise<boolean> 유지
  isLoading: boolean;
}

export default function TodoForm({ onSubmit, isLoading }: TodoFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const success = await onSubmit(inputValue);
    if (success) {
      setInputValue("");
    }
  };

  return (
    <form
      className="py-6 pb-10 flex gap-4 max-sm:gap-2 max-sm:pt-4 max-sm:pb-6"
      onSubmit={handleSubmit}
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading} // loading.adding -> isLoading 수정
        className="w-full h-13 rounded-full bg-slate-100 px-6 text-slate-500 placeholder-slate-400 custom-shadow max-w-[1016px]"
        placeholder="할 일을 입력해주세요"
      />
      <Button
        text="추가하기"
        disabled={isLoading || !inputValue.trim()} // 수정
        loading={isLoading}
        bgColor={isLoading ? "bg-slate-200" : "bg-violet-600"} // 수정
        textColor={isLoading ? "text-slate-900" : "text-white"} // 수정
      />
    </form>
  );
}
