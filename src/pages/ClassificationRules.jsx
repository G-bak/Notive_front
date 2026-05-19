import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  FlaskConical,
  Folder,
  GripVertical,
  LockKeyhole,
  MoreVertical,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  TimerReset,
  Users,
} from 'lucide-react';
import './ClassificationRules.css';

const summaryCards = [
  { label: '활성 규칙', value: '16', sub: '전체 18개', Icon: FileText, tone: 'green' },
  { label: '자동 분류율', value: '87%', sub: '최근 30일 기준', Icon: Clock3, tone: 'green' },
  { label: '검토 대기', value: '23', sub: '분류 대기 문서', Icon: TimerReset, tone: 'amber' },
  { label: '정책 충돌', value: '2', sub: '충돌 중인 규칙', Icon: AlertTriangle, tone: 'red' },
];

const tabs = ['전체 규칙', '문서 유형', '민감 정보', '보존 정책', 'AI 참조'];

const categories = [
  ['전체 규칙', 18, SlidersHorizontal, true],
  ['문서 유형', 6, Folder],
  ['부서/팀', 3, Users],
  ['태그', 4, Tag],
  ['민감도', 3, LockKeyhole],
  ['보존 기간', 2, TimerReset],
  ['외부 공유', 2, ShieldCheck],
];

const rules = [
  {
    priority: 1,
    name: '계약서 자동 분류',
    condition: '문서 유형 = 계약서',
    action: ['분류: 계약서', '보존: 7년'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-19 09:12',
    accuracy: '96%',
  },
  {
    priority: 2,
    name: '개인정보 포함 문서 마스킹',
    condition: '본문에 개인정보 패턴 포함',
    action: ['민감 정보 라벨 적용', '마스킹 처리'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-19 08:47',
    accuracy: '92%',
    selected: true,
  },
  {
    priority: 3,
    name: '외부 공유 승인 필요',
    condition: '태그 = 외부공유',
    action: ['공유 제한', '승인 워크플로우'],
    status: '검토 필요',
    statusTone: 'review',
    lastRun: '2025-05-18 16:30',
    accuracy: '89%',
  },
  {
    priority: 4,
    name: 'AI 참조 제외',
    condition: '민감도 = 기밀 이상',
    action: ['AI 참조 제외', '요약 비활성화'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-19 07:55',
    accuracy: '98%',
  },
  {
    priority: 5,
    name: '7년 보존 정책',
    condition: '문서 유형 = 계약서',
    action: ['보존 기간 설정: 7년', '자료 만료 처리'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-19 06:21',
    accuracy: '100%',
  },
  {
    priority: 6,
    name: '인사 문서 접근 제한',
    condition: '소유 팀 = 인사팀',
    action: ['팀 접근 제한', '권한 상속 차단'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-18 11:02',
    accuracy: '95%',
  },
  {
    priority: 7,
    name: '재무 보고 자동 분류',
    condition: '문서 제목에 재무 포함',
    action: ['분류: 재무 보고', '보존: 5년'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-17 18:44',
    accuracy: '90%',
  },
  {
    priority: 8,
    name: '임시 문서 자동 만료',
    condition: '상태 = 임시',
    action: ['30일 후 만료', '작성자 알림'],
    status: '활성',
    statusTone: 'active',
    lastRun: '2025-05-17 09:33',
    accuracy: '85%',
  },
];

const triggerConditions = ['본문에 주민등록번호 패턴 포함', '문서 유형 = 보고서'];
const ruleActions = ['민감 정보 라벨 적용', '개인정보 마스킹 처리', '외부 공유 차단', 'AI 참조 제외'];
const affectedTeams = ['인사팀', '재무팀', '법무팀', '+ 3개'];

function ClassificationRules() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeCategory, setActiveCategory] = useState(categories[0][0]);

  return (
    <div className="page-content classification-rules-page">
      <div className="classification-shell">
        <header className="classification-header">
          <div>
            <h1 className="page-title">분류 규칙</h1>
            <p className="page-subtitle">문서 유형과 메타데이터를 기준으로 자동 분류와 권한 정책을 적용합니다.</p>
          </div>
        </header>

        <section className="classification-summary-grid" aria-label="분류 규칙 요약">
          {summaryCards.map(({ label, value, sub, Icon, tone }) => (
            <article className="classification-summary-card" key={label}>
              <div>
                <span className="classification-card-label">{label}</span>
                <strong>{value}</strong>
                <em>{sub}</em>
              </div>
              <span className={`classification-summary-icon tone-${tone}`}>
                <Icon size={24} strokeWidth={2.2} />
              </span>
            </article>
          ))}
        </section>

        <div className="classification-tabs-row">
          <nav className="classification-tabs" aria-label="분류 규칙 필터">
            {tabs.map((tab) => (
              <button
                type="button"
                className={activeTab === tab ? 'active' : ''}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="classification-actions">
            <button type="button" className="classification-outline-button">
              <FlaskConical size={15} />
              <span>규칙 테스트 센터</span>
            </button>
            <button type="button" className="classification-primary-button">
              <Plus size={16} />
              <span>새 규칙</span>
            </button>
            <button type="button" className="classification-icon-button" aria-label="더보기">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <section className="classification-workspace">
          <aside className="classification-left-column">
            <div className="classification-category-panel">
              <div className="classification-panel-title">규칙 카테고리</div>
              <div className="classification-category-list">
                {categories.map(([label, count, Icon]) => (
                  <button
                    type="button"
                    className={activeCategory === label ? 'active' : ''}
                    key={label}
                    onClick={() => setActiveCategory(label)}
                  >
                    <span className="classification-category-name">
                      <Icon size={15} />
                      <span>{label}</span>
                    </span>
                    <span>{count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="classification-priority-note">
              <strong>규칙 우선순위 안내</strong>
              <p>숫자가 낮을수록 먼저 적용합니다. 동일 우선순위는 생성 순서를 기준으로 처리합니다.</p>
              <button type="button">
                자세히 보기
                <ChevronRight size={13} />
              </button>
            </div>
          </aside>

          <main className="classification-table-panel">
            <div className="classification-table-head">
              <div className="classification-search-box">
                <Search size={15} />
                <input type="text" value="개인정보, 외부 공유, AI 참조" readOnly />
              </div>
              <button type="button" className="classification-filter-button">
                <SlidersHorizontal size={15} />
                <span>필터</span>
              </button>
            </div>

            <div className="classification-rules-table" role="table" aria-label="분류 규칙 목록">
              <div className="classification-table-row classification-table-header" role="row">
                <span></span>
                <span>우선순위</span>
                <span>규칙명</span>
                <span>조건</span>
                <span>적용 작업</span>
                <span>상태</span>
                <span>최근 실행</span>
                <span>정확도</span>
              </div>

              {rules.map((rule) => (
                <div
                  className={`classification-table-row ${rule.selected ? 'selected' : ''}`}
                  role="row"
                  key={rule.name}
                >
                  <span className="classification-drag-handle">
                    <GripVertical size={16} />
                  </span>
                  <span className="classification-priority-box">{rule.priority}</span>
                  <span className="classification-rule-name">{rule.name}</span>
                  <span>{rule.condition}</span>
                  <span className="classification-action-stack">
                    {rule.action.map((item) => (
                      <em key={item}>{item}</em>
                    ))}
                  </span>
                  <span>
                    <mark className={`classification-status tone-${rule.statusTone}`}>{rule.status}</mark>
                  </span>
                  <time>{rule.lastRun}</time>
                  <span className="classification-accuracy">{rule.accuracy}</span>
                </div>
              ))}
            </div>

          </main>

          <aside className="classification-inspector">
            <div className="classification-inspector-card">
              <div className="classification-inspector-top">
                <span>선택한 규칙</span>
                <button type="button" aria-label="닫기">x</button>
              </div>

              <section className="classification-rule-summary">
                <div>
                  <strong>개인정보 포함 문서 마스킹</strong>
                  <span>우선순위 2</span>
                </div>
                <mark>활성</mark>
              </section>

              <InspectorSection title="규칙 요약">
                <p>문서 본문에 개인정보 패턴이 포함된 보고서를 자동으로 감지하여 마스킹 및 권한 정책을 적용합니다.</p>
              </InspectorSection>

              <InspectorSection title="트리거 조건">
                <CheckList items={triggerConditions} />
              </InspectorSection>

              <InspectorSection title="적용 작업">
                <CheckList items={ruleActions} muted />
              </InspectorSection>

              <InspectorSection title="영향 받는 팀">
                <div className="classification-team-chips">
                  {affectedTeams.map((team) => (
                    <span key={team}>{team}</span>
                  ))}
                </div>
              </InspectorSection>

              <InspectorSection title="최근 실행 결과">
                <div className="classification-run-result">
                  <time>2025-05-19 08:47</time>
                  <span>성공</span>
                </div>
                <div className="classification-run-stats">
                  <span>매칭 문서 <strong>34건</strong></span>
                  <span>처리 성공 <strong>33건</strong></span>
                  <span>실패 <strong>1건</strong></span>
                </div>
              </InspectorSection>

              <InspectorSection title="정책 충돌">
                <div className="classification-conflict-box">
                  <CircleAlert size={15} />
                  <span>외부 공유 승인 필요 규칙과 충돌 가능</span>
                </div>
                <button type="button" className="classification-link-button">
                  충돌 규칙 보기
                  <ChevronRight size={13} />
                </button>
              </InspectorSection>

              <InspectorSection title="감사 로그">
                <dl className="classification-audit-list">
                  <div>
                    <dt>최근 수정</dt>
                    <dd>2025-05-16 14:22 (김지현)</dd>
                  </div>
                  <div>
                    <dt>생성일</dt>
                    <dd>2025-04-02 10:15 (김지현)</dd>
                  </div>
                </dl>
                <button type="button" className="classification-link-button">
                  전체 변경 이력 보기
                  <ChevronRight size={13} />
                </button>
              </InspectorSection>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

function InspectorSection({ title, children }) {
  return (
    <section className="classification-inspector-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function CheckList({ items, muted = false }) {
  return (
    <ul className={`classification-check-list ${muted ? 'muted' : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 size={14} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default ClassificationRules;
