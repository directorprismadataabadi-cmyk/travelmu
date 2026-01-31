<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({ layout: 'default' });
useHead({ title: 'Travel Packages | TravelMu' });

const packages = ref([
  { id: '1', name: 'Bali Paradise Week', destination: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', duration: '7 days', rating: 4.9, price: 15000000, includes: ['Flights', 'Hotel', 'Tours', 'Meals'] },
  { id: '2', name: 'Yogyakarta Heritage Tour', destination: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600', duration: '4 days', rating: 4.8, price: 8500000, includes: ['Flights', 'Hotel', 'Tours'] },
  { id: '3', name: 'Raja Ampat Adventure', destination: 'Raja Ampat', image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600', duration: '5 days', rating: 4.9, price: 22000000, includes: ['Flights', 'Resort', 'Diving', 'Meals'] },
  { id: '4', name: 'Komodo Explorer', destination: 'Labuan Bajo', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600', duration: '3 days', rating: 4.7, price: 12000000, includes: ['Flights', 'Hotel', 'Boat Trips'] },
]);

const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          <i class="fa-solid fa-gift mr-3 text-coral-400"></i>
          Travel Packages
        </h1>
        <p class="text-slate-400 mb-8">All-inclusive packages for the perfect vacation</p>

        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="grid md:grid-cols-4 gap-4">
            <div class="relative md:col-span-2">
              <label class="block text-xs font-medium text-slate-500 mb-1">Destination</label>
              <input type="text" placeholder="Where do you want to go?" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Travel Date</label>
              <input type="date" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 outline-none" />
            </div>
            <button class="text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all mt-5 flex items-center justify-center gap-2" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
              <i class="fa-solid fa-magnifying-glass"></i>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 px-4">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <article 
          v-for="pkg in packages" 
          :key="pkg.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col md:flex-row"
          @click="navigateTo(`/packages/${pkg.id}`)"
        >
          <img :src="pkg.image" :alt="pkg.name" class="w-full md:w-64 h-48 md:h-auto object-cover" />
          <div class="p-6 flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-1 bg-coral-50 text-coral-600 text-xs font-medium rounded">{{ pkg.duration }}</span>
              <span class="flex items-center gap-1 text-sm"><i class="fa-solid fa-star text-yellow-400"></i>{{ pkg.rating }}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-1">{{ pkg.name }}</h3>
            <p class="text-slate-500 text-sm mb-4"><i class="fa-solid fa-location-dot mr-1"></i>{{ pkg.destination }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="item in pkg.includes" :key="item" class="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                <i class="fa-solid fa-check text-green-500 mr-1"></i>{{ item }}
              </span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span class="text-slate-500 text-sm">From</span>
                <div class="text-2xl font-bold" style="color: #FF5A5F;">{{ formatPrice(pkg.price) }}</div>
                <span class="text-slate-500 text-xs">/person</span>
              </div>
              <button class="px-6 py-2 text-white font-semibold rounded-xl" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">View</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
