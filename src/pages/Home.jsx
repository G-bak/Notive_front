import React from 'react';
import {
  Folder, FilePlus, CircleCheck, Share2, ChevronRight,
  Calendar, CheckSquare, Clock, Bell
} from 'lucide-react';

function Home() {
  return (
    <div className="page-content">
      <div className="page-header-title">
        <h1 className="page-title">홈</h1>
      </div>

      <div className="main-grid">
        {/* Top section: 좌측(통계 4 + 최근문서/업무일지) + 우측(관리자 알림 세로 전체) */}
        <div className="top-section">
          <div className="top-left">
            <div className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper green">
                  <Folder size={24} strokeWidth={2} />
                </div>
                <div className="stat-info">
                  <div className="stat-label">전체 문서</div>
                  <div className="stat-value-wrap">
                    <span className="stat-value">238</span>
                    <span className="stat-change positive">+12 오늘</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper blue">
                  <FilePlus size={24} strokeWidth={2} />
                </div>
                <div className="stat-info">
                  <div className="stat-label">AI 문서 생성</div>
                  <div className="stat-value-wrap">
                    <span className="stat-value">32</span>
                    <span className="stat-change positive">+5 이번 주</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper orange">
                  <CircleCheck size={24} strokeWidth={2} />
                </div>
                <div className="stat-info">
                  <div className="stat-label">완료한 To-do</div>
                  <div className="stat-value-wrap">
                    <span className="stat-value">56</span>
                    <span className="stat-change positive">+18 이번 주</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper gray">
                  <Share2 size={24} strokeWidth={2} />
                </div>
                <div className="stat-info">
                  <div className="stat-label">공유 문서</div>
                  <div className="stat-value-wrap">
                    <span className="stat-value">82</span>
                    <span className="stat-change positive">+6 오늘</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-row">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">최근 문서</div>
                  <button className="btn-text">전체 보기 <ChevronRight size={14} /></button>
                </div>
                <div className="card-body">
                  {[
                    { title: '2024년 1분기 경영 보고서', type: 'docx', path: '경영지원 > 분기 보고서 > 2024', team: '경영지원팀', time: '10분 전', status: '최종', sType: 'success' },
                    { title: '마케팅 캠페인 성과 분석 보고서', type: 'xlsx', path: '마케팅 > 캠페인 성과 > 2024Q2', team: '마케팅팀', time: '1시간 전', status: '최종', sType: 'success' },
                    { title: '신규 서비스 기획 제안서', type: 'pptx', path: '사업개발 > 제안서 > 신규 서비스', team: '사업개발팀', time: '2시간 전', status: '검토 중', sType: 'warning' },
                    { title: '인사 제도 개선 프로젝트 제안서', type: 'docx', path: '인사 > 제도 개선 > 프로젝트', team: '인사팀', time: '어제 14:30', status: '작성 중', sType: 'blue' },
                    { title: '영업 프로세스 개선 SOP', type: 'pdf', path: '영업 > 표준 운영 > SOP', team: '영업팀', time: '어제 11:20', status: '최종', sType: 'success' },
                  ].map((item, i) => (
                    <div className="list-item" key={i}>
                      <img className="list-item-doc-icon" src={`/document-icons/ref-icon-${item.type}.png`} alt="" aria-hidden="true" />
                      <div className="item-content">
                        <div className="item-title">{item.title}</div>
                        <div className="item-path">{item.path}</div>
                      </div>
                      <div className="item-meta">
                        <span className="meta-team">{item.team}</span>
                        <span className="meta-time">{item.time}</span>
                        <span className={`status-badge ${item.sType}`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-title">최근 업무 일지</div>
                  <button className="btn-text">전체 보기 <ChevronRight size={14} /></button>
                </div>
                <div className="card-body">
                  {[
                    { title: '주간 경영회의', desc: '1분기 실적 리뷰 및 2분기 OKR 논의. 마케팅 캠페인 성과가 전 분기 대비 15%...', time: '오늘 09:30', icon: <Calendar size={18} />, type: 'green' },
                    { title: '마케팅 캠페인 기획 회의', desc: '신규 캠페인 타깃 및 채널 선정. 예산안 1차 검토 완료.', time: '어제 16:00', icon: <CheckSquare size={18} />, type: 'blue' },
                    { title: '프로젝트 킥오프', desc: '신규 서비스 기획 프로젝트 킥오프. 역할 및 일정 공유.', time: '어제 10:00', icon: <Calendar size={18} />, type: 'gray' },
                    { title: '1:1 미팅', desc: '업무 진행 상황 및 애로 사항 공유.', time: '5.14 (화) 14:00', icon: <Clock size={18} />, type: 'orange' },
                  ].map((item, i) => (
                    <div className="list-item align-top" key={i}>
                      <div className={`item-icon-box ${item.type}`}>{item.icon}</div>
                      <div className="item-content">
                        <div className="item-title">{item.title}</div>
                        <div className="item-desc">{item.desc}</div>
                      </div>
                      <div className="item-meta">
                        <span className="meta-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 관리자 알림 (top-section 세로 전체) */}
          <div className="card gradient-card">
            <div className="card-header highlight">
              <div className="card-title with-icon">
                <Bell size={18} className="warning-icon" />
                관리자 알림
              </div>
              <div className="alert-count">2</div>
            </div>
            <div className="admin-alert-list">
              <div className="alert-item">
                <div className="alert-dot-wrapper">
                  <div className="alert-dot"></div>
                </div>
                <div className="alert-content">
                  <div className="alert-title">만료 예정 권한이 있습니다</div>
                  <div className="alert-desc">7일 이내 만료 5건</div>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-dot-wrapper">
                  <div className="alert-dot"></div>
                </div>
                <div className="alert-content">
                  <div className="alert-title">보안 검토가 필요합니다</div>
                  <div className="alert-desc">미검토 공유 문서 3건</div>
                </div>
              </div>
            </div>
            <div className="card-footer-btn">
              <span>관리자 페이지로 이동</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        <div className="content-row">
          <div className="card">
            <div className="card-header border-bottom-tabs">
              <div className="tabs-row">
                <div className="card-title">내 To-do</div>
                <div className="tabs">
                  <button className="tab active">전체</button>
                  <button className="tab">진행 중</button>
                  <button className="tab">완료</button>
                </div>
              </div>
              <div className="tabs-action">
                <button className="btn-text">전체 보기 <ChevronRight size={14} /></button>
              </div>
            </div>
            <div className="card-body">
              {[
                { title: '경영 보고서 데이터 업데이트', team: '경영지원팀', time: '내일', done: true },
                { title: '신규 서비스 기획서 초안 검토', team: '사업개발팀', time: '5.20 (월)', done: false },
                { title: '마케팅 캠페인 결과 리포트 작성', team: '마케팅팀', time: '5.22 (수)', done: false },
                { title: '인사 제도 설문 결과 분석', team: '인사팀', time: '5.24 (금)', done: false },
              ].map((item, i) => (
                <div className="list-item" key={i}>
                  <div className={`checkbox ${item.done ? 'checked' : ''}`}>
                    {item.done && <CircleCheck size={18} strokeWidth={2.5} />}
                  </div>
                  <div className="item-content">
                    <div className={`item-title ${item.done ? 'done-text' : ''}`}>{item.title}</div>
                  </div>
                  <div className="item-meta">
                    <span className="meta-team">{item.team}</span>
                    <span className="meta-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">최근 공유 문서</div>
              <button className="btn-text">전체 보기 <ChevronRight size={14} /></button>
            </div>
            <div className="card-body">
              {[
                { title: '영업 전략 수립 회의록', type: 'docx', path: '영업 > 회의록 > 전략 수립', team: '영업팀', role: '편집 가능', time: '10분 전', avatars: [{ t: '김', c: 'bg-blue' }, { t: '이', c: 'bg-green' }, { t: '+2', c: 'more' }] },
                { title: '인사 제도 개선 프로젝트 제안서', type: 'pptx', path: '인사 > 프로젝트 > 제안서', team: '인사팀', role: '읽기 전용', time: '1시간 전', avatars: [{ t: '박', c: 'bg-orange' }, { t: '최', c: 'bg-purple' }] },
                { title: '마케팅 캠페인 성과 분석 보고서', type: 'xlsx', path: '마케팅 > 성과 분석 > 2024Q2', team: '마케팅팀', role: '편집 가능', time: '3시간 전', avatars: [{ t: '정', c: 'bg-blue' }, { t: '+5', c: 'more' }] },
                { title: 'API 연동 가이드', type: 'pdf', path: '개발 > 기술 문서 > API', team: '개발팀', role: '읽기 전용', time: '어제', avatars: [{ t: '강', c: 'bg-green' }, { t: '조', c: 'bg-orange' }, { t: '+1', c: 'more' }] },
              ].map((item, i) => (
                <div className="list-item" key={i}>
                  <img className="list-item-doc-icon" src={`/document-icons/ref-icon-${item.type}.png`} alt="" aria-hidden="true" />
                  <div className="item-content">
                    <div className="item-title">{item.title}</div>
                    <div className="item-path">{item.path}</div>
                  </div>
                  <div className="item-meta">
                    <div className="avatar-group">
                      {item.avatars.map((av, idx) => (
                        <div key={idx} className={`mini-avatar ${av.c}`}>{av.t}</div>
                      ))}
                    </div>
                    <span className="meta-team">{item.team}</span>
                    <span className="meta-role">{item.role}</span>
                    <span className="meta-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
