import logoHorizontal from "@/assets/helalyol-logo.png.asset.json";
import logoIcon from "@/assets/helalyol-icon.png.asset.json";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "horizontal" | "icon";
  className?: string;
};

export function Logo({ variant = "horizontal", className }: Props) {
  if (variant === "icon") {
    return (
      <img
        src={logoIcon.url}
        alt="HelalYol"
        className={cn("h-8 w-8 rounded-md object-contain", className)}
      />
    );
  }
  return (
    <img
      src={logoHorizontal.url}
      alt="HelalYol"
      className={cn("h-7 w-auto object-contain", className)}
    />
  );
}
