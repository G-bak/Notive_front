import { Bell, Building2, ShieldCheck, Users } from 'lucide-react';

const settingsSections = [
  {
    title: '조직 설정',
    description: '조직 정보, 워크스페이스 기본값, 저장공간 정책을 관리합니다.',
    Icon: Building2,
  },
  {
    title: '구성원 및 권한',
    description: '사용자 초대, 팀, 역할, 문서 접근 권한을 설정합니다.',
    Icon: Users,
  },
  {
    title: '보안 정책',
    description: '외부 공유, 다운로드, 2단계 인증, 세션 정책을 관리합니다.',
    Icon: ShieldCheck,
  },
  {
    title: '알림',
    description: '이메일, 제품 내 알림, 관리자 알림 수신 범위를 조정합니다.',
    Icon: Bell,
  },
];

function SettingsPage() {
  return (
    <div className="page-content">
      <div className="page-header-title">
        <h1 className="page-title">설정</h1>
        <p className="page-subtitle">조직 운영과 보안, 알림 정책을 관리합니다.</p>
      </div>

      <div className="dashboard-grid">
        {settingsSections.map(({ title, description, Icon }) => (
          <div className="stat-card" key={title}>
            <div className="stat-icon-wrapper green">
              <Icon size={24} strokeWidth={2} />
            </div>
            <div className="stat-info">
              <div className="stat-label">{title}</div>
              <div className="item-desc">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsPage;
