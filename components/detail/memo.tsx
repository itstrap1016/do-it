// 기존의 memo.tsx를 detail 폴더로 이동
"use client";

import { useState } from "react";

interface MemoProps {
  memo: string;
  onMemoChange: (memo: string) => void;
}

export default function Memo({ memo, onMemoChange }: MemoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMemo, setTempMemo] = useState(memo);

  const handleBlur = () => {
    setIsEditing(false);
    onMemoChange(tempMemo);
  };

  return (
    <section className="w-[588px] h-[311px] rounded-3xl relative bg-[url('/active/memo.png')] bg-no-repeat bg-cover bg-center p-6 relative">
      <h3 className="text-center text-amber-800 font-bold mb-4">Memo</h3>
      {isEditing ? (
        <textarea
          value={tempMemo}
          onChange={(e) => setTempMemo(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="memo-textarea"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="rounded-xl p-6 text-slate-800 cursor-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate w-full text-center"
        >
          {tempMemo || "메모를 입력해 주세요."}
        </div>
      )}
    </section>
  );
}
