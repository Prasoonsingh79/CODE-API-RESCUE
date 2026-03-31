import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function CreateProject() {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Handle form submission to create a new project via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Redirect to the newly created project page
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

  // Generic handler for input changes
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div style={{maxWidth: '640px', margin: '0 auto'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 className="page-title">Deploy Resource</h1>
        <p className="page-subtitle">Share your code algorithm for analysis, peer-review, and community feedback.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{padding: '2.5rem'}}>
        <div className="form-group">
          <label htmlFor="name">Project Designation (Name)</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Quantum Sorting Algorithm"
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Executive Summary</label>
          <textarea 
            id="description" 
            name="description" 
            required 
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Document the purpose, inputs, and outputs of your solution..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="code">Core Implementation (Source Code)</label>
          <textarea 
            id="code" 
            name="code" 
            required 
            rows={12}
            style={{fontFamily: 'Consolas, monospace', fontSize: '0.9rem', lineHeight: '1.4'}}
            value={formData.code}
            onChange={handleChange}
            placeholder="Paste raw source code here..."
            spellCheck="false"
          />
        </div>

        <button type="submit" className="btn" disabled={submitting} style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}>
          <Terminal size={18} />
          {submitting ? 'Initializing Deployment...' : 'Deploy to CodeRescue'}
        </button>
      </form>
    </div>
  );
}
