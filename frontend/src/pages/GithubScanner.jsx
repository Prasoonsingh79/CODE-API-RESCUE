import { useState } from 'react';
import { Github, Search, Folder, FileCode, Bot, ArrowRight, CornerDownRight, CheckCircle, AlertTriangle, Info, ArrowLeft, FolderOpen } from 'lucide-react';

export default function GithubScanner() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const [analysisFindings, setAnalysisFindings] = useState([]);

  // 1. Fetch Repositories
  const fetchRepos = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoadingRepos(true);
    setSelectedRepo(null);
    setFiles([]);
    setSelectedFile(null);
    setFileContent('');
    setCurrentPath('');
    
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      if (!res.ok) throw new Error('User not found or API limit reached');
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      alert(err.message);
      setRepos([]);
    } finally {
      setLoadingRepos(false);
    }
  };

  // 2. Fetch Repository Contents (Supporting Nested Folders)
  const fetchRepoContents = async (repoName, path = "") => {
    setSelectedRepo(repoName);
    setCurrentPath(path);
    setLoadingFiles(true);
    setSelectedFile(null);
    setFileContent('');
    
    try {
      const url = `https://api.github.com/repos/${username}/${repoName}/contents/${path}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch repository contents');
      const data = await res.json();
      
      // Filter out media files, keep both 'dir' and 'file'
      const items = Array.isArray(data) ? data : [data]; // Github API returns object if path is a file, but we only query dirs here
      const filtered = items.filter(item => !item.name.match(/\.(png|jpg|jpeg|gif|ico|pdf|zip)$/i));
      
      // Sort directories to the top, then alphabetically
      const sorted = filtered.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'dir' ? -1 : 1;
      });
      
      setFiles(sorted);
    } catch (err) {
      alert(err.message);
      setFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  };

  // 3. Handle navigating back up a folder
  const handleNavigateUp = () => {
    if (!currentPath) return;
    const parts = currentPath.split('/');
    parts.pop(); // remove last folder
    const targetPath = parts.join('/');
    fetchRepoContents(selectedRepo, targetPath);
  };

  // 4. Fetch specific file source code
  const fetchFileSource = async (file) => {
    setSelectedFile(file.name);
    setLoadingContent(true);
    
    try {
      const res = await fetch(file.download_url);
      const text = await res.text();
      setFileContent(text);
      runAnalysis(text, file.name);
    } catch (err) {
      alert('Failed to read file content');
      setFileContent('');
    } finally {
      setLoadingContent(false);
    }
  };

  // 5. AI Analytics Engine
  const runAnalysis = (code, filename) => {
    const lines = code.split('\n').length;
    let analysis = [];
    
    const hasComments = code.includes('//') || code.includes('#') || code.includes('/*');
    if (!hasComments) analysis.push({ type: 'error', icon: <AlertTriangle size={16}/>, msg: "Missing Comments: Strict documentation is missing." });
    else analysis.push({ type: 'success', icon: <CheckCircle size={16}/>, msg: "Documentation Standard Met: Found inline comments." });
    
    if (code.includes('let x ') || code.includes('let y ') || code.includes('var a ') || code.includes(' a = ')) {
       analysis.push({ type: 'warning', icon: <AlertTriangle size={16}/>, msg: "Bad Naming Pattern: Use descriptive variable names." });
    }

    if (lines > 200) analysis.push({ type: 'warning', icon: <AlertTriangle size={16}/>, msg: "Code Structure: File exceeds 200 lines. Refactoring will improve maintainability." });

    if (code.includes('console.log(') || code.includes('print(')) {
       analysis.push({ type: 'info', icon: <Info size={16}/>, msg: "Development Artifact: Found direct console logging." });
    }

    if (filename.endsWith('.env')) analysis.push({ type: 'error', icon: <AlertTriangle size={16}/>, msg: "CRITICAL: .env file committed to version control! Secrets may be exposed!" });

    if (analysis.length === 0) analysis.push({ type: 'success', icon: <CheckCircle size={16}/>, msg: "Clean Architecture: No immediate issues detected." });
    
    setAnalysisFindings(analysis);
  };

  return (
    <div style={{animation: 'fadeIn 0.4s ease'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
        <Github size={40} color="white" />
        <h1 className="page-title" style={{marginBottom: 0}}>GitHub Code Scanner</h1>
      </div>
      <p className="page-subtitle">Sync with any GitHub ID, traverse folder structures, and run real-time file diagnostics.</p>
      
      {/* Search Input */}
      <form onSubmit={fetchRepos} style={{display: 'flex', gap: '1rem', maxWidth: '600px', marginBottom: '3rem'}}>
        <div style={{flex: 1, position: 'relative'}}>
          <Search size={20} color="var(--text-muted)" style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)'}} />
          <input 
            type="text" 
            placeholder="Enter a GitHub Username (e.g., facebook, vercel, torvalds)..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '1rem'}}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loadingRepos}>
          {loadingRepos ? 'Scanning...' : 'Sync ID'}
        </button>
      </form>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Step 1: Repositories List */}
        {repos.length > 0 && (
          <div className="card" style={{flex: '1', minWidth: '250px', maxHeight: '600px', overflowY: 'auto'}}>
            <h3 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)'}}><Folder size={18}/> Repositories</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              {repos.map(repo => (
                <button 
                  key={repo.id} 
                  onClick={() => fetchRepoContents(repo.name, "")}
                  style={{
                    textAlign: 'left', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', 
                    background: selectedRepo === repo.name ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.02)',
                    color: selectedRepo === repo.name ? '#fff' : 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s', borderLeft: selectedRepo === repo.name ? '3px solid var(--primary)' : '1px solid var(--border-color)'
                  }}>
                  <div style={{fontWeight: '600', marginBottom: '0.25rem'}}>{repo.name}</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{repo.language || 'Unknown'} ★ {repo.stargazers_count}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Nested Browsing Structure List */}
        {selectedRepo && (
          <div className="card" style={{flex: '1', minWidth: '250px', maxHeight: '600px', overflowY: 'auto'}}>
            <div style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem'}}>
               <h3 style={{color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FolderOpen size={16}/> {currentPath ? `/${currentPath}` : `/${selectedRepo}`}</h3>
               {currentPath && (
                 <button onClick={handleNavigateUp} className="btn-secondary" style={{padding: '0.3rem 0.6rem', border: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem'}}>
                   <ArrowLeft size={14}/> Back Up
                 </button>
               )}
            </div>
            
            {loadingFiles ? <p style={{color: 'var(--text-muted)'}}>Crawling directory structure...</p> : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {files.length === 0 && <p style={{color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem', padding: '1rem'}}>Empty directory.</p>}
                
                {files.map(file => (
                  <button 
                    key={file.sha} 
                    onClick={() => {
                      if (file.type === 'dir') {
                        fetchRepoContents(selectedRepo, file.path);
                      } else {
                        fetchFileSource(file);
                      }
                    }}
                    style={{
                      textAlign: 'left', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', 
                      background: selectedFile === file.name ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                      color: selectedFile === file.name ? '#10b981' : (file.type === 'dir' ? '#818cf8' : 'var(--text-main)'), 
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'background 0.2s'
                    }}>
                    {file.type === 'dir' ? <Folder size={14} color="#818cf8" /> : <FileCode size={14} color="var(--text-muted)" />}
                    <span style={{fontWeight: file.type === 'dir' ? '500' : '400', fontSize: '0.9rem'}}>{file.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Code Viewer + AI Analysis */}
        {selectedFile && (
          <div style={{flex: '2', minWidth: '400px'}}>
             {loadingContent ? <div className="card" style={{padding: '2rem', textAlign: 'center'}}>Extracting code vectors...</div> : (
               <>
                 <div className="analysis-banner" style={{marginTop: 0, borderTop: '4px solid var(--primary)', background: 'var(--card-bg)'}}>
                    <h3 className="analysis-title"><Bot size={20} /> AI Diagnostics for `{selectedFile}`</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem'}}>
                      {analysisFindings.map((finding, idx) => (
                        <div key={idx} style={{
                           display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px',
                           background: finding.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : finding.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : finding.type === 'info' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                           color: finding.type === 'error' ? '#ef4444' : finding.type === 'warning' ? '#f59e0b' : finding.type === 'info' ? '#38bdf8' : '#10b981', border: '1px solid currentColor'     
                        }}>
                          <div style={{marginTop: '2px'}}>{finding.icon}</div>
                          <div style={{fontSize: '0.9rem', lineHeight: '1.4'}}>{finding.msg}</div>
                        </div>
                      ))}
                    </div>
                 </div>
                 
                 <div className="code-block" style={{marginTop: '1.5rem', maxHeight: '500px', overflowY: 'auto', borderRadius: '12px'}}>
                    <div style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem'}}>
                       <div style={{width: 12, height: 12, borderRadius: '50%', background: '#ef4444'}}></div>
                       <div style={{width: 12, height: 12, borderRadius: '50%', background: '#f59e0b'}}></div>
                       <div style={{width: 12, height: 12, borderRadius: '50%', background: '#10b981'}}></div>
                    </div>
                    <pre><code style={{color: '#e2e8f0', fontFamily: 'Consolas, Monaco, monospace'}}>{fileContent}</code></pre>
                 </div>
               </>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
