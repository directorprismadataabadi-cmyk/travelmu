<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '~/store/user';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Sign Up | TravelMu',
});

const userStore = useUserStore();

const isLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

const form = reactive({
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
});

const handleRegister = async () => {
  error.value = '';
  
  if (!form.fullname || !form.email || !form.password) {
    error.value = 'Please fill in all required fields';
    return;
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  if (!form.agreeTerms) {
    error.value = 'You must agree to the terms and conditions';
    return;
  }

  isLoading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    userStore.setAuth('demo-token-123', {
      userid: '1',
      username: form.email.split('@')[0],
      fullname: form.fullname,
      email: form.email,
      phone: form.phone,
    });
    
    navigateTo('/');
  } catch (err) {
    error.value = 'Registration failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Image -->
    <div class="hidden lg:block lg:w-1/2 relative">
      <img 
        src="https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200" 
        alt="Lombok"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-12">
        <h2 class="text-4xl font-bold text-white mb-4">Join our community of travelers</h2>
        <p class="text-white/80 text-lg">Create an account to unlock exclusive deals and personalized recommendations.</p>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center px-4 py-20 bg-white">
      <div class="w-full max-w-md">
        <NuxtLink to="/" class="inline-flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #FF5A5F, #e04e52);">
            <i class="fa-solid fa-paper-plane text-white text-lg"></i>
          </div>
          <span class="text-2xl font-bold text-slate-900">
            Travel<span style="color: #FF5A5F;">Mu</span>
          </span>
        </NuxtLink>

        <h1 class="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p class="text-slate-500 mb-8">
          Already have an account? 
          <NuxtLink to="/login" class="font-medium hover:underline" style="color: #FF5A5F;">Log in</NuxtLink>
        </p>

        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          <i class="fa-solid fa-circle-exclamation mr-2"></i>
          {{ error }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
            <div class="relative">
              <i class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                v-model="form.fullname"
                type="text" 
                placeholder="John Doe"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
            <div class="relative">
              <i class="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="your@email.com"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <div class="relative">
              <i class="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                v-model="form.phone"
                type="tel" 
                placeholder="+62 812 3456 7890"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Password *</label>
            <div class="relative">
              <i class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                class="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Confirm Password *</label>
            <div class="relative">
              <i class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none"
              />
            </div>
          </div>

          <label class="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" v-model="form.agreeTerms" class="mt-1 rounded" style="accent-color: #FF5A5F;" />
            <span class="text-sm text-slate-600">
              I agree to the 
              <a href="#" class="text-coral-500 hover:underline">Terms of Service</a>
              and 
              <a href="#" class="text-coral-500 hover:underline">Privacy Policy</a>
            </span>
          </label>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style="background: linear-gradient(90deg, #FF5A5F, #e04e52);"
          >
            <i v-if="isLoading" class="fa-solid fa-spinner fa-spin"></i>
            <i v-else class="fa-solid fa-user-plus"></i>
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 bg-white text-sm text-slate-500">Or sign up with</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-6">
            <button class="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <i class="fa-brands fa-google text-red-500"></i>
              <span class="font-medium text-slate-700">Google</span>
            </button>
            <button class="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <i class="fa-brands fa-facebook text-blue-600"></i>
              <span class="font-medium text-slate-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
