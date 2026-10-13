// Small progressive enhancements: mobile navigation, demo form feedback, and current year.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.focus();
  }
});

const filterButtons = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project-card[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projects.forEach((project) => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const feedback = document.querySelector('.form-feedback');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.classList.remove('error');
  if (!form.reportValidity()) {
    feedback.textContent = 'Please complete each field with a valid response.';
    feedback.classList.add('error');
    return;
  }

  // This template does not send data. Configure a backend or form service (see README).
  feedback.textContent = 'Your message is valid. To send it, connect a form service as described in README.md.';
});
