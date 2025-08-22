// components/list-item.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { TodoItem } from "@/app/lib/api";
import { useTodos } from "@/app/hooks/useTodos";

interface ListItemProps {
  item: TodoItem;
  variant: "todo" | "done";
}

const styles = {
  todo: {
    background: "bg-white",
    checkboxBg: "bg-yellow-50",
    checkboxBorder: "border-2 border-slate-900",
    textStyle: "text-slate-800",
    icon: null,
  },
  done: {
    background: "bg-violet-100",
    checkboxBg: "",
    checkboxBorder: "",
    textStyle: "text-slate-800 line-through",
    icon: "/check.svg",
  },
};

export default function ListItem({ item, variant }: ListItemProps) {
  const { updateTodo } = useTodos();

  const handleCheckbox = async (item: TodoItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateTodo(item.id, { isCompleted: !item.isCompleted });
    } catch (err) {
      alert(err);
    }
  };

  const currentStyle = styles[variant];

  return (
    <li>
      <Link
        href={`/detail/${item.id}`}
        className={`
        flex items-center gap-4 px-3 py-2 rounded-full border-2 border-slate-900 w-full
        ${currentStyle.background}
      `}
      >
        <div>
          <input
            type="checkbox"
            id={`${variant}-${item.id}`}
            checked={item.isCompleted}
            onChange={() => {}}
            className="sr-only"
          />
          <label
            htmlFor={`${variant}-${item.id}`}
            className={`check-btn ${currentStyle.checkboxBg} ${currentStyle.checkboxBorder}`}
            onClick={(e) => handleCheckbox(item, e)}
          >
            {currentStyle.icon && (
              <Image
                src={currentStyle.icon}
                alt="check"
                width={32}
                height={32}
              />
            )}
          </label>
        </div>
        <span className={`flex-1 ${currentStyle.textStyle}`}>{item.name}</span>
      </Link>
    </li>
  );
}
