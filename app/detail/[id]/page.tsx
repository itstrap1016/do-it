import DetailCheck from "@/components/detail-check";
import ImageInput from "@/components/image-input";
import Memo from "@/components/memo";
import Button from "@/components/button";

export default function Detail() {
  return (
    <section className="bg-white w-full min-h-[calc(100vh-60px)] pt-6 px-[102px]">
      <h2 className="sr-only">ToDo 상세 페이지</h2>
      <DetailCheck />
      <section className="flex gap-6 mt-6">
        <ImageInput />
        <Memo />
      </section>
      <section className="mt-6 flex justify-end gap-4">
        <h3 className="sr-only">수정, 삭제 버튼</h3>
        <Button
          text="수정 완료"
          bgColor="bg-slate-200"
          textColor="text-slate-900"
        />
        <Button text="삭제하기" bgColor="bg-red-500" textColor="text-white" />
      </section>
    </section>
  );
}
