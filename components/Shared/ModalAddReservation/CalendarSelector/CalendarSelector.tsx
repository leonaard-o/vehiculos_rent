"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarSelectorProps } from "./CalendarSelector.types";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function CalendarSelector(props: CalendarSelectorProps) {
  const { setDateSelected, className, carPriceDay } = props;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(), // Inicia con la fecha actual
    to: addDays(new Date(), 1), // Inicia con el día siguiente
  });

  useEffect(() => {
    setDateSelected({
      from: date?.from,
      to: date?.to,
    });
  }, [date, setDateSelected]);

  const calculateDaysBetween = (from: Date, to: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const diffInTime = to.getTime() - from.getTime(); // Diferencia en milisegundos
    return Math.ceil(diffInTime / oneDay); // Diferencia en días (sin sumar 1)
  };

  const daysBetween = date?.from && date?.to ? calculateDaysBetween(date.from, date.to) : 0;

  return (
    <div className={cn("grid gap-2", className)}>
      {date?.from && date?.to && (
        <>
          <div className="mt-4 text-lg text-black">
            <span>Total days: {daysBetween}</span>
          </div>
          <div className="mb-4 text-md">
            <span>Total price: {daysBetween * parseInt(carPriceDay)} $ (Tax. included)</span>
          </div>
        </>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2 text-orange-600" strokeWidth={2} />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={{ before: new Date() }} // Deshabilita días anteriores al actual
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}