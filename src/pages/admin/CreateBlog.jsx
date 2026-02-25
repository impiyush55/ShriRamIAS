import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { addBlogApi } from '../../api/blogApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css'; // Reusing blog management styles

export default function CreateBlog() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Strategy',
        examStage: 'Prelims',
        gsPaper: 'GS-1',
        type: 'Static',
        importance: 'Medium',
        content: '',
        status: 'Draft',
        featured: false,
        pyqLinked: false
    });

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addBlogApi(formData);
            if (result.success) {
                if (window.confirm('Blog published successfully! Do you want to view it on the Home Page now?')) {
                    navigate('/#blogs');
                } else {
                    navigate('/admin/blogs');
                }
            } else {
                alert(result.message || 'Failed to publish blog');
            }
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('An error occurred while publishing');
        }
    };

    return (
        <div className="dashboard-container admin-dashboard blog-management-page">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>
                    <div className="nav-section-title">Content & Media</div>
                    <a href="/admin/blogs" className="nav-item active"><i className="ri-article-line"></i>Blog Management</a>
                    <a href="/admin/content" className="nav-item"><i className="ri-folder-video-line"></i>Content Library</a>


                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header sticky-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <button
                            onClick={() => navigate('/admin/blogs')}
                            className="btn-icon mr-2 cursor-pointer"
                            title="Back to Blogs"
                        >
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <div>
                            <h1>Write New Blog</h1>
                            <p>Create quality content for students</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div className="section max-w-[1000px] mx-auto">
                    <form onSubmit={handleSubmit} className="blog-form-container bg-white p-8 rounded-2xl shadow-md">
                        <div className="form-group mb-4">
                            <label className="form-label block mb-2 font-semibold">Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input w-full p-3 rounded-lg border border-gray-200"
                                placeholder="Enter an engaging title"
                                required
                            />
                        </div>

                        <div className="grid-2-cols grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-6">
                            <div className="form-group">
                                <label className="form-label block mb-2 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                >
                                    <option value="Strategy">Strategy</option>
                                    <option value="Polity">Polity</option>
                                    <option value="Economy">Economy</option>
                                    <option value="History">History</option>
                                    <option value="Environment">Environment</option>
                                    <option value="Ethics">Ethics</option>
                                    <option value="Current Affairs">Current Affairs</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label block mb-2 font-medium">Exam Stage</label>
                                <select
                                    name="examStage"
                                    value={formData.examStage}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                >
                                    <option value="Prelims">Prelims</option>
                                    <option value="Mains">Mains</option>
                                    <option value="Interview">Interview</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label block mb-2 font-medium">GS Paper</label>
                                <select
                                    name="gsPaper"
                                    value={formData.gsPaper}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                >
                                    <option value="GS-1">GS-1</option>
                                    <option value="GS-2">GS-2</option>
                                    <option value="GS-3">GS-3</option>
                                    <option value="GS-4">GS-4</option>
                                    <option value="Essay">Essay</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label block mb-2 font-medium">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-200"
                                >
                                    <option value="Static">Static</option>
                                    <option value="Current Affairs">Current Affairs</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label block mb-2 font-semibold">Blog Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="form-textarea w-full p-3 rounded-lg border border-gray-200 resize-y font-[inherit]"
                                placeholder="Write your blog content here..."
                                rows="15"
                                required
                            ></textarea>
                            <p className="helper-text text-sm text-slate-500 mt-2">Use Markdown for formatting.</p>
                        </div>

                        <div className="settings-panel mb-4 bg-slate-50 p-6 rounded-lg border border-gray-200">
                            <h4 className="mb-4 text-slate-700">Settings & Meta</h4>
                            <div className="grid-2-cols flex gap-8 flex-wrap">
                                <label className="checkbox-label flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="w-5 h-5"
                                    />
                                    <span>Mark as Featured</span>
                                </label>
                                <label className="checkbox-label flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="pyqLinked"
                                        checked={formData.pyqLinked}
                                        onChange={handleChange}
                                        className="w-5 h-5"
                                    />
                                    <span>Links to PYQs</span>
                                </label>
                                <div className="flex items-center gap-2 ml-auto">
                                    <span className="font-medium">Importance:</span>
                                    <select
                                        name="importance"
                                        value={formData.importance}
                                        onChange={handleChange}
                                        className="py-1 px-2 rounded border border-slate-300"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions flex gap-4 justify-end mt-8">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blogs')}
                                className="btn btn-outline py-3 px-6 rounded-lg border border-slate-300 bg-white cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary py-3 px-6 rounded-lg border-none bg-gray-100 text-slate-700 cursor-pointer"
                                onClick={() => alert('Saved as draft')}
                            >
                                Save Draft
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary py-3 px-6 rounded-lg border-none bg-indigo-600 text-white cursor-pointer font-semibold"
                            >
                                Publish Blog
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
