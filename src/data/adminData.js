/**
 * ADMIN DASHBOARD DATA
 * Comprehensive dummy data for LMS admin panel
 * Includes all management modules and statistics
 * 
 * NO BACKEND - PURE FRONTEND DEMO DATA
 */

/**
 * Admin Dashboard Statistics
 * Comprehensive overview of the entire LMS platform
 */
export const adminDashboardStats = {
    // User & Role Management
    users: {
        total: 1247,
        students: 1089,
        faculty: 24,
        centreAdmins: 8,
        admins: 3,
        activeToday: 456,
        newThisMonth: 127,
        pendingApprovals: 15
    },

    // Enquiry Management
    enquiries: {
        total: 342,
        pending: 45,
        contacted: 178,
        converted: 89,
        rejected: 30,
        todayNew: 12
    },

    // Wallet Management
    wallets: {
        totalCredits: 2450000,
        totalRefunds: 125000,
        activeWallets: 892,
        pendingRefunds: 18,
        averageBalance: 2748
    },

    // Academic & Content Management
    courses: {
        total: 45,
        active: 38,
        draft: 5,
        archived: 2,
        foundation: 12,
        prelims: 15,
        mains: 10,
        optional: 8
    },

    categories: {
        total: 8,
        active: 8,
        coursesPerCategory: {
            'Foundation': 12,
            'Prelims': 15,
            'Mains': 10,
            'Optional': 8
        }
    },

    // Live Class Management
    liveClasses: {
        total: 234,
        scheduled: 45,
        ongoing: 3,
        completed: 186,
        todayScheduled: 8,
        thisWeekScheduled: 32,
        averageAttendance: 78
    },

    // Test Management
    tests: {
        total: 156,
        prelims: 68,
        mains: 45,
        sectional: 43,
        active: 142,
        draft: 14,
        totalAttempts: 12456,
        averageScore: 62
    },

    // Topic-wise Quizzes
    quizzes: {
        total: 289,
        active: 267,
        draft: 22,
        totalAttempts: 34567,
        averageScore: 71,
        topicsCount: 45
    },

    // Daily MCQs
    dailyMCQs: {
        total: 1245,
        thisMonth: 156,
        todayPublished: 5,
        averageAttempts: 234,
        averageScore: 68
    },

    // Content Statistics
    content: {
        videos: 1234,
        pdfs: 567,
        articles: 234,
        totalStorage: '245 GB',
        uploadsThisMonth: 89
    },

    // Financial Overview
    revenue: {
        totalRevenue: 12450000,
        thisMonth: 1245000,
        lastMonth: 1089000,
        pendingPayments: 234000,
        refundsProcessed: 45000
    },

    // System Health
    system: {
        serverStatus: 'Healthy',
        uptime: '99.8%',
        activeUsers: 456,
        peakConcurrentUsers: 892,
        avgResponseTime: '245ms'
    }
};

/**
 * Recent Activity Feed
 * Latest actions across the platform
 */
export const recentActivities = [
    {
        id: 1,
        type: 'user',
        icon: 'ri-user-add-line',
        iconClass: 'success',
        title: 'New Student Registration',
        description: '15 new students registered today',
        time: '10 minutes ago',
        priority: 'normal'
    },
    {
        id: 2,
        type: 'live-class',
        icon: 'ri-live-line',
        iconClass: 'primary',
        title: 'Live Class Started',
        description: 'Prelims Strategy Session by Dr. Rajesh Kumar',
        time: '25 minutes ago',
        priority: 'high'
    },
    {
        id: 3,
        type: 'enquiry',
        icon: 'ri-question-answer-line',
        iconClass: 'warning',
        title: 'Pending Enquiries',
        description: '12 enquiries awaiting response',
        time: '1 hour ago',
        priority: 'high'
    },
    {
        id: 4,
        type: 'test',
        icon: 'ri-file-list-line',
        iconClass: 'info',
        title: 'New Test Published',
        description: 'Prelims Mock Test 2025 - Series 5',
        time: '2 hours ago',
        priority: 'normal'
    },
    {
        id: 5,
        type: 'payment',
        icon: 'ri-wallet-line',
        iconClass: 'success',
        title: 'Payment Received',
        description: '₹45,000 received from course enrollments',
        time: '3 hours ago',
        priority: 'normal'
    },
    {
        id: 6,
        type: 'content',
        icon: 'ri-video-add-line',
        iconClass: 'primary',
        title: 'Content Uploaded',
        description: '8 new video lectures added to History Optional',
        time: '5 hours ago',
        priority: 'normal'
    },
    {
        id: 7,
        type: 'refund',
        icon: 'ri-refund-line',
        iconClass: 'warning',
        title: 'Refund Request',
        description: '3 refund requests pending approval',
        time: '6 hours ago',
        priority: 'high'
    },
    {
        id: 8,
        type: 'quiz',
        icon: 'ri-question-line',
        iconClass: 'info',
        title: 'Daily MCQs Published',
        description: '5 new MCQs added for today',
        time: '8 hours ago',
        priority: 'normal'
    }
];

/**
 * Quick Stats Cards Configuration
 * Defines the main stat cards displayed on dashboard
 */
export const quickStatsConfig = [
    {
        id: 'total-users',
        title: 'Total Users',
        value: 1247,
        icon: 'ri-user-line',
        color: 'primary',
        change: '+12%',
        changeType: 'positive',
        subtitle: '127 new this month'
    },
    {
        id: 'active-courses',
        title: 'Active Courses',
        value: 38,
        icon: 'ri-book-open-line',
        color: 'success',
        change: '+5',
        changeType: 'positive',
        subtitle: '5 in draft'
    },
    {
        id: 'live-classes',
        title: 'Live Classes Today',
        value: 8,
        icon: 'ri-live-line',
        color: 'warning',
        change: '3 ongoing',
        changeType: 'neutral',
        subtitle: '32 this week'
    },
    {
        id: 'pending-enquiries',
        title: 'Pending Enquiries',
        value: 45,
        icon: 'ri-question-answer-line',
        color: 'danger',
        change: '+12',
        changeType: 'negative',
        subtitle: 'Needs attention'
    },
    {
        id: 'total-tests',
        title: 'Total Tests',
        value: 156,
        icon: 'ri-file-list-3-line',
        color: 'info',
        change: '+8',
        changeType: 'positive',
        subtitle: '12,456 attempts'
    },
    {
        id: 'revenue',
        title: 'Revenue This Month',
        value: '₹12.45L',
        icon: 'ri-money-rupee-circle-line',
        color: 'success',
        change: '+14%',
        changeType: 'positive',
        subtitle: 'vs last month'
    },
    {
        id: 'wallet-balance',
        title: 'Total Wallet Credits',
        value: '₹24.5L',
        icon: 'ri-wallet-3-line',
        color: 'primary',
        change: '892 active',
        changeType: 'neutral',
        subtitle: '18 pending refunds'
    },
    {
        id: 'daily-mcqs',
        title: 'Daily MCQs',
        value: 1245,
        icon: 'ri-question-mark',
        color: 'info',
        change: '+5 today',
        changeType: 'positive',
        subtitle: 'Avg 234 attempts'
    }
];

/**
 * Management Modules Configuration
 * Defines all admin management sections
 */
export const managementModules = [
    {
        id: 'user-management',
        title: 'User Management',
        icon: 'ri-user-settings-line',
        description: 'Manage users, roles & permissions',
        stats: { total: 1247, pending: 15 },
        color: 'primary',
        route: '/admin/users'
    },
    {
        id: 'enquiry-management',
        title: 'Enquiry Management',
        icon: 'ri-customer-service-2-line',
        description: 'Handle student enquiries',
        stats: { total: 342, pending: 45 },
        color: 'warning',
        route: '/admin/enquiries'
    },
    {
        id: 'wallet-management',
        title: 'Wallet Management',
        icon: 'ri-wallet-3-line',
        description: 'Credits, refunds & transactions',
        stats: { total: '₹24.5L', pending: 18 },
        color: 'success',
        route: '/admin/wallets'
    },
    {
        id: 'course-management',
        title: 'Course Management',
        icon: 'ri-book-2-line',
        description: 'Create & manage courses',
        stats: { total: 45, active: 38 },
        color: 'primary',
        route: '/admin/courses'
    },
    {
        id: 'category-management',
        title: 'Category Management',
        icon: 'ri-folder-settings-line',
        description: 'Organize course categories',
        stats: { total: 8, active: 8 },
        color: 'info',
        route: '/admin/categories'
    },
    {
        id: 'live-class',
        title: 'Live Class Management',
        icon: 'ri-live-line',
        description: 'Schedule & manage live sessions',
        stats: { total: 234, today: 8 },
        color: 'danger',
        route: '/admin/live-classes'
    },
    {
        id: 'test-management',
        title: 'Test Management',
        icon: 'ri-file-list-3-line',
        description: 'Prelims, Mains & Sectional tests',
        stats: { total: 156, active: 142 },
        color: 'warning',
        route: '/admin/tests'
    },
    {
        id: 'quiz-management',
        title: 'Topic-wise Quizzes',
        icon: 'ri-questionnaire-line',
        description: 'Create topic-based quizzes',
        stats: { total: 289, active: 267 },
        color: 'info',
        route: '/admin/quizzes'
    },
    {
        id: 'daily-mcq',
        title: 'Daily MCQs',
        icon: 'ri-question-mark',
        description: 'Publish daily practice questions',
        stats: { total: 1245, today: 5 },
        color: 'primary',
        route: '/admin/daily-mcqs'
    },
    {
        id: 'content-library',
        title: 'Content Library',
        icon: 'ri-folder-video-line',
        description: 'Videos, PDFs & study material',
        stats: { total: 2035, storage: '245 GB' },
        color: 'success',
        route: '/admin/content'
    },
    {
        id: 'blog-management',
        title: 'Blog Management',
        icon: 'ri-article-line',
        description: 'Manage blog posts & articles',
        stats: { published: 45, drafts: 2 },
        color: 'info',
        route: '/admin/blogs'
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: 'ri-notification-3-line',
        description: 'Announcements & alerts',
        stats: { active: 3, sent: 45 },
        color: 'danger',
        route: '/admin/notifications'
    },
    {
        id: 'support',
        title: 'Support Helpdesk',
        icon: 'ri-customer-service-line',
        description: 'Student support tickets',
        stats: { open: 12, closed: 89 },
        color: 'primary',
        route: '/admin/support'
    },
    {
        id: 'finance-compliance',
        title: 'Finance & Compliance',
        icon: 'ri-money-rupee-circle-line',
        description: 'Multi-center financial operations',
        stats: { centres: 3, revenue: '₹12.45L' },
        color: 'success',
        route: '/admin/finance-compliance'
    },
    {
        id: 'analytics',
        title: 'Analytics & Reports',
        icon: 'ri-bar-chart-box-line',
        description: 'Performance insights & reports',
        stats: { users: 1247, revenue: '₹12.45L' },
        color: 'primary',
        route: '/admin/analytics'
    },
    {
        id: 'settings',
        title: 'System Settings',
        icon: 'ri-settings-3-line',
        description: 'Platform configuration',
        stats: { uptime: '99.8%', status: 'Healthy' },
        color: 'info',
        route: '/admin/settings'
    }
];

/**
 * Get admin dashboard statistics
 */
export const getAdminDashboardStats = () => {
    return adminDashboardStats;
};

/**
 * Get recent activities
 */
export const getRecentActivities = (limit = 8) => {
    return recentActivities.slice(0, limit);
};

/**
 * Get quick stats configuration
 */
export const getQuickStats = () => {
    return quickStatsConfig;
};

/**
 * Get management modules
 */
export const getManagementModules = () => {
    return managementModules;
};
