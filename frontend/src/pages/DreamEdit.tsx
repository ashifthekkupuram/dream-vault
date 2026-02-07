import z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import type { SerializedEditorState } from "lexical";
import { ArrowLeft } from "lucide-react";

import { FieldError, FieldGroup } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";

import { cn } from "../lib/utils";
import { dreamScheme } from "../schemas";
import type { DreamType } from "../types/dream.type";
import { UseAuthenticatedAxios } from "../api/axios";
import useDreamEdit from "../hooks/useDreamEdit";

import TagsController from "../components/Dream/DreamControllers/TagsController";
import IsLucidController from "../components/Dream/DreamControllers/IsLucidController";
import MoodController from "../components/Dream/DreamControllers/MoodController";
import DreamedOnController from "../components/Dream/DreamControllers/DreamedOnController";
import ContentController from "../components/Dream/DreamControllers/ContentController";
import EmotionController from "../components/Dream/DreamControllers/EmotionController";

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
            <ContentController control={form.control} />
            {/* Tags Field  */}
            <TagsController control={form.control} />
            {/* Emotion Field */}
            <EmotionController control={form.control} />
            {/* Is Lucid Field */}
            <IsLucidController control={form.control} />
            {/* Mood Field  */}
            <MoodController control={form.control} creating={false} />
            {/* Dreamed On Field */}
            <DreamedOnController form={form} />
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
