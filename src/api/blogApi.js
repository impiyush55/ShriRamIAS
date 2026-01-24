/**
 * BLOG API (FAKE/SIMULATED)
 * This simulates backend blog operations using localStorage for persistence
 */

import { dummyBlogs } from '../data/blogs';

const simulateDelay = (ms = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper to get all blogs (Dummy + LocalStorage)
const getUnifiedBlogs = () => {
    const localBlogsStr = localStorage.getItem('mockBlogs');
    const localBlogs = localBlogsStr ? JSON.parse(localBlogsStr) : [];
    // Put NEW blogs at the start so they show up on the home page first
    return [...localBlogs, ...dummyBlogs];
};

/**
 * Get all blogs
 */
export const getAllBlogsApi = async () => {
    await simulateDelay(600);
    return {
        success: true,
        message: 'Blogs fetched successfully',
        data: getUnifiedBlogs()
    };
};

/**
 * Get blog by ID
 */
export const getBlogByIdApi = async (blogId) => {
    await simulateDelay(400);
    const blogs = getUnifiedBlogs();
    const blog = blogs.find(b => b.id === parseInt(blogId));

    if (!blog) {
        return { success: false, message: 'Blog not found', data: null };
    }

    return {
        success: true,
        message: 'Blog fetched successfully',
        data: blog
    };
};

/**
 * Get featured blogs
 */
export const getFeaturedBlogsApi = async () => {
    await simulateDelay(500);
    const blogs = getUnifiedBlogs().filter(blog => blog.featured);
    return {
        success: true,
        message: 'Featured blogs fetched successfully',
        data: blogs
    };
};

/**
 * Add new blog (Admin/Faculty)
 */
export const addBlogApi = async (blogData) => {
    await simulateDelay(700);

    try {
        const localBlogsStr = localStorage.getItem('mockBlogs');
        const localBlogs = localBlogsStr ? JSON.parse(localBlogsStr) : [];

        const nextId = [...dummyBlogs, ...localBlogs].reduce((max, b) => Math.max(max, b.id), 0) + 1;

        const newBlog = {
            id: nextId,
            ...blogData,
            slug: blogData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            views: 0,
            likes: 0,
            comments: [],
            publishedDate: new Date().toISOString().split('T')[0],
            readTime: '5 min read',
            thumbnail: blogData.thumbnail || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
            author: 'Admin User',
            authorId: 1
        };

        const updatedLocalBlogs = [newBlog, ...localBlogs];
        localStorage.setItem('mockBlogs', JSON.stringify(updatedLocalBlogs));

        return {
            success: true,
            message: 'Blog published successfully',
            data: newBlog
        };
    } catch (error) {
        return { success: false, message: 'Failed to publish blog', data: null };
    }
};

/**
 * Like/Comment functionality (Simulated)
 */
export const updateBlogEngagementApi = async (blogId, type, data) => {
    await simulateDelay(300);
    const localBlogsStr = localStorage.getItem('mockBlogs');
    const localBlogs = localBlogsStr ? JSON.parse(localBlogsStr) : [];

    const blogIndex = localBlogs.findIndex(b => b.id === parseInt(blogId));

    if (blogIndex !== -1) {
        if (type === 'like') {
            localBlogs[blogIndex].likes += 1;
        } else if (type === 'comment') {
            if (!localBlogs[blogIndex].comments) localBlogs[blogIndex].comments = [];
            localBlogs[blogIndex].comments.push({
                id: Date.now(),
                user: data.user || 'Guest User',
                text: data.text,
                date: new Date().toISOString()
            });
        }
        localStorage.setItem('mockBlogs', JSON.stringify(localBlogs));
    }

    return { success: true, message: 'Engagement updated' };
};

