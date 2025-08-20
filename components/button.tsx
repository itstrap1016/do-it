interface ButtonProps {
  text: string;
  loading: boolean;
  disabled: boolean;
  bgColor: string;
  textColor: string;
}

export default function Button({
  text,
  loading,
  disabled,
  bgColor,
  textColor,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-1 w-[168px] h-[52px] custom-shadow rounded-2xl justify-center ${bgColor}`}
      disabled={disabled}
    >
      {text === "추가하기" &&
        bgColor === "bg-violet-600" &&
        textColor === "text-white" && (
          <span className="bg-[url('/white-plus.svg')] btn-image"></span>
        )}
      {text === "추가하기" &&
        bgColor === "bg-slate-200" &&
        textColor === "text-slate-900" && (
          <span className="bg-[url('/navy-plus.svg')] btn-image"></span>
        )}
      <span className={`font-bold ${textColor}`}>
        {loading ? `${text} 요청중` : text}
      </span>
    </button>
  );
}
