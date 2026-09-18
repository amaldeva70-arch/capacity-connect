import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { InstitutionAffiliation, UserProfile, UserRole } from '../../types';
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
  GraduationCap,
  BookOpen,
  Shield,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export type AuthModalTab = 'trainee' | 'trainer' | 'admin' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: AuthModalTab;
  onLoginSuccess?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'admin',
  onLoginSuccess
}) => {
  const { login, registerUser, users } = useApp();

  const [activeTab, setActiveTab] = useState<AuthModalTab>(defaultTab);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Sync tab when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setLoginError(null);
      // Pre-fill corresponding role default credentials for instant usability
      if (defaultTab === 'admin') {
        setEmail('rajesh.sharma@moes.gov.in');
        setPassword('moes@123');
      } else if (defaultTab === 'trainer') {
        setEmail('sunita.kulkarni@ncmrwf.gov.in');
        setPassword('ncmrwf@123');
      } else if (defaultTab === 'trainee') {
        setEmail('arvind.verma@imd.gov.in');
        setPassword('imd@123');
      } else {
        setEmail('');
        setPassword('');
      }
    }
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleTabChange = (tab: AuthModalTab) => {
    setActiveTab(tab);
    setLoginError(null);
    if (tab === 'admin') {
      setEmail('rajesh.sharma@moes.gov.in');
      setPassword('moes@123');
    } else if (tab === 'trainer') {
      setEmail('sunita.kulkarni@ncmrwf.gov.in');
      setPassword('ncmrwf@123');
    } else if (tab === 'trainee') {
      setEmail('arvind.verma@imd.gov.in');
      setPassword('imd@123');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const inputEmail = email.trim();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      setLoginError('Please enter both official email and security password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(inputEmail, inputPassword);
      setIsSubmitting(false);

      if (result.success && result.user) {
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
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
      setRegError('Please complete Full Name, Official Email, and Employee ID.');
      return;
    }

    if (!regData.password.trim() || regData.password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    const existing = users.find(u => u.email.toLowerCase() === regData.email.trim().toLowerCase());
    if (existing) {
      setRegError('An account with this official email already exists. Please sign in.');
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

    const registeredUser = users.find(u => u.email.toLowerCase() === regData.email.trim().toLowerCase());

    setRegSuccess(`Registration approved for ${regData.name}. Initialized in system.`);
    setTimeout(() => {
      if (registeredUser && onLoginSuccess) {
        onLoginSuccess(registeredUser);
      }
      onClose();
    }, 1200);
  };

  // Preset role quick-fill accounts
  const traineeAccounts = [
    { name: 'Arvind Verma (IMD Pune)', email: 'arvind.verma@imd.gov.in', pass: 'imd@123', role: 'Scientific Assistant' },
    { name: 'Priya Nambiar (INCOIS Hyd)', email: 'priya.nambiar@incois.gov.in', pass: 'incois@123', role: 'Junior Research Fellow' },
    { name: 'Rajesh Soren (IMD Kolkata)', email: 'rajesh.soren@imd.gov.in', pass: 'imd@123', role: 'Meteorological Observer' }
  ];

  const trainerAccounts = [
    { name: 'Dr. Sunita Kulkarni (NCMRWF)', email: 'sunita.kulkarni@ncmrwf.gov.in', pass: 'ncmrwf@123', role: 'Scientist-E / NWP Head' },
    { name: 'Dr. K. Radhakrishnan (INCOIS)', email: 'k.radhakrishnan@incois.gov.in', pass: 'incois@123', role: 'Scientist-F / Tsunami Head' },
    { name: 'Dr. Meenakshi Sundaram (IITM)', email: 'm.sundaram@tropmet.res.in', pass: 'tropmet@123', role: 'Scientist-E / Climate & AI' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col my-6">
        
        {/* Modal Header */}
        <div className="bg-slate-850 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${
              activeTab === 'admin' 
                ? 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-950/50' 
                : activeTab === 'trainer'
                ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-950/50'
                : activeTab === 'trainee'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-cyan-950/50'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-950/50'
            }`}>
              {activeTab === 'admin' && <ShieldCheck className="w-5 h-5 text-slate-950" />}
              {activeTab === 'trainer' && <BookOpen className="w-5 h-5 text-white" />}
              {activeTab === 'trainee' && <GraduationCap className="w-5 h-5 text-white" />}
              {activeTab === 'register' && <UserPlus className="w-5 h-5 text-white" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {activeTab === 'admin' && 'Administrator Portal Login'}
                  {activeTab === 'trainer' && 'Trainer & Faculty Login'}
                  {activeTab === 'trainee' && 'Trainee Officer Login'}
                  {activeTab === 'register' && 'Officer Registration Portal'}
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                  activeTab === 'admin'
                    ? 'bg-amber-950 text-amber-300 border-amber-700'
                    : activeTab === 'trainer'
                    ? 'bg-purple-950 text-purple-300 border-purple-700'
                    : activeTab === 'trainee'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {activeTab === 'admin' && 'Central Directorate'}
                  {activeTab === 'trainer' && 'Instructor / Faculty'}
                  {activeTab === 'trainee' && 'Cadre Trainee'}
                  {activeTab === 'register' && 'MoES / IMD SSO'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                CAPACITY CONNECT · Ministry of Earth Sciences & Indian Meteorological Dept
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Navigation Tabs (Trainee, Trainer, Admin, Register) */}
        <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-950/70 p-1.5 gap-1 text-xs font-semibold">
          {/* 1. Trainee Tab */}
          <button
            onClick={() => handleTabChange('trainee')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'trainee'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Trainee</span>
          </button>

          {/* 2. Trainer Tab */}
          <button
            onClick={() => handleTabChange('trainer')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'trainer'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Trainer</span>
          </button>

          {/* 3. Admin Tab */}
          <button
            onClick={() => handleTabChange('admin')}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'admin'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Admin</span>
          </button>

          {/* 4. Register Tab */}
          <button
            onClick={() => {
              setActiveTab('register');
              setRegError(null);
            }}
            className={`py-2 px-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center ${
              activeTab === 'register'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Register</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: TRAINEE LOGIN WINDOW                                   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'trainee' && (
          <div className="p-6 space-y-5">
            {/* Context Box */}
            <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-3.5 flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-cyan-200">
                  Trainee Officer & Cadre Learning Desk
                </p>
                <p className="text-[11px] text-cyan-300/80 leading-relaxed">
                  Grants access to enrolled MoES courses, Doppler radar & NWP training modules, assessment quizzes, competency profile development, and certified digital credentials.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Trainee Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Trainee Official Email Address</span>
                  <span className="text-[10px] text-cyan-400 font-mono">@imd.gov.in / @incois.gov.in</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="arvind.verma@imd.gov.in"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Password</span>
                  <span className="text-[10px] text-slate-400">Institutional SSO</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
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

              {/* Quick Select Preset Trainee Accounts */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Quick Select Trainee Profile:</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {traineeAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEmail(acc.email);
                        setPassword(acc.pass);
                        setLoginError(null);
                      }}
                      className={`text-left p-2 rounded-lg border text-[11px] transition-all ${
                        email === acc.email
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                          : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <p className="font-bold truncate">{acc.name.split(' (')[0]}</p>
                      <p className="text-[10px] text-slate-400 truncate">{acc.role}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating Trainee Profile...' : 'Sign In as Trainee Officer'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: TRAINER LOGIN WINDOW                                   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'trainer' && (
          <div className="p-6 space-y-5">
            {/* Context Box */}
            <div className="bg-purple-950/40 border border-purple-800/60 rounded-xl p-3.5 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-purple-200">
                  Trainer & Academic Faculty Portal
                </p>
                <p className="text-[11px] text-purple-300/80 leading-relaxed">
                  Grants instructional authorization to author courses, upload SCORM & video material, build interactive MCQ assessments, review submissions, and track batch competencies.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Trainer Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Trainer Official Email Address</span>
                  <span className="text-[10px] text-purple-400 font-mono">@ncmrwf / @incois / @tropmet</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sunita.kulkarni@ncmrwf.gov.in"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Trainer Password</span>
                  <span className="text-[10px] text-slate-400">Institutional</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter trainer password..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
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

              {/* Quick Select Preset Trainer Accounts */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Quick Select Faculty Profile:</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {trainerAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setEmail(acc.email);
                        setPassword(acc.pass);
                        setLoginError(null);
                      }}
                      className={`text-left p-2 rounded-lg border text-[11px] transition-all ${
                        email === acc.email
                          ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                          : 'bg-slate-900 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <p className="font-bold truncate">{acc.name.split(' (')[0]}</p>
                      <p className="text-[10px] text-slate-400 truncate">{acc.role}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isSubmitting ? 'Authenticating Faculty Credentials...' : 'Sign In as Faculty Trainer'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: ADMIN LOGIN WINDOW                                     */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'admin' && (
          <div className="p-6 space-y-5">
            {/* Directorate Notice Box */}
            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3.5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-200">
                  MoES Capacity Building Commission · Central Directorate
                </p>
                <p className="text-[11px] text-amber-300/80 leading-relaxed">
                  Administrator clearance grants full management rights over officer verifications, institutional budget tracking, competency mapping algorithms, and national assessment moderation.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Admin Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Administrator Official Email</span>
                  <span className="text-[10px] text-amber-400 font-mono">@moes.gov.in</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="rajesh.sharma@moes.gov.in"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Admin Security Password</span>
                  <span className="text-[10px] text-slate-400">Encrypted</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
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

              {/* Institutional Credentials Quick-Insert Note */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">Default Admin Credentials:</span>
                  <code className="text-amber-300 font-mono text-[11px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                    rajesh.sharma@moes.gov.in / moes@123
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('rajesh.sharma@moes.gov.in');
                    setPassword('moes@123');
                    setLoginError(null);
                  }}
                  className="text-amber-400 hover:text-amber-300 underline font-medium text-[11px] shrink-0"
                >
                  Auto-fill
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Authenticating with MoES Central Directorate...' : 'Sign In as System Administrator'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: REGISTER NEW OFFICER                                   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {regSuccess && (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{regSuccess}</span>
              </div>
            )}

            {regError && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{regError}</span>
              </div>
            )}

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
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  value={regData.email}
                  onChange={e => setRegData({ ...regData, email: e.target.value })}
                  placeholder="suresh.kumar@imd.gov.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
                  placeholder="Create password..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Role *
                </label>
                <select
                  value={regData.role}
                  onChange={e => setRegData({ ...regData, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="trainee">Trainee (Cadre Officer / Learner)</option>
                  <option value="trainer">Trainer (Instructor / Faculty)</option>
                  <option value="admin">Administrator (MoES Directorate)</option>
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={regData.phone}
                  onChange={e => setRegData({ ...regData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="MoES - Ministry of Earth Sciences HQ">MoES - Ministry of Earth Sciences HQ</option>
                  <option value="IMD - India Meteorological Department">IMD - India Meteorological Department</option>
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
                  placeholder="e.g. Scientist-C / Director"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
                placeholder="e.g. Prithvi Bhavan, Lodhi Road, New Delhi"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-colors"
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
