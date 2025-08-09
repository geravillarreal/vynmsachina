import { useState } from 'react';

export default function AdminLogin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    });
    if (res.ok) {
      window.location.href = '/admin/inventory';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="mb-4">Admin Login</h1>
      <form onSubmit={onSubmit} className="border rounded p-4 bg-light">
        <div className="mb-3">
          <label className="form-label">User</label>
          <input className="form-control" value={user} onChange={e => setUser(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">Sign in</button>
      </form>
    </div>
  );
}