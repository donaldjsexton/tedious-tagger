import { useEffect, useState, useMemo } from 'react';
import { api } from './store';
import Uploader from './components/Uploader.jsx';
import Grid from './components/Grid.jsx';
import SidebarTags from './components/SidebarTags.jsx';
import BatchBar from './components/BatchBar.jsx';
import KeybindsHelp from './components/KeybindsHelp.jsx';

export default function App() {
  const [tags, setTags] = useState ([]);
  const [photos, setPhotos] = useState([]);
  const [sel, setSel] = useState(new Set());

  async function refresh() {
    const d = await api.list();
    setTags(d.tags); setPhotos(d.photos);
  }
  useEffect(() => { refresh(); }, []);

  const selected = useMemo(() => photos.filter(p => sel.has(p.id)), [photos, sel]);

  return (
    <div style={{display:'grid', gridTemplateColumns:'260px 1fr', width:'100%'}}>
      <SidebarTags tags={tags} onCreate={async name => { await api.addTag(name); refresh(); }} />
        <div style={{display:'grid', gridTemplateRows:' auto auto 1fr', gap:'8px', padding:'8px'}}>
          <div>
            <Uploader onUploaded={refresh} />
          </div>
          <BatchBar selected={selected} onApply={async (updates) => { await api.update(updates); setSel(new Set()); refresh(); }} />
            <Grid photos={photos} sel={sel} setSel={setSel} />
            <KeybindsHelp/>
        </div>
    </div>
  )
}