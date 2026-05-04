const BASE = '/api';

export const api = async (path, options = {}, token = null) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  
  // Get response text first to handle non-JSON responses
  const text = await res.text();
  
  // Try to parse as JSON, fallback to empty object if empty or invalid
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  
  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  
  return data;
};
