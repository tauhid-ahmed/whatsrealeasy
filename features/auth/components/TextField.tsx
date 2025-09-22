"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  redirectLink?: React.ReactNode;
} & React.ComponentProps<"input">;

export default function TextField({
  label,
  name,
  placeholder,
  type = "text",
  className,
  required,
  children,
  redirectLink,
}: TextFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-0.5", className)}>
          <FormLabel className="flex justify-between items-center text-gray-100 text-sm">
            {required ? (
              <div className="flex items-center gap-2 justify-between">
                <span className="inline-flex items-center gap-1">
                  {label}
                  <span className="text-destructive font-bold text-base leading-0">
                    *
                  </span>
                </span>
                {redirectLink}
              </div>
            ) : (
              <>
                {label} {redirectLink}
              </>
            )}
          </FormLabel>
          <FormControl>
            {children ? (
              <div className="relative">
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  className={cn(
                    "rounded placeholder:text-xs placeholder:text-gray-200 text-gray-100 border-gray-300",
                    children && "pr-9"
                  )}
                />
                {children}
              </div>
            ) : (
              <Input
                className="rounded-2xl placeholder:text-xs placeholder:text-gray-200 text-gray-200 border-gray-300"
                {...field}
                placeholder={placeholder}
                type={type}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
