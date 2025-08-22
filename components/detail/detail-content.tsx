import ImageInput from "./image-input";
import Memo from "./memo";

interface DetailContentProps {
  imageUrl?: string;
  memo: string;
  onImageChange: (url: string) => void;
  onMemoChange: (memo: string) => void;
}

export default function DetailContent({
  imageUrl,
  memo,
  onImageChange,
  onMemoChange,
}: DetailContentProps) {
  return (
    <section className="flex gap-6 mt-6 max-[1248px]:justify-center max-lg:flex-col max-sm:mt-4 max-sm:gap-4">
      <h2 className="sr-only">수정 콘텐츠</h2>
      <ImageInput imageUrl={imageUrl} onImageChange={onImageChange} />
      <Memo memo={memo} onMemoChange={onMemoChange} />
    </section>
  );
}
