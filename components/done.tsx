import Image from "next/image";

export default function Done() {
  return (
    <section className="w-[588px]">
      <h3>
        <Image src="/done.png" width={97} height={36} alt="to-do" />
      </h3>
      <div className="default-section">
        <div className="bg-[url('/done-character.png')] default-bg"></div>
        <h4 className="default-text">
          아직 다 한 일이 없어요.
          <br />
          해야 할 일을 체크해보세요!
        </h4>
      </div>
    </section>
  );
}
