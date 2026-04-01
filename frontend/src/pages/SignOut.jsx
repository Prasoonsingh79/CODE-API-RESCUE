import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, LogOut, ArrowLeft, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function SignOut() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');

  const handleSignOut = () => {
    setStatus('loading');
    
    setTimeout(() => {
      localStorage.removeItem('coderescue_user');
      setStatus('success');
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1200);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (status === 'success') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Success Animation Background */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 60%)',
          animation: 'successPulse 1s ease-out'
        }}></div>
        
        <div style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            animation: 'bounceIn 0.6s ease-out'
          }}>
            <CheckCircle size={50} color="#10b981" />
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '0.75rem',
            color: 'var(--success)'
          }}>You've Been Signed Out</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Redirecting you to the sign in page...
          </p>
        </div>
        
        <style>{`
          @keyframes successPulse {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; }
            100% { opacity: 0.5; transform: scale(2); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '50%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '50%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '480px',
        padding: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <button
          onClick={handleCancel}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem',
            marginBottom: '2rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="card" style={{
          padding: '2.5rem',
          background: 'rgba(15, 17, 21, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}>
          {/* Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <LogOut size={36} color="#ef4444" />
          </div>

          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            <Code2 size={24} color="var(--primary)" />
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>CodeRescue</span>
          </div>

          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '0.75rem'
          }}>Ready to Leave?</h2>
          
          <p style={{
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            We're sad to see you go! Make sure you've saved all your work before signing out.
          </p>

          {/* Warning Box */}
          <div style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            textAlign: 'left'
          }}>
            <AlertCircle size={20} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Don't lose your progress</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Unsaved changes will be lost. Make sure to export or save any important data.
              </p>
            </div>
          </div>

          {/* Stats/Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>~</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Projects</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>~</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Analyses</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>~</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bugs Found</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={handleSignOut}
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '0.9rem 1.5rem',
                background: status === 'loading' 
                  ? 'rgba(239, 68, 68, 0.5)' 
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading') {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.4)';
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut size={20} />
                  Yes, Sign Me Out
                </>
              )}
            </button>

            <button
              onClick={handleCancel}
              style={{
                width: '100%',
                padding: '0.9rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'var(--border-color)';
              }}
            >
              No, Take Me Back
            </button>
          </div>

          <p style={{
            marginTop: '1.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}>
            Your session data will be cleared from this device.
          </p>
        </div>

        {/* Footer Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '1.5rem'
        }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
