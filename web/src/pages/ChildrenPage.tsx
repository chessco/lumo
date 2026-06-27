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
  MoreVertical
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Niños</h1>
          <p className="text-gray-600 mt-1">Gestiona los perfiles de los niños</p>
        </div>
        <Button className="lumo-button" onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Niño
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar niños..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 lumo-input"
        />
      </div>

      {/* Add child form */}
      {showAddForm && (
        <Card className="lumo-card">
          <CardHeader>
            <CardTitle>Agregar Nuevo Niño</CardTitle>
            <CardDescription>
              Completa los datos para crear un nuevo perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddChild} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={newChild.firstName}
                    onChange={(e) => setNewChild({ ...newChild, firstName: e.target.value })}
                    required
                    className="lumo-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={newChild.lastName}
                    onChange={(e) => setNewChild({ ...newChild, lastName: e.target.value })}
                    required
                    className="lumo-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newChild.dateOfBirth}
                  onChange={(e) => setNewChild({ ...newChild, dateOfBirth: e.target.value })}
                  required
                  className="lumo-input"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="lumo-button">
                  Agregar Niño
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="lumo-button-secondary"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChildren.map((child) => (
          <Card key={child.id} className="lumo-card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-lumo-primary/10 flex items-center justify-center text-2xl">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {calculateAge(child.dateOfBirth)} años
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Nivel</span>
                  <span className="font-semibold text-lumo-primary">{child.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experiencia</span>
                  <span className="font-semibold">{child.experience} XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Racha</span>
                  <span className="font-semibold text-orange-600">{child.streak} días</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Última sesión</span>
                  <span className="text-gray-500">{child.lastSession}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/speech/session/${child.id}`} className="flex-1">
                  <Button className="w-full lumo-button" size="sm">
                    <Mic className="mr-2 h-4 w-4" />
                    Practicar
                  </Button>
                </Link>
                <Link to={`/progress/${child.id}`}>
                  <Button variant="outline" size="sm" className="lumo-button-secondary">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/rewards/${child.id}`}>
                  <Button variant="outline" size="sm" className="lumo-button-secondary">
                    <Award className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/lumi/${child.id}`}>
                  <Button variant="outline" size="sm" className="lumo-button-secondary">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredChildren.length === 0 && (
        <Card className="lumo-card">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron niños
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? 'Intenta con un término de búsqueda diferente'
                : 'Comienza agregando un nuevo perfil de niño'}
            </p>
            {!searchTerm && (
              <Button className="lumo-button" onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primer Niño
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
