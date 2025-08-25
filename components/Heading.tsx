import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type FontWeight = "semibold" | "bold" | "regular" | "medium" | "light";
type FontSize = "h1" | "h2" | "h3";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: Variant;
  size?: FontSize;
  weight?: FontWeight;
  tracking?: string;
};

const fontSizeClasses: Record<FontSize, string> = {
  h1: "text-h2 lg:text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

const fontWeightClasses: Record<FontWeight, string> = {
  bold: "font-bold",
  semibold: "font-semibold",
  regular: "font-normal",
  medium: "font-medium",
  light: "font-light",
};

export default function Heading({
  as = "h2",
  size = "h2",
  weight = "semibold",
  tracking,
  className,
  children,
  ...props
}: HeadingProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "font-sans text-gray-950 leading-none",
        fontSizeClasses[size],
        fontWeightClasses[weight],
        tracking,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

Heading.displayName = "Heading";
