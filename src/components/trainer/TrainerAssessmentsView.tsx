import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssessmentCreatorModal } from './AssessmentCreatorModal';
import { AssessmentQuiz } from '../../types';
import { 
  FileCheck, 
  Plus, 
  Clock, 
  Award, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const TrainerAssessmentsView: React.FC = () => {
  const { quizzes, submissions, courses } = useApp();
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<AssessmentQuiz | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-cyan-400" />
            MCQ Assessment Engine & Examinations
          </h2>
          <p className="text-xs text-slate-400">
            Create subject-wise automated evaluations, configure timed windows, and audit candidate score performance.
          </p>
        </div>

        <button
          onClick={() => setShowCreatorModal(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assessment</span>
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizzes.map(quiz => {
          const attempts = submissions.filter(s => s.quizId === quiz.id);
          const passedCount = attempts.filter(s => s.passed).length;
          const passRate = attempts.length > 0 ? Math.round((passedCount / attempts.length) * 100) : 0;

          return (
            <div
              key={quiz.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                    {quiz.courseTitle.split(':')[0]}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {quiz.deadlineDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {quiz.title}
                </h3>

                <p className="text-xs text-slate-400">
                  Course: <strong className="text-slate-200">{quiz.courseTitle}</strong>
                </p>
              </div>

              {/* Assessment Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Duration</span>
                  <strong className="text-slate-200">{quiz.durationMinutes} mins</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Questions</span>
                  <strong className="text-slate-200">{quiz.questions.length} MCQs</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Passing Score</span>
                  <strong className="text-cyan-400">{quiz.passingScorePercentage}%</strong>
                </div>
              </div>

              {/* Submissions & Performance Breakdown */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{attempts.length} Trainees Attempted ({passRate}% Pass Rate)</span>
                </div>

                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  View Details & MCQs →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creator Modal */}
      <AssessmentCreatorModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
      />

      {/* Quiz Questions Inspector Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedQuiz.title}</h3>
                <p className="text-xs text-slate-400">{selectedQuiz.questions.length} Questions · Pass threshold: {selectedQuiz.passingScorePercentage}%</p>
              </div>
              <button onClick={() => setSelectedQuiz(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedQuiz.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-white">
                    <span>Q{idx + 1}. {q.question}</span>
                    <span className="text-cyan-400 font-mono">[{q.marks}M]</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pl-2">
                    {q.options.map(opt => (
                      <div
                        key={opt.id}
                        className={`p-1.5 rounded text-[11px] ${
                          opt.id === q.correctOptionId
                            ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/60'
                            : 'text-slate-400'
                        }`}
                      >
                        {opt.text} {opt.id === q.correctOptionId && '✓'}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-900">
                      Rationale: {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-4 py-1.5 text-xs bg-slate-800 text-white rounded-lg hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
