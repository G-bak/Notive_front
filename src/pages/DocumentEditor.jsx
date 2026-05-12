import { useState } from 'react';
import {
  ChevronRight, Star, ChevronDown, Plus,
  Bold, Italic, Underline, Strikethrough, Baseline, PaintBucket, PenLine,
  TextAlignStart, List, ListOrdered,
  Table as TableIcon, Image as ImageIcon, Link as LinkIcon, CheckSquare, SquareCheckBig, MoreHorizontal,
  TrendingUp, Target, DollarSign, Zap, ArrowUp,
  Users, FileText, AlertTriangle, ChevronUp, Sparkles, Building2,
  Send, Wand2, ShieldCheck, BookOpen, Copy, RotateCcw, Pencil, ArrowRight,
  History, Share2, Tag as TagIcon, GitBranch
} from 'lucide-react';
import './DocumentEditor.css';

const tags = ['마케팅', '분기보고', '성과분석'];

const kpis = [
  { label: '누적 매출', value: '18,723', sub: '백만 원', delta: '+12.4%', deltaTone: 'up', Icon: TrendingUp, iconTone: 'green' },
  { label: 'ROAS', value: '4.38', sub: '배', delta: '+0.7p', deltaTone: 'up', Icon: Target, iconTone: 'blue' },
  { label: '광고비', value: '₩128,450,000', sub: '집행 완료', delta: '+8.1%', deltaTone: 'up', Icon: DollarSign, iconTone: 'orange' },
  { label: '전환율', value: '31.2%', sub: '리드 → 고객', delta: '+2.3p', deltaTone: 'up', Icon: Zap, iconTone: 'purple' },
];

const channelRows = [
  { channel: '검색 광고', spend: '₩48,200,000', revenue: '₩228,300,000', roas: '4.74' },
  { channel: '디스플레이', spend: '₩32,150,000', revenue: '₩119,800,000', roas: '3.73' },
  { channel: '소셜 미디어', spend: '₩28,400,000', revenue: '₩142,560,000', roas: '5.02' },
  { channel: '제휴 마케팅', spend: '₩19,700,000', revenue: '₩72,440,000', roas: '3.68' },
];

function Breadcrumb() {
  return (
    <div className="doc-breadcrumb">
      <span>문서</span>
      <ChevronRight size={12} />
      <span>마케팅</span>
      <ChevronRight size={12} />
      <span>보고서</span>
      <ChevronRight size={12} />
      <span className="active">2024년 2분기 마케팅 성과 보고서</span>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="doc-title-bar">
      <h1 className="doc-title">2024년 2분기 마케팅 성과 보고서</h1>
      <button type="button" className="doc-title-star" aria-label="즐겨찾기">
        <Star size={18} />
      </button>
    </div>
  );
}

function MetaChips() {
  return (
    <div className="doc-meta-chips">
      <button type="button" className="meta-chip meta-chip-type">
        <FileText size={12} />
        <span>보고서</span>
        <ChevronDown size={12} />
      </button>
      <div className="meta-chip meta-chip-author">
        <span className="meta-avatar">MJ</span>
        <span>김민지</span>
      </div>
      <div className="meta-chip meta-chip-time">수정 2분 전</div>
      <div className="meta-tag-group">
        {tags.map((t) => (
          <span key={t} className="meta-tag">{t}</span>
        ))}
        <button type="button" className="meta-tag-add" aria-label="태그 추가">
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

function EditorToolbar() {
  return (
    <div className="doc-toolbar">
      <button type="button" className="tb-select">본문 <ChevronDown size={12} /></button>
      <button type="button" className="tb-select">16 <ChevronDown size={12} /></button>
      <div className="tb-divider" />
      <button type="button" className="tb-icon" aria-label="굵게"><Bold size={15} /></button>
      <button type="button" className="tb-icon" aria-label="기울임"><Italic size={15} /></button>
      <button type="button" className="tb-icon" aria-label="밑줄"><Underline size={15} /></button>
      <button type="button" className="tb-icon" aria-label="취소선"><Strikethrough size={15} /></button>
      <button type="button" className="tb-icon" aria-label="글자색"><Baseline size={15} /></button>
      <button type="button" className="tb-icon" aria-label="채우기 색"><PaintBucket size={15} /></button>
      <button type="button" className="tb-icon" aria-label="펜"><PenLine size={15} /></button>
      <div className="tb-divider" />
      <button type="button" className="tb-icon" aria-label="정렬"><TextAlignStart size={15} /></button>
      <button type="button" className="tb-icon" aria-label="글머리 기호"><List size={15} /></button>
      <button type="button" className="tb-icon" aria-label="번호 매기기"><ListOrdered size={15} /></button>
      <button type="button" className="tb-icon" aria-label="체크리스트"><CheckSquare size={15} /></button>
      <div className="tb-divider" />
      <button type="button" className="tb-icon" aria-label="표"><TableIcon size={15} /></button>
      <button type="button" className="tb-icon" aria-label="이미지"><ImageIcon size={15} /></button>
      <button type="button" className="tb-icon" aria-label="링크"><LinkIcon size={15} /></button>
      <button type="button" className="tb-icon" aria-label="체크박스"><CheckSquare size={15} /></button>
      <button type="button" className="tb-icon" aria-label="완료 체크"><SquareCheckBig size={15} /></button>
      <div className="tb-divider" />
      <button type="button" className="tb-icon" aria-label="더보기"><MoreHorizontal size={15} /></button>
    </div>
  );
}

function KpiCards() {
  return (
    <div className="kpi-grid">
      {kpis.map((k) => (
        <div key={k.label} className="kpi-card">
          <div className="kpi-card-head">
            <div className={`kpi-icon tone-${k.iconTone}`}>
              <k.Icon size={14} />
            </div>
            <span className="kpi-label">{k.label}</span>
          </div>
          <div className="kpi-value">{k.value}</div>
          <div className="kpi-meta">
            <span className="kpi-sub">{k.sub}</span>
            <span className={`kpi-delta tone-${k.deltaTone}`}>
              <ArrowUp size={10} strokeWidth={3} />
              {k.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChannelTable() {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        <thead>
          <tr>
            <th>채널</th>
            <th>광고비</th>
            <th>매출</th>
            <th>ROAS</th>
          </tr>
        </thead>
        <tbody>
          {channelRows.map((r) => (
            <tr key={r.channel}>
              <td>{r.channel}</td>
              <td>{r.spend}</td>
              <td>{r.revenue}</td>
              <td><span className="table-num">{r.roas}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocumentCanvas() {
  return (
    <div className="doc-canvas-wrap">
      <Breadcrumb />
      <TitleBar />
      <MetaChips />
      <div className="doc-editor-shell">
        <EditorToolbar />
        <article className="doc-canvas">
          <section>
            <h2 className="doc-h2">1. 요약</h2>
            <p className="doc-p">
              2024년 2분기 마케팅 캠페인은 <strong>브랜드 인지도 강화</strong>와 <strong>리드 전환율 개선</strong>에 집중하여 진행되었습니다.
              누적 매출은 187억 2,300만 원으로 전 분기 대비 12.4% 증가했으며, ROAS는 4.38배로 0.7p 개선되었습니다.
              전환율은 31.2%까지 상승하여 마케팅 자동화 도입 효과가 가시화된 분기였습니다.
            </p>
            <KpiCards />
          </section>

          <section>
            <h2 className="doc-h2">2. 채널별 성과</h2>
            <p className="doc-p">
              유료 검색과 소셜 미디어가 전체 매출 견인에 가장 크게 기여했으며,
              제휴 마케팅은 단가 상승으로 효율 개선이 필요한 영역으로 확인되었습니다.
            </p>
            <ChannelTable />
          </section>

          <section>
            <h2 className="doc-h2">3. 주요 캠페인 성과</h2>
            <p className="doc-p">
              <strong>여름 시즌 한정 프로모션</strong>은 이메일·SNS 통합 캠페인으로 진행되어 신규 가입자 14% 증가, 평균 객단가 22% 상승을 기록했습니다.
              <strong>B2B 콘텐츠 시리즈</strong>는 평균 체류시간 2분 41초, 다운로드 전환율 18.6%로 목표 대비 124% 달성했습니다.
              <strong>리타겟팅 디스플레이</strong>는 노출 단가를 18% 절감하면서 클릭당 비용 22% 감소를 동반했습니다.
            </p>
          </section>
        </article>
      </div>
      <div className="doc-status-bar" aria-label="문서 상태">
        <span>글자 2,345</span>
        <span className="doc-status-separator">·</span>
        <span>이미지 12</span>
        <span className="doc-status-separator">·</span>
        <span>표 8</span>
        <span className="doc-status-separator">·</span>
        <span>페이지 8</span>
      </div>
    </div>
  );
}

function InspectorTabs({ value, onChange }) {
  const tabs = [
    { id: 'properties', label: '속성' },
    { id: 'ai', label: 'AI 어시스턴트' },
    { id: 'activity', label: '활동' },
  ];
  return (
    <div className="ins-tabs">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`ins-tab${value === t.id ? ' active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function InspectorSection({ title, children, defaultOpen = true }) {
  return (
    <section className="ins-section">
      <header className="ins-section-head">
        <span className="ins-section-title">{title}</span>
        {defaultOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </header>
      <div className="ins-section-body">{children}</div>
    </section>
  );
}

function ShareSection() {
  return (
    <InspectorSection title="공유">
      <div className="ins-row ins-row-share-scope">
        <span className="ins-row-label">공유 범위</span>
        <button type="button" className="ins-share-select">
          <span className="ins-share-select-icon">
            <Building2 size={14} />
          </span>
          <span className="ins-share-select-text">
            <strong>ACME 주식회사 전체</strong>
            <span>링크가 있는 모든 구성원</span>
          </span>
          <ChevronDown size={14} />
        </button>
      </div>
      <div className="ins-row">
        <span className="ins-row-label">소유자</span>
        <div className="ins-person">
          <span className="ins-avatar tone-muted">MJ</span>
          <span className="ins-person-text">
            <strong>김민지 (나)</strong>
            <span>마케팅팀</span>
          </span>
        </div>
      </div>
      <div className="ins-row ins-row-groups">
        <span className="ins-row-label">공유 중인 팀/그룹</span>
        <div className="ins-group-list">
          <div className="ins-group-row">
            <span className="ins-avatar tone-muted">AB</span>
            <span className="ins-group-name">마케팅팀</span>
            <span className="ins-group-count">12명</span>
          </div>
          <div className="ins-group-row">
            <span className="ins-avatar tone-muted">AB</span>
            <span className="ins-group-name">경영진</span>
            <span className="ins-group-count">5명</span>
          </div>
        </div>
      </div>
      <button type="button" className="ins-add-btn">
        <Plus size={12} />
        <span>팀/그룹 추가</span>
      </button>
    </InspectorSection>
  );
}

function TagSection() {
  return (
    <InspectorSection title="태그">
      <div className="ins-tag-list">
        {tags.map((t) => <span key={t} className="ins-tag">{t}</span>)}
        <button type="button" className="ins-tag-add" aria-label="태그 추가"><Plus size={12} /></button>
      </div>
    </InspectorSection>
  );
}

function VersionSection() {
  const versions = [
    { v: 'v1.2', label: '현재', author: '김민지', time: '2분 전', current: true },
    { v: 'v1.1', label: '편집', author: '김민지', time: '1시간 전', current: false },
    { v: 'v1.0', label: '최초 작성', author: '김민지', time: '어제', current: false },
  ];
  return (
    <InspectorSection title="버전 기록">
      <ul className="version-list">
        {versions.map((v) => (
          <li key={v.v} className={v.current ? 'is-current' : ''}>
            <div className="version-dot" />
            <div className="version-text">
              <strong>{v.v}</strong>
              <span>{v.label}</span>
            </div>
            <span className="version-author">{v.author}</span>
            <span className="version-time">{v.time}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="ins-link-btn">모든 버전 보기 (3) <ChevronRight size={12} /></button>
    </InspectorSection>
  );
}

function AiInfoSection() {
  return (
    <InspectorSection title="AI 생성 정보">
      <div className="ai-info-row">
        <span className="ai-info-label">생성 일시</span>
        <span className="ai-info-val">2024.05.21 14:32</span>
      </div>
      <div className="ai-info-row">
        <span className="ai-info-label">생성자</span>
        <span className="ai-info-val">Notive AI</span>
      </div>
      <div className="ai-info-row">
        <span className="ai-info-label">참고 컨텍스트</span>
        <span className="ai-info-val">회의록 3개, 보고서 22개, 데이터 4개</span>
      </div>
      <button type="button" className="ins-link-btn ai-info-link">프롬프트 및 컨텍스트 보기 <ChevronRight size={12} /></button>
    </InspectorSection>
  );
}

function ReferenceSourcesSection() {
  const refs = [
    { type: 'docx', title: '2024년 2분기 마케팅 전략 회의록', category: '회의록' },
    { type: 'docx', title: '1분기 마케팅 성과 보고서', category: '보고서' },
    { type: 'xlsx', title: '마케팅 캠페인 성과 데이터 (Q2)', category: '데이터' },
  ];
  return (
    <InspectorSection title="참조 출처">
      <ul className="ref-source-list">
        {refs.map((r) => (
          <li key={r.title}>
            <span className="ref-source-main">
              <img className="ref-source-icon" src={`/document-icons/ref-icon-${r.type}.png`} alt="" aria-hidden="true" />
              <span className="ref-source-title">{r.title}</span>
            </span>
            <span className="ref-source-category">{r.category}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="ins-link-btn">+ 3개 더 보기</button>
    </InspectorSection>
  );
}

function SensitiveWarningBox() {
  return (
    <div className="sensitive-warn">
      <div className="sensitive-warn-head">
        <AlertTriangle size={14} />
        <span>외부 공유 시 주의</span>
      </div>
      <p>이 문서는 매출·광고비 등 민감 정보를 포함합니다. 외부 공유 전 민감 정보 검사를 권장합니다.</p>
      <button type="button" className="sensitive-warn-btn">민감 정보 검사</button>
    </div>
  );
}

function PropertiesPanel() {
  return (
    <>
      <ShareSection />
      <TagSection />
      <VersionSection />
      <AiInfoSection />
      <ReferenceSourcesSection />
      <SensitiveWarningBox />
    </>
  );
}

const aiQuickActions = [
  { label: '요약하기', Icon: FileText },
  { label: '문체 다듬기', Icon: Wand2 },
  { label: '이어쓰기', Icon: PenLine },
  { label: '표로 정리', Icon: TableIcon },
  { label: '확인 필요 항목', Icon: AlertTriangle },
  { label: '액션 아이템 추출', Icon: CheckSquare },
  { label: '참고 자료 보강', Icon: BookOpen },
  { label: '민감 정보 점검', Icon: ShieldCheck },
];

const aiExampleChips = [
  '임원 보고용으로 줄여줘',
  '다음 분기 실행 계획을 추가해줘',
  '근거 없는 수치를 표시해줘',
];

const aiSources = [
  { type: '현재 문서', title: '2024년 2분기 마케팅 성과 보고서', date: '2분 전', active: true },
  { type: '참조 문서', title: '2024년 2분기 마케팅 전략 회의록', date: '5월 14일', active: true },
  { type: '참조 문서', title: '1분기 마케팅 성과 보고서', date: '4월 3일', active: true },
  { type: '업무 다이어리', title: '캠페인 진행 메모 5건', date: '이번 주', active: false },
  { type: 'To-do', title: '리드 전환 개선 액션 2건', date: '미완료', active: false },
];

function AiAssistantPanel() {
  return (
    <>
      <section className="ins-section ai-context-section">
        <div className="ai-context-card">
          <div className="ai-context-head">
            <span className="ai-context-icon"><Sparkles size={14} /></span>
            <div className="ai-context-title">
              <strong>이 문서를 바탕으로 도와드려요</strong>
              <span>현재 문서, 참조 문서 3, 업무 기록 일부를 참고합니다</span>
            </div>
          </div>
          <div className="ai-context-grid">
            <div className="ai-context-item">
              <span>문서 유형</span>
              <strong>보고서</strong>
            </div>
            <div className="ai-context-item">
              <span>컨텍스트</span>
              <strong>현재 문서 + 참조 3</strong>
            </div>
          </div>
          <div className="ai-context-note">
            <ShieldCheck size={11} />
            <span>접근 가능한 자료만 AI가 사용합니다</span>
          </div>
        </div>
      </section>

      <section className="ins-section">
        <header className="ins-section-head">
          <span className="ins-section-title">빠른 작업</span>
        </header>
        <div className="ai-quick-grid">
          {aiQuickActions.map((a) => (
            <button key={a.label} type="button" className="ai-quick-btn">
              <a.Icon size={13} />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ins-section">
        <header className="ins-section-head">
          <span className="ins-section-title">요청 입력</span>
        </header>
        <div className="ai-prompt-box">
          <textarea
            className="ai-prompt-input"
            placeholder="이 문서를 바탕으로 요청해보세요"
            rows={3}
          />
          <div className="ai-prompt-foot">
            <span className="ai-prompt-meta">현재 문서 컨텍스트 사용</span>
            <button type="button" className="ai-prompt-send">
              <Send size={11} />
              <span>보내기</span>
            </button>
          </div>
        </div>
        <div className="ai-example-chips">
          {aiExampleChips.map((c) => (
            <button key={c} type="button" className="ai-example-chip">{c}</button>
          ))}
        </div>
      </section>

      <section className="ins-section">
        <header className="ins-section-head">
          <span className="ins-section-title">참고 자료</span>
          <span className="ai-source-count">{aiSources.filter((s) => s.active).length} / {aiSources.length} 선택</span>
        </header>
        <ul className="ai-source-list">
          {aiSources.map((s) => (
            <li key={s.title} className={s.active ? 'is-active' : ''}>
              <span className="ai-source-toggle" aria-hidden="true" />
              <span className="ai-source-main">
                <span className="ai-source-type">{s.type}</span>
                <span className="ai-source-title">{s.title}</span>
              </span>
              <span className="ai-source-meta">
                <span>{s.date}</span>
                <button type="button" className="ai-source-open" aria-label="원문 열기">
                  <ChevronRight size={12} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ins-section">
        <header className="ins-section-head">
          <span className="ins-section-title">최근 결과</span>
          <span className="ai-result-time">방금 전</span>
        </header>
        <div className="ai-result-card">
          <div className="ai-result-body">
            <p>
              2분기 마케팅 성과는 누적 매출 187억 원, ROAS 4.38배, 전환율 31.2%로 세 지표 모두
              목표를 상회했습니다. 검색과 소셜 채널이 매출을 견인했고, 제휴 마케팅은 단가 상승으로
              효율 개선이 필요합니다.
            </p>
            <p className="ai-result-bullet">
              <strong>확인 필요</strong> 매출 수치(187억 vs 188.2억)가 두 출처에서 다르게 표기됩니다.
            </p>
          </div>
          <div className="ai-result-sources">
            <span className="ai-result-sources-title">출처</span>
            <ul>
              <li>2024년 2분기 마케팅 전략 회의록</li>
              <li>마케팅 캠페인 성과 데이터 (Q2)</li>
            </ul>
          </div>
          <div className="ai-result-actions">
            <button type="button" className="ai-action-primary">
              <ArrowRight size={12} />
              <span>삽입</span>
            </button>
            <button type="button" className="ai-action-ghost">선택 영역 교체</button>
            <span className="ai-action-spacer" />
            <button type="button" className="ai-action-icon" aria-label="복사"><Copy size={13} /></button>
            <button type="button" className="ai-action-icon" aria-label="재생성"><RotateCcw size={13} /></button>
            <button type="button" className="ai-action-icon" aria-label="요청 수정"><Pencil size={13} /></button>
          </div>
        </div>
        <p className="ai-result-note">
          AI 결과는 초안입니다. 검토 후 저장하거나 공유해주세요.
        </p>
      </section>
    </>
  );
}

const activityFilters = ['전체', '편집', '공유', 'AI', '버전'];

const activityEvents = [
  {
    Icon: Sparkles, tone: 'green',
    title: 'AI 결과 삽입',
    desc: '"3. 주요 캠페인 성과" 섹션에 보강 결과 삽입',
    author: '김민지', avatar: 'MJ', time: '2분 전',
    status: { label: '초안', tone: 'amber' },
  },
  {
    Icon: Pencil, tone: 'blue',
    title: '문서 수정',
    desc: '본문 3개 섹션 수정',
    author: '김민지', avatar: 'MJ', time: '5분 전',
  },
  {
    Icon: GitBranch, tone: 'purple',
    title: '버전 생성',
    desc: 'v1.2 자동 저장',
    author: 'Notive', avatar: 'NV', time: '1시간 전',
    action: '이 버전 보기',
  },
  {
    Icon: Share2, tone: 'orange',
    title: '공유 범위 변경',
    desc: '"마케팅팀 전용" → "ACME 주식회사 전체"',
    author: '김민지', avatar: 'MJ', time: '오전 10:42',
    status: { label: '주의', tone: 'amber' },
  },
  {
    Icon: TagIcon, tone: 'muted',
    title: '태그 변경',
    desc: '#성과분석 추가',
    author: '김민지', avatar: 'MJ', time: '오전 9:18',
  },
  {
    Icon: Users, tone: 'muted',
    title: '소유 팀 변경',
    desc: '기획팀 → 마케팅팀',
    author: '관리자', avatar: 'AD', time: '어제',
  },
  {
    Icon: History, tone: 'purple',
    title: '버전 복원',
    desc: 'v1.1 본문 일부를 v1.0 기준으로 복원',
    author: '김민지', avatar: 'MJ', time: '어제',
    action: '복원 내역 보기',
  },
  {
    Icon: FileText, tone: 'blue',
    title: '문서 생성',
    desc: 'AI 문서 생성 화면에서 시작',
    author: '김민지', avatar: 'MJ', time: '5월 18일',
  },
];

function ActivityPanel() {
  return (
    <>
      <section className="ins-section act-filter-section">
        <div className="act-filters">
          {activityFilters.map((f, i) => (
            <button key={f} type="button" className={`act-filter${i === 0 ? ' is-active' : ''}`}>{f}</button>
          ))}
        </div>
      </section>

      <section className="ins-section">
        <header className="ins-section-head">
          <span className="ins-section-title">활동 타임라인</span>
          <span className="act-count">{activityEvents.length}건</span>
        </header>
        <ol className="act-timeline">
          {activityEvents.map((e, i) => (
            <li key={i} className="act-item">
              <span className={`act-marker tone-${e.tone}`}>
                <e.Icon size={11} />
              </span>
              <div className="act-body">
                <div className="act-top">
                  <span className="act-title">{e.title}</span>
                  {e.status && <span className={`act-badge tone-${e.status.tone}`}>{e.status.label}</span>}
                </div>
                <p className="act-desc">{e.desc}</p>
                <div className="act-foot">
                  <span className="act-author">
                    <span className="ins-avatar tone-muted">{e.avatar}</span>
                    {e.author}
                  </span>
                  <span className="act-time">{e.time}</span>
                </div>
                {e.action && (
                  <button type="button" className="act-action">
                    <span>{e.action}</span>
                    <ChevronRight size={11} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="act-note">
        본문 변경 원문, AI 요청 내용, 검색어 원문은 활동 로그에 기록되지 않습니다.
      </p>
    </>
  );
}

function InspectorPanel() {
  const [tab, setTab] = useState('properties');
  return (
    <aside className="doc-inspector">
      <InspectorTabs value={tab} onChange={setTab} />
      <div className="doc-inspector-scroll" data-tab={tab}>
        {tab === 'properties' && <PropertiesPanel />}
        {tab === 'ai' && <AiAssistantPanel />}
        {tab === 'activity' && <ActivityPanel />}
      </div>
    </aside>
  );
}

function DocumentEditor() {
  return (
    <div className="page-content document-editor-page">
      <div className="document-editor-body">
        <DocumentCanvas />
        <InspectorPanel />
      </div>
    </div>
  );
}

export default DocumentEditor;
