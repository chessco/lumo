import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

export default function CreateExplorerPage() {
  const navigate = useNavigate();

  const handleCreate = () => {
    // In real app, this would save to API
    navigate('/app');
  };

  return (
    <OnboardingLayout showBack backTo="/onboarding/choose">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 mb-2">Create Your Explorer</h1>
        <p className="text-gray-500 font-medium">Give your explorer a name</p>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-purple-100 flex items-center justify-center text-5xl mx-auto mb-4">
            🧒
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter explorer name"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <button
            onClick={handleCreate}
            className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Start Adventure!
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
