import { useState } from "react";
import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "../../ui/input-group";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";

import { cn } from "../../../lib/utils";
import type { DreamControlType } from "../../../types/dream.type";

type PropsType = {
  control: DreamControlType;
};

const TagsController = ({ control }: PropsType) => {
  const [tagInput, setTagInput] = useState<string>("");

  return (
    <Controller
      name="tags"
      control={control}
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
                if (e.key === "Enter" || e.key === "," || e.key === " ") {
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
                {field.value.map((tag) => (
                  <Card
                    className={cn(
                      `p-0 py-1 px-3 cursor-pointer hover:bg-destructive hover:text-shadow-destructive-foreground`,
                    )}
                    key={tag}
                    onClick={() =>
                      field.onChange(field.value.filter((t) => t !== tag))
                    }
                  >
                    {tag}
                  </Card>
                ))}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default TagsController;
