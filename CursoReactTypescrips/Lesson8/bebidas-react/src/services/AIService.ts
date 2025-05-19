import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true
});

export const generateRecipe = async (prompt: string) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'system', content: 'Eres un experto en crear recetas de bebidas' },
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0]?.message?.content ?? 'No se pudo generar la receta';
};
