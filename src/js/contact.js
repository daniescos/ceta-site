/* ============================================================================
   CETA – Contact Form JavaScript
   Form validation, submission, and EmailJS integration
   ============================================================================ */

/* ============================================================================
   EmailJS Configuration (Update with your credentials)
   Sign up at: https://www.emailjs.com/
   ============================================================================ */

// CONFIGURE THESE:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // e.g., 'service_abc123...'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // e.g., 'template_xyz789...'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // e.g., 'abc123_def456...'

// Initialize EmailJS (optional, can load from CDN too)
// emailjs.init(EMAILJS_PUBLIC_KEY);

/* ============================================================================
   Form Initialization
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', handleSubmit);

  // Real-time validation on blur
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });
}

/* ============================================================================
   Field Validation
   ============================================================================ */

function validateField(field) {
  const value = field.value.trim();
  const name = field.getAttribute('name');
  let isValid = true;
  let errorMsg = '';

  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMsg = 'Este campo é obrigatório.';
  } else if (name === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMsg = 'Por favor, insira um email válido.';
    }
  }

  displayFieldError(field, errorMsg);
  return isValid;
}

function displayFieldError(field, errorMsg) {
  // Remove existing error
  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }

  // Add new error if any
  if (errorMsg) {
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = errorMsg;
    field.parentElement.appendChild(errorEl);
    field.style.borderColor = '#ff6b6b';
  } else {
    field.style.borderColor = 'rgba(247, 148, 29, 0.2)';
  }
}

/* ============================================================================
   Form Submission
   ============================================================================ */

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const fields = form.querySelectorAll('input, textarea');

  // Validate all fields
  let isValid = true;
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    return;
  }

  // Show loading state
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  // Prepare form data
  const formData = {
    name: form.querySelector('input[name="name"]').value,
    email: form.querySelector('input[name="email"]').value,
    phone: form.querySelector('input[name="phone"]').value || 'Não informado',
    subject: form.querySelector('input[name="subject"]').value,
    message: form.querySelector('textarea[name="message"]').value,
  };

  try {
    await sendEmail(formData);
    showSuccess(form);
    form.reset();
  } catch (error) {
    console.error('Error sending email:', error);
    showError(form, 'Erro ao enviar. Tente novamente mais tarde.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

/* ============================================================================
   EmailJS Integration
   ============================================================================ */

async function sendEmail(formData) {
  // Check if EmailJS is configured
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.warn('EmailJS not configured. Email would be sent to:', formData);
    // Simulate successful send for demo purposes
    return Promise.resolve();
  }

  // Send via EmailJS
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_email: 'seu-email@empresa.com', // Replace with your email
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    },
    EMAILJS_PUBLIC_KEY
  );
}

/* ============================================================================
   UI Feedback
   ============================================================================ */

function showSuccess(form) {
  const container = form.parentElement;
  const successMsg = document.createElement('div');
  successMsg.className = 'form-success';
  successMsg.innerHTML = `
    <strong>✓ Mensagem enviada com sucesso!</strong><br>
    <small>Entraremos em contato em breve.</small>
  `;

  container.appendChild(successMsg);

  // Remove after 5 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 5000);
}

function showError(form, message) {
  const container = form.parentElement;
  const errorMsg = document.createElement('div');
  errorMsg.style.cssText = `
    color: #ff6b6b;
    padding: var(--gap);
    background-color: rgba(255, 107, 107, 0.1);
    border-radius: var(--br);
    text-align: center;
    margin-bottom: var(--gap);
  `;
  errorMsg.textContent = message;

  container.insertBefore(errorMsg, form);

  // Remove after 5 seconds
  setTimeout(() => {
    errorMsg.remove();
  }, 5000);
}
