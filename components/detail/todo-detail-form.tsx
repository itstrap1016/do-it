"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TodoItem, todoAPI } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";
import DetailCheck from "@/components/detail-check";
import ImageInput from "@/components/image-input";
import Memo from "@/components/memo";
import Button from "@/components/button";

export default function TodoDetailForm({
  initialTodo,
}: {
  initialTodo: TodoItem;
}) {
  const router = useRouter();
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const [todoData, setTodoData] = useState(initialTodo);
  const { refreshTodos } = useTodos();

  // 수정 함수
  const handleUpdate = async () => {
    if (!todoData.name.trim()) {
      alert("할 일 이름을 입력해주세요.");
      return;
    }
    setIsEditLoading(true);
    try {
      await todoAPI.updateTodo(todoData.id, {
        name: todoData.name || "",
        isCompleted: todoData.isCompleted,
        memo: todoData.memo || "",
        imageUrl: todoData.imageUrl || "",
      });
      setWasEdited(true);
      await refreshTodos();
      router.push("/");
    } catch (err) {
      alert(err);
    } finally {
      setIsEditLoading(false);
    }
  };

  // 삭제 함수
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    setIsDeleteLoading(true);
    try {
      await todoAPI.deleteTodo(todoData.id);
      await refreshTodos();
      router.push("/");
    } catch (err) {
      alert(err);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  // 데이터 업데이트 핸들러
  const updateField = (field: keyof TodoItem, value: string | boolean) => {
    setTodoData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="w-full min-h-[calc(100vh-60px)] pt-6 px-[102px] bg-white">
      <h2 className="sr-only">ToDo 상세 페이지</h2>

      <DetailCheck
        name={todoData.name}
        isCompleted={todoData.isCompleted}
        onNameChange={(name) => updateField("name", name)}
        onCompletedChange={(isCompleted) =>
          updateField("isCompleted", isCompleted)
        }
      />

      <section className="flex gap-6 mt-6">
        <ImageInput
          imageUrl={todoData.imageUrl}
          onImageChange={(imageUrl) => updateField("imageUrl", imageUrl)}
        />
        <Memo
          memo={todoData.memo || ""}
          onMemoChange={(memo) => updateField("memo", memo)}
        />
      </section>

      <section className="mt-6 flex justify-end gap-4">
        <h3 className="sr-only">수정, 삭제 버튼</h3>
        <Button
          text="수정 완료"
          bgColor={wasEdited ? "bg-lime-300" : "bg-slate-200"}
          textColor="text-slate-900"
          loading={isEditLoading}
          disabled={isEditLoading}
          onClick={handleUpdate}
        />
        <Button
          text="삭제하기"
          bgColor="bg-red-500"
          textColor="text-white"
          loading={isDeleteLoading}
          disabled={isDeleteLoading}
          onClick={handleDelete}
        />
      </section>
    </section>
  );
}
