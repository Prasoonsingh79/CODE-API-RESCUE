import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, ArrowRight, Mail, Lock, Eye, EyeOff, Github, Zap } from 'lucide-react';

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = { username: formData.email.split('@')[0], token: 'mock-jwt-token-123' };
      localStorage.setItem('coderescue_user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/home');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '50%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '50%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
        filter: 'blur(60px)',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem',
        position: 'relative',
        zIndex: 1
      }} className="branding-section">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '0.75rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
            borderRadius: '12px',
            display: 'flex'
          }}>
            <Code2 size={28} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>CodeRescue</span>
        </div>
        
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Rescue your code,<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>one bug at a time</span>
        </h1>
        
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          maxWidth: '400px',
          lineHeight: '1.7'
        }}>
          Join thousands of developers using AI-powered code analysis to find and fix bugs faster than ever.
        </p>

        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: 'auto'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>50K+</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Developers</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--success)' }}>2M+</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Bugs Fixed</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>99.9%</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Uptime</div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }} className="form-section">
        <div style={{
          width: '100%',
          maxWidth: '440px'
        }}>
          <div className="card" style={{
            padding: '2.5rem',
            background: 'rgba(15, 17, 21, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}>Welcome Back</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Sign in to continue your coding journey
              </p>
            </div>
            
            {/* Social Login Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
              <button style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
              >
                <Github size={18} />
                GitHub
              </button>
              <button style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(0,0,0,0.3)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>or continue with email</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    Email Address
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    required 
                    placeholder="developer@example.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      paddingLeft: '2.75rem',
                      borderColor: focusedField === 'email' ? 'var(--primary)' : 'var(--border-color)',
                      boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none'
                    }} 
                  />
                  <Mail size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'email' ? 'var(--primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s'
                  }} />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={16} />
                    Password
                  </span>
                  <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '400' }}>Forgot password?</a>
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    placeholder="Enter your password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      paddingLeft: '2.75rem',
                      paddingRight: '2.75rem',
                      borderColor: focusedField === 'password' ? 'var(--primary)' : 'var(--border-color)',
                      boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none'
                    }} 
                  />
                  <Lock size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'password' ? 'var(--primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s'
                  }} />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '0',
                      display: 'flex'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn" 
                disabled={loading} 
                style={{
                  width: '100%',
                  height: '3.25rem',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="20" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Sign In
                    <ArrowRight size={18} />
                  </span>
                )}
              </button>
            </form>
            
            <p style={{
              textAlign: 'center',
              marginTop: '2rem',
              color: 'var(--text-muted)',
              fontSize: '0.95rem'
            }}>
              Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Create one</Link>
            </p>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}>
            By signing in, you agree to our <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .branding-section { display: none !important; }
          .form-section { flex: 1 !important; }
        }
      `}</style>
    </div>
  );
}
