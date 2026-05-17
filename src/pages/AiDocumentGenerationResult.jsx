import { useEffect, useState } from 'react';
import {
  AlertCircle,
  Bookmark,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  FileText,
  History,
  Maximize2,
  Minus,
  MoreHorizontal,
  Plus,
  Redo2,
  RefreshCcw,
  Save,
  Share2,
  ShieldCheck,
  Sparkles,
  Undo2,
  X,
} from 'lucide-react';
import './AiDocumentGenerationResult.css';

const generationSteps = [
  ['요청 분석 및 계획 수립', '완료', '00:02'],
  ['참조 자료 수집 및 분석', '완료', '00:05'],
  ['구조 설계', '완료', '00:03'],
  ['초안 생성', '완료', '00:06'],
  ['교차 검증 및 인용 매핑', '완료', '00:02'],
];

const sourceItems = [
  ['5.13 ~ 5.19 마케팅 일지', '업무 일지 · 2024.05.19'],
  ['주간 성과 지표 (마케팅)', '데이터 · 2024.05.19'],
  ['마케팅 예산 현황 (초안)', '스프레드시트 · 2024.05.18'],
];

function SourceBadge({ children }) {
  return <span className="ai-result-source-badge">{children}</span>;
}

function AiDocumentGenerationResult() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(true);

  useEffect(() => {
    const noticeTimer = window.setTimeout(() => {
      setIsNoticeOpen(false);
    }, 5000);

    return () => {
      window.clearTimeout(noticeTimer);
    };
  }, []);

  return (
    <>
      <div className="page-content ai-result-page">
        {isNoticeOpen && (
          <div className="ai-result-notice-popover" role="status" aria-live="polite">
            <span className="ai-result-notice-icon">
              <Sparkles size={15} />
            </span>
            <div className="ai-result-notice-copy">
              <strong>초안 생성이 완료되었습니다</strong>
              <p>요청하신 '주간 업무 보고서'를 초안으로 생성했습니다.</p>
              <div className="ai-result-notice-meta">
                <span>요청 시간 2024.05.20 10:32</span>
                <span>생성 모델 Notive AI (v1.2)</span>
                <span>소요 시간 18초</span>
              </div>
            </div>
            <button type="button" aria-label="알림 닫기" onClick={() => setIsNoticeOpen(false)}>
              <X size={14} />
            </button>
          </div>
        )}
        <div className="ai-result-top">
          <div>
            <div className="ai-result-title-row">
              <h1 className="page-title">AI 문서 생성 결과</h1>
              <span className="ai-result-success-chip">
                <Sparkles size={12} />
                초안 생성 완료
              </span>
            </div>
            <p className="ai-result-page-description">
              생성된 초안을 검토하고 출처, 품질, 권한을 확인한 뒤 저장하거나 편집기로 열 수 있습니다.
            </p>
          </div>

          <div className="ai-result-top-actions">
            <button type="button"><Eye size={15} /> 미리보기</button>
            <button type="button"><History size={15} /> 버전 기록</button>
            <button type="button"><Share2 size={15} /> 공유</button>
            <button type="button" aria-label="더보기"><MoreHorizontal size={17} /></button>
          </div>
        </div>

        <div className="ai-result-grid">
          <aside className="ai-result-left">
            <section className="ai-result-card ai-result-request-card">
              <div className="ai-result-request-section">
                <header>
                  <h2>요청 요약</h2>
                  <button type="button">수정</button>
                </header>
                <dl className="ai-result-summary-list">
                  <div><dt>문서 유형</dt><dd>주간 업무 보고서</dd></div>
                  <div><dt>대상 기간</dt><dd>2024.05.13 (월) ~ 2024.05.19 (일)</dd></div>
                  <div><dt>핵심 목적</dt><dd>팀 내 공유 및 경영진 보고</dd></div>
                  <div><dt>대상 독자</dt><dd>팀장/임원</dd></div>
                  <div><dt>문체</dt><dd>포멀</dd></div>
                  <div><dt>참조 자료</dt><dd>업무 일지 5개, To-do 6개, 문서 7개</dd></div>
                </dl>
              </div>

              <div className="ai-result-request-section">
                <header>
                  <h2>선택한 템플릿</h2>
                </header>
                <div className="ai-result-template">
                  <img src="/templates/template-weekly-report.png" alt="" aria-hidden="true" />
                  <div>
                    <strong>주간 업무 보고서 (표준)</strong>
                    <span>성과, 진행 현황, 다음 주 계획</span>
                  </div>
                  <button type="button">템플릿 변경</button>
                </div>
              </div>

              <div className="ai-result-request-section ai-result-reference-card">
                <header>
                  <h2>참조 자료 (18)</h2>
                  <button type="button">모두 보기</button>
                </header>
                <div className="ai-result-ref-tabs">
                  <span>
                    <FileText size={13} />
                    <span className="ai-result-ref-tab-label">업무 일지</span>
                    <span className="ai-result-ref-tab-count">5</span>
                  </span>
                  <span>
                    <Check size={13} />
                    <span className="ai-result-ref-tab-label">To-do</span>
                    <span className="ai-result-ref-tab-count">6</span>
                  </span>
                  <span>
                    <FileText size={13} />
                    <span className="ai-result-ref-tab-label">문서</span>
                    <span className="ai-result-ref-tab-count">7</span>
                  </span>
                </div>
              </div>
            </section>

            <section className="ai-result-card">
              <header>
                <h2>생성 진행 단계</h2>
              </header>
              <ul className="ai-result-step-list">
                {generationSteps.map(([label, state, time]) => (
                  <li key={label}>
                    <Check size={10} className="summary-check" />
                    <span>{label}</span>
                    <em>{state}</em>
                    <time>{time}</time>
                  </li>
                ))}
              </ul>
              <button type="button" className="ai-result-wide-button">생성 로그 보기</button>
            </section>
          </aside>

          <main className="ai-result-document">
            <div className="ai-result-doc-toolbar">
              <div className="ai-result-file-title">
                <img src="/document-icons/ref-icon-docx.png" alt="" aria-hidden="true" />
                <strong>주간 업무 보고서_2024.05.13~05.19 (초안)</strong>
                <button type="button">v1.0 (초안) <ChevronDown size={13} /></button>
              </div>
              <div className="ai-result-doc-tools">
                <button type="button" aria-label="실행 취소"><Undo2 size={15} strokeWidth={1.7} /></button>
                <button type="button" aria-label="다시 실행"><Redo2 size={15} strokeWidth={1.7} /></button>
                <button type="button" aria-label="축소"><Minus size={15} strokeWidth={1.7} /></button>
                <span>100%</span>
                <button type="button" aria-label="확대"><Plus size={15} strokeWidth={1.7} /></button>
                <button type="button" aria-label="전체 화면"><Maximize2 size={15} strokeWidth={1.7} /></button>
              </div>
            </div>

            <article className="ai-result-paper">
              <header className="ai-result-paper-head">
                <div>
                  <h2>주간 업무 보고서</h2>
                  <p>2024.05.13 (월) ~ 2024.05.19 (일)</p>
                </div>
                <div>
                  <span>작성일: 2024.05.20</span>
                  <span>작성자: 김지연 (마케팅팀)</span>
                </div>
              </header>

              <section>
                <h3>1. 주간 핵심 요약</h3>
                <p>이번 주는 신규 서비스 출시 캠페인 운영과 콘텐츠 마케팅 성과 개선에 집중했습니다.</p>
                <p className="ai-result-highlight">
                  검색 랜딩페이지 신규 방문자 수가 전주 대비 23% 증가했고, 리드 전환율은 18% 개선되었습니다.
                  <SourceBadge>1</SourceBadge>
                </p>
                <div className="ai-result-kpi-grid">
                  <div className="ai-result-kpi">
                    <span>신규 방문자</span>
                    <strong>12,842</strong>
                    <em>▲ 23% (전주 대비)</em>
                    <SourceBadge>1</SourceBadge>
                  </div>
                  <div className="ai-result-kpi">
                    <span>리드 수</span>
                    <strong>1,732</strong>
                    <em>▲ 24% (전주 대비)</em>
                    <SourceBadge>2</SourceBadge>
                  </div>
                  <div className="ai-result-kpi">
                    <span>전환율</span>
                    <strong>4.38%</strong>
                    <em>▲ 18% (전주 대비)</em>
                    <SourceBadge>3</SourceBadge>
                  </div>
                  <div className="ai-result-kpi">
                    <span>마케팅 비용</span>
                    <strong>₩12,450,000</strong>
                    <em>▼ 7% (전주 대비)</em>
                    <SourceBadge>4</SourceBadge>
                  </div>
                </div>
              </section>

              <section>
                <h3>2. 주요 성과</h3>
                <table className="ai-result-table">
                  <thead>
                    <tr>
                      <th>성과 지표</th>
                      <th>이번 주</th>
                      <th>전주</th>
                      <th>증감</th>
                      <th>주요 내용</th>
                      <th>출처</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>웹사이트 신규 방문자</td><td>12,842</td><td>10,426</td><td>▲ 23%</td><td>검색 광고 및 블로그 유입 증가</td><td><SourceBadge>1</SourceBadge></td></tr>
                    <tr><td>마케팅 리드</td><td>1,732</td><td>1,395</td><td>▲ 24%</td><td>신규 서비스 랜딩페이지 개선</td><td><SourceBadge>2</SourceBadge></td></tr>
                    <tr><td>리드 전환율</td><td>4.38%</td><td>3.71%</td><td>▲ 18%</td><td>폼 최적화 및 CTA 개선</td><td><SourceBadge>2</SourceBadge></td></tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h3>3. 주요 업무 진행 현황</h3>
                <ul className="ai-result-check-list">
                  <li><Check size={13} /> 신규 서비스 출시 캠페인 운영 (5/13~5/19) <SourceBadge>1</SourceBadge></li>
                  <li><Check size={13} /> 블로그 콘텐츠 3건 발행 및 SEO 최적화 <SourceBadge>4</SourceBadge></li>
                  <li><Check size={13} /> 파트너사 제휴 프로모션 기획 및 협의 <SourceBadge>5</SourceBadge></li>
                </ul>
              </section>

              <footer>글자 수: 2,345 · 페이지: 1 / 6</footer>
            </article>
          </main>

          <aside className="ai-result-right">
            <section className="ai-result-card ai-result-review">
              <header>
                <h2>검토 필요</h2>
                <span>근거 확인 필요 2건</span>
              </header>
              <ul>
                <li>
                  <AlertCircle size={14} />
                  <div>
                    <strong>"리드 전환율은 18% 개선되었습니다."</strong>
                    <p>관련 지표는 일부 추정값이 포함되었습니다.</p>
                  </div>
                  <SourceBadge>2</SourceBadge>
                </li>
                <li>
                  <AlertCircle size={14} />
                  <div>
                    <strong>"마케팅 비용이 전주 대비 7% 절감되었습니다."</strong>
                    <p>회계 확정 전 데이터로 검증이 필요합니다.</p>
                  </div>
                  <SourceBadge>3</SourceBadge>
                </li>
              </ul>
              <button type="button" className="ai-result-wide-button">모두 검토 완료로 표시</button>
            </section>

            <section className="ai-result-card">
              <header>
                <h2>출처 7개</h2>
                <button type="button">모두 보기</button>
              </header>
              <ol className="ai-result-source-list">
                {sourceItems.map(([title, meta], index) => (
                  <li key={title}>
                    <SourceBadge>{index + 1}</SourceBadge>
                    <div>
                      <strong>{title}</strong>
                      <span>{meta}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <button type="button" className="ai-result-link-button">+ 4개 더 보기</button>
            </section>

            <section className="ai-result-card ai-result-permission">
              <header>
                <h2>권한 및 사용 범위</h2>
              </header>
              <div>
                <ShieldCheck size={17} />
                <strong>접근 가능한 자료만 사용했습니다</strong>
                <p>조직 내 공유된 문서 및 데이터만 활용했습니다.</p>
                <button type="button">자세히 보기</button>
              </div>
            </section>

            <section className="ai-result-card ai-result-quality">
              <header>
                <h2>품질 평가</h2>
              </header>
              <div className="ai-result-score">
                <span>82<small>/100</small></span>
                <div>
                  <strong>좋음</strong>
                  <p>구성, 근거, 가독성 기준</p>
                </div>
              </div>
              <div className="ai-result-bars">
                <label><span>구성</span><meter min="0" max="100" value="85" />85</label>
                <label><span>근거</span><meter min="0" max="100" value="78" />78</label>
                <label><span>가독성</span><meter min="0" max="100" value="86" />86</label>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <div className="ai-result-bottom-bar">
        <p>이 결과는 AI가 생성한 초안입니다. 사실 관계 및 수치를 반드시 검토하세요.</p>
        <div>
          <button type="button"><Bookmark size={16} /> 템플릿으로 저장</button>
          <button type="button"><RefreshCcw size={16} /> 다시 생성</button>
          <button type="button"><Edit3 size={16} /> 편집기로 열기</button>
          <button type="button" className="ai-result-save-button">
            <Save size={16} /> 문서로 저장 <ChevronDown size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AiDocumentGenerationResult;
