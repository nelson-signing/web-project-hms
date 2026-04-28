<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">🏨 StayFinder</div>
        <div class="nav-actions">
          <button v-if="!isLoggedIn" class="login-btn" @click="handleLogin">Login</button>
          <div v-else class="user-profile">
            <span>Welcome, Traveler!</span>
            <button class="logout-btn" @click="isLoggedIn = false">Logout</button>
          </div>
        </div>
      </div>
      <h2>Find your perfect room for the night</h2>
    </nav>

    <header class="hero-text"></header>

    <main>
      <section class="filter-controls">
        <div class="input-group">
          <label for="search">Where to?</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or city..."
          />
        </div>

        <div class="input-group">
          <label
            >Max Price: <strong>${{ maxPrice }}</strong></label
          >
          <input v-model.number="maxPrice" type="range" min="50" max="1000" step="10" />
        </div>
      </section>

      <hr class="section-divider" />

      <section class="results">
        <div v-if="filteredRooms.length > 0" class="room-grid">
          <div v-for="room in filteredRooms" :key="room.id" class="room-card">
            <div class="room-image">
              <img :src="room.image" :alt="room.name" />
            </div>

            <div class="room-info">
              <h3>{{ room.name }}</h3>
              <p class="location">📍 {{ room.location }}</p>
              <p class="price">${{ room.price }}<span>/night</span></p>

              <button class="details-btn" @click="selectedRoom = room">View Details</button>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <p>No rooms found matching your search.</p>
        </div>
      </section>

      <div v-if="selectedRoom" class="modal-overlay" @click.self="selectedRoom = null">
        <div class="modal-content">
          <button class="close-btn" @click="selectedRoom = null">&times;</button>
          <div class="modal-image">
            <img :src="selectedRoom.image" :alt="selectedRoom.name" />
          </div>
          <h2>{{ selectedRoom.name }}</h2>
          <p class="modal-location">Located in {{ selectedRoom.location }}</p>
          <div class="modal-body">
            <p><strong>Price:</strong> ${{ selectedRoom.price }} per night</p>
            <p><strong>Description:</strong> Beautiful room in {{ selectedRoom.location }}.</p>
          </div>
          <button v-if="isLoggedIn" class="book-btn" @click="selectedRoom = null">
            Confirm Booking
          </button>
          <button v-else class="book-btn inactive" @click="handleLogin">Login to Book</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rooms = ref([
  {
    id: 1,
    name: 'Grand Imperial Suite',
    location: 'London',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Sunset Beach Bungalow',
    location: 'Malibu',
    price: 280,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Alpine Ski Lodge',
    location: 'Zermatt',
    price: 600,
    image:
      'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Urban Minimalism Loft',
    location: 'Tokyo',
    price: 190,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Historic Canal House',
    location: 'Amsterdam',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Desert Oasis Villa',
    location: 'Dubai',
    price: 850,
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
  },
])

const searchQuery = ref('')
const maxPrice = ref(1000)
const selectedRoom = ref(null)
const isLoggedIn = ref(false)

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const query = searchQuery.value.toLowerCase()
    const nameMatch = room.name.toLowerCase().includes(query)
    const locationMatch = room.location.toLowerCase().includes(query)
    const priceMatch = room.price <= maxPrice.value
    return (nameMatch || locationMatch) && priceMatch
  })
})

const handleLogin = () => {
  const userConfirm = confirm('Do you want to simulate a login?')
  if (userConfirm) isLoggedIn.value = true
}
</script>

<style>
/* Reset and Layout */
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f7f6;
  margin: 0; /* Fixed: removed the 110 typo */
  color: #333;
}

#app {
  max-width: 490px;
  margin: 10 auto;
  padding-bottom: 40px;
}

/* Navbar with separation */
.navbar {
  background: gold;
  border-bottom: 1px solid #eee;
  border-radius: 150px;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1000px;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

/* Sub-header spacing */
.hero-text {
  text-align: center;
  padding: 40px 0; /* Added vertical space */
  color: #555;
}

/* Filters */
.filter-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin: 10 20px; /* Side margins for mobile */
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
input[type='text'] {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section-divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 40px 20px;
}

/* Grid & Cards */
.results {
  padding: 0 20px;
}
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.room-image {
  width: 100%;
  height: 200px;
  overflow: hidden; /* Clips the image to the card border */
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the photo fills the box without stretching */
  transition: transform 0.5s ease;
}

.room-card:hover .room-image img {
  transform: scale(1.1); /* Subtle zoom effect */
}

.room-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #eee;
  overflow: hidden; /* Important to keep image corners rounded */
  text-align: center;
}

.modal-image {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}
.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.room-info {
  padding: 20px;
}

/* Buttons & UI Components */
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #2c3e50;
}
.login-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 25px;
  cursor: pointer;
}
.logout-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 25px;
  cursor: pointer;
}

.details-btn {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.book-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.book-btn.inactive {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>
