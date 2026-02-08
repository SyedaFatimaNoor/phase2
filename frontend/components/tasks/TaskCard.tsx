import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Edit3, Trash2, Clock } from "lucide-react";
import { Task } from "@/types";
import { cn, formatRelativeTime } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggleComplete(task.id);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative glass rounded-3xl p-6 border-white/10 dark:border-zinc-800/50 transition-all duration-300",
        "shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10",
        task.is_completed && "opacity-60 grayscale-[0.3]"
      )}
    >
      <div className="flex items-start gap-5">
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={cn(
            "mt-1 flex-shrink-0 transition-all duration-300 transform active:scale-90",
            task.is_completed
              ? "text-indigo-500"
              : "text-zinc-300 dark:text-zinc-600 hover:text-indigo-400"
          )}
        >
          {task.is_completed ? (
            <CheckCircle2 className="h-7 w-7 fill-indigo-500/10" />
          ) : (
            <Circle className="h-7 w-7" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "text-xl font-bold tracking-tight transition-all duration-300",
              task.is_completed
                ? "text-zinc-500 dark:text-zinc-500 line-through"
                : "text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            )}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={cn(
                "mt-2 text-base leading-relaxed line-clamp-2",
                task.is_completed
                  ? "text-zinc-400 dark:text-zinc-600"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
            >
              {task.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/50 px-2.5 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(task.updated_at)}
            </span>
            {task.is_completed && (
              <span className="text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-full">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Actions Overlay */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(task)}
            className="p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition-all hover:scale-110 border border-white/20 dark:border-zinc-700/50"
            title="Edit Task"
          >
            <Edit3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md text-zinc-500 hover:text-red-500 rounded-2xl transition-all hover:scale-110 border border-white/20 dark:border-zinc-700/50"
            title="Delete Task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Subtle border shine on hover */}
      <div className="absolute inset-0 rounded-3xl border border-indigo-500/0 group-hover:border-indigo-500/20 pointer-events-none transition-colors duration-500"></div>
    </motion.div>
  );
}
