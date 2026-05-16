import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Folder,
  FolderInput,
  Grid2x2,
  Info,
  List,
  MoreHorizontal,
  Plus,
  Share2,
  Star,
  Tag,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';

const tabs = ['전체', '내 문서', '공유 문서', '즐겨찾기', '휴지통'];

const filters = [
  { label: '폴더', value: '전체', options: ['전체', '마케팅', '데이터분석', '재무', '사업개발'] },
  { label: '문서 유형', value: '', options: ['전체', '문서', '스프레드시트', '프레젠테이션', 'PDF', '폴더'] },
  { label: '소유 팀', value: '', options: ['전체', '마케팅팀', '데이터분석팀', '재무팀', '사업개발팀', '전략기획팀'] },
  { label: '태그', value: '', options: ['전체', '전략', '성과', '예산', '리서치'] },
  { label: '접근 권한', value: '', options: ['전체', '편집 가능', '읽기 전용', '팀 제한'] },
  { label: '상태', value: '', options: ['전체', '최신', '검토 중', '보관됨'] },
  { label: '수정일', value: '', options: ['전체', '오늘', '최근 7일', '최근 30일', '직접 선택'] },
];

const documents = [
  {
    id: 1,
    type: 'docx',
    title: '2024 하반기 마케팅 전략 보고서',
    team: '마케팅팀',
    author: '김지연',
    updatedAt: '2024.05.16 10:35',
    path: '마케팅 > 전략 보고서 > 2024',
    access: { label: '편집 가능', tone: 'edit' },
    status: '최신',
    selected: true,
    starred: true,
  },
  {
    id: 2,
    type: 'docx',
    title: 'Q2 퍼포먼스 리뷰 및 인사이트',
    team: '데이터분석팀',
    author: '정민호',
    updatedAt: '2024.05.14 14:22',
    path: '데이터분석 > 퍼포먼스 리뷰 > Q2',
    access: { label: '읽기 전용', tone: 'view' },
    status: '최신',
    selected: true,
  },
  {
    id: 3,
    type: 'xlsx',
    title: '마케팅 예산 계획(2024H2)',
    team: '재무팀',
    author: '박재훈',
    updatedAt: '2024.05.13 16:18',
    path: '재무 > 예산 계획 > 2024H2',
    access: { label: '편집 가능', tone: 'edit' },
    status: '최신',
    selected: true,
  },
  {
    id: 4,
    type: 'pptx',
    title: '브랜드 캠페인 성과 요약',
    team: '마케팅팀',
    author: '최가영',
    updatedAt: '2024.05.10 09:40',
    path: '마케팅 > 캠페인 > 성과 요약',
    access: { label: '읽기 전용', tone: 'view' },
  },
  {
    id: 5,
    type: 'pdf',
    title: '신규 서비스 기획 제안서',
    team: '사업개발팀',
    author: '한수빈',
    updatedAt: '2024.05.09 11:05',
    path: '사업개발 > 신규 서비스 > 제안서',
    access: { label: '팀 제한', tone: 'team' },
  },
  {
    id: 6,
    type: 'docx',
    title: '고객 리서치 결과 분석',
    team: '마케팅팀',
    author: '이유진',
    updatedAt: '2024.05.08 17:30',
    path: '마케팅 > 리서치 > 고객 분석',
    access: { label: '읽기 전용', tone: 'view' },
  },
  {
    id: 7,
    type: 'xlsx',
    title: '마케팅 KPI 대시보드(4월)',
    team: '데이터분석팀',
    author: '정민호',
    updatedAt: '2024.05.07 13:12',
    path: '데이터분석 > KPI > 대시보드',
    access: { label: '편집 가능', tone: 'edit' },
  },
  {
    id: 8,
    type: 'folder',
    title: '레퍼런스 자료 모음',
    team: '마케팅팀',
    author: '김지연',
    updatedAt: '2024.05.06 10:20',
    path: '마케팅 > 자료실',
    access: { label: '팀 제한', tone: 'team' },
  },
  {
    id: 9,
    type: 'folder',
    title: '이전 캠페인 아카이브',
    team: '마케팅팀',
    author: '김지연',
    updatedAt: '2024.05.01 09:15',
    path: '마케팅 > 아카이브 > 이전 캠페인',
    access: { label: '읽기 전용', tone: 'view' },
  },
  {
    id: 10,
    type: 'pdf',
    title: '경쟁사 분석 리포트',
    team: '전략기획팀',
    author: '한수빈',
    updatedAt: '2024.04.30 16:50',
    path: '전략기획 > 시장 분석 > 경쟁사',
    access: { label: '읽기 전용', tone: 'view' },
  },
];

function DocumentTypeIcon({ type }) {
  if (type === 'folder') {
    return (
      <span className="my-documents-folder-icon" aria-hidden="true">
        <Folder size={18} fill="currentColor" />
      </span>
    );
  }

  return (
    <img
      className="my-documents-type-icon"
      src={`/document-icons/ref-icon-${type}.png`}
      alt=""
      aria-hidden="true"
    />
  );
}

function SelectionBar({ selectedCount, onClearSelection }) {
  const actions = [
    { label: '다운로드', Icon: Download },
    { label: '이동', Icon: FolderInput },
    { label: '복사', Icon: Copy },
    { label: '공유', Icon: Share2 },
    { label: '태그', Icon: Tag },
    { label: '접근 권한 변경', Icon: Users },
    { label: '삭제', Icon: Trash2, danger: true },
  ];

  return (
    <div className="my-documents-selection-bar">
      <label className="my-documents-check">
        <input
          type="checkbox"
          checked={selectedCount > 0}
          aria-label="선택된 문서 해제"
          onChange={onClearSelection}
        />
      </label>
      <span className="my-documents-selected-count">{selectedCount}개 선택됨</span>
      <div className="my-documents-selection-actions">
        {actions.map(({ label, Icon, danger }) => (
          <button key={label} type="button" className={danger ? 'is-danger' : ''}>
            <Icon size={14} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button type="button" className="my-documents-selection-close" aria-label="선택 해제" onClick={onClearSelection}>
        <X size={15} />
      </button>
    </div>
  );
}

function FilterSelect({ filter, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (filterRef.current?.contains(event.target)) return;
      setIsOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.document.addEventListener('pointerdown', handlePointerDown);
    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.removeEventListener('pointerdown', handlePointerDown);
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option === '전체' && filter.label !== '폴더' ? '' : option);
    setIsOpen(false);
  };

  return (
    <div className="my-documents-filter-select-wrap" ref={filterRef}>
      <button
        type="button"
        className={`my-documents-filter-chip my-documents-filter-select${isOpen ? ' is-active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{filter.label}</span>
        {value && <strong>{value}</strong>}
        <ChevronDown size={13} />
      </button>
      {isOpen && (
        <div className="my-documents-filter-select-menu" role="listbox" aria-label={filter.label}>
          {filter.options.map((option) => {
            const isSelected = value === option || (!value && option === '전체' && filter.label !== '폴더');
            return (
              <button
                key={option}
                type="button"
                className={isSelected ? 'is-selected' : ''}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DocumentRow({ document, isSelected, onToggleSelected }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionCellRef = useRef(null);

  const rowActions = [
    { label: '열기', Icon: Info },
    { label: '공유', Icon: Share2 },
    { label: '이동', Icon: FolderInput },
    { label: '복사', Icon: Copy },
    { label: '태그 관리', Icon: Tag },
    { label: '삭제', Icon: Trash2, danger: true },
  ];

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (actionCellRef.current?.contains(event.target)) return;
      setIsMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.document.addEventListener('pointerdown', handlePointerDown);
    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.removeEventListener('pointerdown', handlePointerDown);
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <article className={`my-documents-row${isSelected ? ' is-selected' : ''}`}>
      <label className="my-documents-check">
        <input
          type="checkbox"
          checked={isSelected}
          aria-label={`${document.title} 선택`}
          onChange={() => onToggleSelected(document.id)}
        />
      </label>

      <div className="my-documents-title-cell">
        <DocumentTypeIcon type={document.type} />
        <button
          type="button"
          className={`my-documents-star${document.starred ? ' is-active' : ''}`}
          aria-label={`${document.title} 즐겨찾기`}
        >
          <Star size={13} fill={document.starred ? 'currentColor' : 'none'} />
        </button>
        <div className="my-documents-title-wrap">
          <span className="my-documents-row-title">{document.title}</span>
          <span className="my-documents-row-path">{document.path}</span>
        </div>
      </div>

      <span className="my-documents-muted-cell">{document.team}</span>
      <span className="my-documents-muted-cell">{document.author}</span>
      <span className="my-documents-date-cell">{document.updatedAt}</span>
      <span className={`my-documents-access-badge tone-${document.access.tone}`}>
        <Users size={12} />
        {document.access.label}
      </span>
      <span className={document.status ? 'my-documents-status-badge' : 'my-documents-empty-status'}>
        {document.status || ''}
      </span>
      <div className="my-documents-action-cell" ref={actionCellRef}>
        <button
          type="button"
          className={`my-documents-more-button${isMenuOpen ? ' is-active' : ''}`}
          aria-label={`${document.title} 더보기`}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <MoreHorizontal size={17} />
        </button>
        {isMenuOpen && (
          <div className="my-documents-row-menu" role="menu">
            {rowActions.map(({ label, Icon, danger }) => (
              <button key={label} type="button" className={danger ? 'is-danger' : ''} role="menuitem">
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function DocumentTable({ selectedIds, onToggleSelected, onToggleAll }) {
  const selectedIdSet = new Set(selectedIds);
  const allSelected = documents.length > 0 && selectedIds.length === documents.length;

  return (
    <section className="my-documents-table" aria-label="문서 목록">
      <div className="my-documents-table-head">
        <label className="my-documents-check">
          <input
            type="checkbox"
            checked={allSelected}
            aria-label="전체 문서 선택"
            onChange={onToggleAll}
          />
        </label>
        <span>제목</span>
        <span>소유 팀</span>
        <span>작성자</span>
        <button type="button" className="my-documents-sort">
          수정일
          <ArrowDown size={12} />
        </button>
        <span>접근 권한</span>
        <span>상태</span>
        <span className="my-documents-head-more">작업</span>
      </div>

      <div className="my-documents-table-body">
        {documents.map((document) => (
          <DocumentRow
            key={document.id}
            document={document}
            isSelected={selectedIdSet.has(document.id)}
            onToggleSelected={onToggleSelected}
          />
        ))}
      </div>
    </section>
  );
}

function DocumentsPagination() {
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const pageSizeRef = useRef(null);
  const pageSizeOptions = [10, 20, 50, 100];

  useEffect(() => {
    if (!isPageSizeOpen) return undefined;

    const handlePointerDown = (event) => {
      if (pageSizeRef.current?.contains(event.target)) return;
      setIsPageSizeOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPageSizeOpen(false);
      }
    };

    window.document.addEventListener('pointerdown', handlePointerDown);
    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.removeEventListener('pointerdown', handlePointerDown);
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPageSizeOpen]);

  return (
    <footer className="my-documents-pagination">
      <div className="my-documents-total">전체 238개</div>
      <nav className="my-documents-page-nav" aria-label="문서 목록 페이지네이션">
        <button type="button" className="page-arrow" aria-label="이전 페이지">
          <ChevronLeft size={15} />
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button key={page} type="button" className={page === 1 ? 'active' : ''}>
            {page}
          </button>
        ))}
        <span>...</span>
        <button type="button">12</button>
        <button type="button" className="page-arrow" aria-label="다음 페이지">
          <ChevronRight size={15} />
        </button>
      </nav>
      <div className="my-documents-page-size-wrap" ref={pageSizeRef}>
        <button
          type="button"
          className={`my-documents-page-size${isPageSizeOpen ? ' is-active' : ''}`}
          aria-expanded={isPageSizeOpen}
          onClick={() => setIsPageSizeOpen((open) => !open)}
        >
          {pageSize}개씩 보기
          <ChevronDown size={13} />
        </button>
        {isPageSizeOpen && (
          <div className="my-documents-page-size-menu" role="menu">
            {pageSizeOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={option === pageSize ? 'is-selected' : ''}
                role="menuitem"
                onClick={() => {
                  setPageSize(option);
                  setIsPageSizeOpen(false);
                }}
              >
                {option}개씩 보기
              </button>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

function MyDocuments() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterValues, setFilterValues] = useState(() => (
    Object.fromEntries(filters.map((filter) => [filter.label, filter.value]))
  ));

  const handleToggleSelected = (documentId) => {
    setSelectedIds((current) => (
      current.includes(documentId)
        ? current.filter((id) => id !== documentId)
        : [...current, documentId]
    ));
  };

  const handleToggleAll = () => {
    setSelectedIds((current) => (
      current.length === documents.length ? [] : documents.map((document) => document.id)
    ));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="page-content my-documents-page">
      <div className="my-documents-top">
        <div className="my-documents-title-row">
          <div className="my-documents-heading">
            <h1 className="page-title">문서</h1>
            <span className="my-documents-count">전체 238개</span>
          </div>

          <div className="my-documents-actions">
            <button type="button" className="btn-new-document my-documents-new-button">
              <div className="btn-new-main">
                <Plus size={16} strokeWidth={2.5} />
                <span>새 문서</span>
              </div>
              <div className="btn-new-split"></div>
              <div className="btn-new-icon">
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </button>

            <button type="button" className="my-documents-outline-button">
              <Upload size={15} />
              <span>업로드</span>
            </button>

            <div className="my-documents-view-tools" aria-label="문서 보기 도구">
              <button type="button" className="active" aria-label="목록 보기">
                <List size={17} />
              </button>
              <button type="button" aria-label="카드 보기">
                <Grid2x2 size={17} />
              </button>
              <button type="button" aria-label="복사 보기">
                <Copy size={16} />
              </button>
              <button type="button" aria-label="문서 정보">
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>

        <nav className="my-documents-tabs" aria-label="문서 분류">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={index === 0 ? 'active' : ''}>
              {tab}
            </button>
          ))}
        </nav>

        <div className="my-documents-filter-row" aria-label="문서 필터">
          {filters.map((filter) => (
            <FilterSelect
              key={filter.label}
              filter={filter}
              value={filterValues[filter.label]}
              onChange={(nextValue) => {
                setFilterValues((current) => ({
                  ...current,
                  [filter.label]: nextValue,
                }));
              }}
            />
          ))}
          <button type="button" className="my-documents-filter-add">
            <Plus size={13} />
            <span>필터 추가</span>
          </button>
        </div>
      </div>

      <section className="my-documents-content" aria-label="문서 콘텐츠">
        {selectedIds.length > 0 && (
          <SelectionBar
            selectedCount={selectedIds.length}
            onClearSelection={handleClearSelection}
          />
        )}
        <DocumentTable
          selectedIds={selectedIds}
          onToggleSelected={handleToggleSelected}
          onToggleAll={handleToggleAll}
        />
      </section>
      <DocumentsPagination />
    </div>
  );
}

export default MyDocuments;
