"use client";

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
  height?: string;
  className?: string;
}

export default function CodeEditor({
  code,
  language,
  onChange,
  height = "100%",
  className = "",
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Prevent hydration errors with CodeMirror
  useEffect(() => {
    setMounted(true);
  }, []);

  const getLanguageExtension = () => {
    switch (language.toLowerCase()) {
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "python":
        return python();
      default:
        return python();
    }
  };

  const getLanguageName = () => {
    switch (language.toLowerCase()) {
      case "java":
        return "Java";
      case "cpp":
        return "C++";
      case "python":
        return "Python";
      default:
        return "Python";
    }
  };

  if (!mounted) {
    return (
      <div
        className={`h-full w-full border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 animate-pulse ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getLanguageName()}
          </span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <CodeMirror
          value={code}
          height={height}
          theme={theme === "dark" ? vscodeDark : xcodeLight}
          extensions={[getLanguageExtension()]}
          onChange={onChange}
          className="text-base"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  );
}
