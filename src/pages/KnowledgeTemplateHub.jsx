import { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Folder,
  MoreHorizontal,
  MoveRight,
  Plus,
  Search,
  Settings,
  Sparkles,
  Tag,
  Trash2,
  Users,
} from 'lucide-react';
import './KnowledgeTemplateHub.css';

const folderGroups = [
  {
    name: '회사 기본 문서',
    count: 63,
    children: [
      ['회사 소개', 12],
      ['비전/전략', 8],
      ['조직/정책', 15],
      ['규정/컴플라이언스', 10],
      ['재무/IR', 9],
      ['인사/총무', 9],
    ],
  },
  {
    name: '업무 가이드',
    count: 102,
    children: [
      ['마케팅', 28],
      ['영업', 24],
      ['제품/서비스', 18],
      ['IT/보안', 16],
      ['운영/지원', 16],
    ],
  },
  {
    name: '프로젝트/사례',
    count: 76,
    children: [],
  },
  {
    name: '참고 자료',
    count: 88,
    children: [],
  },
];

const templateCards = [
  ['doc', '보고서 템플릿', 'v2.1', '마케팅팀', '주간/월간/분기 보고서 작성용 템플릿', 128],
  ['sheet', '회의록 템플릿', 'v1.8', '경영지원팀', '회의 기록 및 후속 조치 템플릿', 96],
  ['slide', '제안서 템플릿', 'v2.0', '영업팀', '고객 제안서 작성 템플릿', 74],
  ['guide', 'SOP 템플릿', 'v1.6', '운영팀', '업무 절차 표준 문서 템플릿', 53],
];

const documents = [
  ['doc', '2024년 하반기 마케팅 전략 보고서', '보고서', '마케팅팀', 'v2.3', '2024.05.16', 24, '승인', 'approved'],
  ['sheet', '브랜드 가이드라인 v3.0', '가이드', '마케팅팀', 'v3.0', '2024.05.10', 18, '승인', 'approved'],
  ['sheet', '인사 제도 운영 지침', '정책', '인사팀', 'v1.7', '2024.05.08', 12, '승인', 'approved'],
  ['sheet', '정보보안 관리 규정', '정책', 'IT보안팀', 'v2.1', '2024.05.06', 9, '승인', 'approved'],
  ['pdf', '영업 제안서 샘플 (SaaS)', '템플릿', '영업팀', 'v1.5', '2024.05.03', 31, '검토 필요', 'review'],
];

function TypeIcon({ type }) {
  const iconMap = {
    doc: 'docx',
    sheet: 'xlsx',
    slide: 'pptx',
    guide: 'docx',
    pdf: 'pdf',
  };

  return (
    <img
      className="knowledge-type-icon-img"
      src={`/document-icons/ref-icon-${iconMap[type] ?? 'docx'}.png`}
      alt=""
      aria-hidden="true"
    />
  );
}

function KnowledgeTemplateHub() {
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(['회사 기본 문서']));
  const [selectedDocumentTitle, setSelectedDocumentTitle] = useState(null);
  const selectedDocument = documents.find((document) => document[1] === selectedDocumentTitle);

  const handleToggleGroup = (groupName) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  };

  return (
    <div className="page-content knowledge-page">
      <div className="knowledge-main">
        <section className="knowledge-workspace">
          <header className="knowledge-header">
            <div>
              <h1 className="page-title">지식 허브</h1>
              <p className="page-subtitle">회사 지식 자산을 체계적으로 관리하고 AI가 활용하도록 준비하세요.</p>
            </div>
            <div className="knowledge-header-actions">
              <button type="button" className="knowledge-outline-button">
                <Settings size={15} />
                <span>분류 규칙 설정</span>
              </button>
              <button type="button" className="btn-new-document knowledge-new-button">
                <div className="btn-new-main">
                  <Plus size={16} strokeWidth={2.5} />
                  <span>새로 추가</span>
                </div>
                <div className="btn-new-split"></div>
                <div className="btn-new-icon">
                  <ChevronDown size={14} strokeWidth={3} />
                </div>
              </button>
            </div>
          </header>

          <nav className="knowledge-tabs" aria-label="지식 허브 탭">
            <button type="button" className="active">지식 문서함</button>
            <button type="button">회사 자료실</button>
            <button type="button">템플릿</button>
            <button type="button">분류 규칙</button>
          </nav>

          <div className="knowledge-content-grid">
            <aside className="knowledge-left">
              <section className="knowledge-panel knowledge-tree-panel">
                <header className="knowledge-panel-head">
                  <strong>분류 체계</strong>
                  <div>
                    <button type="button" aria-label="분류 추가"><Plus size={14} /></button>
                    <button type="button" aria-label="분류 메뉴"><MoreHorizontal size={15} /></button>
                  </div>
                </header>

                <div className="knowledge-tree-root">
                  <div className="knowledge-tree-active">
                    <span className="knowledge-folder-mark all">
                      <BookOpen size={13} />
                    </span>
                    <span>전체</span>
                    <span>428</span>
                  </div>
                  {folderGroups.map((group) => (
                    <div className="knowledge-tree-group" key={group.name}>
                      <button
                        type="button"
                        className="knowledge-tree-row"
                        aria-expanded={expandedGroups.has(group.name)}
                        onClick={() => handleToggleGroup(group.name)}
                      >
                        {expandedGroups.has(group.name) ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        <Folder size={14} />
                        <strong>{group.name}</strong>
                        <span>{group.count}</span>
                      </button>
                      {group.children.length > 0 && expandedGroups.has(group.name) && (
                        <div className="knowledge-tree-children">
                          {group.children.map(([name, count]) => (
                            <div className="knowledge-tree-child" key={name}>
                              <Folder size={13} />
                              <span>{name}</span>
                              <em>{count}</em>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="knowledge-tree-row muted">
                    <Trash2 size={14} />
                    <strong>휴지통</strong>
                    <span>3</span>
                  </div>
                </div>
              </section>

              <section className="knowledge-panel knowledge-tags-panel">
                <header className="knowledge-panel-head">
                  <strong>태그</strong>
                  <div>
                    <button type="button" aria-label="태그 추가"><Plus size={14} /></button>
                    <button type="button" aria-label="태그 메뉴"><MoreHorizontal size={15} /></button>
                  </div>
                </header>
                <div className="knowledge-tag-list">
                  <span>재무 <em>18</em></span>
                  <span>마케팅 <em>32</em></span>
                  <span>SOP <em>23</em></span>
                  <span>정책 <em>15</em></span>
                  <span>템플릿 <em>41</em></span>
                </div>
                <button type="button" className="knowledge-more-link">+ 태그 더보기</button>
              </section>
            </aside>

            <section className="knowledge-center">
              <div className="knowledge-filter-row">
                <label className="knowledge-search">
                  <Search size={15} />
                  <input type="text" placeholder="현재 분류 검색" />
                </label>
                <div className="filter-bar knowledge-filter-pills">
                  <button type="button" className="filter-pill">
                    <span className="filter-pill-label">문서 유형</span>
                    <span className="filter-pill-value">전체</span>
                    <ChevronDown size={14} />
                  </button>
                  <button type="button" className="filter-pill">
                    <span className="filter-pill-label">소유 팀</span>
                    <span className="filter-pill-value">전체</span>
                    <ChevronDown size={14} />
                  </button>
                  <button type="button" className="filter-pill">
                    <span className="filter-pill-label">AI 참고 가능</span>
                    <span className="filter-pill-value">전체</span>
                    <ChevronDown size={14} />
                  </button>
                  <button type="button" className="filter-reset">
                    필터 초기화
                  </button>
                </div>
              </div>

              <section className="knowledge-quick-start">
                <header>
                  <h2>템플릿 빠른 시작</h2>
                  <button type="button">모두 보기</button>
                </header>
                <div className="knowledge-template-row">
                  {templateCards.map(([type, title, version, team, desc, uses]) => (
                    <article className="knowledge-template-card" key={title}>
                      <div className="knowledge-template-top">
                        <TypeIcon type={type} />
                        <div>
                          <strong>{title}</strong>
                          <div>
                            <span>{version}</span>
                            <Users size={12} />
                            <em>{team}</em>
                          </div>
                        </div>
                      </div>
                      <p>{desc}</p>
                      <footer>
                        <span>AI 참고 가능</span>
                        <small>사용 횟수 <b>{uses}</b></small>
                      </footer>
                    </article>
                  ))}
                  <button type="button" className="knowledge-template-next" aria-label="다음 템플릿">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </section>

              <section className="knowledge-table-panel">
                <header className="knowledge-table-toolbar">
                  <strong>문서 목록 <span>428개</span></strong>
                  <div>
                    <button type="button"><Download size={14} />다운로드</button>
                    <button type="button"><MoveRight size={14} />이동</button>
                    <button type="button"><Copy size={14} />복사</button>
                    <button type="button"><Tag size={14} />태그</button>
                    <button type="button"><Sparkles size={14} />AI 색인 실행</button>
                  </div>
                </header>

                <div className="knowledge-table">
                  <div className="knowledge-table-head">
                    <span><input type="checkbox" aria-label="전체 선택" /></span>
                    <span>이름</span>
                    <span>유형</span>
                    <span>소유 팀</span>
                    <span>버전</span>
                    <span>AI 참고</span>
                    <span>최신 업데이트</span>
                    <span>사용 횟수</span>
                    <span>승인 상태</span>
                  </div>
                  {documents.map(([type, title, docType, team, version, date, uses, status, statusTone]) => {
                    const isSelected = selectedDocumentTitle === title;

                    return (
                    <article
                      className={`knowledge-table-row${isSelected ? ' is-selected' : ''}`}
                      key={title}
                      onClick={() => setSelectedDocumentTitle(title)}
                    >
                      <span>
                        <input
                          type="checkbox"
                          aria-label={`${title} 선택`}
                          checked={isSelected}
                          onChange={() => setSelectedDocumentTitle(isSelected ? null : title)}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </span>
                      <span className="knowledge-doc-name">
                        <TypeIcon type={type} />
                        <span>
                          <strong>{title}</strong>
                          <em>마케팅 &gt; 보고</em>
                        </span>
                      </span>
                      <span>{docType}</span>
                      <span>{team}</span>
                      <span>{version}</span>
                      <span><mark>AI 참고 가능</mark></span>
                      <span>{date}</span>
                      <span>{uses}</span>
                      <span><b className={`knowledge-status ${statusTone}`}>{status}</b></span>
                    </article>
                    );
                  })}
                </div>

                <footer className="knowledge-pagination">
                  <div className="knowledge-pagination-summary">1-5 / 총 428개</div>
                  <nav className="knowledge-page-nav" aria-label="지식 문서 목록 페이지네이션">
                    <button type="button" className="page-arrow" aria-label="이전 페이지" disabled>
                      <ChevronRight size={15} />
                    </button>
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={page === 1 ? 'active' : ''}
                        aria-current={page === 1 ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                    <button type="button" className="page-arrow" aria-label="다음 페이지">
                      <ChevronRight size={15} />
                    </button>
                  </nav>
                  <button type="button" className="knowledge-page-size">
                    5개씩 보기 <ChevronDown size={13} />
                  </button>
                </footer>
              </section>
            </section>
          </div>
        </section>

        <aside className="knowledge-right">
          <section className="knowledge-inspector">
            <header>
              <h2>선택한 항목 정보</h2>
              <button type="button">자세히 보기</button>
            </header>
            {selectedDocument ? (
              <>
                <div className="knowledge-selected-doc">
                  <TypeIcon type={selectedDocument[0]} />
                  <div>
                    <strong>{selectedDocument[1]}</strong>
                    <span>{selectedDocument[3]} &gt; {selectedDocument[2]}</span>
                  </div>
                </div>
                <dl className="knowledge-info-list">
                  <div><dt>버전</dt><dd>{selectedDocument[4]} (최신)</dd></div>
                  <div><dt>소유 팀</dt><dd>{selectedDocument[3]}</dd></div>
                  <div><dt>소유자</dt><dd><span className="knowledge-avatar">MJ</span> 김민지</dd></div>
                  <div><dt>최신 업데이트</dt><dd>{selectedDocument[5]} 10:35</dd></div>
                  <div><dt>크기</dt><dd>2.4 MB</dd></div>
                  <div><dt>권한 상속</dt><dd>{selectedDocument[3]} (편집 가능)</dd></div>
                </dl>
                <button type="button" className="knowledge-wide-button">권한 관리</button>
              </>
            ) : (
              <div className="knowledge-inspector-empty">
                <FileText size={20} />
                <strong>문서를 선택하세요</strong>
                <p>문서 목록에서 항목을 선택하면 버전, 소유 팀, 권한 정보를 확인할 수 있습니다.</p>
              </div>
            )}
          </section>

          <section className="knowledge-side-card">
            <header>
              <h2>데이터 품질</h2>
              <button type="button">자세히 보기</button>
            </header>
            {[
              ['색인 상태', '정상', 'ok'],
              ['AI 참고 가능', '가능', 'ok'],
              ['권한 경계 준수', '준수', 'ok'],
              ['중복 문서', '없음', 'ok'],
              ['만료 문서', '2개', 'warn'],
            ].map(([label, value, tone]) => (
              <div className="knowledge-quality-row" key={label}>
                {tone === 'ok' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                <span>{label}</span>
                <strong>{value}</strong>
                <ChevronRight size={14} />
              </div>
            ))}
          </section>

          <section className="knowledge-side-card">
            <header>
              <h2>품질 알림</h2>
            </header>
            {[
              ['검토 필요 문서 8개', '검토 및 승인 필요'],
              ['색인 실패 문서 2개', '재색인 실행 권장'],
              ['만료 예정 문서 3개', '30일 이내 만료 예정'],
            ].map(([title, desc]) => (
              <div className="knowledge-alert-row" key={title}>
                <AlertTriangle size={15} />
                <span><strong>{title}</strong><em>{desc}</em></span>
                <ChevronRight size={14} />
              </div>
            ))}
          </section>

          <section className="knowledge-side-card knowledge-ai-usage-card">
            <header>
              <h2>AI 활용 현황 <span>(최근 30일)</span></h2>
              <button type="button">자세히 보기</button>
            </header>
            <dl className="knowledge-ai-stats">
              <div><dt>참조된 문서</dt><dd>156개</dd></div>
              <div><dt>생성된 문서</dt><dd>82개</dd></div>
              <div><dt>절약 시간</dt><dd>32시간</dd></div>
            </dl>
          </section>
        </aside>
      </div>

    </div>
  );
}

export default KnowledgeTemplateHub;
