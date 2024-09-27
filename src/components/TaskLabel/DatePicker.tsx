import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "../ui/ui_elements/popover";
import { format, isValid, parse } from "date-fns";
import { Input } from "../ui/ui_elements/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/ui_elements/calendar";

export interface DateInputProps {
  date: Date | undefined, 
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

export function DateInput({date, setDate}:DateInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(()=>{
    if(!!inputValue){
      const parsedDate = parse(inputValue, "P", new Date());
      if (isValid(parsedDate)) {
        setDate(parsedDate)
      }
    }
  }, [inputValue]);

  useEffect(()=>{
    if(!!date) setInputValue(format(date, "P"));
  }, [date]);

  function handleCalendarSelect(calendarDate: Date | undefined) {
    if(!!calendarDate) {
      setDate(calendarDate);
      setIsOpen(false);
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <PopoverAnchor asChild>
          <Input
            type="text"
            placeholder="Pick a date"
            value={inputValue}
            onChange={e => setInputValue(e?.target.value)}
            className="w-full pr-10"
            onFocus={()=>setIsOpen(true)}
          />
        </PopoverAnchor>
        <PopoverTrigger className="absolute right-0 top-0 h-full rounded-l-none">
          <CalendarIcon className="h-4 w-4" />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleCalendarSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}