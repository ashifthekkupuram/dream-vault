import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../../ui/field";

import type { DreamControlType } from "../../../types/dream.type";
import TipTap from "../../TipTap";

type PropsType = {
  control: DreamControlType;
};

const ContentController = ({ control }: PropsType) => {
  return (
    <Controller
      name="content"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-state={fieldState.invalid}>
          <FieldLabel>Content</FieldLabel>
          <TipTap value={field.value} onChange={field.onChange} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ContentController;
