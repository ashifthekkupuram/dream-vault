import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarIcon } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "../components/ui/input-group";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Spinner } from "../components/ui/spinner";

import { cn } from "../lib/utils";
import { dreamScheme, MoodsEnum } from "../schemas";
import { UseAuthenticatedAxios } from "../api/axios";
import useDreamEdit from "../hooks/useDreamEdit";
import type { DreamType } from "../types/dream.type";
import type { SerializedEditorState } from "lexical";
import { Editor } from "../components/blocks/editor-00/editor";

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "What have i dreamed today :/",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

const DreamEdit = () => {
  const { loading, error: editingError, editDream } = useDreamEdit();

  const { dreamId } = useParams();
  const navigate = useNavigate();
  const axios = UseAuthenticatedAxios();

  const {
    data: dream,
    isFetching,
    error: fetchingError,
  } = useQuery({
    queryKey: ["dream", dreamId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/dream/${dreamId}`);
        const data: DreamType = response.data.data;
        form.setValue("content", data.content);
        form.setValue("dreamedOn", new Date(data.dreamedOn));
        form.setValue("emotion", data.emotion);
        form.setValue("isLucid", data.isLucid);
        form.setValue("mood", data.mood);
        form.setValue("tags", data.tags);
        return response.data.data;
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data.message || "Internal Server Error"
            : "Internal Server Error";
        throw new Error(errorMessage);
      }
    },
    enabled: !!dreamId,
  });

  const [tagInput, setTagInput] = useState<string>("");

  const form = useForm<z.infer<typeof dreamScheme>>({
    resolver: zodResolver(dreamScheme),
    defaultValues: {
      content: JSON.stringify(initialValue),
      dreamedOn: new Date(),
      emotion: "",
      isLucid: false,
      tags: [],
      mood: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof dreamScheme>) =>
    editDream(values, String(dreamId));

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("dreamedOn", date);
    }
  }

  function handleTimeChange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: "hour" | "minute" | "ampm",
    value: string,
  ) {
    e.preventDefault();
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

  const disabled =
    loading ||
    (form.getValues("content") === dream.content &&
      new Date(form.getValues("dreamedOn")) === new Date(dream.dreamedOn) &&
      form.getValues("emotion") === dream.emotion &&
      form.getValues("isLucid") === dream.isLucid &&
      form.getValues("mood") === dream.mood &&
      form.getValues("tags") === dream.tags);

  return (
    <div className="container mx-auto">
      <div className="flex justify-start items-center gap-3 py-5 w-full">
        <Button onClick={() => navigate("/dreams")} variant="ghost">
          {" "}
          <ArrowLeft />{" "}
        </Button>
        <h3 className="font-semibold text-2xl">Edit Your Dream</h3>
      </div>
      {isFetching ? (
        <div className="flex justify-center items-center w-full mt-10">
          <Spinner className="size-10" />
        </div>
      ) : fetchingError ? (
        <div
          className={cn(
            "flex justify-center items-center w-full mt-10 text-destructive capitalize text-xl font-light",
          )}
        >
          {fetchingError.message}
        </div>
      ) : dream ? (
        <form className="px-12" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Content Field */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-state={fieldState.invalid}>
                  <Editor
                    editorSerializedState={JSON.parse(field.value)}
                    onSerializedChange={(value) =>
                      field.onChange(JSON.stringify(value))
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Tags Field  */}
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-state={fieldState.invalid}>
                  <FieldLabel htmlFor="tags">Tags</FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type="text"
                      id="tags"
                      value={tagInput}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" ||
                          e.key === "," ||
                          e.key === " "
                        ) {
                          e.preventDefault();
                          const newTag = tagInput.trim().toLocaleLowerCase();

                          if (!newTag) return;

                          if (field.value.includes(newTag)) {
                            setTagInput("");
                            return;
                          }

                          field.onChange([...field.value, newTag]);
                          setTagInput("");
                        }
                      }}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.map((tag, index) => (
                          <Card
                            className={cn(
                              `p-0 py-1 px-3 cursor-pointer hover:bg-destructive hover:text-shadow-destructive-foreground`,
                            )}
                            key={index}
                            onClick={() =>
                              field.onChange(
                                field.value.filter((t) => t !== tag),
                              )
                            }
                          >
                            {tag}
                          </Card>
                        ))}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Emotion Field */}
            <Controller
              name="emotion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field {...field} data-state={fieldState.invalid}>
                  <FieldLabel htmlFor="emotion">Emotion</FieldLabel>
                  <Input
                    {...field}
                    id="emotion"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Is Lucid Field */}
            <Controller
              name="isLucid"
              control={form.control}
              defaultValue={false}
              render={({ field, fieldState }) => (
                <Field
                  {...field}
                  orientation="horizontal"
                  data-state={fieldState.invalid}
                  className="max-w-25"
                >
                  <FieldLabel htmlFor="isLucid">is Lucid :</FieldLabel>
                  <Checkbox
                    id="isLucid"
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Mood Field  */}
            <Controller
              name="mood"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  {...field}
                  orientation="horizontal"
                  data-state={fieldState.invalid}
                  className="max-w-60"
                >
                  <FieldLabel htmlFor="mood">Mood :</FieldLabel>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={dream.mood} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup id="mood">
                        {MoodsEnum.options.map((mood) => (
                          <SelectItem key={mood} value={mood}>
                            {mood}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Dreamed On Field */}
            <Controller
              name="dreamedOn"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  {...field}
                  orientation="horizontal"
                  data-state={fieldState.invalid}
                >
                  <FieldLabel name="dreamedOn">Dreamed On</FieldLabel>
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
                          <span>MM/DD/YYYY hh:mm aa</span>
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
                          id="dreamedOn"
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
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getHours() % 12 === hour % 12
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={(e) =>
                                      handleTimeChange(
                                        e,
                                        "hour",
                                        hour.toString(),
                                      )
                                    }
                                  >
                                    {hour}
                                  </Button>
                                ))}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={(e) =>
                                      handleTimeChange(
                                        e,
                                        "minute",
                                        minute.toString(),
                                      )
                                    }
                                  >
                                    {minute.toString().padStart(2, "0")}
                                  </Button>
                                ),
                              )}
                            </div>
                            <ScrollBar
                              orientation="horizontal"
                              className="sm:hidden"
                            />
                          </ScrollArea>
                          <ScrollArea className="">
                            <div className="flex sm:flex-col p-2">
                              {["AM", "PM"].map((ampm) => (
                                <Button
                                  key={ampm}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    ((ampm === "AM" &&
                                      field.value.getHours() < 12) ||
                                      (ampm === "PM" &&
                                        field.value.getHours() >= 12))
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={(e) => {
                                    handleTimeChange(e, "ampm", ampm);
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {editingError && (
              <FieldError errors={[{ message: editingError }]} />
            )}
          </FieldGroup>
          <Button disabled={disabled} className="mt-6" type="submit">
            Edit Dream
          </Button>
        </form>
      ) : (
        <div className="flex justify-center items-center w-full mt-10 capitalize text-xl font-light">
          Could not get dream to edit
        </div>
      )}
    </div>
  );
};

export default DreamEdit;
