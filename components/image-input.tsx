import Image from "next/image";

export default function ImageInput() {
  return (
    <section className="w-[384px] h-[311px] border-2 border-dashed border-slate-300 rounded-3xl bg-slate-50 flex justify-center items-center relative">
      <h3 className="sr-only">이미지 업로드</h3>
      <Image src="/photo.svg" alt="photo" width={64} height={64} />
      <div className="bottom-4 right-4 absolute">
        <input type="file" id="file-upload" className="sr-only" />
        <label
          htmlFor="file-upload"
          className="flex justify-center items-center w-16 h-16 rounded-full bg-slate-200 cursor-pointer"
        >
          <Image src="/navy-plus-big.svg" alt="plus" width={24} height={24} />
        </label>
        <label
          htmlFor="file-upload"
          className="flex justify-center items-center w-16 h-16 rounded-full cursor-pointer border-2 border-slate-900 bg-slate-900/50 hidden"
        >
          <Image
            src="/edit-pencil.svg"
            alt="edit-image"
            width={24}
            height={24}
          />
        </label>
      </div>
    </section>
  );
}
