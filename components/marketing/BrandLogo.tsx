import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority }: BrandLogoProps) {
  return (
    <Image
      src="/screen.png"
      alt="Colado"
      width={140}
      height={160}
      className={cn("w-auto object-contain object-left", className)}
      priority={priority}
    />
  );
}
