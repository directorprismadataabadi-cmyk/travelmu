<script setup lang="ts">
const route = useRoute();

definePageMeta({ layout: 'default' });
useHead({ title: 'Experience Details | TravelMu' });

const experience = ref({
  id: route.params.id,
  name: 'Bali Sunrise Trekking',
  location: 'Mount Batur, Bali',
  image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
  rating: 4.9,
  reviews: 432,
  price: 650000,
  duration: '6 hours',
  category: 'Adventure',
  description: 'Experience the magical sunrise from the summit of Mount Batur. This guided trek takes you through volcanic terrain to witness breathtaking views as the sun rises over the caldera.',
  includes: ['Professional guide', 'Flashlight', 'Breakfast at summit', 'Pickup & dropoff'],
  highlights: ['Sunrise views', 'Active volcano', 'Natural hot springs', 'Photo opportunities'],
});

const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/experiences" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>Back to experiences
        </NuxtLink>
        <span class="px-3 py-1 bg-coral-500 text-white text-sm font-medium rounded-full">{{ experience.category }}</span>
        <h1 class="text-2xl md:text-3xl font-bold text-white mt-2">{{ experience.name }}</h1>
        <p class="text-slate-400 mt-1"><i class="fa-solid fa-location-dot mr-1"></i>{{ experience.location }}</p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <img :src="experience.image" alt="Experience" class="w-full h-80 object-cover rounded-2xl mb-8" />
      
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-3">About This Experience</h2>
            <p class="text-slate-600">{{ experience.description }}</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">What's Included</h2>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="item in experience.includes" :key="item" class="flex items-center gap-2">
                <i class="fa-solid fa-check text-green-500"></i>
                <span class="text-slate-700">{{ item }}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Highlights</h2>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="item in experience.highlights" :key="item" class="flex items-center gap-2">
                <i class="fa-solid fa-star text-yellow-400"></i>
                <span class="text-slate-700">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24 h-fit">
          <div class="flex items-center gap-2 mb-4">
            <i class="fa-solid fa-clock text-slate-500"></i>
            <span class="text-slate-600">{{ experience.duration }}</span>
          </div>
          <div class="flex items-center gap-2 mb-6">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <span class="font-semibold">{{ experience.rating }}</span>
            <span class="text-slate-500">({{ experience.reviews }} reviews)</span>
          </div>
          <div class="text-center mb-6">
            <div class="text-sm text-slate-500">From</div>
            <div class="text-3xl font-bold" style="color: #FF5A5F;">{{ formatPrice(experience.price) }}</div>
            <div class="text-slate-500">/person</div>
          </div>
          <button class="w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
