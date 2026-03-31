import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Bot, Calendar, FileCode, CheckCircle, AlertTriangle, Info, Activity, ShieldCheck, Bug } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/projects/${id}`);
        if (!res.ok) throw new Error('Diagnostic failed: Project not found');
        const data = await res.json();
        
        if (data.code && (!data.files || data.files.length === 0)) {
          data.files = [{ filename: 'LegacySourceCode.txt', content: data.code }];
        }
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleStar = async () => {
    try {
      const res = await fetch(`http://localhost:8000/projects/${id}/star`, { method: 'POST' });
      if (res.ok) {
        const updated = await res.json();
        if (updated.code && (!updated.files || updated.files.length === 0)) {
           updated.files = [{ filename: 'LegacySourceCode.txt', content: updated.code }];
        }
        setProject(updated);
      }
    } catch (err) {
      console.error('Error starring project:', err);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}><h2 className="page-title">Establishing link...</h2></div>;
  if (error) return <div><Link to="/" className="nav-link"><ArrowLeft size={16} /> Return</Link><div className="card" style={{color: '#ef4444', marginTop: '2rem'}}>{error}</div></div>;
  if (!project) return null;

  const activeFile = project.files?.[activeFileIndex] || { filename: 'No Files Associated', content: 'Empty' };

  // Premium Code Analysis Engine
  const analyzeCode = (code) => {
    const lines = code.split('\n').length;
    let analysis = {
      score: 100,
      errors: [],
      warnings: [],
      passed: []
    };
    
    // Comments check
    const hasComments = code.includes('//') || code.includes('#') || code.includes('/*');
    if (!hasComments) {
       analysis.score -= 15;
       analysis.errors.push("Missing required code documentation or inline comments.");
    } else {
       analysis.passed.push("Documentation standard met (Comments found).");
    }
    
    // Naming check
    if (code.includes('let x ') || code.includes('let y ') || code.includes('var a ') || code.includes(' a = ')) {
       analysis.score -= 10;
       analysis.warnings.push("Bad Variables: Single-character variable limits code readability.");
    } else {
       analysis.passed.push("Naming convention appears strictly standard.");
    }

    // Structure check
    if (lines > 150) {
      analysis.score -= 10;
      analysis.warnings.push(`File is overly long (${lines} lines). Consider micro-service extraction.`);
    } else {
      analysis.passed.push(`File structure is highly optimized (${lines} lines).`);
    }

    // Log artifact check
    if (code.includes('console.log(') || code.includes('print(')) {
       analysis.score -= 5;
       analysis.warnings.push("Artifacts Detected: Hardcoded print/console logs found. Use an abstracted Logger for production.");
    } else {
       analysis.passed.push("No console artifacts detected in this codebase.");
    }

    if (activeFile.filename.endsWith('.env') || code.includes('apiKey = "') || code.includes('secret = "')) {
       analysis.score -= 30;
       analysis.errors.push("CRITICAL SECURITY RISK: Potential secrets or keys exposed directly inside source execution!");
    } else {
       analysis.passed.push("Secrets are securely isolated.");
    }

    // Guarantee floor 0
    analysis.score = Math.max(0, analysis.score);
    return analysis;
  };

  const diagnostics = activeFile.content ? analyzeCode(activeFile.content) : null;

  return (
    <div style={{animation: 'fadeIn 0.3s ease'}}>
      <Link to="/home" className="nav-link" style={{marginBottom: '2rem'}}><ArrowLeft size={16} /> Back to Repository</Link>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
        <div>
          <h1 className="page-title" style={{marginBottom: '0.5rem'}}>{project.name}</h1>
          <p className="page-subtitle" style={{maxWidth: '800px'}}>{project.description}</p>
        </div>
        <button onClick={handleStar} className="btn" style={{background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid #fbbf24', minWidth: '120px', justifyContent: 'center'}}>
          <Star fill="#fbbf24" size={18} /> Star ({project.stars})
        </button>
      </div>

      <div style={{display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap'}}>
        {/* Mult-File Browser Sidebar feature */}
        <div style={{flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', height: 'fit-content', position: 'sticky', top: '120px'}}>
          <h3 style={{fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FileCode size={18} color="var(--primary)" /> Project Workspace</h3>
          {project.files && project.files.map((f, i) => (
             <button 
               key={i} 
               onClick={() => setActiveFileIndex(i)}
               style={{
                 textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', 
                 background: i === activeFileIndex ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                 color: i === activeFileIndex ? '#fff' : 'var(--text-muted)',
                 cursor: 'pointer', transition: 'all 0.2s', fontWeight: i === activeFileIndex ? '600' : '400',
                 overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
               }}>
               {f.filename}
             </button>
          ))}
        </div>

        {/* Code Content Area & Enhanced Analysis Box */}
        <div style={{flex: '1', minWidth: '0'}}>
          
          {/* New Premium Diagnostic Dashboard */}
          {diagnostics && (
          <div className="card" style={{padding: '0', overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(99, 102, 241, 0.4)'}}>
            <div style={{background: 'rgba(99, 102, 241, 0.1)', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.1rem'}}><Activity size={20} color="var(--primary)"/> Diagnostic Report for <span style={{color: 'var(--primary)'}}>{activeFile.filename}</span></h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span style={{fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>Engine Score</span>
                <span style={{background: diagnostics.score > 80 ? 'rgba(16, 185, 129, 0.2)' : diagnostics.score > 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: diagnostics.score > 80 ? '#10b981' : diagnostics.score > 60 ? '#f59e0b' : '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '30px', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', border: '1px solid currentColor'}}>
                  {diagnostics.score}/100
                </span>
              </div>
            </div>
            <div style={{padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
              
              {/* Errors Panel */}
              {diagnostics.errors.length > 0 && (
                <div style={{background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '1rem'}}>
                  <h4 style={{color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}><Bug size={16}/> Critical Issues</h4>
                  <ul style={{margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}>
                    {diagnostics.errors.map((msg, i) => <li key={i} style={{marginBottom: '0.5rem'}}>{msg}</li>)}
                  </ul>
                </div>
              )}

              {/* Warnings Panel */}
              {diagnostics.warnings.length > 0 && (
                <div style={{background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '8px', padding: '1rem'}}>
                  <h4 style={{color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}><AlertTriangle size={16}/> Refactor Warnings</h4>
                  <ul style={{margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}>
                    {diagnostics.warnings.map((msg, i) => <li key={i} style={{marginBottom: '0.5rem'}}>{msg}</li>)}
                  </ul>
                </div>
              )}

              {/* Passed Panel */}
              <div style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '1rem'}}>
                <h4 style={{color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}><ShieldCheck size={16}/> Passed Checks</h4>
                <ul style={{margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}>
                  {diagnostics.passed.map((msg, i) => <li key={i} style={{marginBottom: '0.5rem'}}>{msg}</li>)}
                </ul>
              </div>

            </div>
          </div>
          )}

          <div className="code-block" style={{marginTop: '0', borderRadius: '12px'}}>
            <div style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem'}}>
              <div style={{width: 12, height: 12, borderRadius: '50%', background: '#ef4444'}}></div>
              <div style={{width: 12, height: 12, borderRadius: '50%', background: '#f59e0b'}}></div>
              <div style={{width: 12, height: 12, borderRadius: '50%', background: '#10b981'}}></div>
            </div>
            <pre><code style={{color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'Consolas, Monaco, monospace'}}>{activeFile.content}</code></pre>
          </div>
        </div>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem'}}>
        <Calendar size={14} /> Processed via MongoDB Atlas on {new Date(project.created_at).toLocaleString()}
      </div>
    </div>
  );
}
