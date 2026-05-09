<script setup>
const BASE_URL = 'http://localhost:3000'

defineProps({
  room: {
    type: Object,
    required: true,
  },
})

defineEmits(['view-details'])
</script>

<template>
  <v-card
    class="mx-auto h-100 cursor-pointer room-card"
    elevation="2"
    rounded="lg"
    @click="$emit('view-details', room.id_room)"
  >
    <v-img :src="`${BASE_URL}${room.image_url}`" height="250" cover class="align-start">
      <v-chip
        :color="room.is_available ? 'success' : 'error'"
        class="ma-3 font-weight-bold"
        size="small"
        variant="flat"
      >
        {{ room.is_available ? 'Available' : 'Not available' }}
      </v-chip>
    </v-img>

    <v-card-item>
      <div class="text-overline mb-1 text-primary font-weight-bold">Room #{{ room.number }}</div>
      <v-card-title class="text-h6 pt-0">
        {{ room.type }}
      </v-card-title>
    </v-card-item>

    <v-card-text class="pb-6">
      <div class="text-h6 text-grey-darken-3">
        £{{ room.price_per_night }} <span class="text-caption">/ night</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.room-card {
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.room-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
}
</style>
