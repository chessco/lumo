import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

const avatars = ['👧', '👦', '🧒', '👶', '🦸', '🧙', '🤴', '👸'];
const colors = ['bg-purple-100', 'bg-blue-100', 'bg-pink-100', 'bg-green-100', 'bg-yellow-100', 'bg-orange-100'];

export default function CreateExplorerPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (!name.trim()) return;
    
    // Store explorer data
    localStorage.setItem('lumo_child', JSON.stringify({
      name,
      avatar: selectedAvatar,
      color: selectedColor,
    }));
    
    navigate('/app');
  };

  return (
    <OnboardingLayout showBack backTo="/onboarding/choose">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">Create Your Explorer</h1>
        <p className="text-gray-500 font-medium">Give your explorer a name and look</p>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 shadow-sm">
        {/* Avatar Preview */}
        <div className="text-center mb-6">
          <div className={`w-24 h-24 rounded-3xl ${selectedColor} flex items-center justify-center text-5xl mx-auto mb-4 border-2 border-white shadow-md`}>
            {selectedAvatar}
          </div>
        </div>
        
        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Explorer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg font-medium"
            maxLength={20}
          />
        </div>
        
        {/* Avatar Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Choose Avatar</label>
          <div className="grid grid-cols-4 gap-2">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`p-3 rounded-xl text-2xl transition-all ${
                  selectedAvatar === avatar
                    ? 'bg-purple-100 border-2 border-purple-300 scale-110'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
        
        {/* Color Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Choose Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full ${color} border-2 transition-all ${
                  selectedColor === color
                    ? 'border-purple-500 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            name.trim()
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Start Adventure! 🚀
        </button>
      </div>
    </OnboardingLayout>
  );
}
