/**
 * Todo 목록의 상태 관리와 비즈니스 로직을 담당합니다.
 *
 * 책임:
 * - Todo 데이터 페칭 및 상태 관리
 * - Todo 추가/수정 로직 처리
 * - 완료/미완료 Todo 필터링
 * - 자식 컴포넌트들에게 데이터와 핸들러 전달
 */

"use client";

import { useTodos } from "@/app/hooks/use-todos";
import TodoForm from "@/components/todo/todo-form";
import TodoListView from "@/components/todo/todo-list-view";

export default function TodoContainer() {
  const { todos, loading, actions } = useTodos();
  const pendingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const handleAddTodo = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false;
    try {
      await actions.addTodo({ name: name.trim() });
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다";
      alert(`할 일 추가 실패: ${errorMessage}`);
      return false;
    }
  };

  const handleToggleTodo = async (id: number, isCompleted: boolean) => {
    try {
      await actions.updateTodo(id, { isCompleted });
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다";
      alert(`할 일 업데이트 실패: ${errorMessage}`);
      return false;
    }
  };

  return (
    <section className="max-[1248px]:px-6 max-sm:px-4">
      <TodoForm onSubmit={handleAddTodo} isLoading={loading.adding} />

      <section className="flex gap-6 max-md:flex-col max-md:pb-6 max-md:gap-12">
        <h2 className="sr-only">To Do, Done 리스트</h2>

        <TodoListView
          title="todo"
          todos={pendingTodos}
          isLoading={loading.getting}
          onToggleComplete={handleToggleTodo}
          emptyMessage={{
            icon: "/active/todo-character.png",
            text: "할 일이 없어요.\nTODO를 새롭게 추가해주세요!",
          }}
        />

        <TodoListView
          title="done"
          todos={completedTodos}
          isLoading={loading.getting}
          onToggleComplete={handleToggleTodo}
          emptyMessage={{
            icon: "/active/done-character.png",
            text: "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!",
          }}
        />
      </section>
    </section>
  );
}
