import { ToolSection } from "@/types/Tool";

export const TOOLBAR_SECTIONS: ToolSection[] = [
  {
    title: "Texto",
    tools: [
      {
        label: "Título",
        icon: "🅣",
        block: (createBlock) =>
          createBlock({
            type: "title",
            content: "Nuevo Título",
            fontSize: 32,
            fontWeight: "bold",
          }),
      },

      {
        label: "Texto",
        icon: "📝",
        block: (createBlock) =>
          createBlock({
            type: "text",
            content: "Escribe aquí...",
            fontSize: 18,
          }),
      },
    ],
  },

  {
    title: "Imágenes",
    component: "ImageUploader",
  },

  {
    title: "Stickers",
    component: "StickerPicker",
  },

  {
    title: "Código",
    component: "CodeSnippetPicker",
  },

  {
    title: "Citas",
    component: "QuoteGenerator",
  },
];
