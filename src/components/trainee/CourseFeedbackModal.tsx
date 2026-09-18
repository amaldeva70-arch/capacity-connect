import React, { useState } from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquare, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface CourseFeedbackModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseFeedbackModal: React.FC<CourseFeedbackModalProps> = ({ course, isOpen, onClose }) => {
  const { currentUser, submitCourseFeedback } = useApp();

  const [overallRating, setOverallRating] = useState(5);
  const [contentClarity, setContentClarity] = useState(5);
  const [practicalRelevance, setPracticalRelevance] = useState(5);
  const [instructorDelivery, setInstructorDelivery] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMessage('Please provide qualitative comments for the training division review.');
      return;
    }
    setErrorMessage(null);

    submitCourseFeedback({
      courseId: course.id,
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      traineeDesignation: currentUser.designation,
      traineeInstitution: currentUser.institution,
      rating: overallRating,
      contentClarityRating: contentClarity,
      practicalApplicabilityRating: practicalRelevance,
      instructorDeliveryRating: instructorDelivery,
      comment: comment.trim()
    });

    onClose();
  };

  const StarPicker: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-1 text-slate-600 hover:scale-110 transition-transform"
        >
          <Star
            className={`w-5 h-5 ${
              star <= value
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-600'
            }`}
          />
        </button>
      ))}
      <span className="text-xs font-mono font-bold text-amber-400 ml-1.5">{value} / 5</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Course Feedback & Evaluation</h3>
              <p className="text-xs text-slate-400 truncate max-w-md">{course.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Feedback submitted will be reviewed by the <strong>MoES Capacity Building Commission</strong> and <strong>IMD Training Cell</strong> to enhance curriculum delivery and trainer assignments.
            </span>
          </div>

          {errorMessage && (
            <div className="bg-rose-950/70 border border-rose-800 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Overall Rating */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-wider">
              Overall Course Rating *
            </label>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setOverallRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || overallRating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm font-bold text-amber-400 ml-2 font-mono">
                {overallRating} of 5 Stars
              </span>
            </div>
          </div>

          {/* Multi-Dimensional Criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 block">Content Clarity</span>
              <StarPicker value={contentClarity} onChange={setContentClarity} />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 block">Practical Relevance</span>
              <StarPicker value={practicalRelevance} onChange={setPracticalRelevance} />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 block">Instructor Delivery</span>
              <StarPicker value={instructorDelivery} onChange={setInstructorDelivery} />
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Qualitative Feedback & Operational Recommendations *
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="How did this training impact your operational duties? Specific feedback on modules, datasets, or radar interpretation..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Course Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
