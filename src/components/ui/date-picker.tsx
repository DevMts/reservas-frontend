"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps extends React.ComponentProps<"input"> {
  setValue?: (name: "birthdate", value: string) => void;
}

export function DatePicker({
  className,
  type,
  setValue,
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  React.useEffect(() => {
    if (date && setValue) {
      setValue("birthdate", date.toISOString().split("T")[0]); // YYYY-MM-DD
    }
  }, [date, setValue]);

  return (
    <Popover>
      <input
        className={className}
        value={date && format(date, "yyyy-MM-dd")}
        type={type}
        {...props}
      />
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Escolha uma data</span>
          )}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
