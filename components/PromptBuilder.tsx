"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PromptBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [record, setRecord] = useState<string[]>([]);

  const generatePrompt = async () => {
    setLoading(true);
    setRecord((prev) => [...prev, prompt]);
    const res = await fetch("/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, data.message]);
    setLoading(false);
    setPrompt(() => "");
  };

  return (
    <div className="mx-auto px-4 flex flex-col h-screen justify-between w-2/3 gap-4">
      <h1 className="text-3xl text-center font-bold text-secondary mb-6 mt-2">
        Generador de Prompts IA
      </h1>
      {loading && <p className="text-white">Generando respuesta...</p>}
      <>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <>
              <p>{record[index] ?? ""}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-accent  font-mono shadow-lg whitespace-pre-line min-h-[70vh] text-ellipsis overflow-y-auto overflow-x-hidden"
                key={index}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message}
                </ReactMarkdown>
              </motion.div>
            </>
          ))}
      </>
      <div className="space-y-4 mb-6">
        <textarea
          className="w-full p-2 rounded backdrop-blur-md bg-white/10 text-white"
          rows={4}
          placeholder="Escribe tu prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          disabled={prompt.length === 0}
          onClick={generatePrompt}
          className="bg-primary text-white font-semibold px-4 py-2 rounded w-full"
        >
          Generar Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptBuilder;
