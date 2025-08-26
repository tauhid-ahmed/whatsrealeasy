import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export type PopoverWrapperProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
};

export function PopoverWrapper({
  open,
  onOpenChange,
  trigger,
  children,
  side = "bottom",
  align = "center",
  className,
}: PopoverWrapperProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {trigger ? <PopoverTrigger asChild>{trigger}</PopoverTrigger> : null}

      <PopoverContent
        side={side}
        align={align}
        className={cn(
          "z-50 max-w-96 w-full rounded-xl border border-border bg-dark2 p-4 shadow-lg outline-none",
          className
        )}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopoverWrapper;
