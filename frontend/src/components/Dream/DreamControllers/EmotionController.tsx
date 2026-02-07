import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";

import type { DreamControlType } from "../../../types/dream.type";

type PropsType = {
  control: DreamControlType;
};

const EmotionController = ({ control }: PropsType) => {
  return (
    <Controller
      name="emotion"
      control={control}
      render={({ field, fieldState }) => (
        <Field {...field} data-state={fieldState.invalid}>
          <FieldLabel htmlFor="emotion">Emotion</FieldLabel>
          <Input
            {...field}
            id="emotion"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default EmotionController;
