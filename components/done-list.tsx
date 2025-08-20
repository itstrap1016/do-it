"use client";

import Link from "next/link";
import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";
import Loading from "./loading";

export default function DoneList() {
  const { todos, loading, updateTodo } = useTodos();
  const completed = todos.filter((t: TodoItem) => t.isCompleted === true);

  const handleCheckbox = async (item: TodoItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await updateTodo(item.id, { isCompleted: !item.isCompleted });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="w-[588px]">
      <h3>
        <Image src="/done.png" width={97} height={36} alt="done" />
      </h3>
      {loading.getting ? (
        <Loading />
      ) : (
        <>
          {completed.length === 0 ? (
            <div className="default-section">
              <div className="bg-[url('/done-character.png')] default-bg"></div>
              <h4 className="default-text">
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </h4>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {completed.map((item: TodoItem) => (
                <li key={item.id}>
                  <Link
                    href={`/detail/${item.id}`}
                    className="flex items-center gap-4 px-3 py-2 bg-violet-100 rounded-full border-2 border-slate-900"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`done-${item.id}`}
                        checked={item.isCompleted}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`done-${item.id}`}
                        className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                        onClick={(e) => handleCheckbox(item, e)}
                      >
                        <Image
                          src="/check.svg"
                          alt="check"
                          width={32}
                          height={32}
                        />
                      </label>
                    </div>
                    <span className="flex-1 text-slate-800 line-through">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
