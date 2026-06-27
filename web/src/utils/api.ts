import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3017',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lumo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const tenantId = localStorage.getItem('lumo_tenant_id');
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('lumo_token');
      localStorage.removeItem('lumo_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; firstName?: string; lastName?: string }) =>
    api.post('/auth/register', data),
  getProfile: () => api.get('/auth/me'),
};

// Organizations API
export const organizationsApi = {
  getAll: () => api.get('/organizations'),
  getById: (id: string) => api.get(`/organizations/${id}`),
  getBySlug: (slug: string) => api.get(`/organizations/slug/${slug}`),
  create: (data: { name: string; slug: string; email?: string }) =>
    api.post('/organizations', data),
  update: (id: string, data: any) => api.put(`/organizations/${id}`, data),
};

// Children API
export const childrenApi = {
  getAll: () => api.get('/children'),
  getById: (id: string) => api.get(`/children/${id}`),
  getByParent: (parentId: string) => api.get(`/children/parent/${parentId}`),
  create: (data: { firstName: string; lastName?: string; dateOfBirth?: string; parentId?: string }) =>
    api.post('/children', data),
  update: (id: string, data: any) => api.put(`/children/${id}`, data),
  deactivate: (id: string) => api.delete(`/children/${id}`),
};

// Speech API
export const speechApi = {
  // Sessions
  startSession: (childId: string, exerciseId?: string) =>
    api.post('/speech/sessions', { childId, exerciseId }),
  endSession: (sessionId: string) => api.put(`/speech/sessions/${sessionId}/end`),
  getSession: (sessionId: string) => api.get(`/speech/sessions/${sessionId}`),
  getSessionsByChild: (childId: string, limit?: number) =>
    api.get(`/speech/sessions/child/${childId}`, { params: { limit } }),
  
  // Phoneme attempts
  recordPhonemeAttempt: (sessionId: string, phonemeId: string, audioUrl: string) =>
    api.post(`/speech/sessions/${sessionId}/phoneme-attempt`, { phonemeId, audioUrl }),
  
  // Audio
  uploadAudio: (sessionId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/speech/sessions/${sessionId}/audio`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  // Exercises
  getExercises: (filters?: { difficulty?: string; category?: string }) =>
    api.get('/speech/exercises', { params: filters }),
  getExercise: (id: string) => api.get(`/speech/exercises/${id}`),
  createExercise: (data: any) => api.post('/speech/exercises', data),
  
  // Phonemes
  getPhonemes: (language?: string) => api.get('/speech/phonemes', { params: { language } }),
  getPhoneme: (id: string) => api.get(`/speech/phonemes/${id}`),
  
  // Progress
  getProgress: (childId: string) => api.get(`/speech/progress/${childId}`),
  getLeaderboard: (limit?: number) => api.get('/speech/leaderboard', { params: { limit } }),
  
  // Rewards
  getRewards: (childId: string) => api.get(`/speech/rewards/${childId}`),
  checkBadges: (childId: string) => api.post(`/speech/rewards/${childId}/check`),
};

// Lumi API
export const lumiApi = {
  greet: (childName: string) => api.post('/lumi/greet', { childName }),
  explainExercise: (exerciseName: string, exerciseDescription: string) =>
    api.post('/lumi/explain-exercise', { exerciseName, exerciseDescription }),
  celebrate: (childName: string, achievement: string) =>
    api.post('/lumi/celebrate', { childName, achievement }),
  encourage: (childName: string, phoneme: string) =>
    api.post('/lumi/encourage', { childName, phoneme }),
  feedback: (childName: string, score: number) =>
    api.post('/lumi/feedback', { childName, score }),
  chat: (childId: string, message: string) =>
    api.post(`/lumi/chat/${childId}`, { message }),
  getPersonality: () => api.get('/lumi/personality'),
};
