// Translations dictionary
const translations = {
  en: {
    "nav-home": "Home",
    "nav-articles": "Articles",
    "nav-wellness": "Wellness",
    "nav-travel": "Travel",
    "nav-about": "About",
    "nav-join": "Join Now",
    "hero-title": "Journey<br/>Through<br/>Life's<br/>Spectrum",
    "hero-desc": "Welcome to Perspective's Blog: A Realm of Reflection, Inspiration, and Discovery. Where Words Illuminate Paths of Meaning and Thoughts Unravel the Mysteries of Life's Spectrum.",
    "hero-btn": "Join Now",
    "articles-title": "Featured Articles",
    "articles-view": "View all →",
    "news-title": "Stay inspired.",
    "news-desc": "Subscribe to receive our latest articles and insights directly in your inbox.",
    "news-btn": "Subscribe",
    "ft-explore": "Explore",
    "ft-creativity": "Creativity",
    "ft-growth": "Growth",
    "ft-about": "About",
    "ft-story": "Our Story",
    "ft-authors": "Authors",
    "ft-contact": "Contact",
    "ft-resources": "Resources",
    "ft-style": "Style Guide",
    "ft-news": "Newsletter",
    "ft-legal": "Legal",
    "ft-privacy": "Privacy Policy",
    "ft-terms": "Terms of Service",
    "ft-copy": "© 2026 Perspective. All rights reserved."
  },
  es: {
    "nav-home": "Inicio",
    "nav-articles": "Artículos",
    "nav-wellness": "Bienestar",
    "nav-travel": "Viajes",
    "nav-about": "Nosotros",
    "nav-join": "Unirse",
    "hero-title": "Viaje a<br/>Través del<br/>Espectro<br/>de la Vida",
    "hero-desc": "Bienvenido al Blog de Perspective: Un reino de reflexión, inspiración y descubrimiento. Donde las palabras iluminan caminos y los pensamientos revelan los misterios de la vida.",
    "hero-btn": "Unirse",
    "articles-title": "Artículos Destacados",
    "articles-view": "Ver todos →",
    "news-title": "Mantente inspirado.",
    "news-desc": "Suscríbete para recibir nuestros últimos artículos directamente en tu correo.",
    "news-btn": "Suscribirse",
    "ft-explore": "Explorar",
    "ft-creativity": "Creatividad",
    "ft-growth": "Crecimiento",
    "ft-about": "Nosotros",
    "ft-story": "Nuestra Historia",
    "ft-authors": "Autores",
    "ft-contact": "Contacto",
    "ft-resources": "Recursos",
    "ft-style": "Guía de Estilo",
    "ft-news": "Boletín",
    "ft-legal": "Legal",
    "ft-privacy": "Privacidad",
    "ft-terms": "Términos de Servicio",
    "ft-copy": "© 2026 Perspective. Todos los derechos reservados."
  }
};

// Mock Data for the Articles (with translations inline, though we'll adapt dynamically)
const articlesList = {
  en: [
    {
      id: 1, title: "10 Tips for Better Web Design",
      excerpt: "Learn how to create visually appealing and user-friendly websites with these top ten tips.",
      category: "Design", date: "Mar 10, 2026",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2, title: "The Future of Artificial Intelligence",
      excerpt: "Exploring the potential impacts and advancements of AI technology in the next decade.",
      category: "Technology", date: "Mar 12, 2026",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3, title: "Mindfulness in Modern Life",
      excerpt: "A guide to staying present and managing stress in our fast-paced, always-connected world.",
      category: "Wellness", date: "Mar 15, 2026",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4, title: "Sustainable Travel Guide",
      excerpt: "How to explore the world while minimizing your environmental footprint.",
      category: "Travel", date: "Mar 18, 2026",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5, title: "Unlocking Your Creativity",
      excerpt: "Practical exercises and habits to help you think outside the box and generate fresh ideas.",
      category: "Creativity", date: "Mar 19, 2026",
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6, title: "Financial Freedom Strategies",
      excerpt: "Step-by-step approach to taking control of your personal finances and building wealth.",
      category: "Growth", date: "Mar 20, 2026",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    }
  ],
  es: [
    {
      id: 1, title: "10 Consejos para un Mejor Diseño",
      excerpt: "Aprende a crear sitios web visualmente atractivos y fáciles de usar con estos consejos.",
      category: "Diseño", date: "10 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2, title: "El Futuro de la Inteligencia Artificial",
      excerpt: "Explorando los impactos potenciales y avances de la tecnología IA en la próxima década.",
      category: "Tecnología", date: "12 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3, title: "Mindfulness en la Vida Moderna",
      excerpt: "Una guía para mantenerte presente y manejar el estrés en nuestro mundo siempre conectado.",
      category: "Bienestar", date: "15 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4, title: "Guía de Viaje Sustentable",
      excerpt: "Cómo explorar el mundo minimizando tu impacto ambiental en el proceso.",
      category: "Viajes", date: "18 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5, title: "Desbloqueando tu Creatividad",
      excerpt: "Ejercicios prácticos y hábitos para ayudarte a pensar fuera de la caja y generar ideas frescas.",
      category: "Creatividad", date: "19 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6, title: "Estrategias de Libertad Financiera",
      excerpt: "Enfoque paso a paso para tomar el control de tus finanzas personales y construir riqueza.",
      category: "Crecimiento", date: "20 Mar, 2026",
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    }
  ]
};

// Current State
let currentLang = localStorage.getItem('lang') || 'en';
// Default to dark mode based on the image mockup, though the logic can toggle
let isDark = localStorage.getItem('theme') !== 'light';

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');
const htmlEl = document.documentElement;

// Function to update the DOM based on the current language
function updateLanguage() {
  // Update toggle button text
  langToggleBtn.textContent = currentLang === 'en' ? 'ES' : 'EN';
  
  // Translate static text nodes
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  // Re-render articles
  renderArticles();
  
  // Save pref
  localStorage.setItem('lang', currentLang);
}

// Function to render articles in the selected language
function renderArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  container.innerHTML = ''; // clear before adding

  const featuredArticles = articlesList[currentLang].slice(0, 6);

  featuredArticles.forEach((article, index) => {
    const staggerNumber = Math.min(index + 1, 6);
    const delay = staggerNumber * 100 + 100; // Base delay + stagger
    
    // HTML structure replacing the React <ArticleCard /> component
    // Added text-text and other variables explicitly
    const articleHTML = `
      <article 
        class="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up group" 
        style="animation-delay: ${delay}ms;"
      >
        <div class="h-48 overflow-hidden relative">
          <img src="${article.imageUrl}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-accent">${article.category}</span>
            <span class="text-xs text-muted-foreground">• ${article.date}</span>
          </div>
          <h3 class="text-xl font-bold mb-2 tracking-tight group-hover:text-accent text-text transition-colors">
            <a href="#">${article.title}</a>
          </h3>
          <p class="text-muted-foreground text-sm line-clamp-2">${article.excerpt}</p>
        </div>
      </article>
    `;
    
    container.innerHTML += articleHTML;
  });
}

// Function to update Theme
function updateTheme() {
  if (isDark) {
    htmlEl.classList.add('dark');
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
  } else {
    htmlEl.classList.remove('dark');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  }
  
  // Save pref
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Event Listeners
langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  updateLanguage();
});

themeToggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  updateTheme();
});

// Initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // apply initial theme
  updateTheme();
  // apply initial language
  updateLanguage();
});
