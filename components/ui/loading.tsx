export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 text-sm text-slate-500 w-full"
    >
      <span>로딩중...</span>
      <span role="img" aria-label="sand-clock">
        ⌛
      </span>
    </div>
  );
}
