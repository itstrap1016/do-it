// app/detail/[id]/page.tsx
import TodoDetailForm from "@/components/todo-detail-form";
import { todoAPI } from "@/app/lib/api";
import { notFound } from "next/navigation";

interface DetailPageParams {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: DetailPageParams) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  // 서버에서 데이터 가져오기
  try {
    const todo = await todoAPI.getTodoById(id);

    if (!todo) {
      notFound(); // 404 페이지로 리디렉션
    }

    return <TodoDetailForm initialTodo={todo} />;
  } catch (error) {
    // 오류 처리
    console.error(error);
    return <div>Todo를 불러오는 중 오류가 발생했습니다.</div>;
  }
}
