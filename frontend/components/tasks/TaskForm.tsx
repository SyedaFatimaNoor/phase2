import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Plus, Type, AlignLeft, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { TaskFormData } from "@/types";

interface TaskFormProps {
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = "Manifest Task",
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: initialData || {
      title: "",
      description: "",
    },
  });

  const handleFormSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="relative group">
          <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
          <Input
            placeholder="Task Title"
            className="pl-12 h-14 rounded-2xl glass border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary transition-all text-lg font-bold"
            error={errors.title?.message}
            disabled={isSubmitting}
            {...register("title", {
              required: "A title is required for clarity",
              validate: (value) =>
                value.trim().length > 0 || "Title cannot be empty",
            })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative group">
          <AlignLeft className="absolute left-4 top-5 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
          <textarea
            id="description"
            rows={4}
            placeholder="Describe the objective..."
            disabled={isSubmitting}
            className="w-full pl-12 pr-4 py-4 border rounded-2xl glass transition-all bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 resize-none font-medium text-base"
            {...register("description")}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-12 px-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Discard
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="h-12 px-8 rounded-2xl premium-gradient text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
          {!isSubmitting && <Plus className="h-5 w-5" />}
          {submitLabel}
        </Button>
      </div>
    </motion.form>
  );
}
