"use client";

interface MemoProps {
  memo: string;
  onMemoChange: (memo: string) => void;
}

export default function Memo({ memo, onMemoChange }: MemoProps) {
  return (
    <section className="w-[588px] h-[311px] rounded-3xl p-6 bg-[url('/memo.png')] bg-no-repeat bg-center bg-cover">
      <h3 className="text-center font-extrabold text-amber-800 mb-4">Memo</h3>
      <textarea
        value={memo}
        onChange={(e) => onMemoChange(e.target.value)}
        placeholder="메모를 입력해주세요..."
        className="w-full text-slate-800 placeholder:text-slate-800 h-[calc(100%-40px)] bg-transparent resize-none"
      />
    </section>
  );
}
