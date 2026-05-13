import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Home from './pages/Home';
import AiDocumentGeneration from './pages/AiDocumentGeneration';
import Search from './pages/Search';
import DocumentEditor from './pages/DocumentEditor';
import LandingPage from './pages/LandingPage';
import MyDocuments from './pages/MyDocuments';

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/*" element={<AppShell />} />
    </Routes>
  );
}

function AppShell() {
  return (
    <div className="app-container">
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        <TopHeader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<MyDocuments />} />
          <Route path="/ai-document-generation" element={<AiDocumentGeneration />} />
          <Route path="/search" element={<Search />} />
          <Route path="/documents/:documentId" element={<DocumentEditor />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
