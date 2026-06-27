import { Link } from 'react-router-dom';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  backTo?: string;
}

export default function OnboardingLayout({ children, showBack = false, backTo = '/' }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="p-4">
        {showBack && (
          <Link 
            to={backTo}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-medium text-sm">Volver</span>
          </Link>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-gray-400 font-medium">
          Lumo - Aprendizaje Divertido con IA
        </p>
      </footer>
    </div>
  );
}
