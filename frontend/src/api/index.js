import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response
  },
  register: (userData) => api.post('/auth/register', userData),
  registerStaff: (staffData) => api.post('/auth/internal/setup-staff', staffData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  deleteAccount: () => api.delete('/auth/profile'),
}

export const userService = {
  getAll: () => api.get('/user/clients'),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  deleteAccount: () => api.delete('/user/profile'),
}

export const roomService = {
  getAll: (params) => api.get('/rooms', { params }),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (formData) =>
    api.post('/rooms', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    api.put(`/rooms/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/rooms/${id}`),
}

export const bookingService = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
}

export default api