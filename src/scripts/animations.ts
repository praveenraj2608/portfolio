import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARMED = 'js-anim';
const root = document.documentElement;
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx: gsap.Context | null = null;
let mm: gsap.MatchMedia | null = null;

const all = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
const one = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector<T>(sel);

/* ---------- always on (also with reduced motion) ---------- */

function header() {
  const el = one('[data-header]');
  if (!el) return;
  ScrollTrigger.create({
    start: 40,
    end: 'max',
    onToggle: (self) => el.classList.toggle('is-scrolled', self.isActive),
  });
}

function progress() {
  const bar = one('[data-progress]');
  if (!bar) return;
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

/* ---------- motion ---------- */

function scramble(el: HTMLElement) {
  const final = el.textContent ?? '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration: 1.1,
    ease: 'none',
    onUpdate() {
      const n = Math.floor(state.p * final.length);
      el.textContent = final.slice(0, n) + final.slice(n).replace(/\S/g, () => chars[(Math.random() * chars.length) | 0]);
    },
    onComplete() {
      el.textContent = final;
    },
  });
}

function hero() {
  const photo = one('[data-hero-photo]');
  const img = photo?.querySelector('img, svg');
  const lines = all('[data-hero-line]');
  const fades = all('[data-hero-fade]');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
  if (photo) {
    tl.fromTo(
      photo,
      { clipPath: 'inset(100% 0% 0% 0% round 18px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1.4, ease: 'expo.inOut' },
      0,
    );
  }
  if (img) tl.from(img, { scale: 1.25, duration: 1.8 }, 0.25);
  if (lines.length) tl.from(lines, { yPercent: 110, stagger: 0.1 }, 0.35);
  if (fades.length) tl.from(fades, { autoAlpha: 0, y: 24, stagger: 0.08, duration: 1 }, 0.65);

  const scrambles = all('[data-scramble]');
  scrambles.forEach((el, i) => tl.add(scramble(el), 1.1 + i * 0.15));
}

function reveals() {
  const items = all('[data-reveal]');
  if (!items.length) return;
  gsap.set(items, { autoAlpha: 0, y: 32 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'expo.out', overwrite: 'auto' }),
  });
}

function marquee() {
  const track = one('[data-marquee]');
  if (!track) return;
  const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
  // Start far into the loop so a negative timeScale can play backwards freely.
  loop.totalTime(loop.duration() * 100);

  let dir = 1;
  ScrollTrigger.create({
    onUpdate(self) {
      dir = self.direction;
      const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 400);
      gsap.to(loop, {
        timeScale: dir * boost,
        duration: 0.2,
        overwrite: true,
        onComplete: () => {
          gsap.to(loop, { timeScale: dir, duration: 1.2, overwrite: true });
        },
      });
    },
  });
}

function parallax() {
  all('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

function counters() {
  all('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count ?? '0');
    const decimals = Number(el.dataset.decimals ?? 0);
    const state = { v: 0 };
    el.textContent = (0).toFixed(decimals);
    gsap.to(state, {
      v: end,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = state.v.toFixed(decimals);
      },
      onComplete: () => {
        el.textContent = end.toFixed(decimals);
      },
    });
  });
}

function timelineRail() {
  const rail = one('[data-rail]');
  if (!rail) return;
  gsap.fromTo(
    rail,
    { strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: '[data-timeline]', start: 'top 75%', end: 'bottom 60%', scrub: true },
    },
  );
}

function connectors() {
  all('[data-connector]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      duration: 0.9,
      delay: 0.35,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/* ---------- pointer-only ---------- */

function tilt(cleanups: (() => void)[]) {
  all('[data-card]').forEach((card) => {
    gsap.set(card, { transformPerspective: 1100 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });

    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 6);
      rx((0.5 - py) * 6);
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };

    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    });
  });
}

function magnetic(cleanups: (() => void)[]) {
  all('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
    });
  });
}

/* ---------- lifecycle ---------- */

function teardown() {
  mm?.revert();
  ctx?.revert();
  mm = null;
  ctx = null;
}

function init() {
  teardown();

  ctx = gsap.context(() => {
    header();
    progress();
  });

  mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      fine: '(min-width: 768px) and (pointer: fine)',
    },
    (c) => {
      const { motion, fine } = c.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;

      // Top-to-bottom order so ScrollTrigger refreshes in page order.
      hero();
      marquee();
      reveals();
      parallax();
      timelineRail();
      connectors();
      counters();

      const cleanups: (() => void)[] = [];
      if (fine) {
        tilt(cleanups);
        magnetic(cleanups);
      }
      return () => cleanups.forEach((fn) => fn());
    },
  );

  // GSAP now holds the hero's start states inline, so the CSS guard can go.
  root.classList.remove(ARMED);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', teardown);
// The router replaces <html> attributes on navigation; re-arm before the new page paints.
document.addEventListener('astro:after-swap', () => {
  if (!reduceMotion()) root.classList.add(ARMED);
});
