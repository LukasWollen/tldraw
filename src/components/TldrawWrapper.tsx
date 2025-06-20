import React, { useRef, useCallback } from 'react';
import { Tldraw, TLShape, TLUiOverrides } from 'tldraw';
import 'tldraw/tldraw.css';

interface Props {
  onEditorReady?: (editor: any) => void;
}

export default function TldrawWrapper({ onEditorReady }: Props) {
  const editorRef = useRef<any>(null);

  const handleMount = useCallback((editor: any) => {
    editorRef.current = editor;
    onEditorReady?.(editor);
  }, [onEditorReady]);

  const toolsOverride: TLUiOverrides = {
    tools(editor, tools) {
      const { select, draw, geo, text } = tools;
      return {
        select,
        draw,
        geo,
        text,
      };
    },
  };

  return (
    <div className="w-full h-full">
      <Tldraw
        persistenceKey="ai-demo"
        overrides={toolsOverride}
        getShapeVisibility={(shape: TLShape) =>
          (shape as any).meta?.hidden ? 'hidden' : 'inherit'
        }
        onMount={handleMount}
      />
    </div>
  );
}
