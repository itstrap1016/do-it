// app/hooks/use-image-preview.ts
"use client";

import { useState, useEffect } from "react";

/**
 * 이미지 미리보기 상태 관리 훅
 * 로컬 미리보기, 메모리 관리를 담당
 */
export function useImagePreview(initialImageUrl?: string) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 초기 이미지 설정
  useEffect(() => {
    if (initialImageUrl) {
      setPreviewImage(initialImageUrl);
    }
  }, [initialImageUrl]);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (
        previewImage &&
        previewImage !== initialImageUrl &&
        previewImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, initialImageUrl]);

  // 로컬 이미지 URL로 미리보기 설정
  const setPreviewFromFile = (file: File): string => {
    // 기존 blob URL 정리
    if (
      previewImage &&
      previewImage !== initialImageUrl &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    const blobUrl = URL.createObjectURL(file);
    setPreviewImage(blobUrl);
    return blobUrl;
  };

  // 서버 이미지 URL로 미리보기 설정
  const setPreviewFromUrl = (url: string, localBlobUrl?: string) => {
    setPreviewImage(url);

    // 로컬 blob URL 정리
    if (localBlobUrl) {
      setTimeout(() => {
        URL.revokeObjectURL(localBlobUrl);
      }, 300);
    }
  };

  // 미리보기 초기화
  const clearPreview = () => {
    if (
      previewImage &&
      previewImage !== initialImageUrl &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(initialImageUrl || null);
  };

  return {
    previewImage: previewImage || initialImageUrl,
    actions: {
      setPreviewFromFile,
      setPreviewFromUrl,
      clearPreview,
    },
  };
}
