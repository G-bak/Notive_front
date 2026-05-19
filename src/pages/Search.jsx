import {
  Sparkles, ChevronDown, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown,
  List, Grid2x2, MoreHorizontal,
  Users, ShieldCheck, Activity, FileText, HardDrive,
  Lock, RefreshCw, Share2, LayoutTemplate, Settings
} from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import './Search.css';

const filters = [
  {
    key: 'documentType',
    label: '문서 유형',
    options: ['전체', '문서', '스프레드시트', '프레젠테이션', 'PDF'],
  },
  {
    key: 'team',
    label: '소유 팀',
    options: ['전체', '마케팅팀', '재무팀', '제휴팀', '전략기획팀'],
  },
  {
    key: 'period',
    label: '기간',
    options: ['전체 기간', '최근 7일', '최근 30일', '최근 90일', '올해'],
    emptyValue: '전체 기간',
  },
];

const sources = [
  { type: 'docx', title: '2024 하반기 마케팅 전략 최종본', meta: '보고서 · 마케팅팀' },
  { type: 'xlsx', title: '예산 시트', meta: '스프레드시트 · 재무팀' },
  { type: 'pptx', title: '하반기 캠페인 전략 요약', meta: '프레젠테이션 · 마케팅팀' },
];

const results = [
  {
    type: 'docx',
    title: '2024년 하반기 마케팅 전략 보고서.docx',
    desc: '브랜드 인지도 강화와 리드 전환율 개선 중심의 하반기 통합 마케팅 전략과 채널별 실행 계획을 정리한 문서.',
    tags: ['마케팅', '전략', '2024H2'],
    team: '마케팅팀',
    owner: '김지연',
    updatedLabel: '수정일',
    updatedAt: '2024-08-12',
    accessLabel: '접근 권한',
    access: { label: '전체', tone: 'green' },
  },
  {
    type: 'xlsx',
    title: '하반기 캠페인 예산 집행 계획서.xlsx',
    desc: '채널별·시기별 예산 배분, 전년 대비 15% 증액 항목, 효율 KPI 시뮬레이션 시트.',
    tags: ['예산', '재무', '마케팅'],
    team: '재무팀',
    owner: '이도훈',
    updatedLabel: '수정일',
    updatedAt: '2024-08-09',
    accessLabel: '접근 권한',
    access: { label: '재무팀', tone: 'green' },
  },
  {
    type: 'pptx',
    title: '브랜드 리포지셔닝 전략 발표자료.pptx',
    desc: '하반기 브랜드 포지셔닝 변경 배경, 메시지 프레임, 시각 자산 가이드라인 발표용 자료.',
    tags: ['브랜드', '발표'],
    team: '마케팅팀',
    owner: '박세진',
    updatedLabel: '수정일',
    updatedAt: '2024-08-04',
    accessLabel: '접근 권한',
    access: { label: '마케팅팀', tone: 'green' },
  },
  {
    type: 'docx',
    title: '파트너십 강화 실행안 v3.docx',
    desc: '핵심 파트너 6사 대상 공동 캠페인·코마케팅 프로그램 실행안 및 단계별 KPI 설계.',
    tags: ['파트너십', '실행안'],
    team: '제휴팀',
    owner: '정유나',
    updatedLabel: '수정일',
    updatedAt: '2024-07-30',
    accessLabel: '접근 권한',
    access: { label: '팀 제한', tone: 'orange' },
  },
  {
    type: 'pdf',
    title: '경쟁사 마케팅 분석 리포트.pdf',
    desc: '경쟁사 5곳의 하반기 캠페인 패턴, 메시지 톤, 미디어 예산 추정치를 비교한 외부 보고서.',
    tags: ['경쟁분석', '리서치'],
    team: '전략기획팀',
    owner: '한지호',
    updatedLabel: '수정일',
    updatedAt: '2024-07-22',
    accessLabel: '접근 권한',
    access: { label: '기밀', tone: 'red' },
  },
];

function DocIcon({ type }) {
  return (
    <img className="doc-type-icon-img" src={`/document-icons/ref-icon-${type}.png`} alt="" aria-hidden="true" />
  );
}

function SearchFilterSelect({ filter, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const selectedValue = value || filter.emptyValue || '전체';

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
    onChange(option === (filter.emptyValue || '전체') ? '' : option);
    setIsOpen(false);
  };

  return (
    <div className="search-filter-select-wrap" ref={filterRef}>
      <button
        type="button"
        className={`filter-pill search-filter-select${isOpen ? ' is-active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="filter-pill-label">{filter.label}</span>
        <span className="filter-pill-value">{selectedValue}</span>
        <ChevronDown size={14} />
      </button>
      {isOpen && (
        <div className="search-filter-select-menu" role="listbox" aria-label={filter.label}>
          {filter.options.map((option) => {
            const isSelected = selectedValue === option;
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

function FilterBar({ filterValues, onFilterChange, onReset }) {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <SearchFilterSelect
          key={filter.key}
          filter={filter}
          value={filterValues[filter.key]}
          onChange={(nextValue) => onFilterChange(filter.key, nextValue)}
        />
      ))}
      <button type="button" className="filter-reset" onClick={onReset}>필터 초기화</button>
    </div>
  );
}

function AiSummaryCard() {
  return (
    <section className="ai-summary-card">
      <div className="ai-summary-head">
        <div className="ai-summary-title">
          <Sparkles size={16} className="ai-summary-spark" />
          <span>AI 요약</span>
          <span className="ai-summary-meta">출처 5개 참조</span>
        </div>
        <div className="ai-summary-actions">
          <button type="button" className="ai-summary-icon-btn" aria-label="좋아요">
            <ThumbsUp size={14} />
          </button>
          <button type="button" className="ai-summary-icon-btn" aria-label="싫어요">
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>

      <div className="ai-summary-body">
        <p>2024년 하반기 마케팅 전략은 브랜드 인지도 강화와 리드 전환율 개선에 집중합니다.</p>
        <p>타겟 세분화, 콘텐츠 마케팅 확대, 파트너십 강화가 핵심 전략이며,</p>
        <p>예산은 전년 대비 15% 증액되어 효율적 집행을 목표로 합니다.</p>
      </div>

      <div className="ai-summary-footer">
        <div className="ai-summary-source-h">참고 출처</div>
        <div className="ai-summary-source-list">
          {sources.map((s) => (
            <div key={s.title} className="ai-summary-source">
              <DocIcon type={s.type} />
              <span className="ai-summary-source-text">
                <span className="ai-summary-source-title" title={s.title}>{s.title}</span>
                <span className="ai-summary-source-meta">{s.meta}</span>
              </span>
            </div>
          ))}
          <button type="button" className="ai-summary-source-more">+ 3개 더보기</button>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ item }) {
  const AccessIcon = item.access.tone === 'red' ? Lock : Users;

  return (
    <article className="result-row">
      <div className="result-icon-col">
        <DocIcon type={item.type} />
      </div>
      <div className="result-info-col">
        <div className="result-title">{item.title}</div>
        <div className="result-desc">{item.desc}</div>
      </div>
      <div className="result-meta-col">
        <div className="result-meta-val">{item.team}</div>
        <div className="result-meta-sub">{item.owner}</div>
      </div>
      <div className="result-meta-col">
        <div className="result-meta-label">{item.updatedLabel}</div>
        <div className="result-meta-val">{item.updatedAt}</div>
      </div>
      <div className="result-access-col">
        <div className="result-meta-label">{item.accessLabel}</div>
        <span className={`result-access-badge tone-${item.access.tone}`}>
          <AccessIcon size={13} strokeWidth={2.2} />
          <span>{item.access.label}</span>
        </span>
      </div>
      <div className="result-action-col">
        <button type="button" className="result-more-btn" aria-label="더보기">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </article>
  );
}

function ResultsHeader({ count }) {
  return (
    <div className="results-header">
      <div className="results-count">검색 결과 <strong>{count}개</strong></div>
      <div className="results-tools">
        <button type="button" className="results-sort">
          정확도순 <ChevronDown size={14} />
        </button>
        <div className="results-view-toggle">
          <button type="button" className="active" aria-label="리스트 보기"><List size={17} /></button>
          <button type="button" aria-label="그리드 보기"><Grid2x2 size={17} /></button>
        </div>
      </div>
    </div>
  );
}

function SearchPagination() {
  return (
    <nav className="pagination" aria-label="검색 결과 페이지네이션">
      <button type="button" className="pg-arrow" disabled aria-label="이전 페이지">
        <ChevronLeft size={15} />
      </button>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={`pg-num${n === 1 ? ' active' : ''}`}
          aria-current={n === 1 ? 'page' : undefined}
        >
          {n}
        </button>
      ))}
      <button type="button" className="pg-arrow" aria-label="다음 페이지">
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}

function AdminCard({ icon: Icon, title, children }) {
  return (
    <section className="admin-card">
      <header className="admin-card-head">
        <div className="admin-card-title">
          <Icon size={14} className="admin-card-icon" />
          <span>{title}</span>
        </div>
        <a href="#" className="admin-card-link">자세히 보기 <ChevronRight size={12} /></a>
      </header>
      <div className="admin-card-body">{children}</div>
    </section>
  );
}

function RoleSummaryCard() {
  const roles = [
    { label: '관리자', value: 12 },
    { label: '편집자', value: 48 },
    { label: '뷰어', value: 126 },
    { label: '외부', value: 8 },
  ];
  return (
    <AdminCard icon={Users} title="역할 요약">
      <div className="admin-stat-grid">
        {roles.map((r) => (
          <div key={r.label} className="admin-stat-cell">
            <div className="admin-stat-text">
              <div className="admin-stat-label">{r.label}</div>
              <div className="admin-stat-value">{r.value}</div>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}

function PermissionPolicyCard() {
  const policies = [
    '기밀 문서 외부 공유 제한',
    '재무 데이터 열람 팀 제한',
    '개인정보 문서 마스킹',
    '문서 다운로드 워터마크',
  ];
  return (
    <AdminCard icon={ShieldCheck} title="권한 정책">
      <ul className="policy-list">
        {policies.map((p) => (
          <li key={p}>
            <span className="policy-text">{p}</span>
            <span className="policy-status">활성</span>
          </li>
        ))}
      </ul>
    </AdminCard>
  );
}

function RecentActivityCard() {
  const activities = [
    { who: '이도훈', what: '하반기 캠페인 예산 집행 계획서.xlsx 업데이트', time: '5분 전', Icon: RefreshCw },
    { who: '김지연', what: '브랜드 리포지셔닝 자료 마케팅팀 공유', time: '25분 전', Icon: Share2 },
    { who: '정유나', what: '파트너십 실행안 템플릿 생성', time: '1시간 전', Icon: LayoutTemplate },
    { who: '관리자', what: '재무 문서 권한 정책 변경', time: '3시간 전', Icon: Settings },
  ];
  return (
    <AdminCard icon={Activity} title="최근 활동">
      <ul className="activity-list">
        {activities.map((a, i) => (
          <li key={i}>
            <span className="activity-icon" aria-hidden="true">
              <a.Icon size={13} strokeWidth={2} />
            </span>
            <div className="activity-text">
              <strong>{a.who}</strong> {a.what}
            </div>
            <span className="activity-time">{a.time}</span>
          </li>
        ))}
      </ul>
    </AdminCard>
  );
}

function TemplateStatusCard() {
  const items = [
    { label: '보고서', value: 18, updatedAt: '2024.05.01' },
    { label: '제안서', value: 12, updatedAt: '2024.04.29' },
    { label: '회의록', value: 8, updatedAt: '2024.04.26' },
  ];
  return (
    <AdminCard icon={FileText} title="템플릿 현황">
      <div className="template-grid">
        <div className="template-head template-label">템플릿 유형</div>
        <div className="template-head template-value">사용 중</div>
        <div className="template-head template-updated">최신 업데이트</div>
        {items.map((t) => (
          <Fragment key={t.label}>
            <div className="template-label">{t.label}</div>
            <div className="template-value">{t.value}</div>
            <div className="template-updated">{t.updatedAt}</div>
          </Fragment>
        ))}
      </div>
    </AdminCard>
  );
}

function StorageUsageCard() {
  const percent = 68;
  return (
    <AdminCard icon={HardDrive} title="저장소 및 사용량">
      <div className="storage-row">
        <div className="storage-percent">{percent}%</div>
        <div className="storage-amount">1.36 TB / 2 TB</div>
      </div>
      <div className="storage-bar">
        <div className="storage-bar-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </AdminCard>
  );
}

function Search() {
  const [filterValues, setFilterValues] = useState({
    documentType: '',
    team: '',
    period: '',
  });
  const typeLabels = {
    docx: '문서',
    xlsx: '스프레드시트',
    pptx: '프레젠테이션',
    pdf: 'PDF',
  };
  const filteredResults = results.filter((result) => {
    const matchesType = !filterValues.documentType || typeLabels[result.type] === filterValues.documentType;
    const matchesTeam = !filterValues.team || result.team === filterValues.team;

    return matchesType && matchesTeam;
  });
  const handleFilterChange = (key, nextValue) => {
    setFilterValues((current) => ({
      ...current,
      [key]: nextValue,
    }));
  };
  const handleResetFilters = () => {
    setFilterValues({ documentType: '', team: '', period: '' });
  };

  return (
    <div className="page-content search-page">
      <div className="search-grid">
        <div className="search-main">
          <FilterBar filterValues={filterValues} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
          <AiSummaryCard />
          <div className="results-section">
            <ResultsHeader count={filteredResults.length} />
            <div className="result-list">
              {filteredResults.map((r, i) => <ResultRow key={i} item={r} />)}
            </div>
            <SearchPagination />
          </div>
        </div>

        <aside className="search-admin">
          <h2 className="search-admin-title">회사 지식 운영 현황</h2>
          <RoleSummaryCard />
          <PermissionPolicyCard />
          <RecentActivityCard />
          <TemplateStatusCard />
          <StorageUsageCard />
        </aside>
      </div>
    </div>
  );
}

export default Search;
