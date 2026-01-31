<script setup lang="ts">
const route = useRoute();

definePageMeta({ layout: 'default' });
useHead({ title: 'Package Details | TravelMu' });

const pkg = ref({
  id: route.params.id,
  name: 'Bali Paradise Week',
  destination: 'Bali, Indonesia',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  duration: '7 days / 6 nights',
  rating: 4.9,
  reviews: 234,
  price: 15000000,
  description: 'Experience the best of Bali with our all-inclusive package. From stunning temples to beautiful beaches, this week-long adventure covers all the highlights of the Island of Gods.',
  includes: ['Round-trip flights', '5-star hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance'],
  itinerary: [
    { day: 1, title: 'Arrival & Welcome', activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'] },
    { day: 2, title: 'Temple Tour', activities: ['Ulun Danu Temple', 'Tanah Lot sunset', 'Traditional dance show'] },
    { day: 3, title: 'Ubud Discovery', activities: ['Monkey Forest', 'Rice terraces', 'Art galleries'] },
    { day: 4, title: 'Beach Day', activities: ['Nusa Dua beach', 'Water sports', 'Spa treatment'] },
    { day: 5, title: 'East Bali', activities: ['Tirta Gangga', 'Lempuyang Temple', 'Traditional village'] },
    { day: 6, title: 'Free Day', activities: ['Optional activities', 'Shopping', 'Farewell dinner'] },
    { day: 7, title: 'Departure', activities: ['Breakfast', 'Airport transfer', 'Departure'] },
  ],
});

const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/packages" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>Back to packages
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-white">{{ pkg.name }}</h1>
        <p class="text-slate-400 mt-1"><i class="fa-solid fa-location-dot mr-1"></i>{{ pkg.destination }} • {{ pkg.duration }}</p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <img :src="pkg.image" alt="Package" class="w-full h-80 object-cover rounded-2xl mb-8" />
      
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center gap-2 mb-4">
              <i class="fa-solid fa-star text-yellow-400"></i>
              <span class="font-semibold">{{ pkg.rating }}</span>
              <span class="text-slate-500">({{ pkg.reviews }} reviews)</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">About This Package</h2>
            <p class="text-slate-600">{{ pkg.description }}</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">What's Included</h2>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="item in pkg.includes" :key="item" class="flex items-center gap-2">
                <i class="fa-solid fa-check text-green-500"></i>
                <span class="text-slate-700">{{ item }}</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Itinerary</h2>
            <div class="space-y-4">
              <div v-for="day in pkg.itinerary" :key="day.day" class="flex gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style="background-color: #FF5A5F;">
                  <span class="text-white font-bold">{{ day.day }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900">{{ day.title }}</h3>
                  <ul class="text-slate-600 text-sm mt-1">
                    <li v-for="activity in day.activities" :key="activity">• {{ activity }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24 h-fit">
          <div class="text-center mb-6">
            <div class="text-sm text-slate-500">{{ pkg.duration }}</div>
            <div class="text-3xl font-bold mt-2" style="color: #FF5A5F;">{{ formatPrice(pkg.price) }}</div>
            <div class="text-slate-500">/person</div>
          </div>
          <button class="w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
            <i class="fa-solid fa-shopping-cart mr-2"></i>
            Book Package
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
