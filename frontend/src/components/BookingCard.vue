<script setup>
import { computed } from 'vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cancel-booking'])

const BASE_URL = 'http://localhost:3000'

const fullImageUrl = computed(() => {
  const path = props.booking.Room?.image_url
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image'

  // Le path contient déjà "/uploads/rooms/", donc on ajoute juste le domaine
  return `${BASE_URL}${path}`
})

const isInactiveBooking = computed(() => {
  const isCancelled = props.booking.status?.toLowerCase() === 'cancelled'
  const isPast = new Date(props.booking.end_date) < new Date()
  return isCancelled || isPast
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <v-card
    rounded="xl"
    elevation="2"
    class="overflow-hidden mb-6 transition-swing"
    :class="{ 'inactive-card': isInactiveBooking }"
  >
    <v-row no-gutters align="center">
      <v-col cols="12" md="3">
        <v-img :src="fullImageUrl" height="200" cover class="bg-grey-lighten-2"></v-img>
      </v-col>

      <v-col cols="12" md="6" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center">
            <h2 class="text-h6 font-weight-black mr-3 text-uppercase">
              {{ booking.Room?.type }}
            </h2>
            <v-chip
              :color="booking.status === 'confirmed' ? 'success' : 'error'"
              size="x-small"
              class="text-uppercase font-weight-black"
              variant="flat"
            >
              {{ booking.status }}
            </v-chip>
          </div>
          <span class="text-caption font-weight-bold text-grey">
            ID #{{ booking.id_booking }}
          </span>
        </div>

        <div class="d-flex align-center mb-6">
          <v-avatar color="primary-lighten-5" size="40" class="mr-3">
            <v-icon color="primary" size="small">mdi-door-open</v-icon>
          </v-avatar>
          <div>
            <div class="text-caption text-grey leading-tight">NUMBER</div>
            <div class="text-h6 font-weight-black line-height-1">
              {{ booking.Room?.number }}
            </div>
          </div>
        </div>

        <v-row dense>
          <v-col cols="6">
            <div class="text-caption text-grey font-weight-black">CHECK-IN</div>
            <div class="text-body-2 font-weight-bold">
              {{ formatDate(booking.start_date) }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-caption text-grey font-weight-black">CHECK-OUT</div>
            <div class="text-body-2 font-weight-bold">
              {{ formatDate(booking.end_date) }}
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="3" class="pa-6 text-center text-md-right">
        <v-btn
          v-if="!isInactiveBooking"
          color="error"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          @click="emit('cancel-booking', booking.id_booking)"
        >
          Cancel
        </v-btn>
        <div v-else class="text-overline text-grey-lighten-1">
          {{ booking.status === 'cancelled' ? 'Cancelled' : 'Finished' }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.inactive-card {
  opacity: 0.5;
  filter: grayscale(1);
  background-color: #fcfcfc !important;
}
.transition-swing {
  transition: all 0.3s ease;
}
.line-height-1 {
  line-height: 1;
}
</style>
