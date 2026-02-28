/**
 * Ohio Voter Registration Micro-site — main.js
 * Accordion toggle behavior for the challenges section
 */

(function () {
  'use strict';

  // ── Accordion ──────────────────────────────────────────────────────────────

  /**
   * Initialize all accordion items.
   * Each .accordion-item contains:
   *   button.accordion-trigger  (the clickable header)
   *   div.accordion-body        (the collapsible content)
   *
   * Accessibility: uses aria-expanded on the trigger and aria-hidden on the body.
   */
  function initAccordions() {
    var items = document.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var body    = item.querySelector('.accordion-body');

      if (!trigger || !body) return;

      // Generate a stable ID for aria linkage
      var bodyId = 'acc-body-' + Math.random().toString(36).slice(2, 8);
      body.id = bodyId;
      trigger.setAttribute('aria-controls', bodyId);
      trigger.setAttribute('aria-expanded', 'false');
      body.setAttribute('role', 'region');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close all other items (single-open behaviour)
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) {
            closeItem(other);
          }
        });

        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });

      // Keyboard: allow Space/Enter to toggle (button already handles Enter,
      // but Space can get swallowed in some browsers for non-submit buttons)
      trigger.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  function openItem(item) {
    var trigger = item.querySelector('.accordion-trigger');
    var body    = item.querySelector('.accordion-body');
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    body.removeAttribute('aria-hidden');
    // Scroll the item into view if it's off-screen (helps on small phones)
    setTimeout(function () {
      var rect = item.getBoundingClientRect();
      var bannerHeight = getBannerHeight();
      if (rect.top < bannerHeight + 8) {
        window.scrollBy({ top: rect.top - bannerHeight - 8, behavior: 'smooth' });
      }
    }, 50);
  }

  function closeItem(item) {
    var trigger = item.querySelector('.accordion-trigger');
    var body    = item.querySelector('.accordion-body');
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    body.setAttribute('aria-hidden', 'true');
  }

  function getBannerHeight() {
    var banner = document.getElementById('deadline-banner');
    return banner ? banner.offsetHeight : 0;
  }

  // ── Countdown / deadline banner ────────────────────────────────────────────

  /**
   * Dynamically highlight "days until next registration deadline" in the banner.
   */
  function initCountdown() {
    var countEl = document.getElementById('days-until-deadline');
    if (!countEl) return;

    // Registration deadlines: 30 days before each Ohio election
    // May 6, 2026 primary → deadline April 6, 2026
    // Nov 3, 2026 general → deadline October 5, 2026
    var deadlines = [
      { label: 'May Primary deadline', date: new Date('2026-04-06T23:59:59') },
      { label: 'November General deadline', date: new Date('2026-10-05T23:59:59') },
    ];

    var now = new Date();
    var next = deadlines.find(function (d) { return d.date > now; });

    if (!next) {
      countEl.textContent = 'Both 2026 deadlines have passed.';
      return;
    }

    var diffMs   = next.date - now;
    var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      countEl.textContent = 'TODAY is the ' + next.label + '!';
    } else if (diffDays === 1) {
      countEl.textContent = '1 day until the ' + next.label + '!';
    } else {
      countEl.textContent = diffDays + ' days until the ' + next.label + '!';
    }
  }

  // ── Smooth scroll offset for sticky banner ─────────────────────────────────

  /**
   * Offset all in-page anchor links by the height of the sticky banner
   * so the target heading isn't hidden underneath it.
   */
  function initSmoothScrollOffset() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      var bannerHeight = getBannerHeight();
      var top = target.getBoundingClientRect().top + window.scrollY - bannerHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────────────

  function init() {
    initAccordions();
    initCountdown();
    initSmoothScrollOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
