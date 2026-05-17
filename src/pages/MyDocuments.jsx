import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  RotateCcw,
  Share2,
  Star,
  Tag,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';

const tabs = ['전체', '내 문서', '공유 문서', '즐겨찾기', '휴지통'];
const tabRoutes = [
  '/documents',
  '/documents/my',
  '/documents/shared',
  '/documents/favorites',
  '/documents/trash',
];

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
    status: '공유됨',
    starred: true,
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
    status: '공유됨',
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
    status: '최신',
    starred: true,
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
    status: '공유됨',
  },
];

const myDocumentIds = new Set([1, 8, 9]);
const sharedDocumentIds = new Set([2, 4, 5, 10]);

const trashDocuments = [
  {
    id: 101,
    type: 'docx',
    title: '2023 캠페인 회고 초안',
    team: '마케팅팀',
    author: '김지연',
    updatedAt: '2024.04.28 15:10',
    path: '마케팅 > 캠페인 > 보관',
    access: { label: '편집 가능', tone: 'edit' },
    status: '삭제됨',
  },
  {
    id: 102,
    type: 'xlsx',
    title: '구버전 KPI 집계표',
    team: '데이터분석팀',
    author: '정민호',
    updatedAt: '2024.04.25 11:40',
    path: '데이터분석 > KPI > 이전 버전',
    access: { label: '읽기 전용', tone: 'view' },
    status: '삭제됨',
  },
];

const standardRowActions = [
  { label: '열기', Icon: Info },
  { label: '공유', Icon: Share2 },
  { label: '이동', Icon: FolderInput },
  { label: '복사', Icon: Copy },
  { label: '태그 관리', Icon: Tag },
  { label: '삭제', Icon: Trash2, danger: true },
];

const sharedRowActions = [
  { label: '열기', Icon: Info },
  { label: '공유 정보', Icon: Share2 },
  { label: '내 문서로 복사', Icon: Copy },
  { label: '즐겨찾기 추가', Icon: Star },
];

const favoriteRowActions = [
  { label: '열기', Icon: Info },
  { label: '즐겨찾기 해제', Icon: Star },
  { label: '공유', Icon: Share2 },
  { label: '이동', Icon: FolderInput },
  { label: '삭제', Icon: Trash2, danger: true },
];

const trashRowActions = [
  { label: '복원', Icon: RotateCcw },
  { label: '위치 보기', Icon: Folder },
  { label: '영구 삭제', Icon: Trash2, danger: true },
];

const sharedSelectionActions = [
  { label: '다운로드', Icon: Download },
  { label: '내 문서로 복사', Icon: Copy },
  { label: '공유 정보', Icon: Share2 },
  { label: '즐겨찾기 추가', Icon: Star },
];

const favoriteSelectionActions = [
  { label: '다운로드', Icon: Download },
  { label: '즐겨찾기 해제', Icon: Star },
  { label: '공유', Icon: Share2 },
  { label: '이동', Icon: FolderInput },
  { label: '삭제', Icon: Trash2, danger: true },
];

const trashSelectionActions = [
  { label: '복원', Icon: RotateCcw },
  { label: '영구 삭제', Icon: Trash2, danger: true },
];

const defaultSelectionActions = [
  { label: '다운로드', Icon: Download },
  { label: '이동', Icon: FolderInput },
  { label: '복사', Icon: Copy },
  { label: '공유', Icon: Share2 },
  { label: '태그', Icon: Tag },
  { label: '접근 권한 변경', Icon: Users },
  { label: '삭제', Icon: Trash2, danger: true },
];

const documentScopeConfig = {
  all: {
    title: '전체 문서',
    countLabel: '전체',
    tabIndex: 0,
    description: '워크스페이스에서 접근 가능한 모든 문서를 한 곳에서 관리합니다.',
    dateLabel: '수정일',
    rowActions: standardRowActions,
    selectionActions: defaultSelectionActions,
    headerActions: [
      { label: '새 문서', Icon: Plus, variant: 'primary', split: true },
      { label: '업로드', Icon: Upload },
    ],
    emptyState: {
      title: '문서가 없습니다',
      description: '새 문서를 만들거나 파일을 업로드하면 이곳에 표시됩니다.',
    },
    getDocuments: () => documents,
  },
  mine: {
    title: '내 문서',
    countLabel: '내 문서',
    tabIndex: 1,
    description: '내가 만들었거나 소유한 문서를 관리합니다.',
    dateLabel: '수정일',
    rowActions: standardRowActions,
    selectionActions: defaultSelectionActions,
    headerActions: [
      { label: '새 문서', Icon: Plus, variant: 'primary', split: true },
      { label: '업로드', Icon: Upload },
    ],
    emptyState: {
      title: '내 문서가 없습니다',
      description: '직접 만든 문서가 생기면 이곳에 모입니다.',
    },
    getDocuments: () => documents.filter((document) => myDocumentIds.has(document.id)),
  },
  shared: {
    title: '공유 문서',
    countLabel: '공유 문서',
    tabIndex: 2,
    description: '다른 팀이나 사용자가 나에게 공유한 문서를 확인합니다.',
    dateLabel: '공유/수정일',
    rowActions: sharedRowActions,
    selectionActions: sharedSelectionActions,
    headerActions: [
      { label: '공유 링크 관리', Icon: Share2 },
      { label: '내 문서로 복사', Icon: Copy },
    ],
    emptyState: {
      title: '공유받은 문서가 없습니다',
      description: '공유된 문서가 생기면 권한과 함께 이곳에 표시됩니다.',
    },
    getDocuments: () => documents.filter((document) => sharedDocumentIds.has(document.id)),
  },
  favorites: {
    title: '즐겨찾기',
    countLabel: '즐겨찾기',
    tabIndex: 3,
    description: '자주 여는 문서를 빠르게 다시 찾을 수 있습니다.',
    dateLabel: '수정일',
    rowActions: favoriteRowActions,
    selectionActions: favoriteSelectionActions,
    headerActions: [
      { label: '즐겨찾기 관리', Icon: Star },
      { label: '다운로드', Icon: Download },
    ],
    emptyState: {
      title: '즐겨찾기한 문서가 없습니다',
      description: '문서의 별 아이콘을 누르면 이 목록에 추가됩니다.',
    },
    getDocuments: () => documents.filter((document) => document.starred),
  },
  trash: {
    title: '휴지통',
    countLabel: '휴지통',
    tabIndex: 4,
    description: '삭제한 문서를 복원하거나 영구 삭제합니다.',
    dateLabel: '삭제일',
    rowActions: trashRowActions,
    selectionActions: trashSelectionActions,
    headerActions: [
      { label: '선택 항목 복원', Icon: RotateCcw },
      { label: '휴지통 비우기', Icon: Trash2, danger: true },
    ],
    emptyState: {
      title: '휴지통이 비어 있습니다',
      description: '삭제한 문서가 있으면 이곳에서 복원할 수 있습니다.',
    },
    getDocuments: () => trashDocuments,
  },
};

const documentInfo = {
  title: '2024 하반기 마케팅 전략 보고서',
  badges: [
    { label: '민감 정보 포함', tone: 'danger' },
    { label: '최신 버전', tone: 'success' },
  ],
  basics: [
    ['문서 유형', '보고서'],
    ['소유 팀', '마케팅팀'],
    ['작성자', '김지연'],
    ['생성일', '2024.04.20 09:12'],
    ['수정일', '2024.05.16 10:35'],
    ['버전', 'v1.3'],
  ],
  tags: ['마케팅', '전략', '성과', '하반기'],
  shares: [
    { label: 'ACME 주식회사 전체', permission: '편집 가능' },
    { label: '마케팅팀', permission: '편집 가능' },
    { label: '외부 (2)', permission: '읽기 전용' },
  ],
  references: [
    { type: 'docx', title: '2024 하반기 마케팅 전략 회의록', category: '회의록' },
    { type: 'xlsx', title: '마케팅 캠페인 성과 데이터', category: '데이터' },
    { type: 'pptx', title: '브랜드 캠페인 성과 요약', category: '발표자료' },
  ],
  aiInfo: [
    ['생성 일시', '2024.05.16 10:35'],
    ['생성자', 'Notive AI'],
    ['참고 컨텍스트', '회의록 3개, 보고서 12개, 데이터 2개'],
  ],
  versions: [
    {
      v: 'v1.3',
      label: '최신',
      author: '김지연',
      team: '마케팅팀',
      updatedAt: '2024.05.16 10:35',
      summary: '요약 문구 및 KPI 업데이트',
      current: true,
    },
    {
      v: 'v1.2',
      label: '성과 데이터 최신화',
      author: '정민호',
      team: '데이터분석팀',
      updatedAt: '2024.05.14 09:20',
      summary: '성과 데이터 최신화',
    },
    {
      v: 'v1.1',
      label: '캠페인 전략 보완',
      author: '최가영',
      team: '마케팅팀',
      updatedAt: '2024.05.10 11:05',
      summary: '브랜드 캠페인 실행안 보완',
    },
  ],
};

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

function SelectionBar({ selectedCount, onClearSelection, actions = defaultSelectionActions }) {
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

function DocumentRow({ document, isSelected, onToggleSelected, rowActions }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionCellRef = useRef(null);

  const actions = rowActions ?? [
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
            {actions.map(({ label, Icon, danger }) => (
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

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'end-ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'start-ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'start-ellipsis', currentPage - 1, currentPage, currentPage + 1, 'end-ellipsis', totalPages];
}

function DocumentTable({
  rows,
  selectedIds,
  onToggleSelected,
  onToggleAll,
  dateLabel = '수정일',
  rowActions,
  emptyState,
}) {
  const selectedIdSet = new Set(selectedIds);
  const allSelected = rows.length > 0 && rows.every((document) => selectedIdSet.has(document.id));

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
          {dateLabel}
          <ArrowDown size={12} />
        </button>
        <span>접근 권한</span>
        <span>상태</span>
        <span className="my-documents-head-more">작업</span>
      </div>

      <div className="my-documents-table-body">
        {rows.map((document) => (
          <DocumentRow
            key={document.id}
            document={document}
            isSelected={selectedIdSet.has(document.id)}
            onToggleSelected={onToggleSelected}
            rowActions={rowActions}
          />
        ))}
        {rows.length === 0 && (
          <div className="my-documents-empty-list">
            <Folder size={24} />
            <strong>{emptyState?.title ?? '문서가 없습니다'}</strong>
            <p>{emptyState?.description ?? '조건에 맞는 문서가 없습니다.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function DocumentsPagination({
  currentPage,
  pageSize,
  pageSizeOptions,
  totalItems,
  totalLabel,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeRef = useRef(null);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

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
      <div className="my-documents-total">{totalLabel ?? `전체 ${totalItems}개`}</div>
      <nav className="my-documents-page-nav" aria-label="문서 목록 페이지네이션">
        <button
          type="button"
          className="page-arrow"
          aria-label="이전 페이지"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={15} />
        </button>
        {pageNumbers.map((page) => (
          typeof page === 'number' ? (
            <button
              key={page}
              type="button"
              className={page === currentPage ? 'active' : ''}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={page}>...</span>
          )
        ))}
        <button
          type="button"
          className="page-arrow"
          aria-label="다음 페이지"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
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
                  onPageSizeChange(option);
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

function DocumentInfoPanel({ selectedDocument }) {
  const [isVersionPanelOpen, setIsVersionPanelOpen] = useState(false);
  const [isVersionPanelClosing, setIsVersionPanelClosing] = useState(false);

  const handleOpenVersionPanel = () => {
    setIsVersionPanelClosing(false);
    setIsVersionPanelOpen(true);
  };

  const handleCloseVersionPanel = () => {
    setIsVersionPanelClosing(true);
    window.setTimeout(() => {
      setIsVersionPanelOpen(false);
      setIsVersionPanelClosing(false);
    }, 220);
  };

  if (!selectedDocument) {
    return (
      <aside className="doc-inspector my-documents-info-panel" aria-label="문서 정보">
        <header className="my-documents-info-header">
          <h2>문서 정보</h2>
        </header>
        <div className="my-documents-info-empty">
          <span className="my-documents-info-empty-icon">
            <Info size={20} />
          </span>
          <strong>문서를 선택하세요</strong>
          <p>목록에서 문서를 선택하면 기본 정보, 공유 범위, 버전 기록을 확인할 수 있습니다.</p>
        </div>
      </aside>
    );
  }

  const typeLabels = {
    docx: '문서',
    xlsx: '스프레드시트',
    pptx: '프레젠테이션',
    pdf: 'PDF',
    folder: '폴더',
  };
  const iconType = selectedDocument.type === 'folder' ? 'docx' : selectedDocument.type;
  const selectedBadges = [
    selectedDocument.status
      ? {
          label: selectedDocument.status,
          tone: selectedDocument.status === '삭제됨' ? 'danger' : 'success',
        }
      : { label: selectedDocument.access.label, tone: 'info' },
    selectedDocument.starred ? { label: '즐겨찾기', tone: 'success' } : null,
  ].filter(Boolean);
  const selectedBasics = [
    ['문서 유형', typeLabels[selectedDocument.type] ?? '문서'],
    ['소유 팀', selectedDocument.team],
    ['작성자', selectedDocument.author],
    ['수정일', selectedDocument.updatedAt],
    ['위치', selectedDocument.path],
    ['버전', selectedDocument.status === '삭제됨' ? '-' : 'v1.3'],
  ];

  return (
    <aside className="doc-inspector my-documents-info-panel" aria-label="문서 정보">
      <header className="my-documents-info-header">
        <h2>문서 정보</h2>
      </header>

      <div className="doc-inspector-scroll my-documents-info-scroll">
        <div className="my-documents-info-summary">
          <img className="my-documents-info-file-icon" src={`/document-icons/ref-icon-${iconType}.png`} alt="" aria-hidden="true" />
          <div className="my-documents-info-summary-copy">
            <strong>{selectedDocument.title}</strong>
            <div className="my-documents-info-badges">
              {selectedBadges.map((badge) => (
                <span key={badge.label} className={`my-documents-info-badge tone-${badge.tone}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="my-documents-info-preview" aria-label="문서 미리보기">
          <div className="my-documents-preview-page">
            <div className="my-documents-preview-title"></div>
            <div className="my-documents-preview-meta"></div>
            <div className="my-documents-preview-kpis">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="my-documents-preview-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="my-documents-preview-chart">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">기본 정보</span>
            <button type="button" className="my-documents-info-text-button">편집</button>
          </header>
          <div className="ins-section-body">
            {selectedBasics.map(([label, value]) => (
              <div className="ai-info-row my-documents-info-row" key={label}>
                <span className="ai-info-label">{label}</span>
                <span className="ai-info-val">{value}</span>
              </div>
            ))}
            <button
              type="button"
              className="ins-link-btn my-documents-version-inline"
              onClick={handleOpenVersionPanel}
            >
              버전 기록 보기 <ChevronRight size={12} />
            </button>
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">태그</span>
            <button type="button" className="my-documents-info-text-button">관리</button>
          </header>
          <div className="ins-tag-list">
            {documentInfo.tags.map((tag) => (
              <span key={tag} className="ins-tag">{tag}</span>
            ))}
            <button type="button" className="ins-tag-add" aria-label="태그 추가">
              <Plus size={12} />
            </button>
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">AI 생성 정보</span>
          </header>
          <div className="ins-section-body">
            {documentInfo.aiInfo.map(([label, value]) => (
              <div className="ai-info-row" key={label}>
                <span className="ai-info-label">{label}</span>
                <span className="ai-info-val">{value}</span>
              </div>
            ))}
            <button type="button" className="ins-link-btn ai-info-link">
              프롬프트 및 컨텍스트 보기 <ChevronRight size={12} />
            </button>
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">공유 범위</span>
            <a href="#" className="ins-link-btn my-documents-info-head-link">자세히 보기</a>
          </header>
          <div className="my-documents-info-share-list">
            {documentInfo.shares.map((share, index) => (
              <button key={share.label} type="button" className="my-documents-info-share-row">
                <span className="ins-share-select-icon my-documents-info-share-icon">
                  <Users size={14} />
                </span>
                <span className="my-documents-info-share-name">{share.label}</span>
                <span className={`my-documents-info-share-permission${index === 2 ? ' is-muted' : ''}`}>
                  {share.permission}
                </span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">연결된 항목</span>
          </header>
          <div className="ins-section-body my-documents-info-linked-list">
            <div className="my-documents-info-linked-group">
              <span className="ai-info-label">관련 프로젝트</span>
              <a href="#" className="ins-link-btn">2024 하반기 캠페인</a>
            </div>
            <div className="my-documents-info-linked-group">
              <span className="ai-info-label">관련 업무</span>
              <a href="#" className="ins-link-btn">성과 분석 및 리포트 작성</a>
            </div>
          </div>
        </section>

        <section className="ins-section">
          <header className="ins-section-head">
            <span className="ins-section-title">참조 문서</span>
          </header>
          <ul className="ref-source-list">
            {documentInfo.references.map((reference) => (
              <li key={reference.title}>
                <span className="ref-source-main">
                  <img className="ref-source-icon" src={`/document-icons/ref-icon-${reference.type}.png`} alt="" aria-hidden="true" />
                  <span className="ref-source-title">{reference.title}</span>
                </span>
                <span className="ref-source-category">{reference.category}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="ins-link-btn my-documents-reference-more">+ 3개 더 보기</button>
        </section>
      </div>
      {isVersionPanelOpen && (
        <div
          className={`my-documents-version-popover${isVersionPanelClosing ? ' is-closing' : ''}`}
          role="dialog"
          aria-label="버전 기록"
        >
          <header className="my-documents-version-drawer-head">
            <div>
              <span className="ins-section-title">버전 기록</span>
            </div>
            <button type="button" aria-label="버전 기록 닫기" onClick={handleCloseVersionPanel}>
              <X size={16} />
            </button>
          </header>
          <ul className="version-list my-documents-version-drawer-list">
            {documentInfo.versions.map((version) => (
              <li key={version.v} className={version.current ? 'is-current' : ''}>
                <div className="version-dot" />
                <div className="my-documents-version-drawer-item">
                  <div className="my-documents-version-drawer-top">
                    <span className="version-text">
                      <strong>{version.v}</strong>
                      <span>{version.label}</span>
                    </span>
                    {version.current ? (
                      <span className="my-documents-current-version-badge">현재 버전</span>
                    ) : (
                      <button type="button" className="my-documents-version-restore">이 버전으로 복원</button>
                    )}
                  </div>
                  <div className="my-documents-version-drawer-meta">
                    <span>{version.updatedAt}</span>
                    <span>{version.author} ({version.team})</span>
                  </div>
                  <p>{version.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

function MyDocuments({ scope = 'all' }) {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterValues, setFilterValues] = useState(() => (
    Object.fromEntries(filters.map((filter) => [filter.label, filter.value]))
  ));
  const pageSizeOptions = [10, 20, 50, 100];
  const scopeConfig = documentScopeConfig[scope] ?? documentScopeConfig.all;
  const scopedDocuments = scopeConfig.getDocuments();
  const pageTitle = scopeConfig.title;
  const pageCountLabel = `${scopeConfig.countLabel} ${scopedDocuments.length}개`;
  const scopeDescription = scopeConfig.description;
  const activeTabIndex = scopeConfig.tabIndex;
  const totalItems = scopedDocuments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const pagedDocuments = scopedDocuments.slice(pageStartIndex, pageStartIndex + pageSize);
  const selectedDocument = scopedDocuments.find((document) => selectedIds.includes(document.id));

  useEffect(() => {
    setSelectedIds([]);
    setCurrentPage(1);
  }, [scope]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleToggleSelected = (documentId) => {
    setSelectedIds((current) => (
      current.includes(documentId)
        ? current.filter((id) => id !== documentId)
        : [...current, documentId]
    ));
  };

  const handleToggleAll = () => {
    const pageIds = pagedDocuments.map((document) => document.id);
    setSelectedIds((current) => (
      pageIds.every((id) => current.includes(id))
        ? current.filter((id) => !pageIds.includes(id))
        : Array.from(new Set([...current, ...pageIds]))
    ));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="page-content my-documents-page">
      <div className="my-documents-layout">
        <div className="my-documents-main-pane">
      <div className="my-documents-top">
        <div className="my-documents-title-row">
          <div className="my-documents-heading">
            <h1 className="page-title">{pageTitle}</h1>
            <p className="my-documents-scope-description">{scopeDescription}</p>
          </div>

          <div className="my-documents-actions">
            {scopeConfig.headerActions.map(({ label, Icon, variant, split, danger }) => (
              variant === 'primary' ? (
                <button key={label} type="button" className="btn-new-document my-documents-new-button">
                  <div className="btn-new-main">
                    <Icon size={16} strokeWidth={2.5} />
                    <span>{label}</span>
                  </div>
                  {split && (
                    <>
                      <div className="btn-new-split"></div>
                      <div className="btn-new-icon">
                        <ChevronDown size={14} strokeWidth={3} />
                      </div>
                    </>
                  )}
                </button>
              ) : (
                <button
                  key={label}
                  type="button"
                  className={`my-documents-outline-button${danger ? ' is-danger' : ''}`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              )
            ))}

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
            <button
              key={tab}
              type="button"
              className={index === activeTabIndex ? 'active' : ''}
              onClick={() => {
                if (tabRoutes[index]) {
                  navigate(tabRoutes[index]);
                }
              }}
            >
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
            actions={scopeConfig.selectionActions}
          />
        )}
        <DocumentTable
          rows={pagedDocuments}
          selectedIds={selectedIds}
          onToggleSelected={handleToggleSelected}
          onToggleAll={handleToggleAll}
          dateLabel={scopeConfig.dateLabel}
          rowActions={scopeConfig.rowActions}
          emptyState={scopeConfig.emptyState}
        />
      </section>
      <DocumentsPagination
        currentPage={currentPage}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        totalItems={totalItems}
        totalLabel={pageCountLabel}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setCurrentPage(1);
        }}
      />
        </div>
        <DocumentInfoPanel selectedDocument={selectedDocument} />
      </div>
    </div>
  );
}

export default MyDocuments;
