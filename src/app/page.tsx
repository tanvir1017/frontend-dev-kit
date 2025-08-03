import Auth0 from "@/assets/svg/Auth0";
import JwtIO from "@/assets/svg/Jwt";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="border border-slate-100 p-5 rounded-[36px]">
          <div className="grid md:grid-cols-2 gap-1.5 border rounded-2xl bg-slate-50 border-slate-200 shadow drop-shadow-slate-50 drop-shadow-2xl ">
            <Auth0 />
            <JwtIO />
          </div>
        </div>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Just follow the template and ease your life
          </li>
          <li className="tracking-[-.01em]">
            Head over to{" "}
            <a
              className="underline"
              href="https://github.com/tanvir1017/frontend-dev-kit/tree/next-authentication"
            >
              Github
            </a>
          </li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/auth-wall/sign-in"
            rel="noopener noreferrer"
          >
            Sign in
            <LogIn className="stroke-1" />
          </Link>
        </div>
      </main>
    </div>
  );
}
