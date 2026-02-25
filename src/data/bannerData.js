/**
 * BANNER DATA SERVICE
 * Manages website banners, ads, and announcements using localStorage
 */

const STORAGE_KEY = 'lms_banners';

// Initial mock data to populate if storage is empty
const INITIAL_BANNERS = [
    {
        id: 1,
        title: 'New Batch Starting Soon',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
        link: '/courses/1',
        type: 'announcement', // 'ad' or 'announcement'
        position: 'ticker', // 'hero', 'popup', 'ticker'
        status: 'active',
        priority: 1,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'UPSC Prelims 2026 Strategy Workshop',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
        link: '/events/workshop',
        type: 'ad',
        position: 'popup',
        status: 'inactive',
        priority: 2,
        createdAt: new Date().toISOString()
    }
];

// Helper to get data
const getStoredBanners = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BANNERS));
        return INITIAL_BANNERS;
    }
    return JSON.parse(stored);
};

// Helper to save data
const saveStoredBanners = (banners) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
    // Trigger storage event for cross-tab/component updates
    window.dispatchEvent(new Event('storage'));
};

export const getAllBanners = () => {
    return {
        success: true,
        data: getStoredBanners()
    };
};

export const getActiveBanners = () => {
    const banners = getStoredBanners();
    const active = banners.filter(b => b.status === 'active').sort((a, b) => a.priority - b.priority);
    return {
        success: true,
        data: active
    };
};

export const getBannersByType = (type) => {
    const banners = getStoredBanners();
    const filtered = banners.filter(b => b.type === type && b.status === 'active');
    return {
        success: true,
        data: filtered
    };
};

export const saveBanner = (bannerData) => {
    const banners = getStoredBanners();

    if (bannerData.id) {
        // Update existing
        const index = banners.findIndex(b => b.id === bannerData.id);
        if (index !== -1) {
            banners[index] = { ...banners[index], ...bannerData };
            saveStoredBanners(banners);
            return { success: true, message: 'Banner updated successfully', data: banners[index] };
        }
        return { success: false, message: 'Banner not found' };
    } else {
        // Create new
        const newBanner = {
            ...bannerData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: bannerData.status || 'active'
        };
        banners.push(newBanner);
        saveStoredBanners(banners);
        return { success: true, message: 'Banner created successfully', data: newBanner };
    }
};

export const deleteBanner = (id) => {
    let banners = getStoredBanners();
    const initialLength = banners.length;
    banners = banners.filter(b => b.id !== id);

    if (banners.length < initialLength) {
        saveStoredBanners(banners);
        return { success: true, message: 'Banner deleted successfully' };
    }
    return { success: false, message: 'Banner not found' };
};

export const toggleBannerStatus = (id) => {
    const banners = getStoredBanners();
    const banner = banners.find(b => b.id === id);

    if (banner) {
        banner.status = banner.status === 'active' ? 'inactive' : 'active';
        saveStoredBanners(banners);
        return { success: true, message: `Banner marked as ${banner.status}`, data: banner };
    }
    return { success: false, message: 'Banner not found' };
};
