import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trophy } from 'lucide-react';

export default function Leaderboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/projects/')
      .then(res => res.json())
      .then(data => { 
        // Sort explicitly by stars descending
        const sorted = data.sort((a, b) => b.stars - a.stars).slice(0, 50);
        setProjects(sorted); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{animation: 'fadeIn 0.4s ease', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '3rem'}}>
        <Trophy size={64} color="#fbbf24" style={{marginBottom: '1rem', background: 'rgba(251, 191, 36, 0.1)', padding: '1rem', borderRadius: '50%'}} />
        <h1 className="page-title">Top Rated Modules</h1>
        <p className="page-subtitle">The highest quality community projects dynamically ranked by peer stars.</p>
      </div>

      {loading ? <div style={{textAlign: 'center'}}><h2 style={{animation: 'pulse 2s infinite'}}>Compiling ranks...</h2></div> : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {projects.map((project, index) => (
             <Link to={`/project/${project._id}`} key={project._id} style={{display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '16px', textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s'}}>
                <div style={{fontSize: '2rem', fontWeight: '800', width: '50px', textAlign: 'center', color: index < 3 ? '#fbbf24' : 'var(--text-muted)'}}>
                  #{index + 1}
                </div>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-main)'}}>{project.name}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{project.description.substring(0, 80)}...</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1.2rem', fontWeight: '700', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '0.5rem 1rem', borderRadius: '30px'}}>
                  <Star fill="#fbbf24" size={20} /> {project.stars}
                </div>
             </Link>
          ))}
        </div>
      )}
    </div>
  );
}
