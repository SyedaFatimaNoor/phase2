"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useAuth";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  useRedirectIfAuthenticated();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full -z-10"></div>

      <div className="w-full max-w-md">
        <div className="glass rounded-[2rem] shadow-2xl shadow-indigo-500/10 p-10 border-white/20 dark:border-zinc-800/50">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-3">
              Join <span className="premium-text-gradient">NoorTodo</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Start your premium task management journey
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
