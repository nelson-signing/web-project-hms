<script setup></script>

<template>
  <v-footer class="bg-grey-darken-4 text-white py-10">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center mb-3">
            <v-icon color="primary" size="28" class="mr-2">mdi-gold</v-icon>
            <span class="text-h6 font-weight-black tracking-tight">
              LUXURY <span class="text-primary">HOTEL</span>
            </span>
          </div>
          <p class="text-grey-lighten-1 text-body-2 leading-relaxed max-width-300">
            Experience premium stays in the world's most beautiful locations. Redefining the art of
            hospitality.
          </p>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="mb-6 mb-md-0">
          <h3 class="text-subtitle-2 font-weight-bold mb-4 text-white border-left-accent pl-3">
            Quick Links
          </h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/rooms">Rooms</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <h3 class="text-subtitle-2 font-weight-bold mb-4 text-white border-left-accent pl-3">
            Contact Information
          </h3>
          <div class="d-flex align-start mb-3">
            <v-icon size="small" color="primary" class="mr-3 mt-1">mdi-email-outline</v-icon>
            <span class="text-body-2 text-grey-lighten-1">support@luxuryhotel.com</span>
          </div>
          <div class="d-flex align-start mb-3">
            <v-icon size="small" color="primary" class="mr-3 mt-1">mdi-phone-outline</v-icon>
            <span class="text-body-2 text-grey-lighten-1">+44 1782 123456</span>
          </div>
          <div class="d-flex align-start">
            <v-icon size="small" color="primary" class="mr-3 mt-1">mdi-map-marker-outline</v-icon>
            <span class="text-body-2 text-grey-lighten-1">
              Frensham Cl, Stoke-on-Trent ST6 7PB,<br />United Kingdom
            </span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mt-10 mb-6 border-opacity-25"></v-divider>

      <div class="d-flex flex-column flex-md-row justify-space-between align-center">
        <span class="text-caption text-grey-lighten-1">
          © {{ new Date().getFullYear() }} Luxury Hotel - All rights reserved
        </span>
        <div class="d-flex gap-4 mt-4 mt-md-0">
          <v-btn icon="mdi-facebook" variant="text" size="small" color="grey-lighten-1"></v-btn>
          <v-btn icon="mdi-instagram" variant="text" size="small" color="grey-lighten-1"></v-btn>
          <v-btn icon="mdi-twitter" variant="text" size="small" color="grey-lighten-1"></v-btn>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<style scoped>
.max-width-300 {
  max-width: 300px;
}

.border-left-accent {
  border-left: 3px solid #1976d2;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  text-decoration: none;
  color: #bdbdbd;
  font-size: 0.875rem;
  transition: 0.2s ease;
}

.footer-links a:hover {
  color: #2196f3;
  padding-left: 4px;
}

.gap-4 {
  gap: 12px;
}

@media (max-width: 960px) {
  .max-width-300 {
    max-width: 100%;
  }
}
</style>
