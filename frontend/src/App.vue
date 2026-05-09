<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-app>
    <NavBar />

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-0">
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.v-application {
  min-height: 100vh;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1976d2;
}

.v-main {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}
</style>
