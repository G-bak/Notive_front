import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Ellipsis,
  Plus,
  Search,
  TriangleAlert,
  Upload,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import './Templates.css';

const summaryCards = [
  { label: '등록 템플릿', value: '42', Icon: ClipboardList, tone: 'green' },
  { label: 'AI 참조 가능', value: '31', Icon: CheckCircle2, tone: 'green' },
  { label: '검토 필요', value: '5', Icon: TriangleAlert, tone: 'orange' },
  { label: '이번 달 사용', value: '382', Icon: BarChart3, tone: 'blue' },
];

const templateTabs = ['전체', '보고서', '회의록', '제안서', 'SOP', '정책 문서'];

const templateItems = [
  {
    id: 1,
    name: '주간 업무 보고서 (표준)',
    type: '보고서',
    team: '마케팅팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v2.1',
    usage: 128,
    updatedAt: '2024.05.18',
    thumbnail: '/templates/template-weekly-report.png',
    iconType: 'docx',
  },
  {
    id: 2,
    name: '월간 성과 보고서',
    type: '보고서',
    team: '마케팅팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v1.8',
    usage: 86,
    updatedAt: '2024.05.16',
    thumbnail: '/templates/template-weekly-report.png',
    iconType: 'docx',
  },
  {
    id: 3,
    name: '회의록 (표준)',
    type: '회의록',
    team: '경영지원팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v1.3',
    usage: 74,
    updatedAt: '2024.05.14',
    thumbnail: '/templates/template-meeting-minutes.png',
    iconType: 'docx',
  },
  {
    id: 4,
    name: '고객 제안서 (기본)',
    type: '제안서',
    team: '영업팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v2.0',
    usage: 64,
    updatedAt: '2024.05.12',
    thumbnail: '/templates/template-proposal.png',
    iconType: 'pptx',
  },
  {
    id: 5,
    name: '프로젝트 제안서',
    type: '제안서',
    team: '영업팀',
    aiReference: '검토 필요',
    approvalStatus: '검토 필요',
    version: 'v1.5',
    usage: 31,
    updatedAt: '2024.05.10',
    thumbnail: '/templates/template-proposal.png',
    iconType: 'pptx',
  },
  {
    id: 6,
    name: 'SOP (표준)',
    type: 'SOP',
    team: '운영팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v1.2',
    usage: 52,
    updatedAt: '2024.05.08',
    thumbnail: '/templates/template-sop.png',
    iconType: 'docx',
  },
  {
    id: 7,
    name: '업무 절차서',
    type: 'SOP',
    team: '운영팀',
    aiReference: '참조 가능',
    approvalStatus: '승인됨',
    version: 'v1.0',
    usage: 29,
    updatedAt: '2024.05.06',
    thumbnail: '/templates/template-sop.png',
    iconType: 'docx',
  },
  {
    id: 8,
    name: '보안 정책',
    type: '정책 문서',
    team: '정보보안팀',
    aiReference: '참조 제한',
    approvalStatus: '승인됨',
    version: 'v1.4',
    usage: 18,
    updatedAt: '2024.05.01',
    thumbnail: '/templates/template-weekly-report.png',
    iconType: 'pdf',
  },
];

const featuredTemplateIds = [1, 3, 4, 6];

function Templates() {
  const [activeTab, setActiveTab] = useState(templateTabs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedTeam, setSelectedTeam] = useState('전체');
  const [selectedAiReference, setSelectedAiReference] = useState('전체');
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateItems[0].id);
  const [openMenuId, setOpenMenuId] = useState(null);
  const selectedTemplate = useMemo(
    () => templateItems.find((template) => template.id === selectedTemplateId) || templateItems[0],
    [selectedTemplateId]
  );
  const filteredTemplates = useMemo(() => (
    templateItems.filter((template) => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesTab = activeTab === '전체' || template.type === activeTab;
      const matchesSearch = normalizedQuery ? template.name.toLowerCase().includes(normalizedQuery) : true;
      const matchesType = selectedType === '전체' || template.type === selectedType;
      const matchesTeam = selectedTeam === '전체' || template.team === selectedTeam;
      const matchesAiReference = selectedAiReference === '전체' || template.aiReference === selectedAiReference;

      return matchesTab && matchesSearch && matchesType && matchesTeam && matchesAiReference;
    })
  ), [activeTab, searchQuery, selectedAiReference, selectedTeam, selectedType]);

  useEffect(() => {
    if (!openMenuId) return undefined;

    const handlePointerDown = () => setOpenMenuId(null);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null);
      }
    };

    window.document.addEventListener('pointerdown', handlePointerDown);
    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.removeEventListener('pointerdown', handlePointerDown);
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMenuId]);

  return (
    <div className="page-content templates-page">
      <section className="templates-layout">
        <main className="templates-main">
          <header className="templates-header">
            <h1 className="page-title">템플릿</h1>
            <p className="page-subtitle">문서 유형별 템플릿을 관리하고 AI 생성 품질을 표준화합니다.</p>
          </header>

          <section className="templates-summary-grid" aria-label="템플릿 요약">
            {summaryCards.map(({ label, value, Icon, tone }) => (
              <article className="templates-summary-card" key={label}>
                <div>
                  <span className="templates-card-label">{label}</span>
                  <strong>{value}</strong>
                </div>
                <span className={`templates-summary-icon tone-${tone}`}>
                  <Icon size={24} strokeWidth={2.2} />
                </span>
              </article>
            ))}
          </section>

          <div className="templates-tabs-row">
            <nav className="templates-tabs" aria-label="템플릿 유형 필터">
              {templateTabs.map((tab) => (
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

          <div className="templates-filter-meta" aria-hidden="true">
            {filteredTemplates.length}
          </div>

          <div className="templates-toolbar">
            <div className="templates-search-box">
              <Search size={15} />
              <input
                type="text"
                value={searchQuery}
                placeholder="템플릿 검색..."
                aria-label="템플릿 검색"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            <TemplatesFilterSelect
              label="문서 유형"
              value={selectedType}
              options={['전체', '보고서', '회의록', '제안서', 'SOP', '정책 문서']}
              onChange={setSelectedType}
            />

            <TemplatesFilterSelect
              label="소유 팀"
              value={selectedTeam}
              options={['전체', '마케팅팀', '경영지원팀', '영업팀', '운영팀', '정보보안팀']}
              onChange={setSelectedTeam}
            />

            <TemplatesFilterSelect
              label="AI 참조"
              value={selectedAiReference}
              options={['전체', '참조 가능', '검토 필요', '참조 제한']}
              onChange={setSelectedAiReference}
            />

            <div className="templates-toolbar-spacer" />

            <button type="button" className="templates-primary-button">
              <Plus size={15} />
              <span>새 템플릿</span>
            </button>
            <button type="button" className="templates-outline-button">
              <Upload size={15} />
              <span>가져오기</span>
            </button>
          </div>

          <section className="templates-featured-grid" aria-label="대표 템플릿">
            {featuredTemplateIds.map((templateId) => templateItems.find((template) => template.id === templateId)).filter(Boolean).map((template) => {
              const isSelected = selectedTemplateId === template.id;

              return (
                <button
                  type="button"
                  className={`templates-featured-card${isSelected ? ' selected' : ''}`}
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  aria-pressed={isSelected}
                >
                  <img src={template.thumbnail} alt="" aria-hidden="true" />
                  <span className="templates-featured-copy">
                    <strong>{template.name}</strong>
                    <mark>{template.aiReference}</mark>
                    <span className="templates-featured-meta">
                      <em>{template.version}</em>
                      <span>·</span>
                      <span>{template.team}</span>
                    </span>
                    <span className="templates-featured-usage">사용 {template.usage}회</span>
                  </span>
                  {isSelected && (
                    <span className="templates-featured-check" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </span>
                  )}
                </button>
              );
            })}
          </section>

          <section className="templates-table-panel" aria-label="템플릿 목록">
            <div className="templates-table" role="table">
              <div className="templates-table-row templates-table-head" role="row">
                <span role="columnheader">이름</span>
                <span role="columnheader">유형</span>
                <span role="columnheader">소유 팀</span>
                <span role="columnheader">버전</span>
                <span role="columnheader">사용 횟수</span>
                <span role="columnheader">AI 참조</span>
                <span role="columnheader">승인 상태</span>
                <span role="columnheader">최근 업데이트</span>
                <span role="columnheader"></span>
              </div>

              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplateId === template.id;

                return (
                  <div
                    className={`templates-table-row templates-data-row${isSelected ? ' selected' : ''}`}
                    role="row"
                    key={template.id}
                    tabIndex={0}
                    onClick={() => setSelectedTemplateId(template.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedTemplateId(template.id);
                      }
                    }}
                  >
                    <span className="templates-table-name" role="cell">
                      <img src={`/document-icons/ref-icon-${template.iconType}.png`} alt="" aria-hidden="true" />
                      <span>{template.name}</span>
                    </span>
                    <span role="cell">{template.type}</span>
                    <span role="cell">{template.team}</span>
                    <span className="templates-version" role="cell">{template.version}</span>
                    <span className="templates-usage-count" role="cell">{template.usage}</span>
                    <span role="cell">
                      <mark className={`templates-status ${template.aiReference === '검토 필요' ? 'tone-review' : template.aiReference === '참조 제한' ? 'tone-muted' : 'tone-active'}`}>
                        {template.aiReference}
                      </mark>
                    </span>
                    <span role="cell">
                      <mark className={`templates-status ${template.approvalStatus === '검토 필요' ? 'tone-review' : 'tone-approved'}`}>
                        {template.approvalStatus}
                      </mark>
                    </span>
                    <span className="templates-updated" role="cell">{template.updatedAt}</span>
                    <span className="templates-row-more" role="cell" onClick={(event) => event.stopPropagation()}>
                      <button
                        type="button"
                        className="templates-row-more-button"
                        aria-label={`${template.name} 메뉴`}
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === template.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenMenuId((current) => (current === template.id ? null : template.id));
                        }}
                        onPointerDown={(event) => event.stopPropagation()}
                      >
                        <Ellipsis size={17} />
                      </button>
                      {openMenuId === template.id && (
                        <div
                          className="templates-row-menu"
                          role="menu"
                          onClick={(event) => event.stopPropagation()}
                          onPointerDown={(event) => event.stopPropagation()}
                        >
                          <button type="button" role="menuitem">템플릿 편집</button>
                          <button type="button" role="menuitem">복제</button>
                          <button type="button" role="menuitem">미리보기</button>
                          <button type="button" role="menuitem" className="is-danger">비활성화</button>
                        </div>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
        <TemplatesInspector template={selectedTemplate} />
      </section>
    </div>
  );
}

function TemplatesInspector({ template }) {
  const sectionRows = [
    { order: 1, name: '표지', required: true },
    { order: 2, name: '요약', required: true },
    { order: 3, name: '주요 성과', required: true },
    { order: 4, name: '진행 현황', required: true },
    { order: 5, name: '다음 계획', required: false },
    { order: 6, name: '리스크', required: false },
  ];

  const checklistRows = ['필수 섹션 포함', '예시 문장 포함', '변수 필드 사용', '권한 준수'];
  const recentUsers = [
    { name: '김지훈', team: '마케팅팀', date: '2024.05.18', count: '3회' },
    { name: '이수연', team: '마케팅팀', date: '2024.05.17', count: '2회' },
    { name: '박민수', team: '마케팅팀', date: '2024.05.16', count: '1회' },
  ];

  const metaRows = [
    ['문서 유형', template.type],
    ['소유 팀', template.team],
    ['생성일', '2024.03.02'],
    ['최근 업데이트', `${template.updatedAt} (김지훈)`],
    ['사용 횟수', `${template.usage}회`],
  ];

  return (
    <aside className="templates-inspector" aria-label="선택한 템플릿 정보">
      <header className="templates-inspector-header">
        <h2>선택한 템플릿 정보</h2>
      </header>

      <section className="templates-selected-template">
        <img src={template.thumbnail} alt="" aria-hidden="true" />
        <div>
          <strong>{template.name}</strong>
          <mark>{template.aiReference}</mark>
          <span>
            <em>{template.version}</em>
            <mark>최신 버전</mark>
          </span>
        </div>
      </section>

      <dl className="templates-info-meta">
        {metaRows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className="templates-inspector-section">
        <div className="templates-section-head">
          <h3>구성 섹션</h3>
        </div>
        <div className="templates-section-list">
          {sectionRows.map((section) => (
            <div key={section.name}>
              <span className="templates-section-order">{section.order}</span>
              <span>{section.name}</span>
              <mark className={section.required ? '' : 'tone-optional'}>
                {section.required ? '필수' : '선택'}
              </mark>
            </div>
          ))}
        </div>
      </section>

      <section className="templates-inspector-section">
        <h3>품질 체크리스트</h3>
        <div className="templates-check-list">
          {checklistRows.map((item) => (
            <div key={item}>
              <CheckCircle2 size={14} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="templates-inspector-section">
        <div className="templates-section-head">
          <h3>최근 사용 현황</h3>
          <button type="button">더보기</button>
        </div>
        <div className="templates-recent-user-list">
          {recentUsers.map((user) => (
            <div key={user.name}>
              <span className="templates-user-avatar" aria-hidden="true">{user.name.slice(0, 1)}</span>
              <span className="templates-user-copy">
                <span>{user.name} ({user.team})</span>
                <time>{user.date}</time>
              </span>
              <em>{user.count}</em>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function TemplatesFilterSelect({ label, value, options, onChange }) {
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
    <div className="templates-filter-select-wrap" ref={selectRef}>
      <button
        type="button"
        className={`filter-pill templates-filter-select${isOpen ? ' is-active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="filter-pill-label">{label}</span>
        <span className="filter-pill-value">{value}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="templates-filter-select-menu" role="listbox" aria-label={label}>
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

export default Templates;
