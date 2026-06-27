import React, { useState } from "react";
import { Profile, ShopItem } from "../types";
import { SHOP_ITEMS } from "../data";
import { ShoppingBag, Star, ShieldAlert, Sparkles, Check, CheckCircle2, ArrowLeft } from "lucide-react";

interface RewardShopProps {
  profile: Profile;
  onBuyItem: (itemId: string, cost: number) => void;
  onEquipItem: (assetType: "hair" | "accessory" | "outfit" | "eyes" | "pet", value: string) => void;
  onBack: () => void;
}

export const RewardShop: React.FC<RewardShopProps> = ({ profile, onBuyItem, onEquipItem, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "outfit" | "accessory" | "pet">("all");
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const filteredItems = SHOP_ITEMS.filter(item => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handlePurchase = (item: ShopItem) => {
    if (profile.unlockedItems.includes(item.id)) {
      // Already unlocked! Equip it!
      onEquipItem(item.assetType, item.value);
      return;
    }

    if (profile.stars < item.cost) {
      alert("Oops! You don't have enough Stars yet. Keep learning to catch more Stars! ⭐");
      return;
    }

    // Process purchase
    onBuyItem(item.id, item.cost);
    setPurchaseSuccess(item.name);

    // Play happy purchase tone
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playChime = (freq: number, start: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.start(start);
        osc.stop(start + duration);
      };
      playChime(523.25, audioCtx.currentTime, 0.25); // C5
      setTimeout(() => playChime(659.25, audioCtx.currentTime, 0.25), 150); // E5
      setTimeout(() => playChime(783.99, audioCtx.currentTime, 0.4), 300);  // G5
    } catch(err){}

    setTimeout(() => {
      setPurchaseSuccess(null);
    }, 1800);
  };

  const isEquipped = (item: ShopItem): boolean => {
    if (item.assetType === "outfit" && profile.avatar.outfit === item.value) return true;
    if (item.assetType === "accessory" && profile.avatar.accessory === item.value) return true;
    if (item.assetType === "pet" && profile.avatar.accessory === item.value) return true;
    return false;
  };

  return (
    <div id="reward-shop-container" className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Upper Navigation Row */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex gap-4 items-center bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
          <div className="flex items-center gap-1.5 text-amber-700">
            <span className="text-lg">⭐</span>
            <div className="text-left leading-none">
              <p className="text-[9px] font-bold text-amber-500 uppercase">Available Stars</p>
              <p className="text-sm font-mono font-bold">{profile.stars}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Header banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-amber-100 text-amber-500 rounded-2xl animate-wiggle-slow">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-800">Magic Rewards Shop</h1>
            <p className="text-slate-500 text-sm">Exchange your hard-earned stars for magic robes, explorer hats, and pets!</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/40">
          {(["all", "outfit", "accessory", "pet"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeCategory === cat ? "bg-white text-amber-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {cat === "all" ? "Show All" : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Success Notification */}
      {purchaseSuccess && (
        <div className="mb-6 p-4 bg-emerald-500 text-white rounded-2xl flex items-center justify-center gap-2 font-medium shadow animate-bounce text-sm">
          <Sparkles className="w-5 h-5" /> Spectacular! You unlocked <strong>{purchaseSuccess}</strong>! It's added to your Wardrobe.
        </div>
      )}

      {/* Shop items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const unlocked = profile.unlockedItems.includes(item.id);
          const equipped = isEquipped(item);
          const canAfford = profile.stars >= item.cost;

          return (
            <div
              key={item.id}
              className={`bg-white p-5 rounded-3xl border-2 flex flex-col justify-between shadow-sm hover:shadow transition-all relative ${
                equipped 
                  ? "border-amber-400 bg-amber-50/10" 
                  : unlocked 
                  ? "border-slate-100 bg-slate-50/30" 
                  : "border-slate-50 hover:border-slate-200"
              }`}
            >
              {/* Corner Tag */}
              {equipped && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Equipped
                </span>
              )}
              {unlocked && !equipped && (
                <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-600 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Unlocked
                </span>
              )}

              {/* Asset Icon */}
              <div className="flex flex-col items-center text-center mt-4">
                <div className="text-6xl p-5 bg-slate-50 rounded-2xl mb-4 border border-slate-100/40 animate-wiggle-slow">
                  {item.iconEmoji}
                </div>
                <h3 className="font-bold text-slate-800 text-md leading-tight">{item.name}</h3>
                <p className="text-slate-400 text-xs capitalize mt-1 font-semibold">{item.category}</p>
              </div>

              {/* Purchase button area */}
              <div className="mt-6 pt-4 border-t border-slate-50">
                {!unlocked ? (
                  // Locked price button
                  <button
                    onClick={() => handlePurchase(item)}
                    className={`w-full py-2.5 rounded-full font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all ${
                      canAfford
                        ? "bg-amber-500 hover:bg-amber-600 text-white hover:shadow"
                        : "bg-slate-100 text-slate-400 border border-slate-200 pointer-events-none"
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 text-white fill-current" /> Buy for {item.cost} Stars
                  </button>
                ) : equipped ? (
                  // Already equipped
                  <button
                    disabled
                    className="w-full py-2.5 rounded-full bg-slate-200 text-slate-500 font-bold text-xs border border-slate-200 pointer-events-none flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Selected Outfit
                  </button>
                ) : (
                  // Unlocked, tap to equip
                  <button
                    onClick={() => handlePurchase(item)}
                    className="w-full py-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Wear Item
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
