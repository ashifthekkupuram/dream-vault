import { Controller } from "react-hook-form";

import { Editor } from "../../blocks/editor-00/editor";
import { Field, FieldError } from "../../ui/field";

import type { DreamControlType } from "../../../types/dream.type";

const parseEditorState = (value: string) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
};

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
          <Editor
            editorSerializedState={parseEditorState(field.value)}
            onSerializedChange={(value) =>
              field.onChange(JSON.stringify(value))
            }
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ContentController;
