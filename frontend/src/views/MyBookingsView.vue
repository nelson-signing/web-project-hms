<script setup>
import { ref, onMounted } from 'vue'
import { bookingService, roomService } from '../api'
import BookingCard from '../components/BookingCard.vue'

const bookings = ref([])
const loading = ref(true)
const error = ref(null)

const fetchBookings = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await bookingService.getAll()
    bookings.value = response.data
  } catch (err) {
    error.value = 'Failed to load your bookings. Please try again later.'
  } finally {
    loading.value = false
  }
}

const handleCancelBooking = async (id) => {
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
    alert(err.response?.data?.message || 'Cancellation failed.')
  }
}

onMounted(fetchBookings)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <header class="mb-10 d-flex justify-space-between align-end">
        <div>
          <h1 class="text-h4 font-weight-black text-grey-darken-4 mb-2">My Dashboard</h1>
          <p class="text-subtitle-1 text-grey-darken-1">
            Manage your stays and view your history at Luxury Hotel.
          </p>
        </div>
        <v-btn
          prepend-icon="mdi-plus"
          color="primary"
          rounded="lg"
          to="/rooms"
          class="text-none font-weight-bold"
          elevation="2"
        >
          New Booking
        </v-btn>
      </header>

      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n" cols="12">
          <v-skeleton-loader
            type="image, list-item-two-line"
            class="rounded-xl"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-alert
        v-else-if="error"
        type="error"
        variant="tonal"
        icon="mdi-alert-circle"
        class="rounded-xl mb-6"
      >
        {{ error }}
      </v-alert>

      <div v-else-if="bookings.length > 0">
        <v-row>
          <v-col v-for="booking in bookings" :key="booking.id_booking" cols="12">
            <BookingCard :booking="booking" @cancel-booking="handleCancelBooking" />
          </v-col>
        </v-row>
      </div>

      <v-row v-else justify="center" class="mt-16">
        <v-col cols="12" md="6" class="text-center">
          <v-sheet class="bg-transparent pa-10">
            <v-icon size="120" color="grey-lighten-2">mdi-calendar-remove</v-icon>
            <h2 class="text-h5 font-weight-bold text-grey-darken-2 mt-6">No bookings found</h2>
            <p class="text-grey mt-2 mb-8">It seems you haven't booked any rooms yet.</p>
            <v-btn
              color="primary"
              size="x-large"
              rounded="xl"
              to="/rooms"
              class="px-10 text-none font-weight-bold"
              elevation="6"
            >
              Explore Rooms
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}

.v-row {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
