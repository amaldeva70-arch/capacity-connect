import {
  UserProfile,
  Course,
  StudyMaterial,
  AssessmentQuiz,
  QuizSubmission,
  CourseFeedback,
  Announcement,
  CompetencySkillTag
} from '../types';
import {
  ADDITIONAL_COURSES,
  ADDITIONAL_STUDY_MATERIALS,
  ADDITIONAL_QUIZZES
} from './additionalCourses';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-trainee-01',
    name: 'Arvind Verma',
    email: 'arvind.verma@imd.gov.in',
    phone: '+91 98230 45129',
    role: 'trainee',
    status: 'verified',
    password: 'imd@123',
    employeeId: 'IMD-PN-2021-884',
    designation: 'Scientific Assistant - Gr. I',
    institution: 'IMD - India Meteorological Department',
    stationOrLocation: 'Regional Meteorological Centre (RMC), Pune',
    bio: 'Assigned to the Doppler Radar division and local convective storm warning unit. Working on radar-derived precipitation estimation and nowcasting.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    interests: ['Doppler Radar', 'Nowcasting', 'Satellite Meteorology', 'Monsoon Teleconnections', 'Severe Storms'],
    skills: [
      { id: 'sk-1', name: 'Doppler Weather Radar (DWR)', category: 'Instrumentation', proficiency: 'Intermediate', verified: true },
      { id: 'sk-2', name: 'Synoptic Chart Analysis', category: 'Meteorology', proficiency: 'Advanced', verified: true },
      { id: 'sk-3', name: 'Python for Meteorology', category: 'Computing & AI', proficiency: 'Intermediate', verified: false },
      { id: 'sk-4', name: 'Aviation Weather Briefing', category: 'Forecasting', proficiency: 'Beginner', verified: true }
    ],
    qualifications: [
      { id: 'q-1', degree: 'M.Sc. Physics (Atmospheric Sciences)', field: 'Physics & Atmospheric Studies', institution: 'Savitribai Phule Pune University', yearOfCompletion: 2020, gradePercentage: '84.5%' },
      { id: 'q-2', degree: 'B.Sc. Physics (Honors)', field: 'Physical Sciences', institution: 'Fergusson College, Pune', yearOfCompletion: 2018, gradePercentage: '81.2%' }
    ],
    experience: [
      { id: 'exp-1', designation: 'Scientific Assistant', organization: 'India Meteorological Department (IMD)', division: 'Radar & Nowcasting Cell, RMC Pune', startDate: '2021-08-01', isCurrent: true, description: 'Routine calibration of S-Band Doppler radar, monitoring convective cells, generating 3-hourly nowcast bulletins.' }
    ],
    certificates: [
      { id: 'cert-1', title: 'Basic Radar Meteorology Operations (BRMO)', issuingAuthority: 'IMD Central Training Institute (CTI), Pashan', issueDate: '2022-03-15', verifiedByAdmin: true, credentialUrl: '#' },
      { id: 'cert-2', title: 'Severe Weather Warning Protocol & Dissemination', issuingAuthority: 'MoES Capacity Building Commission', issueDate: '2023-11-20', verifiedByAdmin: true, credentialUrl: '#' }
    ],
    enrolledCourseIds: ['course-dwr-301', 'course-nwp-402', 'course-cyc-501'],
    completedCourseIds: ['course-dwr-301'],
    registeredDate: '2022-01-10'
  },
  {
    id: 'usr-trainee-02',
    name: 'Priya Nambiar',
    email: 'priya.nambiar@incois.gov.in',
    phone: '+91 94460 78211',
    role: 'trainee',
    status: 'pending',
    password: 'incois@123',
    employeeId: 'INCOIS-JRF-2024-042',
    designation: 'Junior Research Fellow',
    institution: 'INCOIS - Indian National Centre for Ocean Information Services',
    stationOrLocation: 'Ocean Valley, Pragathi Nagar, Hyderabad',
    bio: 'Research fellow studying coastal altimetry and ocean buoy telemetry data for storm surge modeling in the Bay of Bengal.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    interests: ['Ocean Modeling', 'Tsunami Warning', 'Argo Float Data', 'Wave Gliders'],
    skills: [
      { id: 'sk-11', name: 'Ocean Observing Systems', category: 'Oceanography', proficiency: 'Beginner', verified: false },
      { id: 'sk-12', name: 'MATLAB / NetCDF Processing', category: 'Computing & AI', proficiency: 'Intermediate', verified: false }
    ],
    qualifications: [
      { id: 'q-11', degree: 'M.Tech. Ocean Technology', field: 'Marine Sciences', institution: 'Cochin University of Science and Technology (CUSAT)', yearOfCompletion: 2023, gradePercentage: '86.0%' }
    ],
    experience: [
      { id: 'exp-11', designation: 'Project Fellow', organization: 'INCOIS Hyderabad', division: 'Operational Ocean Services Group', startDate: '2024-01-15', isCurrent: true, description: 'Moored buoy sensor health checks and satellite sea surface temperature data fusion.' }
    ],
    certificates: [
      { id: 'cert-11', title: 'Marine GIS & Coastal Hazards Workshop', issuingAuthority: 'NIOT Chennai', issueDate: '2023-09-10', verifiedByAdmin: false }
    ],
    enrolledCourseIds: ['course-ocn-205'],
    completedCourseIds: [],
    registeredDate: '2024-02-14'
  },
  {
    id: 'usr-trainee-03',
    name: 'Rajesh Soren',
    email: 'rajesh.soren@imd.gov.in',
    phone: '+91 98310 99401',
    role: 'trainee',
    status: 'pending',
    password: 'imd@123',
    employeeId: 'IMD-ER-2024-118',
    designation: 'Meteorological Observer - Gr. II',
    institution: 'IMD - India Meteorological Department',
    stationOrLocation: 'Alipore Meteorological Centre, Kolkata',
    bio: 'Field observer responsible for surface observational instruments, radiosonde balloon release, and weather chart digitization.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    interests: ['Synoptic Meteorology', 'Radar Operations', 'Upper Air Observations'],
    skills: [
      { id: 'sk-21', name: 'Upper Air Radiosonde Systems', category: 'Instrumentation', proficiency: 'Intermediate', verified: false }
    ],
    qualifications: [
      { id: 'q-21', degree: 'B.Sc. Mathematics & Physics', field: 'Science', institution: 'Jadavpur University', yearOfCompletion: 2022, gradePercentage: '78.2%' }
    ],
    experience: [
      { id: 'exp-21', designation: 'Observer Trainee', organization: 'IMD Kolkata', division: 'Surface & Upper Air Station', startDate: '2024-03-01', isCurrent: true, description: 'Automated weather station maintenance and high-wind reporting.' }
    ],
    certificates: [],
    enrolledCourseIds: [],
    completedCourseIds: [],
    registeredDate: '2024-04-02'
  },
  {
    id: 'usr-trainer-01',
    name: 'Dr. Sunita Kulkarni',
    email: 'sunita.kulkarni@ncmrwf.gov.in',
    phone: '+91 98110 52319',
    role: 'trainer',
    status: 'verified',
    password: 'ncmrwf@123',
    employeeId: 'NCMRWF-SCI-E-410',
    designation: 'Scientist-E & Head, Atmospheric Modeling Group',
    institution: 'NCMRWF - National Centre for Medium Range Weather Forecasting',
    stationOrLocation: 'NCMRWF Campus, Sector 62, Noida',
    bio: 'Specialist in Numerical Weather Prediction (NWP), high-resolution WRF data assimilation, and satellite radiances. 18+ years research and training experience in MoES.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    interests: ['Data Assimilation', 'WRF-Chem', 'Atmospheric Thermodynamics', 'High-Performance Computing'],
    skills: [
      { id: 'sk-31', name: 'Numerical Weather Prediction (NWP)', category: 'Meteorology', proficiency: 'Expert', verified: true },
      { id: 'sk-32', name: 'Doppler Weather Radar (DWR)', category: 'Instrumentation', proficiency: 'Expert', verified: true },
      { id: 'sk-33', name: 'WRF Modeling & Data Assimilation', category: 'Computing & AI', proficiency: 'Expert', verified: true },
      { id: 'sk-34', name: 'Tropical Cyclone Forecasting', category: 'Forecasting', proficiency: 'Advanced', verified: true }
    ],
    qualifications: [
      { id: 'q-31', degree: 'Ph.D. Atmospheric Sciences', field: 'Meteorology & Numerical Modeling', institution: 'Indian Institute of Technology (IIT) Delhi', yearOfCompletion: 2008, gradePercentage: 'Distinction' }
    ],
    experience: [
      { id: 'exp-31', designation: 'Scientist-E', organization: 'NCMRWF Noida', division: 'NWP Model Development Group', startDate: '2016-04-01', isCurrent: true, description: 'Supervising national deterministic and ensemble forecast systems.' }
    ],
    certificates: [
      { id: 'cert-31', title: 'WMO Advanced Instructor in NWP Techniques', issuingAuthority: 'World Meteorological Organization (WMO)', issueDate: '2018-05-12', verifiedByAdmin: true }
    ],
    enrolledCourseIds: [],
    completedCourseIds: [],
    registeredDate: '2019-06-01'
  },
  {
    id: 'usr-trainer-02',
    name: 'Dr. K. Radhakrishnan',
    email: 'k.radhakrishnan@incois.gov.in',
    phone: '+91 94401 33280',
    role: 'trainer',
    status: 'verified',
    password: 'incois@123',
    employeeId: 'INCOIS-SCI-F-102',
    designation: 'Scientist-F & Director, Tsunami Warning Division',
    institution: 'INCOIS - Indian National Centre for Ocean Information Services',
    stationOrLocation: 'Indian Tsunami Early Warning Centre (ITEWC), Hyderabad',
    bio: 'Senior oceanographer specializing in Indian Ocean tsunami dynamics, ocean bottom pressure recorders (BPRs), deep-sea buoys, and coastal inundation modeling.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    interests: ['Tsunami Dynamics', 'Ocean Observing Systems', 'Hydrodynamic Modeling', 'Disaster Early Warning'],
    skills: [
      { id: 'sk-41', name: 'Ocean Observing Systems', category: 'Oceanography', proficiency: 'Expert', verified: true },
      { id: 'sk-42', name: 'Tsunami Early Warning Operations', category: 'Forecasting', proficiency: 'Expert', verified: true },
      { id: 'sk-43', name: 'Coastal Storm Surge Simulation', category: 'Oceanography', proficiency: 'Expert', verified: true },
      { id: 'sk-44', name: 'Hydrodynamic Modeling', category: 'Computing & AI', proficiency: 'Advanced', verified: true }
    ],
    qualifications: [
      { id: 'q-41', degree: 'Ph.D. Physical Oceanography', field: 'Ocean & Marine Sciences', institution: 'National Institute of Oceanography (NIO), Goa', yearOfCompletion: 2004, gradePercentage: 'Distinction' }
    ],
    experience: [
      { id: 'exp-41', designation: 'Scientist-F', organization: 'INCOIS Hyderabad', division: 'ITEWC & Early Warning Services', startDate: '2015-01-01', isCurrent: true, description: 'Directing real-time round-the-clock Indian Ocean tsunami detection operations.' }
    ],
    certificates: [
      { id: 'cert-41', title: 'UNESCO-IOC International Tsunami Master Trainer', issuingAuthority: 'UNESCO Intergovernmental Oceanographic Commission', issueDate: '2016-10-18', verifiedByAdmin: true }
    ],
    enrolledCourseIds: [],
    completedCourseIds: [],
    registeredDate: '2018-03-20'
  },
  {
    id: 'usr-trainer-03',
    name: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@tropmet.res.in',
    phone: '+91 94220 81920',
    role: 'trainer',
    status: 'verified',
    password: 'tropmet@123',
    employeeId: 'IITM-SCI-E-289',
    designation: 'Scientist-E, Centre for Climate Change Research (CCCR)',
    institution: 'IITM - Indian Institute of Tropical Meteorology, Pune',
    stationOrLocation: 'IITM Campus, Dr. Homi Bhabha Road, Pashan, Pune',
    bio: 'Lead researcher in tropical meteorology, monsoonal teleconnections, and AI/ML applications in cloud physics and precipitation nowcasting.',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    interests: ['Monsoon Dynamics', 'AI/ML in Meteorology', 'Satellite Hydrometeorology', 'Climate Projections'],
    skills: [
      { id: 'sk-51', name: 'Machine Learning in Earth Sciences', category: 'Computing & AI', proficiency: 'Expert', verified: true },
      { id: 'sk-52', name: 'Tropical Cyclone Forecasting', category: 'Meteorology', proficiency: 'Advanced', verified: true },
      { id: 'sk-53', name: 'Satellite Meteorology', category: 'Forecasting', proficiency: 'Expert', verified: true }
    ],
    qualifications: [
      { id: 'q-51', degree: 'Ph.D. Atmospheric & Space Sciences', field: 'Geophysics', institution: 'University of Pune & IITM', yearOfCompletion: 2011, gradePercentage: 'First Class' }
    ],
    experience: [
      { id: 'exp-51', designation: 'Scientist-E', organization: 'IITM Pune', division: 'Centre for Climate Change Research', startDate: '2017-09-01', isCurrent: true, description: 'Heading climate prediction system development and deep learning for extreme rainfall forecasting.' }
    ],
    certificates: [],
    enrolledCourseIds: [],
    completedCourseIds: [],
    registeredDate: '2020-05-15'
  },
  {
    id: 'usr-admin-01',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@moes.gov.in',
    phone: '+91 11 2466 9500',
    role: 'admin',
    status: 'verified',
    password: 'moes@123',
    employeeId: 'MOES-HQ-DIR-009',
    designation: 'Director (Human Resource Development & Capacity Building)',
    institution: 'MoES - Ministry of Earth Sciences HQ',
    stationOrLocation: 'Prithvi Bhavan, Lodhi Road, New Delhi',
    bio: 'Head of institutional training, competency framework rollout, and WMO Regional Training Centre (RTC) liaison for the Ministry of Earth Sciences.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    interests: ['Capacity Building Strategy', 'Competency Mapping', 'WMO Standards', 'Scientific Cadre Development'],
    skills: [
      { id: 'sk-61', name: 'Competency Framework Architecture', category: 'General', proficiency: 'Expert', verified: true },
      { id: 'sk-62', name: 'Meteorological Operational Standards', category: 'Meteorology', proficiency: 'Expert', verified: true }
    ],
    qualifications: [
      { id: 'q-61', degree: 'Ph.D. Earth Sciences', field: 'Geosciences', institution: 'Delhi University', yearOfCompletion: 1999, gradePercentage: 'Distinction' }
    ],
    experience: [
      { id: 'exp-61', designation: 'Director (HRD & Training)', organization: 'Ministry of Earth Sciences (MoES)', division: 'Capacity Building Cell', startDate: '2019-01-01', isCurrent: true, description: 'Administering national training curriculums for IMD, NCMRWF, INCOIS, IITM, and NIOT.' }
    ],
    certificates: [],
    enrolledCourseIds: [],
    completedCourseIds: [],
    registeredDate: '2018-01-01'
  }
];

const BASE_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-01',
    title: 'Operational Handbook: Doppler Weather Radar (S-Band & C-Band)',
    type: 'pdf',
    fileUrl: '#download-dwr-handbook.pdf',
    fileSize: '14.8 MB',
    durationOrPages: '142 Pages',
    subjectDomain: 'Radar Meteorology',
    tags: ['DWR', 'Reflectivity (Z)', 'Radial Velocity', 'Dual Polarization', 'Calibration'],
    uploadedBy: 'Dr. Sunita Kulkarni',
    uploadedById: 'usr-trainer-01',
    uploadDate: '2024-03-10',
    downloadCount: 384,
    description: 'Comprehensive manual covering standard operating procedures for IMD S-Band Doppler Radars, volume scan strategies, and echo interpretation.'
  },
  {
    id: 'mat-02',
    title: 'Lecture Series: Dual-Polarimetric Radar Products & Hail Signature Detection',
    type: 'video',
    fileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    fileSize: '240 MB',
    durationOrPages: '42 mins',
    subjectDomain: 'Radar Meteorology',
    tags: ['ZDR', 'KDP', 'Correlation Coefficient (RhoHV)', 'Hydrometeor Classification'],
    uploadedBy: 'Dr. Sunita Kulkarni',
    uploadedById: 'usr-trainer-01',
    uploadDate: '2024-03-12',
    downloadCount: 512,
    description: 'Video masterclass explaining differential reflectivity, specific differential phase, and hydrometeor classification algorithms used during severe storm surveillance.'
  },
  {
    id: 'mat-03',
    title: 'Presentation Deck: Numerical Weather Prediction Fundamentals & Grid Meshing',
    type: 'presentation',
    fileUrl: '#download-nwp-slides.pptx',
    fileSize: '28.4 MB',
    durationOrPages: '68 Slides',
    subjectDomain: 'Numerical Weather Prediction',
    tags: ['NWP', 'WRF', 'Boundary Conditions', 'Primitive Equations', 'Courant-Friedrichs-Lewy'],
    uploadedBy: 'Dr. Sunita Kulkarni',
    uploadedById: 'usr-trainer-01',
    uploadDate: '2024-02-18',
    downloadCount: 290,
    description: 'Slide deck on finite difference schemes, baroclinic instability equations, and terrain-following sigma coordinates.'
  },
  {
    id: 'mat-04',
    title: 'Indian Ocean Tsunami Early Warning System: Standard Operating Protocol',
    type: 'pdf',
    fileUrl: '#download-tsunami-sop.pdf',
    fileSize: '9.2 MB',
    durationOrPages: '88 Pages',
    subjectDomain: 'Ocean Observing Systems',
    tags: ['ITEWC', 'BPR Buoys', 'Tidal Gauge Network', 'Direct Inundation Modeling'],
    uploadedBy: 'Dr. K. Radhakrishnan',
    uploadedById: 'usr-trainer-02',
    uploadDate: '2024-01-25',
    downloadCount: 420,
    description: 'Detailed operational manual of the Indian Tsunami Early Warning Centre at INCOIS Hyderabad for coastal bulletin issuance within 10 minutes of undersea earthquakes.'
  },
  {
    id: 'mat-05',
    title: 'Jupyter Notebook: Deep Learning for INSAT-3D Cloud Top Temperature Analysis',
    type: 'code',
    fileUrl: '#download-cld-temp.ipynb',
    fileSize: '3.6 MB',
    durationOrPages: '12 Code Blocks',
    subjectDomain: 'Machine Learning in Earth Sciences',
    tags: ['Python', 'TensorFlow', 'INSAT-3DR', 'Infrared Imagery', 'Convective Initiation'],
    uploadedBy: 'Dr. Meenakshi Sundaram',
    uploadedById: 'usr-trainer-03',
    uploadDate: '2024-03-01',
    downloadCount: 315,
    description: 'Hands-on notebook demonstrating how to parse HDF5 INSAT data, extract Brightness Temperature (TBB), and train a CNN to identify developing thunderstorm cells.'
  },
  {
    id: 'mat-06',
    title: 'MoES Benchmark Dataset: Bay of Bengal Cyclone Tracks & Central Pressure (2010-2023)',
    type: 'dataset',
    fileUrl: '#download-cyclone-dataset.csv',
    fileSize: '45.1 MB',
    durationOrPages: '14,200 Rows',
    subjectDomain: 'Tropical Cyclone Forecasting',
    tags: ['Dataset', 'Best Track', 'Bay of Bengal', 'Wind Speed', 'MSLP', 'Landfall'],
    uploadedBy: 'Dr. Sunita Kulkarni',
    uploadedById: 'usr-trainer-01',
    uploadDate: '2024-02-05',
    downloadCount: 630,
    description: 'Standardized research dataset compiled from IMD Regional Specialized Meteorological Centre (RSMC) New Delhi cyclone archives.'
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  ...BASE_STUDY_MATERIALS,
  ...ADDITIONAL_STUDY_MATERIALS
];

const BASE_QUIZZES: AssessmentQuiz[] = [
  {
    id: 'quiz-dwr-101',
    courseId: 'course-dwr-301',
    courseTitle: 'Advanced Doppler Weather Radar (DWR) Operation & Severe Weather Warning',
    title: 'Module Assessment: Radar Echo Interpretation & Severe Convection Detection',
    description: 'Formal capacity verification test on reflectivity signatures, radial velocity de-aliasing, hook echoes, and Dual-Pol hydrometeor classification.',
    durationMinutes: 20,
    passingScorePercentage: 70,
    deadlineDate: '2026-10-30',
    totalMarks: 50,
    createdBy: 'Dr. Sunita Kulkarni',
    createdById: 'usr-trainer-01',
    createdDate: '2024-03-15',
    isPublished: true,
    questions: [
      {
        id: 'q-1',
        question: 'In dual-polarization radar operations, what does a differential reflectivity (ZDR) close to 0 dB accompanied by a very high horizontal reflectivity (> 55 dBZ) typically indicate?',
        options: [
          { id: 'opt-a', text: 'Large oblate raindrops' },
          { id: 'opt-b', text: 'Tumbling hail or graupel' },
          { id: 'opt-c', text: 'Dry, horizontally oriented ice crystals' },
          { id: 'opt-d', text: 'Biological scatterers (insects / birds)' }
        ],
        correctOptionId: 'opt-b',
        explanation: 'Hail stones tumble chaotically as they fall, causing their effective horizontal and vertical dimensions to appear roughly equal (ZDR ~ 0 dB), yet producing extreme radar backscatter (>55 dBZ).',
        marks: 10
      },
      {
        id: 'q-2',
        question: 'Which radar signature is the hallmark indicator of a supercell thunderstorm possessing strong cyclonic updraft rotation (mesocyclone)?',
        options: [
          { id: 'opt-a', text: 'Bounded Weak Echo Region (BWER) and Hook Echo in Reflectivity' },
          { id: 'opt-b', text: 'Uniform stratiform bright band at the melting level' },
          { id: 'opt-c', text: 'Linear Squall Line with rear inflow notch only' },
          { id: 'opt-d', text: 'Anomalous propagation ground clutter ring' }
        ],
        correctOptionId: 'opt-a',
        explanation: 'A Hook Echo curling around the rear flank downdraft, accompanied by a BWER where intense updrafts prevent precipitation from growing before reaching high altitudes, confirms a mesocyclone.',
        marks: 10
      },
      {
        id: 'q-3',
        question: 'What is the primary physical phenomenon responsible for velocity aliasing (Nyquist folding) in Doppler radar systems?',
        options: [
          { id: 'opt-a', text: 'Atmospheric attenuation along heavy rain paths' },
          { id: 'opt-b', text: 'Target radial velocities exceeding the maximum unambiguous velocity (Vmax = lambda * PRF / 4)' },
          { id: 'opt-c', text: 'Second-trip echoes originating beyond the maximum unambiguous range' },
          { id: 'opt-d', text: 'Beam blockage caused by mountainous terrain or tall urban structures' }
        ],
        correctOptionId: 'opt-b',
        explanation: 'Doppler velocity aliasing occurs when the true radial component of wind exceeds the Nyquist velocity threshold determined by the pulse repetition frequency (PRF) and radar wavelength.',
        marks: 10
      },
      {
        id: 'q-4',
        question: 'At what radar frequency band do India Meteorological Department (IMD) coastal cyclone surveillance radars predominantly operate to minimize attenuation in extreme tropical monsoonal precipitation?',
        options: [
          { id: 'opt-a', text: 'X-Band (~9 GHz)' },
          { id: 'opt-b', text: 'C-Band (~5.6 GHz)' },
          { id: 'opt-c', text: 'S-Band (~2.7 - 2.9 GHz)' },
          { id: 'opt-d', text: 'Ka-Band (~35 GHz)' }
        ],
        correctOptionId: 'opt-c',
        explanation: 'S-Band radars experience negligible attenuation in heavy monsoonal and cyclonic rains, making them the gold standard for IMD coastal warning stations (e.g. Chennai, Paradip, Kolkata, Visakhapatnam).',
        marks: 10
      },
      {
        id: 'q-5',
        question: 'What is the diagnostic significance of a velocity couplet exhibiting inbound (green) and outbound (red) velocity vectors adjacent to each other at the same azimuth and range?',
        options: [
          { id: 'opt-a', text: 'Uniform laminar jet stream flow' },
          { id: 'opt-b', text: 'Strong azimuthal shear signifying localized vortex rotation or tornado vortex signature' },
          { id: 'opt-c', text: 'Calm eye region of a mature tropical depression' },
          { id: 'opt-d', text: 'Receiver noise calibration error' }
        ],
        correctOptionId: 'opt-b',
        explanation: 'Side-by-side opposing radial velocity vectors within a small azimuthal distance indicate intense rotational shear (vorticity), diagnostic of a tornado vortex signature (TVS) or mesocyclone.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-nwp-201',
    courseId: 'course-nwp-402',
    courseTitle: 'Numerical Weather Prediction & High-Resolution Regional Models (WRF)',
    title: 'Mid-Term Evaluation: Atmospheric Dynamics & Numerical Discretization',
    description: 'Assessment on Navier-Stokes primitive equations, hydrostatic vs non-hydrostatic formulation, and CFL stability criteria.',
    durationMinutes: 25,
    passingScorePercentage: 65,
    deadlineDate: '2026-11-15',
    totalMarks: 40,
    createdBy: 'Dr. Sunita Kulkarni',
    createdById: 'usr-trainer-01',
    createdDate: '2024-02-20',
    isPublished: true,
    questions: [
      {
        id: 'q-nwp-1',
        question: 'Why must high-resolution numerical weather prediction models (grid spacing < 4 km) utilize a non-hydrostatic dynamical core?',
        options: [
          { id: 'opt-n1', text: 'Because hydrostatic balance breaks down when vertical acceleration cannot be neglected in deep convective clouds' },
          { id: 'opt-n2', text: 'To eliminate the Coriolis parameter from tropical latitude calculations' },
          { id: 'opt-n3', text: 'To permit infinite time steps without numerical instability' },
          { id: 'opt-n4', text: 'Because non-hydrostatic equations require less computational memory' }
        ],
        correctOptionId: 'opt-n1',
        explanation: 'At fine horizontal resolutions, intense convective updrafts generate vertical accelerations comparable to gravity, rendering the hydrostatic approximation (dp/dz = -rho*g) invalid.',
        marks: 20
      },
      {
        id: 'q-nwp-2',
        question: 'What does the Courant-Friedrichs-Lewy (CFL) condition govern in explicit finite-difference numerical models?',
        options: [
          { id: 'opt-n21', text: 'The maximum permissible time step (dt) relative to grid spacing (dx) and maximum wave propagation velocity (c)' },
          { id: 'opt-n22', text: 'The total radiative transfer through the stratospheric ozone layer' },
          { id: 'opt-n23', text: 'The accuracy of sea surface temperature boundary conditions' },
          { id: 'opt-n24', text: 'The conversion rate of cloud water to rainwater' }
        ],
        correctOptionId: 'opt-n21',
        explanation: 'The CFL criterion ensures that the numerical domain of dependence encompasses the physical domain of dependence (c * dt / dx <= Cmax). Exceeding it leads to exponential error growth.',
        marks: 20
      }
    ]
  }
];

export const INITIAL_QUIZZES: AssessmentQuiz[] = [
  ...BASE_QUIZZES,
  ...ADDITIONAL_QUIZZES
];

export const INITIAL_QUIZ_SUBMISSIONS: QuizSubmission[] = [
  {
    id: 'sub-01',
    quizId: 'quiz-dwr-101',
    quizTitle: 'Module Assessment: Radar Echo Interpretation & Severe Convection Detection',
    courseId: 'course-dwr-301',
    traineeId: 'usr-trainee-01',
    traineeName: 'Arvind Verma',
    institution: 'IMD - India Meteorological Department',
    submittedAt: '2024-03-22 14:35',
    timeSpentMinutes: 16,
    score: 50,
    totalPossibleMarks: 50,
    percentage: 100,
    passed: true,
    selectedAnswers: {
      'q-1': 'opt-b',
      'q-2': 'opt-a',
      'q-3': 'opt-b',
      'q-4': 'opt-c',
      'q-5': 'opt-b'
    }
  }
];

export const INITIAL_FEEDBACK: CourseFeedback[] = [
  {
    id: 'fb-01',
    courseId: 'course-dwr-301',
    traineeId: 'usr-trainee-01',
    traineeName: 'Arvind Verma',
    traineeDesignation: 'Scientific Assistant - Gr. I',
    traineeInstitution: 'IMD - India Meteorological Department',
    rating: 5,
    contentClarityRating: 5,
    practicalApplicabilityRating: 5,
    instructorDeliveryRating: 5,
    comment: 'Exceptional training on Dual-Polarization radar metrics! The hands-on analysis of the 2023 cyclonic storm radar dataset was directly applicable to our daily shifts at RMC Pune. Dr. Kulkarni explained beam refraction and velocity de-aliasing thoroughly.',
    submittedAt: '2024-03-23 10:15'
  },
  {
    id: 'fb-02',
    courseId: 'course-dwr-301',
    traineeId: 'usr-trainee-02',
    traineeName: 'Karthik Ramanathan',
    traineeDesignation: 'Meteorologist-A',
    traineeInstitution: 'IMD - India Meteorological Department',
    rating: 4,
    contentClarityRating: 5,
    practicalApplicabilityRating: 4,
    instructorDeliveryRating: 4,
    comment: 'Very informative course. Would appreciate more sample cases on anomalous propagation (AP) ground clutter identification during pre-monsoon inversions.',
    submittedAt: '2024-03-18 16:40'
  }
];

const BASE_COURSES: Course[] = [
  {
    id: 'course-dwr-301',
    code: 'MOES-MET-301',
    title: 'Advanced Doppler Weather Radar (DWR) Operation & Severe Weather Warning',
    shortDescription: 'Operational training on S-Band and C-Band radar signal processing, dual-polarimetric products (ZDR, KDP, RhoHV), and convective storm nowcasting.',
    fullDescription: 'This flagship capacity building course equips IMD radar operators, meteorologists, and scientific staff with rigorous theoretical and operational proficiencies in Doppler Weather Radar technology. Participants master volume scan strategies, velocity de-aliasing, hydrometeor classification algorithms, microburst and gust front detection, and quantitative precipitation estimation (QPE) for urban flood early warnings.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'IMD Radar Operators, Forecasters, and State Emergency Operation Centre Liaison Officers',
    difficulty: 'Intermediate',
    durationWeeks: 6,
    effortHours: 36,
    instructorName: 'Dr. Sunita Kulkarni',
    instructorId: 'usr-trainer-01',
    instructorDesignation: 'Scientist-E, NCMRWF & Visiting Faculty IMD CTI',
    instructorInstitution: 'NCMRWF - National Centre for Medium Range Weather Forecasting',
    enrolledCount: 142,
    completionCount: 89,
    averageRating: 4.8,
    ratingCount: 34,
    tags: ['Doppler Radar', 'Nowcasting', 'Dual Polarization', 'Severe Weather', 'Hydrometeor Classification'],
    syllabusHighlights: [
      'Radar hardware components, transmitters (Klystron vs Solid State), and antenna radiation patterns',
      'Dual-polarization observables: Differential Reflectivity (ZDR) and Specific Differential Phase (KDP)',
      'Severe convective storm signatures: BWER, Hook Echo, Velocity Couplets, Hail Spikes',
      'QPE Algorithms and merging gauge network observations with radar precipitation fields',
      'Real-time SOPs for issuing 3-hourly severe weather nowcast warnings'
    ],
    prerequisites: ['Basic Synoptic Meteorology', 'Fundamentals of Electromagnetic Waves', 'CTI Induction Training'],
    status: 'active',
    quizId: 'quiz-dwr-101',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Principles of Radar Meteorology & Volume Scan Strategies',
        description: 'Radar equation for distributed targets, pulse repetition frequency, maximum unambiguous range and velocity tradeoffs.',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Radar Wave Propagation & Atmospheric Refraction',
            durationMinutes: 45,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: 'Welcome to Lecture 1.1 on Radar Wave Propagation. In this session, we investigate how electromagnetic waves propagate through the standard troposphere under varying temperature and humidity gradients. We will derive the 4/3 effective Earth radius model...',
            notesMarkdown: '### Key Formulas\n- Standard Refractive Index Gradient: $dn/dh = -40 \\times 10^{-6} \\text{ km}^{-1}$\n- Effective Earth Radius: $k = \\frac{1}{1 + a(dn/dh)} \\approx 4/3$\n- Ducting occurs when $dn/dh < -157 \\times 10^{-6} \\text{ km}^{-1}$ causing super-refraction and strong ground clutter returns.',
            isCompleted: true,
            materials: [INITIAL_STUDY_MATERIALS[0], INITIAL_STUDY_MATERIALS[1]]
          },
          {
            id: 'les-1-2',
            title: '1.2 Doppler Principle & Velocity De-Aliasing Techniques',
            durationMinutes: 50,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: 'In this lecture, we examine the phase shift detected in reflected microwave pulses and the mathematical formulation of the Doppler velocity. We evaluate dual-PRF strategies implemented across the IMD radar network to extend unambiguous velocity beyond 60 m/s...',
            notesMarkdown: '### Doppler Ambiguity Relation\n$R_{max} \\times V_{max} = \\frac{c \\lambda}{8}$\nStaggered PRF allows unravelling folded velocities without sacrificing spatial range resolution.',
            isCompleted: true,
            materials: [INITIAL_STUDY_MATERIALS[0]]
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Dual-Polarization Metrics & Severe Storm Signatures',
        description: 'Differential reflectivity (ZDR), correlation coefficient (RhoHV), specific differential phase (KDP), and hail identification.',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Hydrometeor Classification Algorithms',
            durationMinutes: 55,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            transcript: 'Dual-polarimetric variables provide microphysical insights into the shape, canting angle, and phase state of falling hydrometeors. In this lesson, we break down the fuzzy-logic classification scheme utilized by modern IMD DWR installations...',
            notesMarkdown: '### Dual-Pol Fingerprints\n- **Rain**: High Z, positive ZDR, high RhoHV (>0.98)\n- **Hail**: High Z (>55 dBZ), low ZDR (~0 dB), slightly reduced RhoHV (0.90-0.95)\n- **Debris Ball**: Low RhoHV (<0.80), erratic ZDR, high Z coincident with TVS',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[1]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-nwp-402',
    code: 'MOES-NWP-402',
    title: 'Numerical Weather Prediction & High-Resolution Regional Models (WRF)',
    shortDescription: 'Advanced dynamical modeling, finite difference schemes, convective parameterization, and 3D-Var data assimilation.',
    fullDescription: 'Administered under NCMRWF guidance, this course provides scientific assistants and meteorologists with an in-depth understanding of numerical modeling of atmospheric flow. From basic governing equations to setting up high-resolution domain nests in WRF-ARW, running data assimilation with Doppler radar and satellite radiances, and interpreting ensemble spread.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'NWP Modellers, NCMRWF Fellows, IMD Central Forecasting Division Staff',
    difficulty: 'Advanced',
    durationWeeks: 8,
    effortHours: 48,
    instructorName: 'Dr. Sunita Kulkarni',
    instructorId: 'usr-trainer-01',
    instructorDesignation: 'Scientist-E, NCMRWF Noida',
    instructorInstitution: 'NCMRWF - National Centre for Medium Range Weather Forecasting',
    enrolledCount: 98,
    completionCount: 41,
    averageRating: 4.9,
    ratingCount: 28,
    tags: ['NWP', 'WRF', 'Data Assimilation', 'HPC', 'Parametrization'],
    syllabusHighlights: [
      'Derivation of primitive atmospheric equations on spherical coordinates',
      'Grid setups: Arakawa staggered grids and terrain-following hydrostatic pressure coordinates',
      'Cumulus parameterization vs convection-permitting scale dynamics',
      'GSI 3D-Var and Ensemble Kalman Filter (EnKF) data assimilation concepts',
      'Verification metrics: ETS, POD, FAR, and continuous verification with METplus'
    ],
    prerequisites: ['Differential Equations', 'Atmospheric Thermodynamics', 'Linux Command Line'],
    status: 'active',
    quizId: 'quiz-nwp-201',
    modules: [
      {
        id: 'mod-nwp-1',
        title: 'Module 1: Atmospheric Dynamics & Governing Equations',
        description: 'Conservation of momentum, mass, moisture, and thermal energy in baroclinic fluids.',
        order: 1,
        lessons: [
          {
            id: 'les-nwp-1',
            title: '1.1 Non-Hydrostatic Flow Equations & Scale Analysis',
            durationMinutes: 60,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: 'In this foundational NWP lecture, we perform rigorous scale analysis of the vertical momentum equation for synoptic, mesoscale, and microscale convective motions...',
            notesMarkdown: '### Non-Hydrostatic Terms\nWhen $L \\sim H$, vertical acceleration $\\frac{dw}{dt}$ becomes non-negligible, requiring full pressure solver iterations.',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[2]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-ocn-205',
    code: 'MOES-OCN-205',
    title: 'Ocean Observing Systems & Tsunami Early Warning Operations',
    shortDescription: 'Operation and maintenance of Indian Ocean moored buoys, Argo floats, Bottom Pressure Recorders (BPR), and coastal tide gauges.',
    fullDescription: 'Jointly developed with INCOIS and NIOT, this operational module focuses on oceanographic instrumentation, telecommunication systems (INSAT & Iridium satellite telemetry), ocean bottom tsunami sensors, and standard procedures during high-magnitude undersea seismic events in the Makran and Andaman-Sumatra subduction zones.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    domain: 'Ocean Sciences',
    targetAudience: 'INCOIS Officers, NIOT Marine Engineers, Coastal State Disaster Management Officers',
    difficulty: 'Intermediate',
    durationWeeks: 5,
    effortHours: 30,
    instructorName: 'Dr. K. Radhakrishnan',
    instructorId: 'usr-trainer-02',
    instructorDesignation: 'Scientist-F & Director ITEWC, INCOIS',
    instructorInstitution: 'INCOIS - Indian National Centre for Ocean Information Services',
    enrolledCount: 165,
    completionCount: 112,
    averageRating: 4.7,
    ratingCount: 45,
    tags: ['Tsunami Warning', 'Ocean Buoys', 'INCOIS', 'Seismology', 'Coastal Inundation'],
    syllabusHighlights: [
      'MoES National Ocean Observing Network architecture and sensors',
      'Bottom Pressure Recorder (BPR) telemetry and acoustic modems',
      'Real-time tsunami travel time calculations and scenario database matching',
      'Coastal tide gauge network calibration and high-tide alert generation',
      'Standardized bulletin dissemination: Threat, Warning, Alert, and Watch criteria'
    ],
    prerequisites: ['Basic Physical Oceanography', 'Fundamentals of Marine Geophysics'],
    status: 'active',
    modules: [
      {
        id: 'mod-ocn-1',
        title: 'Module 1: Tsunami Generation Mechanics & Deep Ocean Sensors',
        description: 'Seismic rupture mechanics, hydrostatic pressure anomalies, and ocean buoy deployments.',
        order: 1,
        lessons: [
          {
            id: 'les-ocn-1',
            title: '1.1 Deep-sea Bottom Pressure Recorders (BPR) & Data Telemetry',
            durationMinutes: 50,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: 'This lesson explains how piezoelectric pressure transducers deployed at 4000 meters depth detect millimeters of sea surface height perturbation amidst surface wave noise...',
            notesMarkdown: '### BPR Signal Processing\nA high-pass digital Butterworth filter separates seismic tremor noise from long-period tsunami wave propagation.',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[3]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-cyc-501',
    code: 'MOES-CLI-501',
    title: 'Tropical Cyclone Genesis, Track Forecasting & Impact-Based Warning',
    shortDescription: 'Meteorological analysis of North Indian Ocean tropical disturbances, Dvorak satellite technique, and RSMC forecasting procedures.',
    fullDescription: 'Comprehensive training delivered in accordance with WMO guidelines on tropical cyclone analysis. Covers thermodynamic conditions for cyclogenesis, shear constraints, intensity estimation using enhanced infrared (EIR) satellite imagery, radar centroid tracking, numerical ensemble consensus, and modern impact-based warning protocols.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'Cyclone Warning Centre (CWC) & Area Cyclone Warning Centre (ACWC) Forecasters',
    difficulty: 'Advanced',
    durationWeeks: 6,
    effortHours: 35,
    instructorName: 'Dr. Sunita Kulkarni',
    instructorId: 'usr-trainer-01',
    instructorDesignation: 'Scientist-E, NCMRWF & RSMC Lead',
    instructorInstitution: 'NCMRWF - National Centre for Medium Range Weather Forecasting',
    enrolledCount: 210,
    completionCount: 154,
    averageRating: 4.9,
    ratingCount: 62,
    tags: ['Tropical Cyclones', 'Dvorak Technique', 'Storm Surge', 'IMD RSMC', 'Disaster Early Warning'],
    syllabusHighlights: [
      'Ocean Heat Content (OHC) and Madden-Julian Oscillation (MJO) phase diagnostics',
      'Advanced Dvorak Technique (ADT) and automated objective satellite intensity estimation',
      'Steering flow analysis, beta gyres, and recurvature dynamics',
      'Integrated storm surge and coastal wave inundation forecast generation',
      'Preparation of national 3-hourly bulletins for NDMA, ports, and civil aviation'
    ],
    prerequisites: ['Synoptic Meteorology', 'Satellite Meteorology Basics'],
    status: 'active',
    modules: [
      {
        id: 'mod-cyc-1',
        title: 'Module 1: Cyclogenesis Diagnostics & Dvorak Technique',
        description: 'Pattern matching, cloud system centers, curved band, and eye patterns.',
        order: 1,
        lessons: [
          {
            id: 'les-cyc-1',
            title: '1.1 Dvorak T-Number Estimation on INSAT-3DR Imagery',
            durationMinutes: 48,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            transcript: 'In this session, we study the Dvorak classification flow chart for tropical disturbances in the Bay of Bengal and Arabian Sea...',
            notesMarkdown: '### Dvorak T-Number & Wind Correlation\n- T2.5: Deep Depression (28-33 knots)\n- T3.0: Cyclonic Storm (34-47 knots)\n- T4.0: Severe Cyclonic Storm (48-63 knots)\n- T5.0: Very Severe Cyclonic Storm (64-89 knots)',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[5]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-ai-310',
    code: 'MOES-AI-310',
    title: 'Machine Learning Applications in Satellite Hydrometeorology',
    shortDescription: 'Deep learning for nowcasting extreme rainfall, cloud classification, and satellite image super-resolution.',
    fullDescription: 'Designed for the next generation of MoES data scientists and researchers, this course teaches deep learning frameworks applied directly to earth science datasets. Covers U-Net and ConvLSTM architectures for radar nowcasting, transformer models for multi-sensor precipitation estimation, and explainable AI (XAI) in atmospheric sciences.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    domain: 'Climate Modeling',
    targetAudience: 'Scientific Assistants, Project Scientists, and Academic Fellows in MoES institutes',
    difficulty: 'Intermediate',
    durationWeeks: 6,
    effortHours: 36,
    instructorName: 'Dr. Meenakshi Sundaram',
    instructorId: 'usr-trainer-03',
    instructorDesignation: 'Scientist-E, IITM Pune',
    instructorInstitution: 'IITM - Indian Institute of Tropical Meteorology, Pune',
    enrolledCount: 178,
    completionCount: 92,
    averageRating: 4.85,
    ratingCount: 51,
    tags: ['Machine Learning', 'Python', 'Computer Vision', 'Deep Learning', 'Precipitation Nowcast'],
    syllabusHighlights: [
      'Handling NetCDF4, GRIB2, and HDF5 geospatial formats with xarray and rioxarray',
      'Pre-processing satellite radiances and calibration channels',
      'Convolutional neural networks for cloud feature extraction and convective initiation detection',
      'Recurrent and Attention-based architectures for spatio-temporal precipitation nowcasting',
      'Model validation with Earth Mover Distance and spatial verification metrics'
    ],
    prerequisites: ['Python Programming', 'Linear Algebra', 'Basic Meteorology'],
    status: 'active',
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Module 1: Deep Learning Architectures for Weather Imagery',
        description: 'Convolutional neural networks and U-Net models for precipitation segmentation.',
        order: 1,
        lessons: [
          {
            id: 'les-ai-1',
            title: '1.1 U-Net Segmentation for Thunderstorm Cold Cloud Tops',
            durationMinutes: 52,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: 'In this code-driven lesson, we train a U-Net encoder-decoder network on INSAT-3D thermal infrared channels to delineate severe convective cores...',
            notesMarkdown: '### PyTorch Implementation\nUtilize Dice Loss alongside Binary Cross Entropy to overcome class imbalance between clear sky and deep convective clouds.',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[4]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-pol-108',
    code: 'MOES-POL-108',
    title: 'Polar Meteorology & Cryospheric Observation Techniques',
    shortDescription: 'Meteorological observations and Antarctic logistics at Maitri and Bharati research stations.',
    fullDescription: 'Conducted under NCPOR Goa, this training prepares scientific personnel assigned to the Indian Antarctic Expeditions and Arctic Ny-Alesund station. Covers automatic weather station (AWS) installation in sub-zero environments, katabatic wind dynamics, ozone sonde soundings, and sea ice thickness monitoring.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=600&auto=format&fit=crop&q=80',
    domain: 'Geosciences',
    targetAudience: 'Antarctic Expedition Scientific Cadre, Polar Researchers, Observers',
    difficulty: 'Foundation',
    durationWeeks: 4,
    effortHours: 24,
    instructorName: 'Dr. Rajesh Sharma',
    instructorId: 'usr-admin-01',
    instructorDesignation: 'Director HRD & Polar Training Liaison, MoES HQ',
    instructorInstitution: 'MoES - Ministry of Earth Sciences HQ',
    enrolledCount: 74,
    completionCount: 68,
    averageRating: 4.75,
    ratingCount: 19,
    tags: ['Polar Meteorology', 'Antarctica', 'Cryosphere', 'Ozone Hole', 'Katabatic Winds'],
    syllabusHighlights: [
      'Atmospheric boundary layer over Antarctic ice sheet and blizzards',
      'Operation of Campbell Scientific weather stations under -40 deg C conditions',
      'Dobson and Brewer Spectrophotometer measurements of total column ozone',
      'Safety and communication procedures during white-out blizzard conditions'
    ],
    prerequisites: ['Basic Environmental Sciences'],
    status: 'active',
    modules: [
      {
        id: 'mod-pol-1',
        title: 'Module 1: Polar Atmospheric Dynamics & Instrumentation',
        description: 'Katabatic wind generation, polar vortex breakdown, and cryospheric sensor hardening.',
        order: 1,
        lessons: [
          {
            id: 'les-pol-1',
            title: '1.1 Katabatic Winds & Antarctic Station Observation Protocols',
            durationMinutes: 40,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: 'In this session, we investigate gravity drainage winds descending from the high polar plateau toward coastal stations Maitri and Bharati...',
            notesMarkdown: 'Radiative cooling of surface snow generates strong negative buoyancy, accelerating winds down steep coastal gradients exceeding 100 knots.',
            isCompleted: false,
            materials: [INITIAL_STUDY_MATERIALS[0]]
          }
        ]
      }
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  ...BASE_COURSES,
  ...ADDITIONAL_COURSES
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Mission Mausam: National Capacity Building Framework 2026-2030 Launched',
    summary: 'The Ministry of Earth Sciences (MoES) unveils specialized upskilling modules for IMD, NCMRWF, and IITM personnel to empower weather readiness and hyper-local nowcasting.',
    content: 'Under the landmark "Mission Mausam" initiative, MoES announces the induction of advanced training programs in cloud physics, airborne radar observations, and AI-driven numerical weather prediction. All scientific assistants and meteorologists are requested to update their skill profiles on the CAPACITY CONNECT portal before October 31 to align with upcoming institutional nominations.',
    category: 'Circular',
    priority: 'featured',
    issuingAuthority: 'MoES HRD & Training Division, New Delhi',
    publishedDate: '2026-09-10',
    downloadAttachmentName: 'MoES_Mission_Mausam_Capacity_Circular_2026.pdf',
    readCount: 1420,
    tags: ['Mission Mausam', 'Capacity Building', 'MoES', 'Circular']
  },
  {
    id: 'ann-02',
    title: 'Dual Polarimetric Doppler Radar Training Session at IMD New Delhi (Batch IV)',
    summary: 'Nominations are now invited from Regional Meteorological Centres (Kolkata, Mumbai, Chennai, Guwahati, Nagpur) for the 2-week intensive hands-on workshop.',
    content: 'The Central Training Institute (CTI) in coordination with IMD Radar Division will conduct hands-on calibration, volume scan design, and velocity de-aliasing exercises at the Mausam Bhawan S-Band Radar installation. Eligible candidates must have completed MOES-MET-301 online prerequisite modules.',
    category: 'Workshop Notice',
    priority: 'urgent',
    issuingAuthority: 'IMD Central Training Institute (CTI), Pashan',
    publishedDate: '2026-09-15',
    downloadAttachmentName: 'CTI_DWR_Batch_IV_Schedule.pdf',
    readCount: 890,
    tags: ['DWR', 'Workshop', 'IMD CTI', 'Nominations']
  },
  {
    id: 'ann-03',
    title: 'INCOIS Conducts Mock Indian Ocean Tsunami Simulation Exercise (IOWave26)',
    summary: 'Over 250 trainees and scientific officers verified automated ocean bottom sensor alerts and real-time bulletin generation during the simulated 9.1 magnitude Makran trench earthquake.',
    content: 'The Indian Tsunami Early Warning Centre (ITEWC) at INCOIS Hyderabad successfully completed national drill IOWave26. CAPACITY CONNECT trainees enrolled in MOES-OCN-205 participated in simulated emergency message dissemination, achieving a response delivery benchmark of under 8 minutes across all coastal disaster authorities.',
    category: 'Training Milestone',
    priority: 'normal',
    issuingAuthority: 'INCOIS Early Warning Services, Hyderabad',
    publishedDate: '2026-09-12',
    downloadAttachmentName: 'IOWave26_Performance_Report.pdf',
    readCount: 654,
    tags: ['INCOIS', 'Tsunami Drill', 'Milestone']
  },
  {
    id: 'ann-04',
    title: 'Platform Update v3.4: Automated Competency Skill Mapping Engine Active',
    summary: 'Administrators and Training Directors can now automatically match qualified institutional trainers to subject areas based on validated skill tags.',
    content: 'We are pleased to introduce the Automated Competency Mapping Engine on CAPACITY CONNECT. The engine matches certified scientific faculty from NCMRWF, INCOIS, IITM, and IMD to subject curricula using skill tags, years of domain tenure, and trainee feedback indices. Trainers can review matched assignments directly from their dashboard.',
    category: 'Platform Update',
    priority: 'normal',
    issuingAuthority: 'Digital Portal Management Cell, MoES HQ',
    publishedDate: '2026-09-08',
    readCount: 520,
    tags: ['Platform Update', 'Competency Mapping', 'RBAC']
  }
];

export const COMPETENCY_TAGS: CompetencySkillTag[] = [
  { tag: 'Doppler Weather Radar (DWR)', domain: 'Meteorology / Radar', demandLevel: 'Critical', description: 'Radar echo analysis, ZDR, KDP, hydrometeor classification, and nowcasting.' },
  { tag: 'Numerical Weather Prediction (NWP)', domain: 'Atmospheric Modeling', demandLevel: 'Critical', description: 'Primitive equations, WRF model configuration, boundary conditions, CFL checks.' },
  { tag: 'WRF Modeling & Data Assimilation', domain: 'Computing & AI', demandLevel: 'High', description: 'GSI 3D-Var, radar reflectivity assimilation, HPC cluster MPI jobs.' },
  { tag: 'Tropical Cyclone Forecasting', domain: 'Meteorology / Synoptic', demandLevel: 'Critical', description: 'Dvorak satellite classification, track ensemble forecasting, storm surge.' },
  { tag: 'Ocean Observing Systems', domain: 'Oceanography', demandLevel: 'High', description: 'Moored buoys, Argo profiling floats, Bottom Pressure Recorders (BPR).' },
  { tag: 'Tsunami Early Warning Operations', domain: 'Disaster Early Warning', demandLevel: 'Critical', description: 'ITEWC SOPs, seismic travel time curves, coastal threat bulletins.' },
  { tag: 'Machine Learning in Earth Sciences', domain: 'Computing & AI', demandLevel: 'High', description: 'CNNs, ConvLSTM for rainfall nowcast, satellite image super-resolution.' },
  { tag: 'Satellite Meteorology', domain: 'Remote Sensing', demandLevel: 'High', description: 'INSAT-3DR TIR/WV channel interpretation, rapid scan imagery.' },
  { tag: 'Polar Meteorology & Cryosphere', domain: 'Geosciences', demandLevel: 'Moderate', description: 'Antarctic station AWS maintenance, katabatic wind dynamics, ozone monitoring.' },
  { tag: 'Synoptic Chart Analysis', domain: 'Forecasting', demandLevel: 'High', description: 'Surface and upper air stream line analysis, Western Disturbances, Monsoon trough.' },
  { tag: 'Aviation Weather Briefing', domain: 'Aviation Services', demandLevel: 'Moderate', description: 'METAR, TAF, SIGMET issuance, aerodrome wind shear alert systems.' }
];
