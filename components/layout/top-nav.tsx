import Link from "next/link";
import Image from "next/image";

export default function TopNavigation() {
  return (
    <nav className="h-15 border-b-[1px] border-slate-200 sticky top-0 bg-white max-[1248px]:px-6 max-md:px-4">
      <div className="max-w-[1200px] mx-auto h-full flex items-center sticky top-0">
        <h1>
          <Link href="/">
            <Image
              src="/active/logo.svg"
              alt="Logo"
              width={151}
              height={40}
              priority
            />
          </Link>
        </h1>
      </div>
    </nav>
  );
}
