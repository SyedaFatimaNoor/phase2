import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, CheckCircle2, ListTodo, Search, Settings2, Trash2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { DeleteConfirm } from "@/components/tasks/DeleteConfirm";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Task, TaskFormData } from "@/types";

export default function DashboardPage() {
  const {
    items: tasks,
    total,
    isLoading,
    error,
    filter,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setFilter,
  } = useTasks();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      await createTask({
        title: data.title,
        description: data.description || undefined,
      });
      setIsCreateModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: TaskFormData) => {
    if (!editingTask) return;
    setIsSubmitting(true);
    try {
      await updateTask(editingTask.id, {
        title: data.title,
        description: data.description || undefined,
      });
      setEditingTask(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTask) return;
    setIsSubmitting(true);
    try {
      await deleteTask(deletingTask.id);
      setDeletingTask(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (id: number) => {
    await toggleComplete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Decorative center light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="h-3 w-3" />
            Workspace
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
            My Tasks
            <span className="text-indigo-500 text-5xl">.</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            Managing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{total}</span> tasks currently
          </p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-12 rounded-2xl premium-gradient text-white px-6 font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Create New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Filter Section */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <TaskFilter
              currentFilter={filter.isCompleted}
              onFilterChange={setFilter}
            />
          </div>
        </div>

        {/* List Section */}
        <div className="relative">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            onToggleComplete={handleToggleComplete}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onRetry={fetchTasks}
          />
        </div>
      </div>

      {/* Modals with AnimatePresence */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            title="Design New Task"
          >
            <TaskForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateModalOpen(false)}
              isSubmitting={isSubmitting}
            />
          </Modal>
        )}

        {editingTask && (
          <Modal
            isOpen={!!editingTask}
            onClose={() => setEditingTask(null)}
            title="Refine Task"
          >
            <TaskForm
              initialData={{
                title: editingTask.title,
                description: editingTask.description || "",
              }}
              onSubmit={handleEdit}
              onCancel={() => setEditingTask(null)}
              isSubmitting={isSubmitting}
              submitLabel="Update Design"
            />
          </Modal>
        )}
      </AnimatePresence>

      <DeleteConfirm
        isOpen={!!deletingTask}
        taskTitle={deletingTask?.title || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
        isDeleting={isSubmitting}
      />
    </motion.div>
  );
}
