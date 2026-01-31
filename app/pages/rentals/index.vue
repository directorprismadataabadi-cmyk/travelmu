<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({ layout: 'default' });
useHead({ title: 'Car Rentals | TravelMu' });

const rentals = ref([
  { id: '1', name: 'Toyota Avanza', type: 'MPV', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600', price: 450000, seats: 7, transmission: 'Automatic', fuel: 'Petrol' },
  { id: '2', name: 'Honda Jazz', type: 'Hatchback', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', price: 350000, seats: 5, transmission: 'Automatic', fuel: 'Petrol' },
  { id: '3', name: 'Toyota Fortuner', type: 'SUV', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600', price: 850000, seats: 7, transmission: 'Automatic', fuel: 'Diesel' },
  { id: '4', name: 'Suzuki Ertiga', type: 'MPV', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', price: 400000, seats: 7, transmission: 'Manual', fuel: 'Petrol' },
]);

const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          <i class="fa-solid fa-car mr-3 text-coral-400"></i>
          Car Rentals
        </h1>
        <p class="text-slate-400 mb-8">Find the perfect car for your journey</p>

        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="grid md:grid-cols-5 gap-4">
            <div class="relative md:col-span-2">
              <label class="block text-xs font-medium text-slate-500 mb-1">Pickup Location</label>
              <input type="text" placeholder="Airport, city, etc." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Pickup Date</label>
              <input type="date" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Return Date</label>
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
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <article 
          v-for="car in rentals" 
          :key="car.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          @click="navigateTo(`/rentals/${car.id}`)"
        >
          <img :src="car.image" :alt="car.name" class="w-full h-40 object-cover" />
          <div class="p-5">
            <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{{ car.type }}</span>
            <h3 class="text-lg font-bold text-slate-900 mt-2">{{ car.name }}</h3>
            <div class="flex items-center gap-3 text-sm text-slate-500 mt-2">
              <span><i class="fa-solid fa-user-group mr-1"></i>{{ car.seats }}</span>
              <span><i class="fa-solid fa-gear mr-1"></i>{{ car.transmission }}</span>
            </div>
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div>
                <div class="text-xl font-bold" style="color: #FF5A5F;">{{ formatPrice(car.price) }}</div>
                <span class="text-slate-500 text-xs">/day</span>
              </div>
              <button class="px-4 py-2 text-white font-semibold rounded-xl text-sm" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">Rent</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
