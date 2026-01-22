/**
 * BLOG API (FAKE/SIMULATED)
 * This simulates backend blog operations
 * In production, this would make real API calls to a backend server
 */

import { dummyBlogs, getBlogById, getBlogBySlug, getBlogsByCategory, getFeaturedBlogs, getBlogsByAuthor } from '../data/blogs';

/**
 * Simulated delay to mimic API call
 */
const simulateDelay = (ms = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get all blogs
 */
export const getAllBlogsApi = async () => {
    await simulateDelay(600);

    try {
        return {
            success: true,
            message: 'Blogs fetched successfully',
            data: dummyBlogs
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch blogs',
            data: []
        };
    }
};

/**
 * Get blog by ID
 */
export const getBlogByIdApi = async (blogId) => {
    await simulateDelay(400);

    try {
        const blog = getBlogById(blogId);

        if (!blog) {
            return {
                success: false,
                message: 'Blog not found',
                data: null
            };
        }

        return {
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch blog',
            data: null
        };
    }
};

/**
 * Get blog by slug
 */
export const getBlogBySlugApi = async (slug) => {
    await simulateDelay(400);

    try {
        const blog = getBlogBySlug(slug);

        if (!blog) {
            return {
                success: false,
                message: 'Blog not found',
                data: null
            };
        }

        return {
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch blog',
            data: null
        };
    }
};

/**
 * Get featured blogs
 */
export const getFeaturedBlogsApi = async () => {
    await simulateDelay(500);

    try {
        const blogs = getFeaturedBlogs();

        return {
            success: true,
            message: 'Featured blogs fetched successfully',
            data: blogs
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch featured blogs',
            data: []
        };
    }
};

/**
 * Get blogs by category
 */
export const getBlogsByCategoryApi = async (category) => {
    await simulateDelay(500);

    try {
        const blogs = getBlogsByCategory(category);

        return {
            success: true,
            message: 'Blogs fetched successfully',
            data: blogs
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch blogs',
            data: []
        };
    }
};

/**
 * Add new blog (Admin/Faculty - dummy)
 */
export const addBlogApi = async (blogData) => {
    await simulateDelay(700);

    try {
        // In real app, this would save to database
        const newBlog = {
            id: dummyBlogs.length + 1,
            ...blogData,
            views: 0,
            likes: 0,
            publishedDate: new Date().toISOString().split('T')[0]
        };

        return {
            success: true,
            message: 'Blog published successfully',
            data: newBlog
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to publish blog',
            data: null
        };
    }
};

/**
 * Update blog (Admin/Faculty - dummy)
 */
export const updateBlogApi = async (blogId, updates) => {
    await simulateDelay(700);

    try {
        const blog = getBlogById(blogId);

        if (!blog) {
            return {
                success: false,
                message: 'Blog not found',
                data: null
            };
        }

        // In real app, this would update in database
        const updatedBlog = { ...blog, ...updates };

        return {
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update blog',
            data: null
        };
    }
};

/**
 * Delete blog (Admin only - dummy)
 */
export const deleteBlogApi = async (blogId) => {
    await simulateDelay(600);

    try {
        const blog = getBlogById(blogId);

        if (!blog) {
            return {
                success: false,
                message: 'Blog not found',
                data: null
            };
        }

        // In real app, this would delete from database
        return {
            success: true,
            message: 'Blog deleted successfully',
            data: { blogId }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to delete blog',
            data: null
        };
    }
};

/**
 * Like blog (dummy)
 */
export const likeBlogApi = async (blogId, userId) => {
    await simulateDelay(300);

    try {
        const blog = getBlogById(blogId);

        if (!blog) {
            return {
                success: false,
                message: 'Blog not found',
                data: null
            };
        }

        // In real app, this would update likes in database
        return {
            success: true,
            message: 'Blog liked',
            data: {
                blogId,
                likes: blog.likes + 1
            }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to like blog',
            data: null
        };
    }
};
