import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

const shopCategories = [
  { id: 'avatars', name: 'Avatars', icon: 'person', color: 'purple' },
  { id: 'backgrounds', name: 'Backgrounds', icon: 'wallpaper', color: 'blue' },
  { id: 'sounds', name: 'Sounds', icon: 'music_note', color: 'green' },
  { id: 'effects', name: 'Effects', icon: 'auto_awesome', color: 'orange' },
];

const shopItems = {
  avatars: [
    { id: '1', name: 'Robot Avatar', emoji: '🤖', price: 100, purchased: false },
    { id: '2', name: 'Princess Avatar', emoji: '👸', price: 150, purchased: true },
    { id: '3', name: 'Superhero Avatar', emoji: '🦸', price: 200, purchased: false },
    { id: '4', name: 'Wizard Avatar', emoji: '🧙', price: 250, purchased: false },
  ],
  backgrounds: [
    { id: '1', name: 'Space Theme', emoji: '🌌', price: 100, purchased: false },
    { id: '2', name: 'Ocean Theme', emoji: '🌊', price: 100, purchased: false },
    { id: '3', name: 'Forest Theme', emoji: '🌲', price: 100, purchased: true },
  ],
};

export default function MagicShopPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('avatars');
  const [coins, setCoins] = useState(500);

  const items = shopItems[selectedCategory as keyof typeof shopItems] || [];

  const handlePurchase = (price: number) => {
    if (coins >= price) {
      setCoins(coins - price);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Magic Shop"
        subtitle="Spend your coins on rewards"
        icon="storefront"
      />

      {/* Coins Display */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪙</span>
            <div>
              <p className="text-sm font-medium opacity-80">Your Coins</p>
              <p className="text-2xl font-black">{coins}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition-colors">
            Earn More
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {shopCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border-2 border-gray-100 p-4 text-center">
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h4 className="font-bold text-gray-800 mb-2">{item.name}</h4>
            {item.purchased ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                <span className="material-symbols-outlined text-sm">check</span>
                Owned
              </span>
            ) : (
              <button
                onClick={() => handlePurchase(item.price)}
                disabled={coins < item.price}
                className={`w-full py-2 rounded-xl font-bold transition-colors ${
                  coins >= item.price
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                🪙 {item.price}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
