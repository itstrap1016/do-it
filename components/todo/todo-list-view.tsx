import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import Loading from "../ui/loading";
import TodoListItem from "./todo-list-item";
import EmptyState from "./empty-state";

interface TodoListViewProps {
  title: "todo" | "done";
  todos: TodoItem[];
  isLoading: boolean;
  onToggleComplete: (id: number, isCompleted: boolean) => Promise<boolean>;
  emptyMessage: {
    icon: string;
    text: string;
  };
}

export default function TodoListView({
  title,
  todos,
  isLoading,
  onToggleComplete,
  emptyMessage,
}: TodoListViewProps) {
  // 타이틀 이미지 선택
  const titleImage = title === "todo" ? "/active/todo.png" : "/active/done.png";
  const titleWidth = title === "todo" ? 101 : 97;

  return (
    <section className="list">
      <h3>
        <Image src={titleImage} width={titleWidth} height={36} alt={title} />
      </h3>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {todos.length === 0 ? (
            <EmptyState
              iconPath={emptyMessage.icon}
              message={emptyMessage.text}
            />
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {todos.map((item) => (
                <TodoListItem
                  key={item.id}
                  item={item}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
