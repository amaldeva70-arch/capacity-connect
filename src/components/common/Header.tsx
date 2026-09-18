import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ChevronDown, 
  UserPlus, 
  BookOpen, 
  Building2,
  Database,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { AuthModalTab } from './AuthModal';

interface HeaderProps {
  onOpenAuthModal: (defaultTab?: AuthModalTab) => void;
  onOpenSchemaDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuthModal, onOpenSchemaDocs }) => {
  const { currentUser, currentRole, logout } = useApp();
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      {/* Top Institutional Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400 tracking-wide">भारत सरकार | GOVERNMENT OF INDIA</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">पृथ्वी विज्ञान मंत्रालय | Ministry of Earth Sciences (MoES)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>National Capacity Building Framework</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <button
              onClick={onOpenSchemaDocs}
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-medium"
            >
              <Database className="w-3 h-3" />
              <span>Database Schema & Models</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MoES Admin Portal Default</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Brand & Role Command Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Official Emblem & Portal Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-950/50 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[9px] font-black tracking-widest text-cyan-400 font-mono">MoES</span>
                <span className="text-[7px] font-bold text-slate-300 uppercase leading-none">Govt</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  CAPACITY CONNECT
                </h1>
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded shadow-sm">
                  {currentRole === 'admin' ? 'Admin Directorate' : currentRole === 'trainer' ? 'Faculty Portal' : 'Trainee Cadre'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Digital Capacity Building & Competency Development System · MoES & IMD
              </p>
            </div>
          </div>

          {/* Action Controls: 3 Role Logins & Active Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* 1. Trainee Login Feature */}
            <button
              onClick={() => onOpenAuthModal('trainee')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-700/80 text-cyan-300 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Open Trainee Officer Login Window"
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline">Trainee Login</span>
              <span className="sm:hidden text-[11px]">Trainee</span>
            </button>

            {/* 2. Trainer Login Feature */}
            <button
              onClick={() => onOpenAuthModal('trainer')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900/90 border border-purple-700/80 text-purple-300 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Open Trainer & Faculty Login Window"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="hidden sm:inline">Trainer Login</span>
              <span className="sm:hidden text-[11px]">Trainer</span>
            </button>

            {/* 3. Admin Login Feature */}
            <button
              onClick={() => onOpenAuthModal('admin')}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-950/40 border border-amber-300/40 transition-all hover:scale-[1.02]"
              title="Open MoES Central Administrator Login Window"
            >
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-950 shrink-0" />
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden text-[11px]">Admin</span>
            </button>

            {/* Active User Profile Pill & Context Menu */}
            <div className="relative">
              <button
                onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
                className="flex items-center gap-2 bg-slate-850 hover:bg-slate-800 border border-slate-700 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors text-left"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-500/50 shrink-0"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5" title="Verified MoES Personnel">
                    <ShieldCheck className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="hidden md:block text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white max-w-[120px] truncate">
                      {currentUser.name}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                        currentRole === 'admin'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : currentRole === 'trainer'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      {currentRole}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
                    {currentUser.designation}
                  </p>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Profile Menu Dropdown */}
              {showSwitchDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 space-y-3">
                  {/* Account Summary */}
                  <div className="pb-3 border-b border-slate-800 flex items-center gap-3">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-amber-300/90 font-medium truncate">{currentUser.designation}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.institution.split(' - ')[0]}</p>
                    </div>
                  </div>

                  {/* 3 Dedicated Role Login Actions */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      Sign In To Another Role:
                    </p>

                    <button
                      onClick={() => {
                        setShowSwitchDropdown(false);
                        onOpenAuthModal('trainee');
                      }}
                      className="w-full py-2 px-3 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-700/50 text-cyan-300 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Trainee Officer Login</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Learners</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowSwitchDropdown(false);
                        onOpenAuthModal('trainer');
                      }}
                      className="w-full py-2 px-3 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-700/50 text-purple-300 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Faculty & Trainer Login</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Instructors</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowSwitchDropdown(false);
                        onOpenAuthModal('admin');
                      }}
                      className="w-full py-2 px-3 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-700/50 text-amber-300 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>System Administrator Login</span>
                      </div>
                      <span className="text-[10px] text-slate-400">MoES HQ</span>
                    </button>

                    <div className="pt-2 border-t border-slate-800 space-y-1.5">
                      <button
                        onClick={() => {
                          setShowSwitchDropdown(false);
                          onOpenAuthModal('register');
                        }}
                        className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                        <span>Register New Officer Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowSwitchDropdown(false);
                          logout();
                        }}
                        className="w-full py-1.5 px-3 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out Session</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
