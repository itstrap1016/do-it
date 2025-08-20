"use client";

import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";
import Loading from "./loading";
import ListItem from "./list-item";

export default function DoneList() {
  const { todos, loading } = useTodos();
  const completed = todos.filter((t: TodoItem) => t.isCompleted === true);
  console.log(completed);

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
                <ListItem key={item.id} item={item} variant="done" />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
