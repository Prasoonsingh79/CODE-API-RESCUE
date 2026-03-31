import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Bot, Calendar } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single project data on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/projects/${id}`);
        if (!res.ok) throw new Error('Diagnostic failed: Project not found');
        const data = await res.json();
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Request backend to increment star count
  const handleStar = async () => {
    try {
      const res = await fetch(`http://localhost:8000/projects/${id}/star`, {
        method: 'POST'
      });
      if (res.ok) {
        const updated = await res.json();
        setProject(updated);
      }
    } catch (err) {
      console.error('Error starring project:', err);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}><h2 className="page-title">Establishing link...</h2></div>;
  
  if (error) {
    return (
      <div>
        <Link to="/" className="nav-link" style={{marginBottom: '2rem'}}><ArrowLeft size={16} /> Return to Grid</Link>
        <div className="card" style={{borderColor: '#ef4444', color: '#ef4444', textAlign: 'center'}}>{error}</div>
      </div>
    );
  }
  
  if (!project) return null;

  // AI-like mock analysis logic
  const analyzeCode = (code) => {
    const lines = code.split('\n').length;
    const hasComments = code.includes('//') || code.includes('#') || code.includes('/*');
    
    let analysis = [];
    if (lines > 50) analysis.push("Module is lengthy. Consider refactoring into micro-functions to improve maintainability.");
    else analysis.push("Length is optimal. Code is concise and modular.");
    
    if (!hasComments) analysis.push("Code lacks inline documentation. Adding comments can assist other developers.");
    else analysis.push("Good job including documentation comments. This promotes code comprehension.");

    return analysis;
  };

  const analysisFindings = analyzeCode(project.code);

  return (
    <div style={{animation: 'fadeIn 0.3s ease'}}>
      <Link to="/" className="nav-link" style={{marginBottom: '2rem'}}>
        <ArrowLeft size={16} /> Back to Repository
      </Link>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
        <div>
          <h1 className="page-title" style={{marginBottom: '0.5rem'}}>{project.name}</h1>
          <p className="page-subtitle" style={{maxWidth: '800px'}}>{project.description}</p>
        </div>
        
        <button onClick={handleStar} className="btn" style={{background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid #fbbf24', minWidth: '120px', justifyContent: 'center'}}>
          <Star fill="#fbbf24" size={18} /> Star ({project.stars})
        </button>
      </div>

      <div className="analysis-banner">
        <h3 className="analysis-title">
          <Bot size={20} /> Advanced System Analysis
        </h3>
        <ul style={{marginLeft: '1.5rem', color: 'var(--text-main)', marginTop: '0.5rem'}}>
          {analysisFindings.map((finding, idx) => (
            <li key={idx} style={{marginBottom: '0.25rem'}}>{finding}</li>
          ))}
        </ul>
      </div>

      <h3 style={{marginBottom: '1rem', color: 'var(--text-muted)'}}>Implementation Code</h3>
      <div className="code-block">
        <pre><code style={{color: '#c4b5fd'}}>{project.code}</code></pre>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem'}}>
        <Calendar size={14} /> 
        Uploaded on {new Date(project.created_at).toLocaleString()}
      </div>
    </div>
  );
}
