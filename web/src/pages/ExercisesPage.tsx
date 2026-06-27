import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Mic, 
  Volume2, 
  Star, 
  Clock,
  BarChart3
} from 'lucide-react';

const exercises = [
  {
    id: '1',
    name: 'Vocales Básicas',
    description: 'Practica la pronunciación de las vocales A, E, I, O, U',
    difficulty: 'beginner',
    category: 'vowels',
    phonemes: ['a', 'e', 'i', 'o', 'u'],
    duration: 10,
    completions: 45,
    averageScore: 85,
  },
  {
    id: '2',
    name: 'Sonidos de Animales',
    description: 'Aprende a pronunciar los nombres de animales',
    difficulty: 'beginner',
    category: 'words',
    phonemes: ['p', 'g', 't', 'r'],
    duration: 15,
    completions: 32,
    averageScore: 78,
  },
  {
    id: '3',
    name: 'Palabras con P',
    description: 'Practica palabras que empiezan con P',
    difficulty: 'intermediate',
    category: 'consonants',
    phonemes: ['p'],
    duration: 12,
    completions: 28,
    averageScore: 72,
  },
  {
    id: '4',
    name: 'Fonema R',
    description: 'Practica el fonema R en diferentes posiciones',
    difficulty: 'advanced',
    category: 'consonants',
    phonemes: ['r', 'rr'],
    duration: 20,
    completions: 15,
    averageScore: 65,
  },
  {
    id: '5',
    name: 'Frases Cortas',
    description: 'Pronuncia frases cortas y simples',
    difficulty: 'intermediate',
    category: 'sentences',
    phonemes: ['a', 'e', 'i', 'o', 'u', 'p', 't'],
    duration: 18,
    completions: 20,
    averageScore: 70,
  },
  {
    id: '6',
    name: 'Canciones Infantiles',
    description: 'Canciones populares para practicar ritmo y entonación',
    difficulty: 'beginner',
    category: 'songs',
    phonemes: ['a', 'e', 'i', 'o', 'u'],
    duration: 25,
    completions: 38,
    averageScore: 88,
  },
];

export default function ExercisesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    description: '',
    difficulty: 'beginner',
    category: 'vowels',
  });

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'vowels': return 'Vocales';
      case 'consonants': return 'Consonantes';
      case 'words': return 'Palabras';
      case 'sentences': return 'Frases';
      case 'songs': return 'Canciones';
      default: return category;
    }
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call the API
    toast({
      title: '¡Ejercicio creado!',
      description: `El ejercicio "${newExercise.name}" ha sido creado exitosamente.`,
    });
    setShowCreateForm(false);
    setNewExercise({ name: '', description: '', difficulty: 'beginner', category: 'vowels' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ejercicios</h1>
          <p className="text-gray-600 mt-1">Ejercicios de pronunciación disponibles</p>
        </div>
        <Button className="lumo-button" onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Ejercicio
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ejercicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 lumo-input"
          />
        </div>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="lumo-input md:w-48"
        >
          <option value="all">Todas las dificultades</option>
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="lumo-input md:w-48"
        >
          <option value="all">Todas las categorías</option>
          <option value="vowels">Vocales</option>
          <option value="consonants">Consonantes</option>
          <option value="words">Palabras</option>
          <option value="sentences">Frases</option>
          <option value="songs">Canciones</option>
        </select>
      </div>

      {/* Create exercise form */}
      {showCreateForm && (
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle>Crear Nuevo Ejercicio</CardTitle>
            <CardDescription>
              Completa los datos para crear un nuevo ejercicio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateExercise} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Ejercicio</Label>
                <Input
                  id="name"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  required
                  className="lumo-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                  required
                  className="lumo-input"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Dificultad</Label>
                  <select
                    id="difficulty"
                    value={newExercise.difficulty}
                    onChange={(e) => setNewExercise({ ...newExercise, difficulty: e.target.value })}
                    className="lumo-input"
                  >
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <select
                    id="category"
                    value={newExercise.category}
                    onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value })}
                    className="lumo-input"
                  >
                    <option value="vowels">Vocales</option>
                    <option value="consonants">Consonantes</option>
                    <option value="words">Palabras</option>
                    <option value="sentences">Frases</option>
                    <option value="songs">Canciones</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="lumo-button">
                  Crear Ejercicio
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="lumo-button-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Exercises grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="lumo-card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-lumo-primary/10 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-lumo-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                      {getDifficultyLabel(exercise.difficulty)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Categoría</span>
                  <span className="font-medium">{getCategoryLabel(exercise.category)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duración</span>
                  <span className="font-medium">{exercise.duration} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completado</span>
                  <span className="font-medium">{exercise.completions} veces</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Puntuación</span>
                  <span className="font-medium text-lumo-primary">{exercise.averageScore}%</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to="/children" className="flex-1">
                  <Button className="w-full lumo-button" size="sm">
                    <Mic className="mr-2 h-4 w-4" />
                    Practicar
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="lumo-button-secondary">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredExercises.length === 0 && (
        <Card className="lumo-card">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron ejercicios
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta con diferentes filtros o crea un nuevo ejercicio
            </p>
            <Button className="lumo-button" onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Crear Ejercicio
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
