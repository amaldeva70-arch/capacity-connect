import React, { useState, useEffect } from 'react';
import { AssessmentQuiz, QuizSubmission } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  X, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface QuizTakerModalProps {
  quiz: AssessmentQuiz;
  isOpen: boolean;
  onClose: () => void;
}

export const QuizTakerModal: React.FC<QuizTakerModalProps> = ({ quiz, isOpen, onClose }) => {
  const { currentUser, submitQuizAttempt } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(quiz.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<QuizSubmission | null>(null);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;

    let score = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        score += q.marks;
      }
    });

    const percentage = Math.round((score / quiz.totalMarks) * 100);
    const passed = percentage >= quiz.passingScorePercentage;
    const timeSpent = Math.max(1, Math.round((quiz.durationMinutes * 60 - secondsRemaining) / 60));

    const result = submitQuizAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      courseId: quiz.courseId,
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      institution: currentUser.institution,
      timeSpentMinutes: timeSpent,
      score,
      totalPossibleMarks: quiz.totalMarks,
      percentage,
      passed,
      selectedAnswers
    });

    setSubmissionResult(result);
    setIsSubmitted(true);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-slate-800/90 px-6 py-3.5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded font-bold uppercase">
                {quiz.courseTitle.split(':')[0]}
              </span>
              <h3 className="text-sm font-bold text-white truncate max-w-md">
                {quiz.title}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Total Questions: {quiz.questions.length} · Total Marks: {quiz.totalMarks} · Passing: {quiz.passingScorePercentage}%
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold border ${
                secondsRemaining < 300 
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800/60 animate-pulse' 
                  : 'bg-slate-950 text-cyan-400 border-slate-800'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeFormatted}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Evaluation Result View (After Submit) */}
        {isSubmitted && submissionResult ? (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className={`p-6 rounded-2xl border text-center space-y-3 ${
              submissionResult.passed 
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
            }`}>
              <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center border-2 shadow-lg bg-slate-900">
                {submissionResult.passed ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-400" />
                )}
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {submissionResult.passed ? 'Assessment Passed! Congratulations.' : 'Assessment Not Cleared'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Evaluated under MoES Standards: Required passing threshold is {quiz.passingScorePercentage}%.
                </p>
              </div>

              <div className="flex justify-center items-center gap-6 pt-2 font-mono">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Score</span>
                  <span className="text-2xl font-bold text-white">
                    {submissionResult.score} / {submissionResult.totalPossibleMarks}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Percentage</span>
                  <span className={`text-2xl font-bold ${submissionResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {submissionResult.percentage}%
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-700" />
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Time Spent</span>
                  <span className="text-2xl font-bold text-cyan-300">
                    {submissionResult.timeSpentMinutes} min
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Explanations Breakdown */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detailed Scientific Review & Answer Explanations
              </h4>

              <div className="space-y-4">
                {quiz.questions.map((q, idx) => {
                  const userChoice = selectedAnswers[q.id];
                  const isCorrect = userChoice === q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border space-y-3 ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-800/40'
                          : 'bg-rose-950/20 border-rose-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">
                            Question {idx + 1} ({q.marks} Marks)
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                            {q.question}
                          </p>
                        </div>
                        {isCorrect ? (
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 shrink-0">
                            + {q.marks} Marks
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60 shrink-0">
                            0 Marks
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-1.5 pl-2 border-l-2 border-slate-700">
                        {q.options.map(opt => {
                          const isSelected = userChoice === opt.id;
                          const isTargetCorrect = opt.id === q.correctOptionId;

                          return (
                            <div
                              key={opt.id}
                              className={`text-xs px-3 py-1.5 rounded-lg flex items-center justify-between ${
                                isTargetCorrect
                                  ? 'bg-emerald-900/40 text-emerald-200 font-semibold border border-emerald-700/50'
                                  : isSelected && !isCorrect
                                  ? 'bg-rose-900/40 text-rose-200 border border-rose-700/50 line-through'
                                  : 'text-slate-400'
                              }`}
                            >
                              <span>{opt.text}</span>
                              {isTargetCorrect && <span className="text-[10px] text-emerald-300 font-mono">✓ Correct Answer</span>}
                              {isSelected && !isCorrect && <span className="text-[10px] text-rose-300 font-mono">✗ Your Selection</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Scientific Explanation */}
                      <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-cyan-400">Scientific Explanation: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
              >
                Close & Return to Portal
              </button>
            </div>
          </div>
        ) : (
          /* Live Examination Stepper */
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Question Navigation Bubbles */}
              <div className="flex items-center gap-1.5 flex-wrap pb-3 border-b border-slate-800">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-300'
                          : isAnswered
                          ? 'bg-emerald-600/60 text-white border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
                <span className="text-[11px] text-slate-500 ml-auto">
                  Answered: <strong className="text-white">{answeredCount}</strong> / {quiz.questions.length}
                </span>
              </div>

              {/* Current Question */}
              {currentQuestion && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold font-mono text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Weightage: {currentQuestion.marks} Marks
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
                      const optionLabel = ['A', 'B', 'C', 'D'][oIdx] || String(oIdx + 1);

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-md'
                              : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {optionLabel}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Navigation Controls Footer */}
            <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between shrink-0">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : null}

                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Final Answers ({answeredCount}/{quiz.questions.length})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
