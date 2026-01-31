// composables/useTravelMu.ts
// TravelMu API composable using execute-flow pattern

export const useTravelMu = () => {
    const api = useApi();

    // Helper to create FormData with common fields
    const createFormData = (flowname: string, params: Record<string, any> = {}) => {
        const dataForm = new FormData();
        dataForm.append('flowname', flowname);
        dataForm.append('menu', 'travelmu');

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                dataForm.append(key, String(value));
            }
        });

        return dataForm;
    };

    // ====== SEARCH FUNCTIONS ======

    const searchFlights = async (params: {
        origin: string;
        destination: string;
        departDate: string;
        returnDate?: string;
        passengers: number;
        cabinClass: string;
        tripType: string;
    }) => {
        const dataForm = createFormData('travelmu_search_flights', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const searchHotels = async (params: {
        destination: string;
        checkIn: string;
        checkOut: string;
        rooms: number;
        guests: number;
    }) => {
        const dataForm = createFormData('travelmu_search_hotels', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const searchExperiences = async (params: {
        location: string;
        category?: string;
        dateFrom?: string;
        dateTo?: string;
    }) => {
        const dataForm = createFormData('travelmu_search_experiences', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const searchRentals = async (params: {
        pickupLocation: string;
        dropoffLocation?: string;
        pickupDate: string;
        pickupTime: string;
        dropoffDate: string;
        dropoffTime: string;
        vehicleType?: string;
    }) => {
        const dataForm = createFormData('travelmu_search_rentals', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const searchPackages = async (params: {
        destination: string;
        departDate: string;
        returnDate: string;
        travelers: number;
        packageType?: string;
    }) => {
        const dataForm = createFormData('travelmu_search_packages', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    // ====== DATA FETCHING ======

    const getDestinations = async (params?: { featured?: boolean; limit?: number }) => {
        const dataForm = createFormData('travelmu_get_destinations', params || {});
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const getDeals = async (params?: { category?: string; limit?: number }) => {
        const dataForm = createFormData('travelmu_get_deals', params || {});
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const getReviews = async (params?: { limit?: number }) => {
        const dataForm = createFormData('travelmu_get_reviews', params || {});
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    // ====== USER AUTHENTICATION ======

    const userLogin = async (params: { email: string; password: string }) => {
        const dataForm = createFormData('travelmu_user_login', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const userRegister = async (params: {
        fullname: string;
        email: string;
        phone: string;
        password: string;
    }) => {
        const dataForm = createFormData('travelmu_user_register', params);
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const userLogout = async () => {
        const dataForm = createFormData('travelmu_user_logout');
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    // ====== BOOKINGS ======

    const getBookings = async (params?: { status?: string }) => {
        const dataForm = createFormData('travelmu_bookings', params || {});
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    const createBooking = async (params: {
        type: 'flight' | 'hotel' | 'experience' | 'rental' | 'package';
        itemId: string;
        details: Record<string, any>;
    }) => {
        const dataForm = createFormData('travelmu_create_booking', {
            type: params.type,
            itemId: params.itemId,
            details: JSON.stringify(params.details),
        });
        return await api.post('/api/admin/execute-flow', dataForm);
    };

    return {
        // Search
        searchFlights,
        searchHotels,
        searchExperiences,
        searchRentals,
        searchPackages,
        // Data
        getDestinations,
        getDeals,
        getReviews,
        // Auth
        userLogin,
        userRegister,
        userLogout,
        // Bookings
        getBookings,
        createBooking,
    };
};
