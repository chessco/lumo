import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface ParentLayoutProps {
  children: React.ReactNode;
}

const parentNav = [
  { name: 'nav.dashboard', href: '/parent/dashboard', icon: 'dashboard' },
  { name: 'nav.children', href: '/parent/children', icon: 'group' },
  { name: 'nav.progress', href: '/parent/progress', icon: 'trending_up' },
  { name: 'nav.reports', href: '/parent/reports', icon: 'assessment' },
  { name: 'nav.settings', href: '/parent/settings', icon: 'settings' },
];

export default function ParentLayout({ children }: ParentLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('lumo_token');
    localStorage.removeItem('lumo_user');
    navigate('/login');
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 w-72 bg-white border-r border-gray-200 z-50 py-6 px-4 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Logo */}
        <div className="mb-8 px-3">
          <Link to="/parent/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <span className="text-white font-black text-xl">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-purple-600 tracking-tight">Lumo</h1>
              <p className="text-gray-400 text-xs font-medium">{t('parent.title')}</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-1">
          {parentNav.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? 'text-purple-700 font-bold bg-purple-50 border-l-4 border-purple-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-l-4 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm">{t(item.name)}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="mt-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">person</span>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">
                {JSON.parse(localStorage.getItem('lumo_user') || '{}').firstName || 'Usuario'}
              </p>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">
                {JSON.parse(localStorage.getItem('lumo_user') || '{}').role || 'admin'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            {t('common.logout')}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/parent/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">L</span>
            </div>
            <span className="text-xl font-black text-purple-600">Lumo</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 flex justify-around items-center px-2 h-16 safe-bottom">
        {parentNav.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link 
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-xs mt-1 font-medium">{t(item.name)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <div className="md:ml-72 min-h-screen">
        <main className="pt-16 md:pt-0 pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
