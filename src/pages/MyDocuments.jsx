import { ChevronDown, Copy, Grid2x2, Info, List, Plus, Upload } from 'lucide-react';

const tabs = ['전체', '최근 문서', '공유 문서', '휴지통'];
const filters = [
  { label: '폴더', value: '전체' },
  { label: '문서 유형' },
  { label: '소유 팀' },
  { label: '태그' },
  { label: '접근 권한' },
  { label: '상태' },
  { label: '수정일' },
];

function MyDocuments() {
  return (
    <div className="page-content my-documents-page">
      <div className="my-documents-top">
        <div className="my-documents-title-row">
          <div className="my-documents-heading">
            <h1 className="page-title">내 문서</h1>
            <span className="my-documents-count">전체 238개</span>
          </div>

          <div className="my-documents-actions">
            <button type="button" className="btn-new-document my-documents-new-button">
              <div className="btn-new-main">
                <Plus size={16} strokeWidth={2.5} />
                <span>새 문서</span>
              </div>
              <div className="btn-new-split"></div>
              <div className="btn-new-icon">
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </button>

            <button type="button" className="my-documents-outline-button">
              <Upload size={15} />
              <span>업로드</span>
            </button>

            <div className="my-documents-view-tools" aria-label="문서 보기 도구">
              <button type="button" className="active" aria-label="목록 보기">
                <List size={17} />
              </button>
              <button type="button" aria-label="카드 보기">
                <Grid2x2 size={17} />
              </button>
              <button type="button" aria-label="복사 보기">
                <Copy size={16} />
              </button>
              <button type="button" aria-label="문서 정보">
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>

        <nav className="my-documents-tabs" aria-label="내 문서 분류">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={index === 0 ? 'active' : ''}>
              {tab}
            </button>
          ))}
        </nav>

        <div className="my-documents-filter-row" aria-label="내 문서 필터">
          {filters.map((filter) => (
            <button key={filter.label} type="button" className="my-documents-filter-chip">
              <span>{filter.label}</span>
              {filter.value && <strong>{filter.value}</strong>}
              <ChevronDown size={13} />
            </button>
          ))}
          <button type="button" className="my-documents-filter-add">
            <Plus size={13} />
            <span>필터 추가</span>
          </button>
        </div>
      </div>

      <section className="my-documents-content" aria-label="내 문서 콘텐츠" />
    </div>
  );
}

export default MyDocuments;
