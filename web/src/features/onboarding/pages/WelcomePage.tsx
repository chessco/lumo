import { Link } from 'react-router-dom';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

export default function WelcomePage() {
  return (
    <OnboardingLayout>
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl bg-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-white font-black text-5xl">L</span>
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-4">Welcome to Lumo</h1>
        <p className="text-gray-500 font-medium text-lg mb-8">
          The magical world where learning becomes an adventure!
        </p>
        <Link
          to="/onboarding/choose"
          className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
        >
          <span>Start Your Adventure</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </OnboardingLayout>
  );
}
