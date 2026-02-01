/**
 * Portfolio Website - Main JavaScript
 * Handles navigation, modal functionality, and scroll effects
 */

// ==========================================================================
// DOM Ready
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initModal();
  initProjectCards();
});

// ==========================================================================
// Header Scroll Effect
// ==========================================================================

/**
 * Adds a shadow to the header when the user scrolls down
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  // Initial check
  handleScroll();

  // Listen for scroll events with passive flag for performance
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ==========================================================================
// Mobile Navigation
// ==========================================================================

/**
 * Handles mobile navigation toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('nav__list--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__nav') && navList.classList.contains('nav__list--open')) {
      navList.classList.remove('nav__list--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('nav__list--open')) {
      navList.classList.remove('nav__list--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// ==========================================================================
// Modal Component
// ==========================================================================

let modalOverlay = null;
let lastFocusedElement = null;

/**
 * Initializes the modal component
 */
function initModal() {
  // Create modal HTML structure
  const modalHTML = `
    <div class="modal-overlay" id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal" role="document">
        <header class="modal__header">
          <div>
            <span class="modal__tag" id="modal-tag"></span>
            <h2 class="modal__title" id="modal-title"></h2>
          </div>
          <button class="modal__close" id="modal-close" aria-label="Close modal">×</button>
        </header>
        <div class="modal__body">
          <p class="modal__description" id="modal-description"></p>
          
          <h3 class="modal__section-title">Key Contributions</h3>
          <ul class="modal__contributions" id="modal-contributions"></ul>
          
          <h3 class="modal__section-title">Tech Stack</h3>
          <div class="modal__tech-stack" id="modal-tech-stack"></div>
          
          <h3 class="modal__section-title">Project Images</h3>
          <div class="modal__images" id="modal-images"></div>
        </div>
      </div>
    </div>
  `;

  // Append modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  modalOverlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  
  // Close modal on button click
  closeBtn.addEventListener('click', closeModal);
  
  // Close modal on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('modal-overlay--visible')) {
      closeModal();
    }
  });
}

/**
 * Opens the modal with project data
 * @param {Object} project - Project data object
 */
function openModal(project) {
  if (!modalOverlay) return;

  // Store last focused element for returning focus
  lastFocusedElement = document.activeElement;

  // Populate modal content
  document.getElementById('modal-tag').textContent = project.theme;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;

  // Populate contributions
  const contributionsList = document.getElementById('modal-contributions');
  contributionsList.innerHTML = project.contributions
    .map(item => `<li>${item}</li>`)
    .join('');

  // Populate tech stack
  const techStack = document.getElementById('modal-tech-stack');
  techStack.innerHTML = project.techStack
    .map(tech => `<span class="modal__tech-tag">${tech}</span>`)
    .join('');

  // Populate images
  const imagesContainer = document.getElementById('modal-images');
  if (project.images && project.images.length > 0) {
    imagesContainer.innerHTML = project.images
      .map(img => `<img src="${img}" alt="${project.title} screenshot" class="modal__image" loading="lazy">`)
      .join('');
  } else {
    // Use placeholders if no images
    imagesContainer.innerHTML = `
      <div class="modal__image-placeholder">Image placeholder 1</div>
      <div class="modal__image-placeholder">Image placeholder 2</div>
    `;
  }

  // Show modal
  modalOverlay.classList.add('modal-overlay--visible');
  document.body.classList.add('modal-open');

  // Focus on close button for accessibility
  setTimeout(() => {
    document.getElementById('modal-close').focus();
  }, 100);

  // Trap focus within modal
  trapFocus(modalOverlay);
}

/**
 * Closes the modal
 */
function closeModal() {
  if (!modalOverlay) return;

  modalOverlay.classList.remove('modal-overlay--visible');
  document.body.classList.remove('modal-open');

  // Return focus to last focused element
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/**
 * Traps focus within an element
 * @param {HTMLElement} element - Element to trap focus within
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Remove listener when modal closes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && !element.classList.contains('modal-overlay--visible')) {
        element.removeEventListener('keydown', handleTabKey);
        observer.disconnect();
      }
    });
  });

  observer.observe(element, { attributes: true });
}

// ==========================================================================
// Project Cards
// ==========================================================================

/**
 * Initializes project card click handlers
 */
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Get project data from data attributes
    const projectData = {
      title: card.dataset.title,
      theme: card.dataset.theme,
      description: card.dataset.description,
      contributions: JSON.parse(card.dataset.contributions || '[]'),
      techStack: JSON.parse(card.dataset.techStack || '[]'),
      images: JSON.parse(card.dataset.images || '[]')
    };

    // Click handler
    card.addEventListener('click', () => {
      openModal(projectData);
    });

    // Keyboard handler (Enter and Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(projectData);
      }
    });
  });
}
