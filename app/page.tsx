// app/page.tsx
import PromptBuilder from "../components/PromptBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-base">
      <PromptBuilder />
    </main>
  );
}
