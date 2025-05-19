import { streamText } from 'ai';
import { openai } from '../lib/ai';

export const generateRecipe = async (prompt: string) => {
  const result = await streamText({
    model: 'openrouter/meta-llama/llama-3.3-70b-instruct:free', // ✅ modelo como string
    prompt,
    api: openai // ✅ el cliente se pasa en la propiedad `api`
  });

  return result.textStream;
};
