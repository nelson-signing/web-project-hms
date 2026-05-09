<script setup>
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const formRef = ref(null)

const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const requiredRules = [
  v => !!v || 'This field is required'
]

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()

  if (valid) {
    isSubmitting.value = true

    setTimeout(() => {
      isSubmitting.value = false
      isSubmitted.value = true
      contactForm.value = { name: '', email: '', message: '' }
    }, 1500)
  }
}
</script>

<template>
  <div class="contact-view">
    <section class="contact-header py-16 bg-grey-lighten-4 border-bottom">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-black mb-6">Contact Us</h1>
            <p class="text-h6 text-grey-darken-1 font-weight-light">
              Have a question or need assistance with your booking? Our team is here to help you
              experience the perfect stay.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="5" class="pr-md-12 mb-12 mb-md-0">
          <h2 class="text-h4 font-weight-bold mb-8">Get in Touch</h2>

          <v-card variant="flat" class="bg-grey-lighten-5 pa-6 rounded-xl mb-6">
            <div class="d-flex align-start mb-6">
              <v-avatar color="primary" size="48" class="mr-4">
                <v-icon color="white">mdi-email-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-overline text-primary font-weight-bold">Email Us</div>
                <div class="text-h6 font-weight-medium">support@luxuryhotel.com</div>
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="d-flex align-start mb-6">
              <v-avatar color="primary" size="48" class="mr-4">
                <v-icon color="white">mdi-phone-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-overline text-primary font-weight-bold">Call Us</div>
                <div class="text-h6 font-weight-medium">+44 1782 123456</div>
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>

            <div class="d-flex align-start">
              <v-avatar color="primary" size="48" class="mr-4">
                <v-icon color="white">mdi-map-marker-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-overline text-primary font-weight-bold">Visit Us</div>
                <div class="text-h6 font-weight-medium">
                  Frensham Cl, Stoke-on-Trent ST6 7PB, United Kingdom
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="7">
          <v-card border elevation="0" rounded="xl" class="pa-8 pa-md-10 bg-white">
            <h3 class="text-h5 font-weight-bold mb-6">Send us a Message</h3>

            <v-alert
                v-if="isSubmitted"
                type="success"
                variant="tonal"
                closable
                class="rounded-xl mb-6"
                @click:close="isSubmitted = false"
            >
              Thank you! Your message has been sent successfully. We will get back to you soon.
            </v-alert>

            <v-form ref="formRef" @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                      v-model="contactForm.name"
                      label="Your Name"
                      variant="outlined"
                      placeholder="John Doe"
                      :rules="requiredRules"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                      v-model="contactForm.email"
                      label="Email Address"
                      variant="outlined"
                      placeholder="john@example.com"
                      :rules="emailRules"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                      v-model="contactForm.message"
                      label="Your Message"
                      variant="outlined"
                      placeholder="How can we help you?"
                      rows="5"
                      :rules="requiredRules"
                      required
                  ></v-textarea>
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
                  :loading="isSubmitting"
              >
                Send Message
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.contact-view {
  min-height: 100vh;
}

.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.contact-header {
  position: relative;
}
</style>