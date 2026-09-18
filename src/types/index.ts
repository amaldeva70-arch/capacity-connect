export type UserRole = 'trainee' | 'trainer' | 'admin';

export type UserStatus = 'pending' | 'verified' | 'rejected' | 'suspended';

export type InstitutionAffiliation = 
  | 'IMD - India Meteorological Department'
  | 'MoES - Ministry of Earth Sciences HQ'
  | 'NCMRWF - National Centre for Medium Range Weather Forecasting'
  | 'INCOIS - Indian National Centre for Ocean Information Services'
  | 'IITM - Indian Institute of Tropical Meteorology, Pune'
  | 'NIOT - National Institute of Ocean Technology, Chennai'
  | 'NCPOR - National Centre for Polar and Ocean Research, Goa';

export interface AcademicQualification {
  id: string;
  degree: string;
  field: string;
  institution: string;
  yearOfCompletion: number;
  gradePercentage: string;
}

export interface WorkExperience {
  id: string;
  designation: string;
  organization: string;
  division: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Meteorology' | 'Oceanography' | 'Computing & AI' | 'Instrumentation' | 'Forecasting' | 'General';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  fileSize?: string;
  verifiedByAdmin: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  employeeId: string;
  designation: string;
  institution: InstitutionAffiliation;
  stationOrLocation: string;
  bio: string;
  interests: string[];
  skills: SkillItem[];
  qualifications: AcademicQualification[];
  experience: WorkExperience[];
  certificates: CertificateItem[];
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  registeredDate: string;
  password?: string;
}

export type MaterialType = 'video' | 'pdf' | 'presentation' | 'dataset' | 'code';

export interface StudyMaterial {
  id: string;
  title: string;
  type: MaterialType;
  fileUrl: string;
  fileSize: string;
  durationOrPages: string;
  subjectDomain: string;
  tags: string[];
  uploadedBy: string; // Trainer name
  uploadedById: string;
  uploadDate: string;
  downloadCount: number;
  description: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  marks: number;
}

export interface AssessmentQuiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingScorePercentage: number;
  deadlineDate: string;
  totalMarks: number;
  createdBy: string;
  createdById: string;
  createdDate: string;
  questions: QuizQuestion[];
  isPublished: boolean;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  quizTitle: string;
  courseId: string;
  traineeId: string;
  traineeName: string;
  institution: string;
  submittedAt: string;
  timeSpentMinutes: number;
  score: number;
  totalPossibleMarks: number;
  percentage: number;
  passed: boolean;
  selectedAnswers: Record<string, string>; // questionId -> optionId
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  transcript?: string;
  notesMarkdown?: string;
  isCompleted?: boolean;
  materials: StudyMaterial[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseFeedback {
  id: string;
  courseId: string;
  traineeId: string;
  traineeName: string;
  traineeDesignation: string;
  traineeInstitution: string;
  rating: number; // 1 to 5
  contentClarityRating: number;
  practicalApplicabilityRating: number;
  instructorDeliveryRating: number;
  comment: string;
  submittedAt: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  domain: 'Meteorology' | 'Ocean Sciences' | 'Climate Modeling' | 'Disaster Management' | 'Geosciences';
  targetAudience: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  effortHours: number;
  instructorName: string;
  instructorId: string;
  instructorDesignation: string;
  instructorInstitution: InstitutionAffiliation;
  enrolledCount: number;
  completionCount: number;
  averageRating: number;
  ratingCount: number;
  tags: string[];
  modules: CourseModule[];
  quizId?: string;
  syllabusHighlights: string[];
  prerequisites: string[];
  status: 'active' | 'archived' | 'upcoming';
}

export interface CompetencySkillTag {
  tag: string;
  domain: string;
  demandLevel: 'High' | 'Moderate' | 'Critical';
  description: string;
}

export interface TrainerCompetencyMatch {
  trainer: UserProfile;
  matchScore: number; // 0 - 100%
  matchingSkills: string[];
  otherSkills: string[];
  experienceYears: number;
  avgCourseRating: number;
  currentWorkloadCourses: number;
  recommendedRole: 'Primary Lead' | 'Subject Expert' | 'Reviewer & Mentor';
}

export type User = UserProfile;

export interface TraineeCompetencyMatch {
  id: string;
  traineeId: string;
  courseId: string;
  matchPercentage: number;
  rationale: string;
  matchingFactors: string[];
  generatedDate: string;
  status: 'recommended' | 'assigned';
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Circular' | 'Training Milestone' | 'Platform Update' | 'Workshop Notice';
  priority: 'urgent' | 'normal' | 'featured';
  issuingAuthority: string;
  publishedDate: string;
  downloadAttachmentName?: string;
  readCount: number;
  tags: string[];
}

export interface SystemStats {
  totalTrainees: number;
  totalTrainers: number;
  totalCourses: number;
  totalEnrollments: number;
  averageCompletionRate: number;
  pendingApprovals: number;
  quizzesConducted: number;
  totalMaterialsCount: number;
}
