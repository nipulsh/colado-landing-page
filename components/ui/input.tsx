import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-transparent bg-[var(--surface-container-low)] px-3.5 py-2 text-[var(--on-surface)] transition-[background-color,box-shadow] placeholder:text-[color-mix(in_srgb,var(--on-surface-variant)_75%,transparent)] focus-visible:outline-none focus-visible:bg-[var(--surface-container-lowest)] focus-visible:ring-1 focus-visible:ring-[var(--primary)]/30",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
