const API_BASE = 'http://127.0.0.1:8001';

export const api = {
  async list() {
    const r = await fetch(`${API_BASE}/api/photos`);
    return r.json();
  },
  async addTag(name) {
    const r = await fetch(`${API_BASE}/api/tags`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    return r.json();
  },
  async upload(file) {
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch(`${API_BASE}/api/photos/upload`, { method: 'POST', body: fd });
    return r.json();
  },
  async update(updates) {
    await fetch(`${API_BASE}/api/photos/update`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ updates }) });
  }
};