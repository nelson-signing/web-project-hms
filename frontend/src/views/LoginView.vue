<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../api'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await authService.login({
      email: form.email,
      password: form.password,
    })

    const { token, role } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('role', role)

    if (role === 'staff') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" lg="5">
        <v-card elevation="8" rounded="lg" class="pa-8">
          <v-card-title class="text-h5 font-weight-bold text-center mb-6">
            Sign In to Luxury Hotel
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                variant="outlined"
                color="primary"
                class="mb-4"
                min-height="65"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                variant="outlined"
                color="primary"
                class="mb-6"
                min-height="65"
                required
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                density="compact"
                class="mb-6"
              >
                {{ errorMessage }}
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
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center mt-4">
            <span class="text-body-2 text-grey-darken-1">Don't have an account?</span>
            <v-btn to="/register" variant="text" color="primary" class="text-none px-1">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
