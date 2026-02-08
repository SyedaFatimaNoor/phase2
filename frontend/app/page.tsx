"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingScreen } from "@/components/ui/Spinner";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <LoadingScreen message="Redirecting to dashboard..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl pt-20 pb-16">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
        </div>

        {/* Hero */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Spec-Driven. AI-Native. Premium.
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            Elevate Your <span className="premium-text-gradient">Productivity</span> with NoorTodo
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A masterfully crafted task management experience by Syeda Noor Ul Ain Fatima.
            Organize your life with elegance and intelligence.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl premium-gradient text-white hover:opacity-90 shadow-2xl shadow-indigo-500/40 transition-all hover:-translate-y-1 active:scale-95"
          >
            Start Your Journey
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl glass border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-all hover:-translate-y-1 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-8 text-left animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          {[
            {
              title: "Intuitive Flow",
              desc: "Effortlessly manage tasks with a UI designed for clarity and speed.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            {
              title: "Private & Secure",
              desc: "Your data is protected with industry-standard encryption and JWT auth.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
              color: "text-indigo-500",
              bg: "bg-indigo-500/10"
            },
            {
              title: "Cloud Native",
              desc: "Built for the future with a scalable Kubernetes and Neon DB architecture.",
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />,
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl glass border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/5 duration-500">
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <svg className={`h-7 w-7 ${feature.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
