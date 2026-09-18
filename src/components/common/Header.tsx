import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  ChevronDown, 
  UserPlus, 
  BookOpen, 
  Award,
  Building2,
  Database,
  LogIn,
  LogOut,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  onOpenAuthModal: () => void;
  onOpenSchemaDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuthModal, onOpenSchemaDocs }) => {
  const { currentUser, currentRole, users, switchUser, switchRole, logout } = useApp();
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      {/* Top Institutional Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-slate-200">
              भारत सरकार | Government of India
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hidden sm:inline">
              Ministry of Earth Sciences (MoES) & India Meteorological Department (IMD)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onOpenSchemaDocs}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 px-2.5 py-0.5 rounded transition-colors text-xs font-mono"
            >
              <Database className="w-3.5 h-3.5" />
              <span>DB Schema (DDL)</span>
            </button>
            <span className="text-slate-400 hidden md:inline">
              Station: <strong className="text-slate-200">{currentUser.stationOrLocation.split(',')[0]}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Role Switcher */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-950/40 border border-cyan-400/30 shrink-0">
            <span className="font-black text-lg text-white tracking-tighter">CC</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                CAPACITY CONNECT
              </h1>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                MoES · IMD Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Digital Capacity Building & Competency Development System
            </p>
          </div>
        </div>

        {/* Role Quick Bar & Active User Panel */}
        <div className="flex items-center gap-3">
          {/* Quick Role Toggle Pills */}
          <div className="hidden lg:flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700 text-xs">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Role:</span>
            <button
              onClick={() => switchRole('trainee')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                currentRole === 'trainee'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              Trainee (Student)
            </button>
            <button
              onClick={() => switchRole('trainer')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                currentRole === 'trainer'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              Trainer (Instructor)
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                currentRole === 'admin'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              Admin (Manager)
            </button>
          </div>

          {/* User Account Card & Switcher Dropdown */}
          <div className="relative flex items-center gap-2">
            <button
              onClick={onOpenAuthModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              title="Sign In with Official Credentials"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
              className="flex items-center gap-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors text-left"
            >
              <div className="relative">
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-600"
                />
                {currentUser.status === 'verified' ? (
                  <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5" title="Verified MoES Personnel">
                    <ShieldCheck className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="absolute -bottom-0.5 -right-0.5 bg-amber-500 text-white rounded-full p-0.5" title="Pending Verification">
                    <Clock className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-100 max-w-[140px] truncate">
                    {currentUser.name}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                      currentRole === 'admin'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : currentRole === 'trainer'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {currentRole}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                  {currentUser.designation}
                </p>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {/* Dropdown for Switching Personas */}
            {showSwitchDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Test Personnel
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Select a realistic MoES / IMD role persona to preview views:
                  </p>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 py-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setShowSwitchDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
                        u.id === currentUser.id ? 'bg-slate-800/80 border-l-2 border-cyan-400' : ''
                      }`}
                    >
                      <img
                        src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-200 truncate">{u.name}</p>
                          <span
                            className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono ${
                              u.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-300'
                                : u.role === 'trainer'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{u.designation}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 truncate">{u.institution.split(' - ')[0]}</span>
                          <span
                            className={`text-[9px] px-1 rounded ${
                              u.status === 'verified'
                                ? 'text-emerald-400 bg-emerald-950/40'
                                : 'text-amber-400 bg-amber-950/40'
                            }`}
                          >
                            {u.status}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-800 mt-1 space-y-1.5">
                  <button
                    onClick={() => {
                      setShowSwitchDropdown(false);
                      onOpenAuthModal();
                    }}
                    className="w-full py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Official Sign In / Login</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSwitchDropdown(false);
                      onOpenAuthModal();
                    }}
                    className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register New Officer Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSwitchDropdown(false);
                      logout();
                    }}
                    className="w-full py-1 px-3 text-slate-400 hover:text-rose-400 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Reset / Sign Out Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
