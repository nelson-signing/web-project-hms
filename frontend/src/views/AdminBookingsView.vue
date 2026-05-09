<script setup>
import { ref, onMounted } from 'vue'
import { bookingService, roomService } from '../api'

const bookings = ref([])
const loading = ref(true)
const error = ref(null)

const BASE_URL = 'http://localhost:3000'

const fetchBookings = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await bookingService.getAll()
    bookings.value = response.data
  } catch (err) {
    error.value = 'Failed to load bookings. Please check your connection.'
  } finally {
    loading.value = false
  }
}

const isInactive = (booking) => {
  const isCancelled = booking.status?.toLowerCase() === 'cancelled'
  const isPast = new Date(booking.end_date) < new Date()
  return isCancelled || isPast
}

const handleCancel = async (id) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return

  try {
    const bookingToCancel = bookings.value.find((b) => b.id_booking === id)
    await bookingService.cancel(id)

    if (bookingToCancel && bookingToCancel.id_room) {
      const formData = new FormData()
      formData.append('is_available', true)
      await roomService.update(bookingToCancel.id_room, formData)
    }

    const index = bookings.value.findIndex((b) => b.id_booking === id)
    if (index !== -1) {
      bookings.value[index].status = 'cancelled'
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Error while cancelling the booking.')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image'
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
}

onMounted(fetchBookings)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <header class="mb-10">
        <h1 class="text-h4 font-weight-black text-grey-darken-4 mb-2">Reservations Management</h1>
        <p class="text-subtitle-1 text-grey-darken-1">View and manage all guest bookings</p>
      </header>

      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n" cols="12">
          <v-skeleton-loader
            type="image, list-item-three-line"
            class="rounded-xl"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-alert v-else-if="error" type="error" variant="tonal" class="rounded-xl mb-6">
        {{ error }}
      </v-alert>

      <div v-else-if="bookings.length > 0">
        <v-card
          v-for="booking in bookings"
          :key="booking.id_booking"
          rounded="xl"
          elevation="2"
          class="mb-6 overflow-hidden border transition-all"
          :class="{ 'inactive-booking': isInactive(booking) }"
        >
          <v-row no-gutters>
            <v-col cols="12" md="3">
              <v-img
                :src="getImageUrl(booking.Room?.image_url)"
                height="100%"
                min-height="220"
                cover
                class="bg-grey-lighten-2"
              >
                <v-chip
                  :color="booking.status === 'confirmed' ? 'success' : 'error'"
                  size="small"
                  variant="flat"
                  class="ma-4 font-weight-black text-uppercase"
                >
                  {{ booking.status }}
                </v-chip>
              </v-img>
            </v-col>

            <v-col cols="12" md="6" class="pa-6">
              <div class="d-flex justify-space-between align-start mb-4">
                <div>
                  <div class="text-overline text-primary font-weight-black mb-1">Guest</div>
                  <h3 class="text-h6 font-weight-bold">
                    {{ booking.Client?.User?.first_name }} {{ booking.Client?.User?.last_name }}
                  </h3>
                  <div class="text-body-2 text-grey-darken-1">
                    <v-icon size="small" class="mr-1">mdi-email-outline</v-icon>
                    {{ booking.Client?.User?.email }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-overline text-grey font-weight-black mb-1">Booking ID</div>
                  <div class="text-subtitle-2 font-weight-bold">#{{ booking.id_booking }}</div>
                </div>
              </div>

              <v-divider class="mb-4"></v-divider>

              <v-row dense align="center">
                <v-col cols="12" sm="5">
                  <div class="text-caption text-grey font-weight-bold text-uppercase">Check-in</div>
                  <div class="text-body-1 font-weight-bold">
                    {{ formatDate(booking.start_date) }}
                  </div>
                </v-col>
                <v-col cols="12" sm="2" class="text-center d-none d-sm-block">
                  <v-icon color="grey-lighten-1">mdi-arrow-right</v-icon>
                </v-col>
                <v-col cols="12" sm="5">
                  <div class="text-caption text-grey font-weight-bold text-uppercase">
                    Check-out
                  </div>
                  <div class="text-body-1 font-weight-bold">{{ formatDate(booking.end_date) }}</div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="3" class="pa-6 bg-grey-lighten-5 border-left d-flex flex-column">
              <div class="mb-4">
                <div class="text-overline text-grey font-weight-black mb-1">
                  Room {{ booking.Room?.number }}
                </div>
                <div class="text-subtitle-1 font-weight-bold text-uppercase">
                  {{ booking.Room?.type }}
                </div>
              </div>

              <div class="mt-auto">
                <div class="text-caption text-grey font-weight-bold">TOTAL PRICE</div>
                <div
                  class="text-h5 font-weight-black text-primary"
                  :class="{ 'mb-4': booking.status === 'confirmed' && !isInactive(booking) }"
                >
                  £{{ booking.total_price }}
                </div>

                <v-btn
                  v-if="booking.status === 'confirmed' && !isInactive(booking)"
                  color="error"
                  variant="tonal"
                  block
                  rounded="lg"
                  prepend-icon="mdi-calendar-cancel"
                  class="text-none font-weight-bold"
                  @click="handleCancel(booking.id_booking)"
                >
                  Cancel Booking
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <v-row v-else justify="center" class="mt-16">
        <v-col cols="12" md="6" class="text-center">
          <v-icon size="100" color="grey-lighten-2">mdi-calendar-blank</v-icon>
          <h2 class="text-h5 font-weight-bold text-grey-darken-2 mt-6">No reservations found</h2>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
.border-left {
  border-left: 1px solid #e0e0e0;
}
.inactive-booking {
  opacity: 0.5;
  filter: grayscale(0.8);
  background-color: #f5f5f5 !important;
}
.transition-all {
  transition: all 0.3s ease;
}
@media (max-width: 960px) {
  .border-left {
    border-left: none;
    border-top: 1px solid #e0e0e0;
  }
}
</style>
