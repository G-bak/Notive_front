import { useState } from 'react';
import {
  Home, FileText, Share2, History, Star, Calendar, Users, Briefcase,
  CheckSquare, BookOpen, LayoutTemplate, Archive, Search,
  BarChart2, Settings, ChevronDown, Plus, Sparkles
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const [showUsage, setShowUsage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button
          type="button"
          className="sidebar-logo-button"
          onClick={() => navigate('/landing')}
          aria-label="Notive landing page"
        >
          <img src="/brand/notive-logo_medium.png" alt="Notive Logo" className="logo-img" />
        </button>
      </div>

      <div className="sidebar-new-btn-wrapper">
        <button className="btn-new-document">
          <div className="btn-new-main">
            <Plus size={16} strokeWidth={2.5} />
            <span>새 문서</span>
          </div>
          <div className="btn-new-split"></div>
          <div className="btn-new-icon">
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </button>
      </div>

      <nav className="sidebar-nav">
        {/* Main Links */}
        <div className="nav-group no-title">
          <div 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <Home size={18} />
            <span className="nav-label">홈</span>
          </div>
          <div
            className={`nav-item ${location.pathname === '/documents' ? 'active' : ''}`}
            onClick={() => navigate('/documents')}
            style={{ cursor: 'pointer' }}
          >
            <FileText size={18} />
            <span className="nav-label">내 문서</span>
          </div>
          <div className="nav-item">
            <Share2 size={18} />
            <span className="nav-label">공유 문서</span>
          </div>
          <div className="nav-item">
            <History size={18} />
            <span className="nav-label">최근 문서</span>
          </div>
          <div className="nav-item">
            <Star size={18} />
            <span className="nav-label">즐겨찾기</span>
          </div>
        </div>

        {/* Category: 업무 */}
        <div className="nav-group">
          <div className="nav-group-title">업무</div>
          <div className="nav-item">
            <Calendar size={18} />
            <span className="nav-label">업무 일지</span>
          </div>
          <div className="nav-item">
            <CheckSquare size={18} />
            <span className="nav-label">To-do</span>
          </div>
          <div className="nav-item">
            <Users size={18} />
            <span className="nav-label">회의</span>
          </div>
          <div className="nav-item">
            <Briefcase size={18} />
            <span className="nav-label">프로젝트</span>
          </div>
        </div>

        {/* Category: 지식 */}
        <div className="nav-group">
          <div className="nav-group-title">지식</div>
          <div className="nav-item">
            <BookOpen size={18} />
            <span className="nav-label">지식 문서함</span>
          </div>
          <div className="nav-item">
            <LayoutTemplate size={18} />
            <span className="nav-label">템플릿</span>
          </div>
          <div className="nav-item">
            <Archive size={18} />
            <span className="nav-label">회사 자료실</span>
          </div>
        </div>

        {/* Category: AI */}
        <div className="nav-group">
          <div className="nav-group-title">AI</div>
          <div 
            className={`nav-item ai-highlight ${location.pathname === '/ai-document-generation' ? 'active' : ''}`}
            onClick={() => navigate('/ai-document-generation')}
            style={{ cursor: 'pointer' }}
          >
            <Sparkles size={18} />
            <span className="nav-label">AI 문서 생성</span>
          </div>
          <div
            className={`nav-item ai-highlight ${location.pathname === '/search' ? 'active' : ''}`}
            onClick={() => navigate('/search')}
            style={{ cursor: 'pointer' }}
          >
            <Search size={18} />
            <span className="nav-label">AI 통합 검색</span>
          </div>
        </div>

        {/* Recent Docs List (from Image 3) */}
        <div className="nav-group recent-docs-group">
          <div className="nav-group-title">최근 문서</div>
          <div className="recent-doc-item" onClick={() => navigate('/documents/1')} style={{ cursor: 'pointer' }}>
            <FileText size={14} className="recent-icon" />
            <span className="recent-title">2024년 2분기 마케팅 성과 보고서</span>
            <span className="recent-time">2분 전</span>
          </div>
          <div className="recent-doc-item" onClick={() => navigate('/documents/1')} style={{ cursor: 'pointer' }}>
            <FileText size={14} className="recent-icon" />
            <span className="recent-title">신규 기능 제안서</span>
            <span className="recent-time">1시간 전</span>
          </div>
          <div className="recent-doc-item" onClick={() => navigate('/documents/1')} style={{ cursor: 'pointer' }}>
            <FileText size={14} className="recent-icon" />
            <span className="recent-title">A사 제안서 초안</span>
            <span className="recent-time">어제</span>
          </div>
          <div className="recent-doc-item" onClick={() => navigate('/documents/1')} style={{ cursor: 'pointer' }}>
            <FileText size={14} className="recent-icon" />
            <span className="recent-title">영업 전략 회의록</span>
            <span className="recent-time">어제</span>
          </div>
          <div className="recent-more">
            - 더 보기 -
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        {/* AI Usage Toggle */}
        <button
          className="ai-usage-toggle"
          onClick={() => setShowUsage(!showUsage)}
        >
          <BarChart2 size={14} />
          <span>AI 사용량 {showUsage ? '숨기기' : '보기'}</span>
        </button>

        {showUsage && (
          <div className="usage-card">
            <div className="usage-header">
              <div className="usage-title">AI 크레딧 <span className="usage-month">(이번 달)</span></div>
              <div className="usage-percent">75%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <div className="usage-stats">
              <span>750 / 1,000</span>
              <span>갱신: 06.01</span>
            </div>
          </div>
        )}

        {/* Company Profile (from Image 3) */}
        <div className="company-profile">
          <div className="company-info">
            <div className="company-icon">
              <Users size={16} />
            </div>
            <div className="company-text">
              <div className="company-name">ACME 주식회사</div>
              <div className="company-plan">Pro 플랜</div>
            </div>
          </div>
          <button className="settings-btn">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
