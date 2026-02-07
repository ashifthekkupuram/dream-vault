import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { ScrollBar, ScrollArea } from "../../ui/scroll-area";

import type { DreamFormType } from "../../../types/dream.type";
import { cn } from "../../../lib/utils";

type PropsType = {
  form: DreamFormType;
};

const DreamedOnController = ({ form }: PropsType) => {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("dreamedOn", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = form.getValues("dreamedOn") || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue("dreamedOn", newDate);
  }

  return (
    <Controller
      name="dreamedOn"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          {...field}
          orientation="horizontal"
          data-state={fieldState.invalid}
        >
          <FieldLabel>Dreamed On</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  format(field.value, "dd/MM/yyyy hh:mm aa")
                ) : (
                  <span>DD/MM/YYYY hh:mm aa</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              alignOffset={200}
              align="start"
              sideOffset={-70}
              className="w-auto p-0"
            >
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={handleDateSelect}
                />
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i + 1)
                        .reverse()
                        .map((hour) => (
                          <Button
                            type="button"
                            key={hour}
                            size="icon"
                            variant={
                              field.value &&
                              field.value.getHours() % 12 === hour % 12
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange("hour", hour.toString())
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            type="button"
                            key={minute}
                            size="icon"
                            variant={
                              field.value && field.value.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange("minute", minute.toString())
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ),
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="">
                    <div className="flex sm:flex-col p-2">
                      {["AM", "PM"].map((ampm) => (
                        <Button
                          type="button"
                          key={ampm}
                          size="icon"
                          variant={
                            field.value &&
                            ((ampm === "AM" && field.value.getHours() < 12) ||
                              (ampm === "PM" && field.value.getHours() >= 12))
                              ? "default"
                              : "ghost"
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => {
                            handleTimeChange("ampm", ampm);
                          }}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default DreamedOnController;
