<script setup>
const hotelImage = '/images/about-hotel.jpg'
const parallaxImage = '/images/about-parallax.jpg'
</script>

<template>
  <div class="about-view bg-white">
    <section class="about-header py-16 bg-grey-lighten-4">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-black mb-6">About Luxury Hotel</h1>
            <p class="text-h6 text-grey-darken-1 font-weight-light leading-relaxed">
              Founded on the principles of elegance and world-class service, Luxury Hotel provides an
              unparalleled sanctuary for travelers seeking comfort and sophistication in the heart of the city.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container class="py-16">
      <v-row align="center" class="mb-16">
        <v-col cols="12" md="6">
          <v-img
              :src="hotelImage"
              rounded="xl"
              elevation="10"
              height="450"
              cover
          ></v-img>
        </v-col>
        <v-col cols="12" md="6" class="ps-md-12">
          <h2 class="text-h4 font-weight-bold mb-6">A Heritage of Excellence</h2>
          <p class="text-body-1 text-grey-darken-2 mb-6">
            Luxury Hotel has been a landmark of hospitality for over two decades. Our establishment
            combines classic architectural beauty with modern amenities to create an atmosphere
            that is both timeless and refreshing.
          </p>
          <div class="d-flex align-center mb-4">
            <v-icon color="primary" class="mr-3">mdi-check-circle-outline</v-icon>
            <span class="text-body-1 font-weight-medium">Prime City Center Location</span>
          </div>
          <div class="d-flex align-center">
            <v-icon color="primary" class="mr-3">mdi-check-circle-outline</v-icon>
            <span class="text-body-1 font-weight-medium">Award-winning Hospitality</span>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" md="6">
          <v-card flat class="pa-8 rounded-xl bg-grey-lighten-4 h-100">
            <v-icon size="48" color="primary" class="mb-6">mdi-bed-outline</v-icon>
            <h3 class="text-h5 font-weight-bold mb-4">Premium Accommodation</h3>
            <p class="text-body-1 text-grey-darken-1">
              Every room is designed with meticulous attention to detail. From high-thread-count
              linens to smart room controls, we ensure your stay is as comfortable as it is
              luxurious.
            </p>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat class="pa-8 rounded-xl bg-grey-lighten-4 h-100">
            <v-icon size="48" color="primary" class="mb-6">mdi-devices</v-icon>
            <h3 class="text-h5 font-weight-bold mb-4">Seamless Experience</h3>
            <p class="text-body-1 text-grey-darken-1">
              Our bespoke booking platform is built for the modern guest. We've eliminated
              the friction of traditional reservations, allowing you to browse, select, and
              confirm your stay in just a few clicks.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-parallax
        height="400"
        :src="parallaxImage"
        class="mt-10"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white text-center px-4 bg-black-overlay">
        <h2 class="text-h3 font-weight-black mb-4">Ready to stay with us?</h2>
        <v-btn
            to="/rooms"
            color="white"
            size="x-large"
            variant="flat"
            rounded="lg"
            class="text-none font-weight-bold px-10"
        >
          Explore Our Rooms
        </v-btn>
      </div>
    </v-parallax>
  </div>
</template>

<style scoped>
.leading-relaxed {
  line-height: 1.8 !important;
}

.about-header {
  border-bottom: 1px solid #e0e0e0;
}

.bg-black-overlay {
  background: rgba(0, 0, 0, 0.4);
}
</style>