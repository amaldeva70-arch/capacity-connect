import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavTabId } from '../common/Navigation';
import { downloadCircularAttachment } from '../../utils/fileDownloader';
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck, 
  GitMerge, 
  ShieldCheck, 
  Users, 
  UploadCloud, 
  Award, 
  ArrowRight, 
  Bell, 
  Download, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Clock,
  Compass
} from 'lucide-react';

interface PortalHomeProps {
  onNavigate: (tab: NavTabId) => void;
}

export const PortalHome: React.FC<PortalHomeProps> = ({ onNavigate }) => {
  const { currentUser, currentRole, courses, announcements, stats } = useApp();

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Institutional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Capacity Building Mission · MoES & IMD</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">CAPACITY CONNECT</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              The unified digital learning, assessment, and competency mapping platform for the 
              <strong> Ministry of Earth Sciences (MoES)</strong> and <strong>India Meteorological Department (IMD)</strong>. 
              Accelerating scientific upskilling across weather forecasting, ocean observation, atmospheric dynamics, and climate resilience.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Logged in as:</span>
              <span className="text-xs font-bold text-white bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-md">
                {currentUser.name}
              </span>
              <span className="text-xs text-slate-400">Designation:</span>
              <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-md">
                {currentUser.designation} ({currentUser.institution.split(' - ')[0]})
              </span>
            </div>
          </div>

          {/* Quick Action Hub based on Role */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 w-full md:w-80 shrink-0 backdrop-blur">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Role Hub
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentRole}
              </span>
            </div>

            <div className="space-y-2">
              {currentRole === 'trainee' && (
                <>
                  <button
                    onClick={() => onNavigate('my-learning')}
                    className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Resume Active Training
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('profile')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Update Skills & Certificates
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {currentRole === 'trainer' && (
                <>
                  <button
                    onClick={() => onNavigate('content-studio')}
                    className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <UploadCloud className="w-4 h-4" />
                      Upload Study Materials
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('assessments')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-cyan-400" />
                      Create MCQ Assessment
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {currentRole === 'admin' && (
                <>
                  <button
                    onClick={() => onNavigate('competency-engine')}
                    className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GitMerge className="w-4 h-4" />
                      Competency Match Engine
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('user-management')}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Verify Officer Accounts ({stats.pendingApprovals})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  Browse Course Catalog
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Trained Personnel</p>
            <p className="text-xl font-bold text-white">{stats.totalTrainees + 140}</p>
            <p className="text-[10px] text-emerald-400 font-medium">Active across 7 Institutes</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Domain Curriculums</p>
            <p className="text-xl font-bold text-white">{courses.length}</p>
            <p className="text-[10px] text-cyan-400 font-medium">Atmosphere, Ocean, Climate</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">National Enrollments</p>
            <p className="text-xl font-bold text-white">{stats.totalEnrollments}</p>
            <p className="text-[10px] text-slate-400 font-medium">{stats.averageCompletionRate}% avg. completion</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Competency Engine</p>
            <p className="text-xl font-bold text-emerald-400">Online</p>
            <p className="text-[10px] text-slate-400 font-medium">Automatic Faculty Matching</p>
          </div>
        </div>
      </div>

      {/* Featured Courses & Modules Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Flagship Capacity Building Programs
            </h2>
            <p className="text-xs text-slate-400">
              Approved training modules aligned with WMO guidelines and MoES Mission Mausam requirements.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>View All ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.slice(0, 3).map(course => (
            <div
              key={course.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-40 overflow-hidden bg-slate-950">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <span className="absolute top-3 right-3 bg-slate-900/90 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {course.domain}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                    ★ {course.averageRating} ({course.ratingCount} reviews)
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Lead Faculty:</span>
                    <strong className="text-slate-200">{course.instructorName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="text-slate-300">{course.durationWeeks} Weeks · {course.effortHours} Hours</span>
                  </div>

                  <button
                    onClick={() => onNavigate('catalog')}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <span>View Course Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Announcements & MoES Circulars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" />
              Official Circulars & Training Notices
            </h2>
            <p className="text-xs text-slate-400">
              Government notices, milestone updates, and training circulars issued by MoES institutions.
            </p>
          </div>
          <button
            onClick={() => onNavigate('announcements')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>All Circulars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.slice(0, 2).map(ann => (
            <div
              key={ann.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      ann.priority === 'urgent'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : ann.priority === 'featured'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {ann.category}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ann.publishedDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ann.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Issued by: <strong className="text-slate-300">{ann.issuingAuthority.split(',')[0]}</strong>
                </span>
                {ann.downloadAttachmentName && (
                  <button
                    onClick={() => downloadCircularAttachment(ann.title, ann.issuingAuthority)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Circular</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MoES Institutes Ecosystem Strip */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Ministry of Earth Sciences Ecosystem Network
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Integrated capacity building across all subordinate offices, autonomous bodies, and attached centres.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { acronym: 'IMD', name: 'India Meteorological Dept', city: 'New Delhi & RMCs' },
            { acronym: 'NCMRWF', name: 'Medium Range Weather Forecast', city: 'Noida' },
            { acronym: 'INCOIS', name: 'Ocean Information Services', city: 'Hyderabad' },
            { acronym: 'IITM', name: 'Tropical Meteorology', city: 'Pune' },
            { acronym: 'NIOT', name: 'National Inst of Ocean Tech', city: 'Chennai' },
            { acronym: 'NCPOR', name: 'Polar & Ocean Research', city: 'Goa' }
          ].map(inst => (
            <div
              key={inst.acronym}
              className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 text-center flex flex-col justify-center items-center hover:border-slate-700 transition-colors"
            >
              <span className="text-sm font-black text-cyan-400 tracking-wider">
                {inst.acronym}
              </span>
              <p className="text-[10px] font-semibold text-slate-300 mt-1 line-clamp-1">
                {inst.name}
              </p>
              <span className="text-[9px] text-slate-500 mt-0.5">{inst.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
