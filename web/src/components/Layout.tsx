import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: 'dashboard' },
  { name: 'Niños', href: '/children', icon: 'group' },
  { name: 'Ejercicios', href: '/exercises', icon: 'auto_stories' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('lumo_token');
    localStorage.removeItem('lumo_user');
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden min-h-screen text-gray-800 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 w-80 bg-white border-r border-gray-200 z-50 py-8 px-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="mb-10 px-2">
          <h1 className="text-3xl font-black text-purple-600 tracking-tight">Lumo</h1>
          <p className="text-gray-500 font-medium">Parent Dashboard</p>
        </div>
        <div className="flex-grow space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link 
                key={item.name}
                to={item.href}
                className={`flex items-center gap-4 p-4 rounded-2xl font-medium transition-all border-l-4 ${
                  isActive 
                    ? 'text-purple-700 font-bold bg-purple-50 border-purple-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium border-l-4 border-transparent mt-8"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>

        <div className="mt-auto p-4 bg-gray-50 rounded-3xl border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <img className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="Sarah Mitchell" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDePetzi2fi-EJX5jJMjCqDMa9D1_EqlQEvs7w8HpkXbGHcbNFniYpvyRgfFWIheUS-rXSw2AmfQHVLFc7cJn1ncjKBt1w6CIQinGq7P-6iFaxdUPavxTjdj_bWLr3uWgEMC4DygmW-y7Vq00RZnxMiEcKwH3ZfLdoXNFpcQzG9bAdKGSFqZQKfoKFXTu_zCW2ggrwFzL_3PI2Oi-wKihRGKMVIAwGjbkaQ-Sr-HIEF95dfOeh6edmMuLG4eNdv8WxN-81hUSsG"/>
            <div>
              <p className="font-bold text-gray-800 text-sm">Sarah Mitchell</p>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Lumo Gold Member</p>
            </div>
          </div>
          <Link to="/" className="w-full flex justify-center py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 active:scale-95 transition-all btn-3d shadow-md">
            Learning Mode
          </Link>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t-2 border-gray-100 flex justify-around items-end pb-safe px-4 h-24">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link 
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-3 mb-2 rounded-full transition-all ${
                isActive
                  ? 'bg-purple-100 text-purple-700 transform -translate-y-2 border-2 border-purple-200 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
            </Link>
          );
        })}
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-3 mb-2 rounded-full text-gray-400 hover:bg-gray-50 transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="md:ml-80 min-h-screen pb-24 md:pb-0 relative">
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
