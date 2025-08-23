// app/hooks/use-image-upload.ts
"use client";

import { useState } from "react";
import { todoAPI } from "@/app/lib/api";

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * 이미지 업로드 관련 로직을 관리하는 커스텀 훅
 * 파일 검증, 업로드 처리, 상태 관리를 담당
 */
export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 파일 검증
  const validateFile = (file: File): ValidationResult => {
    // 1. 파일명 영어 검증 (확장자 제외)
    const fileName = file.name;
    const fileNameWithoutExt =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    const englishOnlyRegex = /^[a-zA-Z0-9\s\-_]+$/;

    if (!englishOnlyRegex.test(fileNameWithoutExt)) {
      return {
        isValid: false,
        error:
          "파일명은 영어, 숫자, 하이픈(-), 언더스코어(_)만 사용 가능합니다.",
      };
    }

    // 2. 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        isValid: false,
        error: `파일 크기가 너무 큽니다. (현재: ${fileSizeMB}MB, 최대: 5MB)`,
      };
    }

    // 3. 파일 타입 검증
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP만 가능)",
      };
    }

    return { isValid: true };
  };

  // 이미지 업로드
  const uploadImage = async (file: File): Promise<UploadResult> => {
    // 유효성 검증
    const validation = validateFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    setIsUploading(true);
    setError(null);

    try {
      const imageUrl = await todoAPI.uploadImage(file);
      return {
        success: true,
        url: imageUrl,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsUploading(false);
    }
  };

  // 에러 상태 초기화
  const clearError = () => {
    setError(null);
  };

  return {
    isUploading,
    error,
    actions: {
      validateFile,
      uploadImage,
      clearError,
    },
  };
}
