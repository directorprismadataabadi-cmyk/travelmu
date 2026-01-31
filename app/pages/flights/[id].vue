<script setup lang="ts">
const route = useRoute();
const flightId = route.params.id;

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Flight Details | TravelMu',
});

// Demo flight data
const flight = ref({
  id: flightId,
  airline: 'Garuda Indonesia',
  logo: '🇮🇩',
  flightNumber: 'GA-401',
  origin: 'CGK',
  originCity: 'Jakarta',
  originAirport: 'Soekarno-Hatta International Airport',
  destination: 'DPS',
  destCity: 'Bali',
  destAirport: 'Ngurah Rai International Airport',
  departTime: '06:00',
  arriveTime: '08:30',
  departDate: '2026-02-15',
  duration: '1h 30m',
  stops: 0,
  price: 1250000,
  class: 'Economy',
  aircraft: 'Airbus A330-300',
  amenities: ['In-flight entertainment', 'Meal included', 'USB Power', 'Wi-Fi available'],
  baggage: { cabin: '7 kg', checked: '23 kg' },
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};

const handleBook = () => {
  // Navigate to booking page or show booking modal
  alert('Booking functionality coming soon!');
};
</script>

<template>
  <div class="pt-20 min-h-screen bg-slate-50">
    <!-- Header -->
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/flights" class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          Back to flights
        </NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-white">
          {{ flight.originCity }} → {{ flight.destCity }}
        </h1>
        <p class="text-slate-400 mt-1">{{ flight.departDate }} • {{ flight.class }}</p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Flight Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div class="flex items-center gap-4 mb-6">
          <span class="text-4xl">{{ flight.logo }}</span>
          <div>
            <div class="text-xl font-bold text-slate-900">{{ flight.airline }}</div>
            <div class="text-slate-500">{{ flight.flightNumber }} • {{ flight.aircraft }}</div>
          </div>
        </div>

        <!-- Flight Timeline -->
        <div class="flex items-center gap-6 py-6 border-y border-slate-100">
          <div class="text-center">
            <div class="text-3xl font-bold text-slate-900">{{ flight.departTime }}</div>
            <div class="text-lg font-medium text-slate-700">{{ flight.origin }}</div>
            <div class="text-sm text-slate-500 max-w-32">{{ flight.originAirport }}</div>
          </div>
          
          <div class="flex-1 flex flex-col items-center">
            <div class="text-sm text-slate-500 mb-2">{{ flight.duration }}</div>
            <div class="w-full flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-coral-500"></div>
              <div class="h-0.5 flex-1 bg-coral-500"></div>
              <i class="fa-solid fa-plane text-coral-500"></i>
              <div class="h-0.5 flex-1 bg-coral-500"></div>
              <div class="w-3 h-3 rounded-full bg-coral-500"></div>
            </div>
            <div class="text-sm mt-2 text-green-600 font-medium">
              {{ flight.stops === 0 ? 'Direct Flight' : flight.stops + ' Stop' }}
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-3xl font-bold text-slate-900">{{ flight.arriveTime }}</div>
            <div class="text-lg font-medium text-slate-700">{{ flight.destination }}</div>
            <div class="text-sm text-slate-500 max-w-32">{{ flight.destAirport }}</div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="mt-6">
          <h3 class="font-semibold text-slate-900 mb-3">What's Included</h3>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="amenity in flight.amenities" 
              :key="amenity"
              class="px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-700"
            >
              <i class="fa-solid fa-check text-green-500 mr-1"></i>
              {{ amenity }}
            </span>
          </div>
        </div>

        <!-- Baggage -->
        <div class="mt-6 grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-2 text-slate-600 mb-1">
              <i class="fa-solid fa-bag-shopping"></i>
              <span class="font-medium">Cabin Baggage</span>
            </div>
            <div class="text-2xl font-bold text-slate-900">{{ flight.baggage.cabin }}</div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-2 text-slate-600 mb-1">
              <i class="fa-solid fa-suitcase-rolling"></i>
              <span class="font-medium">Checked Baggage</span>
            </div>
            <div class="text-2xl font-bold text-slate-900">{{ flight.baggage.checked }}</div>
          </div>
        </div>
      </div>

      <!-- Price Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 sticky bottom-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-slate-500">Total Price</div>
            <div class="text-3xl font-bold" style="color: #FF5A5F;">{{ formatPrice(flight.price) }}</div>
            <div class="text-sm text-slate-500">/person</div>
          </div>
          <button 
            @click="handleBook"
            class="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all" 
            style="background: linear-gradient(90deg, #FF5A5F, #e04e52);"
          >
            <i class="fa-solid fa-ticket mr-2"></i>
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
