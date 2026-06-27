import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const quickActions = [
  {
    title: 'Daily Adventure',
    description: 'Your daily missions',
    icon: 'auto_awesome',
    href: '/app/daily-adventure',
    gradient: 'from-yellow-400 to-orange-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  {
    title: 'Lumo Speak',
    description: 'Practice pronunciation',
    icon: 'mic',
    href: '/app/speak',
    gradient: 'from-purple-500 to-blue-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    title: 'Lumo Stories',
    description: 'Read and learn',
    icon: 'auto_stories',
    href: '/app/stories',
    gradient: 'from-green-400 to-teal-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    title: 'Language Islands',
    description: 'Explore new languages',
    icon: 'public',
    href: '/app/languages',
    gradient: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    title: 'Lumo World',
    description: 'Your magical world',
    icon: 'explore',
    href: '/app/world',
    gradient: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    title: 'Magic Shop',
    description: 'Get rewards',
    icon: 'storefront',
    href: '/app/shop',
    gradient: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
];

export default function LumoHomePage() {
  const { t } = useTranslation();

  // Mock user data - in real app this would come from context/API
  const user = JSON.parse(localStorage.getItem('lumo_user') || '{}');
  const userName = user.firstName || 'Explorer';

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-4xl shadow-inner border-2 border-purple-200">
            🧒
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">
              Hello, {userName}! 👋
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              What do you want to do today?
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 p-4 bg-white rounded-2xl border-2 border-purple-100 shadow-sm">
          <div className="flex-1 text-center">
            <p className="text-2xl font-black text-purple-600">5</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Level</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-black text-orange-500">450</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">XP</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-black text-red-500">7 🔥</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Streak</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-black text-yellow-500">12 ⭐</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stars</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className={`${action.bg} ${action.border} border-2 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
              <span className="material-symbols-outlined text-white text-2xl">{action.icon}</span>
            </div>
            <h3 className="font-black text-gray-800 text-lg mb-1">{action.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mt-8 p-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl text-white shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          <h2 className="text-2xl font-black">Daily Challenge</h2>
        </div>
        <p className="text-purple-100 font-medium mb-4">
          Complete today's challenge to earn bonus XP and a special reward!
        </p>
        <Link
          to="/app/daily-adventure"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-2xl font-bold hover:bg-purple-50 transition-colors shadow-md"
        >
          <span>Start Challenge</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
