import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

const languages = [
  { 
    id: 'en', 
    name: 'English', 
    flag: '🇺🇸', 
    description: 'Learn English words and phrases',
    progress: 45,
    lessons: 12,
  },
  { 
    id: 'fr', 
    name: 'French', 
    flag: '🇫🇷', 
    description: 'Discover French language',
    progress: 20,
    lessons: 8,
  },
  { 
    id: 'pt', 
    name: 'Portuguese', 
    flag: '🇧🇷', 
    description: 'Explore Portuguese vocabulary',
    progress: 0,
    lessons: 10,
  },
];

export default function LanguageSelectPage() {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Language Islands"
        subtitle="Choose a language to explore"
        icon="public"
      />

      {/* Language Cards */}
      <div className="space-y-4">
        {languages.map((language) => (
          <Link
            key={language.id}
            to={`/app/languages/${language.id}`}
            className="block bg-white rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">
                  {language.flag}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800">{language.name}</h3>
                  <p className="text-sm text-gray-500">{language.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${language.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-600">{language.progress}%</span>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  {language.lessons} lessons
                </span>
                {language.progress === 0 && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">
                    New
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
