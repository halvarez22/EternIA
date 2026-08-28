import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3DSection } from './components/Hero3DSection';
import { ServicesShowcaseSection } from './components/ServicesShowcaseSection';
import { CategoryShowcase3D } from './components/CategoryShowcase3D';
import { VideoShowcaseGallery } from './components/VideoShowcaseGallery';
import { StoryCreatorWizard } from './components/StoryCreatorWizard';
import { PricingSection } from './components/PricingSection';
import { EmotionalTestimonials } from './components/EmotionalTestimonials';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { VideoUploaderModal } from './components/VideoUploaderModal';
import { AdminVideoStudioModal } from './components/AdminVideoStudioModal';
import { INITIAL_FINISHED_STORIES } from './data/mockStories';
import { FinishedStory, EterniaCategory, PricingPlan, ServiceType } from './types';
import { Sparkles, Film, Compass, Sun, Moon, Volume2 } from 'lucide-react';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('eternia_theme_v7');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch (e) {
      console.warn('Could not read theme from localStorage', e);
    }
    return 'dark'; // default
  });

  // Apply theme to document
  useEffect(() => {
    try {
      localStorage.setItem('eternia_theme_v7', theme);
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.warn('Could not persist theme', e);
    }
  }, [theme]);

  // Persisted state for stories and featured story
  const [stories, setStories] = useState<FinishedStory[]>(() => {
    try {
      const saved = localStorage.getItem('eternia_stories_v7');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read stories from localStorage', e);
    }
    return INITIAL_FINISHED_STORIES;
  });

  const [featuredStoryId, setFeaturedStoryId] = useState<string>(() => {
    try {
      const savedFeatured = localStorage.getItem('eternia_featured_story_id_v7');
      if (savedFeatured) return savedFeatured;
    } catch (e) {
      console.warn('Could not read featured story id from localStorage', e);
    }
    return INITIAL_FINISHED_STORIES[0].id;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('eternia_admin_logged_in_v7') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Persist whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('eternia_stories_v7', JSON.stringify(stories));
    } catch (e) {
      console.warn('Could not persist stories', e);
    }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem('eternia_featured_story_id_v7', featuredStoryId);
    } catch (e) {
      console.warn('Could not persist featured story id', e);
    }
  }, [featuredStoryId]);

  useEffect(() => {
    try {
      localStorage.setItem('eternia_admin_logged_in_v7', isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.warn('Could not persist admin login state', e);
    }
  }, [isAdminLoggedIn]);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Modal states
  const [selectedStoryModal, setSelectedStoryModal] = useState<FinishedStory | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todas');
  const [activeNavSection, setActiveNavSection] = useState<string>('hero');
  const [creatorInitialCategory, setCreatorInitialCategory] = useState<EterniaCategory>('bodas');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginAdmin = (password: string): boolean => {
    const valid = !password || password.toLowerCase() === 'eternia' || password === 'admin' || password === '1234';
    if (valid) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const handleStoryUploaded = (newStory: FinishedStory, setAsFeatured: boolean = false) => {
    setStories((prev) => [newStory, ...prev]);
    if (setAsFeatured) {
      setFeaturedStoryId(newStory.id);
    }
    setActiveCategoryFilter('todas');
  };

  const handleDeleteStory = (storyId: string) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
    if (featuredStoryId === storyId) {
      const remaining = stories.filter((s) => s.id !== storyId);
      if (remaining.length > 0) {
        setFeaturedStoryId(remaining[0].id);
      }
    }
  };

  const handleUpdateStory = (updatedStory: FinishedStory) => {
    setStories((prev) => prev.map((s) => (s.id === updatedStory.id ? updatedStory : s)));
  };

  const handleSetFeaturedStory = (storyId: string) => {
    setFeaturedStoryId(storyId);
  };

  const handleNavigateTo = (sectionId: string) => {
    setActiveNavSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromShowcase = (category: EterniaCategory) => {
    setActiveCategoryFilter(category);
    handleNavigateTo('videos');
  };

  const handleLaunchCreatorWithCategory = (category: EterniaCategory) => {
    setCreatorInitialCategory(category);
    handleNavigateTo('creador');
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    // In promotional draft mode, route to WhatsApp or contact for custom quote
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "524777871635";
    const text = encodeURIComponent(`¡Hola EternIA! Me interesa el plan ${plan.name} ($${plan.price} ${plan.currency}) para crear una canción y homenaje personalizado. ¿Cómo podemos iniciar?`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleRequestSimilar = (story: FinishedStory) => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "524777871635";
    const text = encodeURIComponent(`¡Hola EternIA! Me encantó la obra "${story.title}" (${story.categoryLabel}). Quisiera cotizar una obra similar para mi historia.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // The active featured story on the hero promo card
  const currentFeaturedStory = stories.find((s) => s.id === featuredStoryId) || stories[0] || INITIAL_FINISHED_STORIES[0];

  // Draft flags for interactive features (Draft 2 modules kept in codebase)
  const SHOW_DRAFT2_FEATURES = true;

  return (
    <div className={`min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-300 ${theme === 'light' ? 'light' : 'dark'}`}>
      <FloatingWhatsApp />
      {/* Navigation Header */}
      <Navbar
        onOpenUploadModal={() => setIsAdminModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
        onNavigateTo={handleNavigateTo}
        activeSection={activeNavSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section with Clean Flat Showcase Card */}
      <Hero3DSection
        onExploreStories={() => handleNavigateTo('videos')}
        onCreateStory={() => handleNavigateTo('precios')}
        onSelectStory={(story) => setSelectedStoryModal(story)}
        featuredStory={currentFeaturedStory}
        onOpenUpload={() => setIsAdminModalOpen(true)}
      />

      {/* The 3 Core Pillars: Canciones, Videos, Videos Musicalizados a la medida */}
      <ServicesShowcaseSection
        onSelectServiceTab={(serviceType) => {
          handleNavigateTo('videos');
        }}
        onNavigateTo={handleNavigateTo}
      />

      {/* The 6 Core Eternia Brand Lines */}
      <CategoryShowcase3D
        onSelectCategory={handleSelectCategoryFromShowcase}
        onLaunchCreatorWithCategory={handleLaunchCreatorWithCategory}
        selectedCategoryFilter={activeCategoryFilter}
      />

      {/* Finished Videos Gallery & Player Showcase */}
      <VideoShowcaseGallery
        stories={stories}
        onSelectStory={(story) => setSelectedStoryModal(story)}
        onOpenUploadModal={() => setIsAdminModalOpen(true)}
        activeCategoryFilter={activeCategoryFilter}
        onCategoryFilterChange={setActiveCategoryFilter}
      />


      {/* [DRAFT 2 FEATURE - HIDDEN FOR PROMOTIONAL DRAFT 1] Interactive AI Story & Song Creator Studio */}
      {SHOW_DRAFT2_FEATURES && (
        <StoryCreatorWizard
          initialCategory={creatorInitialCategory}
        />
      )}

      {/* Pricing & Investment Plans */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* Real Customer Emotional Testimonials & Live Resonance Metrics */}
      <EmotionalTestimonials />

      {/* Brand Footer */}
      <Footer onNavigateTo={handleNavigateTo} />

      {/* Mobile Floating Quick Action Bar (Thumb-accessible on mobile phones) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="glass px-4 py-2.5 rounded-full border border-[var(--glass-border)] shadow-2xl bg-[var(--header-bg)] backdrop-blur-xl flex items-center justify-around text-xs">
          <button
            onClick={() => handleNavigateTo('hero')}
            className="flex flex-col items-center gap-0.5 text-[var(--text-primary)] opacity-70 hover:opacity-100 min-h-[40px] justify-center"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-tighter">Inicio</span>
          </button>

          <button
            onClick={() => handleNavigateTo('categorias')}
            className="flex flex-col items-center gap-0.5 text-[var(--text-primary)] opacity-70 hover:opacity-100 min-h-[40px] justify-center"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[9px] uppercase tracking-tighter">Líneas</span>
          </button>

          <button
            onClick={() => handleNavigateTo('videos')}
            className="flex flex-col items-center gap-0.5 text-[var(--text-primary)] opacity-70 hover:opacity-100 min-h-[40px] justify-center"
          >
            <Film className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-tighter">Obras</span>
          </button>

          <button
            onClick={() => handleNavigateTo('precios')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-[11px] uppercase tracking-wider shadow-lg transform -translate-y-1"
          >
            <span className="font-serif italic">$</span>
            <span>Planes</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="flex flex-col items-center gap-0.5 text-[var(--text-primary)] opacity-70 hover:opacity-100 min-h-[40px] justify-center"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            <span className="text-[9px] uppercase tracking-tighter">{theme === 'dark' ? 'Luz' : 'Noche'}</span>
          </button>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedStoryModal && (
        <VideoPlayerModal
          story={selectedStoryModal}
          onClose={() => setSelectedStoryModal(null)}
          onRequestSimilar={handleRequestSimilar}
        />
      )}

      {/* Authorized Video Studio & Uploader Modal */}
      {isAdminModalOpen && (
        <AdminVideoStudioModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          isAdminLoggedIn={isAdminLoggedIn}
          onLogin={handleLoginAdmin}
          onLogout={handleLogoutAdmin}
          stories={stories}
          featuredStoryId={featuredStoryId}
          onSetFeaturedStory={handleSetFeaturedStory}
          onStoryUploaded={handleStoryUploaded}
          onDeleteStory={handleDeleteStory}
          onUpdateStory={handleUpdateStory}
        />
      )}
    </div>
  );
}


