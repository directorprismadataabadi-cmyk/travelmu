<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Hotel Details | TravelMu',
});

const hotel = ref({
  id: route.params.id,
  name: 'The Mulia Bali',
  location: 'Nusa Dua, Bali',
  address: 'Jl. Raya Nusa Dua Selatan, Kawasan Sawangan, Nusa Dua',
  rating: 4.9,
  reviews: 2340,
  stars: 5,
  price: 4500000,
  images: [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  ],
  description: 'Experience unparalleled luxury at The Mulia Bali, where contemporary elegance meets traditional Balinese hospitality. Nestled along the pristine white sand beach of Nusa Dua, this world-class resort offers an unforgettable escape.',
  amenities: ['Infinity Pool', 'Private Beach', 'Spa & Wellness', 'Multiple Restaurants', 'Fitness Center', 'Kids Club', 'Butler Service', 'Free WiFi'],
  rooms: [
    { type: 'Deluxe Room', size: '45 sqm', price: 4500000, beds: '1 King Bed' },
    { type: 'Ocean Suite', size: '75 sqm', price: 7200000, beds: '1 King Bed' },
    { type: 'Villa with Pool', size: '120 sqm', price: 12000000, beds: '1 King Bed' },
  ],
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <NuxtLink to="/hotels" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          Back to hotels
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-white">{{ hotel.name }}</h1>
        <p class="text-slate-400 mt-1">
          <i class="fa-solid fa-location-dot mr-1"></i>
          {{ hotel.location }}
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Image Gallery -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="col-span-2 row-span-2">
          <img :src="hotel.images[0]" alt="Hotel" class="w-full h-full object-cover rounded-2xl" />
        </div>
        <img :src="hotel.images[1]" alt="Hotel" class="w-full h-48 object-cover rounded-2xl" />
        <img :src="hotel.images[2]" alt="Hotel" class="w-full h-48 object-cover rounded-2xl" />
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Overview -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-1">
                <i v-for="n in hotel.stars" :key="n" class="fa-solid fa-star text-yellow-400"></i>
              </div>
              <div class="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                <i class="fa-solid fa-star text-green-600"></i>
                <span class="font-semibold text-green-700">{{ hotel.rating }}</span>
                <span class="text-green-600 text-sm">({{ hotel.reviews }} reviews)</span>
              </div>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">About This Hotel</h2>
            <p class="text-slate-600 leading-relaxed">{{ hotel.description }}</p>
          </div>

          <!-- Amenities -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Amenities</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="amenity in hotel.amenities" :key="amenity" class="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <i class="fa-solid fa-check text-green-500"></i>
                <span class="text-slate-700 text-sm">{{ amenity }}</span>
              </div>
            </div>
          </div>

          <!-- Room Options -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Available Rooms</h2>
            <div class="space-y-4">
              <div v-for="room in hotel.rooms" :key="room.type" class="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-coral-500 transition-colors">
                <div>
                  <h3 class="font-semibold text-slate-900">{{ room.type }}</h3>
                  <p class="text-slate-500 text-sm">{{ room.size }} • {{ room.beds }}</p>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold" style="color: #FF5A5F;">{{ formatPrice(room.price) }}</div>
                  <span class="text-slate-500 text-sm">/night</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <div class="text-center mb-6">
              <div class="text-sm text-slate-500">Starting from</div>
              <div class="text-3xl font-bold" style="color: #FF5A5F;">{{ formatPrice(hotel.price) }}</div>
              <div class="text-slate-500">/night</div>
            </div>
            <button class="w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
              <i class="fa-solid fa-calendar-check mr-2"></i>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
