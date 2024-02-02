import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

type DayPickerProps = {
  value: Date;
  onChange: (value?: Date) => void;
};
export const DatePicker = (props: DayPickerProps) => {
  const { value, onChange } = props;
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div
          className={cn(
            "w-full border-[1.5px] border-slate-200 rounded-md flex items-center h-10 justify-start text-left font-normal px-3",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
