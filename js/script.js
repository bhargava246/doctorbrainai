// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Demo Modal Functions
function openDemo() {
  document.getElementById('demoModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeDemo() {
  document.getElementById('demoModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function contactTeam() {
  window.location.href = 'mailto:hello@esichealthbridge.com?subject=ESIC%20Health%20Bridge%20Inquiry';
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    company: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    employees: document.getElementById('employees').value
  };

  // Log form data (in production, this would be sent to a server)
  console.log('Demo Request Submitted:', formData);

  // Show success message
  alert('Thank you for your interest! We\'ll be in touch soon.');

  // Close modal and reset form
  closeDemo();
  event.target.reset();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('demoModal');
  if (event.target === modal) {
    closeDemo();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDemo();
  }
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-card, .flow-step, .benefit-item');
  cards.forEach(card => {
    observer.observe(card);
  });
});
