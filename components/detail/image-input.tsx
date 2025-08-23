"use client";

import { useRef } from "react";
import Image from "next/image";
import { useImageUpload } from "@/app/hooks/use-image-upload";
import { useImagePreview } from "@/app/hooks/use-image-preview";

interface ImageInputProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
  onImageError: (error: string) => void;
}

export default function ImageInput({
  imageUrl,
  onImageChange,
  onImageError,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, actions: uploadActions } = useImageUpload();
  const { previewImage, actions: previewActions } = useImagePreview(imageUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 로컬 미리보기 즉시 설정
    const localBlobUrl = previewActions.setPreviewFromFile(file);

    // 업로드 처리
    const result = await uploadActions.uploadImage(file);

    if (result.success && result.url) {
      // 성공: 서버 이미지로 교체
      previewActions.setPreviewFromUrl(result.url, localBlobUrl);
      onImageChange(result.url);
    } else {
      // 실패: 원래 상태로 복구
      previewActions.clearPreview();
      if (result.error) {
        onImageError(result.error);
      }
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 실제 표시할 이미지 URL
  const displayImage = previewImage || imageUrl;

  return (
    <section
      className={`w-[384px] h-[311px] rounded-3xl relative flex flex-col justify-center items-center image-fade flex-shrink-0 max-lg:w-full ${
        displayImage
          ? "bg-cover bg-center bg-no-repeat"
          : "border-2 border-dashed border-slate-300 bg-slate-50"
      }`}
      style={displayImage ? { backgroundImage: `url(${displayImage})` } : {}}
    >
      {!displayImage && !isUploading && (
        <Image src="/active/photo.svg" alt="photo" width={64} height={64} />
      )}

      {/* 업로드 중 오버레이 */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-3xl">
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-sm">업로드 중...</p>
          </div>
        </div>
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
            <Image
              src="/active/navy-plus-big.svg"
              alt="plus"
              width={24}
              height={24}
            />
          </label>
        ) : (
          <label
            htmlFor="file-upload"
            className={`flex justify-center items-center w-16 h-16 rounded-full cursor-pointer border-2 border-slate-900 bg-slate-900/50 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src="/active/edit-pencil.svg"
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
