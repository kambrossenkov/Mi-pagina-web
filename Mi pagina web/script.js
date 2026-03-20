// Mock Data for the Articles (translates "import { articles } from '@/data/articles'")
const articlesList = [
  {
    id: 1,
    title: "10 Tips for Better Web Design",
    excerpt: "Learn how to create visually appealing and user-friendly websites with these top ten tips.",
    category: "Design",
    date: "Mars 10, 2026",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "The Future of Artificial Intelligence",
    excerpt: "Exploring the potential impacts and advancements of AI technology in the next decade.",
    category: "Technology",
    date: "Mars 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Mindfulness in Modern Life",
    excerpt: "A guide to staying present and managing stress in our fast-paced, always-connected world.",
    category: "Wellness",
    date: "Mars 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Sustainable Travel Guide",
    excerpt: "How to explore the world while minimizing your environmental footprint.",
    category: "Travel",
    date: "Mars 18, 2026",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Unlocking Your Creativity",
    excerpt: "Practical exercises and habits to help you think outside the box and generate fresh ideas.",
    category: "Creativity",
    date: "Mars 19, 2026",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Financial Freedom Strategies",
    excerpt: "Step-by-step approach to taking control of your personal finances and building wealth.",
    category: "Growth",
    date: "Mars 20, 2026",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
  }
];

// Replicates the React map function to render ArticleCards
function renderArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  // Simulate articles.slice(0, 6)
  const featuredArticles = articlesList.slice(0, 6);

  featuredArticles.forEach((article, index) => {
    // Math.min(index + 1, 6) logic and base delay
    const staggerNumber = Math.min(index + 1, 6);
    const delay = staggerNumber * 100 + 200; // Base delay + stagger
    
    // HTML structure replacing the React <ArticleCard /> component
    const articleHTML = `
      <article 
        class="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow animate-slide-up group" 
        style="animation-delay: ${delay}ms;"
      >
        <div class="h-48 overflow-hidden relative">
          <img src="${article.imageUrl}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-accent">${article.category}</span>
            <span class="text-xs text-muted-foreground">• ${article.date}</span>
          </div>
          <h3 class="text-xl font-bold mb-2 tracking-tight group-hover:text-accent transition-colors">
            <a href="#">${article.title}</a>
          </h3>
          <p class="text-muted-foreground text-sm line-clamp-2">${article.excerpt}</p>
        </div>
      </article>
    `;
    
    container.innerHTML += articleHTML;
  });
}

// Ensure the code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderArticles);
