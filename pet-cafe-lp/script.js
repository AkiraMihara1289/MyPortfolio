// ヘッダースクロール
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// メニュータブ
document.querySelectorAll('.menu__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu__content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
  });
});

// スクロールアニメーション
const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.about-card, .about__text, .menu-card, .animal-card, .access__left, .access__right, .menu__header'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// カードのスタッガードディレイ
['.about-card', '.menu-card', '.animal-card'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 72,
        behavior: 'smooth'
      });
    }
  });
});

// 肉球クリックエフェクト
document.addEventListener('click', e => {
  const paw = document.createElement('span');
  paw.textContent = '🐾';
  paw.style.cssText = `
    position: fixed;
    left: ${e.clientX - 12}px;
    top: ${e.clientY - 12}px;
    font-size: 1.4rem;
    pointer-events: none;
    z-index: 9999;
    animation: pawPop 0.6s ease forwards;
  `;
  document.body.appendChild(paw);
  setTimeout(() => paw.remove(), 600);
});

// 肉球エフェクトのCSS追加
const style = document.createElement('style');
style.textContent = `
  @keyframes pawPop {
    0%   { opacity: 1; transform: scale(0.5) rotate(-20deg); }
    60%  { opacity: 1; transform: scale(1.3) rotate(10deg); }
    100% { opacity: 0; transform: scale(1) rotate(0deg) translateY(-20px); }
  }
`;
document.head.appendChild(style);
