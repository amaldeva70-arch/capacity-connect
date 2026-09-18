import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssessmentQuiz, QuizQuestion } from '../../types';
import { 
  FileCheck, 
  Plus, 
  Trash2, 
  X, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface AssessmentCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssessmentCreatorModal: React.FC<AssessmentCreatorModalProps> = ({ isOpen, onClose }) => {
  const { courses, currentUser, createQuiz } = useApp();

  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [passingScorePercentage, setPassingScorePercentage] = useState(70);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deadlineDate, setDeadlineDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q-new-1',
      question: 'What is the minimum radar reflectivity factor threshold commonly indicative of deep convective hail shafts?',
      options: [
        { id: 'opt-1', text: 'Z > 35 dBZ' },
        { id: 'opt-2', text: 'Z > 55 dBZ' },
        { id: 'opt-3', text: 'Z > 15 dBZ' },
        { id: 'opt-4', text: 'Z > 75 dBZ' }
      ],
      correctOptionId: 'opt-2',
      explanation: 'Reflectivities exceeding 55 dBZ aloft in dual-polarization radar signatures strongly indicate large hydrometeors and hail cores.',
      marks: 2
    }
  ]);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    const newQId = `q-new-${Date.now()}`;
    setQuestions(prev => [
      ...prev,
      {
        id: newQId,
        question: '',
        options: [
          { id: `${newQId}-opt-1`, text: '' },
          { id: `${newQId}-opt-2`, text: '' },
          { id: `${newQId}-opt-3`, text: '' },
          { id: `${newQId}-opt-4`, text: '' }
        ],
        correctOptionId: `${newQId}-opt-1`,
        explanation: '',
        marks: 2
      }
    ]);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter((_, idx) => idx !== qIndex));
  };

  const handleQuestionTextChange = (qIndex: number, text: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIndex].question = text;
      return copy;
    });
  };

  const handleOptionTextChange = (qIndex: number, optIndex: number, text: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIndex].options[optIndex].text = text;
      return copy;
    });
  };

  const handleSelectCorrectOption = (qIndex: number, optId: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIndex].correctOptionId = optId;
      return copy;
    });
  };

  const handleExplanationChange = (qIndex: number, exp: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIndex].explanation = exp;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please enter an Assessment / Quiz Title.');
      return;
    }
    setErrorMessage(null);

    const selectedCourse = courses.find(c => c.id === courseId);
    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    createQuiz({
      courseId,
      courseTitle: selectedCourse ? selectedCourse.title : 'MoES Specialized Training',
      title: title.trim(),
      description: `Official subject-wise assessment for ${selectedCourse ? selectedCourse.title : 'MoES Course'}. Minimum passing score is ${passingScorePercentage}%.`,
      durationMinutes,
      passingScorePercentage,
      totalMarks,
      deadlineDate,
      questions,
      isPublished: true
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Build MCQ Assessment Quiz</h3>
              <p className="text-xs text-slate-400">Configure timed deadlines and automated evaluation rules</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="bg-rose-950/70 border border-rose-800 text-rose-300 px-4 py-2.5 rounded-xl text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Metadata Grid */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Associated Course *</label>
                <select
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      [{c.code}] {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assessment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-Term Evaluation: Doppler Radar & Nowcasting"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={durationMinutes}
                  onChange={e => setDurationMinutes(parseInt(e.target.value) || 20)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Passing Threshold (%)</label>
                <input
                  type="number"
                  min="40"
                  max="100"
                  value={passingScorePercentage}
                  onChange={e => setPassingScorePercentage(parseInt(e.target.value) || 70)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Evaluation Deadline</label>
                <input
                  type="date"
                  required
                  value={deadlineDate}
                  onChange={e => setDeadlineDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Question List Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                Questions Configuration ({questions.length})
              </h4>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={q.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    Question #{qIndex + 1}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">
                      Weight: {q.marks} Marks
                    </span>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter the scientific question stem or scenario..."
                    value={q.question}
                    onChange={e => handleQuestionTextChange(qIndex, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 4 Options */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    Define Options (Click the radio button to designate the correct answer):
                  </span>

                  {q.options.map((opt, optIndex) => {
                    const isChecked = q.correctOptionId === opt.id;
                    const optLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <div key={opt.id} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectCorrectOption(qIndex, opt.id)}
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                          title="Set as correct answer"
                        >
                          {optLetters[optIndex]}
                        </button>
                        <input
                          type="text"
                          required
                          placeholder={`Option ${optLetters[optIndex]} text...`}
                          value={opt.text}
                          onChange={e => handleOptionTextChange(qIndex, optIndex, e.target.value)}
                          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        {isChecked && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            ✓ Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Scientific Explanation */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Scientific Explanation / Reference to Standard Manuals:
                  </label>
                  <input
                    type="text"
                    placeholder="Explanation displayed to trainees during answer debrief..."
                    value={q.explanation}
                    onChange={e => handleExplanationChange(qIndex, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Assessment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
