export default function Grid({ photos, sel, setSel }) {
  function toggle(id) {
    const n = new Set(sel);
    n.has(id) ? n.delete(id) : n.add(id);
    setSel(n);
  }
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'8px'}}>
      {photos.map(p => (
        <div key={p.id} onClick={()=>toggle(p.id)} style={{border: sel.has(p.id)?'2px solid black':'1px solid #ddd', padding:'4px'}}>
          <img src={`/data/thumbs/${p.id}`} alt="" style={{width:'100%', display:'block'}}/>
          <div style={{fontSize:12, marginTop:4}}>{p.name}</div>
          <div style={{fontSize:11, color:'#555'}}>{p.tags.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}
