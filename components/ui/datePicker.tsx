"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePicker({ value, onChange }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  // 🔄 Sincroniza quando o value externo mudar
  React.useEffect(() => {
    setDate(value ? new Date(value) : undefined);
  }, [value]);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      onChange(format(selected, "yyyy-MM-dd")); // formato ISO
    } else {
      onChange("");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-43 md:w-64 px-5 justify-start text-left font-normal bg-blue-MBRAS",
            !date && "text-white"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Choose the date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-blue-MBRAS text-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          classNames={{
            day_selected: "bg-blue-light"
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
