import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import LovePhone from './components/LovePhone';
import TravelCalendar from './components/TravelCalendar';
import { CardState } from './types';
import { Gift, Heart, Plane, Star, Music } from 'lucide-react';

const App: React.FC = () => {
  const [cardState, setCardState] = useState<CardState>(CardState.CLOSED);
  const [activeTab, setActiveTab] = useState<'phone' | 'calendar'>('phone');

  const openCard = () => {
    setCardState(CardState.OPENING);
    // 縮短過渡時間，讓互動感更即時
    setTimeout(() => setCardState(CardState.OPENED), 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#0c1445]">
      {/* 背景裝飾：飄雪與星星 */}
      <Snowfall />
      <div className="absolute top-10 right-10 animate-pulse">
        <Star className="text-yellow-300 fill-yellow-300 w-12 h-12 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
      </div>

      {/* 卡片主體 */}
      <div className="relative w-full max-w-4xl perspective-[1500px] z-10 flex items-center justify-center">
        
        <div className={`relative w-full transition-all duration-700 transform-style-3d ${cardState !== CardState.CLOSED ? 'scale-90 md:scale-100' : 'scale-100 hover:scale-105'}`}>
          
          {/* 卡片內部 (卡片展開後顯示) */}
          <div className={`
            bg-[#f8f9fa] rounded-3xl shadow-2xl p-6 md:p-12 min-h-[600px] flex flex-col md:flex-row gap-8 
            transition-all duration-700 
            ${cardState === CardState.OPENED ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
            
            {/* 側邊切換分頁 */}
            <div className="flex md:flex-col gap-4 order-2 md:order-1 justify-center">
              <button 
                onClick={() => setActiveTab('phone')}
                className={`flex-1 md:flex-none p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${activeTab === 'phone' ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-500 hover:bg-red-100'}`}
              >
                <Heart className={activeTab === 'phone' ? 'fill-white' : ''} />
                <span className="text-xs font-bold uppercase tracking-tighter">愛的話筒</span>
              </button>
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 md:flex-none p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${activeTab === 'calendar' ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-500 hover:bg-blue-100'}`}
              >
                <Plane className={activeTab === 'calendar' ? 'fill-white' : ''} />
                <span className="text-xs font-bold uppercase tracking-tighter">環球年曆</span>
              </button>
            </div>

            {/* 主要內容區 */}
            <div className="flex-1 order-1 md:order-2 flex flex-col">
              <div className="mb-6 text-center md:text-left">
                <h1 className="dancing-script text-4xl md:text-5xl text-red-600 mb-1">Merry Christmas</h1>
                <p className="text-gray-500 italic font-medium">這份禮物，載著我滿滿的心意與世界的祝福</p>
              </div>

              <div className="flex-1 transition-all duration-500 mb-4 min-h-[400px]">
                {activeTab === 'phone' ? (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full">
                    <LovePhone />
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full">
                    <TravelCalendar />
                  </div>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between opacity-60">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">China Airlines Special Gift</p>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-400"></div>
                   <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                </div>
              </div>
            </div>

            {/* 關閉按鈕 */}
            <button 
              onClick={() => setCardState(CardState.CLOSED)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-400 z-30"
            >
              ×
            </button>
          </div>

          {/* 卡片封面 (未展開前顯示) */}
          {cardState !== CardState.OPENED && (
            <div 
              onClick={openCard}
              className={`
                absolute inset-0 cursor-pointer rounded-3xl overflow-hidden shadow-2xl z-20 transition-all duration-700 origin-left
                ${cardState === CardState.OPENING ? 'rotate-y-[-110deg] opacity-0 pointer-events-none' : ''}
              `}
              style={{
                background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="absolute inset-0 border-8 border-yellow-400/30 m-4 rounded-2xl pointer-events-none"></div>
              
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="mb-8 relative">
                  <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full animate-pulse"></div>
                  <Gift className="w-24 h-24 text-yellow-300 drop-shadow-lg" />
                </div>
                
                <h2 className="dancing-script text-6xl mb-4 text-yellow-300">Christmas Gift</h2>
                <p className="text-xl mb-8 font-light tracking-widest opacity-90 uppercase">Open to Reveal Your Surprise</p>
                
                <div className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Music className="w-6 h-6" /></div>
                  <div className="bg-white/10 p-3 rounded-full"><Heart className="w-6 h-6" /></div>
                  <div className="bg-white/10 p-3 rounded-full"><Plane className="w-6 h-6" /></div>
                </div>

                <div className="mt-12 flex items-center gap-2 px-8 py-4 bg-yellow-400 text-red-900 font-black rounded-full shadow-lg hover:scale-110 transition-transform animate-pulse">
                  點擊開啟驚喜
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] opacity-30 uppercase tracking-[0.2em]">CAL Christmas Edition</div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full"></div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .perspective-[1500px] { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-[-110deg] { transform: rotateY(-110deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default App;