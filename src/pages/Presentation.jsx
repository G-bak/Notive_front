import { useEffect, useMemo, useRef, useState } from 'react';
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
  ['01', 'Notive 플랫폼', '01-cover-notive-platform.png'],
  ['02', '우리가 겪는 문제', '02-current-work-problems.png'],
  ['03', 'Notive의 해결 방식', '03-notive-solution-hub.png'],
  ['04', '핵심 기능', '04-notive-four-pillars.png'],
  ['05', '기본 사용 흐름', '05-basic-user-flow.png'],
  ['06', '주간 보고서 예시', '06-weekly-report-example.png'],
  ['07', '사내 지식 검색', '07-knowledge-search.png'],
  ['08', '안전하게 쓰는 AI', '08-safe-ai-permissions.png'],
  ['09', '부서별 효과', '09-department-benefits.png'],
  ['10', '마무리', '10-closing-workflow.png'],
  ['11', 'AI 모드', '11-ai-mode.png'],
];

const slideDuration = 7000;

function Presentation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlideFullscreen, setIsSlideFullscreen] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const slides = useMemo(
    () =>
      slideFiles.map(([number, title, fileName]) => ({
        number,
        title,
        src: new URL(`../../output/notive-intro-slides/${fileName}`, import.meta.url).href,
      })),
    [],
  );

  const activeSlide = slides[activeIndex];

  const goToSlide = (nextIndex) => {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    setActiveIndex(normalizedIndex);
    setProgressKey((key) => key + 1);
  };

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
  }, [activeIndex, isPlaying, slides.length]);

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
  }, [activeIndex, isSlideFullscreen, slides.length]);

  const handleFullscreen = () => {
    setIsSlideFullscreen(true);
  };

  return (
    <main className="presentation-page">
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
