type Props = {
  word: string;
  setWord: (value: string) => void;
  suggestions: any[];
  setSuggestions: (value: any[]) => void;
  wordPairs: any[];
  setResult: (value: any) => void;
  handleSearch: () => void;
};

export default function SearchBox({
  word,
  setWord,
  suggestions,
  setSuggestions,
  wordPairs,
  setResult,
  handleSearch,
}: Props) {
  return (
    <>
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

          const filtered = wordPairs.filter(
            (item) =>
              item.us
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              item.uk
                .toLowerCase()
                .includes(value.toLowerCase())
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
    </>
  );
}