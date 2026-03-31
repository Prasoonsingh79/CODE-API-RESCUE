import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Upload, File as FileIcon } from 'lucide-react';

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  // Array of { filename: string, content: string }
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Modern File Upload mechanism reading file directly via browser FileReader
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFiles(prev => [
          ...prev, 
          { filename: file.name, content: event.target.result }
        ]);
      };
      reader.readAsText(file);
    });
    
    // reset input so the exact same file could be selected again if deleted
    e.target.value = null;
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      alert("⚠️ At least one source file must be mapped to deploy a codebase. Try dropping a Python or JavaScript file into the upload zone.");
      return;
    }
    
    setSubmitting(true);
    const payload = {
      ...formData,
      files: uploadedFiles
    };

    try {
      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const data = await response.json();
        navigate(`/project/${data._id}`);
      } else {
        alert('Failed to establish project protocol. Server rejected request.');
      }
    } catch (error) {
      console.error(error);
      alert('Network failure. Ensure the FastAPI backend is online.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div style={{maxWidth: '640px', margin: '0 auto'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 className="page-title">Deploy Resource</h1>
        <p className="page-subtitle">Upload multiple Code Files (.py, .js) for integrated platform analysis.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{padding: '2.5rem'}}>
        <div className="form-group">
          <label htmlFor="name">Project Designation (Name)</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g., Quantum Sorting Algorithm" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Executive Summary</label>
          <textarea id="description" name="description" required rows={3} value={formData.description} onChange={handleChange} placeholder="Document the purpose, inputs, and outputs of your solution..." />
        </div>

        {/* Feature 1 implementation: Drag and Drop Upload UI */}
        <div className="form-group">
          <label>Source Files (.py, .js, .json, .html, etc.)</label>
          <div style={{border: '2px dashed var(--border-color)', padding: '2rem', textAlign: 'center', borderRadius: '8px', cursor: 'pointer', position: 'relative', background: 'rgba(255,255,255,0.02)', transition: 'background 0.2s'}} onMouseOver={(e)=>e.currentTarget.style.background='rgba(99, 102, 241, 0.05)'} onMouseOut={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}>
            <Upload size={32} color="var(--primary)" style={{marginBottom: '1rem'}} />
            <p style={{color: 'var(--text-main)', fontWeight: '500'}}>Click to browse or drag & drop files here</p>
            <p style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem'}}>We support multi-file arrays.</p>
            <input 
              type="file" 
              multiple 
              onChange={handleFileUpload} 
              accept=".py,.js,.jsx,.ts,.tsx,.html,.css,.txt,.json,.md"
              style={{opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'pointer'}} 
            />
          </div>
          
          {uploadedFiles.length > 0 && (
            <div style={{marginTop: '1.5rem'}}>
              <h4 style={{marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Queued Files ({uploadedFiles.length}):</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                {uploadedFiles.map((f, i) => (
                  <li key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.5rem'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '500'}}>
                      <FileIcon size={18} color="var(--primary)"/> {f.filename}
                    </span>
                    <button type="button" onClick={() => removeFile(i)} style={{background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'}}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" className="btn" disabled={submitting} style={{width: '100%', justifyContent: 'center', marginTop: '1.5rem'}}>
          <Terminal size={18} /> {submitting ? 'Initializing Deployment...' : 'Deploy to CodeRescue System'}
        </button>
      </form>
    </div>
  );
}
