"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/Button";

export function Header() {
  const { isAuthenticated, user, signOut, isLoading } = useAuth();

  // Don't render anything while loading to prevent flash
  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold premium-text-gradient">
              NoorTodo
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="text-xl font-bold premium-text-gradient transition-opacity hover:opacity-80"
          >
            NoorTodo
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 hidden sm:inline">
                  {user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-zinc-600 dark:text-zinc-400">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full premium-gradient text-white hover:opacity-90 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
