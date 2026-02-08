import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";
import { LoadingScreen } from "@/components/ui/Spinner";
import { AlertCircle, RefreshCw } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  onToggleComplete: (id: number) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onRetry: () => void;
}

export function TaskList({
  tasks,
  isLoading,
  error,
  onToggleComplete,
  onEdit,
  onDelete,
  onRetry,
}: TaskListProps) {
  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <LoadingScreen message="Unlocking your potential..." />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 glass rounded-[2rem] border-red-500/20"
      >
        <div className="inline-flex p-4 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2">Sync Interrupted</h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 max-w-sm mx-auto">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:scale-105 transition-transform active:scale-95"
        >
          <RefreshCw className="h-5 w-5" />
          Reconnect
        </button>
      </motion.div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <EmptyState />
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
