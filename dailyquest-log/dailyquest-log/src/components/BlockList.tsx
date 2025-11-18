"use client";

import { DayBlock } from "@/types/DayBlock";
import BlockEditor from "./BlockEditor";

interface Props {
  blocks: DayBlock[];
  onUpdate: (block: DayBlock) => void;
  onDelete: (id: string) => void;
}

export default function BlockList({ blocks, onUpdate, onDelete }: Props) {
  return (
    <div>
      {blocks.map((block) => (
        <BlockEditor
          key={block.id}
          block={block}
          onChange={onUpdate}
          onDelete={() => onDelete(block.id)}
        />
      ))}
    </div>
  );
}
