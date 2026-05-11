"use client";
import ResultCard from "./components/ResultCard";
import VoiceButton from "./components/VoiceButton";
import SearchBox from "./components/SearchBox";
import Game from "./components/Game";
import { useState, useEffect } from "react";
import { wordPairs } from "../data/words";

export default function Home() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [listening, setListening] = useState(false);
  const [score, setScore] = useState(0);
  const [gameWord, setGameWord] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);

  const handleSearch = async () => {
    const input = word.toLowerCase().trim();

    const match = wordPairs.find(
      (item) =>
        item.us.toLowerCase() === input ||
        item.uk.toLowerCase() === input
    );

    if (match) {
      setResult(match);
      return;
    }

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });

      const data = await res.json();

      setResult({
        us: "AI Explanation 🤖",
        uk: data.result,
      });
    } catch (error) {
      setResult({
        us: "Error",
        uk: "AI service failed",
      });
    }
  };

  const speak = (text: string, accent: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent === "uk" ? "en-GB" : "en-US";
    speechSynthesis.speak(utterance);
  };
  const roastUser = () => {
  const randomRoast =
    roastLines[Math.floor(Math.random() * roastLines.length)];

  const utterance =
    new SpeechSynthesisUtterance(randomRoast);

  utterance.lang = "en-GB";
  utterance.pitch = 1.2;
  utterance.rate = 0.75;
  utterance.volume = 1.0;

  speechSynthesis.speak(utterance);
};
const calculateScore = (
  spoken: string,
  target: string
) => {
  spoken = spoken.toLowerCase().trim();
  target = target.toLowerCase().trim();

  if (spoken === target) return 100;

  let matches = 0;

  for (
    let i = 0;
    i < Math.min(spoken.length, target.length);
    i++
  ) {
    if (spoken[i] === target[i]) {
      matches++;
    }
  }

  return Math.floor(
    (matches / target.length) * 100
  );
};

const practicePronunciation = () => {
  if (
  !(window as any).SpeechRecognition &&
  !(window as any).webkitSpeechRecognition
) {
  alert("Speech Recognition not supported");
  return;
}
  if (!targetWord) return;
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event: any) => {
    const spoken =
      event.results[0][0].transcript;

    const score = calculateScore(
      spoken,
      targetWord
    );

    setPronunciationScore(score);
  };
};

const startListening = () => {
  if (
  !(window as any).SpeechRecognition &&
  !(window as any).webkitSpeechRecognition
) {
  alert("Speech Recognition not supported");
  return;
}
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.start();

  setListening(true);

  recognition.onresult = (event: any) => {
    const spokenText =
      event.results[0][0].transcript;

    setWord(spokenText);

    if (
      gameWord &&
      spokenText.toLowerCase().trim() ===
        gameWord.uk.toLowerCase()
    ) {
      setFeedback("🎯 Perfect pronunciation!");
      setScore((prev) => prev + 1);
    } else if (gameWord) {
      setFeedback(
        `❌ You said "${spokenText}" instead of "${gameWord.uk}"`
      );

      roastUser();
    }

    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };
};

const startGame = () => {
  const random =
    wordPairs[Math.floor(Math.random() * wordPairs.length)];

  setGameWord(random);
  setGameStarted(true);
  setFeedback("");
  setTimeLeft(10);
  setGameOver(false);
};
const roastLines = [
  "That was painfully incorrect.",
  "Even a potato would've guessed better.",
  "British people are disappointed in you.",
  "You just embarrassed the entire accent community.",
  "Absolutely tragic pronunciation skills.",
  "You lost. Spectacularly.",
  "That answer belongs in the bin.",
  "You just got roasted by the accent gods.",
  "Oh my Merlin, you're shit at this.",
  "Mate... that was linguistically offensive.",
"You speak English like it owes you money.",
"Even Google Translate gave up.",
"That pronunciation just caused international tension.",
"I've heard microwaves pronounce words better.",
"The UK has officially revoked your tea privileges.",
"You turned one syllable into a crime scene.",
"That answer was sponsored by confusion.",
"Your accent just slipped on a banana peel.",
"The pronunciation council will hear about this.",
"You sound like WiFi lag in human form.",
"Somewhere, an English teacher just fainted.",
"That wasn't English. That was emotional damage.",
"You attacked that word with confidence and still lost.",
"The vowels are filing a restraining order.",
"Your pronunciation has side effects.",
"You managed to disappoint two continents at once.",
"That sounded like autocorrect having a seizure.",
"The dictionary just closed itself.",
"Honestly impressive how wrong that was.",
"Even Siri would've hung up on you.",
"You pronounce things like a corrupted MP3 file.",
"That word deserved better treatment.",
"The British Museum wants to archive that disaster.",
"You unlocked a brand new incorrect pronunciation.",
"Your accent just rage quit.",
"The grammar gods are deeply unsettled.",
"You somehow added extra mistakes to one word.",
"That sounded like English in beta testing.",
"Spectacular failure. Truly cinematic.",
];
const checkAnswer = (answer: string) => {
  if (!gameWord|| gameOver) return;

  const correct =answer.toLowerCase() ===gameWord.uk.toLowerCase();

  if (correct) {
    setScore((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    setFeedback("✅ Correct!");
  } else {
    setStreak(0);
    roastUser();

    setFeedback(
      `❌ Wrong! Correct answer: ${gameWord.uk}`
    );
  }

  setTimeout(() => {
    startGame();
  }, 1500);
};
useEffect(() => {
  if (!gameStarted || gameOver) return;

  if (timeLeft === 0) {
    roastUser();
    setGameOver(true);
    setFeedback("💀 Time ran out!");
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [timeLeft, gameStarted, gameOver]);
  return (
<div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 flex items-center justify-center animate-gradient">     
<div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.4)] w-[360px] text-center border border-white/10">        
<h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">          
  🌍 Accent Trainer
        </h1>

        <SearchBox
  word={word}
  setWord={setWord}
  suggestions={suggestions}
  setSuggestions={setSuggestions}
  wordPairs={wordPairs}
  setResult={setResult}
  handleSearch={handleSearch}
/>

        {/* Voice Button */}
       <VoiceButton
  listening={listening}
  startListening={startListening}
/>

<Game
  gameStarted={gameStarted}
  gameWord={gameWord}
  score={score}
  streak={streak}
  timeLeft={timeLeft}
  gameOver={gameOver}
  feedback={feedback}
  startGame={startGame}
  checkAnswer={checkAnswer}
/>

{result && (
  <div className="mt-6 text-white space-y-4">

    <ResultCard
      title="🇺🇸 US"
      value={result.us}
      accent="us"
      speak={speak}
    />

    <ResultCard
      title="🇬🇧 UK"
      value={result.uk}
      accent="uk"
      speak={speak}
    />
    <button
  onClick={() => {
  setTargetWord(result.us);
  setPronunciationScore(null);
}}
  className="mt-3 w-full py-2 bg-cyan-500 rounded-lg hover:scale-105 transition"
>
  🎙 Practice Pronunciation
</button>

{targetWord && (
  <>
    <button
      onClick={practicePronunciation}
      className="mt-3 w-full py-2 bg-blue-500 rounded-lg hover:scale-105 transition"
    >
      🎤 Speak Now
    </button>

    {pronunciationScore !== null && (
      <div className="mt-4 text-cyan-300 font-bold">
        Pronunciation Accuracy: {pronunciationScore}%
      </div>
    )}
  </>
)}

  </div>
)}
    </div>
    </div>
  );
}