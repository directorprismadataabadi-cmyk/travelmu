<script setup lang="ts">
const route = useRoute();

definePageMeta({ layout: 'default' });
useHead({ title: 'Rental Details | TravelMu' });

const car = ref({
  id: route.params.id,
  name: 'Toyota Avanza',
  type: 'MPV',
  image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
  price: 450000,
  seats: 7,
  transmission: 'Automatic',
  fuel: 'Petrol',
  features: ['Air Conditioning', 'Audio System', 'USB Port', 'Bluetooth'],
  includes: ['Comprehensive insurance', 'Unlimited mileage', '24/7 support'],
});

const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/rentals" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>Back to rentals
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-white">{{ car.name }}</h1>
        <p class="text-slate-400 mt-1">{{ car.type }}</p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <img :src="car.image" alt="Car" class="w-full h-80 object-cover rounded-2xl mb-8" />
      
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Specifications</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-slate-50 rounded-xl">
                <div class="text-slate-500 text-sm">Seats</div>
                <div class="text-xl font-bold text-slate-900">{{ car.seats }} passengers</div>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                <div class="text-slate-500 text-sm">Transmission</div>
                <div class="text-xl font-bold text-slate-900">{{ car.transmission }}</div>
              </div>
              <div class="p-4 bg-slate-50 rounded-xl">
                <div class="text-slate-500 text-sm">Fuel Type</div>
                <div class="text-xl font-bold text-slate-900">{{ car.fuel }}</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Features</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="f in car.features" :key="f" class="px-3 py-2 bg-slate-100 rounded-lg text-slate-700">{{ f }}</span>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">What's Included</h2>
            <div class="space-y-2">
              <div v-for="item in car.includes" :key="item" class="flex items-center gap-2">
                <i class="fa-solid fa-check text-green-500"></i>
                <span class="text-slate-700">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24 h-fit">
          <div class="text-center mb-6">
            <div class="text-sm text-slate-500">Daily rate</div>
            <div class="text-3xl font-bold" style="color: #FF5A5F;">{{ formatPrice(car.price) }}</div>
            <div class="text-slate-500">/day</div>
          </div>
          <button class="w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
            <i class="fa-solid fa-car mr-2"></i>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
