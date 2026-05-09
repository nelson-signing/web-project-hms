import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import('../views/RoomsView.vue'),
  },
  {
    path: '/rooms/:id',
    name: 'room-detail',
    component: () => import('../views/RoomDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/my-bookings',
    name: 'my-bookings',
    component: () => import('../views/MyBookingsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/internal/register-staff',
    name: 'admin-register',
    component: () => import('../views/AdminRegisterView.vue'),
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('../views/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },
  {
    path: '/admin/rooms',
    name: 'admin-rooms',
    component: () => import('../views/AdminRoomsView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },
  {
    path: '/admin/rooms/add',
    name: 'add-room',
    component: () => import('../views/AddRoomView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },
  {
    path: '/admin/rooms/:id/edit',
    name: 'edit-room',
    component: () => import('../views/EditRoomView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },
  {
    path: '/admin/bookings',
    name: 'admin-bookings',
    component: () => import('../views/AdminBookingsView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },
  {
    path: '/admin/bookings/:id',
    name: 'edit-booking',
    component: () => import('../views/EditBookingView.vue'),
    meta: { requiresAuth: true, requiresStaff: true },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: () => {
      const role = localStorage.getItem('role')
      return role === 'staff' ? '/admin' : '/'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  if (to.meta.requiresStaff && role !== 'staff') {
    return '/'
  }
})

export default router
