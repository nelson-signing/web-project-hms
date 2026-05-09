<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { roomService } from '../api'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)

const roomId = route.params.id
const loading = ref(true)
const updating = ref(false)
const error = ref(null)
const successSnackbar = ref(false)

const roomData = ref({
  number: '',
  type: '',
  price_per_night: '',
  description: '',
  is_available: true,
  image: null
})

const currentImageUrl = ref('')
const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Penthouse']
const requiredRule = [v => !!v || 'This field is required']

const fetchRoomDetails = async () => {
  loading.value = true
  try {
    const response = await roomService.getById(roomId)
    const room = response.data

    roomData.value.number = room.number
    roomData.value.type = room.type
    roomData.value.price_per_night = room.price_per_night
    roomData.value.description = room.description
    roomData.value.is_available = room.is_available === true || room.is_available === 1

    if (room.image_url) {
      currentImageUrl.value = room.image_url.startsWith('http')
          ? room.image_url
          : `http://localhost:3000${room.image_url}`
    }
  } catch (err) {
    error.value = "Unable to find this room. It may have been deleted."
  } finally {
    loading.value = false
  }
}

const handleFileChange = (file) => {
  if (Array.isArray(file)) {
    roomData.value.image = file[0]
  } else {
    roomData.value.image = file
  }
}

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  updating.value = true
  error.value = null

  try {
    const formData = new FormData()
    formData.append('number', roomData.value.number)
    formData.append('type', roomData.value.type)
    formData.append('price_per_night', roomData.value.price_per_night)
    formData.append('description', roomData.value.description)
    formData.append('is_available', roomData.value.is_available)

    if (roomData.value.image) {
      formData.append('image', roomData.value.image)
    }

    await roomService.update(roomId, formData)

    successSnackbar.value = true
    setTimeout(() => {
      router.push('/admin/rooms')
    }, 1500)

  } catch (err) {
    error.value = err.response?.data?.message || "Failed to update the room."
  } finally {
    updating.value = false
  }
}

onMounted(fetchRoomDetails)
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-btn
              variant="text"
              prepend-icon="mdi-arrow-left"
              class="mb-4 text-none"
              @click="router.back()"
          >
            Back to rooms
          </v-btn>

          <v-card v-if="loading" rounded="xl" class="pa-12 text-center">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            <div class="mt-4 text-grey">Loading room data...</div>
          </v-card>

          <v-card v-else rounded="xl" elevation="2" class="pa-8">
            <div class="d-flex align-center justify-space-between mb-2">
              <h1 class="text-h4 font-weight-black">Edit Room</h1>
              <v-chip color="primary" variant="tonal" class="font-weight-bold">
                ID #{{ roomId }}
              </v-chip>
            </div>
            <p class="text-subtitle-1 text-grey-darken-1 mb-8">Modify the details below to update the inventory.</p>

            <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                closable
                class="mb-6 rounded-lg"
                @click:close="error = null"
            >
              {{ error }}
            </v-alert>

            <v-form ref="formRef" @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                      v-model="roomData.number"
                      label="Room Number"
                      variant="outlined"
                      :rules="requiredRule"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                      v-model="roomData.type"
                      :items="roomTypes"
                      label="Room Type"
                      variant="outlined"
                      :rules="requiredRule"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="roomData.price_per_night"
                      label="Price per Night (£)"
                      type="number"
                      variant="outlined"
                      :rules="requiredRule"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                      v-model="roomData.description"
                      label="Description"
                      variant="outlined"
                      rows="3"
                      :rules="requiredRule"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="mb-4">
                  <div class="text-subtitle-2 text-grey-darken-1 mb-2">Current Image</div>
                  <v-img
                      :src="currentImageUrl || 'https://via.placeholder.com/400x200?text=No+Image'"
                      height="180"
                      cover
                      rounded="lg"
                      class="bg-grey-lighten-2 mb-4"
                  ></v-img>

                  <v-file-input
                      label="Replace Image (Optional)"
                      variant="outlined"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      @update:model-value="handleFileChange"
                  ></v-file-input>
                </v-col>

                <v-col cols="12">
                  <v-switch
                      v-model="roomData.is_available"
                      label="Available for booking"
                      color="primary"
                      inset
                  ></v-switch>
                </v-col>
              </v-row>

              <v-btn
                  type="submit"
                  color="primary"
                  size="x-large"
                  block
                  rounded="lg"
                  height="56"
                  class="text-none font-weight-bold mt-4"
                  :loading="updating"
              >
                Save Changes
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
        v-model="successSnackbar"
        color="success"
        rounded="lg"
        :timeout="1500"
    >
      <div class="d-flex align-center">
        <v-icon start icon="mdi-check-circle" class="mr-2"></v-icon>
        <span class="font-weight-bold">Room updated successfully!</span>
      </div>
    </v-snackbar>
  </v-main>
</template>

<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>