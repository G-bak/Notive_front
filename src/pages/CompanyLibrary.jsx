import {
  ChevronDown,
  ChevronRight,
  Database,
  Ellipsis,
  Eye,
  FileText,
  Folder,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './CompanyLibrary.css';

const folderTree = [
  {
    name: '회사 자료실',
    count: 318,
    children: [
      { name: '회사 소개', count: 24 },
      {
        name: '브랜드 자산',
        count: 32,
        children: [
          { name: '로고', count: 8 },
          { name: '브랜드 가이드', count: 12 },
          { name: '템플릿', count: 12 },
        ],
      },
      { name: '계약/법무', count: 45 },
      { name: '재무/IR', count: 28 },
      { name: '인사/총무', count: 36 },
      { name: '보안/컴플라이언스', count: 22 },
      { name: '영업 자료', count: 68 },
      { name: '제품 자료', count: 63 },
    ],
  },
];

const tags = [
  { label: '중요', count: 14, tone: 'red' },
  { label: '대외비', count: 9, tone: 'orange' },
  { label: '승인필요', count: 8, tone: 'blue' },
  { label: '마케팅', count: 32 },
  { label: '브랜드', count: 18 },
  { label: 'IR', count: 7 },
  { label: '2024', count: 54 },
  { label: 'Q1', count: 12 },
];

const summaryCards = [
  { label: '총 자료', value: '318', delta: '+18', sub: '이번 달', deltaTone: 'positive', Icon: FileText, tone: 'blue' },
  { label: '외부 공유', value: '12', delta: '+3', sub: '이번 달', deltaTone: 'positive', Icon: Share2, tone: 'green' },
  { label: '승인 대기', value: '8', delta: '-2', sub: '이번 주', deltaTone: 'neutral', Icon: ShieldCheck, tone: 'blue' },
  { label: '저장 용량', value: '1.36TB', delta: '/ 2TB (68%)', sub: '', deltaTone: 'muted', Icon: Database, tone: 'gray' },
];

const libraryTabs = ['전체', '최근 업로드', '승인 필요', '외부 공유', '보관함'];

const libraryAssets = [
  {
    id: 1,
    name: '브랜드 가이드라인 v3.0',
    type: 'PDF',
    team: '마케팅팀',
    access: '전체 임직원',
    updatedAt: '2024-05-16 14:30',
    editor: '김지훈',
    size: '8.4 MB',
    status: '승인 완료',
    tabScope: ['전체', '최근 업로드', '외부 공유'],
  },
  {
    id: 2,
    name: '회사 소개서 2024',
    type: 'PPTX',
    team: '경영지원팀',
    access: '전체 임직원',
    updatedAt: '2024-05-15 09:10',
    editor: '이서연',
    size: '15.2 MB',
    status: '승인 완료',
    tabScope: ['전체', '최근 업로드'],
  },
  {
    id: 3,
    name: '2024 연간 재무제표',
    type: 'XLSX',
    team: '재무팀',
    access: '재무팀',
    updatedAt: '2024-05-15 08:45',
    editor: '박민수',
    size: '2.1 MB',
    status: '승인 완료',
    tabScope: ['전체', '최근 업로드'],
  },
  {
    id: 4,
    name: '근로계약서 양식_v2',
    type: 'DOCX',
    team: '인사팀',
    access: '인사팀',
    updatedAt: '2024-05-14 16:20',
    editor: '최유나',
    size: '120 KB',
    status: '승인 완료',
    tabScope: ['전체', '최근 업로드'],
  },
  {
    id: 5,
    name: '정보보안 정책_2024',
    type: 'PDF',
    team: '보안팀',
    access: '전체 임직원',
    updatedAt: '2024-05-14 11:05',
    editor: '정현우',
    size: '1.3 MB',
    status: '승인 완료',
    tabScope: ['전체', '외부 공유'],
  },
  {
    id: 6,
    name: '영업 프레젠테이션 모음',
    type: '폴더',
    team: '영업팀',
    access: '영업팀',
    updatedAt: '2024-05-13 17:40',
    editor: '이준호',
    size: '-',
    status: '',
    tabScope: ['전체', '보관함'],
  },
  {
    id: 7,
    name: 'IR 자료_투자자 보고서',
    type: 'DOCX',
    team: 'IR팀',
    access: 'IR팀, 경영진',
    updatedAt: '2024-05-13 10:15',
    editor: '박민수',
    size: '4.7 MB',
    status: '승인 완료',
    tabScope: ['전체'],
  },
  {
    id: 8,
    name: '제품 소개서 v5.1',
    type: 'PPTX',
    team: '제품팀',
    access: '전체 임직원',
    updatedAt: '2024-05-12 15:30',
    editor: '김하연',
    size: '21.6 MB',
    status: '승인 완료',
    tabScope: ['전체', '외부 공유'],
  },
  {
    id: 9,
    name: '인력 현황 보고서_2024Q1',
    type: 'XLSX',
    team: '인사팀',
    access: '인사팀, 경영진',
    updatedAt: '2024-05-12 09:00',
    editor: '최유나',
    size: '980 KB',
    status: '승인 완료',
    tabScope: ['전체', '승인 필요'],
  },
  {
    id: 10,
    name: '협력사 보안 서약서',
    type: 'PDF',
    team: '구매팀',
    access: '구매팀',
    updatedAt: '2024-05-11 14:22',
    editor: '이정민',
    size: '620 KB',
    status: '승인 완료',
    tabScope: ['전체', '승인 필요'],
  },
];

function CompanyLibrary() {
  const [expandedFolders, setExpandedFolders] = useState(() => new Set(['회사 자료실', '브랜드 자산']));
  const [selectedFolder, setSelectedFolder] = useState('브랜드 가이드');
  const [activeTab, setActiveTab] = useState(libraryTabs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedTeam, setSelectedTeam] = useState('전체');
  const [selectedAssetId, setSelectedAssetId] = useState(libraryAssets[0].id);
  const selectedAsset = libraryAssets.find((asset) => asset.id === selectedAssetId) ?? libraryAssets[0];

  const filteredAssets = libraryAssets.filter((asset) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = normalizedQuery
      ? asset.name.toLowerCase().includes(normalizedQuery)
      : true;
    const matchesType = selectedType === '전체' || asset.type === selectedType;
    const matchesTeam = selectedTeam === '전체' || asset.team === selectedTeam;
    const matchesTab = activeTab === '전체' || asset.tabScope.includes(activeTab);

    return matchesSearch && matchesType && matchesTeam && matchesTab;
  });

  const toggleFolder = (folderName) => {
    setExpandedFolders((current) => {
      const next = new Set(current);
      if (next.has(folderName)) {
        next.delete(folderName);
      } else {
        next.add(folderName);
      }
      return next;
    });
  };

  return (
    <div className="page-content company-library-page">
      <section className="company-library-layout">
        <main className="company-library-main">
          <header className="company-library-header">
            <h1 className="page-title">회사 자료실</h1>
            <p className="page-subtitle">회사 공통 자료를 안전하게 보관하고 팀별로 공유합니다.</p>
          </header>

          <aside className="company-library-left-panel">
          <div className="company-library-folder-panel">
            <header className="company-library-panel-title">
              <strong>폴더</strong>
              <div>
                <button type="button" aria-label="폴더 추가">
                  <Plus size={14} />
                </button>
                <button type="button" aria-label="폴더 메뉴">
                  <Ellipsis size={15} />
                </button>
              </div>
            </header>
            <div className="company-library-folder-tree">
              {folderTree.map((folder) => (
                <FolderNode
                  key={folder.name}
                  folder={folder}
                  expandedFolders={expandedFolders}
                  selectedFolder={selectedFolder}
                  onToggle={toggleFolder}
                  onSelect={setSelectedFolder}
                />
              ))}
            </div>
          </div>

          <div className="company-library-tags-panel">
            <header className="company-library-tags-head">
              <strong>태그</strong>
              <div>
                <button type="button" aria-label="태그 추가">
                  <Plus size={14} />
                </button>
                <button type="button" aria-label="태그 메뉴">
                  <Ellipsis size={15} />
                </button>
              </div>
            </header>
            <div className="company-library-tag-list">
              {tags.map((tag) => (
                <span key={tag.label}>
                  {tag.label}
                  <em>{tag.count}</em>
                </span>
              ))}
            </div>
            <button type="button" className="company-library-more-link">+ 태그 더보기</button>
          </div>
          </aside>

          <section className="company-library-center-panel">
          <section className="company-library-summary-grid" aria-label="회사 자료실 요약">
            {summaryCards.map(({ label, value, delta, sub, deltaTone, Icon, tone }) => (
              <article className="company-library-summary-card" key={label}>
                <div>
                  <span className="company-library-card-label">{label}</span>
                  <strong>{value}</strong>
                  <em>
                    <span className={`tone-${deltaTone}`}>{delta}</span>
                    {sub && ` ${sub}`}
                  </em>
                </div>
                <span className={`company-library-summary-icon tone-${tone}`}>
                  <Icon size={24} strokeWidth={2.2} />
                </span>
              </article>
            ))}
          </section>

          <div className="company-library-tabs-row">
            <nav className="company-library-tabs" aria-label="회사 자료실 필터">
              {libraryTabs.map((tab) => (
                <button
                  type="button"
                  className={activeTab === tab ? 'active' : ''}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="company-library-toolbar">
            <div className="company-library-search-box">
              <Search size={15} />
              <input
                type="text"
                value={searchQuery}
                placeholder="자료명 검색..."
                aria-label="자료명 검색"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            <CompanyLibraryFilterSelect
              label="자료 유형"
              value={selectedType}
              options={['전체', 'PDF', 'PPTX', 'XLSX', 'DOCX', '폴더']}
              onChange={setSelectedType}
            />

            <CompanyLibraryFilterSelect
              label="소유 팀"
              value={selectedTeam}
              options={['전체', '마케팅팀', '경영지원팀', '재무팀', '인사팀', '보안팀', '영업팀', 'IR팀', '제품팀', '구매팀']}
              onChange={setSelectedTeam}
            />

            <button type="button" className="company-library-filter-button">
              <SlidersHorizontal size={15} />
              <span>필터</span>
            </button>

            <div className="company-library-toolbar-spacer" />

            <button type="button" className="company-library-upload-button">
              <Upload size={15} />
              <span>업로드</span>
            </button>
            <button type="button" className="company-library-new-folder-button">
              <Plus size={15} />
              <span>새 폴더</span>
            </button>
            <button type="button" className="company-library-more-button" aria-label="자료실 메뉴">
              <Ellipsis size={18} />
            </button>
          </div>

          <section className="company-library-table-panel" aria-label="회사 자료 목록">
            <div className="company-library-table" role="table">
              <div className="company-library-table-row company-library-table-head" role="row">
                <span role="columnheader">이름</span>
                <span role="columnheader">유형</span>
                <span role="columnheader">소유 팀</span>
                <span role="columnheader">접근 범위</span>
                <span role="columnheader">최종 업데이트</span>
                <span role="columnheader">크기</span>
                <span role="columnheader">승인 상태</span>
              </div>

              {filteredAssets.map((asset) => (
                <button
                  type="button"
                  className={`company-library-table-row company-library-data-row${selectedAssetId === asset.id ? ' selected' : ''}`}
                  role="row"
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                >
                  <span className="company-library-file-name" role="cell">
                    <CompanyLibraryFileIcon type={asset.type} />
                    <span className="company-library-file-title">{asset.name}</span>
                  </span>
                  <span className="company-library-file-type" role="cell">{asset.type}</span>
                  <span role="cell">{asset.team}</span>
                  <span className="company-library-access" role="cell">{asset.access}</span>
                  <span className="company-library-updated" role="cell">
                    <time>{asset.updatedAt}</time>
                    <em>{asset.editor}</em>
                  </span>
                  <span className="company-library-size" role="cell">{asset.size}</span>
                  <span className="company-library-status-cell" role="cell">
                    {asset.status && <mark className="company-library-status">{asset.status}</mark>}
                  </span>
                </button>
              ))}
            </div>

            <footer className="company-library-table-footer">
              <span>전체 318개</span>
              <nav aria-label="자료 목록 페이지">
                <button type="button" className="company-library-page-arrow" aria-label="이전 페이지">
                  <ChevronRight size={15} />
                </button>
                <button type="button" className="active">1</button>
                <button type="button">2</button>
                <button type="button">3</button>
                <button type="button">4</button>
                <button type="button">5</button>
                <button type="button" className="company-library-page-arrow" aria-label="다음 페이지">
                  <ChevronRight size={15} />
                </button>
              </nav>
              <button type="button" className="company-library-page-size">10개씩 <ChevronDown size={14} /></button>
            </footer>
          </section>
          </section>
        </main>

        <CompanyLibraryInspector asset={selectedAsset} />
      </section>
    </div>
  );
}

function CompanyLibraryInspector({ asset }) {
  const metaRows = [
    ['위치', '회사 자료실 > 브랜드 자산 > 브랜드 가이드'],
    ['소유 팀', asset.team],
    ['업로드', '김지훈 (2024-05-10 10:20)'],
    ['최종 업데이트', `${asset.editor} (${asset.updatedAt})`],
    ['버전', 'v3.0'],
  ];

  const relatedDocuments = [
    ['pptx', '브랜드 소개서 2024', 'PPTX'],
    ['pdf', '로고 사용 가이드', 'PDF'],
    ['docx', '마케팅 캠페인 가이드', 'DOCX'],
  ];

  const permissions = [
    { label: '전체 임직원', badge: '열람', Icon: Users },
    { label: '외부 공유 3명', badge: '열람 전용', Icon: Share2, tone: 'blue' },
  ];

  const recentActivities = [
    { text: '김지훈 팀장이 버전 v3.0으로 업데이트', time: '2024-05-16 14:30', Icon: RefreshCw },
    { text: '이서연 대리가 열람', time: '2024-05-16 11:20', Icon: Eye },
    { text: '마민수 대리가 댓글을 남겼습니다.', time: '2024-05-15 16:45', Icon: MessageSquare },
  ];

  const aiStats = [
    { label: '참조된 문서 수', value: '28건', Icon: FileText },
    { label: '요약 생성', value: '7회', Icon: Sparkles },
  ];

  return (
    <aside className="company-library-inspector" aria-label="선택한 자료 정보">
      <header className="company-library-inspector-header">
        <h2>선택한 자료 정보</h2>
      </header>

      <section className="company-library-selected-file">
        <CompanyLibraryFileIcon type={asset.type} />
        <div>
          <strong>{asset.name}</strong>
          <span>{asset.type} · {asset.size}</span>
        </div>
      </section>

      <dl className="company-library-info-meta">
        {metaRows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className="company-library-inspector-section">
        <div className="company-library-section-head">
          <h3>접근 권한</h3>
          <button type="button">권한 관리</button>
        </div>
        <div className="company-library-permission-list">
          {permissions.map(({ label, badge, Icon, tone }) => (
            <div className="company-library-permission-row" key={label}>
              <span className="company-library-inspector-icon">
                <Icon size={14} />
              </span>
              <span>{label}</span>
              <mark className={tone ? `tone-${tone}` : ''}>{badge}</mark>
            </div>
          ))}
        </div>
      </section>

      <section className="company-library-inspector-section">
        <div className="company-library-section-head">
          <h3>연결된 문서</h3>
          <span>3</span>
        </div>
        <div className="company-library-related-list">
          {relatedDocuments.map(([type, title, label]) => (
            <div key={title}>
              <img src={`/document-icons/ref-icon-${type}.png`} alt="" aria-hidden="true" />
              <span>{title}</span>
              <em>{label}</em>
            </div>
          ))}
        </div>
        <button type="button" className="company-library-link-button">더보기</button>
      </section>

      <section className="company-library-inspector-section">
        <h3>최근 활동</h3>
        <div className="company-library-activity-list">
          {recentActivities.map(({ text, time, Icon }) => (
            <div className="company-library-activity-row" key={text}>
              <span className="company-library-inspector-icon tone-blue">
                <Icon size={14} />
              </span>
              <span className="company-library-activity-copy">
                <span>{text}</span>
                <time>{time}</time>
              </span>
            </div>
          ))}
        </div>
        <button type="button" className="company-library-link-button">더보기</button>
      </section>

      <section className="company-library-inspector-section company-library-ai-section">
        <h3>AI 활용 현황</h3>
        <div className="company-library-ai-stats">
          {aiStats.map(({ label, value, Icon }) => (
            <div className="company-library-ai-row" key={label}>
              <span className="company-library-inspector-icon">
                <Icon size={14} />
              </span>
              <span>{label}</span>
              <span className="company-library-ai-value">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function CompanyLibraryFileIcon({ type }) {
  if (type === '폴더') {
    return (
      <span className="company-library-folder-file-icon" aria-hidden="true">
        <Folder size={18} fill="currentColor" />
      </span>
    );
  }

  const iconType = type.toLowerCase();

  return (
    <img
      className="company-library-file-icon-img"
      src={`/document-icons/ref-icon-${iconType}.png`}
      alt=""
      aria-hidden="true"
    />
  );
}

function CompanyLibraryFilterSelect({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (selectRef.current?.contains(event.target)) return;
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
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="company-library-filter-select-wrap" ref={selectRef}>
      <button
        type="button"
        className={`filter-pill company-library-filter-select${isOpen ? ' is-active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="filter-pill-label">{label}</span>
        <span className="filter-pill-value">{value}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="company-library-filter-select-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={value === option ? 'is-selected' : ''}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FolderNode({ folder, expandedFolders, selectedFolder, onToggle, onSelect, depth = 0 }) {
  const hasChildren = Boolean(folder.children?.length);
  const isExpanded = expandedFolders.has(folder.name);
  const isSelected = selectedFolder === folder.name;
  const ToggleIcon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div className="company-library-folder-group">
      <button
        type="button"
        className={`company-library-folder-row${isSelected ? ' active' : ''}`}
        style={{ '--folder-depth': depth }}
        onClick={() => {
          onSelect(folder.name);
          if (hasChildren) {
            onToggle(folder.name);
          }
        }}
      >
        <span className="company-library-folder-toggle">
          {hasChildren ? <ToggleIcon size={15} /> : <span />}
        </span>
        <Folder size={16} />
        <span className="company-library-folder-name">{folder.name}</span>
        <span className="company-library-folder-count">{folder.count}</span>
      </button>

      {hasChildren && isExpanded && (
        <div className="company-library-folder-children">
          {folder.children.map((child) => (
            <FolderNode
              key={child.name}
              folder={child}
              expandedFolders={expandedFolders}
              selectedFolder={selectedFolder}
              onToggle={onToggle}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyLibrary;
