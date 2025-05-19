// lib/ai.ts
import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true
});
