import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "accent";
  size?: "sm" | "md" | "lg";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    const baseClasses =
      "relative overflow-hidden transition-all duration-300 ease-out";

    const variantClasses = {
      default:
        "bg-white/[0.08] border border-white/[0.12] backdrop-blur-[12px]",
      interactive:
        "bg-white/[0.08] border border-white/[0.12] backdrop-blur-[12px] hover:bg-white/[0.12] hover:border-white/[0.18] hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/[0.1]",
      accent:
        "bg-gradient-to-br from-red-500/[0.1] to-blue-500/[0.05] border border-red-500/[0.2] backdrop-blur-[12px]",
    };

    const sizeClasses = {
      sm: "rounded-xl p-4",
      md: "rounded-2xl p-6",
      lg: "rounded-2xl p-8",
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        style={{
          boxShadow:
            variant === "interactive"
              ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 16px rgba(255, 255, 255, 0.1) inset"
              : "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        {...props}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent opacity-50 pointer-events-none pr-5" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  },
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
