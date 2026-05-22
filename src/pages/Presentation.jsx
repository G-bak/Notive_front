import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import './Presentation.css';

const slideFiles = [
  [
    '01',
    'Notive 플랫폼',
    '01-cover-notive-platform.png',
    [
      'Notive는 Note와 Active를 합친 이름처럼, 업무 기록을 실제로 실행 가능한 문서와 지식 자산으로 바꾸는 AI 업무 운영 플랫폼입니다.',
      '이 프로젝트의 핵심은 단순한 AI 문서 생성 화면 하나가 아닙니다. 문서함, 업무 기록, To-do, 템플릿, 회사 자료실, 검색, 권한 관리가 하나의 업무 흐름으로 연결되는 제품입니다.',
      '사용자는 문서를 처음부터 새로 쓰는 대신, 이미 회사 안에 쌓인 맥락을 바탕으로 초안을 만들고, 검토하고, 저장하고, 공유하는 경험을 하게 됩니다.',
    ],
  ],
  [
    '02',
    '우리가 겪는 문제',
    '02-current-work-problems.png',
    [
      '기업 안에는 이미 많은 정보가 있습니다. 보고서, 회의록, 제안서, 업무 일지, To-do, 프로젝트 메모가 계속 쌓입니다.',
      '문제는 이 정보들이 여러 도구와 폴더에 흩어져 있어서, 문서를 만들 때마다 다시 찾고 다시 정리해야 한다는 점입니다.',
      '그 결과 반복 문서 작성 시간이 길어지고, 사람마다 문서 품질과 양식이 달라지며, 신규 구성원이나 다른 부서가 업무 맥락을 파악하기도 어려워집니다.',
      'Notive는 이 문제를 문서 작성 문제가 아니라, 조직의 업무 맥락이 연결되지 않는 문제로 보고 있습니다.',
    ],
  ],
  [
    '03',
    'Notive의 해결 방식',
    '03-notive-solution-hub.png',
    [
      'Notive의 해결 방식은 업무 데이터를 문서 중심으로 다시 연결하는 것입니다.',
      '기존 문서, 업무 다이어리, To-do, 프로젝트 상태, 템플릿, 회사 자료실을 AI 문서 생성과 검색의 참고 맥락으로 활용합니다.',
      '중요한 점은 사용자가 모든 정보를 프롬프트에 다시 설명하지 않아도 된다는 것입니다.',
      '사용자는 필요한 자료를 선택하고, Notive는 권한을 확인한 뒤 그 자료와 템플릿을 바탕으로 회사 맥락에 맞는 문서 초안을 만듭니다.',
    ],
  ],
  [
    '04',
    '핵심 기능',
    '04-notive-four-pillars.png',
    [
      '프로젝트 전체를 보면 Notive의 핵심은 크게 다섯 축으로 볼 수 있습니다.',
      '첫째는 AI 문서 생성입니다. 보고서, 회의록, 제안서, SOP 같은 문서를 템플릿과 업무 맥락 기반으로 생성합니다.',
      '둘째는 중앙 문서 관리입니다. 문서 목록, 문서 정보, 공유 범위, 버전 기록, 연결된 항목까지 한 화면에서 관리합니다.',
      '셋째는 지식 허브와 회사 자료실입니다. 회사 공통 자료와 템플릿을 정리하고, AI가 참고할 수 있는 상태로 관리합니다.',
      '넷째는 검색과 AI 요약입니다. 자연어 검색, 출처 표시, 권한 기반 결과 제한이 함께 들어갑니다. 마지막은 설정, 분류 규칙, 권한 정책 같은 운영 관리 기능입니다.',
    ],
  ],
  [
    '05',
    '기본 사용 흐름',
    '05-basic-user-flow.png',
    [
      '사용자의 기본 흐름은 AI 문서 생성 화면에서 시작됩니다.',
      '먼저 주간 업무 보고서, 회의록, 제안서, SOP처럼 문서 유형을 선택하고, 회사나 팀에서 승인된 템플릿을 고릅니다.',
      '그 다음 요청 내용을 입력하고, 업무 일지, To-do, 참조 문서 같은 업무 맥락을 선택합니다. 이때 선택한 자료는 접근 권한 안에서만 AI가 활용합니다.',
      '생성 결과 화면에서는 초안, 출처, 품질 점검, 권한 안내를 확인하고, 필요하면 편집기로 넘겨 저장하거나 공유합니다.',
      '즉, Notive의 흐름은 생성에서 끝나는 것이 아니라 문서 저장, 편집, 버전 관리, 공유까지 이어지는 실제 업무 흐름입니다.',
    ],
  ],
  [
    '06',
    '주간 보고서 예시',
    '06-weekly-report-example.png',
    [
      '가장 대표적인 사용 사례는 주간 업무 보고서입니다.',
      '사용자가 이번 주 업무 보고서를 요청하면, Notive는 업무 일지, 완료된 To-do, 미완료 항목, 최근 회의 내용, 관련 문서를 참고합니다.',
      '그리고 회사 표준 템플릿에 맞춰 완료 업무, 진행 중 업무, 주요 이슈, 다음 주 계획, 확인 필요 사항을 구분한 초안을 만듭니다.',
      '이 초안은 바로 확정되는 문서가 아닙니다. 사용자가 수치와 사실 관계를 검토하고 수정한 뒤 저장해야 정식 문서가 됩니다.',
      '이 구조 덕분에 평소 짧게 남긴 기록이 주간 보고서, 회의록, 제안서 같은 공식 문서로 자연스럽게 전환됩니다.',
    ],
  ],
  [
    '07',
    '사내 지식 검색',
    '07-knowledge-search.png',
    [
      'Notive의 검색은 단순히 문서 제목을 찾는 기능이 아니라, 조직 지식을 다시 활용하기 위한 기능입니다.',
      '검색 화면에서는 문서 유형, 작성자, 날짜, 접근 권한 같은 필터를 쓰고, 자연어로도 필요한 자료를 찾을 수 있습니다.',
      'AI 요약은 검색 결과 중 사용자가 접근할 수 있는 출처만 사용해서 답변을 만들고, 어떤 문서를 근거로 했는지 함께 보여줍니다.',
      '지식 허브에서는 문서의 승인 상태, AI 참고 가능 여부, 권한 상속, 만료 문서, 색인 상태까지 관리합니다.',
      '결국 검색은 자료를 찾는 기능을 넘어, 회사 문서가 계속 재사용되는 지식 자산이 되게 만드는 장치입니다.',
    ],
  ],
  [
    '08',
    '안전하게 쓰는 AI',
    '08-safe-ai-permissions.png',
    [
      '이 프로젝트에서 보안과 권한은 부가 기능이 아니라 제품의 기본 조건입니다.',
      '문서 조회, 검색 결과, AI 참고 자료, 업무 기록은 모두 조직 경계와 사용자 권한을 기준으로 제한됩니다.',
      '권한 없는 문서는 검색 결과에도 나오면 안 되고, AI가 초안 생성에 참고해서도 안 됩니다.',
      '또한 AI 결과는 항상 초안입니다. 사용자의 확인 없는 자동 저장이나 자동 공유는 MVP 범위에서 제외되어 있습니다.',
      '활동 로그 역시 문서 본문이나 AI 요청 원문을 과도하게 남기지 않고, 필요한 메타데이터 중심으로 관리하는 방향입니다.',
    ],
  ],
  [
    '09',
    '부서별 효과',
    '09-department-benefits.png',
    [
      'Notive는 특정 직무 하나만을 위한 도구가 아니라, 조직 안의 여러 역할이 함께 쓰는 운영 플랫폼입니다.',
      '일반 직원은 반복되는 보고서와 회의록 초안을 빠르게 만들고, 팀 리더는 공유 문서와 버전 기록을 보며 문서 품질을 관리할 수 있습니다.',
      '관리자는 사용자, 팀, 역할, 템플릿, 보안 정책, 분류 규칙을 관리하고, 외부 공유나 민감 정보 문서에 대한 정책을 적용할 수 있습니다.',
      '마케팅팀은 캠페인 보고서를, 영업팀은 제안서를, 인사팀은 제도 안내 문서를, 보안팀은 정책 문서를 템플릿과 회사 자료를 바탕으로 표준화할 수 있습니다.',
      '공통 효과는 문서 작성 시간 단축, 품질 표준화, 업무 히스토리 축적, 기존 문서 재사용률 향상입니다.',
    ],
  ],
  [
    '10',
    '마무리',
    '10-closing-workflow.png',
    [
      '정리하면 Notive는 문서를 새로 쓰는 시간을 줄이는 제품이면서, 동시에 회사의 업무 흐름을 문서와 지식 자산으로 바꾸는 제품입니다.',
      '프로젝트 구현 계획도 이 방향에 맞춰 설계되어 있습니다. 기초 설계, 인증과 조직, 문서 관리, AI 문서 생성, 업무 맥락, 검색, 관리자 운영, 안정화와 출시 단계로 이어집니다.',
      '초기 MVP는 모든 자동화를 한 번에 만들기보다, 회사 맥락을 반영한 AI 문서 생성이 실제 업무 시간을 줄이고 문서 품질을 높이는지 검증하는 데 집중합니다.',
      '결국 Notive가 만들고자 하는 경험은 명확합니다. 기록하고, 찾고, 생성하고, 검토하고, 공유하는 업무 흐름을 하나의 플랫폼 안에서 완성하는 것입니다.',
    ],
  ],
  [
    '11',
    'AI 모드',
    '11-ai-mode.png',
    [
      '마지막으로 AI 모드는 문서 편집 경험 안에 들어가는 업무 보조 기능입니다.',
      '편집기에서는 현재 문서, 참조 문서, 업무 다이어리, To-do 같은 컨텍스트를 바탕으로 요약, 문체 수정, 임원 보고용 축약, 액션 아이템 추출 같은 빠른 작업을 요청할 수 있습니다.',
      '오른쪽 패널에서는 AI 생성 정보, 참고 자료, 공유 범위, 버전 기록, 활동 타임라인을 함께 확인할 수 있습니다.',
      '중요한 점은 AI가 문서를 완전히 대신 처리하는 구조가 아니라는 것입니다. AI는 초안을 만들고 보조하지만, 최종 검토와 저장, 공유 결정은 사용자가 합니다.',
      '그래서 Notive의 AI는 자동화 도구라기보다, 회사의 문서 기준과 권한 경계 안에서 작동하는 업무 문서 작성 보조자에 가깝습니다.',
    ],
  ],
];

const slideDuration = 7000;

function Presentation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const slides = useMemo(
    () =>
      slideFiles.map(([number, title, fileName, script]) => ({
        number,
        title,
        script,
        src: new URL(`../../output/notive-intro-slides/${fileName}`, import.meta.url).href,
      })),
    [],
  );

  const activeSlide = slides[activeIndex];

  const goToSlide = useCallback((nextIndex) => {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    setActiveIndex(normalizedIndex);
    setProgressKey((key) => key + 1);
  }, [slides.length]);

  const goToNext = () => goToSlide(activeIndex + 1);
  const goToPrevious = () => goToSlide(activeIndex - 1);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = window.setTimeout(() => {
      goToSlide(activeIndex + 1);
    }, slideDuration);

    return () => window.clearTimeout(timer);
  }, [activeIndex, goToSlide, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }

      if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying((playing) => !playing);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        goToSlide(slides.length - 1);
      }

      if (event.key === 'Escape' && isSlideFullscreen) {
        event.preventDefault();
        setIsSlideFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, goToSlide, isSlideFullscreen, slides.length]);

  const handleFullscreen = () => {
    setIsSlideFullscreen(true);
  };

  return (
    <main className={`presentation-page ${isNotesOpen ? 'notes-open' : 'notes-collapsed'}`}>
      <section className="presentation-stage" aria-label="Notive introduction slide deck">
        <div className="presentation-slide-shell">
          <img
            key={activeSlide.src}
            className="presentation-slide-image"
            src={activeSlide.src}
            alt={`${activeSlide.number}. ${activeSlide.title}`}
            draggable="false"
          />
        </div>

        <button
          className="presentation-nav presentation-nav-prev"
          type="button"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          className="presentation-nav presentation-nav-next"
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </section>

      <aside
        className={`presentation-speaker-notes ${isNotesOpen ? 'is-open' : 'is-collapsed'}`}
        aria-label="Slide speaker notes"
      >
        <div className="speaker-notes-top">
          {isNotesOpen && (
            <div className="speaker-notes-header">
              <span>발표 대본</span>
              <strong>{activeSlide.number}</strong>
            </div>
          )}
          <button
            className="speaker-notes-toggle"
            type="button"
            onClick={() => setIsNotesOpen((open) => !open)}
            aria-expanded={isNotesOpen}
            aria-label={isNotesOpen ? '대본 접기' : '대본 열기'}
          >
            {isNotesOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        {isNotesOpen && (
          <>
            <h2>{activeSlide.title}</h2>
            <div className="speaker-notes-body">
              {activeSlide.script.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </aside>

      <aside className="presentation-console" aria-label="Presentation controls">
        <div className="presentation-meta">
          <span className="presentation-eyebrow">Notive Introduction</span>
          <strong>{activeSlide.title}</strong>
          <span>
            {activeSlide.number} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        <div className="presentation-progress" aria-hidden="true">
          <div
            key={`${progressKey}-${isPlaying}`}
            className={`presentation-progress-fill ${isPlaying ? 'is-playing' : ''}`}
            style={{ animationDuration: `${slideDuration}ms` }}
          />
        </div>

        <div className="presentation-actions">
          <button type="button" onClick={() => setIsPlaying((playing) => !playing)}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? '일시정지' : '재생'}</span>
          </button>
          <button type="button" onClick={() => goToSlide(0)}>
            <RotateCcw size={18} />
            <span>처음</span>
          </button>
          <button type="button" onClick={handleFullscreen}>
            <Maximize2 size={18} />
            <span>전체화면</span>
          </button>
        </div>

        <div className="presentation-thumbnails">
          {slides.map((slide, index) => (
            <button
              key={slide.number}
              className={`presentation-thumb ${index === activeIndex ? 'active' : ''}`}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`${slide.number}. ${slide.title}`}
            >
              <img src={slide.src} alt="" draggable="false" />
              <span>{slide.number}</span>
            </button>
          ))}
        </div>
      </aside>

      {isSlideFullscreen && (
        <div className="presentation-slide-fullscreen" aria-label="Fullscreen slide viewer">
          <img
            key={`fullscreen-${activeSlide.src}`}
            className="presentation-slide-fullscreen-image"
            src={activeSlide.src}
            alt={`${activeSlide.number}. ${activeSlide.title}`}
            draggable="false"
          />
        </div>
      )}
    </main>
  );
}

export default Presentation;
