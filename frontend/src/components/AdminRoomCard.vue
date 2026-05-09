<script setup>
import { computed } from 'vue'

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit-room', 'delete-room'])

const BASE_URL = 'http://localhost:3000'

const fullImageUrl = computed(() => {
  const path = props.room.image_url
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image'
  return path.startsWith('http') ? path : `${BASE_URL}${path}`
})
</script>

<template>
  <v-card rounded="xl" elevation="2" class="overflow-hidden mb-4 border">
    <v-row no-gutters align="center">
      <v-col cols="12" md="3">
        <v-img
            :src="fullImageUrl"
            height="160"
            cover
            class="bg-grey-lighten-2"
        ></v-img>
      </v-col>

      <v-col cols="12" md="6" class="pa-5">
        <div class="d-flex align-center mb-1">
          <span class="text-overline font-weight-black text-primary mr-3">N° {{ room.number }}</span>
          <v-chip
              :color="room.is_available ? 'success' : 'error'"
              size="x-small"
              variant="flat"
              class="text-uppercase font-weight-bold"
          >
            {{ room.is_available ? 'Available' : 'Not available' }}
          </v-chip>
        </div>

        <h3 class="text-h6 font-weight-bold mb-1 text-uppercase">{{ room.type }}</h3>

        <div class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-2">
          £{{ room.price_per_night }} <span class="text-caption text-grey">/ night</span>
        </div>

        <p class="text-body-2 text-grey-darken-1 text-truncate" style="max-width: 400px;">
          {{ room.description }}
        </p>
      </v-col>

      <v-col cols="12" md="3" class="pa-5 text-center text-md-right">
        <div class="d-flex flex-md-column justify-center gap-2">
          <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              prepend-icon="mdi-pencil-outline"
              class="text-none font-weight-bold mb-md-2 mr-2 mr-md-0"
              @click="emit('edit-room', room.id_room)"
          >
            Edit
          </v-btn>

          <v-btn
              color="error"
              variant="tonal"
              rounded="lg"
              prepend-icon="mdi-delete-outline"
              class="text-none font-weight-bold"
              @click="emit('delete-room', room.id_room)"
          >
            Delete
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}

.border {
  border: 1px solid #e0e0e0 !important;
}

.v-card {
  transition: transform 0.2s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}
</style>
