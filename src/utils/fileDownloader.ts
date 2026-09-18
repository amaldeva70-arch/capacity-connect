/**
 * Utility to generate and trigger real downloadable files for MoES / IMD materials,
 * circulars, and official training certificates.
 */

export const triggerBlobDownload = (
  filename: string,
  content: string,
  mimeType: string = 'application/pdf'
) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

export const downloadStudyMaterialDoc = (title: string, domain: string, uploadedBy: string) => {
  const cleanTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanTitle}_MoES_Training_Document.txt`;
  
  const content = `================================================================================
MINISTRY OF EARTH SCIENCES (MoES) - GOVERNMENT OF INDIA
INDIA METEOROLOGICAL DEPARTMENT (IMD) / NATIONAL CENTRES (NCMRWF, INCOIS, IITM, NIOT)
CAPACITY CONNECT · DIGITAL LEARNING & COMPETENCY PORTAL
================================================================================

DOCUMENT TITLE: ${title}
SUBJECT DOMAIN: ${domain}
ISSUING FACULTY: ${uploadedBy}
DATE OF EXTRACTION: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
DOCUMENT VERIFICATION HASH: MOES-AUTH-${Math.random().toString(36).substring(2, 10).toUpperCase()}-RTC

--------------------------------------------------------------------------------
EXECUTIVE OVERVIEW & OPERATIONAL CONTEXT
--------------------------------------------------------------------------------
This official training resource is part of the capacity building curriculum
mandated under the Ministry of Earth Sciences and Mission Mausam frameworks.
All content follows World Meteorological Organization (WMO) Basic Instruction
Package for Meteorologists (BIP-M) standards.

OPERATIONAL PRINCIPLES:
1. Adherence to Standard Operating Procedures (SOPs) for atmospheric and oceanic observation.
2. Calibration verification of dual-polarimetric, satellite, and oceanic instrumentation.
3. Rapid dissemination of hazard early warnings to national & state disaster management authorities.

--------------------------------------------------------------------------------
SYLLABUS & CURRICULUM CHAPTERS
--------------------------------------------------------------------------------
- Section 1: Fundamental Governing Equations & Physical Boundary Conditions
- Section 2: Sensor Calibration, Noise Reduction & Quality Control Flags
- Section 3: Operational Analysis, Synoptic Nowcasting & Early Warning Dissemination
- Section 4: Mission Mausam Integration & Machine Learning Ensembles
- Section 5: Real-World Case Studies & Post-Disaster Diagnostic Verification

--------------------------------------------------------------------------------
OFFICIAL CERTIFICATION NOTICE
--------------------------------------------------------------------------------
For official validation, query this document reference on the MoES CAPACITY CONNECT Portal.
Authorized by: Central Training Institute (CTI), Pashan, Pune / MoES HQ, New Delhi.
================================================================================
`;

  triggerBlobDownload(filename, content, 'text/plain;charset=utf-8');
};

export const downloadCircularAttachment = (circularTitle: string, authority: string) => {
  const cleanTitle = circularTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanTitle}_Official_Circular.txt`;

  const content = `================================================================================
GOVERNMENT OF INDIA · MINISTRY OF EARTH SCIENCES (MoES)
PRITHVI BHAVAN, LODHI ROAD, NEW DELHI - 110003
CAPACITY BUILDING & HUMAN RESOURCE DEVELOPMENT DIVISION
================================================================================

NOTIFICATION / CIRCULAR: ${circularTitle}
ISSUING AUTHORITY: ${authority}
PUBLISHED: ${new Date().toISOString().split('T')[0]}
FILE REFERENCE: MoES/HRD/CB/2026/CIR-${Math.floor(1000 + Math.random() * 9000)}

SUBJECT: OFFICIAL TRAINING DIRECTIVE & CAPACITY BUILDING MANDATE

1. All concerned Directors, Officers-in-Charge, and Head of Regional Meteorological
   Centres (RMCs) and Autonomous Research Institutes (NCMRWF, INCOIS, IITM, NIOT, NCPOR)
   are requested to take cognizance of the enclosed training schedules.

2. Officer trainees must register their updated competencies and academic credentials
   on the CAPACITY CONNECT Portal.

3. Attendance in nominated modules is mandatory in accordance with the National Capacity
   Commission guidelines for Central Government Scientific Cadres.

By Order of the Competent Authority,
Director (HRD & Training),
Ministry of Earth Sciences, New Delhi
================================================================================
`;

  triggerBlobDownload(filename, content, 'text/plain;charset=utf-8');
};
