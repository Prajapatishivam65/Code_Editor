"use client";

import CodeEditorPlatform from "@/components/code-editor-platform";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 flex">
        <CodeEditorPlatform />
      </main>
    </div>
  );
}
