<script setup>
import { ref, onMounted, computed } from 'vue'
import { roomService, bookingService } from '../api'

const rooms = ref([])
const bookings = ref([])
const loading = ref(true)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  try {
    const [roomsRes, bookingsRes] = await Promise.all([
      roomService.getAll(),
      bookingService.getAll()
    ])
    rooms.value = roomsRes.data
    bookings.value = bookingsRes.data
  } catch (err) {
    error.value = "Failed to load statistics."
  } finally {
    loading.value = false
  }
}

const stats = computed(() => {
  const totalRooms = rooms.value.length

  const validBookings = bookings.value.filter(b => b.status !== 'cancelled')

  const confirmedBookings = validBookings.filter(b => b.status === 'confirmed')

  const occupancyRate = totalRooms > 0
    ? Math.round((confirmedBookings.length / totalRooms) * 100)
    : 0

  const uniqueGuests = new Set(
    validBookings
      .map(b => b.Client?.id_client || b.id_client)
      .filter(id => !!id)
  ).size

  return [
    { title: 'Occupancy Rate', value: `${occupancyRate}%`, icon: 'mdi-percent', color: 'deep-purple', desc: 'Active stays' },
    { title: 'Total Guests', value: uniqueGuests, icon: 'mdi-account-group', color: 'blue-grey', desc: 'Non-cancelled guests' },
    { title: 'Active Rooms', value: rooms.value.filter(r => r.is_available).length, icon: 'mdi-bed-check', color: 'blue', desc: 'Ready to book' },
    { title: 'Cancellations', value: bookings.value.filter(b => b.status === 'cancelled').length, icon: 'mdi-calendar-remove', color: 'red', desc: 'Lost bookings' }
  ]
})

const recentBookings = computed(() => {
  return [...bookings.value]
    .sort((a, b) => b.id_booking - a.id_booking)
    .slice(0, 5)
})

onMounted(fetchData)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">

      <header class="mb-10">
        <h1 class="text-h4 font-weight-black text-grey-darken-4">Hotel Overview</h1>
        <p class="text-subtitle-1 text-grey-darken-1">Real-time occupancy and guest activity.</p>
      </header>

      <v-alert v-if="error" type="error" variant="tonal" class="mb-6 rounded-xl">
        {{ error }}
      </v-alert>

      <v-row class="mb-10">
        <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
          <v-card rounded="xl" elevation="2" class="pa-5 border-0">
            <v-avatar :color="stat.color" variant="tonal" rounded="lg" size="48" class="mb-4">
              <v-icon :icon="stat.icon"></v-icon>
            </v-avatar>
            <div class="text-h4 font-weight-black mb-1">
              {{ loading ? '...' : stat.value }}
            </div>
            <div class="text-subtitle-2 font-weight-bold text-grey-darken-2">{{ stat.title }}</div>
            <div class="text-caption text-grey">{{ stat.desc }}</div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="8">
          <v-card rounded="xl" elevation="2" class="pa-6">
            <div class="d-flex align-center justify-space-between mb-6">
              <h2 class="text-h5 font-weight-bold">Recent Bookings</h2>
              <v-btn to="/admin/bookings" variant="text" color="primary" class="text-none">View all</v-btn>
            </div>

            <v-table v-if="!loading">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Guest</th>
                <th class="text-left font-weight-bold">Room</th>
                <th class="text-left font-weight-bold">Dates</th>
                <th class="text-left font-weight-bold">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="booking in recentBookings" :key="booking.id_booking">
                <td>
                  <div class="font-weight-medium">
                    {{ booking.Client?.User?.first_name }} {{ booking.Client?.User?.last_name }}
                  </div>
                </td>
                <td>Room {{ booking.Room?.number }}</td>
                <td class="text-caption">
                  {{ new Date(booking.start_date).toLocaleDateString() }}
                </td>
                <td>
                  <v-chip
                    :color="booking.status === 'confirmed' ? 'success' : 'error'"
                    size="x-small"
                    class="text-uppercase font-weight-bold"
                  >
                    {{ booking.status }}
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </v-table>
            <div v-else class="py-10 text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card rounded="xl" elevation="2" class="pa-6 h-100">
            <h2 class="text-h5 font-weight-bold mb-6">Inventory Status</h2>

            <div class="mb-6">
              <div class="d-flex justify-space-between text-body-2 mb-1">
                <span>Operational Capacity</span>
                <span class="font-weight-bold">{{ rooms.length }} Rooms</span>
              </div>
              <v-progress-linear
                color="primary"
                height="8"
                :model-value="rooms.length > 0 ? 100 : 0"
                rounded
              ></v-progress-linear>
            </div>

            <v-list density="compact" class="bg-transparent">
              <v-list-item class="px-0">
                <template v-slot:prepend><v-icon color="success" size="small">mdi-circle</v-icon></template>
                <v-list-item-title class="text-body-2">Available for Sale</v-list-item-title>
                <template v-slot:append>
                  <span class="font-weight-bold">{{ rooms.filter(r => r.is_available).length }}</span>
                </template>
              </v-list-item>

              <v-list-item class="px-0">
                <template v-slot:prepend><v-icon color="warning" size="small">mdi-circle</v-icon></template>
                <v-list-item-title class="text-body-2">Occupied / Maintenance</v-list-item-title>
                <template v-slot:append>
                  <span class="font-weight-bold">{{ rooms.filter(r => !r.is_available).length }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
.v-table {
  background: transparent !important;
}
</style>