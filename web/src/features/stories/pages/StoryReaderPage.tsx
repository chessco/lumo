import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';
import RewardAnimation from '@/components/shared/RewardAnimation';

const storyPages = [
  {
    id: 1,
    text: "Once upon a time, in a magical garden far away, there lived a little sunflower named Sunny.",
    image: '🌻',
    highlight: 'sunflower',
  },
  {
    id: 2,
    text: "Sunny loved to sing and dance with the other flowers every morning when the sun came up.",
    image: '🌅',
    highlight: 'sing',
  },
  {
    id: 3,
    text: "One day, a friendly butterfly named Luna visited the garden. She had beautiful blue wings.",
    image: '🦋',
    highlight: 'butterfly',
  },
  {
    id: 4,
    text: "Luna and Sunny became best friends. They played together every day and had wonderful adventures!",
    image: '🌈',
    highlight: 'friends',
  },
];

const questions = [
  {
    question: "What was the sunflower's name?",
    options: ['Sunny', 'Luna', 'Rosy'],
    correct: 0,
  },
  {
    question: "Who visited the garden?",
    options: ['A bee', 'A butterfly', 'A bird'],
    correct: 1,
  },
];

export default function StoryReaderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const page = storyPages[currentPage];
  const question = questions[currentQuestion];

  const nextPage = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowQuestions(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowReward(true);
        setTimeout(() => navigate('/app/stories'), 2000);
      }
    }, 1000);
  };

  if (showQuestions) {
    return (
      <div className="p-4 md:p-6 max-w-md mx-auto">
        {showReward && <RewardAnimation type="xp" amount={75} onComplete={() => setShowReward(false)} />}
        
        <PageHeader 
          title="Comprehension Check"
          subtitle={`Question ${currentQuestion + 1}/${questions.length}`}
          backTo="/app/stories"
          icon="quiz"
        />

        <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left font-bold transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-50 hover:bg-purple-50 border-2 border-gray-100 hover:border-purple-200'
                    : selectedAnswer === index
                      ? index === question.correct
                        ? 'bg-green-100 border-2 border-green-300 text-green-700'
                        : 'bg-red-100 border-2 border-red-300 text-red-700'
                      : index === question.correct
                        ? 'bg-green-100 border-2 border-green-300 text-green-700'
                        : 'bg-gray-50 border-2 border-gray-100 opacity-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto">
      <PageHeader 
        title="The Magic Garden"
        subtitle={`Page ${currentPage + 1}/${storyPages.length}`}
        backTo="/app/stories"
        icon="auto_stories"
      />

      {/* Story Content */}
      <div className="bg-white rounded-2xl border-2 border-green-100 overflow-hidden mb-6">
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center text-7xl">
          {page.image}
        </div>
        
        {/* Text */}
        <div className="p-6">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            {page.text}
          </p>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {storyPages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentPage
                ? 'bg-green-500 scale-125'
                : index < currentPage
                ? 'bg-green-300'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            currentPage === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md"
        >
          {currentPage === storyPages.length - 1 ? 'Questions' : 'Next'}
          <span className="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
