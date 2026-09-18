import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  Upload, 
  Check, 
  X, 
  FileText, 
  Printer, 
  Share2, 
  ExternalLink,
  Tag,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const TraineeProfileBuilder: React.FC = () => {
  const {
    currentUser,
    updateTraineeProfile,
    addQualification,
    removeQualification,
    addExperience,
    removeExperience,
    addSkill,
    removeSkill,
    uploadCertificate,
    removeCertificate
  } = useApp();

  // Modal states for additions
  const [showAddQual, setShowAddQual] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showUploadCert, setShowUploadCert] = useState(false);
  const [previewCert, setPreviewCert] = useState<any | null>(null);

  // Form states
  const [qualForm, setQualForm] = useState({
    degree: '',
    field: '',
    institution: '',
    yearOfCompletion: 2022,
    gradePercentage: ''
  });

  const [expForm, setExpForm] = useState({
    designation: '',
    organization: '',
    division: '',
    startDate: '',
    endDate: '',
    isCurrent: true,
    description: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Meteorology' as any,
    proficiency: 'Intermediate' as any
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuingAuthority: 'IMD Central Training Institute (CTI), Pashan',
    issueDate: new Date().toISOString().split('T')[0],
    credentialUrl: ''
  });

  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const cleanTag = newTagInput.trim();
    if (!currentUser.interests.includes(cleanTag)) {
      updateTraineeProfile({
        interests: [...currentUser.interests, cleanTag]
      });
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateTraineeProfile({
      interests: currentUser.interests.filter(t => t !== tagToRemove)
    });
  };

  const submitQualification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualForm.degree || !qualForm.institution) return;
    addQualification(qualForm);
    setQualForm({ degree: '', field: '', institution: '', yearOfCompletion: 2022, gradePercentage: '' });
    setShowAddQual(false);
  };

  const submitExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.designation || !expForm.organization) return;
    addExperience(expForm);
    setExpForm({ designation: '', organization: '', division: '', startDate: '', endDate: '', isCurrent: true, description: '' });
    setShowAddExp(false);
  };

  const submitSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) return;
    addSkill(skillForm);
    setSkillForm({ name: '', category: 'Meteorology', proficiency: 'Intermediate' });
    setShowAddSkill(false);
  };

  const submitCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title) return;
    uploadCertificate({
      ...certForm,
      fileSize: '2.4 MB'
    });
    setCertForm({ title: '', issuingAuthority: 'IMD Central Training Institute (CTI), Pashan', issueDate: new Date().toISOString().split('T')[0], credentialUrl: '' });
    setShowUploadCert(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile Identity Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
              />
              {currentUser.status === 'verified' ? (
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow" title="Verified MoES Personnel">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              ) : (
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow" title="Pending Verification">
                  <Clock className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">
                  {currentUser.name}
                </h2>
                <span className="text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700 px-2.5 py-0.5 rounded-md">
                  {currentUser.employeeId}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${
                    currentUser.status === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {currentUser.status === 'verified' ? 'Verified Officer' : 'Pending Verification'}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-300">
                {currentUser.designation}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {currentUser.institution}
                </span>
                <span>•</span>
                <span>{currentUser.stationOrLocation}</span>
                <span>•</span>
                <span>{currentUser.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 w-full md:w-auto">
            <div className="bg-slate-850 border border-slate-800 rounded-xl p-3 text-right w-full sm:w-auto">
              <span className="text-[11px] text-slate-400 block">Training Portfolio</span>
              <span className="text-lg font-bold text-white">
                {currentUser.completedCourseIds.length} <span className="text-xs font-normal text-slate-400">Completed</span> / {currentUser.enrolledCourseIds.length} <span className="text-xs font-normal text-slate-400">Enrolled</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bio / Overview */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Operational Summary & Current Posting Duties
          </label>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
            {currentUser.bio || 'No operational summary provided yet. Update your profile to describe your duties.'}
          </p>
        </div>
      </div>

      {/* Section 1: Interest Tags & Scientific Domains */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              Scientific Domain & Interest Tags
            </h3>
            <p className="text-xs text-slate-400">
              Interest tags help the MoES Competency Mapping Engine recommend specialized technical workshops.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentUser.interests.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/70 text-cyan-300 border border-cyan-800/60 rounded-lg text-xs font-medium"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-rose-400 text-cyan-400/60 transition-colors"
                title="Remove tag"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <div className="inline-flex items-center gap-1">
            <input
              type="text"
              placeholder="+ Add interest tag..."
              value={newTagInput}
              onChange={e => setNewTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddTag()}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36"
            />
            {newTagInput && (
              <button
                onClick={handleAddTag}
                className="p-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Competency Skill Repository */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Competency Skill Repository
            </h3>
            <p className="text-xs text-slate-400">
              Verified skills logged in the MoES National Meteorological & Earth Science Competency Framework.
            </p>
          </div>
          <button
            onClick={() => setShowAddSkill(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Competency Skill</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentUser.skills.map(skill => (
            <div
              key={skill.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between space-y-2 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">{skill.category}</span>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400">
                  Level: <strong className="text-cyan-300">{skill.proficiency}</strong>
                </span>
                {skill.verified ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    <Check className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Self-Assessed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Academic Qualifications */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Academic Qualifications
            </h3>
            <p className="text-xs text-slate-400">
              Degrees and educational credentials registered in service record.
            </p>
          </div>
          <button
            onClick={() => setShowAddQual(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Qualification</span>
          </button>
        </div>

        <div className="divide-y divide-slate-800">
          {currentUser.qualifications.map(qual => (
            <div key={qual.id} className="py-3.5 flex items-start justify-between gap-4 group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{qual.degree}</h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.2 rounded border border-cyan-800/40">
                    {qual.yearOfCompletion}
                  </span>
                  {qual.gradePercentage && (
                    <span className="text-xs text-slate-400">({qual.gradePercentage})</span>
                  )}
                </div>
                <p className="text-xs text-slate-300">{qual.institution}</p>
                <p className="text-[11px] text-slate-500">Specialization: {qual.field}</p>
              </div>

              <button
                onClick={() => removeQualification(qual.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1.5"
                title="Delete qualification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {currentUser.qualifications.length === 0 && (
            <p className="text-xs text-slate-500 py-4 italic">No academic qualifications listed yet.</p>
          )}
        </div>
      </div>

      {/* Section 4: Work Experience & Postings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Work Experience & Operational Postings
            </h3>
            <p className="text-xs text-slate-400">
              Chronological records of station postings, observational duties, and institutional tenures.
            </p>
          </div>
          <button
            onClick={() => setShowAddExp(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-3">
          {currentUser.experience.map(exp => (
            <div
              key={exp.id}
              className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-sm font-bold text-white">{exp.designation}</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {exp.organization}
                  </span>
                  {exp.isCurrent && (
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Present Posting
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-400">{exp.division}</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>From {exp.startDate} {exp.isCurrent ? 'to Present' : `to ${exp.endDate}`}</span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-300 pt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>

              <button
                onClick={() => removeExperience(exp.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1.5 shrink-0"
                title="Delete posting record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Certificate Uploads & Verification */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Certificates & Capacity Credentials
            </h3>
            <p className="text-xs text-slate-400">
              Uploaded diplomas, workshop accreditations, and official MoES program completion certificates.
            </p>
          </div>
          <button
            onClick={() => setShowUploadCert(true)}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUser.certificates.map(cert => (
            <div
              key={cert.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cert.title}
                  </h4>
                  {cert.verifiedByAdmin ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      Admin Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40 shrink-0">
                      <Clock className="w-3 h-3" />
                      Pending Audit
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Authority: <strong className="text-slate-300">{cert.issuingAuthority}</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Issued: {cert.issueDate}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Official Certificate</span>
                </button>

                <button
                  onClick={() => removeCertificate(cert.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  title="Remove certificate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {currentUser.certificates.length === 0 && (
            <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-800 rounded-xl">
              <Award className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No certificates uploaded yet.</p>
              <p className="text-[11px] text-slate-500">Upload your training credentials for institutional verification.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Qualification */}
      {showAddQual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Academic Qualification</h3>
              <button onClick={() => setShowAddQual(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitQualification} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Diploma *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M.Sc. Physics (Atmospheric Studies)"
                  value={qualForm.degree}
                  onChange={e => setQualForm({ ...qualForm, degree: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Field / Major *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meteorology / Geophysics / Ocean Sciences"
                  value={qualForm.field}
                  onChange={e => setQualForm({ ...qualForm, field: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">University / Institution *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IIT Delhi / Pune University / CUSAT"
                  value={qualForm.institution}
                  onChange={e => setQualForm({ ...qualForm, institution: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Passing Year</label>
                  <input
                    type="number"
                    min="1970"
                    max="2030"
                    value={qualForm.yearOfCompletion}
                    onChange={e => setQualForm({ ...qualForm, yearOfCompletion: parseInt(e.target.value) || 2022 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Grade / CGPA</label>
                  <input
                    type="text"
                    placeholder="e.g. 84.5% or 8.8 CGPA"
                    value={qualForm.gradePercentage}
                    onChange={e => setQualForm({ ...qualForm, gradePercentage: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddQual(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
                >
                  Save Qualification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Experience */}
      {showAddExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Posting / Work Experience</h3>
              <button onClick={() => setShowAddExp(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitExperience} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scientific Assistant - Gr. I / Meteorologist"
                  value={expForm.designation}
                  onChange={e => setExpForm({ ...expForm, designation: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. India Meteorological Department (IMD) / NCMRWF"
                  value={expForm.organization}
                  onChange={e => setExpForm({ ...expForm, organization: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Division / Station</label>
                <input
                  type="text"
                  placeholder="e.g. Radar & Nowcasting Cell, RMC Pune"
                  value={expForm.division}
                  onChange={e => setExpForm({ ...expForm, division: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={expForm.startDate}
                    onChange={e => setExpForm({ ...expForm, startDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    disabled={expForm.isCurrent}
                    value={expForm.endDate}
                    onChange={e => setExpForm({ ...expForm, endDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white disabled:opacity-40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCurrentExp"
                  checked={expForm.isCurrent}
                  onChange={e => setExpForm({ ...expForm, isCurrent: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-600 focus:ring-0"
                />
                <label htmlFor="isCurrentExp" className="text-xs text-slate-300">
                  This is my current posting
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description of Duties</label>
                <textarea
                  rows={2}
                  placeholder="Operational responsibilities, calibration tasks, radar watches..."
                  value={expForm.description}
                  onChange={e => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddExp(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
                >
                  Save Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Competency Skill */}
      {showAddSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Competency Skill</h3>
              <button onClick={() => setShowAddSkill(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Doppler Weather Radar, WRF Model, Argo Float"
                  value={skillForm.name}
                  onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Domain Category</label>
                <select
                  value={skillForm.category}
                  onChange={e => setSkillForm({ ...skillForm, category: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="Meteorology">Meteorology</option>
                  <option value="Oceanography">Oceanography</option>
                  <option value="Computing & AI">Computing & AI</option>
                  <option value="Instrumentation">Instrumentation</option>
                  <option value="Forecasting">Forecasting</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Self-Assessed Proficiency</label>
                <select
                  value={skillForm.proficiency}
                  onChange={e => setSkillForm({ ...skillForm, proficiency: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSkill(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
                >
                  Add Skill Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Upload Certificate */}
      {showUploadCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Upload Training Certificate</h3>
              <button onClick={() => setShowUploadCert(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitCert} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Certificate Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Doppler Weather Radar Workshop"
                  value={certForm.title}
                  onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IMD Central Training Institute (CTI) / WMO / INCOIS"
                  value={certForm.issuingAuthority}
                  onChange={e => setCertForm({ ...certForm, issuingAuthority: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Date</label>
                <input
                  type="date"
                  required
                  value={certForm.issueDate}
                  onChange={e => setCertForm({ ...certForm, issueDate: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              {/* Simulated File Dropzone */}
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-xl p-5 text-center bg-slate-950/40 cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-300">Click to attach PDF / Scanned Copy</p>
                <p className="text-[10px] text-slate-500">Supported: PDF, JPG, PNG (Max 15MB)</p>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadCert(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Official Certificate Preview & Print */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Official Capacity Building Credential
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Diploma Certificate Layout */}
            <div className="p-8 bg-gradient-to-b from-amber-50 to-stone-100 text-slate-900 relative border-8 border-amber-900/20 m-4 rounded-xl shadow-inner">
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 bg-amber-950/10 border border-amber-900/30 rounded-full text-[11px] font-serif uppercase tracking-widest text-amber-900 font-bold">
                  Government of India · Ministry of Earth Sciences
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900">
                  Certificate of Capacity Competence
                </h2>
                <p className="text-xs text-slate-600 font-serif italic">
                  Awarded under the National Earth Science Capacity Building & Training Framework
                </p>
              </div>

              <div className="my-8 text-center space-y-3">
                <p className="text-xs font-serif uppercase text-slate-500 tracking-wider">
                  This is to certify that
                </p>
                <p className="text-2xl font-serif font-bold text-slate-950 underline decoration-amber-600 underline-offset-8">
                  {currentUser.name}
                </p>
                <p className="text-xs font-sans text-slate-600 font-medium">
                  {currentUser.designation} · {currentUser.institution}
                </p>
                <p className="text-xs font-serif text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
                  has successfully undergone and demonstrated operational competence in
                </p>
                <p className="text-base font-serif font-bold text-amber-950 bg-amber-100/60 border border-amber-300/60 py-2 px-4 rounded-lg inline-block shadow-sm">
                  {previewCert.title}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-900/20 grid grid-cols-3 items-end text-center text-[11px] font-serif text-slate-700">
                <div>
                  <p className="font-mono text-[10px] text-slate-500">ID: {previewCert.id}</p>
                  <p className="font-bold">Date: {previewCert.issueDate}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-800/40 flex items-center justify-center font-bold text-amber-900 text-[10px] bg-amber-200/50 shadow-sm mb-1">
                    MoES SEAL
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Official Verification</span>
                </div>
                <div>
                  <p className="font-serif italic font-bold">Director (HRD & Training)</p>
                  <p className="text-[10px] text-slate-600">Ministry of Earth Sciences, New Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
