export const PROFILE_ROUTES = {
    OFFERS: '/profile/offers/all',
    CHATS: '/profile/chats',
    SETTINGS: '/profile/settings',
    CREATE_OFFER: '/profile/offers/create',
    UPDATE_OFFER: '/profile/offers/update/',
};

export const AUTH_ROUTES = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
    EMAIL_CONFIRMATION: '/auth/email-confirmation',
};

export const PANEL_ROUTES = {
    ADMIN: {
        CATEGORIES: '/panel/categories',
        TYPES: '/panel/types',
        REGIONS: '/panel/regions',
        LOCATIONS: '/panel/locations',
        USERS: '/panel/users',
        CHATS: '/panel/chats',
        REPORTS: '/panel/reports',
    },
    MODERATOR: {
        USERS: '/panel/users',
        CHATS: '/panel/chats',
        REPORTS: '/panel/reports',
        OFFERS: '/panel/offers-on-moderation',
    },
};
