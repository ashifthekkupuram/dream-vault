import z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SerializedEditorState } from "lexical";
import { ArrowLeft } from "lucide-react";

import { FieldError, FieldGroup } from "../components/ui/field";
import { Button } from "../components/ui/button";

import { dreamScheme } from "../schemas";
import useDreamCreate from "../hooks/useDreamCreate";

import TagsController from "../components/Dream/DreamControllers/TagsController";
import EmotionController from "../components/Dream/DreamControllers/EmotionController";
import IsLucidController from "../components/Dream/DreamControllers/IsLucidController";
import MoodController from "../components/Dream/DreamControllers/MoodController";
import DreamedOnController from "../components/Dream/DreamControllers/DreamedOnController";
import ContentController from "../components/Dream/DreamControllers/ContentController";

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

const DreamCreate = () => {
  const { loading, error, createDream } = useDreamCreate();

  const navigate = useNavigate();

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

  const onSubmit = (values: z.infer<typeof dreamScheme>) => createDream(values);

  return (
    <div className="container mx-auto">
      <div className="flex justify-start items-center gap-3 py-5 w-full">
        <Button onClick={() => navigate("/dreams")} variant="ghost">
          {" "}
          <ArrowLeft />{" "}
        </Button>
        <h3 className="font-semibold text-2xl">Record Your Dream</h3>
      </div>
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
          <MoodController control={form.control} />
          {/* Dreamed On Field */}
          <DreamedOnController form={form} />
          {error && <FieldError errors={[{ message: error }]} />}
        </FieldGroup>
        <Button disabled={loading} className="mt-6" type="submit">
          Create Dream
        </Button>
      </form>
    </div>
  );
};

export default DreamCreate;
