import { useEditor, EditorContent } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "../lib/utils";
import TipTapMenuBar from "./TipTapMenuBar";

type PropsType = {
  value: string;
  onChange: (...events: any[]) => void;
};

const TipTap = ({ value, onChange }: PropsType) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyleKit.configure({
        fontSize: {
          types: ["textStyle"],
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral dark:prose-invert",
          "prose-sm sm:prose-base lg:prose-lg ",
          "max-w-none focus:outline-none ",
          "min-h-[300px] px-4 py-3",
          "bg-input/30 text-gray-900 dark:text-gray-100",
        ),
      },
    },
    content: value,
    onCreate({ editor }) {
      editor.commands.setFontSize("18px");
      editor.commands.setFontFamily("Inter, system-ui, sans-serif");
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <TipTapMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TipTap;
