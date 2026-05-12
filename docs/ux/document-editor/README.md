# Notive Document Editor UX Guides

이 폴더는 `/documents/{documentId}` 문서 편집 페이지의 화면 구성과 동작 원칙을 분리해서 관리한다.

## 문서 목록

| 문서 | 용도 |
| --- | --- |
| `notive-document-editor-page-guide-v1.0.md` | 문서 편집 페이지 전체 구조와 탭 관계 |
| `notive-document-editor-canvas-guide-v1.0.md` | 좌측 문서 편집 영역, 툴바, 본문 캔버스, 상태바 |
| `notive-document-editor-properties-guide-v1.0.md` | 우측 인스펙터 `속성` 탭 |
| `notive-document-editor-ai-assistant-guide-v1.0.md` | 우측 인스펙터 `AI 어시스턴트` 탭 |
| `notive-document-editor-activity-guide-v1.0.md` | 우측 인스펙터 `활동` 탭 |
| `HANDOFF-2026-05-11.md` | 2026-05-11 작업 요약과 다음 작업 인수인계 |

## 구현 기준

현재 화면 구현은 `src/pages/DocumentEditor.jsx`와 `src/pages/DocumentEditor.css`를 기준으로 한다.

가이드 문서는 화면 목적, 사용자 시나리오, 데이터/API 연결 방향, 권한/보안 원칙, 후속 구현 체크리스트를 설명한다. 실제 API 필드나 DB 스키마 변경이 필요하면 `docs/api`, `docs/database`, `docs/security` 문서와 함께 갱신해야 한다.
