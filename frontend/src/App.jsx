import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Code2, LogOut, User, Compass, LayoutDashboard, Trophy } from 'lucide-react';

// Main Navigation Component
function Navigation({ user, handleSignOut }) {
  const location = useLocation();
  // Hide navbar uniquely when sitting exactly on the landing sign-in or register page
  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <header className="navbar">
      <Link to="/home" className="logo">
        <Code2 size={28} color="#6366f1" />
        CodeRescue
      </Link>
      <div className="nav-links">
        <Link to="/home" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><Compass size={18}/> Explore</Link>
        <Link to="/home" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><Trophy size={18}/> Leaderboard</Link>
        
        {user ? (
          <>
            <Link to="/home" className="nav-link" style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}><LayoutDashboard size={18}/> My Workspace</Link>
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
            <Link to="/" className="nav-link" style={{fontWeight: '600', color: 'var(--text-main)'}}>Sign In</Link>
            <Link to="/signup" className="btn">Sign Up Free</Link>
          </div>
        )}
      </div>
    </header>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('coderescue_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleSignOut = () => {
    localStorage.removeItem('coderescue_user');
    setUser(null);
    window.location.href = '/'; // Send directly to base signin page on logout!
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} handleSignOut={handleSignOut} />

        <main>
          <Routes>
            {/* Landing page is now explicitly the Sign In page! */}
            <Route path="/" element={user ? <Navigate to="/home" replace /> : <SignIn setUser={setUser} />} />
            <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <SignUp setUser={setUser} />} />
            
            {/* The rest of the platform is strictly shielded behind /home */}
            <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
            <Route path="/create" element={user ? <CreateProject /> : <Navigate to="/" replace />} />
            <Route path="/project/:id" element={user ? <ProjectDetail /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
