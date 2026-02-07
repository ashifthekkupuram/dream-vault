import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Checkbox } from "../../ui/checkbox";

import type { DreamControlType } from "../../../types/dream.type";

type PropsType = {
  control: DreamControlType;
};

const IsLucidController = ({ control }: PropsType) => {
  return (
    <Controller
      name="isLucid"
      control={control}
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
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default IsLucidController;
