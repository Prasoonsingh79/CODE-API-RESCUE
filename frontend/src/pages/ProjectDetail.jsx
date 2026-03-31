import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Bot, Calendar, FileCode, CheckCircle, AlertTriangle, Info } from 'lucide-react';

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
        
        // Handle backwards compatibility for older entries that used to have a "code" string instead of "files" array
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

  // Step 2 feature: Advanced AI Code Analysis integration logic
  const analyzeCode = (code) => {
    const lines = code.split('\n').length;
    let analysis = [];
    
    // 1. Missing comments check
    const hasComments = code.includes('//') || code.includes('#') || code.includes('/*');
    if (!hasComments) {
       analysis.push({ type: 'error', icon: <AlertTriangle size={16}/>, msg: "Missing Comments: Strict documentation is missing. Recommend adding inline comments." });
    } else {
       analysis.push({ type: 'success', icon: <CheckCircle size={16}/>, msg: "Documentation Standard Met: Found inline comments successfully." });
    }
    
    // 2. Bad naming pattern detection
    if (code.includes('let x ') || code.includes('let y ') || code.includes('var a ') || code.includes(' a = ')) {
       analysis.push({ type: 'warning', icon: <AlertTriangle size={16}/>, msg: "Bad Naming Pattern: Use descriptive variable names instead of short single letters (e.g. 'x', 'a') to improve robustness." });
    }

    // 3. General Architecture sizing check
    if (lines > 200) {
      analysis.push({ type: 'warning', icon: <AlertTriangle size={16}/>, msg: "Code Structure: File exceeds 200 lines. Refactoring into helper modules will improve maintainability." });
    }

    // 4. Basic Error mock (e.g. console.log usage)
    if (code.includes('console.log(')) {
       analysis.push({ type: 'info', icon: <Info size={16}/>, msg: "Development Artifact: Found 'console.log()'. In production software, consider a structured logging framework." });
    }

    return analysis.length > 0 ? analysis : [{ type: 'success', icon: <CheckCircle size={16}/>, msg: "Clean Architecture: No immediate issues detected in this module." }];
  };

  const analysisFindings = activeFile.content ? analyzeCode(activeFile.content) : [];

  return (
    <div style={{animation: 'fadeIn 0.3s ease'}}>
      <Link to="/" className="nav-link" style={{marginBottom: '2rem'}}><ArrowLeft size={16} /> Back to Repository</Link>

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
        <div style={{flex: '0 0 260px', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', height: 'fit-content'}}>
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
          <div className="analysis-banner" style={{marginTop: 0, borderTop: '4px solid var(--primary)', background: 'var(--card-bg)'}}>
            <h3 className="analysis-title"><Bot size={20} /> System Diagnostics for `{activeFile.filename}`</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem'}}>
              {analysisFindings.map((finding, idx) => (
                <div key={idx} style={{
                   display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px',
                   background: finding.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                               finding.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
                               finding.type === 'info' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                   color: finding.type === 'error' ? '#ef4444' : 
                          finding.type === 'warning' ? '#f59e0b' :
                          finding.type === 'info' ? '#38bdf8' : '#10b981',
                   border: '1px solid currentColor'     
                }}>
                  <div style={{marginTop: '2px'}}>{finding.icon}</div>
                  <div style={{fontSize: '0.95rem', lineHeight: '1.4'}}>{finding.msg}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="code-block" style={{marginTop: '1.5rem'}}>
            <pre><code style={{color: '#c4b5fd'}}>{activeFile.content}</code></pre>
          </div>
        </div>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem'}}>
        <Calendar size={14} /> System Initialized on {new Date(project.created_at).toLocaleString()}
      </div>
    </div>
  );
}
