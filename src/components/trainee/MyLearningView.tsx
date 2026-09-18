import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { CertificateModal } from '../common/CertificateModal';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  FileCheck,
  TrendingUp,
  Printer
} from 'lucide-react';

interface MyLearningViewProps {
  onOpenCourseCatalog: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({ onOpenCourseCatalog, onSelectCourse }) => {
  const { currentUser, courses, submissions } = useApp();
  const [certModalData, setCertModalData] = useState<{
    title: string;
    recipientName: string;
    employeeId: string;
    designation: string;
    institution: string;
    issuingAuthority: string;
    issueDate: string;
    gradeOrScore?: string;
  } | null>(null);

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));
  const completedCourses = courses.filter(c => currentUser.completedCourseIds.includes(c.id));
  const userSubmissions = submissions.filter(s => s.traineeId === currentUser.id);

  const handleOpenCert = (course: Course) => {
    const sub = userSubmissions.find(s => s.courseId === course.id);
    setCertModalData({
      title: course.title,
      recipientName: currentUser.name,
      employeeId: currentUser.employeeId,
      designation: currentUser.designation,
      institution: currentUser.institution,
      issuingAuthority: 'Ministry of Earth Sciences (MoES) & IMD Central Training Institute',
      issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      gradeOrScore: sub ? `${sub.percentage}% (Grade A)` : 'Passed (Distinction)'
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            My Active Training & Coursework
          </h2>
          <p className="text-xs text-slate-400">
            Track your ongoing curriculums, lesson progress, and official examination clearances.
          </p>
        </div>

        <button
          onClick={onOpenCourseCatalog}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Browse All Available Courses</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Enrolled Programs</span>
          <p className="text-2xl font-bold text-white mt-1">{enrolledCourses.length}</p>
          <span className="text-[10px] text-cyan-400">Active engagement</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Certified Completed</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{completedCourses.length}</p>
          <span className="text-[10px] text-slate-500">Credentials awarded</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Assessments Cleared</span>
          <p className="text-2xl font-bold text-white mt-1">
            {userSubmissions.filter(s => s.passed).length} / {userSubmissions.length}
          </p>
          <span className="text-[10px] text-emerald-400">Pass threshold: 70%</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Competency Level</span>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            Level 2
          </p>
          <span className="text-[10px] text-slate-500">WMO-BIP-MT Standard</span>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Ongoing Enrolled Curriculums</h3>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrolledCourses.map(course => {
              const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
              const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);
              const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
              const sub = userSubmissions.find(s => s.courseId === course.id);

              return (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-400">{course.domain}</span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {course.shortDescription}
                    </p>

                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Syllabus Completion:</span>
                        <strong className="text-cyan-300">{percent}% ({completedLessons}/{totalLessons} Lessons)</strong>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      {sub ? (
                        <span className={`font-bold ${sub.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                          Quiz: {sub.percentage}% ({sub.passed ? 'Passed' : 'Pending'})
                        </span>
                      ) : (
                        <span className="text-slate-500">Quiz not attempted yet</span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectCourse(course.id)}
                      className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>Resume Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-white">No Courses Enrolled Currently</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Explore the MoES course catalog to enroll in specialized meteorology and oceanography programs.
            </p>
            <button
              onClick={onOpenCourseCatalog}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
            >
              Explore Course Catalog
            </button>
          </div>
        )}
      </div>

      {/* Completed Courses & Verified Credentials */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Awarded Institutional Certificates ({completedCourses.length})
            </h3>
            <p className="text-xs text-slate-400">
              Official certificates awarded upon completion of curriculum hours and passing mark thresholds.
            </p>
          </div>
        </div>

        {completedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedCourses.map(course => (
              <div
                key={course.id}
                className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 flex items-start justify-between gap-3 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Certified
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">{course.title}</h4>
                  <p className="text-xs text-slate-400">
                    Faculty: {course.instructorName} ({course.instructorInstitution.split('-')[0]})
                  </p>
                </div>

                <button
                  onClick={() => handleOpenCert(course)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View / Print</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center border border-dashed border-slate-800 rounded-xl">
            <Award className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Complete an enrolled course and pass the quiz to earn an official certificate.</p>
          </div>
        )}
      </div>

      {/* Assessment Submissions Record */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-cyan-400" />
          Official Examination & Quiz Records
        </h3>

        <div className="space-y-3">
          {userSubmissions.map(sub => (
            <div
              key={sub.id}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <p className="font-bold text-white">{sub.quizTitle}</p>
                <span className="text-[10px] text-slate-500">Attempted: {sub.submittedAt} · Time: {sub.timeSpentMinutes} mins</span>
              </div>

              <div className="text-right">
                <span className={`font-mono font-bold text-sm ${sub.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sub.score} / {sub.totalPossibleMarks} ({sub.percentage}%)
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-500">
                  {sub.passed ? 'Status: Cleared' : 'Status: Failed'}
                </span>
              </div>
            </div>
          ))}
          {userSubmissions.length === 0 && (
            <p className="text-xs text-slate-500 py-3 text-center italic">No examination records logged yet.</p>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {certModalData && (
        <CertificateModal
          isOpen={true}
          onClose={() => setCertModalData(null)}
          certificate={certModalData}
        />
      )}
    </div>
  );
};
