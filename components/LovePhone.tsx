import React, { useState, useEffect, useRef } from 'react';
import { Phone, Volume2, Heart, Loader2, Sparkles } from 'lucide-react';

const LovePhone: React.FC = () => {
  const FIXED_MESSAGE = "感謝你抽到我的禮物 這是一個愛的話筒這份禮物希望你能夠把愛說出來（ps 我不確定您是那種型號所以附贈兩款轉接）";
  const [message, setMessage] = useState<string>('拿起電話，聽聽這份禮物的心聲...');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Use ref to keep track of utterance to prevent garbage collection issues
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePickUp = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setMessage(FIXED_MESSAGE);
    setHasStarted(true);

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(FIXED_MESSAGE);

    // Select a suitable voice (prefer Traditional Chinese)
    const voices = synth.getVoices();
    const zhVoice = voices.find(v => v.lang === 'zh-TW') || voices.find(v => v.lang.includes('zh'));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    utterance.rate = 0.9; // Slightly slower for emotion
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-red-50 rounded-2xl shadow-inner border-4 border-red-200 relative overflow-hidden h-full flex justify-center">
      {/* 播音時的圓圈擴散效果 */}
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="absolute w-64 h-64 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute w-48 h-48 bg-red-300 rounded-full animate-ping [animation-delay:0.5s]"></div>
        </div>
      )}

      <div className={`relative z-10 transition-all duration-300 ${isPlaying ? 'scale-110' : 'hover:scale-105'}`}>
        <div
          className={`w-28 h-28 bg-red-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-red-600 transition-all ${isPlaying ? 'animate-bounce ring-8 ring-red-200' : ''}`}
          onClick={handlePickUp}
        >
          {isPlaying ? (
            <Volume2 className="text-white w-14 h-14 animate-pulse" />
          ) : (
            <Phone className="text-white w-14 h-14" />
          )}

          {isPlaying && (
            <div className="absolute -top-4 -right-4 bg-yellow-400 p-2 rounded-full shadow-lg border-2 border-white">
              <Sparkles className="text-red-700 w-6 h-6 animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center relative z-10 w-full">
        <h3 className="text-red-800 font-bold text-2xl mb-3 flex items-center justify-center gap-2">
          <Heart className={`fill-red-500 text-red-500 w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
          愛的話筒
        </h3>

        <div className="min-h-[140px] p-5 bg-white rounded-2xl border-2 border-red-100 shadow-sm relative group flex items-center justify-center transition-all duration-500">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">
            Christmas Message
          </div>

          <p className={`leading-relaxed text-red-800 font-medium text-lg ${isPlaying ? 'animate-pulse scale-105' : ''} ${hasStarted ? 'opacity-100' : 'opacity-60'}`}>
            「{message}」
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-sm text-red-400 font-bold flex items-center justify-center gap-1">
            點擊話筒 <span className="text-red-600 font-black">讓愛大聲說出來</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LovePhone;
