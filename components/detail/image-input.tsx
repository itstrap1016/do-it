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

    // 기존 로컬 URL 정리
    if (
      previewImage &&
      previewImage !== imageUrl &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    // 로컬 미리보기 설정
    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);
    setIsUploading(true);

    try {
      // 이미지 미리 로드 후 서버에 업로드
      const preloadImage = new window.Image();
      const serverImageUrl = await todoAPI.uploadImage(file);

      preloadImage.src = serverImageUrl;
      preloadImage.onload = () => {
        setPreviewImage(serverImageUrl);
        onImageChange(serverImageUrl);

        // 지연 후 로컬 URL 해제
        setTimeout(() => {
          URL.revokeObjectURL(localPreview);
        }, 300);
      };

      preloadImage.onerror = () => {
        alert("서버 이미지 로드 실패");
        onImageChange(localPreview);
      };
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다"
      );
    } finally {
      setIsUploading(false);
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
