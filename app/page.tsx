import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import Done from "@/components/done";

export default function Home() {
  return (
    <>
      <TodoForm />
      <section className="flex gap-6">
        <h2 className="sr-only">To Do, Done 리스트</h2>
        <TodoList />
        <Done />
      </section>
    </>
  );
}
