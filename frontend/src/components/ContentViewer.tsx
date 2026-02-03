import { useEffect, useState } from "react";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot } from "lexical";

type Props = {
  editorState: string;
  className?: string;
  inText?: boolean;
};

function ReadOnlyContentPlugin({ isText }: { isText: boolean }) {
  const [editor] = useLexicalComposerContext();
  const [content, setContent] = useState("");

  useEffect(() => {
    editor.getEditorState().read(() => {
      const content = isText
        ? $getRoot().getTextContent()
        : $generateHtmlFromNodes(editor);
      setContent(content);
      console.log(content);
    });
  }, [editor]);

  return isText ? (
    <div
      className="line-clamp-2
          text-[16px]
          font-normal"
    >
      {content}
    </div>
  ) : (
    <div
      className="content-viewer max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

const ContentViewer = ({ editorState, inText = true }: Props) => {
  const editor: InitialConfigType = {
    namespace: "viewer",
    editable: false,
    editorState,
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode],
    onError(error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={editor}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<></>}
        placeholder={null}
      />
      <ReadOnlyContentPlugin isText={inText} />
    </LexicalComposer>
  );
};

export default ContentViewer;
