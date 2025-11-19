"use client";

import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import ToolbarButton from "./ToolbarButton";
import ToolbarSection from "./ToolbarSection";

import { TOOLBAR_SECTIONS } from "@/data/tools"; // catálogo de herramientas
import { createBlock } from "@/lib/createBlock"; // factory centralizada

// Mapeo de componentes especiales
const COMPONENT_MAP: Record<string, any> = {
  ImageUploader: dynamic(() => import("./ImageUploader")),
  ColorPicker: dynamic(() => import("./ColorPicker")),
  StickerPicker: dynamic(() => import("./StickerPicker")),
  CodeSnippetPicker: dynamic(() => import("./CodeSnippetPicker")),
  QuoteGenerator: dynamic(() => import("./QuoteGenerator")),
};

interface Props {
  onAddBlock: (block: any) => void;
  compact?: boolean;
}

function ToolBar({ onAddBlock, compact = false }: Props) {
  // Solo se calcula 1 vez
  const sections = useMemo(() => TOOLBAR_SECTIONS, []);

  return (
    <aside
      className={`
        fixed left-4 top-4
        ${compact ? "w-[72px]" : "w-[260px]"}
        bg-white/90 backdrop-blur-xl
        border border-neutral-200
        shadow-2xl rounded-2xl
        p-4 space-y-6 z-50
        transition-all duration-300
      `}
    >
      {sections.map((section) => {
        const DynamicComponent = section.component
          ? COMPONENT_MAP[section.component]
          : null;

        return (
          <ToolbarSection
            key={section.title}
            title={section.title}
            dense={compact}
            withDivider
          >
            {/* Botones simples */}
            {section.tools?.map((tool: any) => (
              <ToolbarButton
                key={tool.label}
                compact={compact}
                label={tool.label}
                icon={tool.icon}
                onClick={() => {
                  const block = tool.block
                    ? tool.block(createBlock)
                    : tool.action(createBlock);

                  onAddBlock(block);
                }}
              />
            ))}

            {/* Componentes interactivos */}
            {DynamicComponent && (
              <DynamicComponent
                onSelect={(payload: any) => {
                  const block =
                    payload?.id !== undefined
                      ? payload
                      : createBlock(payload);

                  onAddBlock(block);
                }}
              />
            )}
          </ToolbarSection>
        );
      })}
    </aside>
  );
}

export default memo(ToolBar);
