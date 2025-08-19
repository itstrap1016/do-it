import Image from "next/image";

export default function TodoList() {
  return (
    <section className="w-[588px]">
      <h3>
        <Image src="/todo.png" width={101} height={36} alt="to-do" />
      </h3>
      <div className="default-section">
        <div className="bg-[url('/todo-character.png')] default-bg"></div>
        <h4 className="default-text">
          할 일이 없어요.
          <br />
          TODO를 새롭게 추가해주세요!
        </h4>
      </div>
    </section>
  );
}
