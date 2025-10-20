export const api = {
  async list() {
    const r = await fetch('/api/photos'); return r.json();
  },
  async addTag(name) {
    const r = await fetch('/api/tags', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name}) });
    return r.json();
  },
  async upload(file) {
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch('/api/photos/upload', { method:'POST', body: fd });
    return r.json();
  },
  async update(updates) {
    await fetch('/api/photos/update', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({updates}) });
  }
};