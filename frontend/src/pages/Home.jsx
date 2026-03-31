import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Code } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects when component mounts
  useEffect(() => {
    fetch('http://localhost:8000/projects/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to connect to CodeRescue Backend. Is the FastAPI server running?');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{textAlign: 'center', padding: '4rem'}}>
        <h2 className="page-title" style={{fontSize: '2rem', animation: 'pulse 2s infinite'}}>Loading projects...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', textAlign: 'center'}}>
        <h3 style={{color: '#ef4444', marginBottom: '1rem'}}>Connection Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{marginBottom: '3rem'}}>
        <h1 className="page-title">Discover Solutions</h1>
        <p className="page-subtitle">Explore code snippets, architectural drafts, and algorithms shared by the community.</p>
      </div>

      {projects.length === 0 ? (
        <div className="card" style={{textAlign: 'center', padding: '4rem 2rem', alignItems: 'center'}}>
          <Code size={48} color="var(--text-muted)" style={{marginBottom: '1rem'}} />
          <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>No projects found</h3>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>The repository is empty. Be the first to deploy and share your code!</p>
          <Link to="/create" className="btn">Create Your First Project</Link>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
             <div className="card" key={project._id}>
                <h3 className="card-title">{project.name}</h3>
                <p className="card-desc">
                  {project.description.length > 120 
                    ? project.description.substring(0, 120) + '...' 
                    : project.description}
                </p>
                <div className="card-footer">
                  <span className="stars" title="Community Stars">
                    <Star size={18} fill="#fbbf24" stroke="#fbbf24" /> {project.stars}
                  </span>
                  <Link to={`/project/${project._id}`} className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
