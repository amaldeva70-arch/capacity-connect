import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Navigation, NavTabId } from './components/common/Navigation';
import { Toast } from './components/common/Toast';
import { AuthModal, AuthModalTab } from './components/common/AuthModal';
import { SchemaInspectorModal } from './components/common/SchemaInspectorModal';

// Views
import { PortalHome } from './components/home/PortalHome';
import { CoursePortal } from './components/trainee/CoursePortal';
import { TraineeProfileBuilder } from './components/trainee/TraineeProfileBuilder';
import { MyLearningView } from './components/trainee/MyLearningView';
import { ContentManagement } from './components/trainer/ContentManagement';
import { TrainerAssessmentsView } from './components/trainer/TrainerAssessmentsView';
import { TrainerAnalytics } from './components/trainer/TrainerAnalytics';
import { CompetencyEngineView } from './components/admin/CompetencyEngineView';
import { UserManagementView } from './components/admin/UserManagementView';
import { InstitutionalDashboard } from './components/admin/InstitutionalDashboard';
import { AnnouncementsView } from './components/common/AnnouncementsView';

import { Database, ShieldCheck, Globe } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentRole } = useApp();
  // Default to the MoES Institutional Admin Portal
  const [activeTab, setActiveTab] = useState<NavTabId>('admin-dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('admin');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // If role changes, adapt view
  React.useEffect(() => {
    const trainerOnlyTabs: NavTabId[] = ['content-studio', 'assessments', 'trainer-analytics'];
    const adminOnlyTabs: NavTabId[] = ['competency-engine', 'user-management', 'admin-dashboard'];

    if (currentRole === 'admin' && activeTab === 'home') {
      setActiveTab('admin-dashboard');
    } else if (currentRole === 'trainee' && [...trainerOnlyTabs, ...adminOnlyTabs].includes(activeTab)) {
      setActiveTab('home');
    } else if (currentRole === 'trainer' && adminOnlyTabs.includes(activeTab)) {
      setActiveTab('home');
    }
  }, [currentRole, activeTab]);

  const handleOpenAuthModal = (tab: AuthModalTab = 'admin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSelectTab = (tab: NavTabId) => {
    if (tab === 'schema') {
      setIsSchemaModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Institutional Top Header */}
      <Header
        onOpenAuthModal={handleOpenAuthModal}
        onOpenSchemaDocs={() => setIsSchemaModalOpen(true)}
      />

      {/* Role-Aware Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main View Port Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {activeTab === 'home' && (
          <PortalHome onNavigate={handleSelectTab} />
        )}

        {activeTab === 'catalog' && (
          <CoursePortal />
        )}

        {activeTab === 'my-learning' && (
          <MyLearningView
            onOpenCourseCatalog={() => setActiveTab('catalog')}
            onSelectCourse={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'profile' && (
          <TraineeProfileBuilder />
        )}

        {activeTab === 'content-studio' && (
          <ContentManagement />
        )}

        {activeTab === 'assessments' && (
          <TrainerAssessmentsView />
        )}

        {activeTab === 'trainer-analytics' && (
          <TrainerAnalytics />
        )}

        {activeTab === 'competency-engine' && (
          <CompetencyEngineView />
        )}

        {activeTab === 'user-management' && (
          <UserManagementView />
        )}

        {activeTab === 'admin-dashboard' && (
          <InstitutionalDashboard />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsView />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-600 flex items-center justify-center font-serif font-black text-white text-xs shadow-md">
                MoES
              </div>
              <div>
                <p className="font-bold text-white text-xs">
                  CAPACITY CONNECT · Digital Learning & Competency Management Portal
                </p>
                <p className="text-[11px] text-slate-400">
                  Ministry of Earth Sciences (MoES) & India Meteorological Department (IMD)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSchemaModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Database Schema & DDL</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} Ministry of Earth Sciences, Government of India. Designed for organizational upskilling.
            </p>
            <div className="flex items-center gap-4">
              <span>WMO-BIP-M Compliant</span>
              <span>•</span>
              <span>Mission Mausam Integrated</span>
              <span>•</span>
              <span className="text-emerald-400">v2.4 Enterprise Production</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Notifications Toast */}
      <Toast />

      {/* Dedicated Three-Role Authentication Window (Trainee, Trainer, Admin, Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onLoginSuccess={(user) => {
          if (user.role === 'admin') {
            setActiveTab('admin-dashboard');
          } else if (user.role === 'trainer') {
            setActiveTab('content-studio');
          } else if (user.role === 'trainee') {
            setActiveTab('my-learning');
          }
        }}
      />

      {/* Database Schema & Entity Architecture Modal */}
      <SchemaInspectorModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
