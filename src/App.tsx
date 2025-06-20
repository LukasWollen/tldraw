import React, { useState } from 'react';
import TldrawWrapper from './components/TldrawWrapper';
import ChatSidebar from './components/ChatSidebar';

export default function App() {
  const [editor, setEditor] = useState<any>(null);
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <TldrawWrapper onEditorReady={setEditor} />
      </div>
      <div className="w-80 border-l">
        <ChatSidebar editor={editor} />
      </div>
    </div>
  );
}
