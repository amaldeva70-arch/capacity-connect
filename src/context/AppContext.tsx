import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  UserStatus,
  TraineeCompetencyMatch,
  Course,
  StudyMaterial,
  AssessmentQuiz,
  QuizSubmission,
  CourseFeedback,
  Announcement,
  AcademicQualification,
  WorkExperience,
  SkillItem,
  CertificateItem,
  SystemStats
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_QUIZZES,
  INITIAL_QUIZ_SUBMISSIONS,
  INITIAL_FEEDBACK,
  INITIAL_ANNOUNCEMENTS
} from '../data/mockData';

interface AppContextType {
  // Authentication & Role
  currentUser: UserProfile;
  currentRole: UserRole;
  users: UserProfile[];
  allUsers: UserProfile[];
  switchUser: (userId: string) => void;
  switchRole: (role: UserRole) => void;
  login: (email: string, password: string) => { success: boolean; message: string; user?: UserProfile };
  logout: () => void;
  registerUser: (userData: Partial<UserProfile>) => void;
  
  // Trainee Actions
  updateTraineeProfile: (profileData: Partial<UserProfile>) => void;
  addQualification: (qual: Omit<AcademicQualification, 'id'>) => void;
  removeQualification: (id: string) => void;
  addExperience: (exp: Omit<WorkExperience, 'id'>) => void;
  removeExperience: (id: string) => void;
  addSkill: (skill: Omit<SkillItem, 'id' | 'verified'>) => void;
  removeSkill: (id: string) => void;
  uploadCertificate: (cert: Omit<CertificateItem, 'id' | 'verifiedByAdmin'>) => void;
  removeCertificate: (id: string) => void;
  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitQuizAttempt: (submission: Omit<QuizSubmission, 'id' | 'submittedAt'>) => QuizSubmission;
  submitCourseFeedback: (feedback: Omit<CourseFeedback, 'id' | 'submittedAt'>) => void;

  // Trainer Actions
  courses: Course[];
  studyMaterials: StudyMaterial[];
  quizzes: AssessmentQuiz[];
  submissions: QuizSubmission[];
  feedbacks: CourseFeedback[];
  addStudyMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadCount' | 'uploadedBy' | 'uploadedById'>) => void;
  deleteStudyMaterial: (id: string) => void;
  createAssessmentQuiz: (quiz: Omit<AssessmentQuiz, 'id' | 'createdDate' | 'createdBy' | 'createdById'>) => void;
  createQuiz: (quiz: Omit<AssessmentQuiz, 'id' | 'createdDate' | 'createdBy' | 'createdById'>) => void;
  deleteQuiz: (quizId: string) => void;

  // Admin Actions
  verifyUser: (userId: string, newStatus?: 'verified' | 'rejected') => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  updateUserStatus: (userId: string, newStatus: UserStatus) => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedDate' | 'readCount'>) => void;
  deleteAnnouncement: (id: string) => void;
  assignTrainerToCourse: (courseId: string, trainerId: string) => void;

  // Competency Recommender Engine
  competencyMatches: TraineeCompetencyMatch[];
  assignCompetencyRecommendation: (matchId: string) => void;

  // System Stats
  stats: SystemStats;
  
  // UI Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'capacity_connect_users_v2',
  COURSES: 'capacity_connect_courses_v2',
  MATERIALS: 'capacity_connect_materials_v2',
  QUIZZES: 'capacity_connect_quizzes_v2',
  SUBMISSIONS: 'capacity_connect_submissions_v2',
  FEEDBACK: 'capacity_connect_feedback_v2',
  ANNOUNCEMENTS: 'capacity_connect_announcements_v2',
  CURRENT_USER_ID: 'capacity_connect_current_user_id_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or defaults
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      // Default to Administrator role
      if (!saved || saved === 'usr-trainee-01') {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, 'usr-admin-01');
        return 'usr-admin-01';
      }
      return saved;
    } catch {
      return 'usr-admin-01';
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      return saved ? JSON.parse(saved) : INITIAL_STUDY_MATERIALS;
    } catch {
      return INITIAL_STUDY_MATERIALS;
    }
  });

  const [quizzes, setQuizzes] = useState<AssessmentQuiz[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
    } catch {
      return INITIAL_QUIZZES;
    }
  });

  const [submissions, setSubmissions] = useState<QuizSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      return saved ? JSON.parse(saved) : INITIAL_QUIZ_SUBMISSIONS;
    } catch {
      return INITIAL_QUIZ_SUBMISSIONS;
    }
  });

  const [feedbacks, setFeedbacks] = useState<CourseFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
    } catch {
      return INITIAL_FEEDBACK;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(studyMaterials));
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  const currentRole = currentUser.role;

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      showToast(`Switched active user to ${target.name} (${target.role.toUpperCase()})`);
    }
  };

  const switchRole = (role: UserRole) => {
    const candidate = users.find(u => u.role === role);
    if (candidate) {
      setCurrentUserId(candidate.id);
      showToast(`Switched workspace role to: ${role.toUpperCase()} (${candidate.name})`);
    }
  };

  const login = (email: string, password: string): { success: boolean; message: string; user?: UserProfile } => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return { success: false, message: 'No registered personnel record found for this email address.' };
    }

    if (foundUser.password && foundUser.password !== password.trim()) {
      return { success: false, message: 'Invalid password. Please verify institutional credentials.' };
    }

    setCurrentUserId(foundUser.id);
    showToast(`Logged in successfully: Welcome, ${foundUser.name} (${foundUser.role.toUpperCase()})`);
    return { success: true, message: 'Authentication successful', user: foundUser };
  };

  const logout = () => {
    const adminUser = users.find(u => u.role === 'admin') || users[0];
    if (adminUser) {
      setCurrentUserId(adminUser.id);
      showToast('Logged out of officer session. Switched to MoES Admin Portal.');
    }
  };

  const registerUser = (userData: Partial<UserProfile>) => {
    const newId = `usr-${Date.now()}`;
    const newUser: UserProfile = {
      id: newId,
      name: userData.name || 'New Officer',
      email: userData.email || 'officer@imd.gov.in',
      phone: userData.phone || '+91 99999 00000',
      role: userData.role || 'trainee',
      status: 'pending', // Requires admin verification
      password: userData.password || 'moes@123',
      employeeId: userData.employeeId || `MOES-${Math.floor(1000 + Math.random() * 9000)}`,
      designation: userData.designation || 'Scientific Assistant',
      institution: userData.institution || 'IMD - India Meteorological Department',
      stationOrLocation: userData.stationOrLocation || 'Mausam Bhawan, New Delhi',
      bio: userData.bio || 'Registered for capacity building programs.',
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 90000000000)}?w=150&auto=format&fit=crop&q=80`,
      interests: userData.interests || ['Meteorology'],
      skills: [],
      qualifications: [],
      experience: [],
      certificates: [],
      enrolledCourseIds: [],
      completedCourseIds: [],
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newId);
    showToast(`Account registered successfully for ${newUser.name}. Pending Admin Verification.`);
  };

  // Trainee Profile modifications
  const updateTraineeProfile = (profileData: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? { ...u, ...profileData } : u)));
    showToast('Profile details updated successfully');
  };

  const addQualification = (qual: Omit<AcademicQualification, 'id'>) => {
    const newQual: AcademicQualification = {
      id: `q-${Date.now()}`,
      ...qual
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          qualifications: [newQual, ...u.qualifications]
        };
      }
      return u;
    }));
    showToast('Academic qualification added to profile repository');
  };

  const removeQualification = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          qualifications: u.qualifications.filter(q => q.id !== id)
        };
      }
      return u;
    }));
    showToast('Academic qualification removed');
  };

  const addExperience = (exp: Omit<WorkExperience, 'id'>) => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      ...exp
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          experience: [newExp, ...u.experience]
        };
      }
      return u;
    }));
    showToast('Work experience record added');
  };

  const removeExperience = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          experience: u.experience.filter(e => e.id !== id)
        };
      }
      return u;
    }));
    showToast('Work experience record removed');
  };

  const addSkill = (skill: Omit<SkillItem, 'id' | 'verified'>) => {
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      ...skill,
      verified: false
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          skills: [...u.skills, newSkill]
        };
      }
      return u;
    }));
    showToast(`Skill "${skill.name}" added to competency repository`);
  };

  const removeSkill = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          skills: u.skills.filter(s => s.id !== id)
        };
      }
      return u;
    }));
    showToast('Skill tag removed from repository');
  };

  const uploadCertificate = (cert: Omit<CertificateItem, 'id' | 'verifiedByAdmin'>) => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      ...cert,
      verifiedByAdmin: false
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          certificates: [newCert, ...u.certificates]
        };
      }
      return u;
    }));
    showToast(`Certificate "${cert.title}" uploaded for validation`);
  };

  const removeCertificate = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          certificates: u.certificates.filter(c => c.id !== id)
        };
      }
      return u;
    }));
    showToast('Certificate removed');
  };

  const enrollInCourse = (courseId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        if (u.enrolledCourseIds.includes(courseId)) return u;
        return {
          ...u,
          enrolledCourseIds: [...u.enrolledCourseIds, courseId]
        };
      }
      return u;
    }));

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolledCount: c.enrolledCount + 1 };
      }
      return c;
    }));

    showToast('Successfully enrolled in training course');
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;
      const updatedModules = course.modules.map(mod => ({
        ...mod,
        lessons: mod.lessons.map(les => les.id === lessonId ? { ...les, isCompleted: true } : les)
      }));

      // Check if all lessons completed
      const allDone = updatedModules.every(m => m.lessons.every(l => l.isCompleted));
      if (allDone) {
        setUsers(uPrev => uPrev.map(u => {
          if (u.id === currentUser.id && !u.completedCourseIds.includes(courseId)) {
            return {
              ...u,
              completedCourseIds: [...u.completedCourseIds, courseId]
            };
          }
          return u;
        }));
      }

      return {
        ...course,
        modules: updatedModules,
        completionCount: allDone ? course.completionCount + 1 : course.completionCount
      };
    }));
    showToast('Lesson marked as completed');
  };

  const submitQuizAttempt = (submissionData: Omit<QuizSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: QuizSubmission = {
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      ...submissionData
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    if (newSubmission.passed) {
      setUsers(uPrev => uPrev.map(u => {
        if (u.id === currentUser.id && !u.completedCourseIds.includes(newSubmission.courseId)) {
          return {
            ...u,
            completedCourseIds: [...u.completedCourseIds, newSubmission.courseId]
          };
        }
        return u;
      }));
    }

    showToast(`Quiz completed! Score: ${newSubmission.score}/${newSubmission.totalPossibleMarks} (${newSubmission.percentage}%) - ${newSubmission.passed ? 'PASSED' : 'FAILED'}`);
    return newSubmission;
  };

  const submitCourseFeedback = (feedbackData: Omit<CourseFeedback, 'id' | 'submittedAt'>) => {
    const newFeedback: CourseFeedback = {
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      ...feedbackData
    };

    setFeedbacks(prev => [newFeedback, ...prev]);

    // Recalculate course average rating
    setCourses(prev => prev.map(c => {
      if (c.id === feedbackData.courseId) {
        const existingCount = c.ratingCount || 1;
        const newAverage = ((c.averageRating * existingCount) + feedbackData.rating) / (existingCount + 1);
        return {
          ...c,
          averageRating: parseFloat(newAverage.toFixed(1)),
          ratingCount: existingCount + 1
        };
      }
      return c;
    }));

    showToast('Thank you! Your course evaluation & feedback has been recorded.');
  };

  // Trainer Content Management
  const addStudyMaterial = (mat: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadCount' | 'uploadedBy' | 'uploadedById'>) => {
    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      uploadedBy: currentUser.name,
      uploadedById: currentUser.id,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      ...mat
    };
    setStudyMaterials(prev => [newMat, ...prev]);
    showToast(`Material "${newMat.title}" uploaded to Subject Library`);
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
    showToast('Study material removed from repository');
  };

  const createAssessmentQuiz = (quizData: Omit<AssessmentQuiz, 'id' | 'createdDate' | 'createdBy' | 'createdById'>) => {
    const newQuiz: AssessmentQuiz = {
      id: `quiz-${Date.now()}`,
      createdBy: currentUser.name,
      createdById: currentUser.id,
      createdDate: new Date().toISOString().split('T')[0],
      ...quizData
    };

    setQuizzes(prev => [newQuiz, ...prev]);

    // Link quiz to course
    setCourses(prev => prev.map(c => {
      if (c.id === quizData.courseId) {
        return { ...c, quizId: newQuiz.id };
      }
      return c;
    }));

    showToast(`Assessment Quiz "${newQuiz.title}" created with ${newQuiz.questions.length} questions.`);
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
    setCourses(prev => prev.map(c => c.quizId === quizId ? { ...c, quizId: undefined } : c));
    showToast('Assessment quiz removed');
  };

  // Competency Matches Engine State
  const [competencyMatches, setCompetencyMatches] = useState<TraineeCompetencyMatch[]>([
    {
      id: 'cm-1',
      traineeId: 'usr-trainee-01',
      courseId: 'course-dwr-301',
      matchPercentage: 94,
      rationale: 'Stationed at RMC Pune Doppler Radar cell; meets prerequisite in Synoptic Chart Analysis; fulfills Dual-Polarization competency quota.',
      matchingFactors: ['Prerequisite Cleared', 'Station Assignment Match', 'Skill Gap in Dual-Pol Algorithms'],
      generatedDate: '2025-02-10',
      status: 'recommended'
    },
    {
      id: 'cm-2',
      traineeId: 'usr-trainee-02',
      courseId: 'course-argo-204',
      matchPercentage: 91,
      rationale: 'INCOIS Ocean Buoy telemetry assignment aligns directly with Global Argo Array data assimilation modules.',
      matchingFactors: ['Cadre Alignment (INCOIS)', 'High Academic Performance (86%)', 'Mission Priority Track'],
      generatedDate: '2025-02-12',
      status: 'recommended'
    },
    {
      id: 'cm-3',
      traineeId: 'usr-trainee-01',
      courseId: 'course-nwp-402',
      matchPercentage: 88,
      rationale: 'Strong numerical background in M.Sc. Atmospheric Physics; satisfies high-resolution WRF modeling criteria.',
      matchingFactors: ['Academic Alignment', 'Intermediate Python Skill', 'NWP Core Competency Requirement'],
      generatedDate: '2025-02-14',
      status: 'recommended'
    }
  ]);

  const assignCompetencyRecommendation = (matchId: string) => {
    setCompetencyMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: 'assigned' } : m));
    showToast('Official training nomination dispatched to trainee and institutional nodal officer');
  };

  const updateUserStatus = (userId: string, newStatus: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    showToast(`Officer account status set to ${newStatus.toUpperCase()}`);
  };

  // Admin Actions
  const verifyUser = (userId: string, newStatus: 'verified' | 'rejected' = 'verified') => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status: newStatus
        };
      }
      return u;
    }));
    showToast(`User verification status updated to: ${newStatus.toUpperCase()}`);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    }));
    showToast(`User role updated to ${newRole.toUpperCase()}`);
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'publishedDate' | 'readCount'>) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
      readCount: 1,
      ...ann,
      tags: ann.tags || ['Circular', 'MoES']
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Official circular / announcement published');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    showToast('Announcement removed');
  };

  const assignTrainerToCourse = (courseId: string, trainerId: string) => {
    const trainer = users.find(u => u.id === trainerId);
    if (!trainer) return;

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          instructorName: trainer.name,
          instructorId: trainer.id,
          instructorDesignation: trainer.designation,
          instructorInstitution: trainer.institution
        };
      }
      return c;
    }));
    showToast(`Assigned ${trainer.name} as Lead Trainer for selected course`);
  };

  // System Stats calculation
  const totalTrainees = users.filter(u => u.role === 'trainee').length;
  const totalTrainers = users.filter(u => u.role === 'trainer').length;
  const pendingApprovals = users.filter(u => u.status === 'pending').length;
  const totalEnrollments = courses.reduce((acc, c) => acc + c.enrolledCount, 0);
  const totalCompletions = courses.reduce((acc, c) => acc + c.completionCount, 0);
  const averageCompletionRate = totalEnrollments > 0 ? Math.round((totalCompletions / totalEnrollments) * 100) : 62;

  const stats: SystemStats = {
    totalTrainees,
    totalTrainers,
    totalCourses: courses.length,
    totalEnrollments,
    averageCompletionRate,
    pendingApprovals,
    quizzesConducted: submissions.length,
    totalMaterialsCount: studyMaterials.length
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        users,
        allUsers: users,
        switchUser,
        switchRole,
        login,
        logout,
        registerUser,
        updateTraineeProfile,
        addQualification,
        removeQualification,
        addExperience,
        removeExperience,
        addSkill,
        removeSkill,
        uploadCertificate,
        removeCertificate,
        enrollInCourse,
        completeLesson,
        submitQuizAttempt,
        submitCourseFeedback,
        courses,
        studyMaterials,
        quizzes,
        submissions,
        feedbacks,
        addStudyMaterial,
        deleteStudyMaterial,
        createAssessmentQuiz,
        createQuiz: createAssessmentQuiz,
        deleteQuiz,
        verifyUser,
        updateUserRole,
        updateUserStatus,
        competencyMatches,
        assignCompetencyRecommendation,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        assignTrainerToCourse,
        stats,
        toastMessage,
        showToast,
        clearToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
