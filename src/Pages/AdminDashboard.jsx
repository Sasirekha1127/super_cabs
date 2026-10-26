import React, { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const sections = [
  ['overview', 'Overview'], ['banner', 'Banners'], ['about', 'About & company'], ['highlight', 'Homepage highlights'],
  ['testimonial', 'Testimonials'], ['cta', 'Call to action'], ['service', 'Services'], ['vehicle', 'Fleet & tariffs'],
  ['tour', 'Tour packages'], ['gallery', 'Gallery'], ['setting', 'Website settings'], ['page', 'SEO']
];
const seoPublicPages = [
  ['home','Home'],['about','About'],['services','Services'],['fleet','Fleet'],['tariff','Tariff'],['tours','Tours'],['gallery','Gallery'],['contact','Contact']
];
const fields = {
  banner: [['heading','Heading','text',true],['description','Description','textarea'],['image','Banner image','image'],['buttonLabel','Button label'],['buttonLink','Button link']],
  about: [['subheading','Section label'],['heading','Section heading','text',true],['description','About content','textarea',true],['fleetDescription','Fleet overview','textarea'],['secondaryDescription','Additional About content','textarea'],['text','Vision / mission text','textarea'],['tag','Section tag'],['points','Key points (one per line)','list'],['image','Image','image'],['alt','Image alt text']],
  highlight: [['text','Highlight description','textarea',true],['image','Image','image'],['tag','Label']],
  testimonial: [['name','Customer name','text',true],['designation','Trip / designation'],['text','Testimonial','textarea',true],['image','Customer image','image'],['alt','Image alt text']],
  cta: [['description','Description','textarea'],['image','Background image','image'],['primaryLabel','Call button label'],['primaryLink','Call button link'],['secondaryLabel','WhatsApp button label'],['secondaryLink','WhatsApp button link'],['tertiaryLabel','Enquiry button label'],['tertiaryLink','Enquiry button link']],
  service: [['description','Description','textarea',true],['image','Service image','image'],['tag','Category label'],['icon','Icon class'],['features','Features (one per line)','list'],['seo.title','SEO title'],['seo.description','SEO meta description','textarea'],['seo.canonical','Canonical URL'],['seo.noindex','No index','boolean'],['seo.nofollow','No follow','boolean'],['seo.ogTitle','Open Graph title'],['seo.ogDescription','Open Graph description','textarea'],['seo.ogImage','Open Graph image','image'],['seo.altText','Image alt text']],
  tour: [['duration','Duration'],['places','Destinations','textarea'],['text','Description','textarea',true],['overview','Overview','textarea'],['image','Package image','image'],['alt','Image alt text'],['tag','Label'],['placesCovered','Places covered (one per line)','list'],['itinerary','Tour itinerary','itinerary'],['highlights','Highlights (one per line)','list'],['inclusions','Inclusions (one per line)','list'],['exclusions','Exclusions (one per line)','list'],['startingFare','Approved starting fare'],['vehiclePricing','Vehicle package rates','pricing'],['suitableFor','Suitable for'],['seo.title','SEO title'],['seo.description','SEO meta description','textarea'],['seo.canonical','Canonical URL'],['seo.noindex','No index','boolean'],['seo.nofollow','No follow','boolean'],['seo.ogTitle','Open Graph title'],['seo.ogDescription','Open Graph description','textarea'],['seo.ogImage','Open Graph image','image'],['seo.altText','Image alt text']],
  gallery: [['cat','Category','category',true],['tag','Label'],['subtitle','Description'],['src','Gallery image','image',true],['alt','Image alt text','text',true]],
  setting: [['brand','Business name','text',true],['tagline','Tagline'],['phone','Phone (E.164)'],['phoneDisplay','Displayed phone'],['whatsapp','WhatsApp (country code + digits)'],['email','Email'],['address','Business address','textarea'],['hours','Business hours'],['mapEmbedUrl','Google Maps embed URL'],['experienceYears','Experience label'],['social.facebook','Facebook URL'],['social.instagram','Instagram URL'],['social.twitter','X / Twitter URL'],['social.linkedin','LinkedIn URL']],
  page: [['seo.title','SEO title','text',true],['seo.description','Meta description','textarea',true],['seo.canonical','Canonical URL'],['seo.noindex','No index','boolean'],['seo.nofollow','No follow','boolean'],['seo.ogTitle','Open Graph title'],['seo.ogDescription','Open Graph description','textarea'],['seo.ogImage','Open Graph image','image'],['seo.altText','Primary image alt text']]
};
const vehicleFields = [['slug','Slug','text',true],['name','Vehicle name','text',true],['category','Category','select',true,['hatchback','sedan','suv','tempo']],['image','Vehicle image','image'],['altText','Vehicle image alt text'],['tag','Label'],['models','Models','textarea'],['seats','Seating details'],['seatingCapacity','Passenger capacity','number',true],['displayOrder','Display order','number'],['luggage','Luggage capacity'],['ac','Air conditioning'],['rateHourly','Hourly package rate (approved)'],['rateHourlySub','Hourly package unit'],['rateOneWay','One-way rate (approved)'],['rateRoundTrip','Round-trip rate (approved)'],['driverBata','Driver allowance (approved)'],['features','Specifications (one per line)','list'],['isActive','Available / published','boolean']];
const initialForm = { title: '', slug: '', order: 0, isActive: true, data: {} };
const getPath = (value, path) => path.split('.').reduce((v, key) => v?.[key], value);
function setPath(value, path, next) {
  const keys = path.split('.'); const output = { ...value }; let cursor = output;
  keys.forEach((key, i) => { if (i === keys.length - 1) cursor[key] = next; else { cursor[key] = { ...(cursor[key] || {}) }; cursor = cursor[key]; } });
  return output;
}
const getApiOrigin = () => api.baseUrl.replace(/\/api\/?$/, '');

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('supercabs-admin-token') || '');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('overview');
  const [items, setItems] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [seoAudit, setSeoAudit] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState('');
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const load = useCallback(async () => {
    if (!token || type === 'overview') return;
    setBusy(true); setError('');
    try {
      if (type === 'vehicle') { const result = await api.get('/cabs/admin', { headers }); setVehicles(result.cabs || []); }
      else {
        const result = await api.get(`/content/${type}`, { headers }); setItems(result.items || []);
        if (type === 'page') {
          const [services, tours] = await Promise.all([api.get('/content/service', { headers }), api.get('/content/tour', { headers })]);
          setSeoAudit([...(services.items || []).map(item => ({ ...item, seoKind: 'Service' })), ...(tours.items || []).map(item => ({ ...item, seoKind: 'Tour package' }))]);
        }
      }
    } catch (e) {
      setError(e.message);
      if (e.status === 401) { sessionStorage.removeItem('supercabs-admin-token'); setToken(''); }
    } finally { setBusy(false); }
  }, [token, type, headers]);
  useEffect(() => { load(); }, [load]);

  const startAdd = (targetType = type) => {
    setEditing('');
    setForm(targetType === 'setting' ? { ...initialForm, title: 'Website settings', slug: 'global' } : initialForm);
    setMessage(''); setError('');
  };
  const login = async e => {
    e.preventDefault(); setBusy(true); setError('');
    try { const result = await api.post('/content/login', { password }); sessionStorage.setItem('supercabs-admin-token', result.token); setToken(result.token); setPassword(''); }
    catch (e2) { setError(e2.message); } finally { setBusy(false); }
  };
  const upload = async (event, key) => {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp','image/avif'].includes(file.type)) { setError('Choose a JPEG, PNG, WebP, or AVIF image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Images must be 5 MB or smaller.'); return; }
    setUploading(key); setError('');
    try {
      const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('Could not read image')); reader.readAsDataURL(file); });
      const result = await api.post('/uploads', { dataUrl }, { headers });
      const imageUrl = `${getApiOrigin()}${result.url}`;
      setForm(current => type === 'vehicle' ? { ...current, [key]: imageUrl } : { ...current, data: setPath(current.data, key, imageUrl) });
      setMessage('Image uploaded. Save the form to publish its reference.');
    } catch (e) { setError(e.message); } finally { setUploading(''); }
  };
  const valueFor = (key, vehicle = type === 'vehicle') => vehicle ? form[key] : getPath(form.data, key);
  const updateField = (key, value, vehicle = type === 'vehicle') => setForm(current => vehicle ? { ...current, [key]: value } : { ...current, data: setPath(current.data, key, value) });
  const save = async e => {
    e.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (type === 'vehicle') {
        const body = { ...form, seatingCapacity: Number(form.seatingCapacity), isActive: form.isActive !== false };
        if (editing) await api.put(`/cabs/${editing}`, body, { headers }); else await api.post('/cabs', body, { headers });
      } else {
        const body = { ...form, type, title: form.title.trim(), slug: form.slug.trim().toLowerCase() || undefined };
        if (editing) await api.put(`/content/${editing}`, body, { headers }); else await api.post('/content', body, { headers });
      }
      setMessage('Changes saved.'); startAdd(); await load();
    } catch (e2) { setError(e2.message); } finally { setBusy(false); }
  };
  const edit = item => {
    setEditing(item._id); setMessage(''); setError('');
    if (type === 'vehicle') setForm({ ...item, features: Array.isArray(item.features) ? item.features : [] });
    else setForm({ title: item.title || '', slug: item.slug || '', order: item.order || 0, isActive: item.isActive !== false, data: item.data || {} });
  };
  const remove = async item => {
    if (!window.confirm(`Delete “${type === 'vehicle' ? item.name : item.title}”? This cannot be undone.`)) return;
    setBusy(true); setError('');
    try { await api.delete(type === 'vehicle' ? `/cabs/${item._id}` : `/content/${item._id}`, { headers }); setMessage('Record deleted.'); await load(); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const toggleStatus = async item => {
    setBusy(true); setError('');
    try {
      if (type === 'vehicle') await api.put(`/cabs/${item._id}`, { isActive: !item.isActive }, { headers });
      else await api.put(`/content/${item._id}`, { ...item, isActive: !item.isActive }, { headers });
      setMessage(item.isActive ? 'Record unpublished.' : 'Record published.'); await load();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };

  if (!token) return <main className="sc-admin sc-admin-login"><style>{adminCss}</style><form className="sc-admin-card" onSubmit={login}><h1>Super Cabs Admin</h1><p>Sign in to manage website content.</p><label>Admin password<input autoComplete="current-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label><button className="sc-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>{error && <p role="alert" className="sc-error">{error}</p>}</form></main>;

  const selected = sections.find(item => item[0] === type);
  const records = type === 'vehicle' ? vehicles : items;
  const filtered = records.filter(item => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
  const fieldsForSection = type === 'vehicle' ? vehicleFields : fields[type] || [];
  const statusKey = type === 'vehicle' ? 'isActive' : 'isActive';

  return <main className="sc-admin"><style>{`${adminCss}.sc-pricing-fields{border:1px solid #d8e2e7;border-radius:8px;padding:12px;display:grid;gap:10px}.sc-pricing-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:9px 0;border-bottom:1px solid #e7edf0}`}</style><header className="sc-admin-header"><div><h1>Super Cabs dashboard</h1><p>Website content and operations</p></div><button onClick={() => { sessionStorage.removeItem('supercabs-admin-token'); setToken(''); }}>Sign out</button></header>
    <nav className="sc-admin-nav" aria-label="Admin sections">{sections.map(([key,label]) => <button key={key} onClick={() => { setType(key); setSearch(''); setMessage(''); setError(''); startAdd(key); }} aria-current={type === key ? 'page' : undefined}>{label}</button>)}</nav>
    {type === 'overview' ? <section className="sc-admin-card"><h2>Dashboard overview</h2><p>Select a section to add, edit, publish, reorder, or remove its records.</p><div className="sc-admin-overview">{sections.slice(1).map(([key,label]) => <button key={key} onClick={() => { setType(key); startAdd(key); }}><strong>{label}</strong><span>Manage records →</span></button>)}</div></section> : <>
      <div className="sc-admin-toolbar"><div><h2>{selected?.[1]}</h2><span>{records.length} records</span></div><button className="sc-primary" onClick={startAdd}>＋ Add new</button></div>
      <div className="sc-admin-layout"><section className="sc-admin-card sc-admin-form-card"><h3>{editing ? 'Edit record' : `Add ${selected?.[1]}`}</h3><form onSubmit={save}>
        {type !== 'vehicle' && <><label>Title / name<input required maxLength="180" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label><label>Slug<input required={['service','tour','page'].includes(type) || type === 'setting'} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></label><label>Display order<input type="number" min="0" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} /></label><label className="sc-check"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Published</label></>}
        {fieldsForSection.map(([key,label,kind='text',required=false,options]) => {
          const value = valueFor(key);
          if (kind === 'pricing') return <fieldset className="sc-pricing-fields" key={key}><legend>{label}</legend>{(Array.isArray(value) ? value : []).map((rate,index) => <div className="sc-pricing-row" key={index}><label>Vehicle<input required value={rate.vehicle || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],vehicle:e.target.value}; updateField(key,next); }} /></label><label>Seats<input value={rate.seats || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],seats:e.target.value}; updateField(key,next); }} /></label><label>Approved price<input required value={rate.price || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],price:e.target.value}; updateField(key,next); }} /></label><label>Label<input value={rate.tag || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],tag:e.target.value}; updateField(key,next); }} /></label><button type="button" aria-label="Remove vehicle price" onClick={() => updateField(key,(value||[]).filter((_,i)=>i!==index))}>Remove rate</button></div>)}<button type="button" onClick={() => updateField(key,[...(Array.isArray(value)?value:[]),{vehicle:'',seats:'',price:'',tag:''}])}>＋ Add vehicle rate</button></fieldset>;
          if (kind === 'itinerary') return <fieldset className="sc-pricing-fields" key={key}><legend>{label}</legend>{(Array.isArray(value) ? value : []).map((step,index) => <div className="sc-pricing-row" key={index}><label>Time / day<input value={step.time || step.day || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],time:e.target.value}; updateField(key,next); }} /></label><label>Stop title<input required value={step.title || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],title:e.target.value}; updateField(key,next); }} /></label><label>Description<input value={step.desc || ''} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],desc:e.target.value}; updateField(key,next); }} /></label><label>Details (one per line)<textarea rows="3" value={(step.points || []).join('\n')} onChange={e => { const next=[...(value||[])]; next[index]={...next[index],points:e.target.value.split('\n').map(v=>v.trim()).filter(Boolean)}; updateField(key,next); }} /></label><button type="button" onClick={() => updateField(key,(value||[]).filter((_,i)=>i!==index))}>Remove stop</button></div>)}<button type="button" onClick={() => updateField(key,[...(Array.isArray(value)?value:[]),{time:'',title:'',desc:'',points:[]}])}>＋ Add itinerary stop</button></fieldset>;
          if (kind === 'image') return <div className="sc-field" key={key}><label>{label}{required && ' *'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => upload(e,key)} disabled={Boolean(uploading)} /></label>{uploading === key && <small>Uploading image…</small>}{value && <img className="sc-image-preview" src={value} alt={`Preview for ${label}`} />}</div>;
          if (kind === 'boolean') return <label className="sc-check" key={key}><input type="checkbox" checked={Boolean(value)} onChange={e => updateField(key,e.target.checked)} />{label}</label>;
          if (kind === 'category') return <label key={key}>{label}<input required list="sc-gallery-categories" value={value || ''} onChange={e => updateField(key,e.target.value)} /><datalist id="sc-gallery-categories">{[...new Set(items.map(item => item.data?.cat).filter(Boolean))].map(category => <option key={category} value={category} />)}</datalist></label>;
          if (kind === 'select') return <label key={key}>{label}<select required={required} value={value || ''} onChange={e => updateField(key,e.target.value)}><option value="">Select category</option>{options.map(option => <option key={option}>{option}</option>)}</select></label>;
          if (kind === 'textarea' || kind === 'list') return <label key={key}>{label}<textarea required={required} rows={kind === 'list' ? 4 : 3} value={kind === 'list' ? (Array.isArray(value) ? value.join('\n') : '') : value || ''} onChange={e => updateField(key,kind === 'list' ? e.target.value.split('\n').map(v => v.trim()).filter(Boolean) : e.target.value)} /></label>;
          return <label key={key}>{label}<input required={required} type={kind === 'number' ? 'number' : 'text'} min={kind === 'number' ? 1 : undefined} value={value ?? ''} onChange={e => updateField(key,kind === 'number' ? Number(e.target.value) : e.target.value)} /></label>;
        })}
        {type === 'vehicle' && <label className="sc-check"><input type="checkbox" checked={form.isActive !== false} onChange={e => setForm({ ...form, isActive: e.target.checked })} />Available / published</label>}
        <div className="sc-admin-actions"><button className="sc-primary" disabled={busy || Boolean(uploading)}>{busy ? 'Saving…' : 'Save record'}</button>{editing && <button type="button" onClick={startAdd}>Cancel</button>}</div>
      </form>{message && <p role="status" className="sc-success">{message}</p>}{error && <p role="alert" className="sc-error">{error}</p>}</section>
      <section className="sc-admin-card"><div className="sc-list-heading"><h3>Records</h3><input aria-label="Search records" placeholder="Search records…" value={search} onChange={e => setSearch(e.target.value)} /></div>{busy && <p>Loading…</p>}{filtered.map(item => <article className="sc-record" key={item._id}><div className="sc-record-main">{(item.data?.image || item.data?.src || item.image) && <img src={item.data?.image || item.data?.src || item.image} alt="" /> }<div><strong>{type === 'vehicle' ? item.name : item.title}</strong><small>{item.slug || item.category || item.data?.cat || 'No slug'} · {item[statusKey] ? 'Published' : 'Unpublished'}{type !== 'vehicle' ? ` · order ${item.order}` : ''}</small></div></div><div className="sc-admin-actions"><button onClick={() => toggleStatus(item)} disabled={busy}>{item.isActive ? 'Unpublish' : 'Publish'}</button><button onClick={() => edit(item)}>Edit</button><button onClick={() => remove(item)} disabled={busy}>Delete</button></div></article>)}{!busy && !filtered.length && <p>No matching records.</p>}</section></div>
      {type === 'page' && <section className="sc-admin-card sc-seo-overview"><h3>SEO overview</h3><p>Indexable pages should have a unique title, meta description, canonical URL, and descriptive image alt text.</p>{[...seoPublicPages.map(([slug,label]) => ({ slug, title: label, seoKind: 'Page', data: items.find(record => record.slug === slug)?.data })), ...seoAudit].map(item => { const missing = !item.data?.seo ? ['SEO fields'] : [!item.data.seo.title && 'title',!item.data.seo.description && 'meta description',!item.data.seo.canonical && 'canonical URL',!item.data.seo.altText && 'image alt text'].filter(Boolean); return <p key={`${item.seoKind}-${item.slug}`}><strong>{item.seoKind}: {item.slug || item.title}</strong>: {missing.length ? `Missing ${missing.join(', ')}` : 'SEO fields complete'}</p>; })}</section>}
    </>}
  </main>;
}

const adminCss = `
.sc-admin{min-height:100vh;padding:28px clamp(16px,4vw,56px);background:#f4f7f9;color:#16363f;font-family:Arial,sans-serif;box-sizing:border-box}.sc-admin *{box-sizing:border-box}.sc-admin h1,.sc-admin h2,.sc-admin h3{color:#16363f;margin-top:0}.sc-admin-header,.sc-admin-toolbar,.sc-list-heading{display:flex;align-items:center;justify-content:space-between;gap:16px}.sc-admin-header p{margin:0;color:#64748b}.sc-admin-nav{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}.sc-admin button{border:1px solid #d8e2e7;border-radius:7px;background:white;color:#16363f;padding:9px 13px;cursor:pointer;font:inherit}.sc-admin button:hover{border-color:#1ca8cb;color:#087e9c}.sc-admin button:disabled{opacity:.6;cursor:wait}.sc-admin .sc-primary{background:#159cbb;color:white;border-color:#159cbb}.sc-admin-nav [aria-current=page]{background:#16363f;color:white;border-color:#16363f}.sc-admin-card{background:#fff;border-radius:12px;padding:22px;box-shadow:0 4px 20px #16363f12;min-width:0}.sc-admin-layout{display:grid;grid-template-columns:minmax(300px,.9fr) minmax(340px,1.1fr);gap:18px;align-items:start}.sc-admin-form-card form{display:grid;gap:13px}.sc-admin label{display:grid;gap:6px;font-size:13px;font-weight:600}.sc-admin input,.sc-admin textarea,.sc-admin select{display:block;width:100%;border:1px solid #cbd5e1;border-radius:6px;padding:9px 10px;background:white;color:#16363f;font:inherit}.sc-admin textarea{resize:vertical}.sc-admin .sc-check{display:flex;align-items:center;gap:9px}.sc-admin .sc-check input{width:auto}.sc-admin .sc-image-preview{display:block;width:min(100%,340px);max-height:180px;object-fit:cover;border-radius:8px;margin-top:8px}.sc-admin-actions{display:flex;flex-wrap:wrap;gap:7px}.sc-list-heading{margin-bottom:10px}.sc-list-heading input{max-width:240px}.sc-record{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #e7edf0;padding:13px 0}.sc-record-main{display:flex;align-items:center;gap:11px;min-width:0}.sc-record-main>div{min-width:0}.sc-record-main strong,.sc-record-main small{display:block;overflow-wrap:anywhere}.sc-record-main small{color:#64748b;margin-top:4px}.sc-record-main img{width:54px;height:44px;object-fit:cover;border-radius:5px}.sc-admin-overview{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px}.sc-admin-overview button{text-align:left;display:grid;gap:8px}.sc-admin-overview span{font-size:12px;color:#64748b}.sc-success{color:#167744}.sc-error{color:#b42318}.sc-seo-overview{margin-top:18px}.sc-admin-login{display:grid;place-items:start center}.sc-admin-login .sc-admin-card{width:min(100%,430px);margin-top:10vh}.sc-admin-login form{display:grid;gap:15px}.sc-admin-login p{color:#64748b}.sc-admin-toolbar{margin:14px 0}.sc-admin-toolbar h2{margin:0}.sc-admin-toolbar span{color:#64748b;font-size:13px}@media(max-width:800px){.sc-admin-layout{grid-template-columns:minmax(0,1fr)}.sc-admin-header{align-items:flex-start}.sc-record{align-items:flex-start;flex-direction:column}.sc-record .sc-admin-actions{width:100%}.sc-record .sc-admin-actions button{flex:1}.sc-list-heading{align-items:flex-start;flex-direction:column}.sc-list-heading input{max-width:none}}
`;
