<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { roomService } from '../api'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
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

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Penthouse']
const requiredRule = [v => !!v || 'This field is required']

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

  loading.value = true
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

    await roomService.create(formData)

    successSnackbar.value = true
    setTimeout(() => {
      router.push('/admin/rooms')
    }, 1500)

  } catch (err) {
    error.value = err.response?.data?.message || "Failed to create the room."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-main class="bg-grey-lighten-4 min-vh-100">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-btn variant="text" prepend-icon="mdi-arrow-left" class="mb-4 text-none" @click="router.back()">
            Back to rooms
          </v-btn>

          <v-card rounded="xl" elevation="2" class="pa-8">
            <h1 class="text-h4 font-weight-black mb-2">Add New Room</h1>
            <p class="text-subtitle-1 text-grey-darken-1 mb-8">Enter details. Image is optional.</p>

            <v-alert v-if="error" type="error" variant="tonal" closable class="mb-6 rounded-lg" @click:close="error = null">
              {{ error }}
            </v-alert>

            <v-form ref="formRef" @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="roomData.number" label="Room Number" variant="outlined" :rules="requiredRule"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="roomData.type" :items="roomTypes" label="Room Type" variant="outlined" :rules="requiredRule"></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="roomData.price_per_night" label="Price (£)" type="number" variant="outlined" :rules="requiredRule"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="roomData.description" label="Description" variant="outlined" rows="3" :rules="requiredRule"></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                      label="Room Image (Optional)"
                      variant="outlined"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                      @update:model-value="handleFileChange"
                  ></v-file-input>
                </v-col>

                <v-col cols="12">
                  <v-switch v-model="roomData.is_available" label="Available for booking" color="primary" inset></v-switch>
                </v-col>
              </v-row>

              <v-btn type="submit" color="primary" size="x-large" block rounded="lg" class="text-none font-weight-bold mt-4" :loading="loading">
                Create Room
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="successSnackbar" color="success" rounded="lg" :timeout="1500">
      Room created successfully!
    </v-snackbar>
  </v-main>
</template>