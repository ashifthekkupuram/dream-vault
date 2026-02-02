import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "../../editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "../../editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "../../editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "../../editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "../../editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "../../editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "../../editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "../../editor/plugins/toolbar/block-format/format-quote";
import { FontColorToolbarPlugin } from "../../editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "../../editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontSizeToolbarPlugin } from "../../editor/plugins/toolbar/font-size-toolbar-plugin";
import { FontFormatToolbarPlugin } from "../../editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontFamilyToolbarPlugin } from "../../editor/plugins/toolbar/font-family-toolbar-plugin";
import { ActionsPlugin } from "../../editor/plugins/actions/actions-plugin";
import { CounterCharacterPlugin } from "../../editor/plugins/actions/counter-character-plugin";
import { EditModeTogglePlugin } from "../../editor/plugins/actions/edit-mode-toggle-plugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"


export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      <ToolbarPlugin>
        {({ blockType }) => (
          <>
            <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
              {/* text formatting plugin */}
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>
              {/* font size plugin */}
              <FontSizeToolbarPlugin />
              {/* font format plugin */}
              <FontFormatToolbarPlugin />
              {/* font family plugin */}
              <FontFamilyToolbarPlugin />
              {/* font color plugin */}
              <FontColorToolbarPlugin />
              <FontBackgroundToolbarPlugin />
            </div>
          </>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="min-h-[500px]" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <ListPlugin />
        <CheckListPlugin />
      </div>
      {/* actions plugins */}
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            {/* left side action buttons */}
          </div>
          <div>
            {/* character count plugin */}
            <CounterCharacterPlugin charset="UTF-16" />
          </div>
          <div className="flex flex-1 justify-end">
            {/* edit lock plugin */}
            <EditModeTogglePlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  );
}
