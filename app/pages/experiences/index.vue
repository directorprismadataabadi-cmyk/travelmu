<script setup lang="ts">
import { ref, reactive } from 'vue';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Tours & Experiences | TravelMu',
  meta: [
    { name: 'description', content: 'Discover unique tours, activities, and experiences across Indonesia.' },
  ],
});

const isSearching = ref(false);

const experiences = ref([
  { id: '1', name: 'Bali Sunrise Trekking', location: 'Mount Batur, Bali', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600', rating: 4.9, reviews: 432, price: 650000, duration: '6 hours', category: 'Adventure' },
  { id: '2', name: 'Ubud Rice Terrace Walk', location: 'Tegallalang, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', rating: 4.8, reviews: 321, price: 450000, duration: '4 hours', category: 'Culture' },
  { id: '3', name: 'Komodo Island Day Trip', location: 'Labuan Bajo', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600', rating: 4.9, reviews: 567, price: 1800000, duration: 'Full day', category: 'Adventure' },
  { id: '4', name: 'Borobudur Sunrise Tour', location: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600', rating: 4.7, reviews: 234, price: 550000, duration: '5 hours', category: 'Culture' },
  { id: '5', name: 'Bali Cooking Class', location: 'Seminyak, Bali', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600', rating: 4.8, reviews: 189, price: 750000, duration: '5 hours', category: 'Food' },
  { id: '6', name: 'Raja Ampat Snorkeling', location: 'Raja Ampat', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600', rating: 4.9, reviews: 345, price: 2200000, duration: 'Full day', category: 'Adventure' },
]);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          <i class="fa-solid fa-compass mr-3 text-coral-400"></i>
          Experiences & Tours
        </h1>
        <p class="text-slate-400 mb-8">Discover unique activities and adventures</p>

        <div class="bg-white rounded-2xl shadow-xl p-6">
          <div class="grid md:grid-cols-4 gap-4">
            <div class="relative md:col-span-2">
              <label class="block text-xs font-medium text-slate-500 mb-1">Location</label>
              <input type="text" placeholder="Where to explore?" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-500 mb-1">Category</label>
              <select class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 outline-none appearance-none bg-white">
                <option>All Categories</option>
                <option>Adventure</option>
                <option>Culture</option>
                <option>Food & Drink</option>
                <option>Wellness</option>
              </select>
            </div>
            <button :disabled="isSearching" class="text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all mt-5 flex items-center justify-center gap-2" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
              <i class="fa-solid fa-magnifying-glass"></i>
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="exp in experiences" 
            :key="exp.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            @click="navigateTo(`/experiences/${exp.id}`)"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="exp.image" :alt="exp.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-4 left-4 px-3 py-1 bg-coral-500 text-white text-sm font-medium rounded-full">
                {{ exp.category }}
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-slate-900 mb-1">{{ exp.name }}</h3>
              <p class="text-slate-500 text-sm mb-3">
                <i class="fa-solid fa-location-dot mr-1"></i>
                {{ exp.location }}
              </p>
              <div class="flex items-center gap-4 text-sm text-slate-600 mb-4">
                <span><i class="fa-solid fa-clock mr-1"></i>{{ exp.duration }}</span>
                <span><i class="fa-solid fa-star text-yellow-400 mr-1"></i>{{ exp.rating }} ({{ exp.reviews }})</span>
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <span class="text-slate-500 text-sm">From</span>
                  <div class="text-xl font-bold" style="color: #FF5A5F;">{{ formatPrice(exp.price) }}</div>
                </div>
                <button class="px-4 py-2 text-white font-semibold rounded-xl text-sm" style="background: linear-gradient(90deg, #FF5A5F, #e04e52);">
                  Book
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
