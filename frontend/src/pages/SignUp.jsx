import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay for Registration
    setTimeout(() => {
      // Mock User Registration and Token assignment
      const mockUser = { username: formData.username, token: 'mock-jwt-token-789' };
      localStorage.setItem('coderescue_user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/');
    }, 1200);
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', position: 'absolute', top: 0, left: 0, width: '100%', padding: '2rem'}}>
      <div style={{position: 'absolute', top: '20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 50%)', filter: 'blur(80px)'}}></div>
      
      <div className="card" style={{width: '100%', maxWidth: '450px', padding: '3rem 2.5rem', position: 'relative', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 17, 21, 0.8)', backdropFilter: 'blur(20px)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center'}}>
          <Code2 size={32} color="var(--primary)" />
          <h2 style={{fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px'}}>CodeRescue</h2>
        </div>
        
        <h2 style={{textAlign: 'center', fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: '700'}}>Join the Network</h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem'}}>Push algorithms, analyze code, and build</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{fontSize: '0.9rem'}}>Username</label>
            <input type="text" required placeholder="ninja_dev" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} style={{background: 'rgba(0,0,0,0.5)'}} />
          </div>
          <div className="form-group">
            <label style={{fontSize: '0.9rem'}}>Email Address</label>
            <input type="email" required placeholder="developer@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{background: 'rgba(0,0,0,0.5)'}} />
          </div>
          <div className="form-group" style={{marginBottom: '2rem'}}>
            <label style={{fontSize: '0.9rem'}}>Create Password</label>
            <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{background: 'rgba(0,0,0,0.5)'}} />
          </div>
          
          <button type="submit" className="btn" disabled={loading} style={{width: '100%', height: '3rem', justifyContent: 'center', fontSize: '1rem', letterSpacing: '0.5px'}}>
            {loading ? 'Initializing Account...' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
          Already have an account? <Link to="/signin" style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '500'}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
