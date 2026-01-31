// store/user.ts
import { defineStore } from 'pinia';

interface User {
    userid: string;
    username: string;
    fullname: string;
    email: string;
    phone?: string;
    avatar?: string;
    themeid?: string;
    languageid?: string;
}

interface UserState {
    token: string | null;
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: null,
        user: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        fullName: (state) => state.user?.fullname || state.user?.username || 'Guest',
    },

    actions: {
        setAuth(token: string, user: User) {
            this.token = token;
            this.user = user;
            if (import.meta.client) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
        },

        loadAuth() {
            if (import.meta.client) {
                const token = localStorage.getItem('token');
                const user = localStorage.getItem('user');
                if (token) {
                    this.token = token;
                }
                if (user) {
                    try {
                        this.user = JSON.parse(user);
                    } catch {
                        this.user = null;
                    }
                }
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            if (import.meta.client) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
    },
});
