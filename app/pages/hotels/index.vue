<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Hotels & Accommodations | TravelMu',
  meta: [
    { name: 'description', content: 'Find and book the best hotels, resorts, and accommodations across Indonesia.' },
  ],
});

const isSearching = ref(false);
const sortBy = ref('price');

const form = reactive({
  destination: '',
  checkIn: '',
  checkOut: '',
  rooms: 1,
  guests: 2,
});

// Demo hotels data
const hotels = ref([
  { id: '1', name: 'The Mulia Bali', location: 'Nusa Dua, Bali', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600', rating: 4.9, reviews: 2340, price: 4500000, stars: 5, amenities: ['Pool', 'Spa', 'Beach', 'Restaurant'] },
  { id: '2', name: 'Alila Ubud', location: 'Ubud, Bali', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600', rating: 4.8, reviews: 1856, price: 3200000, stars: 5, amenities: ['Pool', 'Spa', 'Yoga', 'Restaurant'] },
  { id: '3', name: 'Amanjiwo Resort', location: 'Magelang, Java', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', rating: 4.9, reviews: 987, price: 6800000, stars: 5, amenities: ['Pool', 'Spa', 'Temple View', 'Restaurant'] },
  { id: '4', name: 'Plataran Komodo', location: 'Labuan Bajo', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', rating: 4.7, reviews: 654, price: 2800000, stars: 4, amenities: ['Pool', 'Diving', 'Restaurant'] },
  { id: '5', name: 'Hotel Indonesia Kempinski', location: 'Jakarta', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600', rating: 4.6, reviews: 3210, price: 1800000, stars: 5, amenities: ['Pool', 'Spa', 'Gym', 'Restaurant'] },
  { id: '6', name: 'Potato Head Beach Club', location: 'Seminyak, Bali', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600', rating: 4.5, reviews: 1543, price: 2200000, stars: 4, amenities: ['Pool', 'Beach Club', 'Restaurant', 'Bar'] },
]);

const handleSearch = async () => {
  isSearching.value = true;
  await new Promise(resolve => setTimeout(resolve, 800));
  isSearching.value = false;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <!-- Hero Search Section -->
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          <i class="fa-solid fa-hotel mr-3 text-coral-400"></i>
          Search Hotels
        </h1>
        <p class="text-slate-400 mb-8">Find the perfect stay for your trip</p>

        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="grid md:grid-cols-5 gap-4">
            <div class="relative md:col-span-2">
              <label class="block text-xs font-medium text-slate-500 mb-1">Destination</label>
              <input 
                v-model="form.destination"
                type="text" 
                placeholder="Bali, Indonesia"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Check-in</label>
              <input 
                v-model="form.checkIn"
                type="date" 
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Check-out</label>
              <input 
                v-model="form.checkOut"
                type="date" 
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
            <button 
              @click="handleSearch"
              :disabled="isSearching"
              class="text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all mt-5 flex items-center justify-center gap-2 disabled:opacity-50" 
              style="background: linear-gradient(90deg, #FF5A5F, #e04e52);"
            >
              <i v-if="isSearching" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-solid fa-magnifying-glass"></i>
              {{ isSearching ? 'Searching...' : 'Search' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <p class="text-slate-600">{{ hotels.length }} hotels found</p>
          <select v-model="sortBy" class="px-4 py-2 rounded-lg border border-slate-200 text-sm">
            <option value="price">Sort by: Lowest Price</option>
            <option value="rating">Sort by: Highest Rating</option>
            <option value="stars">Sort by: Star Rating</option>
          </select>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="hotel in hotels" 
            :key="hotel.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            @click="navigateTo(`/hotels/${hotel.id}`)"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="hotel.image" :alt="hotel.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                <div class="flex items-center gap-1">
                  <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                  <span class="font-semibold text-slate-900">{{ hotel.rating }}</span>
                </div>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-1 mb-2">
                <i v-for="n in hotel.stars" :key="n" class="fa-solid fa-star text-yellow-400 text-xs"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">{{ hotel.name }}</h3>
              <p class="text-slate-500 text-sm mb-3">
                <i class="fa-solid fa-location-dot mr-1"></i>
                {{ hotel.location }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="amenity in hotel.amenities.slice(0, 3)" :key="amenity" class="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                  {{ amenity }}
                </span>
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span class="text-slate-500 text-sm">From</span>
                  <div class="text-xl font-bold" style="color: #FF5A5F;">{{ formatPrice(hotel.price) }}</div>
                  <span class="text-slate-500 text-xs">/night</span>
                </div>
                <button class="px-4 py-2 text-white font-semibold rounded-xl text-sm" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
                  View
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
