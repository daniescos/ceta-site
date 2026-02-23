/* ============================================================================
   CETA – Portfolio JavaScript
   Load projects from portfolio.json, render cards, filter by category
   ============================================================================ */

let portfolioData = [];
let allProjects = [];

document.addEventListener('DOMContentLoaded', () => {
  loadPortfolio();
  initFilterButtons();
});

/* ============================================================================
   Load Portfolio Data
   ============================================================================ */

async function loadPortfolio() {
  try {
    const response = await fetch('./src/data/portfolio.json');
    if (!response.ok) throw new Error('Failed to load portfolio');

    portfolioData = await response.json();
    allProjects = portfolioData;

    renderPortfolio(portfolioData);
    observeElements();
  } catch (error) {
    console.error('Error loading portfolio:', error);
    const grid = document.getElementById('portfolio-grid');
    if (grid) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--c3);">Erro ao carregar portfólio. Tente recarregar a página.</p>';
    }
  }
}

/* ============================================================================
   Render Portfolio Cards
   ============================================================================ */

function renderPortfolio(projects) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  if (projects.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--c3);">Nenhum projeto encontrado.</p>';
    return;
  }

  grid.innerHTML = projects.map(project => `
    <div class="portfolio-item" data-category="${project.category}">
      <div class="portfolio-image">
        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '📐 Imagem em breve'}
      </div>
      <div class="portfolio-info">
        <h3 class="portfolio-title">${project.title}</h3>
        <div class="portfolio-meta">
          <span class="portfolio-category">${project.category}</span>
          <span>${project.year}</span>
        </div>
        ${project.description ? `<p style="font-size: var(--f-d); color: var(--c3); margin-bottom: var(--gap-sm);">${project.description}</p>` : ''}
        <div class="portfolio-meta" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: var(--gap-sm); margin-top: var(--gap-sm);">
          <span>📍 ${project.location}</span>
        </div>
      </div>
    </div>
  `).join('');

  observeElements();
}

/* ============================================================================
   Filter Functionality
   ============================================================================ */

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter and render
      const category = btn.getAttribute('data-category');
      if (category === 'all') {
        renderPortfolio(portfolioData);
      } else {
        const filtered = portfolioData.filter(p => p.category === category);
        renderPortfolio(filtered);
      }
    });
  });

  // Set first button as active
  if (filterBtns.length > 0) {
    filterBtns[0].classList.add('active');
  }
}

/* ============================================================================
   Intersection Observer – Entrance Animation
   ============================================================================ */

function observeElements() {
  const items = document.querySelectorAll('.portfolio-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
  });
}
