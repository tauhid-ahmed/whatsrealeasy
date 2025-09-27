import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "default" | "outline";
type Weight = "bold" | "medium";
type Size = "sm" | "md" | "lg" | "icon";
type Shape = "default" | "pill";

const buttonVariantClasses: Record<Variant, Record<Partial<Tone>, string>> = {
  primary: {
    default: "bg-primary text-white hover:bg-primary/80",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  },
  secondary: {
    default: "bg-white text-gray-950 hover:opacity-90",
    outline: "border border-gray-300 text-gray-950",
  },
  ghost: {
    default: "bg-transparent text-gray-100 hover:bg-gray-700 hover:text-white",
    outline:
      "border border-gray-300 bg-transparent text-gray-100 hover:bg-gray-700 hover:text-white",
  },
};

const buttonSizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-9 w-9",
};

const buttonWeightClasses: Record<Weight, string> = {
  bold: "font-bold",
  medium: "font-medium",
};

const buttonShapeClasses: Record<Shape, string> = {
  default: "rounded-lg",
  pill: "rounded-full",
};

export type ButtonProps = {
  asChild?: boolean;
  variant?: Variant;
  tone?: Tone;
  weight?: Weight;
  size?: Size;
  shape?: Shape;
  className?: string;
} & React.ComponentPropsWithRef<"button">;

export default function Button({
  asChild = false,
  variant = "primary",
  tone = "default",
  weight = "medium",
  size = "lg",
  shape = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "font-sans inline-flex items-center justify-center transition-[transform_opacity] focus:outline-none focus:ring focus:ring-offset-px ring-primary tracking-custom cursor-pointer disabled:opacity-70 disabled:shadow-none duration-300 hover:-translate-y-px gap-2.5 [&>svg]:size-4 whitespace-nowrap rounded text-sm disabled:pointer-events-none",
        buttonVariantClasses[variant]?.[tone],
        buttonSizeClasses[size],
        buttonWeightClasses[weight],
        buttonShapeClasses[shape],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

Button.displayName = "Button";
