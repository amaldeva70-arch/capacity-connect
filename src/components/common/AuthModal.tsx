import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionAffiliation, UserRole } from '../../types';
import { 
  X, 
  UserPlus, 
  LogIn, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Building2,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { login, registerUser, users } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration Form State
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'trainee' as UserRole,
    employeeId: '',
    designation: '',
    institution: 'IMD - India Meteorological Department' as InstitutionAffiliation,
    stationOrLocation: '',
    bio: '',
    interestsString: 'Doppler Radar, Nowcasting, Climate Modeling'
  });

  if (!isOpen) return null;

  // Demo Credentials quick filler
  const handleQuickFill = (role: 'trainee' | 'trainer' | 'admin') => {
    setLoginError(null);
    if (role === 'trainee') {
      setLoginEmail('arvind.verma@imd.gov.in');
      setLoginPassword('imd@123');
    } else if (role === 'trainer') {
      setLoginEmail('sunita.kulkarni@ncmrwf.gov.in');
      setLoginPassword('ncmrwf@123');
    } else {
      setLoginEmail('rajesh.sharma@moes.gov.in');
      setLoginPassword('moes@123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both official email and password.');
      return;
    }

    setIsSubmitting(true);
    // Simulate brief secure handshake
    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      setIsSubmitting(false);

      if (result.success) {
        onClose();
      } else {
        setLoginError(result.message);
      }
    }, 250);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regData.name.trim() || !regData.email.trim() || !regData.employeeId.trim()) {
      setRegError('Please complete Name, Official Email, and Employee ID.');
      return;
    }

    if (!regData.password.trim() || regData.password.length < 6) {
      setRegError('Please provide a secure password with at least 6 characters.');
      return;
    }

    // Check if email already registered
    const existing = users.find(u => u.email.toLowerCase() === regData.email.trim().toLowerCase());
    if (existing) {
      setRegError('An account with this official email address already exists. Please sign in instead.');
      return;
    }

    const interests = regData.interestsString
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    registerUser({
      ...regData,
      interests
    });

    setRegSuccess(`Account for ${regData.name} created and active. You are now logged in!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col my-6">
        
        {/* Modal Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/40">
              {activeTab === 'login' ? <Lock className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {activeTab === 'login' ? 'Institutional Sign In' : 'MoES / IMD Officer Registration'}
                </h3>
                <span className="text-[10px] uppercase font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                  Gov.in SSO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                CAPACITY CONNECT · National Earth Science Training Framework
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-slate-800 bg-slate-950/50 p-1.5 gap-1.5 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('login');
              setLoginError(null);
            }}
            className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'login'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Official Sign In</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('register');
              setRegError(null);
            }}
            className={`py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'register'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Profile</span>
          </button>
        </div>

        {/* Tab 1: Sign In Content */}
        {activeTab === 'login' && (
          <div className="p-6 space-y-5">
            {/* Demo One-Click Role Accounts */}
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  One-Click Demo Credentials
                </span>
                <span className="text-[10px] text-slate-500">Tap to auto-fill</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('trainee')}
                  className="bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/50 hover:border-blue-500 rounded-lg p-2 text-left transition-colors group"
                >
                  <span className="block text-[10px] uppercase font-bold text-blue-400">Trainee (Student)</span>
                  <span className="block text-xs font-semibold text-white truncate">Arvind Verma</span>
                  <span className="block text-[9px] font-mono text-slate-400">imd@123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('trainer')}
                  className="bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/50 hover:border-purple-500 rounded-lg p-2 text-left transition-colors group"
                >
                  <span className="block text-[10px] uppercase font-bold text-purple-400">Trainer (Faculty)</span>
                  <span className="block text-xs font-semibold text-white truncate">Dr. Sunita K.</span>
                  <span className="block text-[9px] font-mono text-slate-400">ncmrwf@123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('admin')}
                  className="bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/50 hover:border-amber-500 rounded-lg p-2 text-left transition-colors group"
                >
                  <span className="block text-[10px] uppercase font-bold text-amber-400">Admin (MoES HQ)</span>
                  <span className="block text-xs font-semibold text-white truncate">Dr. Rajesh S.</span>
                  <span className="block text-[9px] font-mono text-slate-400">moes@123</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-rose-950/70 border border-rose-800 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Official Email Address (gov.in / nic.in / res.in)</span>
                  <span className="text-[10px] text-slate-500">Government Domain</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="e.g. arvind.verma@imd.gov.in"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Institutional Password</span>
                  <span className="text-[10px] text-cyan-400">Encrypted</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating with MoES Server...' : 'Sign In to Capacity Portal'}</span>
                </button>
              </div>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setRegError(null);
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                New MoES / IMD Personnel? Create an official training profile →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Register Content */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {regSuccess ? (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{regSuccess}</span>
              </div>
            ) : null}

            {regError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{regError}</span>
              </div>
            )}

            <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-blue-200 leading-relaxed">
                <strong>Officer Registration:</strong> New profiles are registered under the official MoES / IMD Capacity Framework. All curriculum hours, examination scores, and credentials will be logged permanently.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regData.name}
                  onChange={e => setRegData({ ...regData, name: e.target.value })}
                  placeholder="e.g. Dr. Suresh Kumar"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Email (gov.in / nic.in / res.in) *
                </label>
                <input
                  type="email"
                  required
                  value={regData.email}
                  onChange={e => setRegData({ ...regData, email: e.target.value })}
                  placeholder="suresh.kumar@imd.gov.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password * (Min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  value={regData.password}
                  onChange={e => setRegData({ ...regData, password: e.target.value })}
                  placeholder="Create secure password..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Role *
                </label>
                <select
                  value={regData.role}
                  onChange={e => setRegData({ ...regData, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="trainee">Trainee (Student/Officer)</option>
                  <option value="trainer">Trainer (Instructor/Faculty)</option>
                  <option value="admin">Admin (HRD Manager)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Employee ID *
                </label>
                <input
                  type="text"
                  required
                  value={regData.employeeId}
                  onChange={e => setRegData({ ...regData, employeeId: e.target.value })}
                  placeholder="e.g. IMD-DEL-2024-902"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={regData.phone}
                  onChange={e => setRegData({ ...regData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institutional Affiliation *
                </label>
                <select
                  value={regData.institution}
                  onChange={e => setRegData({ ...regData, institution: e.target.value as InstitutionAffiliation })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="IMD - India Meteorological Department">IMD - India Meteorological Department</option>
                  <option value="MoES - Ministry of Earth Sciences HQ">MoES - Ministry of Earth Sciences HQ</option>
                  <option value="NCMRWF - National Centre for Medium Range Weather Forecasting">NCMRWF - National Centre for Medium Range Weather Forecasting</option>
                  <option value="INCOIS - Indian National Centre for Ocean Information Services">INCOIS - Indian National Centre for Ocean Information Services</option>
                  <option value="IITM - Indian Institute of Tropical Meteorology, Pune">IITM - Indian Institute of Tropical Meteorology, Pune</option>
                  <option value="NIOT - National Institute of Ocean Technology, Chennai">NIOT - National Institute of Ocean Technology, Chennai</option>
                  <option value="NCPOR - National Centre for Polar and Ocean Research, Goa">NCPOR - National Centre for Polar and Ocean Research, Goa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Designation / Grade
                </label>
                <input
                  type="text"
                  value={regData.designation}
                  onChange={e => setRegData({ ...regData, designation: e.target.value })}
                  placeholder="e.g. Scientific Assistant / Scientist-C"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Posting Station / Location
              </label>
              <input
                type="text"
                value={regData.stationOrLocation}
                onChange={e => setRegData({ ...regData, stationOrLocation: e.target.value })}
                placeholder="e.g. Regional Meteorological Centre, Colaba, Mumbai"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Interest Tags (Comma separated)
              </label>
              <input
                type="text"
                value={regData.interestsString}
                onChange={e => setRegData({ ...regData, interestsString: e.target.value })}
                placeholder="Doppler Radar, Numerical Weather Prediction, Tsunami"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Already registered? Sign In
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/50 flex items-center gap-2 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Register & Enter Portal</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
