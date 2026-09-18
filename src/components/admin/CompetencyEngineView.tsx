import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitMerge, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Send, 
  Award, 
  ArrowRight, 
  UserCheck, 
  SlidersHorizontal,
  BrainCircuit,
  Filter
} from 'lucide-react';

export const CompetencyEngineView: React.FC = () => {
  const { allUsers, courses, competencyMatches, assignCompetencyRecommendation } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [minMatchScore, setMinMatchScore] = useState<number>(70);

  const filteredMatches = competencyMatches.filter(match => {
    const trainee = allUsers.find(u => u.id === match.traineeId);
    const course = courses.find(c => c.id === match.courseId);

    const matchesSearch =
      (trainee?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (trainee?.institution.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesDomain = selectedDomain === 'All' || course?.domain === selectedDomain;
    const matchesScore = match.matchPercentage >= minMatchScore;

    return matchesSearch && matchesDomain && matchesScore;
  });

  const domains = ['All', 'Meteorology', 'Ocean Sciences', 'Climate Modeling', 'Geosciences'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-800/30 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>MoES Intelligent Capacity Mapping Algorithm</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Automated Competency Match & Training Recommender Engine
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          The algorithm scans officer competency tags, current station posting requirements, academic prerequisites, 
          and previous assessment performances to calculate real-time match indices and formulate targeted training nominations.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            Active Recommendations: <strong>{competencyMatches.length} Matches Generated</strong>
          </span>
          <span>•</span>
          <span>Engine Status: <strong className="text-emerald-400">Online & Synthesized</strong></span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search match by officer name, course title, or institute..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Domain:</span>
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500"
            >
              {domains.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Disciplines' : d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Min Match:</span>
            <span className="text-xs font-mono font-bold text-amber-400">{minMatchScore}%</span>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minMatchScore}
              onChange={e => setMinMatchScore(parseInt(e.target.value))}
              className="w-24 accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMatches.map(match => {
          const trainee = allUsers.find(u => u.id === match.traineeId);
          const course = courses.find(c => c.id === match.courseId);

          if (!trainee || !course) return null;

          return (
            <div
              key={match.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 group transition-all"
            >
              {/* Header with Match Percentage */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={trainee.avatarUrl}
                    alt={trainee.name}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-700 shadow-sm"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{trainee.name}</h3>
                    <p className="text-xs text-slate-400">
                      {trainee.designation} · {trainee.institution.split(' - ')[0]}
                    </p>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Station: {trainee.stationOrLocation}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-800/60 text-amber-300 font-mono text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{match.matchPercentage}% Match</span>
                  </div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 mt-0.5">
                    Algorithm Confidence
                  </span>
                </div>
              </div>

              {/* Recommended Course Box */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan-300 font-bold">{course.code}</span>
                  <span className="text-slate-400">{course.domain} · {course.difficulty}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-400">
                  Lead Instructor: {course.instructorName} ({course.effortHours} Hours)
                </p>
              </div>

              {/* Rationales & Matching Factors */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Algorithmic Rationale:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 italic">
                  "{match.rationale}"
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {match.matchingFactors.map(factor => (
                    <span
                      key={factor}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      ✓ {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nomination Action Bar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Calculated: {match.generatedDate}
                </span>

                {match.status === 'recommended' ? (
                  <button
                    onClick={() => assignCompetencyRecommendation(match.id)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-amber-950/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Official Nomination</span>
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Nomination Dispatched
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
