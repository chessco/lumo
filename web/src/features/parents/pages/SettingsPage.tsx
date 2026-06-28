import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6">
      <PageHeader 
        title={t('nav.settings')}
        subtitle="Manage your account settings"
        icon="settings"
      />

      <div className="space-y-4">
        {/* Language */}
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">language</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{t('common.language')}</h3>
                <p className="text-sm text-gray-500">Choose your preferred language</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">notifications</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">Manage notification preferences</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">person</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Profile</h3>
                <p className="text-sm text-gray-500">Edit your profile information</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white p-4 rounded-2xl border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600">security</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Security</h3>
                <p className="text-sm text-gray-500">Password and security settings</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
}
