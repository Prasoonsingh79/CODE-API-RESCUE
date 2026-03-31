import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Code, Search, Globe } from 'lucide-react';

export default function Explore() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/projects/')
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{animation: 'fadeIn 0.4s ease'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
        <Globe size={40} color="var(--primary)" />
        <h1 className="page-title" style={{marginBottom: 0}}>Global Network</h1>
      </div>
      <p className="page-subtitle">Search, discover, and learn from millions of lines of community code.</p>
      
      <div style={{position: 'relative', maxWidth: '800px', marginBottom: '3rem'}}>
        <Search size={22} color="var(--text-muted)" style={{position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)'}} />
        <input 
          type="text" 
          placeholder="Search entire registry..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', fontSize: '1.1rem'}}
        />
      </div>

      {loading ? <div style={{textAlign: 'center', padding: '4rem'}}><h2 style={{animation: 'pulse 2s infinite'}}>Connecting to nodes...</h2></div> : null}

      {!loading && filteredProjects.length === 0 ? (
        <div className="card" style={{textAlign: 'center', padding: '4rem 2rem'}}><Code size={48} color="var(--text-muted)" style={{marginBottom: '1rem'}} /><h3>No results found</h3></div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
             <div className="card" key={project._id} style={{display: 'flex', flexDirection: 'column'}}>
                <h3 className="card-title">{project.name}</h3>
                <p className="card-desc" style={{flexGrow: 1}}>{project.description.substring(0, 100)}...</p>
                <div className="card-footer" style={{marginTop: 'auto'}}>
                  <span className="stars"><Star size={16} fill="#fbbf24" stroke="#fbbf24" /> {project.stars}</span>
                  <Link to={`/project/${project._id}`} className="btn btn-secondary" style={{padding: '0.4rem 1rem'}}>Inspect</Link>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
