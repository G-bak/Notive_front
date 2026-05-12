import { useState } from 'react';
import {
  MoreVertical, HelpCircle, ChevronDown, Check, X,
  Users, Sparkles, User, ShieldAlert
} from 'lucide-react';
import './AiDocumentGeneration.css';

const templateOptions = [
  { title: '주간 업무 보고서 (표준)', desc: '성과, 진행 현황, 다음 주 계획', image: '/templates/template-weekly-report.png' },
  { title: '회의록 (결정사항 중심)', desc: '안건, 결정 사항, 후속 조치', image: '/templates/template-meeting-minutes.png' },
  { title: '제안서 (고객 제안)', desc: '배경, 제안 내용, 기대 효과', image: '/templates/template-proposal.png' },
  { title: '업무 가이드(SOP)', desc: '절차, 기준, 체크리스트', image: '/templates/template-sop.png' },
];

function DocumentThumbnail() {
  return (
    <img className="doc-thumbnail" src="/document-icons/doc-type-thumbnail-refined.png" alt="" aria-hidden="true" />
  );
}

function RefDocIcon({ type }) {
  return (
    <img className="ref-icon-img" src={`/document-icons/ref-icon-${type}.png`} alt="" aria-hidden="true" />
  );
}

function AiDocumentGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState(templateOptions[0]);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  return (
    <>
      <div className="page-content ai-page">
        <div className="ai-grid">
          {/* Header spanning Left & Mid */}
          <div className="ai-header-title">
            <div>
              <h1 className="page-title">AI 문서 생성</h1>
              <p className="page-subtitle">업무 맥락을 연결하여 AI가 초안을 생성합니다.</p>
            </div>
            <div className="header-actions-right">
              <button className="btn-secondary">
                저장된 요청
              </button>
              <button className="btn-icon-border"><MoreVertical size={16} /></button>
            </div>
          </div>

          {/* Left Column: Step 1 & 2 */}
          <div className="ai-col-left">
            <div className="ai-section">
              <h2 className="ai-section-title">1. 문서 유형 선택</h2>
              <div className="doc-type-cards">
                <div className="doc-card active">
                  <div className="doc-card-icon"><DocumentThumbnail /></div>
                  <div className="doc-card-content">
                    <div className="doc-card-title">주간 업무 보고서</div>
                    <div className="doc-card-desc">주간 업무 진행 현황과<br/>주요 성과를 정리</div>
                  </div>
                  <div className="doc-card-check"><Check size={14} strokeWidth={3} /></div>
                </div>
                
                <div className="doc-card">
                  <div className="doc-card-icon"><DocumentThumbnail /></div>
                  <div className="doc-card-content">
                    <div className="doc-card-title">회의록</div>
                    <div className="doc-card-desc">회의 내용과 결정 사항,<br/>후속 조치를 정리</div>
                  </div>
                </div>

                <div className="doc-card">
                  <div className="doc-card-icon"><DocumentThumbnail /></div>
                  <div className="doc-card-content">
                    <div className="doc-card-title">제안서</div>
                    <div className="doc-card-desc">고객 제안 목적의<br/>서비스/솔루션 제안서</div>
                  </div>
                </div>

                <div className="doc-card">
                  <div className="doc-card-icon"><DocumentThumbnail /></div>
                  <div className="doc-card-content">
                    <div className="doc-card-title">업무 가이드(SOP)</div>
                    <div className="doc-card-desc">업무 절차와 기준을 정의한<br/>표준 운영 절차 문서</div>
                  </div>
                </div>

                <button className="btn-more-doc">
                  더 많은 문서 유형 <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="ai-section mt-4">
              <h2 className="ai-section-title">2. 템플릿 선택</h2>
              <div className="template-select-wrap">
                <button className="template-select" type="button" onClick={() => setIsTemplateOpen((open) => !open)}>
                  <span className="template-thumb-frame">
                    <img className="template-select-thumb" src={selectedTemplate.image} alt="" aria-hidden="true" />
                  </span>
                  <span className="template-select-copy">
                    <span className="template-select-title">{selectedTemplate.title}</span>
                    <span className="template-select-desc">{selectedTemplate.desc}</span>
                  </span>
                  <ChevronDown size={16} className="ml-auto text-gray-400" />
                </button>
                {isTemplateOpen && (
                  <div className="template-options">
                    {templateOptions.map((template) => (
                      <button
                        className={`template-option ${selectedTemplate.title === template.title ? 'active' : ''}`}
                        key={template.title}
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsTemplateOpen(false);
                        }}
                      >
                        <span className="template-thumb-frame">
                          <img className="template-select-thumb" src={template.image} alt="" aria-hidden="true" />
                        </span>
                        <span className="template-select-copy">
                          <span className="template-select-title">{template.title}</span>
                          <span className="template-select-desc">{template.desc}</span>
                        </span>
                        {selectedTemplate.title === template.title && <Check size={14} className="template-option-check" />}
                      </button>
                    ))}
                  </div>
                )}
                <a href="#" className="template-preview-link">템플릿 미리보기 &gt;</a>
              </div>
            </div>
          </div>

          {/* Middle Column: Step 3 */}
          <div className="ai-col-mid">
            <div className="ai-section">
              <div className="ai-section-header">
                <h2 className="ai-section-title" style={{marginBottom: 0}}>3. 요청 내용을 입력하세요 <HelpCircle size={14} className="text-gray-400 ml-1" /></h2>
                <button className="btn-text-sm btn-prompt-suggest">추천 프롬프트</button>
              </div>
              
              <div className="prompt-textarea-wrap">
                <textarea 
                  className="prompt-textarea"
                  defaultValue={"이번 주 마케팅팀의 주요 성과와 진행 중인 프로젝트 현황을 정리해 주세요.\n캠페인 성과 지표를 포함하고, 다음 주 계획과 리스크도 함께 작성해 주세요."}
                />
                <div className="char-count">97/2000</div>
              </div>

              <div className="prompt-options">
                <div className="option-group">
                  <label>문서 목적</label>
                  <div className="select-box">
                    업무 보고 <ChevronDown size={14} />
                  </div>
                </div>
                <div className="option-group">
                  <label>대상 독자</label>
                  <div className="select-box">
                    팀장/임원 <ChevronDown size={14} />
                  </div>
                </div>
                <div className="option-group style-group">
                  <label>문체</label>
                  <div className="style-buttons">
                    <button className="style-btn active">포멀</button>
                    <button className="style-btn">표준</button>
                    <button className="style-btn">간결</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-section mt-5">
              <div className="ai-section-header">
                <h2 className="ai-section-title" style={{marginBottom: 0}}>참조할 업무 맥락 <HelpCircle size={14} className="text-gray-400 ml-1" /></h2>
                <button className="btn-text-sm btn-clear-selection">모두 선택 해제</button>
              </div>

              <div className="context-group">
                <div className="context-label">업무 일지 (3)</div>
                <div className="chip-list">
                  <div className="context-chip">
                    <User size={14} className="text-gray-500" />
                    <div className="chip-text">
                      <strong>5.13 (월)</strong>
                      <span>캠페인 성과 분석 및 리포트</span>
                    </div>
                    <button className="chip-close"><X size={14} /></button>
                  </div>
                  <div className="context-chip">
                    <User size={14} className="text-gray-500" />
                    <div className="chip-text">
                      <strong>5.14 (화)</strong>
                      <span>신규 채널 테스트 결과 정리</span>
                    </div>
                    <button className="chip-close"><X size={14} /></button>
                  </div>
                  <div className="context-chip">
                    <User size={14} className="text-gray-500" />
                    <div className="chip-text">
                      <strong>5.15 (수)</strong>
                      <span>브랜드 협업 논의</span>
                    </div>
                    <button className="chip-close"><X size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="context-group">
                <div className="context-header-flex">
                  <div className="context-label" style={{marginBottom: 0}}>To-do (2)</div>
                  <button className="btn-text-sm btn-clear-selection">모두 선택 해제</button>
                </div>
                <div className="chip-list">
                  <div className="context-chip outline orange-outline">
                    <Users size={14} className="text-orange-500" />
                    <div className="chip-text">
                      <strong>5월 캠페인 성과 리포트 작성</strong>
                      <span>마감 5.16 (목)</span>
                    </div>
                    <button className="chip-close"><X size={14} /></button>
                  </div>
                  <div className="context-chip outline orange-outline">
                    <Users size={14} className="text-orange-500" />
                    <div className="chip-text">
                      <strong>A/B 테스트 결과 분석</strong>
                      <span>마감 5.17 (금)</span>
                    </div>
                    <button className="chip-close"><X size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="context-group">
                <div className="context-label">참조 문서 (4)</div>
                <div className="ref-doc-list">
                  <div className="ref-doc-item">
                    <div className="ref-icon"><RefDocIcon type="xlsx" /></div>
                    <div className="ref-info">
                      <div className="ref-title">5월 캠페인 성과 데이터</div>
                      <div className="ref-path">공유 드라이브 &gt; 마케팅 &gt; 성과 리포트</div>
                    </div>
                    <div className="ref-badge edit">편집 가능</div>
                    <button className="ref-close"><X size={16} /></button>
                  </div>
                  <div className="ref-doc-item">
                    <div className="ref-icon"><RefDocIcon type="pptx" /></div>
                    <div className="ref-info">
                      <div className="ref-title">신규 채널 테스트 결과</div>
                      <div className="ref-path">프로젝트 &gt; 신규 채널 런칭</div>
                    </div>
                    <div className="ref-badge edit">편집 가능</div>
                    <button className="ref-close"><X size={16} /></button>
                  </div>
                  <div className="ref-doc-item">
                    <div className="ref-icon"><RefDocIcon type="docx" /></div>
                    <div className="ref-info">
                      <div className="ref-title">브랜드 협업 회의록 (5.15)</div>
                      <div className="ref-path">회의 &gt; 브랜드 협업 TF</div>
                    </div>
                    <div className="ref-badge edit">편집 가능</div>
                    <button className="ref-close"><X size={16} /></button>
                  </div>
                  <div className="ref-doc-item">
                    <div className="ref-icon"><RefDocIcon type="pdf" /></div>
                    <div className="ref-info">
                      <div className="ref-title">마케팅 OKR (2024 Q2)</div>
                      <div className="ref-path">지식 문서함 &gt; OKR</div>
                    </div>
                    <div className="ref-badge view">보기 전용</div>
                    <button className="ref-close"><X size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & History */}
          <div className="ai-col-right">
            <div className="card shadow-sm mb-4 summary-card">
              <div className="ai-card-header">
                <h3 className="card-title-lg">생성 설정 요약</h3>
              </div>
              <div className="card-body summary-card-body">
                <ul className="summary-list">
                  <li>
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">문서 유형</span>
                    <span className="sum-val">주간 업무 보고서</span>
                  </li>
                  <li>
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">템플릿</span>
                    <span className="sum-val">주간 업무 보고서 (표준)</span>
                  </li>
                  <li>
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">문서 목적</span>
                    <span className="sum-val">업무 보고</span>
                  </li>
                  <li>
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">대상 독자</span>
                    <span className="sum-val">팀장/임원</span>
                  </li>
                  <li>
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">문체</span>
                    <span className="sum-val">포멀</span>
                  </li>
                  <li className="align-top">
                    <Check size={10} className="summary-check" />
                    <span className="sum-label">참조 업무 맥락</span>
                    <span className="sum-val">업무 일지 3개, To-do 2개,<br/>참조 문서 4개</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card shadow-sm mb-4 border-dashed auth-card">
              <div className="card-body p-4 auth-card-body">
                <div className="auth-card-heading">
                  <ShieldAlert size={22} className="auth-card-icon text-gray-400" />
                  <h4 className="text-sm font-bold mb-2">출처 및 권한 안내</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3" style={{lineHeight: 1.5, wordBreak: 'keep-all'}}>선택한 문서와 데이터는 접근 권한 내에서만 AI가 활용합니다. <a href="#" className="text-green-600" style={{textDecoration: 'none'}}>자세히 보기</a></p>
                
                <div className="auth-stats">
                  <div className="auth-stat-box">
                    <div className="auth-stat-label">문서</div>
                    <div className="auth-stat-val">4</div>
                  </div>
                  <div className="auth-stat-box">
                    <div className="auth-stat-label">업무 일지</div>
                    <div className="auth-stat-val">3</div>
                  </div>
                  <div className="auth-stat-box">
                    <div className="auth-stat-label">To-do</div>
                    <div className="auth-stat-val">2</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm history-card">
              <div className="ai-card-header">
                <h3 className="card-title-lg" style={{marginBottom: 0}}>최근 생성 히스토리</h3>
                <button className="btn-text-sm btn-clear-selection ml-auto">모두 보기</button>
              </div>
              <div className="card-body history-card-body">
                <div className="history-list">
                  <div className="history-item">
                    <div className="hist-icon"><RefDocIcon type="xlsx" /></div>
                    <div className="hist-info">
                      <div className="hist-title">주간 업무 보고서</div>
                      <div className="hist-meta">생성 완료 · 2024.05.16 10:35</div>
                    </div>
                    <button className="hist-more"><MoreVertical size={16} /></button>
                  </div>
                  <div className="history-item">
                    <div className="hist-icon"><RefDocIcon type="pdf" /></div>
                    <div className="hist-info">
                      <div className="hist-title">브랜드 협업 제안서</div>
                      <div className="hist-meta">생성 완료 · 2024.05.15 16:12</div>
                    </div>
                    <button className="hist-more"><MoreVertical size={16} /></button>
                  </div>
                  <div className="history-item">
                    <div className="hist-icon"><RefDocIcon type="docx" /></div>
                    <div className="hist-info">
                      <div className="hist-title">5월 캠페인 성과 리포트</div>
                      <div className="hist-meta">생성 완료 · 2024.05.14 14:22</div>
                    </div>
                    <button className="hist-more"><MoreVertical size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="ai-bottom-bar">
        <button className="btn-outline">초기화</button>
        <div className="bottom-bar-right">
          <button className="btn-outline">임시저장</button>
          <button className="btn-primary-sparkle">
            <Sparkles size={16} /> 초안 생성하기
          </button>
        </div>
      </div>
    </>
  );
}

export default AiDocumentGeneration;
