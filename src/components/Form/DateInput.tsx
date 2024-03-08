import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import clsx from "clsx";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DateInputProps {
  date: string;
  onChange: (date: string) => void;
  label: string;
  placeholder: string;
}

const DateInput = ({ date, onChange, label, placeholder }: DateInputProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <label className="mb-1 mt-2 block font-normal">{label}</label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={clsx(
              " justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {date ? (
              format(new Date(date), "dd/MM/yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(date)}
            onSelect={(day) => {
              onChange(day?.toDateString() ?? new Date().toString());
              setPopoverOpen(false);
            }}
            fromDate={new Date("2023-10-07")}
            required
            locale={he}
            dir="rtl"
            initialFocus
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateInput;
