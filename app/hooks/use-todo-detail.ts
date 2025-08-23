// Todo 상세 페이지에서 사용하는 커스텀 훅
// 개별 Todo의 수정, 삭제 등의 기능을 관리합니다.
"use client";

import { useState } from "react";
import { TodoItem, todoAPI } from "@/app/lib/api";
import { useTodos } from "./use-todos";

interface ReturnObject {
  success?: boolean;
  error?: string;
}

export function useTodoDetail(initialTodo: TodoItem) {
  const [todoData, setTodoData] = useState(initialTodo);
  const [status, setStatus] = useState({
    isEditLoading: false,
    isDeleteLoading: false,
    error: null as string | null,
  });
  const { actions } = useTodos();

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
  const updateTodo = async (): Promise<ReturnObject | void> => {
    const validationError = validateTodo();
    if (validationError) {
      return { success: false, error: validationError };
    }

    setStatus((prev) => ({ ...prev, isEditLoading: true, error: null }));
    try {
      await todoAPI.updateTodo(todoData.id, {
        name: todoData.name,
        isCompleted: todoData.isCompleted,
        memo: todoData.memo || "",
        imageUrl: todoData.imageUrl || "",
      });
      await actions.refreshTodos();
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "수정 중 오류가 발생했습니다";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    } finally {
      setStatus((prev) => ({ ...prev, isEditLoading: false }));
    }
  };

  // 삭제 로직
  const deleteTodo = async (): Promise<ReturnObject> => {
    setStatus((prev) => ({ ...prev, isDeleteLoading: true, error: null }));
    try {
      await todoAPI.deleteTodo(todoData.id);
      await actions.refreshTodos();
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다";
      setStatus((prev) => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    } finally {
      setStatus((prev) => ({ ...prev, isDeleteLoading: false }));
    }
  };

  return {
    todoData,
    updateField,
    status,
    actions: {
      updateTodo,
      deleteTodo,
    },
  };
}
