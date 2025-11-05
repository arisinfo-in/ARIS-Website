import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ProductTeaser: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [counters, setCounters] = useState({ users: 0, modules: 0, tools: 0 });
  const sectionParallaxRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionMainRef = useRef<HTMLElement | null>(null);
  const ctaTargetRef = useRef<HTMLDivElement | null>(null);
  const floatingBtnRef = useRef<HTMLAnchorElement | null>(null);
  const [inSectionView, setInSectionView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Section-level parallax like hero
  useEffect(() => {
    const el = sectionParallaxRef.current || window;
    let raf: number | null = null;
    const handle = (e: Event) => {
      if (raf) return;
      const mouseEvent = e as MouseEvent;
      raf = requestAnimationFrame(() => {
        const cx = (mouseEvent.clientX ?? 0) / (window.innerWidth || 1) - 0.5;
        const cy = (mouseEvent.clientY ?? 0) / (window.innerHeight || 1) - 0.5;
        setMousePosition({ x: cx, y: cy });
        if (raf) {
          cancelAnimationFrame(raf);
        }
        raf = null;
      });
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, []);

  // Observe when section is in view to control floating Join visibility
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInSectionView(entry.isIntersecting),
      { threshold: 0.45 }
    );
    if (sectionMainRef.current) obs.observe(sectionMainRef.current);
    return () => obs.disconnect();
  }, []);

  // Position floating button over CTA area when visible
  useEffect(() => {
    const place = () => {
      const btn = floatingBtnRef.current;
      if (!btn) return;
      btn.style.transition = 'top 700ms cubic-bezier(0.22, 1, 0.36, 1), left 700ms cubic-bezier(0.22, 1, 0.36, 1), width 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms ease-out, opacity 300ms ease-out';
      if (inSectionView && ctaTargetRef.current) {
        const r = ctaTargetRef.current.getBoundingClientRect();
        btn.style.position = 'fixed';
        btn.style.top = `${Math.round(r.top + window.scrollY)}px`;
        btn.style.left = `${Math.round(r.left + window.scrollX)}px`;
        btn.style.width = `${Math.round(r.width)}px`;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      } else {
        // hide when not in section view (navbar Join remains)
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
      // subtle parallax offset
      btn.style.transform = `translate(${mousePosition.x * 4}px, ${mousePosition.y * 3}px)`;
    };
    place();
    const onScrollResize = () => place();
    window.addEventListener('scroll', onScrollResize);
    window.addEventListener('resize', onScrollResize);
    return () => {
      window.removeEventListener('scroll', onScrollResize);
      window.removeEventListener('resize', onScrollResize);
    };
  }, [inSectionView, mousePosition]);

  // Animate counters when section is visible
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    if (sectionMainRef.current) obs.observe(sectionMainRef.current);
    return () => obs.disconnect();
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    const duration = 900;
    const start = performance.now();
    const endValues = { users: 1200, modules: 9, tools: 25 };
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounters({
        users: Math.floor(ease * endValues.users),
        modules: Math.floor(ease * endValues.modules),
        tools: Math.floor(ease * endValues.tools)
      });
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  // Subtle 3D tilt on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 8;
      setTilt({ rx, ry });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={sectionMainRef} className="py-20 sm:py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent"></div>
      {/* Top-left badge removed per request */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left md:justify-self-start">
          <div className="mb-6 sm:mb-8">
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Our Product</h2>
            <div className="text-2xl md:text-3xl font-bold text-orange-500 mt-1">AI Data Analyst Companion</div>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Build your AI Data Analytics career with guided Study Plans, Practice Tests, Module-wise AI Tutors, Standard Projects, and Job-Ready Resources.
            </p>
            {/* App metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md md:max-w-none md:w-auto mx-auto md:mx-0">
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 text-center">
                <div className="text-white text-xl font-bold">{counters.users.toLocaleString()}+</div>
                <div className="text-gray-400 text-xs mt-1">Learners</div>
              </div>
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 text-center">
                <div className="text-white text-xl font-bold">{counters.modules}</div>
                <div className="text-gray-400 text-xs mt-1">Modules</div>
              </div>
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-3 text-center">
                <div className="text-white text-xl font-bold">{counters.tools}</div>
                <div className="text-gray-400 text-xs mt-1">AI Tools</div>
              </div>
            </div>

            {/* CTA below metrics */}
            <div ref={ctaTargetRef} className="mt-6 w-full max-w-2xl sm:max-w-3xl mx-auto md:mx-0">
              <a
                href="https://aris-aidataanlayst.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white w-full py-3 rounded-xl font-semibold flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-transform duration-300 hover:scale-105"
              >
                Join Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
        {/* Video centered */}
        <div ref={containerRef} className="relative group will-change-transform mx-auto md:mx-0 md:justify-self-end w-full max-w-2xl sm:max-w-3xl" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate(${mousePosition.x * -18}px, ${mousePosition.y * -12}px)` }}>
          {/* Offset background card for layered look */}
          <div className="absolute inset-0 rounded-2xl bg-gray-800/40 border border-gray-700/50 translate-x-6 translate-y-6 -z-10"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition"></div>
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
            <iframe
              src="https://www.youtube.com/embed/BN36xYagafc"
              title="ARIS Product Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video"
            ></iframe>
            {/* Subtle overlay cue */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity ${hovered ? 'opacity-0' : 'opacity-100'}`}></div>
            {/* Floating hint badge */}
            <div className="pointer-events-none absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] md:text-xs bg-black/60 border border-white/10 text-white/80 backdrop-blur">
              Preview • 30s
            </div>
          </div>
        </div>

      </div>
      {/* Floating Join button that moves between navbar area and CTA target */}
      <a
        ref={floatingBtnRef}
        href="https://arisinfo.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center shadow-lg hover:shadow-orange-500/25"
        style={{ willChange: 'transform, top, left, width, opacity', opacity: 0 }}
      >
        Join Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </section>
  );
};

export default React.memo(ProductTeaser);


