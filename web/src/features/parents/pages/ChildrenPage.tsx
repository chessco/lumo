import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import EmptyState from '@/components/shared/EmptyState';

const children = [
  { id: '1', firstName: 'Sofía', lastName: 'García', avatar: '👧', level: 5, experience: 450, streak: 7 },
  { id: '2', firstName: 'Mateo', lastName: 'López', avatar: '👦', level: 4, experience: 380, streak: 5 },
  { id: '3', firstName: 'Valentina', lastName: 'Martínez', avatar: '👧', level: 4, experience: 350, streak: 3 },
];

export default function ChildrenPage() {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="p-4 md:p-6">
      <PageHeader 
        title={t('children.title')}
        subtitle="Manage child profiles"
        icon="group"
        action={
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            {t('children.addChild')}
          </button>
        }
      />

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-6 bg-white rounded-2xl border-2 border-purple-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4">{t('children.addChild')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('children.name')}</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('common.lastName')}</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
              {t('common.save')}
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Children List */}
      {children.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {children.map((child) => (
            <div key={child.id} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{child.firstName} {child.lastName}</h3>
                    <p className="text-sm text-purple-600 font-medium">Level {child.level}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-purple-50 rounded-xl">
                    <p className="text-lg font-black text-purple-600">{child.level}</p>
                    <p className="text-xs text-gray-500">{t('children.level')}</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-xl">
                    <p className="text-lg font-black text-orange-600">{child.experience}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-xl">
                    <p className="text-lg font-black text-red-600">🔥 {child.streak}</p>
                    <p className="text-xs text-gray-500">{t('children.progress')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to={`/parent/progress/${child.id}`}
                    className="py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-center text-sm hover:bg-blue-100 transition-colors"
                  >
                    Progress
                  </Link>
                  <Link 
                    to={`/parent/reports/${child.id}`}
                    className="py-2 bg-green-50 text-green-600 rounded-xl font-bold text-center text-sm hover:bg-green-100 transition-colors"
                  >
                    Reports
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon="group"
          title={t('children.noChildren')}
          description={t('children.addChildPrompt')}
          action={{
            label: t('children.addChild'),
            onClick: () => setShowAddForm(true)
          }}
        />
      )}
    </div>
  );
}
