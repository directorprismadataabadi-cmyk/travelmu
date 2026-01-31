// composables/useApi.ts
import { useUserStore } from '~/store/user';
import { useAppStore } from '~/store/app';

export const useApi = () => {
    const config = useRuntimeConfig();
    const userStore = useUserStore();
    userStore.loadAuth();

    const getHeaders = (body?: any) => {
        const headers: Record<string, string> = {};
        const token = userStore.token;

        if (token) headers.Authorization = `Bearer ${token}`;

        if (!(body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    };

    const handleError = (error: any) => {
        const appStore = useAppStore();
        if (!error.response || [502, 503, 504].includes(error.response.status)) {
            appStore.setConnectionError(true, 'Unable to connect to the server');
        }
        throw error;
    };

    const get = async (url: string) => {
        const appStore = useAppStore();
        appStore.isLoading = true;
        try {
            return await $fetch(url, { baseURL: config.public.apiBase, headers: getHeaders() });
        } catch (error) {
            handleError(error);
        } finally {
            appStore.isLoading = false;
        }
    };

    const post = async (url: string, body: any, options: any = {}) => {
        const appStore = useAppStore();
        appStore.isLoading = true;
        try {
            return await $fetch(url, {
                method: 'POST',
                baseURL: config.public.apiBase,
                headers: getHeaders(body),
                body: body instanceof FormData ? body : JSON.stringify(body),
                ...options
            });
        } catch (error) {
            handleError(error);
        } finally {
            appStore.isLoading = false;
        }
    };

    const put = async (url: string, body: any) => {
        const appStore = useAppStore();
        appStore.isLoading = true;
        try {
            return await $fetch(url, {
                method: 'PUT',
                baseURL: config.public.apiBase,
                headers: getHeaders(body),
                body: body instanceof FormData ? body : JSON.stringify(body),
            });
        } catch (error) {
            handleError(error);
        } finally {
            appStore.isLoading = false;
        }
    };

    const del = async (url: string) => {
        const appStore = useAppStore();
        appStore.isLoading = true;
        try {
            return await $fetch(url, { method: 'DELETE', baseURL: config.public.apiBase, headers: getHeaders() });
        } catch (error) {
            handleError(error);
        } finally {
            appStore.isLoading = false;
        }
    };

    return { get, post, put, del };
};
