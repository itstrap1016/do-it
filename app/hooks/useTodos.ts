"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { todoAPI, CreateTodoRequest } from "../lib/api";

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

  const addTodo = async (data: CreateTodoRequest) => {
    try {
      setActionLoading((prev) => ({ ...prev, adding: true }));

      const newTodo = await todoAPI.createTodo(data);
      await mutate(TODOS_KEY, [...todos, newTodo], false);
    } catch (err) {
      await mutate(TODOS_KEY);
      throw err;
    } finally {
      setActionLoading((prev) => ({ ...prev, adding: false }));
    }
  };

  return {
    todos,
    loading: {
      adding: actionLoading.adding,
      getting: isLoading,
    },
    error,
    addTodo,
    refreshTodos,
  };
}
