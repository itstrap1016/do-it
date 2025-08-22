"use client";

import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";
import Loading from "../ui/loading";
import ListItem from "./todo-list-item";

export default function TodoList() {
  const { todos, loading } = useTodos();
  const pending = todos.filter((t: TodoItem) => t.isCompleted === false);
  console.log(pending);

  return (
    <section className="list">
      <h3>
        <Image src="/todo.png" width={101} height={36} alt="to-do" />
      </h3>
      {loading.getting ? (
        <Loading />
      ) : (
        <>
          {pending.length === 0 ? (
            <div className="default-section">
              <div className="bg-[url('/todo-character.png')] default-bg"></div>
              <h4 className="default-text">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </h4>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {pending.map((item: TodoItem) => (
                <ListItem key={item.id} item={item} variant="todo" />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
