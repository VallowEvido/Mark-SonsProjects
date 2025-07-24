document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const formMessage = document.createElement('div');
  formMessage.style.marginTop = '1rem';
  formMessage.style.fontWeight = '600';
  form.appendChild(formMessage);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Basic validation
    const name = form.name.value.trim();
