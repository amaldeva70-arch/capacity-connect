import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  BookOpen,
  GraduationCap,
  User,
  UploadCloud,
  FileCheck,
  BarChart3,
  GitMerge,
  Users,
  LayoutDashboard,
  Bell,
  Database
} from 'lucide-react';

export type NavTabId = 
  | 'home'
  | 'catalog'
  | 'my-learning'
  | 'profile'
  | 'content-studio'
  | 'assessments'
  | 'trainer-analytics'
  | 'competency-engine'
  | 'user-management'
  | 'admin-dashboard'
  | 'announcements'
  | 'schema';

interface NavigationProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const { currentRole, stats } = useApp();

  return (
    <nav className="bg-slate-900/90 backdrop-blur border-b border-slate-800 text-slate-300 sticky top-[69px] z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
          {/* Universal Home */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Portal Home</span>
          </button>

          {/* Universal Course Catalog */}
          <button
            onClick={() => onSelectTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'catalog'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Course Catalog</span>
          </button>

          {/* Trainee Module Specific */}
          {currentRole === 'trainee' && (
            <>
              <button
                onClick={() => onSelectTab('my-learning')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'my-learning'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>My Learning & Lessons</span>
              </button>

              <button
                onClick={() => onSelectTab('profile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile & Competencies</span>
              </button>
            </>
          )}

          {/* Trainer Module Specific */}
          {currentRole === 'trainer' && (
            <>
              <button
                onClick={() => onSelectTab('content-studio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'content-studio'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Content Management Library</span>
              </button>

              <button
                onClick={() => onSelectTab('assessments')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'assessments'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Assessment Creator (MCQ)</span>
              </button>

              <button
                onClick={() => onSelectTab('trainer-analytics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'trainer-analytics'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Trainee Progress Analytics</span>
              </button>
            </>
          )}

          {/* Admin Module Specific */}
          {currentRole === 'admin' && (
            <>
              <button
                onClick={() => onSelectTab('competency-engine')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'competency-engine'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <GitMerge className="w-3.5 h-3.5" />
                <span>Competency Mapping Engine</span>
              </button>

              <button
                onClick={() => onSelectTab('user-management')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'user-management'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>User Approval Desk</span>
                {stats.pendingApprovals > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                    {stats.pendingApprovals}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectTab('admin-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>System Dashboard</span>
              </button>
            </>
          )}

          {/* Universal Announcements */}
          <button
            onClick={() => onSelectTab('announcements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'announcements'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Announcements & Circulars</span>
          </button>

          {/* Universal Database Schema */}
          <button
            onClick={() => onSelectTab('schema')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'schema'
                ? 'bg-emerald-600 text-white'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-800/40'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database Schema & Models</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
