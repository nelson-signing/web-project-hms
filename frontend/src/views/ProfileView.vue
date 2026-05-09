<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '../api'

const router = useRouter()
const loading = ref(true)
const isEditing = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  address: '',
  role: '',
})

const originalUser = ref({})

const fetchProfile = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await userService.getProfile()
    const userData = response.data.user

    const profileData = {
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      email: userData.email || '',
      phone_number: userData.Client?.phone_number || '',
      address: userData.Client?.address || '',
      role: localStorage.getItem('role') || 'client',
    }

    user.value = { ...profileData }
    originalUser.value = { ...profileData }
  } catch (error) {
    errorMessage.value = 'Failed to load profile data.'
    if (error.response?.status === 401) router.push('/login')
  } finally {
    loading.value = false
  }
}

const toggleEdit = () => {
  isEditing.value = true
}

const cancelEdit = () => {
  user.value = { ...originalUser.value }
  isEditing.value = false
  errorMessage.value = ''
  successMessage.value = ''
}

const handleUpdate = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const payload = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
    }

    if (user.value.role === 'client') {
      payload.phone_number = user.value.phone_number
      payload.address = user.value.address
    }

    await authService.updateProfile(payload)
    successMessage.value = 'Profile updated successfully!'
    originalUser.value = { ...user.value }
    isEditing.value = false
  } catch (error) {
    errorMessage.value = 'Failed to update profile.'
  }
}

const handleDelete = async () => {
  if (confirm('Are you sure? This action is permanent.')) {
    try {
      await userService.deleteAccount()
      localStorage.clear()
      router.push('/login')
    } catch (error) {
      errorMessage.value = 'Could not delete account.'
    }
  }
}

onMounted(fetchProfile)
</script>

<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card :loading="loading" elevation="4" rounded="lg" class="pa-6">
          <div v-if="!loading" class="d-flex justify-space-between align-center mb-6">
            <div>
              <v-card-title class="text-h4 font-weight-bold pa-0"> My Profile </v-card-title>
              <v-card-subtitle class="pa-0 mt-1">
                Account type:
                <span class="font-weight-bold text-primary text-uppercase">{{ user.role }}</span>
              </v-card-subtitle>
            </div>
            <v-btn
              v-if="!isEditing"
              prepend-icon="mdi-pencil"
              variant="tonal"
              color="primary"
              class="text-none"
              @click="toggleEdit"
            >
              Edit Profile
            </v-btn>
          </div>

          <v-card-text v-if="!loading">
            <v-form @submit.prevent="handleUpdate">
              <v-row>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="user.first_name"
                    label="First Name"
                    variant="outlined"
                    :readonly="!isEditing"
                    :bg-color="!isEditing ? 'grey-lighten-4' : ''"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="user.last_name"
                    label="Last Name"
                    variant="outlined"
                    :readonly="!isEditing"
                    :bg-color="!isEditing ? 'grey-lighten-4' : ''"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="user.email"
                label="Email Address"
                variant="outlined"
                readonly
                bg-color="grey-lighten-4"
                prepend-inner-icon="mdi-email-outline"
                class="mb-4"
              ></v-text-field>

              <template v-if="user.role === 'client'">
                <v-text-field
                  v-model="user.phone_number"
                  label="Phone Number"
                  variant="outlined"
                  :readonly="!isEditing"
                  :bg-color="!isEditing ? 'grey-lighten-4' : ''"
                  prepend-inner-icon="mdi-phone"
                  class="mb-4"
                ></v-text-field>

                <v-textarea
                  v-model="user.address"
                  label="Address"
                  variant="outlined"
                  :readonly="!isEditing"
                  :bg-color="!isEditing ? 'grey-lighten-4' : ''"
                  prepend-inner-icon="mdi-map-marker"
                  rows="2"
                  class="mb-6"
                ></v-textarea>
              </template>

              <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
                {{ errorMessage }}
              </v-alert>

              <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4">
                {{ successMessage }}
              </v-alert>

              <div v-if="isEditing" class="d-flex gap-4 mt-4">
                <v-btn type="submit" color="primary" size="large" class="text-none px-8 mr-4">
                  Save Changes
                </v-btn>
                <v-btn variant="outlined" size="large" class="text-none px-8" @click="cancelEdit">
                  Cancel
                </v-btn>
              </div>

              <v-divider v-if="!isEditing" class="my-6"></v-divider>

              <div v-if="!isEditing" class="d-flex justify-end">
                <v-btn
                  color="error"
                  variant="text"
                  size="small"
                  class="text-none"
                  @click="handleDelete"
                >
                  Delete my account
                </v-btn>
              </div>
            </v-form>
          </v-card-text>

          <v-card-text v-else class="text-center py-10">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
