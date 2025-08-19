import Button from "./button";

interface LabelProps {
  text: string;
  bgColor: string;
}

export default function TodoForm() {
  return (
    <form className="py-6 pb-10 flex gap-4">
      <input
        className="w-full h-13 rounded-full bg-slate-100 px-6 text-slate-500 placeholder-slate-400 custom-shadow max-w-[1016px]"
        placeholder="할 일을 입력해주세요"
      ></input>
      <Button text="추가하기" />
    </form>
  );
}
