
// Página principal: Temporizador bonito y centrado

import Timer from "@/components/Timer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center justify-center py-10">
      <h1 className="mb-4 text-4xl md:text-5xl font-black text-purple-700 drop-shadow animate-fade-in">
        Tick Tock Web Clock
      </h1>
      <p className="mb-10 text-lg md:text-xl text-gray-600 animate-fade-in">
        Un temporizador simple y elegante para tu día a día.
      </p>
      <Timer />
      <footer className="mt-16 text-xs text-gray-400">
        Hecho con <span className="text-purple-500 font-bold">♥</span> por Lovable
      </footer>
    </div>
  );
};

export default Index;
