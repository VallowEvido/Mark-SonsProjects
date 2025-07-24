 emailjs.init("YOURJ2ur95YkOooNGUP_5"); // Replace with your EmailJS user ID

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
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Please fill in all required fields.';
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Prepare the email params
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: form.phone.value.trim(),
      subject: form.subject.value.trim(),
      message: message
    };

    // Use EmailJS to send email (you need to sign up and get your own user ID, service ID, and template ID)
    if (typeof emailjs !== 'undefined') {
      emailjs.send('service_xsub8lt', 'Ytemplate_gqry0ll', templateParams)
        .then(function (response) {
          formMessage.style.color = 'green';
          formMessage.textContent = 'Message sent successfully!';
          form.reset();
        }, function (error) {
          formMessage.style.color = 'red';
          formMessage.textContent = 'Failed to send message. Please try again later.';
        });
    } else {
      // Fallback: open mail client
      const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(templateParams.subject)}&body=${encodeURIComponent(templateParams.message + '\\n\\nFrom: ' + templateParams.from_name + ', Email: ' + templateParams.from_email + ', Phone: ' + templateParams.phone)}`;
      window.location.href = mailtoLink;
      formMessage.style.color = 'green';
      formMessage.textContent = 'Opening mail client...';
      form.reset();
    }
  });
});
