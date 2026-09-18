import { Course, StudyMaterial, AssessmentQuiz } from '../types';

export const ADDITIONAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-07',
    title: 'INSAT-3DS Imager & Sounder Calibration Guide',
    type: 'pdf',
    fileUrl: '#download-insat3ds-guide.pdf',
    fileSize: '18.4 MB',
    durationOrPages: '164 Pages',
    subjectDomain: 'Satellite Meteorology',
    tags: ['INSAT-3DS', 'Multispectral', 'Sounder', 'Brightness Temperature', 'Rapid Scan'],
    uploadedBy: 'Dr. Sunita Kulkarni',
    uploadedById: 'usr-trainer-01',
    uploadDate: '2026-03-01',
    downloadCount: 412,
    description: 'Comprehensive operational manual on decoding the 6-channel Imager and 19-channel Sounder payloads of India’s meteorological satellite INSAT-3DS.'
  },
  {
    id: 'mat-08',
    title: 'Aviation Weather Briefing & Wind Shear Manual (ICAO Annex 3)',
    type: 'pdf',
    fileUrl: '#download-aviation-manual.pdf',
    fileSize: '12.1 MB',
    durationOrPages: '118 Pages',
    subjectDomain: 'Aviation Meteorology',
    tags: ['METAR', 'TAF', 'SIGMET', 'Wind Shear', 'ICAO', 'LLWAS'],
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadedById: 'usr-admin-01',
    uploadDate: '2026-02-14',
    downloadCount: 350,
    description: 'Operational guidelines for meteorological watch offices (MWO) at major Indian airports (Delhi, Mumbai, Chennai, Kolkata, Bengaluru) for issuing aviation hazard advisories.'
  },
  {
    id: 'mat-09',
    title: 'IITM-ESM Coupled Climate Model Architecture & CMIP6 Diagnostics',
    type: 'presentation',
    fileUrl: '#download-iitm-esm.pptx',
    fileSize: '34.2 MB',
    durationOrPages: '82 Slides',
    subjectDomain: 'Climate Modeling',
    tags: ['IITM-ESM', 'CMIP6', 'IPCC', 'Coupled Model', 'Monsoon Decadal'],
    uploadedBy: 'Dr. Meenakshi Sundaram',
    uploadedById: 'usr-trainer-03',
    uploadDate: '2026-01-20',
    downloadCount: 520,
    description: 'Detailed presentation explaining India’s indigenous Earth System Model (IITM-ESM), ocean-atmosphere coupling, and aerosol indirect radiative effects.'
  },
  {
    id: 'mat-10',
    title: 'Gramin Krishi Mausam Sewa (GKMS) Block-Level Advisory Protocols',
    type: 'pdf',
    fileUrl: '#download-gkms-protocol.pdf',
    fileSize: '8.7 MB',
    durationOrPages: '94 Pages',
    subjectDomain: 'Agricultural Meteorology',
    tags: ['GKMS', 'Agromet', 'Crop Weather Calendar', 'Soil Moisture', 'Pest Warnings'],
    uploadedBy: 'Dr. Meenakshi Sundaram',
    uploadedById: 'usr-trainer-03',
    uploadDate: '2026-02-28',
    downloadCount: 480,
    description: 'Standard operational protocol for District Agromet Units (DAMUs) issuing bi-weekly crop-specific micro-weather bulletins for smallholder farming communities.'
  },
  {
    id: 'mat-11',
    title: 'Deep Ocean Mission: Matsya 6000 Submersible Instrumentation Specifications',
    type: 'pdf',
    fileUrl: '#download-matsya-specs.pdf',
    fileSize: '22.0 MB',
    durationOrPages: '130 Pages',
    subjectDomain: 'Deep Ocean Mission',
    tags: ['Matsya 6000', 'NIOT', 'Submersible', 'Hydrothermal Vents', 'Acoustic Positioning'],
    uploadedBy: 'Dr. K. Radhakrishnan',
    uploadedById: 'usr-trainer-02',
    uploadDate: '2026-01-10',
    downloadCount: 610,
    description: 'Engineering and operational documentation of India’s 6000-meter human-occupied submersible vehicle developed under the Ministry of Earth Sciences.'
  },
  {
    id: 'mat-12',
    title: 'National Seismological Network & SeisComP3 Real-Time Auto-Location',
    type: 'code',
    fileUrl: '#download-seiscomp3-config.py',
    fileSize: '2.1 MB',
    durationOrPages: '8 Modules',
    subjectDomain: 'Seismology',
    tags: ['NCS', 'SeisComP3', 'Broadband', 'Earthquake', 'P-Wave', 'Moment Tensor'],
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadedById: 'usr-admin-01',
    uploadDate: '2026-02-01',
    downloadCount: 295,
    description: 'Configuration scripts and algorithmic filters for National Centre for Seismology 160-station real-time broadband seismic network and automated ShakeMap generation.'
  }
];

export const ADDITIONAL_QUIZZES: AssessmentQuiz[] = [
  {
    id: 'quiz-sat-301',
    courseId: 'course-sat-415',
    courseTitle: 'Satellite Meteorology: INSAT-3DS Multispectral Imager & Atmospheric Sounder',
    title: 'Certification Exam: INSAT-3DS Multispectral Interpretation & Sounder Profiling',
    description: 'Evaluation of satellite channel characteristics, brightness temperature interpretations, water vapor channel dynamics, and vertical temperature/moisture soundings.',
    durationMinutes: 25,
    passingScorePercentage: 70,
    deadlineDate: '2026-11-15',
    totalMarks: 40,
    createdBy: 'Dr. Sunita Kulkarni',
    createdById: 'usr-trainer-01',
    createdDate: '2026-03-05',
    isPublished: true,
    questions: [
      {
        id: 'q-sat-1',
        question: 'Which absorption band is primarily exploited by the 6.7 µm to 7.1 µm water vapor channels on INSAT-3DS?',
        options: [
          { id: 'opt-sat-1a', text: 'Stratospheric ozone (O3) Hartley band' },
          { id: 'opt-sat-1b', text: 'Middle and upper tropospheric water vapor vibrational-rotational band' },
          { id: 'opt-sat-1c', text: 'Atmospheric window for sea surface skin temperature' },
          { id: 'opt-sat-1d', text: 'Carbon dioxide 15 µm thermal cooling band' }
        ],
        correctOptionId: 'opt-sat-1b',
        explanation: 'The 6.7–7.1 µm channels measure radiation emitted and absorbed by tropospheric moisture, enabling tracking of upper-level jet streams, dry intrusions, and deformation zones even in clear skies.',
        marks: 10
      },
      {
        id: 'q-sat-2',
        question: 'In INSAT-3DS Sounder data processing, how does the physical retrieval algorithm derive vertical temperature profiles (T(p))?',
        options: [
          { id: 'opt-sat-2a', text: 'By measuring Doppler shift of reflected solar illumination' },
          { id: 'opt-sat-2b', text: 'By inverting the radiative transfer equation across 19 spectral channels with differing atmospheric weighting functions' },
          { id: 'opt-sat-2c', text: 'Using surface radar reflectivity echoes alone' },
          { id: 'opt-sat-2d', text: 'By extrapolating surface meteorological station observations upward' }
        ],
        correctOptionId: 'opt-sat-2b',
        explanation: 'Each sounder channel has a weighting function peaking at a distinct pressure level; mathematically solving the inverse radiative transfer equation yields vertical thermodynamic soundings.',
        marks: 10
      },
      {
        id: 'q-sat-3',
        question: 'What operational advantage does INSAT-3DS Rapid Scan Mode provide during extreme weather events?',
        options: [
          { id: 'opt-sat-3a', text: 'It increases spectral channels from 6 to 48' },
          { id: 'opt-sat-3b', text: 'It generates localized sector images at 4.5-minute intervals instead of full-disk 15-minute cycles for convective storm tracking' },
          { id: 'opt-sat-3c', text: 'It eliminates cloud cover from satellite images' },
          { id: 'opt-sat-3d', text: 'It de-orbits the satellite over the Indian Ocean' }
        ],
        correctOptionId: 'opt-sat-3b',
        explanation: 'Rapid Scan Mode focuses on severe thunderstorms or cyclonic storms, delivering high temporal resolution (under 5 minutes) to monitor rapid cloud-top cooling and convective surges.',
        marks: 10
      },
      {
        id: 'q-sat-4',
        question: 'How does Outgoing Longwave Radiation (OLR) correlate with deep convective cloudiness in tropical latitudes?',
        options: [
          { id: 'opt-sat-4a', text: 'Low OLR values (< 200 W/m²) indicate high, cold cloud tops characteristic of intense deep convection' },
          { id: 'opt-sat-4b', text: 'High OLR values (> 280 W/m²) indicate severe thunderstorms' },
          { id: 'opt-sat-4c', text: 'OLR is independent of cloud top temperature' },
          { id: 'opt-sat-4d', text: 'OLR only measures ocean salinity gradients' }
        ],
        correctOptionId: 'opt-sat-4a',
        explanation: 'Deep convective clouds have very cold tops (often -60°C to -80°C), emitting substantially less thermal radiation into space according to the Stefan-Boltzmann law, resulting in low OLR values.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-avi-201',
    courseId: 'course-avi-302',
    courseTitle: 'Aviation Weather Hazards, Aerodrome Wind Shear & SIGMET Generation',
    title: 'Aviation Meteorological Observer & Forecaster Competency Assessment',
    description: 'ICAO Annex 3 compliance test on METAR/SPECI encoding, TAF probability groups, SIGMET issuance criteria, and Low-Level Wind Shear Alert System operations.',
    durationMinutes: 20,
    passingScorePercentage: 75,
    deadlineDate: '2026-11-20',
    totalMarks: 30,
    createdBy: 'Dr. Rajesh Sharma',
    createdById: 'usr-admin-01',
    createdDate: '2026-02-18',
    isPublished: true,
    questions: [
      {
        id: 'q-avi-1',
        question: 'Under ICAO Annex 3, what is the mandatory valid period for a SIGMET advisory for severe non-convective turbulence or severe mountain waves?',
        options: [
          { id: 'opt-avi-1a', text: 'Not more than 4 hours' },
          { id: 'opt-avi-1b', text: '12 to 24 hours' },
          { id: 'opt-avi-1c', text: '30 minutes only' },
          { id: 'opt-avi-1d', text: '7 days' }
        ],
        correctOptionId: 'opt-avi-1a',
        explanation: 'A SIGMET message for phenomena other than volcanic ash and tropical cyclones must not be valid for more than 4 hours.',
        marks: 10
      },
      {
        id: 'q-avi-2',
        question: 'In a METAR report, what does the descriptor "TEMPO" signify?',
        options: [
          { id: 'opt-avi-2a', text: 'A permanent change in prevailing conditions for the remainder of the day' },
          { id: 'opt-avi-2b', text: 'Temporary fluctuations in weather conditions lasting less than one hour on each instance and aggregate less than half the forecast period' },
          { id: 'opt-avi-2c', text: 'Temperature sensor calibration offset' },
          { id: 'opt-avi-2d', text: 'Runway surface friction reading' }
        ],
        correctOptionId: 'opt-avi-2b',
        explanation: 'TEMPO describes temporary fluctuations in weather conditions which last less than one hour and, in aggregate, less than half of the period indicated.',
        marks: 10
      },
      {
        id: 'q-avi-3',
        question: 'What is the operational definition of Low-Level Wind Shear (LLWS) hazardous to landing aircraft?',
        options: [
          { id: 'opt-avi-3a', text: 'A change in wind direction of 5 degrees at 10,000 feet' },
          { id: 'opt-avi-3b', text: 'A rapid change in wind vector along the final approach path or takeoff corridor below 1600 ft (500 m) AGL resulting in airspeed loss or gain' },
          { id: 'opt-avi-3c', text: 'Standard barometric pressure drop' },
          { id: 'opt-avi-3d', text: 'Uniform tailwind throughout climb-out' }
        ],
        correctOptionId: 'opt-avi-3b',
        explanation: 'Low-Level Wind Shear refers to rapid wind vector alterations below 500 meters that abruptly alter an aircraft’s lift, headwind component, and glide-slope alignment.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-clim-401',
    courseId: 'course-clim-601',
    courseTitle: 'Earth System Modeling (IITM-ESM) & IPCC Climate Projection Scenarios',
    title: 'Advanced Examination: Coupled General Circulation Models & Climate Forcing',
    description: 'Rigorous assessment on ocean-atmosphere coupling, carbon cycle feedbacks, Shared Socioeconomic Pathways (SSPs), and South Asian monsoon teleconnections.',
    durationMinutes: 30,
    passingScorePercentage: 70,
    deadlineDate: '2026-12-01',
    totalMarks: 40,
    createdBy: 'Dr. Meenakshi Sundaram',
    createdById: 'usr-trainer-03',
    createdDate: '2026-01-25',
    isPublished: true,
    questions: [
      {
        id: 'q-clim-1',
        question: 'What ocean dynamical model forms the oceanic component of India’s indigenous IITM-ESM?',
        options: [
          { id: 'opt-clim-1a', text: 'Modular Ocean Model version 4 (MOM4p1)' },
          { id: 'opt-clim-1b', text: 'Simple slab ocean without horizontal advection' },
          { id: 'opt-clim-1c', text: 'Constant sea surface temperature grid' },
          { id: 'opt-clim-1d', text: 'Tidal gauge regression matrix' }
        ],
        correctOptionId: 'opt-clim-1a',
        explanation: 'IITM-ESM couples the NCEP CFSv2 atmospheric core with the Geophysical Fluid Dynamics Laboratory Modular Ocean Model (MOM4p1) with a tripolar grid resolving equatorial waves.',
        marks: 10
      },
      {
        id: 'q-clim-2',
        question: 'In IPCC CMIP6 terminology, what does the scenario "SSP5-8.5" denote?',
        options: [
          { id: 'opt-clim-2a', text: 'Aggressive decarbonization and net-negative greenhouse emissions by 2050' },
          { id: 'opt-clim-2b', text: 'Fossil-fueled development with high radiative forcing reaching ~8.5 W/m² by 2100' },
          { id: 'opt-clim-2c', text: 'Constant 1990 greenhouse gas baseline' },
          { id: 'opt-clim-2d', text: 'A low-emissions geoengineered pathway' }
        ],
        correctOptionId: 'opt-clim-2b',
        explanation: 'SSP5-8.5 represents a fossil-fueled development pathway where radiative forcing reaches approximately 8.5 Watts per square meter by the year 2100.',
        marks: 10
      },
      {
        id: 'q-clim-3',
        question: 'How do anthropogenic aerosols over the Indo-Gangetic Plains affect the South Asian summer monsoon in climate simulations?',
        options: [
          { id: 'opt-clim-3a', text: 'Solar dimming cools the Northern Hemisphere landmass, weakening the meridional tropospheric temperature gradient and delaying monsoon onset' },
          { id: 'opt-clim-3b', text: 'They double monsoonal rainfall uniformly across India' },
          { id: 'opt-clim-3c', text: 'They eliminate the Tibetan anticyclone entirely' },
          { id: 'opt-clim-3d', text: 'Aerosols have zero radiative interaction with solar radiation' }
        ],
        correctOptionId: 'opt-clim-3a',
        explanation: 'Sulfate and black carbon aerosols scatter and absorb incoming solar radiation (solar dimming), reducing surface thermal contrast between the Indian landmass and the Indian Ocean.',
        marks: 10
      },
      {
        id: 'q-clim-4',
        question: 'What is climate model "Equilibrium Climate Sensitivity" (ECS)?',
        options: [
          { id: 'opt-clim-4a', text: 'The daily temperature range between noon and midnight' },
          { id: 'opt-clim-4b', text: 'The long-term equilibrium global surface air temperature increase following an instantaneous doubling of atmospheric CO2 concentration' },
          { id: 'opt-clim-4c', text: 'The speed of atmospheric gravity waves' },
          { id: 'opt-clim-4d', text: 'The total rainfall in millimeters per century' }
        ],
        correctOptionId: 'opt-clim-4b',
        explanation: 'ECS is a fundamental metric quantifying the eventual global mean warming resulting from a sustained doubling of CO2 once fast ocean-atmosphere feedbacks stabilize.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-deep-301',
    courseId: 'course-deep-505',
    courseTitle: 'Deep Ocean Mission: Submersible Instrumentation & Hydrothermal Mapping',
    title: 'Deep Ocean Mission Engineering & Oceanographic Verification',
    description: 'Evaluation of deep-submersible life support, syntactic foam buoyancy, ultra-short baseline (USBL) acoustics, and polymetallic nodule survey techniques.',
    durationMinutes: 20,
    passingScorePercentage: 70,
    deadlineDate: '2026-11-30',
    totalMarks: 30,
    createdBy: 'Dr. K. Radhakrishnan',
    createdById: 'usr-trainer-02',
    createdDate: '2026-01-15',
    isPublished: true,
    questions: [
      {
        id: 'q-deep-1',
        question: 'What material is utilized to manufacture the 2.1-meter human-occupied pressure hull of India’s Matsya 6000 deep submersible?',
        options: [
          { id: 'opt-deep-1a', text: 'Reinforced Concrete' },
          { id: 'opt-deep-1b', text: 'High-strength Titanium Alloy (Ti-6Al-4V ELI)' },
          { id: 'opt-deep-1c', text: 'Standard Structural Aluminum' },
          { id: 'opt-deep-1d', text: 'Carbon Fiber woven with epoxy resin' }
        ],
        correctOptionId: 'opt-deep-1b',
        explanation: 'Titanium alloy Ti-6Al-4V extra low interstitial (ELI) provides the critical combination of high yield strength, fracture toughness, and corrosion resistance needed to withstand 600 bar hydrostatic pressure at 6000m depth.',
        marks: 10
      },
      {
        id: 'q-deep-2',
        question: 'How is underwater acoustic positioning maintained for deep-sea submersibles where GPS signals cannot penetrate?',
        options: [
          { id: 'opt-deep-2a', text: 'Ultra-Short Baseline (USBL) acoustic transponder systems referenced to the surface research vessel GPS' },
          { id: 'opt-deep-2b', text: 'Wi-Fi 6 router array suspended from surface buoys' },
          { id: 'opt-deep-2c', text: 'Satellite radar laser altimetry' },
          { id: 'opt-deep-2d', text: 'Optical fiber tether reels only' }
        ],
        correctOptionId: 'opt-deep-2a',
        explanation: 'USBL systems compute vehicle position relative to the surface ship by measuring the phase differences of acoustic acoustic pulses received on a multi-element transducer array.',
        marks: 10
      },
      {
        id: 'q-deep-3',
        question: 'What geochemical signature in the water column is the key vector for detecting active deep-sea hydrothermal vent fields?',
        options: [
          { id: 'opt-deep-3a', text: 'Turbidity plumes, dissolved manganese (Mn), and Helium-3 isotope anomalies' },
          { id: 'opt-deep-3b', text: 'Excess chlorophyll-a fluorescence' },
          { id: 'opt-deep-3c', text: 'Pure freshwater bubbles' },
          { id: 'opt-deep-3d', text: 'High atmospheric ozone concentrations' }
        ],
        correctOptionId: 'opt-deep-3a',
        explanation: 'Hydrothermal vents eject mineral-rich superheated fluids producing buoyant plumes rich in suspended particles (measured by optical backscatter/turbidity), dissolved manganese, and mantle-derived Helium-3.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-seis-201',
    courseId: 'course-seis-308',
    courseTitle: 'Operational Seismological Network & Earthquake Early Warning Systems',
    title: 'Seismological Analysis & Epicentral Determination Exam',
    description: 'Testing P-wave and S-wave phase picking, Gutenberg-Richter relation, focal mechanism stereonets, and National Centre for Seismology 24/7 bulletin workflows.',
    durationMinutes: 20,
    passingScorePercentage: 70,
    deadlineDate: '2026-11-25',
    totalMarks: 30,
    createdBy: 'Dr. Rajesh Sharma',
    createdById: 'usr-admin-01',
    createdDate: '2026-02-05',
    isPublished: true,
    questions: [
      {
        id: 'q-seis-1',
        question: 'In earthquake phase arrival analysis, what seismic wave possesses the highest propagation velocity through the Earth’s lithosphere?',
        options: [
          { id: 'opt-seis-1a', text: 'Rayleigh surface wave' },
          { id: 'opt-seis-1b', text: 'Primary (P) compressional wave' },
          { id: 'opt-seis-1c', text: 'Secondary (S) shear wave' },
          { id: 'opt-seis-1d', text: 'Love surface wave' }
        ],
        correctOptionId: 'opt-seis-1b',
        explanation: 'P-waves are longitudinal compressional waves that travel fastest through solid rock (~5 to 8 km/s in the crust), making them the earliest arrival detected by seismometers.',
        marks: 10
      },
      {
        id: 'q-seis-2',
        question: 'What does the Gutenberg-Richter law (log10 N = a - bM) describe in regional seismicity studies?',
        options: [
          { id: 'opt-seis-2a', text: 'The relationship between frequency of earthquake occurrence (N) and earthquake magnitude (M)' },
          { id: 'opt-seis-2b', text: 'The rate of tectonic plate subduction in millimeters per year' },
          { id: 'opt-seis-2c', text: 'The friction coefficient of dry granite faults' },
          { id: 'opt-seis-2d', text: 'The duration of tsunami waves' }
        ],
        correctOptionId: 'opt-seis-2a',
        explanation: 'The Gutenberg-Richter relationship relates the cumulative number of earthquakes of magnitude greater than or equal to M with empirical constants a (seismicity level) and b (relative proportion of small to large events).',
        marks: 10
      },
      {
        id: 'q-seis-3',
        question: 'Which MoES institution is constitutionally responsible for round-the-clock national seismic surveillance and issuing auto-earthquake alerts within 5 minutes?',
        options: [
          { id: 'opt-seis-3a', text: 'Indian National Centre for Ocean Information Services (INCOIS)' },
          { id: 'opt-seis-3b', text: 'National Centre for Seismology (NCS), Ministry of Earth Sciences' },
          { id: 'opt-seis-3c', text: 'National Institute of Wind Energy' },
          { id: 'opt-seis-3d', text: 'Survey of India' }
        ],
        correctOptionId: 'opt-seis-3b',
        explanation: 'The National Centre for Seismology (NCS) under MoES operates the National Seismological Network (NSN) of over 160 stations for real-time epicentral location and magnitude reporting.',
        marks: 10
      }
    ]
  },
  {
    id: 'quiz-agri-101',
    courseId: 'course-agri-204',
    courseTitle: 'Operational Agrometeorological Advisory Services (GKMS) & Microclimate',
    title: 'Agrometeorological Observer & Farm Advisory Specialist Examination',
    description: 'Test on evapotranspiration calculations (Penman-Monteith), growing degree days (GDD), soil moisture indices, and crop weather calendar advisories.',
    durationMinutes: 20,
    passingScorePercentage: 70,
    deadlineDate: '2026-11-18',
    totalMarks: 30,
    createdBy: 'Dr. Meenakshi Sundaram',
    createdById: 'usr-trainer-03',
    createdDate: '2026-03-01',
    isPublished: true,
    questions: [
      {
        id: 'q-agri-1',
        question: 'What is "Growing Degree Days" (GDD) primarily used for in agrometeorological modeling?',
        options: [
          { id: 'opt-agri-1a', text: 'Measuring tractor diesel consumption' },
          { id: 'opt-agri-1b', text: 'Predicting crop phenological growth stages and maturity based on accumulated thermal heat units above a base temperature' },
          { id: 'opt-agri-1c', text: 'Estimating total rainfall in centimeters' },
          { id: 'opt-agri-1d', text: 'Calculating market wholesale prices of grain' }
        ],
        correctOptionId: 'opt-agri-1b',
        explanation: 'GDD measures heat accumulation calculated as ((Tmax + Tmin)/2) - Tbase to predict germination, flowering, and harvest readiness across varying climate zones.',
        marks: 10
      },
      {
        id: 'q-agri-2',
        question: 'Which method is endorsed by FAO and IMD as the global standard for computing Reference Evapotranspiration (ETo)?',
        options: [
          { id: 'opt-agri-2a', text: 'Thornthwaite monthly temperature method' },
          { id: 'opt-agri-2b', text: 'FAO-56 Penman-Monteith equation' },
          { id: 'opt-agri-2c', text: 'Direct bucket evaporation visual estimate' },
          { id: 'opt-agri-2d', text: 'Soil color reflectance ratio' }
        ],
        correctOptionId: 'opt-agri-2b',
        explanation: 'The FAO-56 Penman-Monteith method incorporates net radiation, air temperature, wind speed, and vapor pressure deficit, providing physically sound ETo values.',
        marks: 10
      },
      {
        id: 'q-agri-3',
        question: 'Under the Gramin Krishi Mausam Sewa (GKMS) scheme, how frequently are official weather-based agro-advisory bulletins issued by DAMUs?',
        options: [
          { id: 'opt-agri-3a', text: 'Once every year before monsoon' },
          { id: 'opt-agri-3b', text: 'Twice a week (every Tuesday and Friday)' },
          { id: 'opt-agri-3c', text: 'Only during drought emergencies' },
          { id: 'opt-agri-3d', text: 'Every hour continuously' }
        ],
        correctOptionId: 'opt-agri-3b',
        explanation: 'IMD Agromet field units prepare bi-weekly advisories every Tuesday and Friday based on 5-day medium-range block and district weather forecasts.',
        marks: 10
      }
    ]
  }
];

export const ADDITIONAL_COURSES: Course[] = [
  {
    id: 'course-sat-415',
    code: 'MOES-SAT-415',
    title: 'Satellite Meteorology: INSAT-3DS Multispectral Imager & Atmospheric Sounder',
    shortDescription: 'Operational processing of India’s next-generation INSAT-3DS payloads, thermal infrared channels, sounder vertical profiles, and rapid-scan nowcasting.',
    fullDescription: 'Conducted under the IMD Satellite Meteorology Division (SatMet) at Mausam Bhawan New Delhi, this advanced program trains operational meteorologists to harness data from India’s dedicated meteorological satellite INSAT-3DS. Participants master calibration of the 6-channel Imager (Visible, SWIR, MIR, Water Vapor, TIR1, TIR2) and the 19-channel Sounder, atmospheric motion vectors (AMVs), cloud top microphysics, Outgoing Longwave Radiation (OLR), and Rapid Scan convective nowcasting.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'IMD Satellite Forecasters, NCMRWF Modellers, State Weather Analysts, and Research Fellows',
    difficulty: 'Advanced',
    durationWeeks: 6,
    effortHours: 36,
    instructorName: 'Dr. Sunita Kulkarni',
    instructorId: 'usr-trainer-01',
    instructorDesignation: 'Scientist-E, NCMRWF & Visiting Faculty IMD SatMet',
    instructorInstitution: 'NCMRWF - National Centre for Medium Range Weather Forecasting',
    enrolledCount: 188,
    completionCount: 132,
    averageRating: 4.9,
    ratingCount: 42,
    tags: ['Satellite Meteorology', 'INSAT-3DS', 'Remote Sensing', 'Sounder', 'Nowcasting', 'OLR'],
    syllabusHighlights: [
      'INSAT-3DS payload architecture: 6-band Multispectral Imager & 19-band Infrared Sounder specifications',
      'Atmospheric absorption bands: Water vapor 6.8 µm dynamics, ozone 9.6 µm, and split-window differential absorption',
      'Retrieval of vertical temperature and humidity profiles (T-z and q-z) for numerical data assimilation',
      'Automated extraction of Atmospheric Motion Vectors (AMVs) from sequential infrared frames',
      'Rapid Scan Mode operations: 4.5-minute sector imaging for monitoring convective initiation and severe storms'
    ],
    prerequisites: ['Basic Electromagnetic Radiation Physics', 'Synoptic Meteorology', 'Satellite Meteorology Induction'],
    status: 'active',
    quizId: 'quiz-sat-301',
    modules: [
      {
        id: 'mod-sat-1',
        title: 'Module 1: Multispectral Channel Physics & Brightness Temperature Interpretation',
        description: 'Planck’s radiation law, atmospheric transmission windows, and multi-channel difference techniques.',
        order: 1,
        lessons: [
          {
            id: 'les-sat-1',
            title: '1.1 Thermal Infrared & Water Vapor Channels on INSAT-3DS',
            durationMinutes: 52,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: 'Welcome to this operational session on INSAT-3DS radiometry. In this lecture, we examine how differential absorption between the 10.8 µm and 12.0 µm split-window channels enables precise low-level moisture attenuation correction...',
            notesMarkdown: '### Split Window Differential Absorption\n$\\Delta T_{BB} = T_{11} - T_{12}$\nPositive values indicate water vapor absorption; negative values frequently reveal suspended dust plumes or volcanic ash.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[0]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-avi-302',
    code: 'MOES-AVI-302',
    title: 'Aviation Weather Hazards, Aerodrome Wind Shear & SIGMET Generation',
    shortDescription: 'Meteorological watch operations, ICAO Annex 3 compliance, Terminal Aerodrome Forecast (TAF) coding, and Low-Level Wind Shear Alert Systems.',
    fullDescription: 'Designed for meteorological officers deployed at Civil Aviation Meteorological Offices (CAMO) across India. This course provides comprehensive training on aviation weather hazards including severe convective turbulence, microbursts, runway crosswinds, low-visibility fog procedures (CAT-I, II, III), aircraft icing, and automated Terminal Doppler Weather Radar (TDWR) algorithms.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'Airport Meteorological Office (AMO) Forecasters, Air Traffic Control Liaison Officers, Observers',
    difficulty: 'Intermediate',
    durationWeeks: 5,
    effortHours: 30,
    instructorName: 'Dr. Rajesh Sharma',
    instructorId: 'usr-admin-01',
    instructorDesignation: 'Director (HRD & Training), MoES HQ',
    instructorInstitution: 'MoES - Ministry of Earth Sciences HQ',
    enrolledCount: 154,
    completionCount: 110,
    averageRating: 4.8,
    ratingCount: 38,
    tags: ['Aviation Meteorology', 'METAR', 'TAF', 'SIGMET', 'Wind Shear', 'ICAO'],
    syllabusHighlights: [
      'ICAO Annex 3 & WMO Technical Regulations for international civil air navigation services',
      'METAR and SPECI automated encoding, TREND forecast formulation, and Runway Visual Range (RVR)',
      'Terminal Aerodrome Forecast (TAF) preparation: BECMG, TEMPO, and PROB groups',
      'Detection and alerting of Low-Level Wind Shear (LLWS) using Terminal Doppler Weather Radar and anemometer arrays',
      'En-route aviation hazard advisories: Significant Weather (SIGWX) charts and SIGMET issuance for cyclones, turbulence, and ash'
    ],
    prerequisites: ['Synoptic Meteorology', 'Surface Observation Standards'],
    status: 'active',
    quizId: 'quiz-avi-201',
    modules: [
      {
        id: 'mod-avi-1',
        title: 'Module 1: Terminal Observations & Wind Shear Detection',
        description: 'Aerodrome observing standards, RVR instruments, and microburst alert protocols.',
        order: 1,
        lessons: [
          {
            id: 'les-avi-1',
            title: '1.1 Microburst Dynamics & Low-Level Wind Shear Alert Systems (LLWAS)',
            durationMinutes: 48,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: 'This lesson analyzes convective downdrafts that spread radially outward upon impacting ground level, producing severe divergent wind shear hazardous to aircraft on final approach...',
            notesMarkdown: '### Microburst Criteria\n- Spatial scale: < 4 km diameter\n- Differential velocity: $\\Delta V > 15 \\text{ m/s (30 knots)}$ within 4 km\n- Warning threshold: Immediate wind shear advisory broadcast over ATIS.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[1]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-clim-601',
    code: 'MOES-CLIM-601',
    title: 'Earth System Modeling (IITM-ESM) & IPCC Climate Projection Scenarios',
    shortDescription: 'Coupled ocean-atmosphere-cryosphere modeling, CMIP6 diagnostic analysis, climate change scenarios (SSPs), and South Asian monsoon predictability.',
    fullDescription: 'Spearheaded by the Centre for Climate Change Research (CCCR) at IITM Pune, this masterclass delves into the architecture and operational deployment of India’s indigenous Earth System Model (IITM-ESM). The course covers oceanic mixing parameterizations, atmospheric dynamical cores, dynamic vegetation models, carbon cycle feedbacks, greenhouse forcing under CMIP6 Shared Socioeconomic Pathways (SSPs), and climate attribution for extreme heatwaves and droughts.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
    domain: 'Climate Modeling',
    targetAudience: 'Climate Scientists, Ph.D. Fellows, NCMRWF Modellers, and Ministry Policy Advisors',
    difficulty: 'Advanced',
    durationWeeks: 8,
    effortHours: 48,
    instructorName: 'Dr. Meenakshi Sundaram',
    instructorId: 'usr-trainer-03',
    instructorDesignation: 'Scientist-E, Centre for Climate Change Research, IITM Pune',
    instructorInstitution: 'IITM - Indian Institute of Tropical Meteorology, Pune',
    enrolledCount: 126,
    completionCount: 78,
    averageRating: 4.95,
    ratingCount: 31,
    tags: ['Climate Modeling', 'IITM-ESM', 'CMIP6', 'IPCC', 'Monsoon Predictability', 'Carbon Cycle'],
    syllabusHighlights: [
      'Architecture of IITM-ESM: Coupling NCEP CFSv2 atmospheric core with GFDL Modular Ocean Model (MOM4p1)',
      'Aerosol-cloud radiative interactions over the Indo-Gangetic basin and historical monsoon suppression',
      'CMIP6 multi-model ensemble analysis using CDO, NCO, and Python xarray libraries',
      'Downscaling global climate projections using CORDEX South Asia regional models',
      'Assessment of future changes in monsoon onset, active-break cycles, and extreme precipitation intensity'
    ],
    prerequisites: ['Atmospheric Dynamics', 'Physical Oceanography', 'High Performance Computing (Linux / MPI)'],
    status: 'active',
    quizId: 'quiz-clim-401',
    modules: [
      {
        id: 'mod-clim-1',
        title: 'Module 1: Ocean-Atmosphere Coupling & Feedback Mechanisms',
        description: 'Flux couplers, heat and momentum exchange across the air-sea boundary layer, and ocean heat uptake.',
        order: 1,
        lessons: [
          {
            id: 'les-clim-1',
            title: '1.1 Air-Sea Flux Coupling & MOM4p1 Dynamical Implementation',
            durationMinutes: 58,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            transcript: 'In this technical lecture, we investigate the mathematical formulation of momentum, sensible heat, and latent heat flux exchanges through the surface boundary layer in coupled climate configurations...',
            notesMarkdown: '### Air-Sea Momentum Flux\n$\\vec{\\tau} = \\rho_a C_D |\\vec{u}_{10} - \\vec{u}_{ocean}| (\\vec{u}_{10} - \\vec{u}_{ocean})$\nAccurate representation of surface current velocity in drag formulation avoids overestimating wind stress.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[2]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-agri-204',
    code: 'MOES-AGRI-204',
    title: 'Operational Agrometeorological Advisory Services (GKMS) & Microclimate',
    shortDescription: 'District and block-level agromet bulletin preparation, crop weather calendars, soil moisture water balance, and farm-level early warning dissemination.',
    fullDescription: 'Operated under the Gramin Krishi Mausam Sewa (GKMS) scheme of the Ministry of Earth Sciences and IMD. This course equips agrometeorologists, agricultural extension officers, and District Agromet Units (DAMUs) with operational skills to convert numerical weather forecasts into actionable farming advisories. Topics include reference evapotranspiration (Penman-Monteith), growing degree days, crop pest and disease microclimate forecasting, heat stress mitigation, and SMS/Meghdoot app advisory dissemination.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    domain: 'Meteorology',
    targetAudience: 'District Agromet Unit (DAMU) Specialists, KVK Scientists, Agrimet Observers',
    difficulty: 'Foundation',
    durationWeeks: 4,
    effortHours: 24,
    instructorName: 'Dr. Meenakshi Sundaram',
    instructorId: 'usr-trainer-03',
    instructorDesignation: 'Scientist-E, IITM & Agromet Advisory Liaison',
    instructorInstitution: 'IITM - Indian Institute of Tropical Meteorology, Pune',
    enrolledCount: 220,
    completionCount: 180,
    averageRating: 4.82,
    ratingCount: 54,
    tags: ['Agricultural Meteorology', 'GKMS', 'Agromet', 'Evapotranspiration', 'Crop Advisory'],
    syllabusHighlights: [
      'National Agrometeorological Observing Network and Automated Weather Station (AWS) sensors',
      'Estimation of Reference Evapotranspiration (ETo) using the FAO-56 Penman-Monteith methodology',
      'Thermal time and Growing Degree Days (GDD) calculation for major Kharif and Rabi crop varieties',
      'Predictive models for pest and disease outbreaks triggered by high relative humidity and leaf wetness',
      'Formulation of bi-weekly agro-bulletins and mobile dissemination via Meghdoot & Kisan Portal'
    ],
    prerequisites: ['Basic Meteorology or Agronomy'],
    status: 'active',
    quizId: 'quiz-agri-101',
    modules: [
      {
        id: 'mod-agri-1',
        title: 'Module 1: Soil-Plant-Atmosphere Water Balance & Agro-Advisories',
        description: 'Crop coefficients (Kc), soil field capacity, water deficit stress, and advisory writing.',
        order: 1,
        lessons: [
          {
            id: 'les-agri-1',
            title: '1.1 Evapotranspiration Calculations & Irrigation Scheduling',
            durationMinutes: 44,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            transcript: 'This lesson covers the daily soil moisture balance equation, combining precipitation forecasts with crop evapotranspiration needs to issue precise irrigation advisories to farmers...',
            notesMarkdown: '### Crop Evapotranspiration Equation\n$ET_c = K_c \\times ET_0$\nWhere $K_c$ varies across initial, development, mid-season, and late-season crop phenological growth stages.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[3]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-deep-505',
    code: 'MOES-DEEP-505',
    title: 'Deep Ocean Mission: Submersible Instrumentation & Hydrothermal Mapping',
    shortDescription: 'Engineering systems of the 6000m manned submersible (Matsya 6000), deep-sea acoustic positioning, hydrothermal vent robotics, and ocean mining.',
    fullDescription: 'Administered under the prestigious Deep Ocean Mission by the National Institute of Ocean Technology (NIOT Chennai) and INCOIS. This state-of-the-art training program covers deep-sea technological systems designed for exploring depths up to 6,000 meters. Modules encompass titanium human pressure sphere design, syntactic foam buoyancy, ultra-short baseline (USBL) acoustics, multi-beam swath bathymetry, autonomous underwater vehicles (AUVs), and deep-sea benthic ecosystem conservation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    domain: 'Ocean Sciences',
    targetAudience: 'Marine Engineers, Oceanographers, NIOT Scientific Staff, Deep Sea Exploration Cadre',
    difficulty: 'Advanced',
    durationWeeks: 6,
    effortHours: 36,
    instructorName: 'Dr. K. Radhakrishnan',
    instructorId: 'usr-trainer-02',
    instructorDesignation: 'Scientist-F & Director, INCOIS & Deep Ocean Mission Mentor',
    instructorInstitution: 'INCOIS - Indian National Centre for Ocean Information Services',
    enrolledCount: 140,
    completionCount: 95,
    averageRating: 4.92,
    ratingCount: 39,
    tags: ['Deep Ocean Mission', 'Matsya 6000', 'NIOT', 'Submersible', 'Acoustic Positioning', 'Hydrothermal Vents'],
    syllabusHighlights: [
      'Engineering architecture of the Matsya 6000 titanium pressure hull and emergency life support systems',
      'Deep ocean hydrostatic pressure mechanics: Materials, syntactic foams, and viewport design for 600 bar',
      'Ultra-Short Baseline (USBL) acoustic positioning and underwater telemetry modems',
      'Multi-sensor hydrothermal plume prospecting: Optical backscatter, redox potential (Eh), and methane sniffers',
      'Environmental Impact Assessment (EIA) protocols for polymetallic nodule exploration in the Central Indian Ocean'
    ],
    prerequisites: ['Marine Engineering or Physical Oceanography Fundamentals'],
    status: 'active',
    quizId: 'quiz-deep-301',
    modules: [
      {
        id: 'mod-deep-1',
        title: 'Module 1: Human-Occupied Vehicles (HOV) & Extreme Pressure Engineering',
        description: 'Life support systems, oxygen replenishment, CO2 scrubbers, and acoustic underwater navigation.',
        order: 1,
        lessons: [
          {
            id: 'les-deep-1',
            title: '1.1 Titanium Pressure Hull Design & Life Support Systems for 6000m Depth',
            durationMinutes: 54,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            transcript: 'Welcome to this specialized module on deep submersible engineering. In this lecture, we review the structural stress analysis of the 2.1m diameter Ti-6Al-4V ELI titanium sphere under 60 MPa hydrostatic pressure...',
            notesMarkdown: '### Hydrostatic Pressure Formula\n$P = \\rho g h \\approx 1025 \\times 9.81 \\times 6000 \\approx 60.3 \\text{ MPa (603 bar)}$\nA minimum safety factor of 1.5 is maintained under International Classification Society (DNV/ABS) standards.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[4]]
          }
        ]
      }
    ]
  },
  {
    id: 'course-seis-308',
    code: 'MOES-SEIS-308',
    title: 'Operational Seismological Network & Earthquake Early Warning Systems',
    shortDescription: 'National broadband seismic network operations, P-wave detection algorithms, automated epicentral location (SeisComP3), and ShakeMap generation.',
    fullDescription: 'Conducted under the National Centre for Seismology (NCS), Ministry of Earth Sciences, New Delhi. This operational course trains seismic observers and geophysicists in maintaining the National Seismological Network of over 160 real-time broadband seismic stations. Participants learn digital signal processing of seismic waveforms, automated P-wave and S-wave arrival picking, Richter and Moment Magnitude calculations, focal mechanism solutions, and rapid ShakeMap generation for disaster responders.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80',
    domain: 'Geosciences',
    targetAudience: 'National Centre for Seismology Observers, Geophysicists, Disaster Management Cell Officers',
    difficulty: 'Intermediate',
    durationWeeks: 5,
    effortHours: 30,
    instructorName: 'Dr. Rajesh Sharma',
    instructorId: 'usr-admin-01',
    instructorDesignation: 'Director (HRD & Training), MoES HQ & NCS Liaison',
    instructorInstitution: 'MoES - Ministry of Earth Sciences HQ',
    enrolledCount: 162,
    completionCount: 124,
    averageRating: 4.88,
    ratingCount: 46,
    tags: ['Seismology', 'Earthquake', 'NCS', 'SeisComP3', 'ShakeMap', 'Plate Tectonics'],
    syllabusHighlights: [
      'Broadband seismometer and strong motion accelerometer hardware installation and GPS timing synchronization',
      'Real-time data telemetry via VSAT and cellular networks to the National Seismological Central Receiving Station',
      'Automated phase picking using Short-Term Average / Long-Term Average (STA/LTA) and AIC algorithms',
      'Epicentral location determination using iterative Geiger method and 1D/3D velocity models (IASP91 / AK135)',
      'Automated generation of instrumental ground shaking maps (ShakeMap) within 10 minutes of major earthquakes'
    ],
    prerequisites: ['Basic Geophysics or Physics'],
    status: 'active',
    quizId: 'quiz-seis-201',
    modules: [
      {
        id: 'mod-seis-1',
        title: 'Module 1: Seismic Wave Propagation & Automated Network Detection',
        description: 'P and S phase picking, instrument response deconvolution, and automated alert triggering.',
        order: 1,
        lessons: [
          {
            id: 'les-seis-1',
            title: '1.1 Broadband Seismometry & Real-Time STA/LTA Phase Picking',
            durationMinutes: 50,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            transcript: 'In this operational lecture, we investigate how the National Seismological Network processes telemetry feeds from 160 stations, applying recursive STA/LTA energy detectors to register microseisms and tectonic rupture events...',
            notesMarkdown: '### STA/LTA Triggering Logic\n$\\text{Ratio} = \\frac{\\text{STA}}{\\text{LTA}} > \\text{Threshold (typically 3.5)}$\nWhen more than 4 coincident triggers occur across neighboring stations within a travel-time window, an automated alert sequence begins.',
            isCompleted: false,
            materials: [ADDITIONAL_STUDY_MATERIALS[5]]
          }
        ]
      }
    ]
  }
];
