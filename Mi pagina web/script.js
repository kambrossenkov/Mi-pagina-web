// Translations dictionary
const translations = {
  en: {
    "nav-hobbies": "Hobbies",
    "nav-trajectory": "My Journey",
    "nav-inventions": "Inventions",
    "nav-home": "Home",
    "nav-contact": "Contact Me",
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
    "nav-hobbies": "Pasatiempos",
    "nav-trajectory": "Mi trayectoria",
    "nav-inventions": "Inventos",
    "nav-home": "Inicio",
    "nav-contact": "Contactarme",
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
      id: 2, title: "Finalización de mi cursada en la carrera",
      excerpt: "Luego de un recorrido de 4 años y medio en la carrera de Lic. en Gestión de Negocios, pude finalizarla en tiempo y forma gracias a la beca obtenida.",
      category: "", date: "12-dic-2024",
      imageUrl: "Fotos/foto_de_recibida.jpg",
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
      id: 2, title: "Finalizacion de mi cursada en la carrera",
      excerpt: "Luego de un recorrido de 4 años y medio en la carrera de Lic. en gestion de negocios pude finalizarla en tiempo y en forma por la beca obtenida",
      category: "", date: "12-dic-2024",
      imageUrl: "Fotos/foto_de_recibida.jpg",
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

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
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
    
    const isTrayectoria = index === 1;
    const wrapperTag = isTrayectoria ? 'a' : 'article';
    const wrapperHref = isTrayectoria ? 'href="curiosidades.html"' : '';
    const dateLabel = isTrayectoria ? article.date : `<span class="text-xs font-bold uppercase tracking-wider text-accent">${article.category}</span><span class="text-xs text-muted-foreground">• ${article.date}</span>`;
    const objectFitClass = isTrayectoria ? 'object-contain bg-black' : 'object-cover';

    const articleHTML = `
      <${wrapperTag} ${wrapperHref}
        class="block bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up group" 
        style="animation-delay: ${delay}ms;"
      >
        <div class="h-48 overflow-hidden relative">
          <img src="${article.imageUrl}" alt="${article.title}" class="w-full h-full ${objectFitClass} group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <div class="flex items-center gap-2 mb-3">
              ${dateLabel}
            </div>
            <h3 class="text-xl font-bold mb-2 tracking-tight group-hover:text-accent text-text transition-colors">
              ${article.title}
            </h3>
            <p class="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              ${article.excerpt}
            </p>
          </div>
        </div>
      </${wrapperTag}>
    `;
    
    container.innerHTML += articleHTML;
  });
}

// Event Listeners
langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  updateLanguage();
});

// Initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // apply initial language
  updateLanguage();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }
});
