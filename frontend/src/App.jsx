import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import { Code2 } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <Link to="/" className="logo">
            <Code2 size={28} color="#6366f1" />
            CodeRescue
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Explore</Link>
            <Link to="/create" className="btn">Deploy Code</Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
