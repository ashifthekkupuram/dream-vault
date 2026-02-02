import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

type Props = {
  editorState: any;
  className?: string;
};

const ContentViewer = ({ editorState, className }: Props) => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "viewer",
        editable: false,
        editorState,
        onError(error) {
          console.error(error);
        },
      }}
    >
      { /* Experimental only works with content starts with paragraphs */ }
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={
          <ContentEditable
            className={`prose max-w-none outline-none ${className}`}
          />
        }
        placeholder={null}
      />
    </LexicalComposer>
  );
};

export default ContentViewer;
