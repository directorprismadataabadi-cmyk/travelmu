// middleware/auth.ts
import { useUserStore } from '~/store/user';
import { navigateTo, defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    userStore.loadAuth();

    // If not logged in and not on login page → redirect to home
    if (!userStore.token && to.path !== '/login') {
        return navigateTo('/');
    }

    // If logged in and trying to access login → redirect to home
    if (userStore.token && to.path === '/login') {
        return navigateTo('/');
    }
});
