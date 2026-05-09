<script setup>
import { ref, onMounted } from 'vue'
import { roomService } from '../api'

const rooms = ref([])
const loading = ref(true)
const error = ref(null)

const fetchFeaturedRooms = async () => {
  loading.value = true
  try {
    const response = await roomService.getAll()
    rooms.value = response.data.slice(0, 3)
  } catch (err) {
    error.value = "Failed to load featured rooms."
  } finally {
    loading.value = false
  }
}

onMounted(fetchFeaturedRooms)
</script>

<template>
  <div class="home-view">
    <section class="hero-section d-flex align-center justify-center text-center text-white">
      <v-img
        src="/images/hero-bg.jpg"
        cover
        class="hero-bg"
      >
        <div class="hero-overlay d-flex flex-column align-center justify-center px-4">
          <h1 class="text-h2 text-md-h1 font-weight-black mb-4 fade-in">LUXURY HOTEL</h1>
          <p class="text-h5 text-md-h4 font-weight-light mb-8 fade-in delay-1">
            Book your room easily and quickly
          </p>
          <v-btn
            color="primary"
            size="x-large"
            rounded="pill"
            to="/rooms"
            class="px-10 text-none font-weight-bold fade-in delay-2"
            elevation="8"
          >
            Browse Rooms
          </v-btn>
        </div>
      </v-img>
    </section>

    <v-container class="py-16">
      <v-row class="text-center mb-10">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold text-grey-darken-4">Why Choose Us</h2>
          <v-divider class="mx-auto mt-4" width="80" thickness="3" color="primary"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card flat class="text-center pa-6 hover-card bg-transparent">
            <v-avatar color="primary-lighten-5" size="80" class="mb-6">
              <v-icon color="primary" size="40">mdi-calendar-check</v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Easy booking</h3>
            <p class="text-grey-darken-1">Simple and intuitive process to find your perfect stay in seconds.</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center pa-6 hover-card bg-transparent">
            <v-avatar color="primary-lighten-5" size="80" class="mb-6">
              <v-icon color="primary" size="40">mdi-bed-king-outline</v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Comfortable rooms</h3>
            <p class="text-grey-darken-1">Premium bedding and luxury amenities for a restful night's sleep.</p>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat class="text-center pa-6 hover-card bg-transparent">
            <v-avatar color="primary-lighten-5" size="80" class="mb-6">
              <v-icon color="primary" size="40">mdi-lightning-bolt-outline</v-icon>
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mb-3">Fast reservation system</h3>
            <p class="text-grey-darken-1">Instant confirmation with real-time availability updates.</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <section class="bg-grey-lighten-4 py-16">
      <v-container>
        <div class="d-flex justify-space-between align-end mb-10">
          <div>
            <h2 class="text-h4 font-weight-bold">Featured Rooms</h2>
            <p class="text-grey-darken-1">Handpicked selections for your next stay</p>
          </div>
          <v-btn to="/rooms" variant="text" color="primary" class="text-none font-weight-bold">
            View all rooms <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>

        <v-row v-if="loading">
          <v-col v-for="n in 3" :key="n" cols="12" md="4">
            <v-skeleton-loader type="card" class="rounded-xl"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row v-else-if="!error">
          <v-col v-for="room in rooms" :key="room.id_room" cols="12" md="4">
            <v-card rounded="xl" elevation="2" class="room-card h-100" :to="`/rooms/${room.id_room}`">
              <v-img
                :src="room.image_url.startsWith('http') ? room.image_url : `http://localhost:3000${room.image_url}`"
                height="240"
                cover
              >
                <div class="pa-4">
                  <v-chip color="white" class="font-weight-bold" variant="flat">
                    £{{ room.price_per_night }} / night
                  </v-chip>
                </div>
              </v-img>
              <v-card-text class="pa-5">
                <div class="text-overline text-primary font-weight-black mb-1">N° {{ room.number }}</div>
                <h3 class="text-h6 font-weight-bold mb-2 text-uppercase">{{ room.type }}</h3>
                <p class="text-body-2 text-grey-darken-1 line-clamp-2">
                  {{ room.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-alert v-else type="error" variant="tonal" class="rounded-xl">
          {{ error }}
        </v-alert>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  height: 90vh;
  position: relative;
}

.hero-bg {
  height: 100%;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
}

.hover-card {
  transition: transform 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-8px);
}

.room-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.room-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

.fade-in {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>