import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import ProgressRing from '@/components/shared/ProgressRing';

const worldSections = [
  { 
    name: 'Trophy Room', 
    icon: 'emoji_events', 
    href: '/app/world/trophies', 
    color: 'from-yellow-400 to-orange-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    count: 12,
    description: 'Your earned rewards'
  },
  { 
    name: 'Inventory', 
    icon: 'inventory_2', 
    href: '/app/world/inventory', 
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    count: 8,
    description: 'Items and accessories'
  },
  { 
    name: 'Avatar', 
    icon: 'person', 
    href: '/app/world/avatar', 
    color: 'from-purple-400 to-pink-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    count: 5,
    description: 'Customize your look'
  },
];

export default function LumoWorldPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Lumo World"
        subtitle="Your magical world"
        icon="public"
      />

      {/* World Stats */}
      <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 mb-6">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <ProgressRing progress={65} size={60} strokeWidth={6} />
            <p className="text-xs text-gray-500 mt-2 font-medium">World Level</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-purple-600">25</p>
            <p className="text-xs text-gray-500 font-medium">Items</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-orange-500">12</p>
            <p className="text-xs text-gray-500 font-medium">Trophies</p>
          </div>
        </div>
      </div>

      {/* World Sections */}
      <div className="space-y-4">
        {worldSections.map((section) => (
          <Link
            key={section.name}
            to={section.href}
            className={`block ${section.bg} ${section.border} border-2 rounded-2xl p-5 hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md`}>
                <span className="material-symbols-outlined text-white text-2xl">{section.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{section.name}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-800">{section.count}</p>
                <p className="text-xs text-gray-500">items</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
