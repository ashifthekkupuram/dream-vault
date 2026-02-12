import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "lucide-react";

import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Toggle } from "./ui/toggle";

import { cn } from "../lib/utils";
import { menuBarStateSelector } from "../lib/tip-tap-menu-state";

const sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];

type PropsType = {
  editor: Editor | null;
};

const TipTapMenuBar = ({ editor }: PropsType) => {
  const [block, setBlock] = useState<string>("paragraph");
  const [fontSize, setFontSize] = useState<string>("18px");

  const editorState = useEditorState({
    editor: editor!,
    selector: menuBarStateSelector,
  });

  const onFormatBlockChange = (value: string) => {
    switch (value) {
      case "paragraph":
        editor?.chain().focus().setParagraph().run();
        break;
      case "heading1":
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "heading2":
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "heading3":
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        break;
    }
  };

  const onFontSizeChange = (value: string) => {
    editor?.chain().focus().setFontSize(value).run();
    setFontSize(value);
  };

  useEffect(() => {
    if (editorState.isParagraph) setBlock("paragraph");
    if (editorState.isHeading1) setBlock("heading1");
    if (editorState.isHeading2) setBlock("heading2");
    if (editorState.isHeading3) setBlock("heading3");
  }, [
    editorState.isParagraph,
    editorState.isHeading1,
    editorState.isHeading2,
    editorState.isHeading3,
  ]);

  useEffect(() => {
    if (editorState.fontSize) setFontSize(editorState.fontSize);
  }, [editorState.fontSize]);

  return (
    <div
      className={cn(
        "flex justify-start items-center gap-2 bg-input/30 py-2 px-2 rounded-md",
      )}
    >
      {/* Selecting Block Formats  */}
      <Select value={block} onValueChange={onFormatBlockChange}>
        <SelectTrigger>
          <SelectValue placeholder={block} />
        </SelectTrigger>
        <SelectContent className="transition-all">
          <SelectGroup>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
            <SelectItem value="heading3">Heading 3</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Selecting Font Size */}
      <Select value={fontSize} onValueChange={onFontSizeChange}>
        <SelectTrigger>
          <SelectValue placeholder={fontSize} />
        </SelectTrigger>
        <SelectContent className="transition-all">
          <SelectGroup>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Toggling Italic */}
      <Toggle
        pressed={editorState.isItalic}
        disabled={!editorState.canItalic}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        variant="outline"
        aria-label="Toggle italic"
      >
        <ItalicIcon />
        Italic
      </Toggle>
      {/* Toggling Bold */}
      <Toggle
        pressed={editorState.isBold}
        disabled={!editorState.canBold}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        variant="outline"
        aria-label="Toggle bold"
      >
        <BoldIcon />
        Bold
      </Toggle>
      {/* Toggling Strike */}
      <Toggle
        pressed={editorState.isStrike}
        disabled={!editorState.canStrike}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        variant="outline"
        aria-label="Toggle strike"
      >
        <StrikethroughIcon />
        Strike
      </Toggle>
    </div>
  );
};

export default TipTapMenuBar;
