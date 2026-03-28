import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-[background,box-shadow,transform,opacity,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ghost-border-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "rounded-xl bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dim)] text-[var(--on-primary)] shadow-ambient hover:brightness-[1.05]",
        secondary:
          "rounded-xl bg-[var(--surface-container-high)] text-[var(--on-surface)] hover:brightness-[0.98]",
        tertiary:
          "rounded-xl bg-transparent text-[var(--primary)] hover:bg-[var(--primary-container)]/40",
        ghost:
          "rounded-xl bg-transparent text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]",
        outline:
          "rounded-xl border border-[var(--ghost-border)] bg-[var(--surface-container-lowest)] text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-8 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
