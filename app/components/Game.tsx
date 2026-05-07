type Props = {
  gameStarted: boolean;
  gameWord: any;
  score: number;
  streak: number;
  timeLeft: number;
  gameOver: boolean;
  feedback: string;
  startGame: () => void;
  checkAnswer: (answer: string) => void;
};

export default function Game({
  gameStarted,
  gameWord,
  score,
  streak,
  timeLeft,
  gameOver,
  feedback,
  startGame,
  checkAnswer,
}: Props) {
  return (
    <>
      <button
        onClick={startGame}
        className="mt-4 w-full py-2 rounded-lg bg-yellow-500 hover:scale-105 transition"
      >
        🎮 Start Game
      </button>

      {gameStarted && gameWord && (
        <div className="mt-6 bg-black/40 p-4 rounded-xl text-white">

          <p className="text-sm opacity-70">
            Score: {score} 🔥 Streak: {streak}
          </p>

          <p className="mt-2 text-yellow-300">
            ⏳ Time Left: {timeLeft}s
          </p>

          <h2 className="text-xl font-bold mt-2">
            Which is the 🇬🇧 UK word for:
          </h2>

          <p className="text-2xl mt-3 text-purple-300">
            {gameWord.us}
          </p>

          <div className="mt-4 space-y-2">

            <button
              onClick={() => checkAnswer(gameWord.uk)}
              className="w-full py-2 bg-green-500 rounded-lg hover:scale-105 transition"
            >
              {gameWord.uk}
            </button>

            <button
              onClick={() => checkAnswer(gameWord.us)}
              className="w-full py-2 bg-red-500 rounded-lg hover:scale-105 transition"
            >
              {gameWord.us}
            </button>

          </div>

          {feedback && (
            <p className="mt-4 font-semibold">
              {feedback}
            </p>
          )}

          {gameOver && (
            <div className="mt-4 text-red-400 font-bold text-xl">
              💀 Game Over!
            </div>
          )}

        </div>
      )}
    </>
  );
}