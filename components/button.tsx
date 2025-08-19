interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button className="flex items-center gap-1 w-[168px] h-[52px] custom-shadow rounded-2xl justify-center bg-violet-600">
      {text === "추가하기" && (
        <>
          <span className="bg-[url('/white-plus.svg')] btn-image"></span>
          <span className="font-bold text-white">추가하기</span>
        </>
      )}
    </button>
  );
}
