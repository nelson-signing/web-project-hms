<script setup>
import { reactive, ref } from 'vue'
import { authService } from '../api'
import { useRouter } from 'vue-router'

const loading = ref(false)
const router = useRouter()
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  registration_key: '',
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})

const handleStaffRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await authService.registerStaff(form)
    successMessage.value = "Staff account created successfully! Redirecting..."
    setTimeout(() => router.push('/login'), 2000)
  } catch (e) {
    errorMessage.value = e.response?.data?.message || "Invalid key or registration error"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card elevation="8" rounded="lg" class="pa-8">
          <v-card-title class="text-h5 font-weight-bold text-center mb-2">
            Internal Staff Setup
          </v-card-title>
          <p class="text-subtitle-2 text-grey text-center mb-8">
            Create a professional account using the master key
          </p>

          <v-card-text>
            <v-form @submit.prevent="handleStaffRegister">
              <v-text-field
                v-model="form.registration_key"
                label="Secret Registration Key"
                prepend-inner-icon="mdi-key-star"
                type="password"
                variant="outlined"
                color="primary"
                required
                class="mb-2"
              ></v-text-field>

              <v-divider class="my-6"></v-divider>

              <v-row>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="form.first_name"
                    label="First Name"
                    variant="outlined"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="form.last_name"
                    label="Last Name"
                    variant="outlined"
                    color="primary"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="form.email"
                label="Professional Email"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                variant="outlined"
                color="primary"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                variant="outlined"
                color="primary"
                required
                class="mb-4"
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-6 rounded-lg"
              >
                {{ errorMessage }}
              </v-alert>

              <v-alert
                v-if="successMessage"
                type="success"
                variant="tonal"
                density="compact"
                class="mb-6 rounded-lg"
              >
                {{ successMessage }}
              </v-alert>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                height="55"
                :loading="loading"
                class="text-none font-weight-bold"
              >
                Register Staff Member
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center mt-4">
            <v-btn to="/login" variant="text" color="grey-darken-1" class="text-none">
              Back to Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>