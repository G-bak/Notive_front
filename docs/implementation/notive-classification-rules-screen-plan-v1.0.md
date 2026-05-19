# Notive Classification Rules Screen Implementation Plan v1.0

# 1. Purpose

This document defines the implementation plan for the `분류 규칙` screen, based on the generated reference image:

`public/screenshots/notive-webapp-16-classification-rules.png`

The implementation must use the existing application shell. The current sidebar and top header remain fixed and shared. Only the content area is implemented to match the reference screen.

---

# 2. Reference Image Analysis

## 2.1 Screen Intent

The screen is a governance/admin workspace for applying document classification rules. It helps admins manage:

* automatic document type classification
* sensitive information labels
* external sharing approval rules
* AI reference exclusion rules
* retention policies
* rule conflicts and audit trail

## 2.2 Visual Structure

The reference content area uses a dense three-zone layout:

1. Top area
   * title and description
   * four KPI cards
   * rule category tabs
   * actions: rule test center, new rule, more menu

2. Main work area
   * left category panel
   * center rule table
   * rule edit modal floating over the table
   * right inspector panel

3. Interaction surface
   * selected row is highlighted in pale green
   * modal shows an IF/THEN rule builder
   * right inspector explains the selected rule and conflict status

## 2.3 Layout Measurements

Use the current app shell:

* shared sidebar: existing `.sidebar`
* shared top header: existing `.top-header`
* content wrapper: `.page-content`

Inside content:

* full-height content grid
* top KPI cards: four columns
* body grid: `220px minmax(620px, 1fr) 340px`
* 8px border radius for panels/cards/buttons
* thin `#e2e8f0` and `#e5e7eb` borders
* compact table rows around 52-58px height

## 2.4 Color And Tone

The content should follow the existing Notive UI tokens:

* primary: `#006853`
* primary hover/dark: `#005242`
* selected pale green: `#eef8f4`
* text strong: `#0f172a`
* text normal: `#334155`
* muted text: `#64748b`
* borders: `#e2e8f0`, `#e5e7eb`
* warning: amber
* conflict: red

The screen should feel like an operations console, but it must not replace the existing white sidebar or header.

---

# 3. Route And Navigation Plan

## 3.1 Route

Add a new route:

```text
/classification-rules
```

## 3.2 Sidebar

Add `분류 규칙` to the `지식` navigation group.

Navigation behavior:

* click moves to `/classification-rules`
* active state applies when pathname is `/classification-rules`
* use a rule/governance-style lucide icon

---

# 4. Component Plan

Create:

```text
src/pages/ClassificationRules.jsx
src/pages/ClassificationRules.css
```

## 4.1 Data Sections

Use static UI data for now:

* `summaryCards`
* `tabs`
* `categories`
* `rules`
* `triggerConditions`
* `ruleActions`
* `affectedTeams`
* `executionResults`
* `auditItems`

## 4.2 Main Component Sections

The page component should render:

1. `ClassificationRulesHeader`
2. `SummaryCards`
3. `RuleTabsAndActions`
4. `RulesWorkspace`
5. `CategoryPanel`
6. `RulesTable`
7. `RuleEditModal`
8. `RuleInspector`

Keep the implementation as a single page file unless extraction becomes necessary.

---

# 5. Detailed UI Specification

## 5.1 Header

Text:

* title: `분류 규칙`
* description: `문서 유형과 메타데이터를 기준으로 자동 분류와 권한 정책을 적용합니다.`

## 5.2 KPI Cards

Cards:

| Label | Value | Subtext | Tone |
| --- | --- | --- | --- |
| 활성 규칙 | 16 | 전체 18개 | green |
| 자동 분류율 | 87% | 지난 30일 기준 | green |
| 검토 대기 | 23 | 분류 대기 문서 | amber |
| 정책 충돌 | 2 | 충돌 중인 규칙 | red |

## 5.3 Tabs

Tabs:

* 전체 규칙
* 문서 유형
* 민감 정보
* 보존 정책
* AI 참조

## 5.4 Left Category Panel

Rows:

* 전체 규칙 18
* 문서 유형 6
* 부서/팀 3
* 태그 4
* 민감도 3
* 보존 기간 2
* 외부 공유 2

Below the category list, show a small information box:

* title: `규칙 우선순위 안내`
* body: `숫자가 낮을수록 우선 적용됩니다. 동일 우선순위는 생성 순서 기준.`

## 5.5 Rules Table

Columns:

* drag handle
* priority
* rule name
* condition
* action
* status
* last run
* accuracy

Rows:

1. 계약서 자동 분류
2. 개인정보 포함 문서 마스킹
3. 외부 공유 승인 필요
4. AI 참조 제외
5. 7년 보존 정책
6. 인사 문서 접근 제한
7. 재무 보고 자동 분류
8. 임시 문서 자동 만료

The second row is selected and highlighted.

## 5.6 Rule Edit Modal

Modal title: `규칙 편집`

Fields:

* `규칙 이름`
* `우선순위`
* `IF 조건`
* `THEN 작업`

Rule builder chips:

IF:

* `본문에 주민등록번호 패턴 포함`
* `AND`
* `문서 유형 = 보고서`
* `+ 조건 추가`

THEN:

* `민감 정보 라벨 적용`
* `외부 공유 차단`
* `AI 참조 제외`
* `+ 작업 추가`

Footer:

* `규칙 테스트`
* `취소`
* `저장`

## 5.7 Right Inspector

Panel sections:

* selected rule title: `개인정보 포함 문서 마스킹`
* status badge: `활성`
* priority: `우선순위 2`
* rule summary
* trigger conditions
* actions
* affected teams
* last run result
* conflict warning
* audit log

---

# 6. Styling Plan

## 6.1 CSS Scope

Use the prefix:

```text
classification-
```

Avoid changing shared styles unless required for the sidebar menu.

## 6.2 Responsive Behavior

The reference target is desktop. For smaller widths:

* collapse the three-column workspace into one column under `1200px`
* allow horizontal scroll for the rule table
* keep the modal within viewport width

---

# 7. Implementation Steps

1. Add the markdown plan.
2. Add `ClassificationRules.jsx`.
3. Add `ClassificationRules.css`.
4. Register `/classification-rules` route in `App.jsx`.
5. Add sidebar menu item in `Sidebar.jsx`.
6. Build and fix compile errors.
7. Open `/classification-rules` with Playwright.
8. Capture screenshot and compare with the reference.
9. Adjust spacing, panel widths, selected states, modal position, and right inspector density.
10. Run final build.

---

# 8. Acceptance Criteria

The work is complete when:

* `/classification-rules` renders without runtime errors.
* Sidebar includes `분류 규칙`.
* Active sidebar state works for the new route.
* Existing sidebar and top header remain unchanged.
* Content area visually matches the reference image structure.
* Page includes KPI cards, tabs, category panel, rules table, edit modal, and selected rule inspector.
* `npm run build` succeeds.
