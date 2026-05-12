import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import landingHtml from './landing.html?raw';

function LandingPage() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const parsed = useMemo(() => parseLandingHtml(landingHtml), []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return undefined;

    const form = root.querySelector('#contactForm');
    const result = root.querySelector('#contactResult');
    const emailInput = root.querySelector('#cf-email');
    const extraWrap = form?.querySelector('.contact-extra-wrap');
    const footerCopyButton = root.querySelector('#footerCopyBtn');
    const footerEmail = root.querySelector('#footerEmail');
    let resetTimer = null;

    const expandContactForm = () => {
      if (!form) return;
      form.classList.add('is-expanded');
      extraWrap?.setAttribute('aria-hidden', 'false');
    };

    const handleContactSubmit = (event) => {
      event.preventDefault();
      expandContactForm();
      if (!form || !result) return;

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const company = String(formData.get('company') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      result.hidden = false;
      if (!name || !email || !message) {
        result.style.background = '#FEF3C7';
        result.style.color = '#92400E';
        result.textContent = '이름, 이메일, 문의 내용은 필수 항목입니다.';
        return;
      }

      const subject = `[Notive 문의] ${company || name}`;
      const body = [
        `이름: ${name}`,
        `회사 / 조직: ${company}`,
        `이메일: ${email}`,
        '',
        `내용:\n${message}`,
      ].join('\n');

      window.location.href = `mailto:hello@notive.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      result.style.background = '';
      result.style.color = '';
      result.textContent = '메일 앱이 열렸습니다. 작성된 내용을 확인하고 그대로 보내주세요.';
    };

    const fallbackCopy = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (_) {
        // Clipboard fallback can fail in restricted browser contexts.
      }
      document.body.removeChild(textarea);
    };

    const handleFooterCopy = () => {
      if (!footerEmail || !footerCopyButton) return;
      const text = footerEmail.textContent.trim();

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }

      footerCopyButton.classList.add('is-copied');
      footerCopyButton.setAttribute('aria-label', '복사됨');
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        footerCopyButton.classList.remove('is-copied');
        footerCopyButton.setAttribute('aria-label', '이메일 주소 복사');
      }, 1600);
    };

    const handleRouteLinks = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor || !root.contains(anchor)) return;

      const href = anchor.getAttribute('href');
      if (href === '/') {
        event.preventDefault();
        navigate('/');
        return;
      }

      if (href === '#') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (href?.startsWith('#')) {
        const target = root.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    emailInput?.addEventListener('focus', expandContactForm);
    emailInput?.addEventListener('input', expandContactForm);
    form?.addEventListener('submit', handleContactSubmit);
    footerCopyButton?.addEventListener('click', handleFooterCopy);
    root.addEventListener('click', handleRouteLinks);

    return () => {
      if (resetTimer) clearTimeout(resetTimer);
      emailInput?.removeEventListener('focus', expandContactForm);
      emailInput?.removeEventListener('input', expandContactForm);
      form?.removeEventListener('submit', handleContactSubmit);
      footerCopyButton?.removeEventListener('click', handleFooterCopy);
      root.removeEventListener('click', handleRouteLinks);
    };
  }, [navigate]);

  return (
    <div className="landing-route">
      {parsed.styles.map((style, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: parsed.body }} />
    </div>
  );
}

function parseLandingHtml(html) {
  if (typeof DOMParser === 'undefined') {
    return { styles: [], body: html };
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const styles = Array.from(doc.querySelectorAll('style')).map((style) => style.textContent || '');
  return {
    styles,
    body: doc.body?.innerHTML || html,
  };
}

export default LandingPage;
