import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

const explorers = [
  { id: 'luna', name: 'Luna', avatar: '👧', description: 'Loves stories and adventures', color: 'purple' },
  { id: 'leo', name: 'Leo', avatar: '👦', description: 'Enjoys music and sounds', color: 'blue' },
  { id: 'mia', name: 'Mia', avatar: '👧', description: 'Curious about everything', color: 'pink' },
  { id: 'max', name: 'Max', avatar: '👦', description: 'Always ready to learn', color: 'green' },
];

export default function ChooseExplorerPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Store selection
    localStorage.setItem('lumo_explorer', id);
    // Navigate to create
    setTimeout(() => navigate('/onboarding/create'), 300);
  };

  return (
    <OnboardingLayout showBack backTo="/welcome">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-purple-600 text-3xl">person_search</span>
        </div>
        <h1 className="text-3xl font-black text-gray-800 mb-2">Choose Your Explorer</h1>
        <p className="text-gray-500 font-medium">Who will go on this adventure?</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {explorers.map((explorer) => (
          <button
            key={explorer.id}
            onClick={() => handleSelect(explorer.id)}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
              selected === explorer.id
                ? 'border-purple-500 bg-purple-50 scale-95'
                : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">{explorer.avatar}</div>
            <h3 className="font-bold text-gray-800">{explorer.name}</h3>
            <p className="text-xs text-gray-500">{explorer.description}</p>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  );
}
