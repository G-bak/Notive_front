import React from 'react';
import {
  Search as SearchIcon, HelpCircle, Bell, ChevronDown, ListFilter, Bookmark, X,
  Undo2, Redo2, MessageSquareText, Eye, History, MoreHorizontal, Check, Share2
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

function TopHeader() {
  const location = useLocation();
  const isSearch = location.pathname === '/search';
  const isEditor = location.pathname.startsWith('/documents/');

  if (isEditor) {
    return (
      <header className="top-header top-header--editor">
        <div className="editor-header-left">
          <div className="editor-search-box">
            <SearchIcon size={15} className="editor-search-icon" />
            <input
              type="text"
              className="editor-search-input"
              placeholder="문서, 폴더, 태그 검색"
            />
            <button type="button" className="editor-search-clear" aria-label="지우기">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="editor-header-right">
          <div className="editor-save-status">
            <span className="editor-save-check">
              <Check size={10} strokeWidth={2.8} />
            </span>
            <span>저장됨 · 2분 전</span>
          </div>

          <div className="editor-actions">
            <button type="button" className="editor-icon-btn" aria-label="실행 취소">
              <Undo2 size={16} />
            </button>
            <button type="button" className="editor-icon-btn" aria-label="다시 실행">
              <Redo2 size={16} />
            </button>
            <button type="button" className="editor-icon-btn" aria-label="댓글">
              <MessageSquareText size={16} />
            </button>

            <div className="editor-action-divider" />

            <button type="button" className="editor-outline-btn">
              <Eye size={14} />
              <span>미리보기</span>
            </button>
            <button type="button" className="editor-outline-btn">
              <History size={14} />
              <span>버전 기록</span>
            </button>
            <button type="button" className="editor-primary-btn">
              <Share2 size={14} />
              <span>공유</span>
            </button>
            <button type="button" className="editor-icon-btn" aria-label="더보기">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`top-header ${isSearch ? 'top-header--search' : ''}`}>
      {isSearch ? (
        <div className="header-search-wrap">
          <div className="header-search-box">
            <SearchIcon size={16} className="header-search-icon" />
            <input
              type="text"
              className="header-search-input"
              defaultValue="2024년 하반기 마케팅 전략 보고서"
            />
            <button type="button" className="header-search-clear" aria-label="지우기">
              <X size={16} />
            </button>
          </div>
          <button type="button" className="header-search-action">
            <ListFilter size={18} strokeWidth={2} />
            <span>필터</span>
          </button>
          <button type="button" className="header-search-action">
            <Bookmark size={18} strokeWidth={2} />
            <span>저장된 검색</span>
          </button>
        </div>
      ) : (
        <div className="header-left">
          {/* Blank or Breadcrumbs could go here, per user design focus is on right */}
        </div>
      )}

      <div className="header-actions">
        {!isSearch && (
          <button className="icon-btn">
            <SearchIcon size={20} />
          </button>
        )}
        <button className="icon-btn">
          <HelpCircle size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
          <div className="badge">{isSearch ? 12 : 7}</div>
        </button>

        <div className="header-divider"></div>

        {/* Detailed User Profile (from Image 2 & 4 feedback) */}
        <div className="user-profile">
          <div className="avatar">
            <span className="avatar-text">김</span>
          </div>
          <div className="user-details">
            <span className="user-name">김지연</span>
            <span className="user-dept">마케팅팀</span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" className="profile-chevron" />
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
