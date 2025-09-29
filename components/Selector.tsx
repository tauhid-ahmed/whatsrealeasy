import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type SelectorType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  className?: string;
};

export default function Selector({
  value,
  setValue,
  options,
  className,
}: SelectorType) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={cn(className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
