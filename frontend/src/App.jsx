import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Code2, LogOut, User, Compass, LayoutDashboard, Trophy } from 'lucide-react';

// Main Navigation Component
function Navigation({ user, handleSignOut }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  if (isAuthPage) return null; // Hide navbar on login/register pages

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <Code2 size={28} color="#6366f1" />
        CodeRescue
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><Compass size={18}/> Explore</Link>
        <Link to="/" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><Trophy size={18}/> Leaderboard</Link>
        
        {user ? (
          <>
            <Link to="/" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><LayoutDashboard size={18}/> My Workspace</Link>
            <Link to="/create" className="btn" style={{marginLeft: '0.5rem'}}>Deploy Code</Link>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem'}}>
               <span style={{color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500'}}><User size={16} color="var(--primary)"/> {user.username}</span>
               <button onClick={handleSignOut} className="btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: 'var(--text-muted)'}}>
                 <LogOut size={16} /> Sign Out
               </button>
            </div>
          </>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem'}}>
            <Link to="/signin" className="nav-link" style={{fontWeight: '600', color: 'var(--text-main)'}}>Sign In</Link>
            <Link to="/signup" className="btn">Sign Up Free</Link>
          </div>
        )}
      </div>
    </header>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for mock auth session
    const savedUser = localStorage.getItem('coderescue_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('coderescue_user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} handleSignOut={handleSignOut} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
