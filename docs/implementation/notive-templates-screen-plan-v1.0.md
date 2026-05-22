# Notive Templates Screen Implementation Plan v1.0

## 1. 목적

템플릿 화면은 조직/팀 단위 문서 템플릿을 검색, 분류, 검토, 편집, 가져오기 할 수 있는 관리형 업무 화면이다.

이번 구현은 `public/screenshots/notive-webapp-15-templates.png`를 기준 레퍼런스로 삼는다. 사이드바와 상단 헤더는 공통 레이아웃으로 고정하며, 구현 대상은 상단 헤더 아래의 content 영역만이다.

## 2. 고정 영역

수정하지 않는 영역:

- `Sidebar`
- `TopHeader`
- `.main-content` 기본 shell

템플릿 화면은 `page-content` 내부에서만 구성한다.

권장 라우트:

- 신규 경로: `/templates`
- 사이드바 `템플릿` 메뉴 클릭 시 `/templates`로 이동
- 기존 `/knowledge`는 지식 허브 화면으로 유지

## 3. 기준 레이아웃

전체 content는 오른쪽 상세 패널이 있는 2컬럼 구조로 잡는다.

```jsx
<div className="page-content templates-page">
  <div className="templates-layout">
    <main className="templates-main">
      ...
    </main>
    <aside className="templates-inspector">
      ...
    </aside>
  </div>
</div>
```

레이아웃 기준:

- `.templates-page`: `padding: 0`, `overflow: hidden`
- `.templates-layout`: `grid-template-columns: minmax(0, 1fr) 320px`, `gap: 0`, `min-height: 0`
- `.templates-main`: 내부 스크롤 가능, 좌우 패딩 적용
- `.templates-inspector`: 오른쪽 독립 컬럼, `border-left`, 독립 스크롤

이 구조는 `/documents`와 `/company-library`의 최종 컬럼 구조를 따른다.

## 4. 상단 타이틀 영역

레퍼런스 텍스트:

- 제목: `템플릿`
- 설명: `문서 유형별 템플릿을 관리하고 AI 생성 품질을 표준화합니다.`

구성:

- 왼쪽 타이틀/설명
- 별도 큰 히어로 영역 없음
- 상단 헤더와 분리된 content 내부 첫 행

스타일 기준:

- 제목은 기존 page title 계열 유지
- 설명은 `13px ~ 14px`, muted color
- 하단 KPI와 간격은 약 `18px`

## 5. KPI 카드

레퍼런스 구성:

1. 등록 템플릿: `42`
2. AI 참조 가능: `31`
3. 검토 필요: `5`
4. 이번 달 사용: `382`

스타일:

- 4열 grid
- 높이 약 `86px ~ 96px`
- `border: 1px solid #dfe6ee`
- `border-radius: 8px`
- 값은 큰 숫자, `font-weight: 700`
- 우측에는 아이콘 원형 배지

아이콘:

- 등록 템플릿: clipboard/template 계열
- AI 참조 가능: check circle 계열
- 검토 필요: warning triangle 계열, orange tone
- 이번 달 사용: chart/bar 계열, blue tone

## 6. 탭

레퍼런스 탭:

- 전체
- 보고서
- 회의록
- 제안서
- SOP
- 정책 문서

기능:

- 클릭 시 active 스타일 변경
- active 탭 기준 카드/테이블 목록 필터링

스타일:

- 하단 border line
- active underline `2px`
- active color `#006853`
- button spacing은 gap이 아니라 padding 기반
- font-weight `600`

## 7. 툴바

요소:

- 검색 input: `템플릿 검색...`
- 문서 유형 select: `문서 유형 전체`
- 소유 팀 select: `소유 팀 전체`
- AI 참조 select: `AI 참조 전체`
- 우측 버튼:
  - `+ 새 템플릿`
  - `가져오기`

구현 기준:

- 검색은 실제 입력 가능한 controlled input
- select는 native `<select>`보다 기존 프로젝트의 custom filter pill/dropdown 패턴 우선
- `/knowledge`의 `KnowledgeFilterSelect` 스타일을 재사용하거나 동일한 구조로 작성
- 버튼은 회사 자료실/분류 규칙의 버튼 높이와 radius 기준을 따른다

## 8. 추천/대표 템플릿 카드

레퍼런스 카드 4개:

1. 주간 업무 보고서
2. 회의록
3. 고객 제안서
4. SOP

카드 구조:

- 좌측 문서 미리보기 썸네일
- 템플릿명
- AI 참조 배지
- 버전
- 소유 팀
- 사용 횟수

선택 상태:

- 선택된 카드에 green border
- 카드 우측 상단에 check icon
- 선택 시 오른쪽 상세 패널 정보 갱신

스타일:

- 4열 grid
- 카드 높이는 약 `112px ~ 124px`
- 문서 썸네일은 실제 이미지/문서 아이콘 기반
- 카드 내부는 과도한 장식 없이 업무 도구처럼 조밀하게 구성

## 9. 중앙 템플릿 테이블

컬럼:

- 이름
- 유형
- 소유 팀
- 버전
- 사용 횟수
- AI 참조
- 승인 상태
- 최근 업데이트
- 더보기

권장 구조:

- 실제 표 성격이 강하지만 기존 프로젝트 패턴에 맞춰 CSS grid row 사용 가능
- `KnowledgeTemplateHub`의 table grid 스타일을 우선 참고

행 데이터 예시:

- 주간 업무 보고서 (표준), 보고서, 마케팅팀, v2.1, 128, 참조 가능, 승인됨, 2024.05.18
- 월간 성과 보고서, 보고서, 마케팅팀, v1.8, 86, 참조 가능, 승인됨, 2024.05.16
- 회의록 (표준), 회의록, 경영지원팀, v1.3, 74, 참조 가능, 승인됨, 2024.05.14
- 고객 제안서 (기본), 제안서, 영업팀, v2.0, 64, 참조 가능, 승인됨, 2024.05.12
- 프로젝트 제안서, 제안서, 영업팀, v1.5, 31, 검토 필요, 검토 필요, 2024.05.10
- SOP (표준), SOP, 운영팀, v1.2, 52, 참조 가능, 승인됨, 2024.05.08
- 업무 절차서, SOP, 운영팀, v1.0, 29, 참조 가능, 승인됨, 2024.05.06
- 보안 정책, 정책 문서, 정보보안팀, v1.4, 18, 참조 제한, 승인됨, 2024.05.01

행 스타일:

- 선택 row pale green background
- hover `#fbfdff`
- 문서 아이콘은 기존 `ref-icon-*` 사용
- 긴 이름은 ellipsis
- 상태/버전/횟수는 말줄임 금지

## 10. 오른쪽 상세 패널

구조:

```jsx
<aside className="templates-inspector">
  <header>선택한 템플릿 정보</header>
  ...
</aside>
```

섹션:

1. 선택한 템플릿 요약
2. 기본 메타 정보
3. 구성 섹션
4. 품질 체크리스트
5. 최근 사용 현황

레퍼런스 내용:

- 선택한 템플릿 정보
- 템플릿명: `주간 업무 보고서 (표준)`
- AI 참조 가능 배지
- 버전: `v2.1`
- 최신 버전 배지
- 문서 유형: 보고서
- 소유 팀: 마케팅팀
- 생성일: 2024.03.02
- 최근 업데이트: 2024.05.18 (김지훈)
- 사용 횟수: 128회
- 설명: 주간 업무 진행 현황과 성과를 정리하는 표준 보고서 템플릿

구성 섹션:

- 표지: 필수
- 요약: 필수
- 주요 성과: 필수
- 진행 현황: 필수
- 다음 계획: 선택
- 리스크: 선택

품질 체크리스트:

- 필수 섹션 포함
- 예시 문장 포함
- 변수 필드 사용
- 권한 준수

최근 사용 현황:

- 김지훈 (마케팅팀), 2024.05.18, 3회
- 이수연 (마케팅팀), 2024.05.17, 2회
- 박민수 (마케팅팀), 2024.05.16, 1회

패널 스타일:

- `/documents`와 같은 오른쪽 컬럼 방식
- absolute 배치 금지
- `width: 320px` 컬럼
- `border-left: 1px solid #e5e7eb`
- 독립 스크롤
- 패널 내부 padding은 과하지 않게 `14px 12px` 수준

## 11. 템플릿 편집 모달

레퍼런스에는 편집 모달이 열린 상태가 보인다.

초기 구현 기준:

- 모달 마크업은 준비 가능
- 기본 상태는 숨김
- `새 템플릿` 또는 row/card 편집 액션 클릭 시 표시

모달 구조:

- 제목: `템플릿 편집`
- 좌측: 기본 정보
  - 템플릿명
  - 설명
  - 문서 유형
  - 소유 팀
  - AI 참고 설정 radio
- 우측: 구성 섹션 관리
  - 섹션 목록
  - 필수/선택 배지
  - 섹션 추가 버튼
- footer:
  - 취소
  - 저장

스타일:

- 레퍼런스처럼 중앙 하단에 뜨는 dialog
- width 약 `620px ~ 680px`
- 좌우 2컬럼
- overlay는 연한 투명 배경

## 12. 상태 관리

필요 state:

- `activeTab`
- `searchQuery`
- `selectedType`
- `selectedTeam`
- `selectedAiReference`
- `selectedTemplateId`
- `isEditorOpen`
- `editingTemplate`

필터 순서:

1. 탭
2. 검색어
3. 문서 유형
4. 소유 팀
5. AI 참조 가능 여부

선택 동작:

- 카드 클릭 시 selected template 변경
- 테이블 row 클릭 시 selected template 변경
- 상세 패널은 selected template 기준으로 갱신

## 13. 파일 구성

신규 파일:

- `src/pages/Templates.jsx`
- `src/pages/Templates.css`

수정 파일:

- `src/App.jsx`
  - `/templates` route 추가
- `src/components/Sidebar.jsx`
  - 템플릿 메뉴에 active state 및 `navigate('/templates')` 추가

참고 파일:

- `src/pages/KnowledgeTemplateHub.jsx`
- `src/pages/KnowledgeTemplateHub.css`
- `src/pages/CompanyLibrary.jsx`
- `src/pages/CompanyLibrary.css`
- `src/index.css`의 `.my-documents-layout`, `.doc-inspector` 계열 구조

## 14. 스타일 원칙

- 카드 radius는 8px 이하
- 버튼 높이는 기존 34px/36px 체계를 유지
- 텍스트는 컨테이너를 넘치지 않게 ellipsis 처리
- 겹치는 요소 금지
- 색상은 기존 primary `#006853` 기준
- 문서 아이콘은 기존 `public/document-icons/ref-icon-*.png` 사용
- `small-icon-*` 사용 금지
- 우측 패널 닫기 X 아이콘 사용 금지

## 15. 구현 순서

1. `/templates` 라우트와 사이드바 연결
2. `Templates.jsx`, `Templates.css` 생성
3. 전체 layout 구성
4. 타이틀/KPI 카드 구현
5. 탭 구현 및 active state 연결
6. 툴바 검색/input/dropdown 구현
7. 대표 템플릿 카드 구현
8. 중앙 테이블 구현
9. 오른쪽 상세 패널 구현
10. 편집 모달은 숨김 상태로 준비
11. 필터링/선택 상태 연결
12. 브라우저에서 `/templates` 확인
13. `eslint` 및 필요 시 build 검증

## 16. 검증 기준

- 사이드바와 상단 헤더는 그대로 유지된다.
- `/templates` content만 레퍼런스 화면과 같은 구조로 렌더링된다.
- 오른쪽 상세 패널은 grid 형제 컬럼이며 absolute가 아니다.
- 템플릿 카드 선택 시 상세 패널이 갱신된다.
- 탭/검색/dropdown 필터가 목록에 실제 반영된다.
- 테이블 텍스트가 겹치지 않는다.
- 문서 아이콘은 기존 `ref-icon-*`만 사용한다.
- 콘솔 에러가 없다.
