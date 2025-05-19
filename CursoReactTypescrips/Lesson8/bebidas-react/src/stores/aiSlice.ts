import type { StateCreator } from 'zustand'
import { generateRecipe } from '../services/AIService'

export type AISlice = {
    recipe: string
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
  recipe: '',
  isGenerating: false,
generateRecipe: async (prompt) => {
  set({ recipe: '', isGenerating: true });

  const result = await generateRecipe(prompt); // usa directamente la función importada

  set({
    recipe: result,
    isGenerating: false
  });
}
})