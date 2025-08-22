"use client";

import { TodoItem } from "@/app/lib/api";
import { useTodoDetail } from "@/app/hooks/use-todo-detail";
import TodoDetailView from "@/components/detail";

interface TodoDetailContainerProps {
  initialTodo: TodoItem;
}

export default function TodoDetailContainer({
  initialTodo,
}: TodoDetailContainerProps) {
  const { todoData, updateField, status, handleUpdate, handleDelete } =
    useTodoDetail(initialTodo);

  return (
    <TodoDetailView
      todoData={todoData}
      updateField={updateField}
      status={status}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
