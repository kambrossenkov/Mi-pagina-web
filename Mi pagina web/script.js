// Translations dictionary
const translations = {
  en: {
    "nav-curiosities": "Curiosities",
    "nav-inventions": "Inventions",
    "nav-contact": "Contact Me",
    "nav-home": "Home",
    "nav-articles": "Articles",
    "nav-wellness": "Wellness",
    "nav-travel": "Travel",
    "nav-about": "About",
    "nav-join": "Join Now",
    "hero-title": "Journey through the spectrum of my life and my curiosities",
    "hero-desc": "Welcome to my page of inventions and personal developments, I am Konstantino Ambrossenkov and if you want to know me this is the place",
    "hero-btn": "Contact Me",
    "articles-title": "Featured Articles",
    "articles-view": "View all →",
    "chat-title": "Want to Chat?",
    "chat-desc": "Send me your email or message me on WhatsApp",
    "chat-placeholder": "Your email address",
    "chat-btn-send": "Send",
    "chat-btn-wpp": "Message",
    "ft-contact-title": "Contact me",
    "ft-help": "I'm here to help"
  },
  es: {
    "nav-curiosities": "Curiosidades",
    "nav-inventions": "Inventos",
    "nav-contact": "Contactarme",
    "nav-home": "Inicio",
    "nav-articles": "Artículos",
    "nav-wellness": "Bienestar",
    "nav-travel": "Viajes",
    "nav-about": "Nosotros",
    "nav-join": "Unirse",
    "hero-title": "Viaje atraves del espectro de mi vida y mis curiosidades",
    "hero-desc": "Bienvenido a mi pagina de inventos y desarrollos personales, soy kosntantino ambrossenkov y si queres conocerme este es el lugar",
    "hero-btn": "Contactarme",
    "articles-title": "Artículos Destacados",
    "articles-view": "Ver todos →",
    "chat-title": "¿Queres Charlar?",
    "chat-desc": "mandame tu email o escribime por wpp",
    "chat-placeholder": "Tu correo electrónico",
    "chat-btn-send": "enviar",
    "chat-btn-wpp": "escribir",
    "ft-contact-title": "Contactame",
    "ft-help": "Estoy para ayudar"
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

  // Translate placeholders specifically
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
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

  const featuredArticles = articlesList[currentLang].slice(0, 3);

  featuredArticles.forEach((article, index) => {
    const staggerNumber = Math.min(index + 1, 3);
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
