type Props = {
  listening: boolean;
  startListening: () => void;
};

export default function VoiceButton({
  listening,
  startListening,
}: Props) {
  return (
    <button
      onClick={startListening}
      className={`mt-3 w-full py-2 rounded-lg transition-all ${
        listening
          ? "bg-red-500 animate-pulse"
          : "bg-green-500 hover:scale-105"
      }`}
    >
      🎤 {listening ? "Listening..." : "Speak Word"}
    </button>
  );
}