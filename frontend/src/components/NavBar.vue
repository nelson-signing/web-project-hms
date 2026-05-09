<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const userRole = ref(null)

const updateAuthState = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
  userRole.value = localStorage.getItem('role')
}

const logout = () => {
  localStorage.clear()
  updateAuthState()
  router.push('/login')
}

watch(
  () => route.path,
  () => {
    updateAuthState()
  },
)

onMounted(() => {
  updateAuthState()
})
</script>

<template>
  <v-app-bar elevation="1" color="white" class="px-md-10">
    <v-app-bar-title
      class="text-h5 font-weight-black text-primary cursor-pointer"
      @click="router.push('/')"
    >
      LUXURY<span class="text-grey-darken-2">HOTEL</span>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <div class="hidden-sm-and-down">
      <v-btn to="/" variant="text" class="text-none">Home</v-btn>
      <v-btn to="/rooms" variant="text" class="text-none">Rooms</v-btn>
      <v-btn to="/about" variant="text" class="text-none">About</v-btn>
      <v-btn to="/contact" variant="text" class="text-none">Contact</v-btn>

      <v-divider vertical inset class="mx-4"></v-divider>

      <template v-if="isLoggedIn && userRole === 'staff'">
        <v-btn to="/admin/dashboard" variant="text" class="text-none" color="indigo"
          >Dashboard</v-btn
        >
        <v-btn to="/admin/rooms" variant="text" class="text-none" color="indigo"
          >Manage Rooms</v-btn
        >
        <v-btn to="/admin/bookings" variant="text" class="text-none" color="indigo"
          >Manage Bookings</v-btn
        >
      </template>

      <template v-if="isLoggedIn && userRole === 'client'">
        <v-btn to="/my-bookings" variant="text" class="text-none" color="primary">My Bookings</v-btn>
      </template>

      <template v-if="!isLoggedIn">
        <v-btn to="/login" variant="text" class="text-none">Login</v-btn>
        <v-btn to="/register" variant="flat" color="primary" class="text-none ml-2">Register</v-btn>
      </template>

      <v-menu v-if="isLoggedIn" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="ml-2">
            <v-avatar color="primary" size="36">
              <v-icon color="white">{{
                userRole === 'staff' ? 'mdi-shield-account' : 'mdi-account'
              }}</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list width="150">
          <v-list-item to="/profile" prepend-icon="mdi-cog" title="Profile"></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click="logout"
            prepend-icon="mdi-logout"
            title="Logout"
            color="error"
          ></v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
