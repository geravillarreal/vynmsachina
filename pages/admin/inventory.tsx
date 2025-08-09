import { useEffect, useState } from 'react';
import type { InventoryData, Region, City, Location, LocationItemSection } from '../../lib/inventory.types';
import 'bootstrap/dist/css/bootstrap.min.css';

type DeleteInfo = { type: 'region'|'city'|'location'; id: string; name: string };

export default function InventoryAdmin() {
  const [data, setData] = useState<InventoryData>({ regions: [], cities: [], locations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Forms state
  const [region, setRegion] = useState<Region>({ id: '', name: '' });
  const [city, setCity] = useState<City>({ id: '', name: '', regionId: '' });
  const emptyLoc: Location = { id: '', name: '', cityId: '', title: '', mapTitle: '', description: '', notes: '', sliderImages: [], items: [] };
  const [loc, setLoc] = useState<Location>({ ...emptyLoc });

  const [editing, setEditing] = useState<{ type: 'region'|'city'|'location'|null, itemId?: string }>({ type: null });

  // Confirm modal state
  const [confirm, setConfirm] = useState<{ show: boolean; info?: DeleteInfo; busy?: boolean; err?: string }>({ show: false });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (confirm.show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [confirm.show]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/inventory');
    const j = await res.json();
    setData(j);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const addItem = async (type: 'region'|'city'|'location', item: any) => {
    const res = await fetch('/api/inventory', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, item })
    });
    if (!res.ok) throw new Error('Failed');
  };
  const putItem = async (type: 'region'|'city'|'location', item: any) => {
    const res = await fetch('/api/inventory', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, item })
    });
    if (!res.ok) throw new Error('Failed');
  };
  const delItem = async (type: 'region'|'city'|'location', id: string) => {
    const url = `/api/inventory?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed');
  };

  // Upload helper
  const uploadOne = async (file: File, kind: 'image'|'pdf'): Promise<string> => {
    const fd = new FormData();
    fd.append('kind', kind);
    // Para PDF podemos pasar id/title si quieres nombres bonitos:
    if (kind === 'pdf') {
      if (loc.id) fd.append('pdfId', loc.id);
      if (loc.title) fd.append('pdfTitle', String(loc.title));
    }
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('upload error');
    const { paths } = await res.json();
    return paths[0];
  };

  // Location: dynamic sections
  const addSection = () => setLoc(l => ({ ...l, items: [...(l.items||[]), { title: '', list: [] }] }));
  const addBullet = (sIdx: number) => {
    const items = [...(loc.items||[])];
    const sec = { ...(items[sIdx] || { title: '', list: [] }) } as LocationItemSection;
    sec.list = [...(sec.list||[]), ''];
    items[sIdx] = sec;
    setLoc({ ...loc, items });
  };

  const saveRegion = async () => {
    setError('');
    try {
      if (editing.type === 'region' && region.id) {
        await putItem('region', region);
        setEditing({ type: null });
      } else {
        await addItem('region', { name: region.name }); // id auto
      }
      await fetchData();
      setRegion({ id: '', name: '' });
    } catch { setError('Error saving region'); }
  };
  const saveCity = async () => {
    setError('');
    try {
      if (editing.type === 'city' && city.id) {
        await putItem('city', city);
        setEditing({ type: null });
      } else {
        await addItem('city', { name: city.name, regionId: city.regionId }); // id auto
      }
      await fetchData();
      setCity({ id: '', name: '', regionId: '' });
    } catch { setError('Error saving city'); }
  };
  const saveLoc = async () => {
    setError('');
    try {
      if (editing.type === 'location' && loc.id) {
        await putItem('location', loc);
        setEditing({ type: null });
      } else {
        const { id, ...rest } = loc; // ignora id, lo genera el server
        await addItem('location', rest);
      }
      await fetchData();
      setLoc({ ...emptyLoc });
    } catch { setError('Error saving location'); }
  };

  // Ask delete -> open modal
  const askDelete = (type: 'region'|'city'|'location', id: string, name: string) => {
    setConfirm({ show: true, info: { type, id, name }, busy: false, err: '' });
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!confirm.info) return;
    try {
      setConfirm(prev => ({ ...prev, busy: true, err: '' }));
      await delItem(confirm.info.type, confirm.info.id);
      setConfirm({ show: false });
      await fetchData();
    } catch (e: any) {
      setConfirm(prev => ({ ...prev, busy: false, err: e?.message || 'Delete failed' }));
    }
  };

  if (loading) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-1">Inventory Admin</h1>
      <p className="text-muted small">IDs generated automatically. Edit items and upload media easily.</p>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Regions */}
      <div className="card mb-4">
        <div className="card-header">Regions</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" value={region.name} onChange={e=>setRegion({ ...region, name: e.target.value })} />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={saveRegion}>{editing.type==='region' ? 'Save Changes' : 'Add Region'}</button>
            </div>
            {editing.type==='region' && <div className="col-md-3 d-flex align-items-end"><button className="btn btn-outline-secondary w-100" onClick={()=>{ setEditing({ type: null }); setRegion({ id:'', name:''}); }}>Cancel</button></div>}
          </div>
          <ul className="list-group mt-3">
            {data.regions.map(r => (
              <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>{r.name}</strong> <small className="text-muted">(id: {r.id})</small></span>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>{ setRegion(r); setEditing({ type: 'region', itemId: r.id }); }}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>askDelete('region', r.id, r.name)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cities */}
      <div className="card mb-4">
        <div className="card-header">Cities</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input className="form-control" value={city.name} onChange={e=>setCity({ ...city, name: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Region</label>
              <select className="form-select" value={city.regionId} onChange={e=>setCity({ ...city, regionId: e.target.value })}>
                <option value="">Select…</option>
                {data.regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={saveCity}>{editing.type==='city' ? 'Save Changes' : 'Add City'}</button>
            </div>
            {editing.type==='city' && <div className="col-md-12"><button className="btn btn-outline-secondary" onClick={()=>{ setEditing({ type: null }); setCity({ id:'', name:'', regionId:''}); }}>Cancel</button></div>}
          </div>

          <ul className="list-group mt-3">
            {data.cities.map(c => (
              <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>{c.name}</strong> <small className="text-muted">(id: {c.id}, region: {c.regionId})</small></span>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>{ setCity(c); setEditing({ type: 'city', itemId: c.id }); }}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>askDelete('city', c.id, c.name)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Locations */}
      <div className="card mb-4">
        <div className="card-header">Locations</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input className="form-control" value={loc.name} onChange={e=>setLoc({ ...loc, name: e.target.value })} />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <select className="form-select" value={loc.cityId} onChange={e=>setLoc({ ...loc, cityId: e.target.value })}>
                <option value="">Select…</option>
                {data.cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={saveLoc}>{editing.type==='location' ? 'Save Changes' : 'Add Location'}</button>
            </div>
            {editing.type==='location' && <div className="col-md-12"><button className="btn btn-outline-secondary" onClick={()=>{ setEditing({ type: null }); setLoc({ ...emptyLoc }); }}>Cancel</button></div>}

            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input className="form-control" value={loc.title||''} onChange={e=>setLoc({ ...loc, title: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Map Title</label>
              <input className="form-control" value={loc.mapTitle||''} onChange={e=>setLoc({ ...loc, mapTitle: e.target.value })} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={loc.description||''} onChange={e=>setLoc({ ...loc, description: e.target.value })} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Notes</label>
              <textarea className="form-control" rows={2} value={loc.notes||''} onChange={e=>setLoc({ ...loc, notes: e.target.value })} />
            </div>

            {/* Media uploaders */}
            <div className="col-md-4">
              <label className="form-label">Main Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={async e=>{
                const f = e.target.files?.[0]; if (!f) return; const p = await uploadOne(f,'image'); setLoc({ ...loc, image: p });
              }} />
              {loc.image && <div className="small mt-1">{loc.image}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Map Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={async e=>{
                const f = e.target.files?.[0]; if (!f) return; const p = await uploadOne(f,'image'); setLoc({ ...loc, mapImage: p });
              }} />
              {loc.mapImage && <div className="small mt-1">{loc.mapImage}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Brochure (PDF)</label>
              <input type="file" className="form-control" accept="application/pdf" onChange={async e=>{
                const f = e.target.files?.[0]; if (!f) return; const p = await uploadOne(f,'pdf'); setLoc({ ...loc, brochure: p });
              }} />
              {loc.brochure && <div className="small mt-1">{loc.brochure}</div>}
            </div>

            <div className="col-md-12">
              <label className="form-label">Slider Images</label>
              <input type="file" className="form-control" multiple accept="image/*" onChange={async e=>{
                const files = Array.from(e.target.files||[]);
                const paths: string[] = [];
                for (const f of files) { paths.push(await uploadOne(f as File, 'image')); }
                setLoc({ ...loc, sliderImages: [...(loc.sliderImages||[]), ...paths] });
              }} />
              {!!(loc.sliderImages||[]).length && (
                <ul className="small mt-2">
                  {(loc.sliderImages||[]).map((p,i)=>(<li key={i}>{p}</li>))}
                </ul>
              )}
            </div>

            {/* Sections */}
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label mb-0">Sections</label>
                <button className="btn btn-sm btn-outline-secondary" onClick={addSection} type="button">+ Add Section</button>
              </div>
              {(loc.items||[]).map((s, sIdx) => (
                <div className="border rounded p-3 mt-2" key={sIdx}>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label">Section Title</label>
                      <input className="form-control" value={s.title} onChange={e=>{
                        const items = [...(loc.items||[])];
                        items[sIdx] = { ...s, title: e.target.value };
                        setLoc({ ...loc, items });
                      }} />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <button className="btn btn-sm btn-outline-secondary ms-auto" onClick={()=>addBullet(sIdx)} type="button">+ Add Bullet</button>
                    </div>
                    <div className="col-12">
                      {(s.list||[]).map((t, tIdx) => (
                        <div className="input-group mb-2" key={tIdx}>
                          <span className="input-group-text">•</span>
                          <input className="form-control" value={t} onChange={e=>{
                            const items = [...(loc.items||[])];
                            const sec = { ...(items[sIdx]) } as LocationItemSection;
                            const list = [...(sec.list||[])];
                            list[tIdx] = e.target.value;
                            sec.list = list; items[sIdx] = sec; setLoc({ ...loc, items });
                          }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-2">Existing Locations</h5>
          <ul className="list-group">
            {data.locations.map(l => (
              <li key={l.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{l.name}</strong> <small className="text-muted">(id: {l.id}, city: {l.cityId})</small>
                </div>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>{ setLoc({ ...emptyLoc, ...l }); setEditing({ type: 'location', itemId: l.id }); }}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>askDelete('location', l.id, l.name)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- Confirm Delete Modal ---------------- */}
      <div
        className={`modal ${confirm.show ? 'd-block show' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-hidden={confirm.show ? 'false' : 'true'}
        style={{ background: confirm.show ? 'rgba(0,0,0,0.5)' : 'transparent' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mb-0">Confirm deletion</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={()=>setConfirm({ show: false })}></button>
            </div>
            <div className="modal-body">
              {confirm.info ? (
                <p className="mb-0">
                  Are you sure you want to delete this <strong>{confirm.info.type}</strong>: <strong>{confirm.info.name}</strong>?
                </p>
              ) : (
                <p className="mb-0">Are you sure you want to delete this item?</p>
              )}
              {confirm.err && <div className="alert alert-danger mt-3">{confirm.err}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setConfirm({ show: false })} disabled={!!confirm.busy}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={!!confirm.busy}>
                {confirm.busy ? 'Deleting…' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------ */}
    </div>
  );
}
