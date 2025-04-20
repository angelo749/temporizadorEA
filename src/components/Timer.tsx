
import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Timer as TimerIcon } from "lucide-react";
import TimerInput from "./TimerInput";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const Timer: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Manejar el temporizador
  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => r - 1);
      }, 1000);
    } else if (remaining === 0 && isRunning) {
      setIsRunning(false);
      toast({
        title: "¡Tiempo finalizado!",
        description: "El temporizador llegó a cero.",
      });
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining]);

  // Para evitar múltiple intervalos
  useEffect(() => {
    if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isRunning]);

  const handleSet = (minutes: number, seconds: number) => {
    const clampedSec = Math.min(59, Math.max(0, seconds));
    const clampedMin = Math.max(0, minutes);
    const total = clampedMin * 60 + clampedSec;
    setTotalSeconds(total);
    setRemaining(total);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (remaining > 0) setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setRemaining(totalSeconds);
    setIsRunning(false);
  };

  // Cálculo de minutos:segundos
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fade-in">
      <div className="flex items-center mb-5">
        <span className="p-3 rounded-full bg-purple-100 shadow hover:scale-110 transition-transform mr-3">
          <TimerIcon className="text-purple-600 w-7 h-7" />
        </span>
        <h2 className="text-3xl font-bold text-purple-700">Temporizador</h2>
      </div>

      <TimerInput onSet={handleSet} disabled={isRunning} />

      <div className="my-6">
        <span
          className={`font-mono text-7xl font-bold transition-all duration-300
            ${
              !isRunning && "text-gray-500"
            } ${
              isRunning && "text-purple-700 animate-pulse"
            }`}
          aria-label="Tiempo restante"
        >
          {pad(mins)}:{pad(secs)}
        </span>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleStart}
          disabled={isRunning || remaining === 0}
          className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow transition-all hover:scale-105 active:scale-100 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Iniciar
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-6 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 text-white font-semibold shadow transition-all hover:scale-105 active:scale-100 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Pausar
        </button>
        <button
          onClick={handleReset}
          disabled={remaining === totalSeconds}
          className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold shadow transition-all hover:scale-105 active:scale-100 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Timer;
