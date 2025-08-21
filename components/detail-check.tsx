"use client";

import Image from "next/image";

export default function DetailCheck() {
  return (
    <section className="h-[64px] rounded-3xl border-2 border-slate-900 flex justify-center items-center">
      <h3 className="sr-only">ToDo 체크</h3>
      <div className="flex items-center gap-4">
        <div>
          <input type="checkbox" className="sr-only" />
          <label
            htmlFor=""
            className="check-btn border-2 border-slate-900 bg-yellow-50"
          >
            {/* 체크가 되면 나오는 check 이미지 */}
            <Image
              src="/check.svg"
              alt="check"
              width={32}
              height={32}
              className="hidden"
            />
          </label>
        </div>
        {/* todo의 name 값 수정하는 input */}
        <input
          value={"비타민 챙겨 먹기"}
          className="text-xl font-bold text-slate-900 underline"
          onChange={() => {}}
        />
      </div>
    </section>
  );
}
