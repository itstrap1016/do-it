"use client";

import { useRouter } from "next/navigation";
import { TodoItem } from "@/app/lib/api";
import { useTodoDetail } from "@/app/hooks/use-todo-detail";
import TodoDetailView from "@/components/detail";

interface TodoDetailContainerProps {
  initialTodo: TodoItem;
}

export default function TodoDetailContainer({
  initialTodo,
}: TodoDetailContainerProps) {
  const router = useRouter();
  const { todoData, updateField, status, actions } = useTodoDetail(initialTodo);

  const handleUpdate = async () => {
    const result = await actions.updateTodo();

    if (result && result.success) {
      router.push("/");
    } else if (result && result.error) {
      alert(result.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const result = await actions.deleteTodo();

    if (result.success) {
      router.push("/");
    } else {
      alert(result.error);
    }
  };

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
