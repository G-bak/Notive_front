import { useState } from 'react';
import {
  Archive,
  BarChart2,
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  ChevronDown,
  FileText,
  Files,
  Home,
  LayoutTemplate,
  Plus,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Users,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const [showUsage, setShowUsage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        <button className="btn-new-document" type="button">
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
        <div className="nav-group no-title">
          <button type="button" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
            <Home size={18} />
            <span className="nav-label">홈</span>
          </button>
          <button type="button" className={`nav-item ${isActive('/documents') ? 'active' : ''}`} onClick={() => navigate('/documents')}>
            <Files size={18} />
            <span className="nav-label">전체 문서</span>
          </button>
          <button type="button" className={`nav-item ${isActive('/documents/my') ? 'active' : ''}`} onClick={() => navigate('/documents/my')}>
            <FileText size={18} />
            <span className="nav-label">내 문서</span>
          </button>
          <button type="button" className={`nav-item ${isActive('/documents/shared') ? 'active' : ''}`} onClick={() => navigate('/documents/shared')}>
            <Share2 size={18} />
            <span className="nav-label">공유 문서</span>
          </button>
          <button type="button" className={`nav-item ${isActive('/documents/favorites') ? 'active' : ''}`} onClick={() => navigate('/documents/favorites')}>
            <Star size={18} />
            <span className="nav-label">즐겨찾기</span>
          </button>
          <button type="button" className={`nav-item ${isActive('/documents/trash') ? 'active' : ''}`} onClick={() => navigate('/documents/trash')}>
            <Trash2 size={18} />
            <span className="nav-label">휴지통</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">업무</div>
          <button type="button" className="nav-item">
            <Calendar size={18} />
            <span className="nav-label">업무 일지</span>
          </button>
          <button type="button" className="nav-item">
            <CheckSquare size={18} />
            <span className="nav-label">To-do</span>
          </button>
          <button type="button" className="nav-item">
            <Users size={18} />
            <span className="nav-label">회의록</span>
          </button>
          <button type="button" className="nav-item">
            <Briefcase size={18} />
            <span className="nav-label">프로젝트</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">지식</div>
          <button type="button" className={`nav-item ${isActive('/knowledge') ? 'active' : ''}`} onClick={() => navigate('/knowledge')}>
            <BookOpen size={18} />
            <span className="nav-label">지식 문서함</span>
          </button>
          <button type="button" className="nav-item">
            <LayoutTemplate size={18} />
            <span className="nav-label">템플릿</span>
          </button>
          <button type="button" className="nav-item">
            <Archive size={18} />
            <span className="nav-label">회사 자료실</span>
          </button>
          <button
            type="button"
            className={`nav-item ${isActive('/classification-rules') ? 'active' : ''}`}
            onClick={() => navigate('/classification-rules')}
          >
            <SlidersHorizontal size={18} />
            <span className="nav-label">분류 규칙</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">AI</div>
          <button
            type="button"
            className={`nav-item ai-highlight ${location.pathname.startsWith('/ai-document-generation') ? 'active' : ''}`}
            onClick={() => navigate('/ai-document-generation')}
          >
            <Sparkles size={18} />
            <span className="nav-label">AI 문서 생성</span>
          </button>
          <button
            type="button"
            className={`nav-item ai-highlight ${isActive('/search') ? 'active' : ''}`}
            onClick={() => navigate('/search')}
          >
            <Search size={18} />
            <span className="nav-label">AI 통합 검색</span>
          </button>
        </div>

        <div className="nav-group">
          <div className="nav-group-title">관리</div>
          <button type="button" className={`nav-item ${isActive('/settings') ? 'active' : ''}`} onClick={() => navigate('/settings')}>
            <Settings size={18} />
            <span className="nav-label">설정</span>
          </button>
        </div>

        <div className="nav-group recent-docs-group">
          <div className="nav-group-title">최근 문서</div>
          {[
            ['2024년 2분기 마케팅 성과 보고서', '2분 전'],
            ['신규 기능 제안서', '1시간 전'],
            ['A사 제안서 초안', '어제'],
            ['영업 전략 회의록', '어제'],
          ].map(([title, time]) => (
            <button key={title} type="button" className="recent-doc-item" onClick={() => navigate('/documents/1')}>
              <FileText size={14} className="recent-icon" />
              <span className="recent-title">{title}</span>
              <span className="recent-time">{time}</span>
            </button>
          ))}
          <div className="recent-more">- 더 보기 -</div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="ai-usage-toggle" type="button" onClick={() => setShowUsage(!showUsage)}>
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

        <div className="company-profile">
          <div className="company-info">
            <div className="company-icon">
              <Users size={16} />
            </div>
            <div className="company-text">
              <div className="company-name">ACME 컴퍼니</div>
              <div className="company-plan">Pro 플랜</div>
            </div>
          </div>
          <button className="settings-btn" type="button" onClick={() => navigate('/settings')} aria-label="설정">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
