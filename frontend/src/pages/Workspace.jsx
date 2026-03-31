import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileCode, Plus, User } from 'lucide-react';

export default function Workspace({ user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/projects/')
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{animation: 'fadeIn 0.4s ease'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem'}}>
        <div>
          <h1 className="page-title" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}><LayoutDashboard size={36} color="var(--primary)"/> My Workspace</h1>
          <p className="page-subtitle" style={{marginBottom: 0}}>Manage your deployed repositories and diagnostics.</p>
        </div>
        <Link to="/create" className="btn" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Plus size={18} /> New Project</Link>
      </div>

      <div style={{display: 'flex', gap: '2rem'}}>
        {/* Profile Stats mock */}
        <div style={{flex: '0 0 300px'}}>
          <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
            <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), #c084fc)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto'}}>
               <User size={40} color="white" />
            </div>
            <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem'}}>{user?.username || 'Developer'}</h3>
            <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>Elite Contributor</p>
            <div style={{display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem'}}>
              <div><strong style={{fontSize: '1.5rem', color: 'var(--text-main)'}}>{projects.length}</strong><div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>REPOS</div></div>
              <div><strong style={{fontSize: '1.5rem', color: 'var(--text-main)'}}>54</strong><div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>COMMITS</div></div>
            </div>
          </div>
        </div>

        <div style={{flex: '1'}}>
          <h2 style={{fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-muted)'}}>Active Deployments</h2>
          {loading ? <div>Loading modules...</div> : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {projects.length === 0 ? <p style={{color: 'var(--text-muted)'}}>You have not deployed any projects yet.</p> : null}
              {projects.map(project => (
                <div key={project._id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <FileCode size={24} color="var(--primary)" />
                    <div>
                      <h4 style={{fontSize: '1.1rem', margin: '0 0 0.25rem 0'}}>{project.name}</h4>
                      <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Updated {new Date(project.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Link to={`/project/${project._id}`} className="btn-secondary" style={{padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none', color: 'var(--text-main)'}}>Manage</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
