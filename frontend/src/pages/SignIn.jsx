import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay for Auth
    setTimeout(() => {
      // Mock User Token
      const mockUser = { username: formData.email.split('@')[0], token: 'mock-jwt-token-123' };
      localStorage.setItem('coderescue_user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/home');
    }, 1000);
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', position: 'absolute', top: 0, left: 0, width: '100%', padding: '2rem'}}>
      <div style={{position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)', filter: 'blur(60px)'}}></div>
      <div style={{position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)', filter: 'blur(60px)'}}></div>
      
      <div className="card" style={{width: '100%', maxWidth: '450px', padding: '3rem 2.5rem', position: 'relative', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 17, 21, 0.8)', backdropFilter: 'blur(20px)'}}>
        <Link to="/" style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem', textDecoration: 'none'}}>
          <Code2 size={40} color="var(--primary)" />
        </Link>
        <h2 style={{textAlign: 'center', fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: '700'}}>Welcome Back</h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem'}}>Sign in to continue to CodeRescue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{fontSize: '0.9rem'}}>Email Address</label>
            <input type="email" required placeholder="developer@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{background: 'rgba(0,0,0,0.5)'}} />
          </div>
          <div className="form-group" style={{marginBottom: '2rem'}}>
            <label style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
              Password
              <a href="#" style={{color: 'var(--primary)', textDecoration: 'none'}}>Forgot?</a>
            </label>
            <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} style={{background: 'rgba(0,0,0,0.5)'}} />
          </div>
          
          <button type="submit" className="btn" disabled={loading} style={{width: '100%', height: '3rem', justifyContent: 'center', fontSize: '1rem', letterSpacing: '0.5px'}}>
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
          New to CodeRescue? <Link to="/signup" style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '500'}}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
