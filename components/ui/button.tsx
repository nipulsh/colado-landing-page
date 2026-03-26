import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,box-shadow,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colado-primary)]/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--colado-primary)] text-white shadow-lg shadow-[var(--colado-primary)]/25 hover:shadow-xl hover:shadow-[var(--colado-primary)]/30",
        ghost:
          "bg-white/65 text-[var(--colado-ink)] shadow-sm shadow-black/[0.04] backdrop-blur-md hover:bg-white/85",
        outline:
          "border border-[var(--colado-primary)]/25 bg-[var(--colado-card)] text-[var(--colado-ink)] backdrop-blur-md hover:bg-white/90",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
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
