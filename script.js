// Smooth scroll for in-page anchor navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (targetId.length > 1) {
      event.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const header = document.querySelector('.site-header');
const nav = document.getElementById('primary-nav');
const navToggle = document.querySelector('.nav-toggle');

// Adds or removes elevated styling when header becomes sticky
const toggleSticky = () => {
  if (window.scrollY > 40) {
    header.classList.add('is-sticky');
  } else {
    header.classList.remove('is-sticky');
  }
};

// Handles mobile nav open/close state
const toggleMenu = () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

window.addEventListener('scroll', toggleSticky);
navToggle.addEventListener('click', toggleMenu);

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      toggleMenu();
    }
  });
});

// Handles Product Features tab switching
const featureTabs = document.querySelectorAll('.feature-tab');
const featurePanels = document.querySelectorAll('.feature-panel');

const activateFeatureTab = (targetTab) => {
  featureTabs.forEach((tab) => {
    const isActive = tab === targetTab;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  featurePanels.forEach((panel) => {
    const shouldShow = panel.id === targetTab.dataset.panel;
    panel.classList.toggle('is-active', shouldShow);
    if (shouldShow) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
};

featureTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.getAttribute('aria-selected') === 'true') return;
    activateFeatureTab(tab);
  });
});

// Image modal zoom with 3D effect
const imageModal = document.getElementById('image-modal');

if (imageModal) {
  const modalImage = imageModal.querySelector('.image-modal__image');
  const closeModalBtn = imageModal.querySelector('.image-modal__close');
  const productImages = document.querySelectorAll('.feature-grid img');
  let lastFocusedImage = null;

  const closeModal = () => {
    if (!imageModal.classList.contains('is-visible')) return;
    imageModal.classList.remove('is-visible');
    imageModal.setAttribute('aria-hidden', 'true');
    imageModal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    modalImage.src = '';
    if (lastFocusedImage) {
      lastFocusedImage.focus();
    }
  };

  const openModal = (img) => {
    lastFocusedImage = img;
    modalImage.src = img.src;
    modalImage.alt = img.alt || 'Enlarged product image';
    imageModal.classList.add('is-visible');
    imageModal.removeAttribute('hidden');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeModalBtn.focus();
  };

  productImages.forEach((img) => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || 'Product image'} (click to enlarge)`);

    img.addEventListener('click', () => openModal(img));

    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(img);
      }
    });
  });

  closeModalBtn.addEventListener('click', closeModal);

  imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}

// Auto-updates footer year to keep content fresh
document.getElementById('year').textContent = new Date().getFullYear();

