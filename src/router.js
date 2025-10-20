import React, { useEffect, useState } from 'react';
import Grid from './components/Grid';

function PhotoDetail({ id }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const r = await fetch('/api/photos');
        const d = await r.json();
        const p = (d.photos || []).find(x => x.id === id) || null;
        if (mounted) setPhoto(p);
      } catch (e) {
        if (mounted) setPhoto(null);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (!photo) return <div style={{padding:16}}>Photo not found.</div>;

  return (
    <div style={{padding:16}}>
      <a href="#/">← Back</a>
      <h2 style={{marginTop:8}}>{photo.name}</h2>
      <div style={{maxWidth:900}}>
        <img src={`/data/uploads/${photo.id}`} alt={photo.name} style={{width:'100%', display:'block'}} />
        <div style={{marginTop:8, color:'#555'}}>Tags: {photo.tags.join(', ')}</div>
      </div>
    </div>
  );
}

function parseHash(hash) {
  // returns { route: 'home' } or { route: 'photo', id }
  const h = (hash || '').replace(/^#/, '') || '/';
  if (h === '/' || h === '') return { route: 'home' };
  const m = h.match(/^\/photo\/(.+)$/);
  if (m) return { route: 'photo', id: decodeURIComponent(m[1]) };
  return { route: 'home' };
}

export default function Router() {
  const [loc, setLoc] = useState(parseHash(window.location.hash));

  useEffect(() => {
    function onHash() { setLoc(parseHash(window.location.hash)); }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (loc.route === 'photo') return <PhotoDetail id={loc.id} />;

  // Home: render Grid. The Grid component expects photos/sel/setSel from a parent in App.jsx
  // but rendering Grid here provides a simple fallback single-pane view.
  return <Grid photos={[]} sel={new Set()} setSel={() => {}} />;
}
