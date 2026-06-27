import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Mic, 
  BarChart3, 
  Award, 
  MessageCircle,
  Calendar,
  MoreVertical,
  Star,
  Flame
} from 'lucide-react';

// Mock data - in real app this would come from API
const children = [
  {
    id: '1',
    firstName: 'Sofía',
    lastName: 'García',
    dateOfBirth: '2018-05-15',
    level: 5,
    experience: 450,
    streak: 7,
    lastSession: '2026-06-27',
    avatar: '👧',
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'López',
    dateOfBirth: '2019-03-22',
    level: 4,
    experience: 380,
    streak: 5,
    lastSession: '2026-06-27',
    avatar: '👦',
  },
  {
    id: '3',
    firstName: 'María',
    lastName: 'Rodríguez',
    dateOfBirth: '2017-11-08',
    level: 4,
    experience: 350,
    streak: 3,
    lastSession: '2026-06-26',
    avatar: '👧',
  },
  {
    id: '4',
    firstName: 'Juan',
    lastName: 'Martínez',
    dateOfBirth: '2020-01-30',
    level: 2,
    experience: 150,
    streak: 1,
    lastSession: '2026-06-25',
    avatar: '👦',
  },
];

export default function ChildrenPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const filteredChildren = children.filter(child =>
    `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call the API
    toast({
      title: '¡Niño agregado!',
      description: `${newChild.firstName} ha sido agregado exitosamente.`,
    });
    setShowAddForm(false);
    setNewChild({ firstName: '', lastName: '', dateOfBirth: '' });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-8 bg-gradient-to-b from-blue-50 via-white to-purple-50 min-h-screen p-6 rounded-3xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100">
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight flex items-center gap-3">
            Exploradores <span className="text-3xl">🚀</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Gestiona los perfiles de los niños</p>
        </div>
        <Button className="btn-3d bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-6 text-lg" onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-6 w-6 font-bold" />
          Agregar Niño
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-400" />
        <Input
          placeholder="Buscar exploradores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-14 py-6 rounded-full border-2 border-blue-200 focus-visible:ring-blue-400 focus-visible:border-blue-400 text-lg shadow-sm w-full"
        />
      </div>

      {/* Add child form */}
      {showAddForm && (
        <Card className="rounded-3xl border-2 border-green-200 shadow-xl overflow-hidden bg-white max-w-3xl mx-auto">
          <CardHeader className="bg-green-50/50 pb-6 pt-6 border-b-2 border-green-100">
            <CardTitle className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              Agregar Nuevo Explorador
            </CardTitle>
            <CardDescription className="text-md font-medium mt-2">
              Completa los datos para crear un nuevo perfil de aprendizaje
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddChild} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-md font-bold text-gray-700">Nombre</Label>
                  <Input
                    id="firstName"
                    value={newChild.firstName}
                    onChange={(e) => setNewChild({ ...newChild, firstName: e.target.value })}
                    required
                    className="rounded-2xl border-2 border-gray-200 focus-visible:ring-green-400 focus-visible:border-green-400 py-6 px-4 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-md font-bold text-gray-700">Apellido</Label>
                  <Input
                    id="lastName"
                    value={newChild.lastName}
                    onChange={(e) => setNewChild({ ...newChild, lastName: e.target.value })}
                    required
                    className="rounded-2xl border-2 border-gray-200 focus-visible:ring-green-400 focus-visible:border-green-400 py-6 px-4 text-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="dateOfBirth" className="text-md font-bold text-gray-700">Fecha de Nacimiento</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newChild.dateOfBirth}
                  onChange={(e) => setNewChild({ ...newChild, dateOfBirth: e.target.value })}
                  required
                  className="rounded-2xl border-2 border-gray-200 focus-visible:ring-green-400 focus-visible:border-green-400 py-6 px-4 text-lg w-full md:w-1/2"
                />
              </div>
              <div className="flex gap-4 pt-4 border-t-2 border-gray-100">
                <Button type="submit" className="btn-3d bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg font-bold">
                  Guardar Perfil
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg font-bold border-2 border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Children grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChildren.map((child, index) => (
          <Card key={child.id} className="rounded-3xl border-2 border-indigo-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 pb-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-sm border border-indigo-200 group-hover:scale-110 transition-transform duration-300">
                      {child.avatar}
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-gray-800">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-sm font-bold text-indigo-600 bg-indigo-100/50 inline-block px-2 py-1 rounded-lg mt-1">
                        {calculateAge(child.dateOfBirth)} años
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-indigo-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-indigo-400" />
                  </Button>
                </div>
              </div>

              <div className="p-6 pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-2xl p-3 border border-purple-100">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Nivel</span>
                    <span className="font-black text-2xl text-purple-700 flex items-center gap-1">
                      <Star className="h-5 w-5 fill-purple-500 text-purple-500" /> {child.level}
                    </span>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">Racha</span>
                    <span className="font-black text-2xl text-orange-700 flex items-center gap-1">
                      <Flame className="h-5 w-5 fill-orange-500 text-orange-500" /> {child.streak}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-between bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <span className="text-sm font-bold text-gray-500">Experiencia</span>
                    <span className="font-black text-gray-800">{child.experience} XP</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Link to={`/speech/session/${child.id}`} className="col-span-4 mb-2">
                    <Button className="w-full btn-3d bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl py-6 font-bold text-lg">
                      <Mic className="mr-2 h-5 w-5" />
                      Practicar
                    </Button>
                  </Link>
                  <Link to={`/progress/${child.id}`} className="col-span-1">
                    <Button variant="outline" className="w-full rounded-2xl h-14 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold bg-white" title="Progreso">
                      <BarChart3 className="h-6 w-6" />
                    </Button>
                  </Link>
                  <Link to={`/rewards/${child.id}`} className="col-span-1">
                    <Button variant="outline" className="w-full rounded-2xl h-14 border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 font-bold bg-white" title="Recompensas">
                      <Award className="h-6 w-6" />
                    </Button>
                  </Link>
                  <Link to={`/lumi/${child.id}`} className="col-span-2">
                    <Button variant="outline" className="w-full rounded-2xl h-14 border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 font-bold bg-white flex items-center gap-2" title="Hablar con Lumi">
                      <MessageCircle className="h-5 w-5" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredChildren.length === 0 && (
        <Card className="rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/50 shadow-none">
          <CardContent className="p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-3">
              No se encontraron exploradores
            </h3>
            <p className="text-lg font-medium text-gray-500 mb-8 max-w-md mx-auto">
              {searchTerm
                ? 'Intenta con un término de búsqueda diferente o revisa la ortografía'
                : 'Comienza agregando un nuevo perfil de niño para que pueda empezar a jugar y aprender'}
            </p>
            {!searchTerm && (
              <Button className="btn-3d bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg font-bold" onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-6 w-6 font-bold" />
                Agregar Primer Niño
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
