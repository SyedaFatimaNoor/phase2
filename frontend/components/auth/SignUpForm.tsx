import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidEmail, isValidPassword } from "@/lib/utils";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const { signUp, isLoading, error, clearError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError(null);
    clearError();
    try {
      await signUp(data.email, data.password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setSubmitError(message);
    }
  };

  const displayError = submitError || error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {displayError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-2xl flex items-center gap-3 border border-red-100 dark:border-red-900/30"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            {displayError}
          </motion.div>
        )}

        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-12 h-13 rounded-2xl glass border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary transition-all"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Please enter a valid email",
              })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-12 h-13 rounded-2xl glass border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary transition-all"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  isValidPassword(value) || "Password must be at least 8 characters",
              })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-12 h-13 rounded-2xl glass border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary transition-all"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="h-13 rounded-2xl premium-gradient text-white font-semibold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] mt-2 group"
        >
          <span className="flex items-center justify-center gap-2">
            Create Account
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>

        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-bold text-primary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline decoration-2 underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
