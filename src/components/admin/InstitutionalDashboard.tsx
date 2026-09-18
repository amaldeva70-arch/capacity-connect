import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Award, 
  Users, 
  Plus, 
  Bell, 
  X, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  Send
} from 'lucide-react';

export const InstitutionalDashboard: React.FC = () => {
  const { stats, courses, allUsers, announcements, addAnnouncement } = useApp();

  const [showCircularModal, setShowCircularModal] = useState(false);
  const [circularForm, setCircularForm] = useState({
    title: '',
    category: 'Circular' as any,
    summary: '',
    content: '',
    priority: 'normal' as any,
    issuingAuthority: 'Ministry of Earth Sciences (MoES), New Delhi'
  });

  // Calculate institution stats
  const institutions = [
    { acronym: 'IMD', name: 'India Meteorological Department', targetCount: 180, enrolled: 88, certified: 64, compliance: 82 },
    { acronym: 'NCMRWF', name: 'National Centre for Medium Range Weather Forecasting', targetCount: 45, enrolled: 32, certified: 28, compliance: 89 },
    { acronym: 'INCOIS', name: 'Indian National Centre for Ocean Information Services', targetCount: 40, enrolled: 26, certified: 22, compliance: 85 },
    { acronym: 'IITM', name: 'Indian Institute of Tropical Meteorology', targetCount: 35, enrolled: 22, certified: 18, compliance: 78 },
    { acronym: 'NIOT', name: 'National Institute of Ocean Technology', targetCount: 30, enrolled: 15, certified: 11, compliance: 73 },
    { acronym: 'NCPOR', name: 'National Centre for Polar and Ocean Research', targetCount: 25, enrolled: 12, certified: 9, compliance: 75 }
  ];

  const handleCircularSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularForm.title || !circularForm.summary) return;

    addAnnouncement({
      title: circularForm.title,
      category: circularForm.category,
      summary: circularForm.summary,
      content: circularForm.content || circularForm.summary,
      priority: circularForm.priority,
      issuingAuthority: circularForm.issuingAuthority,
      tags: ['MoES', 'Circular', 'Mandate']
    });

    setCircularForm({
      title: '',
      category: 'Circular',
      summary: '',
      content: '',
      priority: 'normal',
      issuingAuthority: 'Ministry of Earth Sciences (MoES), New Delhi'
    });

    setShowCircularModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            MoES Apex Institutional Leadership Dashboard
          </h2>
          <p className="text-xs text-slate-400">
            Strategic training governance, institutional participation indices, and executive circular management.
          </p>
        </div>

        <button
          onClick={() => setShowCircularModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-colors shrink-0"
        >
          <Bell className="w-4 h-4" />
          <span>Publish Ministry Circular</span>
        </button>
      </div>

      {/* Top Level Apex KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Total Officers Upskilled</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-white">{stats.totalTrainees + 140}</span>
            <span className="text-xs text-emerald-400 font-bold">+18% YoY</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Across all 7 subordinate institutes</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">National Compliance Index</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">83.5%</span>
            <span className="text-xs text-cyan-300 font-bold">Good</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Target benchmark: ≥ 80%</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Active Syllabi Deployed</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-400">{courses.length}</span>
            <span className="text-xs text-purple-300 font-bold">Approved</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">NWP, Radar, Argo, HPC & AI</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Assessment Pass Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">89.2%</span>
            <span className="text-xs text-emerald-300 font-bold">Certified</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Subject-wise automated evaluation</p>
        </div>
      </div>

      {/* Institutional Breakdown Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Center-Wise Training Performance & Compliance Table
            </h3>
            <p className="text-xs text-slate-400">
              Monitoring trainee uptake against sanctioned capacity quotas under Mission Mausam and Deep Ocean Mission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutions.map(inst => (
            <div
              key={inst.acronym}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-sm font-black text-cyan-400 tracking-wider">
                    {inst.acronym}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
                    {inst.name}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  {inst.compliance}% Index
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Enrolled / Target Quota:</span>
                  <strong className="text-slate-200">{inst.enrolled} / {inst.targetCount}</strong>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${(inst.enrolled / inst.targetCount) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Certified Candidates:</span>
                  <span className="text-emerald-400 font-bold">{inst.certified} Officers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Popularity & Domain Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Courses Ranking */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Top Capacity Building Programs by Enrollment
          </h3>

          <div className="space-y-3">
            {courses.slice(0, 4).map(course => (
              <div
                key={course.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between"
              >
                <div className="space-y-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded">
                      {course.code}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{course.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400">{course.instructorName} · {course.domain}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-white block">{course.enrolledCount} Enrolled</span>
                  <span className="text-[10px] text-amber-400 font-bold">★ {course.averageRating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circulars & Notices Published */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              Published Ministry Circulars ({announcements.length})
            </h3>
            <button
              onClick={() => setShowCircularModal(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              + Draft New
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{ann.publishedDate}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{ann.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2">{ann.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Draft Ministry Circular Modal */}
      {showCircularModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                Publish Official MoES Circular / Training Notice
              </h3>
              <button onClick={() => setShowCircularModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCircularSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Circular Subject Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Nomination for Dual-Polarization Radar Workshop"
                  value={circularForm.title}
                  onChange={e => setCircularForm({ ...circularForm, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Notice Category</label>
                  <select
                    value={circularForm.category}
                    onChange={e => setCircularForm({ ...circularForm, category: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="Circular">Official Circular</option>
                    <option value="Policy">Policy / Mandate</option>
                    <option value="Workshop">Workshop Notice</option>
                    <option value="General">General Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency Priority</label>
                  <select
                    value={circularForm.priority}
                    onChange={e => setCircularForm({ ...circularForm, priority: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="featured">Featured</option>
                    <option value="urgent">Urgent Action Required</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  required
                  value={circularForm.issuingAuthority}
                  onChange={e => setCircularForm({ ...circularForm, issuingAuthority: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary (1-2 sentences) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Key highlight shown on notifications bar and overview cards..."
                  value={circularForm.summary}
                  onChange={e => setCircularForm({ ...circularForm, summary: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Circular Text</label>
                <textarea
                  rows={3}
                  placeholder="Detailed guidelines, reporting deadlines, and nomination criteria..."
                  value={circularForm.content}
                  onChange={e => setCircularForm({ ...circularForm, content: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCircularModal(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-lg flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Circular</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
