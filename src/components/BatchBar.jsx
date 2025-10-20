import { useState } from 'react';
export default function BatchBar({ selected, onApply }) {
  const [tag, setTag] = useState('');
  const [pattern, setPattern] = useState('photo_{idx}.jpg');
  if (!selected.length) return null;

  function applyTag(add=true){
    onApply(selected.map(p => ({ id:p.id, tags: add ? [...new Set([...p.tags, tag].filter(Boolean))] : p.tags.filter(t=>t!==tag) })));
  }
  function renameAll(){
    onApply(selected.map((p,i)=>({ id:p.id, name: pattern.replace('{idx}', String(i+1).padStart(3,'0')) })));
  }
  function starAll(val){ onApply(selected.map(p=>({ id:p.id, starred: val }))); }

  return (
    <div style={{border:'1px solid #ccc', padding:'8px', display:'flex', gap:'8px', alignItems:'center'}}>
      <strong>{selected.length}</strong> selected
      <input placeholder="tag" value={tag} onChange={e=>setTag(e.target.value)} />
      <button onClick={()=>applyTag(true)}>+ Tag</button>
      <button onClick={()=>applyTag(false)}>- Tag</button>
      <input placeholder="pattern e.g. photo_{idx}.jpg" value={pattern} onChange={e=>setPattern(e.target.value)} style={{minWidth:220}}/>
      <button onClick={renameAll}>Rename</button>
      <button onClick={()=>starAll(true)}>Star</button>
      <button onClick={()=>starAll(false)}>Unstar</button>
      <a href="/api/export/csv">Export CSV</a>
    </div>
  );
}
