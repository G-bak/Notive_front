import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Home from './pages/Home';
import AiDocumentGeneration from './pages/AiDocumentGeneration';
import AiDocumentGenerationResult from './pages/AiDocumentGenerationResult';
import Search from './pages/Search';
import DocumentEditor from './pages/DocumentEditor';
import LandingPage from './pages/LandingPage';
import MyDocuments from './pages/MyDocuments';
import SettingsPage from './pages/Settings';
import KnowledgeTemplateHub from './pages/KnowledgeTemplateHub';

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
          <Route path="/documents" element={<MyDocuments scope="all" />} />
          <Route path="/documents/my" element={<MyDocuments scope="mine" />} />
          <Route path="/documents/shared" element={<MyDocuments scope="shared" />} />
          <Route path="/documents/favorites" element={<MyDocuments scope="favorites" />} />
          <Route path="/documents/trash" element={<MyDocuments scope="trash" />} />
          <Route path="/ai-document-generation" element={<AiDocumentGeneration />} />
          <Route path="/ai-document-generation/result" element={<AiDocumentGenerationResult />} />
          <Route path="/search" element={<Search />} />
          <Route path="/knowledge" element={<KnowledgeTemplateHub />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/documents/:documentId" element={<DocumentEditor />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
