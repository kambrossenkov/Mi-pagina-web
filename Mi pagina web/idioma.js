/* ════════════════════════════════════════════════════════════
   idioma.js  —  Sistema bilingüe ES / EN
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Diccionario ── */
  var T = {
    es: {
      /* Nav */
      'nav-hobbies'    : 'Pasatiempos',
      'nav-trajectory' : 'Mi trayectoria',
      'nav-home'       : 'Inicio',
      'nav-inventions' : 'Inventos',
      'nav-contact'    : 'Contactarme',
      /* Footer */
      'ft-contact-title': 'Contactame',
      'ft-help'         : 'Estoy para ayudar',
      /* ── index.html ── */
      'hero-title'      : 'Pienso en sistemas. Ejecuto en resultados.',
      'hero-desc'       : 'Soy Konstantino Ambrossenkov — graduado del ITBA, trabajo en datos y operaciones. Explorá mi trayectoria y proyectos acá.',
      'articles-title'  : 'Artículos Destacados',
      'chat-title'      : '¿Querés Charlar?',
      'chat-desc'       : 'mandame tu email o escribime por wpp',
      'chat-placeholder': 'Tu correo electrónico',
      'chat-btn-send'   : 'enviar',
      'chat-btn-wpp'    : 'escribir',
      /* ── calistenia.html ── */
      'cal-title'       : 'Calistenia',
      'cal-subtitle'    : 'Un deporte que me ayuda a tener un autocontrol de mi cuerpo',
      'cal-btn-video'   : '▶ Ver video',
      'cal-s0-title'    : 'Inicio 2018',
      'cal-s0-desc'     : 'Les muestro un recorrido de mis inicios en este deporte. Ejercicios que me costaban mucho, que no podía llegar a realizar. Pero a lo largo del año 2018 van a ver cómo hubo una evolución hasta poder lograrlos.',
      'cal-s1-title'    : '2019 hasta marzo 2020: la profundización',
      'cal-s1-desc'     : 'Luego de incursionar en este deporte, entender qué ejercicios y movimientos existen, y haber conocido múltiples personas que me ayudaron a progresar, les traigo un avance de cómo fue mi evolución previamente a que explote la pandemia.',
      'cal-s2-title'    : '2020 hasta 2023: una continuidad en los ejercicios',
      'cal-s2-desc'     : 'Ya con la pandemia, arranco mis estudios universitarios y comienzo a entrenar menos de lo que venía haciendo. Pierdo fuerza muscular por no poder salir ni tener dónde entrenar. Le dedico toda mi energía a adquirir más conocimiento y formalizarme.',
      'cal-s3-title'    : '2024 hasta hoy: nuevos horizontes',
      'cal-s3-desc'     : 'Luego de mi parate, cuando volvimos a la normalidad retomé el entrenamiento. Me costó demasiado; tuve que empezar desde cero en muchos ejercicios, pero lo hice con otra mentalidad y un enfoque distinto. Ya no solo quería hacer trucos de freestyle en la barra: comencé a focalizarme en ejercicios de fuerza y estáticos.',
      /* ── asados.html ── */
      'asados-title'   : 'Asados',
      'asados-subtitle': 'El ritual argentino del fuego',
      'asados-desc'    : 'El asado es mucho más que una forma de cocinar: es un ritual, una excusa para reunirse, y uno de mis mayores placeres.',
      /* ── curiosidades.html ── */
      'cur-main-title'    : 'Mi Trayectoria',
      'cur-modal-next'    : 'Siguiente',
      /* ── musicas.html ── */
      'mus-hero-title'   : 'Acá está mi galería<br>de músicas 🎵',
      'mus-hero-sub'     : 'Me gusta siempre ordenarla —<br>scrolleá para ver las que más destaco',
      'mus-c1-title'     : 'Para entrenar',
      'mus-c1-desc'      : 'Un set que uso recurrentemente a la hora de entrenar, ya sea calistenia o cualquier otro deporte. Me permite motivarme, concentrarme y estar completamente conectado con el entrenamiento.',
      'mus-c2-title'     : 'Rap ruso',
      'mus-c2-desc'      : 'Una selección de canciones, todas en ruso, que fui juntando para mantenerme conectado con la cultura de mis orígenes. Trato de tenerla siempre actualizada con lo que se escucha allá hoy.',
      'mus-c3-title'     : 'Electro',
      'mus-c3-desc'      : 'Un género que me acercó mi hermano mayor y que, con el tiempo y distintos grupos de personas que fui conociendo, me atrapó por completo. Le dediqué mucho tiempo a la escucha y me abrió varias puertas en la vida.',
      'mus-c4-title'     : 'Rock Nacional',
      'mus-c4-desc'      : 'Un conjunto de canciones que fui reuniendo gracias a compañeros del interior y personas con muy buen gusto musical. Todo lo mejor del rock argentino en un solo lugar.',
      'mus-c5-title'     : 'Reggaetón',
      'mus-c5-desc'      : 'Jamás lo supe escribir bien, y acá lo confieso. Un género que al principio me gustó mucho. Sigo escuchando algunas canciones que son enormemente famosas, pero con el tiempo me fui apartando de él.',
      /* ── webmoda.html ── */
      'web-title'  : 'La moda de las páginas webs',
      'web-back'   : '← Inventos',
      /* ── contacto.html ── */
      'con-back'          : 'Volver al Inicio',
      'con-play'          : 'Reproducir',
      'con-video-label'   : 'Espacio para un video',
      'con-h1'            : 'Trabajemos juntos',
      'con-subtitle'      : 'Empezá la conversación',
      'con-label-nombre'  : 'Nombre',
      'con-label-apellido': 'Apellido',
      'con-label-telefono': 'Teléfono / WhatsApp (opcional)',
      'con-label-empresa' : 'Empresa / Institución / Proyecto',
      'con-label-cargo'   : 'Cargo / Rol',
      'con-label-tipo'    : 'Tipo de contacto',
      'con-label-motivo'  : '¿Por qué querés contactarme?',
      'con-label-asunto'  : 'Asunto / Tema',
      'con-label-mensaje' : 'Contame brevemente qué necesitás',
      'con-msg-placeholder': 'Ej.: búsqueda para un rol, propuesta de proyecto, colaboración académica, consultoría o alianza.',
      'con-label-linkedin': 'LinkedIn / Web / Empresa',
      'con-label-origen'  : '¿Cómo llegaste a mi página?',
      'con-label-disp'    : 'Disponibilidad estimada para hablar',
      'con-label-consent' : 'Acepto ser contactado en relación con esta consulta',
      'con-btn-submit'    : 'Enviar consulta',
    },
    en: {
      /* Nav */
      'nav-hobbies'    : 'Hobbies',
      'nav-trajectory' : 'My Trajectory',
      'nav-home'       : 'Home',
      'nav-inventions' : 'Inventions',
      'nav-contact'    : 'Contact',
      /* Footer */
      'ft-contact-title': 'Contact me',
      'ft-help'         : 'Here to help',
      /* ── index.html ── */
      'hero-title'      : 'I think in systems. I execute in results.',
      'hero-desc'       : "I'm Konstantino Ambrossenkov — ITBA graduate, working in data and operations. Explore my trajectory and projects here.",
      'articles-title'  : 'Featured Articles',
      'chat-title'      : 'Want to Chat?',
      'chat-desc'       : 'send me your email or message me on WhatsApp',
      'chat-placeholder': 'Your email address',
      'chat-btn-send'   : 'send',
      'chat-btn-wpp'    : 'message',
      /* ── calistenia.html ── */
      'cal-title'    : 'Calisthenics',
      'cal-subtitle' : 'A sport that helps me take control of my body',
      'cal-btn-video': '▶ Watch video',
      'cal-s0-title' : 'Beginning 2018',
      'cal-s0-desc'  : 'I show you a journey through my beginnings in this sport. Exercises I struggled with and could not perform. But throughout 2018 you will see how there was an evolution until I could achieve them.',
      'cal-s1-title' : '2019 to March 2020: deepening',
      'cal-s1-desc'  : 'After diving into this sport, understanding what exercises and movements exist, and having met many people who helped me progress, I bring you an overview of how my evolution went before the pandemic hit.',
      'cal-s2-title' : '2020 to 2023: keeping up with training',
      'cal-s2-desc'  : "Already in the pandemic, I started university and began training less than before. I lost muscle strength from not being able to go out or find a place to train. I dedicated all my energy to acquiring more knowledge and formalizing myself.",
      'cal-s3-title' : '2024 to today: new horizons',
      'cal-s3-desc'  : 'After my break, when we returned to normality I resumed training. It was very hard; I had to start from scratch in many exercises, but I did it with a different mindset and a distinct focus. I no longer just wanted to do freestyle tricks on the bar: I began focusing on strength and static exercises.',
      /* ── asados.html ── */
      'asados-title'   : 'BBQ',
      'asados-subtitle': 'The Argentine ritual of fire',
      'asados-desc'    : "Asado is much more than a way of cooking: it's a ritual, an excuse to gather, and one of my greatest pleasures.",
      /* ── curiosidades.html ── */
      'cur-main-title'    : 'My Trajectory',
      'cur-modal-next'    : 'Next',
      /* ── musicas.html ── */
      'mus-hero-title': "Here's my music<br>gallery 🎵",
      'mus-hero-sub'  : 'I like to keep it organized —<br>scroll to see my favorites',
      'mus-c1-title'  : 'For training',
      'mus-c1-desc'   : 'A set I use regularly when working out, whether calisthenics or any other sport. It gets me motivated, focused, and completely connected with training.',
      'mus-c2-title'  : 'Russian rap',
      'mus-c2-desc'   : 'A selection of songs, all in Russian, that I gathered to stay connected to the culture of my origins. I try to keep it updated with what is being listened to there today.',
      'mus-c3-title'  : 'Electro',
      'mus-c3-desc'   : 'A genre my older brother introduced me to, which — over time and through different groups of people I met — completely captivated me. I dedicated a lot of time to listening and it opened many doors in my life.',
      'mus-c4-title'  : 'Argentine Rock',
      'mus-c4-desc'   : 'A set of songs I gathered thanks to friends from the interior and people with great musical taste. The best of Argentine rock in one place.',
      'mus-c5-title'  : 'Reggaeton',
      'mus-c5-desc'   : "I never knew how to spell it right — and here I confess it. A genre I really liked at first. I still listen to some enormously famous songs, but over time I drifted away from it.",
      /* ── webmoda.html ── */
      'web-title': 'The web pages trend',
      'web-back' : '← Inventions',
      /* ── contacto.html ── */
      'con-back'          : 'Back to Home',
      'con-play'          : 'Play',
      'con-video-label'   : 'Space for a video',
      'con-h1'            : "Let's work together",
      'con-subtitle'      : 'Start the conversation',
      'con-label-nombre'  : 'First name',
      'con-label-apellido': 'Last name',
      'con-label-telefono': 'Phone / WhatsApp (optional)',
      'con-label-empresa' : 'Company / Institution / Project',
      'con-label-cargo'   : 'Title / Role',
      'con-label-tipo'    : 'Type of contact',
      'con-label-motivo'  : 'Why do you want to contact me?',
      'con-label-asunto'  : 'Subject / Topic',
      'con-label-mensaje' : 'Briefly tell me what you need',
      'con-msg-placeholder': 'E.g.: job opportunity, project proposal, academic collaboration, consulting or alliance.',
      'con-label-linkedin': 'LinkedIn / Website / Company',
      'con-label-origen'  : 'How did you find my page?',
      'con-label-disp'    : 'Estimated availability to talk',
      'con-label-consent' : 'I agree to be contacted regarding this inquiry',
      'con-btn-submit'    : 'Send inquiry',
    }
  };

  /* ── Motor de traducción ── */
  function aplicarIdioma(lang) {
    if (!T[lang]) return;
    var t = T[lang];

    /* textContent */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* innerHTML (para elementos con <br> u otro marcado) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    /* placeholder */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    /* botones de idioma: subrayar el activo */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.style.opacity     = isActive ? '1'         : '0.35';
      btn.style.fontWeight  = isActive ? '700'       : '400';
      btn.style.borderBottom= isActive ? '2px solid currentColor' : 'none';
    });

    /* atributo lang del documento */
    document.documentElement.lang = lang;

    /* hook para parches específicos de página */
    if (typeof window.__idiomaPatch === 'function') {
      window.__idiomaPatch(lang, t);
    }
  }

  /* ── Inicialización al cargar el DOM ── */
  document.addEventListener('DOMContentLoaded', function () {
    /* delegación de click en todos los .lang-btn */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-btn');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      if (!lang) return;
      localStorage.setItem('idioma', lang);
      aplicarIdioma(lang);
    });

    /* aplicar idioma guardado (default: es) */
    var saved = localStorage.getItem('idioma') || 'es';
    aplicarIdioma(saved);
  });

  /* exponer para uso externo */
  window.aplicarIdioma  = aplicarIdioma;
  window.TRADUCCIONES   = T;

})();
