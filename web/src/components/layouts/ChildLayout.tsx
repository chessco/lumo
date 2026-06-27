import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ChildLayoutProps {
  children: React.ReactNode;
}

const childNav = [
  { name: 'nav.home', href: '/app', icon: 'home' },
  { name: 'nav.speak', href: '/app/speak', icon: 'mic' },
  { name: 'nav.stories', href: '/app/stories', icon: 'auto_stories' },
  { name: 'nav.world', href: '/app/world', icon: 'public' },
  { name: 'nav.profile', href: '/app/profile', icon: 'person' },
];

export default function ChildLayout({ children }: ChildLayoutProps) {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 min-h-screen">
      {/* Main Content */}
      <main className="pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.08)] border-t-2 border-purple-100 flex justify-around items-end px-4 h-20 safe-bottom">
        {childNav.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/app' && location.pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all min-w-[60px] ${
                isActive
                  ? 'text-purple-600 transform -translate-y-2'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-purple-100 shadow-sm border-2 border-purple-200' 
                  : 'border-2 border-transparent'
              }`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <span className={`text-xs mt-1 font-bold ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {t(item.name)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
