import { useState } from "react";
import { generateRecipe } from "../services/AIService";

export default function GenerateAI() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult("Generando...");
    const text = await generateRecipe(prompt);
    setResult(text);
  };

  return (
    <>
      <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
          <div className="relative">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit" aria-label="Enviar" className="absolute top-1/2 right-5 -translate-y-1/2">
              🔍
            </button>
          </div>
        </form>

        <div className="py-10 whitespace-pre-wrap">
          {result}
        </div>
      </div>
    </>
  );
}
