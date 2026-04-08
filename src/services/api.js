// API base URL - set to Lambda API Gateway URL in production
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
async function request(path, options) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'API request failed');
    }
    return res.json();
}
// ========== Stats ==========
export const statsApi = {
    get: () => request('/stats'),
};
// ========== Content (Homepage / About) ==========
export const contentApi = {
    getBySection: (section) => request(`/content/${section}`),
    update: (section, id, data) => request(`/content/${section}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
// ========== Courses ==========
export const coursesApi = {
    getAll: () => request('/courses'),
    getByType: (type) => request(`/courses/${type}`),
    create: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
};
// ========== News ==========
export const newsApi = {
    getAll: () => request('/news'),
    getByCategory: (category) => request(`/news/${category}`),
    create: (data) => request('/news', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/news/${id}`, { method: 'DELETE' }),
};
// ========== Downloads ==========
export const downloadsApi = {
    getAll: () => request('/downloads'),
    create: (data) => request('/downloads', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/downloads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/downloads/${id}`, { method: 'DELETE' }),
};
// ========== Certificates ==========
export const certificatesApi = {
    getAll: () => request('/certificates'),
    create: (data) => request('/certificates', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/certificates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/certificates/${id}`, { method: 'DELETE' }),
};
// ========== Recruitment ==========
export const recruitmentApi = {
    getAll: () => request('/recruitment'),
    create: (data) => request('/recruitment', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/recruitment/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/recruitment/${id}`, { method: 'DELETE' }),
};
