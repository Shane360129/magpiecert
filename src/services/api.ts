// API base URL - set to Lambda API Gateway URL in production
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
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
  get: () => request<{ certificates: number; courses: number; news: number; downloads: number; recruitment: number }>('/stats'),
};

// ========== Content (Homepage / About) ==========
export const contentApi = {
  getBySection: (section: string) => request<any[]>(`/content/${section}`),
  update: (section: string, id: string, data: any) =>
    request<any>(`/content/${section}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ========== Courses ==========
export const coursesApi = {
  getAll: () => request<any[]>('/courses'),
  getByType: (type: string) => request<any[]>(`/courses/${type}`),
  create: (data: any) => request<any>('/courses', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/courses/${id}`, { method: 'DELETE' }),
};

// ========== News ==========
export const newsApi = {
  getAll: () => request<any[]>('/news'),
  getByCategory: (category: string) => request<any[]>(`/news/${category}`),
  create: (data: any) => request<any>('/news', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/news/${id}`, { method: 'DELETE' }),
};

// ========== Downloads ==========
export const downloadsApi = {
  getAll: () => request<any[]>('/downloads'),
  create: (data: any) => request<any>('/downloads', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/downloads/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/downloads/${id}`, { method: 'DELETE' }),
};

// ========== Certificates ==========
export const certificatesApi = {
  getAll: () => request<any[]>('/certificates'),
  create: (data: any) => request<any>('/certificates', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/certificates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/certificates/${id}`, { method: 'DELETE' }),
};

// ========== Recruitment ==========
export const recruitmentApi = {
  getAll: () => request<any[]>('/recruitment'),
  create: (data: any) => request<any>('/recruitment', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/recruitment/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/recruitment/${id}`, { method: 'DELETE' }),
};
