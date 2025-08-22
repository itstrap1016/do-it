import TodoForm from "@/components/todo/todo-form";
import TodoList from "@/components/todo/todo-list";
import Done from "@/components/todo/done-list";

export default function Home() {
  return (
    <>
      <TodoForm />
      <section className="flex gap-6 max-md:flex-col max-md:pb-6 max-md:gap-12">
        <h2 className="sr-only">To Do, Done 리스트</h2>
        <TodoList />
        <Done />
      </section>
    </>
  );
}
