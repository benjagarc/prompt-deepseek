// app/page.tsx
import PromptBuilder from "../components/PromptBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <PromptBuilder />
    </main>
  );
}
