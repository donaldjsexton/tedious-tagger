export default function Uploader({ onUploaded }) {
  async function handle(e) {
    const files = Array.from(e.target.files || []);
    for (const f of files) await fetch('/api/photos/upload',{method:'POST',body: (()=>{const fd=new FormData(); fd.append('file',f); return fd;})()});
    onUploaded();
  }
  return <label style={{border:'1px solid #ccc', padding:'8px', display:'inline-block', cursor:'pointer'}}>
    Upload Images <input type="file" accept=".jpg,.jpeg,.png" multiple style={{display:'none'}} onChange={handle}/>
  </label>;
}
