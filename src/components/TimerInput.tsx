
import React, { useState } from "react";

interface TimerInputProps {
  onSet: (minutes: number, seconds: number) => void;
  disabled: boolean;
}

const TimerInput: React.FC<TimerInputProps> = ({ onSet, disabled }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (minutes < 0 || seconds < 0 || seconds > 59) return;
    onSet(minutes, seconds);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-3 mb-6 animate-fade-in"
    >
      <input
        type="number"
        min={0}
        max={99}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        disabled={disabled}
        className="w-16 px-3 py-2 border rounded-lg text-2xl text-center bg-white/70 shadow focus:outline-primary"
        aria-label="Minutos"
      />
      <span className="text-2xl font-bold text-purple-600">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
        disabled={disabled}
        className="w-16 px-3 py-2 border rounded-lg text-2xl text-center bg-white/70 shadow focus:outline-primary"
        aria-label="Segundos"
      />
      <button
        type="submit"
        disabled={disabled}
        className="ml-3 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow transition-all hover:scale-105 active:scale-100 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Establecer
      </button>
    </form>
  );
};

export default TimerInput;
