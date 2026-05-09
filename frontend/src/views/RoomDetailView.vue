<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { roomService, bookingService, userService } from '../api'

const route = useRoute()
const router = useRouter()

const room = ref(null)
const loading = ref(true)
const bookingLoading = ref(false)
const fetchError = ref('')
const bookingError = ref('')
const successMessage = ref('')

const BASE_URL = 'http://localhost:3000'

const clients = ref([])
const isStaff = computed(() => localStorage.getItem('role') === 'staff')
const selectedClientId = ref(null)

const bookingData = ref({
  start_date: '',
  end_date: '',
})

const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const totalDetails = computed(() => {
  if (!bookingData.value.start_date || !bookingData.value.end_date || !room.value) {
    return null
  }

  const start = new Date(bookingData.value.start_date)
  const end = new Date(bookingData.value.end_date)
  const diffTime = end - start
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return null

  return {
    days: diffDays,
    totalPrice: diffDays * room.value.price_per_night,
  }
})

const fetchRoomDetails = async () => {
  loading.value = true
  fetchError.value = ''
  try {
    const id = route.params.id
    const response = await roomService.getById(id)
    room.value = response.data
  } catch (err) {
    fetchError.value = 'Unable to load room details.'
  } finally {
    loading.value = false
  }
}

const fetchClients = async () => {
  if (!isStaff.value) return
  try {
    const response = await userService.getAll()
    clients.value = response.data.map((c) => ({
      fullName: `${c.User.first_name} ${c.User.last_name}`,
      id: c.id_user,
    }))
  } catch (err) {
    console.error(err)
  }
}

const handleBooking = async () => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  if (isStaff.value && !selectedClientId.value) {
    bookingError.value = 'Please select a client.'
    return
  }

  bookingError.value = ''
  successMessage.value = ''

  if (!bookingData.value.start_date || !bookingData.value.end_date) {
    bookingError.value = 'Please select stay dates.'
    return
  }

  if (totalDetails.value === null) {
    bookingError.value = 'Check-out date must be after check-in date.'
    return
  }

  bookingLoading.value = true

  try {
    const payload = {
      id_room: Number(room.value.id_room),
      start_date: bookingData.value.start_date,
      end_date: bookingData.value.end_date,
      id_client: isStaff.value ? selectedClientId.value : null,
    }
    await bookingService.create(payload)
    successMessage.value = 'Booking confirmed! Redirecting...'
    const target = isStaff.value ? '/admin/bookings' : '/my-bookings'
    setTimeout(() => router.push(target), 2000)
  } catch (err) {
    bookingError.value = err.response?.data?.message || 'Booking failed.'
  } finally {
    bookingLoading.value = false
  }
}

const today = computed(() => new Date().toISOString().split('T')[0])

onMounted(() => {
  fetchRoomDetails()
  fetchClients()
})
</script>

<template>
  <v-main class="bg-grey-lighten-5 min-vh-100">
    <v-container class="py-10">
      <v-row v-if="loading" justify="center" class="py-16">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-row>

      <v-row v-else-if="room">
        <v-col cols="12" lg="7">
          <v-btn
            variant="text"
            prepend-icon="mdi-arrow-left"
            @click="router.back()"
            class="mb-4 text-none"
          >
            Back
          </v-btn>
          <v-img
            :src="`${BASE_URL}${room.image_url}`"
            height="500"
            cover
            rounded="xl"
            class="elevation-10 bg-grey-lighten-2"
          ></v-img>
        </v-col>

        <v-col cols="12" lg="5" class="ps-lg-8">
          <div class="mb-4 d-flex align-center">
            <v-chip
              :color="room.is_available ? 'success' : 'error'"
              variant="flat"
              class="font-weight-bold"
              size="small"
            >
              {{ room.is_available ? 'AVAILABLE' : 'NOT AVAILABLE' }}
            </v-chip>
            <span class="ms-4 text-overline text-primary font-weight-black"
              >Room #{{ room.number }}</span
            >
          </div>

          <h1 class="text-h3 font-weight-black mb-2">{{ room.type }}</h1>
          <div class="text-h4 text-primary font-weight-bold mb-8">
            £{{ room.price_per_night }} <span class="text-body-1 text-grey-darken-1">/ night</span>
          </div>

          <v-divider class="mb-8"></v-divider>
          <p class="text-body-1 text-grey-darken-2 mb-10">{{ room.description }}</p>

          <v-card rounded="xl" border elevation="0" class="pa-6 bg-white">
            <h3 class="text-h6 font-weight-bold mb-5">
              {{ isStaff ? 'Staff Booking' : 'Reserve Your Stay' }}
            </h3>

            <v-form @submit.prevent="handleBooking">
              <v-expand-transition>
                <div v-if="isStaff" class="mb-4">
                  <v-autocomplete
                    v-model="selectedClientId"
                    :items="clients"
                    item-title="fullName"
                    item-value="id"
                    label="Search Client"
                    placeholder="Start typing guest name..."
                    prepend-inner-icon="mdi-account-search"
                    variant="outlined"
                    color="primary"
                    required
                    clearable
                  ></v-autocomplete>
                </div>
              </v-expand-transition>

              <v-row density="comfortable">
                <v-col cols="12">
                  <v-text-field
                    v-model="bookingData.start_date"
                    label="Check-in"
                    type="date"
                    variant="outlined"
                    :min="today"
                    persistent-placeholder
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="bookingData.end_date"
                    label="Check-out"
                    type="date"
                    variant="outlined"
                    :min="bookingData.start_date || today"
                    persistent-placeholder
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-expand-transition>
                <div
                  v-if="totalDetails"
                  class="bg-grey-lighten-4 pa-4 rounded-lg my-4 border-dashed"
                >
                  <div class="d-flex justify-space-between mb-1">
                    <span>£{{ room.price_per_night }} x {{ totalDetails.days }} nights</span>
                    <span>£{{ totalDetails.totalPrice }}</span>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div class="d-flex justify-space-between font-weight-black text-h6">
                    <span>Total</span>
                    <span class="text-primary">£{{ totalDetails.totalPrice }}</span>
                  </div>
                </div>
              </v-expand-transition>

              <v-alert
                v-if="bookingError"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-4 mt-2"
              >
                {{ bookingError }}
              </v-alert>

              <v-alert
                v-if="successMessage"
                type="success"
                variant="tonal"
                density="compact"
                class="mb-4 mt-2"
              >
                {{ successMessage }}
              </v-alert>

              <v-btn
                type="submit"
                color="primary"
                size="x-large"
                block
                rounded="lg"
                height="56"
                class="text-none font-weight-bold mt-2"
                :loading="bookingLoading"
                :disabled="!room.is_available"
              >
                {{
                  isStaff
                    ? 'Confirm Client Booking'
                    : isAuthenticated
                      ? 'Book Now'
                      : 'Login to Book'
                }}
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>