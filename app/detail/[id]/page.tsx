import { todoAPI } from "@/app/lib/api";
import { notFound } from "next/navigation";
import TodoDetailContainer from "./todo-detail-container";

interface DetailPageParams {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: DetailPageParams) {
  try {
    const { id } = await params;
    const todoId = Number(id);
    const todo = await todoAPI.getTodoById(todoId);

    if (!todo) {
      notFound();
    }

    return <TodoDetailContainer initialTodo={todo} />;
  } catch (error) {
    console.error("Todo 상세 정보 로드 오류:", error);
    return <div>Todo를 불러오는 중 오류가 발생했습니다.</div>;
  }
}
