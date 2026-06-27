import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const languages = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex((l) => l.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1 text-sm"
    >
      <span>{current.flag}</span>
      <span>{current.label}</span>
    </Button>
  );
}
