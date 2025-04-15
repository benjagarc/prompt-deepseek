// app/components/PromptBuilder.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PromptBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    setLoading(true);
    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.message);
    setLoading(false);
    setPrompt(() => "");
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">
        Generador de Prompts IA
      </h1>
      <div className="space-y-4">
        <textarea
          className="w-full p-2 rounded bg-gray-800 text-white"
          rows={4}
          placeholder="Escribe tu prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          disabled={prompt.length === 0}
          onClick={generatePrompt}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Generar Prompt
        </button>
        {loading && <p className="text-white">Generando respuesta...</p>}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 text-white rounded-xl p-4 shadow mt-4 whitespace-pre-line"
          >
            {result}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PromptBuilder;
