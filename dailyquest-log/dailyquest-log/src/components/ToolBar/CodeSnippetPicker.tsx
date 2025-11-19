"use client";

import { v4 as uuidv4 } from "uuid";
import { memo, useCallback } from "react";

export interface CodeSnippet {
  lang: string;
  code: string;
}

export interface CodeBlock {
  id: string;
  type: "code";
  content: string;
  language?: string;
}

interface Props {
  snippets?: CodeSnippet[];
  onSelect: (block: CodeBlock) => void;
}

const DEFAULT_SNIPPETS: CodeSnippet[] = [
  {
    lang: "tsx",
    code: "function sum(a: number, b: number) { return a + b; }",
  },
  {
    lang: "react",
    code: "const [count, setCount] = useState(0);",
  },
  {
    lang: "next",
    code: "export default function Page() { return <h1>Hello</h1>; }",
  },
];

function CodeSnippetPicker({ snippets = DEFAULT_SNIPPETS, onSelect }: Props) {
  const handleSelect = useCallback(
    (snip: CodeSnippet) => {
      onSelect({
        id: uuidv4(),
        type: "code",
        content: snip.code,
        language: snip.lang,
      });
    },
    [onSelect]
  );

  return (
    <div className="space-y-2">
      {snippets.map((snip) => (
        <button
          key={snip.code}
          onClick={() => handleSelect(snip)}
          className="w-full text-left bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 p-2 rounded border border-neutral-200 transition-colors"
          aria-label={`Insert ${snip.lang} snippet`}
        >
          <div className="text-[10px] font-medium text-neutral-500 mb-1 uppercase tracking-wide">
            {snip.lang}
          </div>
          <pre className="text-xs overflow-hidden max-h-[60px] whitespace-pre-wrap">
            {snip.code}
          </pre>
        </button>
      ))}
    </div>
  );
}

export default memo(CodeSnippetPicker);
