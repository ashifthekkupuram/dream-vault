import { Controller } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { MoodsEnum } from "../../../schemas";
import type { DreamControlType } from "../../../types/dream.type";

type PropsType = {
  control: DreamControlType;
};

const MoodController = ({ control }: PropsType) => {
  return (
    <Controller
      name="mood"
      control={control}
      render={({ field, fieldState }) => (
        <Field
          {...field}
          orientation="horizontal"
          data-state={fieldState.invalid}
          className="w-fit gap-4"
        >
          <FieldLabel htmlFor="mood">Mood :</FieldLabel>
          <Select
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={field.value ? field.value : "Please select a mood"}
              />
            </SelectTrigger>
            <SelectContent id="mood">
              <SelectGroup>
                {MoodsEnum.options.map((mood) => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default MoodController;
