"use client";

import { v4 as uuidv4 } from "uuid";
import { memo, useCallback } from "react";

export interface CodeSnippet {
  lang: string;
  code: string;
  label?: string; // visible name (opcional)
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

/** Snippets por defecto */
const DEFAULT_SNIPPETS: CodeSnippet[] = [
  {
    lang: "tsx",
    label: "Función TS",
    code: "function sum(a: number, b: number) { return a + b; }",
  },
  {
    lang: "react",
    label: "useState",
    code: "const [count, setCount] = useState(0);",
  },
  {
    lang: "next",
    label: "Componente Next",
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
          className="
            w-full text-left p-3 rounded-lg border
            bg-white hover:bg-neutral-100 active:bg-neutral-200
            border-neutral-200 transition-colors select-none
          "
        >
          {/* Title */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wide">
              {snip.label ?? snip.lang}
            </span>

            <span className="text-[10px] px-2 py-[1px] rounded bg-neutral-200 text-neutral-600">
              {snip.lang}
            </span>
          </div>

          {/* Code preview */}
          <pre className="text-xs max-h-[70px] overflow-hidden whitespace-pre-wrap text-neutral-700">
            {snip.code}
          </pre>
        </button>
      ))}
    </div>
  );
}

export default memo(CodeSnippetPicker);
