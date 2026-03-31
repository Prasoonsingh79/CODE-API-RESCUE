import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Code, Search, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/projects/')
      .then(res => {
         if (!res.ok) throw new Error('API Sync Failed');
         return res.json();
      })
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { console.error(err); setError('Failed to connect to CodeRescue Backend.'); setLoading(false); });
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Premium Hero Section */}
      <section style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', marginBottom: '4rem', padding: '2rem 0', minHeight: '60vh', borderBottom: '1px solid var(--border-color)'}}>
        <div style={{flex: '1'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.3)'}}>
             <Zap size={14} /> CodeRescue Version 2.0 Live
          </div>
          <h1 style={{fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.03em'}}>
            The AI-Powered <br/><span style={{background: 'linear-gradient(90deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Developer Hub</span>
          </h1>
          <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: '1.6'}}>
            Deploy your code, get instant static AI diagnostics, and share your most brilliant algorithms globally in seconds.
          </p>
          <div style={{display: 'flex', gap: '1rem'}}>
             <Link to="/create" className="btn" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>Start Deploying</Link>
             <a href="#explore" className="btn-secondary btn" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>Explore Network</a>
          </div>
          
          <div style={{display: 'flex', gap: '2rem', marginTop: '3rem'}}>
             <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}><ShieldCheck size={18} color="#10b981" /> End-to-end testing</div>
             <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}><Layers size={18} color="#10b981" /> Multi-file architecture</div>
          </div>
        </div>
        
        {/* Beautiful Isometric Graphic loaded from public directory! */}
        <div style={{flex: '1', display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)', filter: 'blur(30px)', zIndex: '-1'}}></div>
          <img src="/hero.png" alt="CodeRescue Artificial Intelligence Visualization" style={{width: '100%', maxWidth: '600px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)', animation: 'float 6s ease-in-out infinite'}} />
          <style>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }`}</style>
        </div>
      </section>

      {/* Explorer Section */}
      <section id="explore" style={{scrollMarginTop: '100px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem'}}>
          <div>
            <h2 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem'}}>Community Network</h2>
            <p style={{color: 'var(--text-muted)'}}>Explore active repositories deployed by elite developers.</p>
          </div>
          <div style={{position: 'relative', width: '350px'}}>
            <Search size={18} color="var(--text-muted)" style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)'}} />
            <input type="text" placeholder="Search by name or tech..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '30px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
        </div>

        {loading ? <div style={{textAlign: 'center', padding: '4rem'}}><h2 style={{animation: 'pulse 2s infinite'}}>Loading Network...</h2></div> : null}
        {error ? <div className="card" style={{borderColor: '#ef4444', textAlign: 'center'}}><p style={{color: '#ef4444'}}>{error}</p></div> : null}

        {(!loading && !error && filteredProjects.length === 0) ? (
          <div className="card" style={{textAlign: 'center', padding: '4rem 2rem', alignItems: 'center'}}>
            <Code size={48} color="var(--text-muted)" style={{marginBottom: '1rem'}} />
            <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>No Nodes Active</h3>
            <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Network is idle. Deploy a module to boot the cluster.</p>
            <Link to="/create" className="btn">Deploy Code</Link>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(project => (
               <div className="card" key={project._id} style={{display: 'flex', flexDirection: 'column'}}>
                  <h3 className="card-title" style={{fontSize: '1.4rem'}}>{project.name}</h3>
                  <p className="card-desc" style={{lineHeight: '1.6', fontSize: '0.95rem'}}>
                    {project.description.length > 110 ? project.description.substring(0, 110) + '...' : project.description}
                  </p>
                  <div className="card-footer" style={{marginTop: 'auto'}}>
                    <span className="stars" style={{background: 'rgba(251, 191, 36, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '20px', fontSize: '0.9rem'}}><Star size={16} fill="#fbbf24" stroke="#fbbf24" /> {project.stars}</span>
                    <Link to={`/project/${project._id}`} className="btn btn-secondary" style={{padding: '0.4rem 1rem'}}>View <ArrowRight size={14} /></Link>
                  </div>
               </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
