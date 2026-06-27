import { Link } from 'react-router-dom';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

const explorers = [
  { id: '1', name: 'Luna', avatar: '👧', description: 'Loves stories and adventures' },
  { id: '2', name: 'Leo', avatar: '👦', description: 'Enjoys music and sounds' },
  { id: '3', name: 'Mia', avatar: '👧', description: 'Curious about everything' },
];

export default function ChooseExplorerPage() {
  return (
    <OnboardingLayout showBack backTo="/welcome">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">Choose Your Explorer</h1>
        <p className="text-gray-500 font-medium">Who will go on this adventure?</p>
      </div>
      
      <div className="space-y-4">
        {explorers.map((explorer) => (
          <Link
            key={explorer.id}
            to="/onboarding/create"
            className="block p-5 bg-white rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl">
                {explorer.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{explorer.name}</h3>
                <p className="text-sm text-gray-500">{explorer.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </OnboardingLayout>
  );
}
