/**
 * CAPACITY CONNECT - Database Schema Specifications
 * Ministry of Earth Sciences (MoES) & India Meteorological Department (IMD)
 * 
 * Enterprise Relational & Document Schema Definition
 * Target RDBMS: PostgreSQL 16+ / CockroachDB / Cloud SQL
 */

export interface SchemaEntity {
  name: string;
  tableName: string;
  description: string;
  fields: {
    name: string;
    type: string;
    constraints: string;
    description: string;
  }[];
  indices: string[];
  relationships: string[];
}

export const SCHEMA_ENTITIES: SchemaEntity[] = [
  {
    name: 'User & Auth Account',
    tableName: 'cc_users',
    description: 'Stores core authentication and role credentials for MoES & IMD personnel.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Unique user identifier' },
      { name: 'employee_id', type: 'VARCHAR(32)', constraints: 'UNIQUE NOT NULL', description: 'MoES/IMD official payroll or cadet ID' },
      { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE NOT NULL', description: 'Institutional gov.in email address' },
      { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Bcrypt salted hash' },
      { name: 'role', type: 'ENUM', constraints: "'trainee' | 'trainer' | 'admin' NOT NULL", description: 'Role-based access role' },
      { name: 'status', type: 'ENUM', constraints: "'pending' | 'verified' | 'rejected' | 'suspended'", description: 'Admin approval workflow state' },
      { name: 'institution', type: 'VARCHAR(128)', constraints: 'NOT NULL', description: 'Affiliated institution (IMD, NCMRWF, INCOIS, IITM, NIOT)' },
      { name: 'station_location', type: 'VARCHAR(128)', constraints: 'NOT NULL', description: 'Meteorological centre or observatory station' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Account creation timestamp' },
      { name: 'verified_at', type: 'TIMESTAMPTZ', constraints: 'NULL', description: 'Admin approval timestamp' },
      { name: 'verified_by', type: 'UUID', constraints: 'REFERENCES cc_users(id)', description: 'Admin who approved the credential' }
    ],
    indices: [
      'CREATE INDEX idx_users_role_status ON cc_users(role, status);',
      'CREATE INDEX idx_users_institution ON cc_users(institution);'
    ],
    relationships: [
      'One-to-One with cc_profiles',
      'One-to-Many with cc_enrollments',
      'One-to-Many with cc_quiz_submissions',
      'One-to-Many with cc_trainer_materials'
    ]
  },
  {
    name: 'Trainee & Trainer Profile',
    tableName: 'cc_profiles',
    description: 'Extended professional profile, academic qualifications, and interest tags.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Profile ID' },
      { name: 'user_id', type: 'UUID', constraints: 'UNIQUE REFERENCES cc_users(id) ON DELETE CASCADE', description: 'Foreign key to User' },
      { name: 'full_name', type: 'VARCHAR(160)', constraints: 'NOT NULL', description: 'Official name as per service record' },
      { name: 'designation', type: 'VARCHAR(120)', constraints: 'NOT NULL', description: 'Current designation (e.g. Meteorologist-B, Scientist-E)' },
      { name: 'phone_number', type: 'VARCHAR(20)', constraints: 'NULL', description: 'Official contact mobile number' },
      { name: 'bio', type: 'TEXT', constraints: 'NULL', description: 'Short professional overview and operational duties' },
      { name: 'interest_tags', type: 'TEXT[]', constraints: "DEFAULT '{}'", description: 'Scientific domain interest tags' },
      { name: 'academic_qualifications', type: 'JSONB', constraints: "DEFAULT '[]'", description: 'List of degree, field, college, year, %' },
      { name: 'work_experience', type: 'JSONB', constraints: "DEFAULT '[]'", description: 'Past postings, divisions, and meteorological tenures' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Last profile update timestamp' }
    ],
    indices: [
      'CREATE INDEX idx_profiles_user_id ON cc_profiles(user_id);',
      'CREATE INDEX idx_profiles_tags_gin ON cc_profiles USING GIN(interest_tags);'
    ],
    relationships: [
      'One-to-One with cc_users',
      'One-to-Many with cc_skills',
      'One-to-Many with cc_certificates'
    ]
  },
  {
    name: 'Competency Skill Repository',
    tableName: 'cc_skills',
    description: 'Repository of specific competency skills for mapping and trainer matching.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Skill record ID' },
      { name: 'user_id', type: 'UUID', constraints: 'REFERENCES cc_users(id) ON DELETE CASCADE', description: 'User possessing the skill' },
      { name: 'skill_name', type: 'VARCHAR(100)', constraints: 'NOT NULL', description: 'Skill name (e.g., Doppler Radar, WRF Model, Tsunami Warning)' },
      { name: 'category', type: 'VARCHAR(50)', constraints: 'NOT NULL', description: 'Domain: Meteorology, Computing, Ocean, Forecasting' },
      { name: 'proficiency', type: 'ENUM', constraints: "'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'", description: 'Self-assessed or certified level' },
      { name: 'is_verified', type: 'BOOLEAN', constraints: 'DEFAULT FALSE', description: 'Verified by MoES Competency Assessment Board' },
      { name: 'verified_date', type: 'DATE', constraints: 'NULL', description: 'Verification date' }
    ],
    indices: [
      'CREATE INDEX idx_skills_name ON cc_skills(skill_name);',
      'CREATE INDEX idx_skills_user_category ON cc_skills(user_id, category);'
    ],
    relationships: [
      'Many-to-One with cc_users',
      'Used by Competency Mapping Matching Engine'
    ]
  },
  {
    name: 'Course Catalog & Syllabus',
    tableName: 'cc_courses',
    description: 'Master courses in atmospheric, oceanographic, and climate sciences.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Course unique ID' },
      { name: 'course_code', type: 'VARCHAR(32)', constraints: 'UNIQUE NOT NULL', description: 'Official code (e.g. MOES-MET-204)' },
      { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Course title' },
      { name: 'domain', type: 'VARCHAR(64)', constraints: 'NOT NULL', description: 'Meteorology, Ocean Sciences, Climate, Disaster Mgmt' },
      { name: 'difficulty_level', type: 'VARCHAR(32)', constraints: 'NOT NULL', description: 'Foundation, Intermediate, Advanced' },
      { name: 'lead_instructor_id', type: 'UUID', constraints: 'REFERENCES cc_users(id)', description: 'Lead Trainer user ID' },
      { name: 'duration_weeks', type: 'INT', constraints: 'NOT NULL DEFAULT 4', description: 'Estimated syllabus duration' },
      { name: 'effort_hours', type: 'INT', constraints: 'NOT NULL DEFAULT 20', description: 'Total study effort hours' },
      { name: 'status', type: 'VARCHAR(20)', constraints: "DEFAULT 'active'", description: 'active, archived, upcoming' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Creation timestamp' }
    ],
    indices: [
      'CREATE INDEX idx_courses_domain ON cc_courses(domain);',
      'CREATE INDEX idx_courses_instructor ON cc_courses(lead_instructor_id);'
    ],
    relationships: [
      'One-to-Many with cc_modules',
      'One-to-Many with cc_enrollments',
      'One-to-Many with cc_course_feedback',
      'One-to-One / Many with cc_quizzes'
    ]
  },
  {
    name: 'Study Materials Library',
    tableName: 'cc_study_materials',
    description: 'Digital resources uploaded by Trainers (Videos, Presentations, Docs, Datasets).',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Material asset ID' },
      { name: 'course_id', type: 'UUID', constraints: 'NULL REFERENCES cc_courses(id) ON DELETE SET NULL', description: 'Associated course' },
      { name: 'trainer_id', type: 'UUID', constraints: 'REFERENCES cc_users(id)', description: 'Uploader Trainer' },
      { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Asset title' },
      { name: 'material_type', type: 'VARCHAR(32)', constraints: "'video' | 'pdf' | 'presentation' | 'dataset'", description: 'MIME category' },
      { name: 'file_storage_url', type: 'VARCHAR(512)', constraints: 'NOT NULL', description: 'Secured Cloud Storage URL' },
      { name: 'file_size_bytes', type: 'BIGINT', constraints: 'NOT NULL', description: 'File size in bytes' },
      { name: 'subject_domain', type: 'VARCHAR(64)', constraints: 'NOT NULL', description: 'MoES scientific category' },
      { name: 'tags', type: 'TEXT[]', constraints: "DEFAULT '{}'", description: 'Search and competency tags' },
      { name: 'download_count', type: 'INT', constraints: 'DEFAULT 0', description: 'Total trainee downloads' },
      { name: 'uploaded_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Upload timestamp' }
    ],
    indices: [
      'CREATE INDEX idx_materials_type ON cc_study_materials(material_type);',
      'CREATE INDEX idx_materials_domain ON cc_study_materials(subject_domain);'
    ],
    relationships: [
      'Many-to-One with cc_courses',
      'Many-to-One with cc_users (Trainer)'
    ]
  },
  {
    name: 'Assessments & MCQ Quizzes',
    tableName: 'cc_quizzes',
    description: 'Timed MCQ examinations with automated evaluation rules.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Quiz ID' },
      { name: 'course_id', type: 'UUID', constraints: 'REFERENCES cc_courses(id) ON DELETE CASCADE', description: 'Associated course' },
      { name: 'creator_trainer_id', type: 'UUID', constraints: 'REFERENCES cc_users(id)', description: 'Authoring Trainer' },
      { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Quiz title' },
      { name: 'duration_minutes', type: 'INT', constraints: 'NOT NULL DEFAULT 30', description: 'Timer duration' },
      { name: 'passing_percentage', type: 'NUMERIC(5,2)', constraints: 'NOT NULL DEFAULT 60.00', description: 'Minimum pass threshold' },
      { name: 'deadline_at', type: 'TIMESTAMPTZ', constraints: 'NULL', description: 'Submission deadline' },
      { name: 'is_published', type: 'BOOLEAN', constraints: 'DEFAULT TRUE', description: 'Visible to trainees' }
    ],
    indices: [
      'CREATE INDEX idx_quizzes_course ON cc_quizzes(course_id);'
    ],
    relationships: [
      'One-to-Many with cc_quiz_questions',
      'One-to-Many with cc_quiz_submissions'
    ]
  },
  {
    name: 'Trainee Quiz Submissions',
    tableName: 'cc_quiz_submissions',
    description: 'Trainee test attempts, automated grades, and audit trail.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Submission attempt ID' },
      { name: 'quiz_id', type: 'UUID', constraints: 'REFERENCES cc_quizzes(id) ON DELETE CASCADE', description: 'Referenced quiz' },
      { name: 'trainee_id', type: 'UUID', constraints: 'REFERENCES cc_users(id) ON DELETE CASCADE', description: 'Trainee ID' },
      { name: 'score_achieved', type: 'NUMERIC(6,2)', constraints: 'NOT NULL', description: 'Evaluated marks' },
      { name: 'total_marks', type: 'NUMERIC(6,2)', constraints: 'NOT NULL', description: 'Maximum score' },
      { name: 'percentage', type: 'NUMERIC(5,2)', constraints: 'NOT NULL', description: 'Score percentage' },
      { name: 'passed', type: 'BOOLEAN', constraints: 'NOT NULL', description: 'Pass / Fail status' },
      { name: 'time_spent_seconds', type: 'INT', constraints: 'NOT NULL', description: 'Test duration taken' },
      { name: 'answers_json', type: 'JSONB', constraints: 'NOT NULL', description: 'Selected answers map' },
      { name: 'submitted_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Submission timestamp' }
    ],
    indices: [
      'CREATE INDEX idx_submissions_trainee ON cc_quiz_submissions(trainee_id);',
      'CREATE INDEX idx_submissions_quiz ON cc_quiz_submissions(quiz_id);'
    ],
    relationships: [
      'Many-to-One with cc_quizzes',
      'Many-to-One with cc_users (Trainee)'
    ]
  },
  {
    name: 'Course Feedback & Ratings',
    tableName: 'cc_course_feedback',
    description: 'Qualitative and multi-dimensional star ratings submitted by trainees.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Feedback ID' },
      { name: 'course_id', type: 'UUID', constraints: 'REFERENCES cc_courses(id) ON DELETE CASCADE', description: 'Evaluated course' },
      { name: 'trainee_id', type: 'UUID', constraints: 'REFERENCES cc_users(id) ON DELETE CASCADE', description: 'Reviewer Trainee' },
      { name: 'overall_rating', type: 'SMALLINT', constraints: 'CHECK(overall_rating BETWEEN 1 AND 5)', description: 'Star rating 1-5' },
      { name: 'content_clarity_score', type: 'SMALLINT', constraints: 'CHECK(content_clarity_score BETWEEN 1 AND 5)', description: 'Clarity rating' },
      { name: 'practical_relevance_score', type: 'SMALLINT', constraints: 'CHECK(practical_relevance_score BETWEEN 1 AND 5)', description: 'Hands-on rating' },
      { name: 'instructor_delivery_score', type: 'SMALLINT', constraints: 'CHECK(instructor_delivery_score BETWEEN 1 AND 5)', description: 'Instructor rating' },
      { name: 'comment', type: 'TEXT', constraints: 'NOT NULL', description: 'Detailed feedback' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Feedback timestamp' }
    ],
    indices: [
      'CREATE INDEX idx_feedback_course ON cc_course_feedback(course_id);'
    ],
    relationships: [
      'Many-to-One with cc_courses',
      'Many-to-One with cc_users'
    ]
  },
  {
    name: 'Announcements & MoES Circulars',
    tableName: 'cc_announcements',
    description: 'CMS news, official circulars, achievements, and workshop notices.',
    fields: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Announcement ID' },
      { name: 'title', type: 'VARCHAR(255)', constraints: 'NOT NULL', description: 'Circular title' },
      { name: 'summary', type: 'TEXT', constraints: 'NOT NULL', description: 'Short excerpt' },
      { name: 'content', type: 'TEXT', constraints: 'NOT NULL', description: 'Full body content' },
      { name: 'category', type: 'VARCHAR(64)', constraints: 'NOT NULL', description: 'Circular, Milestone, Platform Update' },
      { name: 'priority', type: 'VARCHAR(20)', constraints: "'urgent' | 'normal' | 'featured'", description: 'Display priority' },
      { name: 'issuing_authority', type: 'VARCHAR(128)', constraints: 'NOT NULL', description: 'MoES / IMD Division' },
      { name: 'attachment_url', type: 'VARCHAR(512)', constraints: 'NULL', description: 'Signed PDF document URL' },
      { name: 'published_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Publication date' }
    ],
    indices: [
      'CREATE INDEX idx_announcements_category ON cc_announcements(category);',
      'CREATE INDEX idx_announcements_priority ON cc_announcements(priority);'
    ],
    relationships: [
      'Display on Public Portal & Trainee Dashboard'
    ]
  }
];

export const SQL_DDL_SCRIPT = `-- =============================================================================
-- CAPACITY CONNECT: Enterprise Database DDL
-- Ministry of Earth Sciences (MoES) & India Meteorological Department (IMD)
-- Target: PostgreSQL 15+ / Cloud SQL
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enumerated Types
CREATE TYPE user_role_enum AS ENUM ('trainee', 'trainer', 'admin');
CREATE TYPE user_status_enum AS ENUM ('pending', 'verified', 'rejected', 'suspended');
CREATE TYPE material_type_enum AS ENUM ('video', 'pdf', 'presentation', 'dataset', 'code');
CREATE TYPE proficiency_enum AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- 1. Master Users Table
CREATE TABLE cc_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'trainee',
    status user_status_enum NOT NULL DEFAULT 'pending',
    institution VARCHAR(128) NOT NULL,
    station_location VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES cc_users(id)
);

CREATE INDEX idx_users_role_status ON cc_users(role, status);
CREATE INDEX idx_users_institution ON cc_users(institution);

-- 2. Extended Profiles Table
CREATE TABLE cc_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES cc_users(id) ON DELETE CASCADE,
    full_name VARCHAR(160) NOT NULL,
    designation VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20),
    bio TEXT,
    interest_tags TEXT[] DEFAULT '{}',
    academic_qualifications JSONB DEFAULT '[]',
    work_experience JSONB DEFAULT '[]',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_tags_gin ON cc_profiles USING GIN(interest_tags);

-- 3. Skills Repository Table (For Competency Mapping Engine)
CREATE TABLE cc_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES cc_users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    proficiency proficiency_enum NOT NULL DEFAULT 'Intermediate',
    is_verified BOOLEAN DEFAULT FALSE,
    verified_date DATE
);

CREATE INDEX idx_skills_name ON cc_skills(skill_name);
CREATE INDEX idx_skills_user_category ON cc_skills(user_id, category);

-- 4. Course Catalog
CREATE TABLE cc_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    full_description TEXT,
    domain VARCHAR(64) NOT NULL,
    difficulty_level VARCHAR(32) NOT NULL,
    lead_instructor_id UUID REFERENCES cc_users(id),
    duration_weeks INT NOT NULL DEFAULT 4,
    effort_hours INT NOT NULL DEFAULT 20,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Course Modules & Lessons
CREATE TABLE cc_course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES cc_courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    module_order INT NOT NULL DEFAULT 1,
    description TEXT
);

CREATE TABLE cc_course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES cc_course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration_minutes INT DEFAULT 45,
    video_url VARCHAR(512),
    transcript TEXT,
    notes_markdown TEXT,
    lesson_order INT NOT NULL DEFAULT 1
);

-- 6. Study Materials Library
CREATE TABLE cc_study_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES cc_courses(id) ON DELETE SET NULL,
    trainer_id UUID NOT NULL REFERENCES cc_users(id),
    title VARCHAR(255) NOT NULL,
    material_type material_type_enum NOT NULL,
    file_storage_url VARCHAR(512) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    subject_domain VARCHAR(64) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    download_count INT DEFAULT 0,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Assessments & MCQ Quizzes
CREATE TABLE cc_quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES cc_courses(id) ON DELETE CASCADE,
    creator_trainer_id UUID NOT NULL REFERENCES cc_users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 30,
    passing_percentage NUMERIC(5,2) NOT NULL DEFAULT 60.00,
    deadline_at TIMESTAMPTZ,
    total_marks INT NOT NULL DEFAULT 100,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cc_quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES cc_quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of {id, text}
    correct_option_id VARCHAR(32) NOT NULL,
    explanation TEXT,
    marks INT NOT NULL DEFAULT 10,
    question_order INT NOT NULL DEFAULT 1
);

-- 8. Trainee Submissions & Automated Evaluation
CREATE TABLE cc_quiz_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES cc_quizzes(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES cc_users(id) ON DELETE CASCADE,
    score_achieved NUMERIC(6,2) NOT NULL,
    total_marks NUMERIC(6,2) NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    passed BOOLEAN NOT NULL,
    time_spent_seconds INT NOT NULL,
    answers_json JSONB NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Course Enrollments
CREATE TABLE cc_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES cc_courses(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES cc_users(id) ON DELETE CASCADE,
    progress_percentage NUMERIC(5,2) DEFAULT 0.00,
    is_completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(course_id, trainee_id)
);

-- 10. Multi-Dimensional Feedback
CREATE TABLE cc_course_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES cc_courses(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES cc_users(id) ON DELETE CASCADE,
    overall_rating SMALLINT CHECK (overall_rating BETWEEN 1 AND 5),
    content_clarity_score SMALLINT CHECK (content_clarity_score BETWEEN 1 AND 5),
    practical_relevance_score SMALLINT CHECK (practical_relevance_score BETWEEN 1 AND 5),
    instructor_delivery_score SMALLINT CHECK (instructor_delivery_score BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Announcements & Circulars
CREATE TABLE cc_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal',
    issuing_authority VARCHAR(128) NOT NULL,
    attachment_url VARCHAR(512),
    published_at TIMESTAMPTZ DEFAULT NOW()
);
`;
