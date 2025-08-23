// Todo 목록 관리를 위한 커스텀 훅
// SWR을 사용하여 데이터 페칭, 캐싱, 리페칭을 처리합니다.
"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { todoAPI, CreateTodoRequest, UpdateTodoRequest } from "../lib/api";

const TODOS_KEY = "todos";

export function useTodos() {
  // 개별 액션 로딩 상태 (SWR과 별도 관리)
  const [actionLoading, setActionLoading] = useState({
    adding: false,
  });

  const {
    data: todos = [],
    error,
    isLoading,
    mutate: refreshTodos,
  } = useSWR(TODOS_KEY, todoAPI.getTodos);

  // 할 일 추가 함수
  const addTodo = async (data: CreateTodoRequest) => {
    try {
      setActionLoading((prev) => ({ ...prev, adding: true }));

      await todoAPI.createTodo(data);
      await mutate(TODOS_KEY);
    } catch (err) {
      await mutate(TODOS_KEY);
      throw err;
    } finally {
      setActionLoading((prev) => ({ ...prev, adding: false }));
    }
  };

  // 할 일 업데이트 함수
  const updateTodo = async (id: number, data: UpdateTodoRequest) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, data);
      await mutate(
        TODOS_KEY,
        todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
        false
      );
    } catch (err) {
      await mutate(TODOS_KEY);
      throw err;
    }
  };

  return {
    todos,
    loading: {
      adding: actionLoading.adding,
      getting: isLoading,
    },
    error,
    actions: {
      addTodo,
      refreshTodos,
      updateTodo,
    },
  };
}
