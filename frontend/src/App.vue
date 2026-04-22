<template>
  <div id="app">
  <nav class="navbar">
      <div class="nav-container">
        <div class="logo">🏨 StayFinder</div>
        <div class="nav-actions">
          <button v-if="!isLoggedIn" class="login-btn" @click="handleLogin">
            Login
          </button>
          <div v-else class="user-profile">
            <span>Welcome, Traveler!</span>
            <button class="logout-btn" @click="isLoggedIn = false">Logout</button>
          </div>
        </div>
      </div>
    </nav>
    <header>
      <h1>🏨 StayFinder</h1>
      <p>Find your perfect room for the night</p>
    </header>

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
          <label>Max Price: <strong>${{ maxPrice }}</strong></label>
          <input 
            v-model.number="maxPrice" 
            type="range" 
            min="50" 
            max="1000" 
            step="10"
          />
        </div>
      </section>

      <hr />

      <section class="results">
        <div v-if="filteredRooms.length > 0" class="room-grid">
          <div v-for="room in filteredRooms" :key="room.id" class="room-card">
            <div class="room-info">
              <h3>{{ room.name }}</h3>
              <p class="location">📍 {{ room.location }}</p>
              <p class="price">${{ room.price }}<span>/night</span></p>
              
              <button class="details-btn" @click="selectedRoom = room">
                View Details
              </button>
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
          <h2>{{ selectedRoom.name }}</h2>
          <p class="modal-location">Located in {{ selectedRoom.location }}</p>
          <div class="modal-body">
            <p><strong>Price:</strong> ${{ selectedRoom.price }} per night</p>
            <p><strong>Description:</strong> This beautiful room offers premium amenities, high-speed Wi-Fi, and a stunning view of the surrounding {{ selectedRoom.location }} area.</p>
            <ul>
              <li>Free Breakfast</li>
              <li>Cancelation up to 24h before</li>
              <li>King Size Bed</li>
            </ul>
          </div>
          <button class="book-btn" @click="selectedRoom = null">Book Now</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const rooms = ref([
  { id: 1, name: 'Grand Imperial Suite', location: 'London', price: 450 },
  { id: 2, name: 'Sunset Beach Bungalow', location: 'Malibu', price: 280 },
  { id: 3, name: 'Alpine Ski Lodge', location: 'Zermatt', price: 600 },
  { id: 4, name: 'Urban Minimalism Loft', location: 'Tokyo', price: 190 },
  { id: 5, name: 'Historic Canal House', location: 'Amsterdam', price: 320 },
  { id: 6, name: 'Desert Oasis Villa', location: 'Dubai', price: 850 },
]);

// Search & Filter State
const searchQuery = ref('');
const maxPrice = ref(1000);

// NEW: State for the currently selected room
const selectedRoom = ref(null);

const filteredRooms = computed(() => {
  return rooms.value.filter(room => {
    const query = searchQuery.value.toLowerCase();
    const nameMatch = room.name.toLowerCase().includes(query);
    const locationMatch = room.location.toLowerCase().includes(query);
    const priceMatch = room.price <= maxPrice.value;
    return (nameMatch || locationMatch) && priceMatch;
  });
});
</script>

<style>
/* Basic Global Styles */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f4f7f6;
  margin: 0;
  color: #333;
}

#app {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

/* Filter Bar Styling */
.filter-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
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
  font-size: 16px;
}

/* Room Grid Styling */
.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.room-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  transition: transform 0.2s;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.room-info {
  padding: 15px;
}

.room-info h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.location {
  color: #666;
  font-size: 14px;
}

.price {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
  margin-top: 10px;
}

.price span {
  font-size: 12px;
  font-weight: normal;
  color: #999;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #888;
}

hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 40px 0;
}
.details-btn {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.details-btn:hover {
  background-color: #2980b9;
}

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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.book-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
