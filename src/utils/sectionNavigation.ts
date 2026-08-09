export const SECTION_NAVIGATION_EVENT = 'portfolio-section-navigation';

const getSectionScrollTarget = (hash: string) => {
  const section = document.querySelector<HTMLElement>(hash);

  return (
    section?.querySelector<HTMLElement>('[data-section-heading]') ?? section
  );
};

export const navigateToSection = (hash: string) => {
  if (typeof window === 'undefined') return;

  const isTop = hash === '#top';
  const target = isTop ? null : getSectionScrollTarget(hash);
  if (!isTop && !target) return;

  const topOffset = window.matchMedia('(min-width: 768px)').matches ? 108 : 24;
  const top = isTop
    ? 0
    : Math.max(
        0,
        window.scrollY + (target?.getBoundingClientRect().top ?? 0) - topOffset,
      );

  if (window.location.hash === hash) {
    window.history.replaceState(null, '', hash);
  } else {
    window.history.pushState(null, '', hash);
  }
  window.dispatchEvent(
    new CustomEvent<string>(SECTION_NAVIGATION_EVENT, {
      detail: isTop ? '' : hash,
    }),
  );
  window.scrollTo({ top, behavior: 'smooth' });
};
