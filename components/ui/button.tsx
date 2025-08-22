interface ButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  bgColor: string;
  textColor: string;
  onClick?: () => Promise<void>;
}

export default function Button({
  text,
  loading,
  disabled,
  bgColor,
  textColor,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`flex flex-shrink-0 items-center gap-1 w-[168px] h-[52px] custom-shadow rounded-full justify-center ${bgColor} ${
        text === "추가하기" && "max-sm:w-13 max-sm:h-13"
      }`}
      disabled={disabled}
      onClick={onClick ? onClick : () => {}}
    >
      {text === "추가하기" &&
        bgColor === "bg-violet-600" &&
        textColor === "text-white" && (
          <span className="bg-[url('/active/white-plus.svg')] btn-image"></span>
        )}
      {text === "추가하기" &&
        bgColor === "bg-slate-200" &&
        textColor === "text-slate-900" && (
          <span className="bg-[url('/active/navy-plus.svg')] btn-image"></span>
        )}
      {text === "수정 완료" && (
        <span className="bg-[url('/active/edit-check.svg')] btn-image"></span>
      )}
      {text === "삭제하기" && (
        <span className="bg-[url('/active/delete-x.svg')] btn-image"></span>
      )}
      <span
        className={`font-bold ${textColor} ${
          text === "추가하기" && "max-sm:hidden"
        }`}
      >
        {loading ? `${text} 요청중` : text}
      </span>
    </button>
  );
}
