import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, QuizSubmission } from '../../types';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  BarChart2, 
  Eye, 
  Building2, 
  Calendar,
  X
} from 'lucide-react';

export const TrainerAnalytics: React.FC = () => {
  const { allUsers, submissions, courses, stats } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState<string>('All');
  const [selectedTrainee, setSelectedTrainee] = useState<User | null>(null);

  const trainees = allUsers.filter(u => u.role === 'trainee');

  const filteredTrainees = trainees.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesInst = selectedInst === 'All' || t.institution.includes(selectedInst);

    return matchesSearch && matchesInst;
  });

  const institutions = ['All', 'IMD', 'NCMRWF', 'INCOIS', 'IITM'];

  // Calculate trainee-specific submissions
  const getTraineeSubmissions = (traineeId: string) => {
    return submissions.filter(s => s.traineeId === traineeId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          Trainee Analytics & Performance Monitoring
        </h2>
        <p className="text-xs text-slate-400">
          Track individual officer syllabus progress, audit MCQ assessment submissions, and monitor organizational completion rates.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Registered Trainees</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{trainees.length}</p>
          <span className="text-[10px] text-slate-500">Across 6 MoES Centers</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Course Enrollments</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.totalEnrollments}</p>
          <span className="text-[10px] text-emerald-400">Active engagement</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Avg Completion Rate</span>
            <BarChart2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2">{stats.averageCompletionRate}%</p>
          <span className="text-[10px] text-slate-500">Benchmark: 65% target</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Assessments Logged</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{submissions.length}</p>
          <span className="text-[10px] text-slate-500">Instant Automated Scoring</span>
        </div>
      </div>

      {/* Trainees Performance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trainee by name, employee ID, or designation..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Center:</span>
            <select
              value={selectedInst}
              onChange={e => setSelectedInst(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
            >
              {institutions.map(inst => (
                <option key={inst} value={inst}>{inst === 'All' ? 'All Institutes' : inst}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-3">Trainee Candidate</th>
                <th className="pb-3 px-3">Center / Posting</th>
                <th className="pb-3 px-3">Enrollments</th>
                <th className="pb-3 px-3">Skills Logged</th>
                <th className="pb-3 px-3">Recent Assessment</th>
                <th className="pb-3 px-3 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTrainees.map(trainee => {
                const subs = getTraineeSubmissions(trainee.id);
                const latestSub = subs[subs.length - 1];

                return (
                  <tr key={trainee.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={trainee.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={trainee.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-white">{trainee.name}</p>
                          <span className="text-[10px] font-mono text-cyan-400">{trainee.employeeId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-medium text-slate-300">{trainee.institution.split(' - ')[0]}</p>
                      <span className="text-[10px] text-slate-500">{trainee.designation}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-200">
                          {trainee.completedCourseIds.length} <span className="text-slate-500">/</span> {trainee.enrolledCourseIds.length} Finished
                        </span>
                        <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{
                              width: `${
                                trainee.enrolledCourseIds.length > 0
                                  ? (trainee.completedCourseIds.length / trainee.enrolledCourseIds.length) * 100
                                  : 0
                              }%`
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {trainee.skills.length} Competencies
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      {latestSub ? (
                        <div className="flex items-center gap-1.5">
                          {latestSub.passed ? (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                              {latestSub.percentage}% (PASS)
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                              {latestSub.percentage}% (FAIL)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">No attempts yet</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedTrainee(trainee)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="View Trainee Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainee Dossier Modal */}
      {selectedTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTrainee.avatarUrl}
                  alt={selectedTrainee.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedTrainee.name}</h3>
                  <p className="text-xs text-slate-400">{selectedTrainee.designation} · {selectedTrainee.institution}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTrainee(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Submissions History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Assessment History & Attempts
              </h4>

              <div className="space-y-2">
                {getTraineeSubmissions(selectedTrainee.id).map(sub => (
                  <div
                    key={sub.id}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{sub.quizTitle}</p>
                      <span className="text-[10px] text-slate-500">Attempted: {sub.submittedAt} · Duration: {sub.timeSpentMinutes} mins</span>
                    </div>

                    <div className="text-right">
                      <span className={`font-bold font-mono ${sub.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {sub.score} / {sub.totalPossibleMarks} ({sub.percentage}%)
                      </span>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">
                        {sub.passed ? 'Cleared' : 'Needs Retake'}
                      </span>
                    </div>
                  </div>
                ))}
                {getTraineeSubmissions(selectedTrainee.id).length === 0 && (
                  <p className="text-xs text-slate-500 py-3 italic text-center">No assessments completed yet.</p>
                )}
              </div>
            </div>

            {/* Skills & Certificates */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Logged Skills & Competencies ({selectedTrainee.skills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrainee.skills.map(s => (
                  <span key={s.id} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {s.name} <strong className="text-cyan-400">({s.proficiency})</strong>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTrainee(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 text-xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
