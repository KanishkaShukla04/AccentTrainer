"use client";
import { useState } from "react";
import { wordPairs } from "../data/words";

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = () => {
    const input = word.toLowerCase().trim();

    const match = wordPairs.find(
      (item) =>
        item.us.toLowerCase() === input ||
        item.uk.toLowerCase() === input
    );

    setResult(match || { us: "Not found", uk: "Not found" });
  };

  const speak = (text: string, accent: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent === "uk" ? "en-GB" : "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] text-center">
        
        <h1 className="text-3xl font-bold text-white mb-6">
          🌍 Accent Trainer
        </h1>

        <input
          className="w-full p-3 rounded-lg text-black outline-none"
          placeholder="Type a word..."
          value={word}
          onChange={(e) => {
            const value = e.target.value;
            setWord(value);

            if (!value.trim()) {
              setSuggestions([]);
              return;
            }

            const filtered = wordPairs.filter((item) =>
              item.us.toLowerCase().includes(value.toLowerCase()) ||
              item.uk.toLowerCase().includes(value.toLowerCase())
            );

            setSuggestions(filtered.slice(0, 5));
          }}
        />

        {suggestions.length > 0 && (
          <div className="mt-2 w-full bg-black/60 rounded-lg text-white">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  setWord(item.us);
                  setSuggestions([]);
                  setResult(item);
                }}
              >
                {item.us} ↔ {item.uk}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSearch}
          className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
        >
          Compare
        </button>

        {result && (
          <div className="mt-6 text-white space-y-4">
            
            <div className="bg-black/40 p-3 rounded-lg">
              <p className="text-sm opacity-70">🇺🇸 US</p>
              <p className="text-lg font-semibold">{result.us}</p>
              <button onClick={() => speak(result.us, "us")}>
                🔊 Play
              </button>
            </div>

            <div className="bg-black/40 p-3 rounded-lg">
              <p className="text-sm opacity-70">🇬🇧 UK</p>
              <p className="text-lg font-semibold">{result.uk}</p>
              <button onClick={() => speak(result.uk, "uk")}>
                🔊 Play
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}