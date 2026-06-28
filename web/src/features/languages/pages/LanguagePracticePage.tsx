import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import RewardAnimation from '@/components/shared/RewardAnimation';

const lessons = {
  en: [
    { word: 'Cat', translation: 'Gato', emoji: '🐱', audio: 'cat' },
    { word: 'Dog', translation: 'Perro', emoji: '🐶', audio: 'dog' },
    { word: 'Bird', translation: 'Pájaro', emoji: '🐦', audio: 'bird' },
    { word: 'Fish', translation: 'Pez', emoji: '🐟', audio: 'fish' },
    { word: 'Rabbit', translation: 'Conejo', emoji: '🐰', audio: 'rabbit' },
  ],
  fr: [
    { word: 'Chat', translation: 'Gato', emoji: '🐱', audio: 'chat' },
    { word: 'Chien', translation: 'Perro', emoji: '🐶', audio: 'chien' },
    { word: 'Oiseau', translation: 'Pájaro', emoji: '🐦', audio: 'oiseau' },
    { word: 'Poisson', translation: 'Pez', emoji: '🐟', audio: 'poisson' },
    { word: 'Lapin', translation: 'Conejo', emoji: '🐰', audio: 'lapin' },
  ],
};

export default function LanguagePracticePage() {
  const { languageId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const languageLessons = lessons[languageId as keyof typeof lessons] || lessons.en;
  const currentWord = languageLessons[currentIndex];

  const handleNext = () => {
    if (currentIndex < languageLessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    } else {
      setShowReward(true);
      setTimeout(() => navigate('/app/languages'), 2000);
    }
  };

  const handleKnow = () => {
    setScore(score + 1);
    setShowTranslation(true);
  };

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto">
      {showReward && <RewardAnimation type="xp" amount={50} onComplete={() => setShowReward(false)} />}
      
      <PageHeader 
        title={languageId === 'en' ? 'English' : 'French'}
        subtitle={`${currentIndex + 1}/${languageLessons.length} words`}
        backTo="/app/languages"
        icon="translate"
      />

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-6">
        {languageLessons.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-blue-500 scale-125'
                : index < currentIndex
                ? 'bg-blue-300'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Word Card */}
      <div className="bg-white rounded-2xl border-2 border-blue-100 overflow-hidden mb-6">
        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-7xl">
          {currentWord.emoji}
        </div>
        <div className="p-6 text-center">
          <h2 className="text-3xl font-black text-gray-800 mb-2">{currentWord.word}</h2>
          {showTranslation ? (
            <p className="text-xl text-blue-600 font-bold">{currentWord.translation}</p>
          ) : (
            <p className="text-gray-400">Tap to reveal translation</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!showTranslation ? (
          <>
            <button
              onClick={() => setShowTranslation(true)}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              Show Translation
            </button>
            <button
              onClick={handleKnow}
              className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-md"
            >
              I Know This! ✓
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-md"
          >
            {currentIndex === languageLessons.length - 1 ? 'Complete!' : 'Next Word'}
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Score */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Words learned: <span className="font-bold text-blue-600">{score}</span></p>
      </div>
    </div>
  );
}
