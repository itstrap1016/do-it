"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { todoAPI } from "@/app/lib/api";

interface ImageInputProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
}

export default function ImageInput({
  imageUrl,
  onImageChange,
}: ImageInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 초기화 시 외부에서 받은 이미지URL을 미리보기로 설정
  useEffect(() => {
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  }, [imageUrl]);

  // 메모리 누수 방지를 위해 컴포넌트 언마운트 시 URL 객체 해제
  useEffect(() => {
    return () => {
      // imageUrl과 previewImage가 다르면 로컬 객체 URL이므로 해제
      if (
        previewImage &&
        previewImage !== imageUrl &&
        previewImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, imageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    if (!/^[a-zA-Z0-9._-]+$/.test(file.name.split(".")[0])) {
      alert("파일명은 영문자, 숫자, 점, 하이픈, 언더스코어만 허용됩니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    if (
      previewImage &&
      previewImage !== imageUrl &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);
    setIsUploading(true);

    // API 호출
    try {
      const serverImageUrl = await todoAPI.uploadImage(file);
      // 서버 URL이 유효한 경우에만 업데이트
      if (serverImageUrl) {
        const preloadImage = new window.Image();
        preloadImage.src = serverImageUrl;

        preloadImage.onload = () => {
          // 이미지가 완전히 로드된 후에만 URL 전환
          setPreviewImage(serverImageUrl);
          onImageChange(serverImageUrl);

          // 지연 후 로컬 URL 해제 (이미지 전환 완료 후)
          setTimeout(() => {
            URL.revokeObjectURL(localPreview);
          }, 300);
        };
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsUploading(false);
    }
  };

  const displayImage = previewImage || imageUrl;

  return (
    <section
      className={`w-[384px] h-[311px] rounded-3xl relative flex justify-center items-center ${
        displayImage
          ? "bg-cover bg-center bg-no-repeat"
          : "border-2 border-dashed border-slate-300 bg-slate-50"
      }`}
      style={displayImage ? { backgroundImage: `url(${displayImage})` } : {}}
    >
      {!displayImage && !isUploading && (
        <Image src="/photo.svg" alt="photo" width={64} height={64} />
      )}
      <div className="bottom-4 right-4 absolute">
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {!displayImage ? (
          <label
            htmlFor="file-upload"
            className={`flex justify-center items-center w-16 h-16 rounded-full bg-slate-200 cursor-pointer ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image src="/navy-plus-big.svg" alt="plus" width={24} height={24} />
          </label>
        ) : (
          <label
            htmlFor="file-upload"
            className={`flex justify-center items-center w-16 h-16 rounded-full cursor-pointer border-2 border-slate-900 bg-slate-900/50 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src="/edit-pencil.svg"
              alt="edit-image"
              width={24}
              height={24}
            />
          </label>
        )}
      </div>
    </section>
  );
}
