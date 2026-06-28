import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/shared/PageHeader';

const stories = [
  { 
    id: '1', 
    title: 'The Magic Garden', 
    description: 'A story about a magical garden where flowers can talk',
    difficulty: 'beginner',
    duration: '5 min',
    icon: '🌻',
    progress: 0,
  },
  { 
    id: '2', 
    title: 'Luna and the Stars', 
    description: 'Luna discovers she can collect stars from the sky',
    difficulty: 'beginner',
    duration: '7 min',
    icon: '⭐',
    progress: 60,
  },
  { 
    id: '3', 
    title: 'The Friendly Dragon', 
    description: 'A dragon who wants to make friends with children',
    difficulty: 'intermediate',
    duration: '10 min',
    icon: '🐉',
    progress: 100,
  },
  { 
    id: '4', 
    title: 'Ocean Adventures', 
    description: 'Explore the underwater world with dolphin friends',
    difficulty: 'intermediate',
    duration: '8 min',
    icon: '🐬',
    progress: 30,
  },
];

export default function StorySelectPage() {
  const { t } = useTranslation();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Lumo Stories"
        subtitle="Choose a story to read"
        icon="auto_stories"
      />

      {/* Story Cards */}
      <div className="space-y-4">
        {stories.map((story) => (
          <Link
            key={story.id}
            to={`/app/stories/read/${story.id}`}
            className="block bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all overflow-hidden"
          >
            <div className="flex">
              {/* Story Icon */}
              <div className="w-24 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center text-4xl border-r border-gray-100">
                {story.icon}
              </div>
              
              {/* Story Info */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{story.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${getDifficultyColor(story.difficulty)}`}>
                    {story.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{story.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {story.duration}
                  </span>
                  {story.progress > 0 && (
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${story.progress}%` }}
                      />
                    </div>
                  )}
                  {story.progress === 100 && (
                    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
