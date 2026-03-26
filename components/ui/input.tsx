import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/70 bg-white/85 px-4 py-2 text-[var(--colado-ink)] shadow-inner shadow-[var(--colado-primary)]/[0.06] backdrop-blur-md placeholder:text-[var(--colado-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colado-primary)]/40",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
