<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../api'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
})

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await authService.register({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
      phone_number: form.phone_number,
      address: form.address,
    })

    successMessage.value = 'Account created successfully! Redirecting...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" lg="5">
        <v-card elevation="8" rounded="lg" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Create your Account
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-row>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="form.first_name"
                    label="First Name"
                    variant="outlined"
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    v-model="form.last_name"
                    label="Last Name"
                    variant="outlined"
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="form.email"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.phone_number"
                label="Phone Number"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <v-textarea
                v-model="form.address"
                label="Address"
                prepend-inner-icon="mdi-map-marker"
                variant="outlined"
                rows="2"
                class="mb-2"
                required
              ></v-textarea>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-alert
                v-if="successMessage"
                type="success"
                variant="tonal"
                density="compact"
                class="mb-4"
              >
                {{ successMessage }}
              </v-alert>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                class="text-none font-weight-bold"
              >
                Register
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <span class="text-body-2">Already have an account?</span>
            <v-btn to="/login" variant="text" color="primary" class="text-none px-1"> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
