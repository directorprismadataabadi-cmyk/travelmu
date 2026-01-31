// store/app.ts
import { defineStore } from 'pinia';

interface AppState {
    isLoading: boolean;
    connectionError: boolean;
    connectionErrorMessage: string;
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        isLoading: false,
        connectionError: false,
        connectionErrorMessage: '',
    }),

    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading;
        },

        setConnectionError(error: boolean, message: string = '') {
            this.connectionError = error;
            this.connectionErrorMessage = message;
        },

        clearConnectionError() {
            this.connectionError = false;
            this.connectionErrorMessage = '';
        },
    },
});
