// 새로 추가된 상세 페이지를 위한 훅
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TodoItem, todoAPI } from "@/app/lib/api";
import { useTodos } from "./use-todos";

export function useTodoDetail(initialTodo: TodoItem) {
  const router = useRouter();
  const [todoData, setTodoData] = useState(initialTodo);
  const [status, setStatus] = useState({
    isEditLoading: false,
    isDeleteLoading: false,
    wasEdited: false,
    error: null as string | null,
  });
  const { refreshTodos } = useTodos();

  // 개별 필드 업데이트 핸들러
  const updateField = (field: keyof TodoItem, value: string | boolean) => {
    setTodoData((prev) => ({ ...prev, [field]: value }));
  };

  // 유효성 검증
  const validateTodo = () => {
    if (!todoData.name.trim()) {
      return "할 일 이름을 입력해주세요.";
    }
    return null;
  };

  // 수정 로직
  const handleUpdate = async () => {
    const validationError = validateTodo();
    if (validationError) {
      alert(validationError);
      return;
    }

    setStatus((prev) => ({ ...prev, isEditLoading: true, error: null }));
    try {
      await todoAPI.updateTodo(todoData.id, {
        name: todoData.name,
        isCompleted: todoData.isCompleted,
        memo: todoData.memo || "",
        imageUrl: todoData.imageUrl || "",
      });
      await refreshTodos();
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "수정 중 오류가 발생했습니다";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
      alert(errorMessage);
    } finally {
      setStatus((prev) => ({ ...prev, isEditLoading: false }));
    }
  };

  // 삭제 로직
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    setStatus((prev) => ({ ...prev, isDeleteLoading: true, error: null }));
    try {
      await todoAPI.deleteTodo(todoData.id);
      await refreshTodos();
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
      alert(errorMessage);
    } finally {
      setStatus((prev) => ({ ...prev, isDeleteLoading: false }));
    }
  };

  return {
    todoData,
    updateField,
    status,
    handleUpdate,
    handleDelete,
  };
}
