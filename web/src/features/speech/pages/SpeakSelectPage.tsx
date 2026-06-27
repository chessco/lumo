import { Link } from 'react-router-dom';

const exercises = [
  { id: '1', name: 'Vocales Básicas', difficulty: 'beginner', icon: '🔤' },
  { id: '2', name: 'Sonidos de Animales', difficulty: 'beginner', icon: '🐾' },
  { id: '3', name: 'Palabras con P', difficulty: 'intermediate', icon: '📝' },
];

export default function SpeakSelectPage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-800 mb-2">Lumo Speak</h1>
      <p className="text-gray-500 font-medium mb-6">Choose an exercise to practice</p>
      
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/app/speak/session/${exercise.id}`}
            className="block p-5 bg-white rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
                {exercise.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{exercise.name}</h3>
                <span className="text-sm font-medium text-purple-600 capitalize">{exercise.difficulty}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
