"use client";

import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";
import Loading from "./loading";

export default function TodoList() {
  const { todos, loading, updateTodo } = useTodos();
  const pending = todos.filter((t: TodoItem) => t.isCompleted === false);

  const handleCheckboxChange = async (item: TodoItem) => {
    try {
      await updateTodo(item.id, { isCompleted: !item.isCompleted });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="w-[588px]">
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
                <li
                  key={item.id}
                  className="flex items-center gap-4 px-3 py-2 bg-white rounded-full border-2 border-slate-900"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`todo-${item.id}`}
                      checked={item.isCompleted}
                      onChange={() => handleCheckboxChange(item)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`todo-${item.id}`}
                      className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-900 cursor-pointer bg-yellow-50"
                    />
                  </div>
                  <span className="flex-1 text-slate-800">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
