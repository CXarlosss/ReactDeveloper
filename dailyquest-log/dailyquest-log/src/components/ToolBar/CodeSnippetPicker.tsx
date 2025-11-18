"use client";

import { v4 as uuidv4 } from "uuid";

const SNIPPETS = [
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

interface Props {
  onSelect: (block: {
    id: string;
    type: "code";
    content: string;
    language?: string;
  }) => void;
}

export default function CodeSnippetPicker({ onSelect }: Props) {
  return (
    <div className="space-y-2">
      {SNIPPETS.map((snip) => (
        <button
          key={snip.code}
          onClick={() =>
            onSelect({
              id: uuidv4(),
              type: "code",
              content: snip.code,
              language: snip.lang,
            })
          }
          className="w-full text-left bg-neutral-100 hover:bg-neutral-200 p-2 rounded"
        >
          <pre className="text-xs overflow-hidden whitespace-nowrap">
            {snip.code}
          </pre>
        </button>
      ))}
    </div>
  );
}
