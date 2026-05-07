type Props = {
  title: string;
  value: string;
  accent: string;
  speak: (text: string, accent: string) => void;
};

export default function ResultCard({
  title,
  value,
  accent,
  speak,
}: Props) {
  return (
    <div className="bg-black/50 p-4 rounded-xl border border-white/10 hover:scale-105 transition">
      <p className="text-sm opacity-70">{title}</p>

      <p className="text-lg font-semibold">
        {value}
      </p>

      <button
        onClick={() => speak(value, accent)}
      >
        🔊 Play
      </button>
    </div>
  );
}