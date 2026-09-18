import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseLesson } from '../../types';
import { QuizTakerModal } from './QuizTakerModal';
import { CourseFeedbackModal } from './CourseFeedbackModal';
import { downloadStudyMaterialDoc } from '../../utils/fileDownloader';
import { 
  Search, 
  Filter, 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Award, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  FileCheck, 
  Video, 
  Layers, 
  Building2, 
  UserCheck,
  Check,
  RotateCcw
} from 'lucide-react';

export const CoursePortal: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    quizzes, 
    submissions, 
    feedbacks, 
    enrollInCourse, 
    completeLesson 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  // Active lesson inside selected course
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [feedbackModalCourse, setFeedbackModalCourse] = useState<Course | null>(null);

  const activeCourse = courses.find(c => c.id === activeCourseId) || null;

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || course.domain === selectedDomain;
    const matchesDiff = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDiff;
  });

  const domains = ['All', 'Meteorology', 'Ocean Sciences', 'Climate Modeling', 'Geosciences'];
  const difficulties = ['All', 'Foundation', 'Intermediate', 'Advanced'];

  // Handler to select course and open default lesson
  const handleOpenCourse = (course: Course) => {
    setActiveCourseId(course.id);
    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setActiveLesson(course.modules[0].lessons[0]);
    } else {
      setActiveLesson(null);
    }
  };

  const handleLaunchQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
  };

  const activeQuiz = quizzes.find(q => q.id === activeQuizId) || null;

  // Active Course Details View
  if (activeCourse) {
    const isEnrolled = currentUser.enrolledCourseIds.includes(activeCourse.id);
    const isCompleted = currentUser.completedCourseIds.includes(activeCourse.id);
    const courseQuiz = quizzes.find(q => q.id === activeCourse.quizId || q.courseId === activeCourse.id);
    const userSubmission = submissions.find(s => s.courseId === activeCourse.id && s.traineeId === currentUser.id);
    const courseFeedbacks = feedbacks.filter(f => f.courseId === activeCourse.id);

    // Calculate completion %
    const totalLessons = activeCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const doneLessons = activeCourse.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);
    const progressPercent = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;

    return (
      <div className="space-y-6 pb-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveCourseId(null)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            ← Back to Course Catalog
          </button>

          <div className="flex items-center gap-3">
            {!isEnrolled ? (
              <button
                onClick={() => enrollInCourse(activeCourse.id)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Enroll in Course</span>
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Enrolled (Active)</span>
              </span>
            )}

            <button
              onClick={() => setFeedbackModalCourse(activeCourse)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </div>

        {/* Course Banner Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2.5 py-0.5 rounded">
              {activeCourse.code}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              {activeCourse.domain}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              Level: {activeCourse.difficulty}
            </span>
            <span className="text-xs text-amber-400 font-semibold ml-auto flex items-center gap-1">
              ★ {activeCourse.averageRating} ({activeCourse.ratingCount} evaluations)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            {activeCourse.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeCourse.fullDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Lead Trainer</span>
              <strong className="text-slate-200">{activeCourse.instructorName}</strong>
              <p className="text-[10px] text-slate-400">{activeCourse.instructorInstitution.split(' - ')[0]}</p>
            </div>
            <div>
              <span className="text-slate-500 block">Duration & Effort</span>
              <strong className="text-slate-200">{activeCourse.durationWeeks} Weeks</strong>
              <p className="text-[10px] text-slate-400">{activeCourse.effortHours} Hours total</p>
            </div>
            <div>
              <span className="text-slate-500 block">Enrolled Candidates</span>
              <strong className="text-slate-200">{activeCourse.enrolledCount} Officers</strong>
              <p className="text-[10px] text-emerald-400">{activeCourse.completionCount} Certified</p>
            </div>
            <div>
              <span className="text-slate-500 block">Your Progress</span>
              <strong className="text-cyan-300">{progressPercent}% Completed</strong>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Video Lesson Player & Lecture Notes Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Media Player & Lecture Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeLesson ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                {/* Simulated Lesson Video Player */}
                <div className="bg-slate-950 relative aspect-video flex flex-col items-center justify-center border-b border-slate-800 group">
                  {activeLesson.videoUrl ? (
                    <video
                      controls
                      src={activeLesson.videoUrl}
                      className="w-full h-full object-cover"
                      poster={activeCourse.thumbnailUrl}
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <Video className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-400">Interactive Lecture Session Ready</p>
                    </div>
                  )}
                </div>

                {/* Lesson Header & Mark Complete */}
                <div className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <h2 className="text-base font-bold text-white">
                        {activeLesson.title}
                      </h2>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        Duration: {activeLesson.durationMinutes} Minutes
                      </p>
                    </div>

                    <button
                      onClick={() => completeLesson(activeCourse.id, activeLesson.id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        activeLesson.isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{activeLesson.isCompleted ? 'Completed' : 'Mark as Completed'}</span>
                    </button>
                  </div>

                  {/* Lecture Notes */}
                  {activeLesson.notesMarkdown && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Operational Formulas & Lecture Takeaways
                      </h3>
                      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-line">
                        {activeLesson.notesMarkdown}
                      </div>
                    </div>
                  )}

                  {/* Transcript */}
                  {activeLesson.transcript && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Scientific Lecture Transcript
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                        {activeLesson.transcript}
                      </p>
                    </div>
                  )}

                  {/* Attached Downloadable Materials */}
                  {activeLesson.materials && activeLesson.materials.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Associated Study Materials & Handbooks
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeLesson.materials.map(mat => (
                          <div
                            key={mat.id}
                            className="bg-slate-950 border border-slate-800/90 rounded-xl p-3 flex items-center justify-between"
                          >
                            <div className="space-y-0.5 min-w-0 pr-2">
                              <p className="text-xs font-bold text-white truncate">{mat.title}</p>
                              <span className="text-[10px] text-slate-500 uppercase font-mono">{mat.type} · {mat.fileSize}</span>
                            </div>
                            <button
                              onClick={() => downloadStudyMaterialDoc(mat.title, activeCourse.domain, activeCourse.instructorName)}
                              className="text-cyan-400 hover:text-cyan-300 p-1.5 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                              title="Download File"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Select a lesson from the syllabus outline</p>
                <p className="text-xs text-slate-500">Choose any module lesson on the right to start training.</p>
              </div>
            )}

            {/* Trainee Feedback History for this Course */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Peer Evaluations & Trainee Feedback ({courseFeedbacks.length})
                </h3>
                <button
                  onClick={() => setFeedbackModalCourse(activeCourse)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  + Add Your Review
                </button>
              </div>

              <div className="space-y-3 divide-y divide-slate-800">
                {courseFeedbacks.map(fb => (
                  <div key={fb.id} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <strong className="text-white">{fb.traineeName}</strong>
                        <span className="text-slate-400 text-[11px]">({fb.traineeDesignation})</span>
                      </div>
                      <span className="text-amber-400 font-mono font-bold">★ {fb.rating}/5</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{fb.comment}"
                    </p>
                    <span className="text-[10px] text-slate-500 block">{fb.submittedAt}</span>
                  </div>
                ))}
                {courseFeedbacks.length === 0 && (
                  <p className="text-xs text-slate-500 py-2">No reviews recorded yet for this course.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Syllabus Navigator & MCQ Assessment Launcher */}
          <div className="space-y-6">
            {/* Assessment Status Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-cyan-400" />
                  Module Assessment
                </span>
                {userSubmission ? (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    userSubmission.passed
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                      : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                  }`}>
                    {userSubmission.passed ? 'PASSED' : 'ATTEMPTED'}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Pending
                  </span>
                )}
              </div>

              {courseQuiz ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white">{courseQuiz.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {courseQuiz.questions.length} MCQs · {courseQuiz.durationMinutes} mins · Pass Score: {courseQuiz.passingScorePercentage}%
                    </p>
                  </div>

                  {userSubmission && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Previous Score:</span>
                        <strong className="text-white">{userSubmission.score}/{userSubmission.totalPossibleMarks} ({userSubmission.percentage}%)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Attempted on:</span>
                        <span className="text-slate-300 text-[10px]">{userSubmission.submittedAt}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleLaunchQuiz(courseQuiz.id)}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Award className="w-4 h-4" />
                    <span>{userSubmission ? 'Retake MCQ Quiz' : 'Launch MCQ Quiz'}</span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No assessment quiz scheduled for this course yet.</p>
              )}
            </div>

            {/* Modules & Lessons Accordion */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                Syllabus & Lecture Outline
              </h3>

              <div className="space-y-3">
                {activeCourse.modules.map(module => (
                  <div key={module.id} className="space-y-2">
                    <div className="text-xs font-bold text-white px-2 py-1 bg-slate-800/80 rounded-md">
                      {module.title}
                    </div>

                    <div className="space-y-1 pl-2">
                      {module.lessons.map(lesson => {
                        const isCurrentLesson = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-full text-left p-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                              isCurrentLesson
                                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate pr-2">
                              <PlayCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span className="truncate">{lesson.title}</span>
                            </span>
                            {lesson.isCompleted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Highlights & Prerequisites */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Prerequisites</h4>
              <ul className="list-disc pl-4 text-slate-300 space-y-1">
                {activeCourse.prerequisites.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Active Quiz Taker Modal */}
        {activeQuiz && (
          <QuizTakerModal
            quiz={activeQuiz}
            isOpen={Boolean(activeQuizId)}
            onClose={() => setActiveQuizId(null)}
          />
        )}

        {/* Feedback Modal */}
        {feedbackModalCourse && (
          <CourseFeedbackModal
            course={feedbackModalCourse}
            isOpen={Boolean(feedbackModalCourse)}
            onClose={() => setFeedbackModalCourse(null)}
          />
        )}
      </div>
    );
  }

  // Course Catalog Grid View
  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter Bar */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            MoES & IMD Course Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Browse specialized capacity building courses across Meteorology, Oceanography, Climate Modeling, and Geosciences.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by course title, code (e.g. MOES-MET), or skill tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
            >
              {domains.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Domains' : d}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff === 'All' ? 'All Levels' : diff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = currentUser.enrolledCourseIds.includes(course.id);
          const isCompleted = currentUser.completedCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col group"
            >
              {/* Thumbnail Header */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <span className="absolute top-3 left-3 bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {course.code}
                </span>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="bg-slate-900/90 text-slate-300 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {course.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    {course.domain}
                  </span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded">
                    ★ {course.averageRating} ({course.ratingCount})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {t}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="text-[10px] text-slate-500 px-1 py-0.5">+{course.tags.length - 3}</span>
                  )}
                </div>

                {/* Lead Instructor & Duration */}
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Lead Trainer:</span>
                    <strong className="text-slate-200">{course.instructorName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="text-slate-300">{course.durationWeeks} Weeks ({course.effortHours}h)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenCourse(course)}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {!isEnrolled ? (
                    <button
                      onClick={() => enrollInCourse(course.id)}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Enroll
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-bold px-2 py-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Enrolled
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
