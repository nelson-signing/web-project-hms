<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { roomService } from '../api'
import RoomCard from '../components/RoomCard.vue'

const router = useRouter()
const rooms = ref([])
const loading = ref(true)
const error = ref(null)

const filters = reactive({
  type: null,
  minPrice: '',
  maxPrice: '',
  is_available: false,
})

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Family']

const fetchRooms = async () => {
  loading.value = true
  error.value = null
  try {
    const params = {
      type: filters.type || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      is_available: filters.is_available || undefined,
    }
    const response = await roomService.getAll(params)
    rooms.value = response.data
  } catch (err) {
    error.value = 'Unable to fetch rooms. Please try again later.'
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/rooms/${id}`)
}

const resetFilters = () => {
  filters.type = null
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.is_available = false
  fetchRooms()
}

watch(
  filters,
  () => {
    fetchRooms()
  },
  { deep: true },
)

onMounted(fetchRooms)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <div class="mb-10 text-center">
        <h1 class="text-h3 font-weight-black mb-2">Our Collection</h1>
        <p class="text-grey-darken-1">Discover British luxury at its finest.</p>
      </div>

      <v-card class="pa-4 mb-10 rounded-xl" elevation="2">
        <v-row align="center" dense>
          <v-col cols="12" sm="4" md="3">
            <v-select
              v-model="filters.type"
              :items="roomTypes"
              label="Room Type"
              variant="outlined"
              hide-details
              clearable
              density="comfortable"
              prepend-inner-icon="mdi-bed"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="4" md="2">
            <v-text-field
              v-model="filters.minPrice"
              label="Min (£)"
              type="number"
              variant="outlined"
              hide-details
              density="comfortable"
              prepend-inner-icon="mdi-currency-gbp"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="2">
            <v-text-field
              v-model="filters.maxPrice"
              label="Max (£)"
              type="number"
              variant="outlined"
              hide-details
              density="comfortable"
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="3" class="d-flex justify-center">
            <v-switch
              v-model="filters.is_available"
              label="Available Only"
              color="primary"
              hide-details
              inset
              density="comfortable"
            ></v-switch>
          </v-col>

          <v-col cols="6" sm="6" md="2" class="text-right">
            <v-btn
              variant="text"
              color="error"
              @click="resetFilters"
              class="text-none font-weight-bold"
              prepend-icon="mdi-filter-off-outline"
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-row v-if="loading">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" lg="4">
          <v-skeleton-loader type="image, article" rounded="lg"></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-alert v-else-if="error" type="error" variant="tonal" class="rounded-lg">
        {{ error }}
      </v-alert>

      <v-row v-else-if="rooms.length > 0">
        <v-col v-for="room in rooms" :key="room.id_room" cols="12" sm="6" lg="4" class="pa-4">
          <RoomCard :room="room" @view-details="goToDetail" />
        </v-col>
      </v-row>

      <v-row v-else justify="center" class="mt-16">
        <v-col cols="12" md="6" class="text-center">
          <v-icon size="80" color="grey-lighten-1">mdi-magnify-close</v-icon>
          <h2 class="text-h5 text-grey-darken-1 mt-4">No rooms found</h2>
          <p class="text-grey mb-6">Try adjusting your filters to find your perfect stay.</p>
          <v-btn color="primary" rounded="lg" @click="resetFilters">Reset All Filters</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
