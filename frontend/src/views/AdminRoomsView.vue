<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { roomService } from '../api'
import AdminRoomCard from '../components/AdminRoomCard.vue'

const router = useRouter()
const rooms = ref([])
const loading = ref(true)
const error = ref(null)

const fetchRooms = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await roomService.getAll()
    rooms.value = response.data
  } catch (err) {
    error.value = 'Failed to load rooms. Please check your connection.'
  } finally {
    loading.value = false
  }
}

const handleEdit = (id) => {
  router.push(`/admin/rooms/${id}/edit`)
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this room? This action cannot be undone.')) return

  try {
    await roomService.delete(id)
    rooms.value = rooms.value.filter((room) => room.id_room !== id)
  } catch (err) {
    alert(err.response?.data?.message || 'Error while deleting the room.')
  }
}

onMounted(fetchRooms)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <header class="d-flex flex-column flex-sm-row justify-space-between align-sm-center mb-10">
        <div>
          <h1 class="text-h4 font-weight-black text-grey-darken-4 mb-2">Room Management</h1>
          <p class="text-subtitle-1 text-grey-darken-1">
            Manage inventory, prices and availability
          </p>
        </div>
        <v-btn
          color="primary"
          size="large"
          rounded="lg"
          prepend-icon="mdi-plus"
          to="/admin/rooms/add"
          class="text-none font-weight-bold mt-4 mt-sm-0"
          elevation="2"
        >
          Add Room
        </v-btn>
      </header>

      <v-row v-if="loading">
        <v-col v-for="n in 4" :key="n" cols="12">
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

      <div v-else-if="rooms.length > 0">
        <v-row>
          <v-col v-for="room in rooms" :key="room.id_room" cols="12">
            <AdminRoomCard :room="room" @edit-room="handleEdit" @delete-room="handleDelete" />
          </v-col>
        </v-row>
      </div>

      <v-row v-else justify="center" class="mt-16">
        <v-col cols="12" md="6" class="text-center">
          <v-sheet class="bg-transparent pa-10">
            <v-icon size="100" color="grey-lighten-2">mdi-bed-outline</v-icon>
            <h2 class="text-h5 font-weight-bold text-grey-darken-2 mt-6">Inventory is empty</h2>
            <p class="text-grey mt-2 mb-8">No rooms have been added to the system yet.</p>
            <v-btn
              color="primary"
              variant="flat"
              rounded="xl"
              to="/admin/rooms/add"
              class="px-10 text-none font-weight-bold"
            >
              Add your first room
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
  animation: fadeIn 0.5s ease-out;
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
