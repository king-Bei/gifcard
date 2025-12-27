
import React, { useState } from 'react';
import { Plane, MapPin, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { TravelDestination } from '../types';

const DEFAULT_ITINERARY: TravelDestination[] = [
  { 
    "month": "一月", 
    "city": "台北", 
    "country": "台灣", 
    "description": "迎接新年曙光，在台北101觀賞璀璨煙火，開啟充滿希望的一年。", 
    "image": "https://ak-d.tripcdn.com/images//0585812000qmyywde5E49_C_1080_607.jpg_.webp" 
  },
  { "month": "二月", "city": "東京", "country": "日本", "description": "漫步在淺草寺或是前往近郊賞梅，體驗初春的日式浪漫與寧靜。", "image": "https://www.bring-you.info/imgs/2019/05/senso-ji-1.jpg" },
  { "month": "三月", "city": "首爾", "country": "韓國", "description": "迎接櫻花季，在汝矣島旁感受粉色花海的浪漫氣息。", "image": "https://ytimg.yam.com/images/article/202402/2711005818.jpg" },
  { "month": "四月", "city": "阿姆斯特丹", "country": "荷蘭", "description": "華航直飛歐洲，在庫肯霍夫公園遇見世界最美的鬱金香花海。", "image": "https://www.galilee.com.tw/Page/Skittles_Pic/hash_43c1ad07e0c6d4fb5a1067960c801a3c_1920_10000.jpg" },
  { "month": "五月", "city": "倫敦", "country": "英國", "description": "在溫和的春光中探訪泰晤士河畔，感受大英帝國的文化底蘊。", "image": "https://intranet.travel4u.com.tw/eWeb_t4u/IMGDB/002294/002299/002300/002301/00065408.JPG" },
  { "month": "六月", "city": "舊金山", "country": "美國", "description": "漫步金門大橋，感受涼爽的海風與西岸獨有的自由風情。", "image": "https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/ct1vkydy5zb3cdltfmse.jpg" },
  { "month": "七月", "city": "雪梨", "country": "澳洲", "description": "飛往南半球避暑，在雪梨歌劇院前享受清爽的南半球冬季。", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx14zoHMP0s1LO47CKdrx3xIlphh2qMyKe7Q&s" },
  { "month": "八月", "city": "奧克蘭", "country": "紐西蘭", "description": "體驗壯闊的自然景觀，在純淨的國度裡洗滌心靈。", "image": "https://www.agoda.com/wp-content/uploads/2024/06/New-Zealand-Auckland-skyline.jpg" },
  { "month": "九月", "city": "溫哥華", "country": "加拿大", "description": "迎接最早的楓紅，在史丹利公園騎行，享受入秋的愜意。", "image": "https://rookiesavior.net/wp-content/uploads/2021/11/stantly-park.jpg" },
  { "month": "十月", "city": "洛杉磯", "country": "美國", "description": "陽光之城的萬聖節慶典，無論是好萊塢或迪士尼都充滿驚喜。", "image": "https://www.settour.com.tw/ss_img/poi/20210602/b3b6ee4c-899b-4293-adc2-5cc005399507.jpg" },
  { "month": "十一月", "city": "法蘭克福", "country": "德國", "description": "走進最正宗的德國聖誕市集，品嚐熱紅酒，感受濃厚的佳節氛圍。", "image": "https://blog-static.kkday.com/zh-hk/blog/wp-content/uploads/Germany_Frankfurt_%E7%BE%85%E9%A6%AC%E5%BB%A3%E5%A0%B4-Romerberg_AShutterstock_442777798-scaled.jpg" },
  { "month": "十二月", "city": "維也納", "country": "奧地利", "description": "在音樂之都迎接聖誕，華麗的宮殿與雪景構築成最美的冬日童話。", "image": "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/uztbdmn0iu506yaxrywj.jpg" }
];

const TravelCalendar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(new Date().getMonth());
  const [isUpdating, setIsUpdating] = useState(false);

  const nextMonth = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % 12);
      setIsUpdating(false);
    }, 300);
  };

  const prevMonth = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + 12) % 12);
      setIsUpdating(false);
    }, 300);
  };

  const currentItem = DEFAULT_ITINERARY[currentIndex];
  const imageSrc = currentItem.image || `https://picsum.photos/seed/${currentItem.city}-${currentIndex}/800/450`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-blue-100 h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none">中華航空 China Airlines</h2>
            <p className="text-[10px] opacity-80 uppercase tracking-widest">2026年度 特製精美年曆</p>
          </div>
        </div>
        <Globe className="w-6 h-6 opacity-40 animate-spin-slow" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div className="text-center">
            <span className="text-3xl font-black text-blue-900">{currentItem.month}</span>
            <div className="h-1 w-8 bg-blue-500 mx-auto mt-1 rounded-full" />
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className={`transition-all duration-300 ${isUpdating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} flex-1 flex flex-col space-y-4`}>
          <div className="relative group overflow-hidden rounded-xl aspect-[16/9] shadow-inner bg-gray-100">
            <img 
              src={imageSrc} 
              alt={currentItem.city}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-1 text-white mb-1">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xl">{currentItem.city}, {currentItem.country}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 min-h-[80px]">
            <p className="text-blue-800 text-sm leading-relaxed">
              {currentItem.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-4 mt-auto">
          <Plane className="w-4 h-4 text-blue-300 transform -rotate-45" />
          <span className="text-xs text-gray-400 font-bold tracking-widest">華航 帶您環遊世界</span>
          <Plane className="w-4 h-4 text-blue-300 transform rotate-135" />
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TravelCalendar;
