import { useState } from 'react';
export default function SidebarTags({ tags, onCreate }) {
  const [val, setVal] = useState('');
  return (
    <aside style={{borderRight:'1px solid #ddd', padding:'8px'}}>
      <h3>Tags</h3>
      <ul style={{listStyle:'none', padding:0, margin:0}}>
        {tags.map(t => <li key={t} style={{padding:'4px 0'}}>{t}</li>)}
      </ul>
      <div style={{marginTop:8}}>
        <input value={val} onChange={e=>setVal(e.target.value)} placeholder="new tag" />
        <button onClick={()=>{ if(val.trim()){ onCreate(val.trim()); setVal(''); }}}>Add</button>
      </div>
    </aside>
  );
}
