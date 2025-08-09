import { useEffect, useState } from 'react';
import { Inventory, Region, City, Location } from '../../types/inventory';

const AdminInventory = () => {
  const [data, setData] = useState<Inventory>({ regions: [], cities: [], locations: [] });
  const [region, setRegion] = useState<Region>({ id: '', name: '' });
  const [city, setCity] = useState<City>({ id: '', name: '', regionId: '' });
  const [location, setLocation] = useState<Location>({
    id: '',
    name: '',
    cityId: '',
    mapTitle: '',
    description: '',
    title: '',
    sliderImages: [],
    image: '',
    mapImage: ''
  });

  const load = () => {
    fetch('/api/inventory').then(r => r.json()).then(setData);
  };

  useEffect(() => { load(); }, []);

  const post = (type: string, item: any) =>
    fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, item })
    }).then(load);

  const remove = (type: string, id: string) =>
    fetch('/api/inventory', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id })
    }).then(load);

  return (
    <div style={{ padding: 20 }}>
      <h1>Inventory Admin</h1>

      <section>
        <h2>Regions</h2>
        <ul>
          {data.regions.map(r => (
            <li key={r.id}>
              {r.name} <button onClick={() => remove('region', r.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          placeholder='id'
          value={region.id}
          onChange={e => setRegion({ ...region, id: e.target.value })}
        />
        <input
          placeholder='name'
          value={region.name}
          onChange={e => setRegion({ ...region, name: e.target.value })}
        />
        <button onClick={() => { post('region', region); setRegion({ id: '', name: '' }); }}>
          Add Region
        </button>
      </section>

      <section>
        <h2>Cities</h2>
        <ul>
          {data.cities.map(c => (
            <li key={c.id}>
              {c.name} ({c.regionId}) <button onClick={() => remove('city', c.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          placeholder='id'
          value={city.id}
          onChange={e => setCity({ ...city, id: e.target.value })}
        />
        <input
          placeholder='name'
          value={city.name}
          onChange={e => setCity({ ...city, name: e.target.value })}
        />
        <input
          placeholder='regionId'
          value={city.regionId}
          onChange={e => setCity({ ...city, regionId: e.target.value })}
        />
        <button onClick={() => { post('city', city); setCity({ id: '', name: '', regionId: '' }); }}>
          Add City
        </button>
      </section>

      <section>
        <h2>Locations</h2>
        <ul>
          {data.locations.map(l => (
            <li key={l.id}>
              {l.name} ({l.cityId}) <button onClick={() => remove('location', l.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          placeholder='id'
          value={location.id}
          onChange={e => setLocation({ ...location, id: e.target.value })}
        />
        <input
          placeholder='name'
          value={location.name}
          onChange={e => setLocation({ ...location, name: e.target.value })}
        />
        <input
          placeholder='cityId'
          value={location.cityId}
          onChange={e => setLocation({ ...location, cityId: e.target.value })}
        />
        <button onClick={() => { post('location', location); setLocation({ ...location, id: '', name: '', cityId: '' }); }}>
          Add Location
        </button>
      </section>
    </div>
  );
};

export default AdminInventory;
