import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial, MaterialType } from '../../types';
import { downloadStudyMaterialDoc } from '../../utils/fileDownloader';
import { 
  UploadCloud, 
  Search, 
  Filter, 
  FileText, 
  Video, 
  FileSpreadsheet, 
  Code, 
  Download, 
  Trash2, 
  Plus, 
  X, 
  Eye, 
  CheckCircle,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

export const ContentManagement: React.FC = () => {
  const { currentUser, studyMaterials, addStudyMaterial, deleteStudyMaterial } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'pdf' as MaterialType,
    subjectDomain: 'Radar Meteorology',
    durationOrPages: '45 Pages',
    fileSize: '8.4 MB',
    fileUrl: '#sample-resource.pdf',
    tagsString: 'DWR, Reflectivity, SOP',
    description: ''
  });

  const filteredMaterials = studyMaterials.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subjectDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || m.type === selectedType;

    return matchesSearch && matchesType;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.subjectDomain) return;

    const tags = uploadForm.tagsString.split(',').map(s => s.trim()).filter(Boolean);

    addStudyMaterial({
      title: uploadForm.title,
      type: uploadForm.type,
      subjectDomain: uploadForm.subjectDomain,
      durationOrPages: uploadForm.durationOrPages,
      fileSize: uploadForm.fileSize,
      fileUrl: uploadForm.fileUrl,
      tags,
      description: uploadForm.description || 'Institutional training resource published under MoES/IMD guidelines.'
    });

    setUploadForm({
      title: '',
      type: 'pdf',
      subjectDomain: 'Radar Meteorology',
      durationOrPages: '45 Pages',
      fileSize: '8.4 MB',
      fileUrl: '#sample-resource.pdf',
      tagsString: 'DWR, Reflectivity, SOP',
      description: ''
    });

    setShowUploadModal(false);
  };

  const getTypeIcon = (type: MaterialType) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-rose-400" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-400" />;
      case 'presentation':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'dataset':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
      case 'code':
        return <Code className="w-4 h-4 text-cyan-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-purple-400" />
            Trainer Content Management & Subject Library
          </h2>
          <p className="text-xs text-slate-400">
            Upload, organize, and index scientific study materials (Videos, Presentations, SOP Handbooks, Datasets) across MoES domains.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources by title, domain (e.g. NWP, DWR), or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {['All', 'pdf', 'video', 'presentation', 'dataset', 'code'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedType === type
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map(mat => (
          <div
            key={mat.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 group transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-purple-300 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded">
                  {getTypeIcon(mat.type)}
                  {mat.type}
                </span>

                <span className="text-[11px] text-slate-500 font-mono">
                  {mat.fileSize}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                {mat.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {mat.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {mat.tags.map(t => (
                  <span key={t} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span>Subject Domain:</span>
                <strong className="text-slate-200">{mat.subjectDomain}</strong>
              </div>

              <div className="flex items-center justify-between">
                <span>Uploaded By:</span>
                <span className="text-slate-300">{mat.uploadedBy}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 text-[10px]">{mat.downloadCount} Downloads</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Preview Resource Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => downloadStudyMaterialDoc(mat.title, mat.subjectDomain, mat.uploadedBy)}
                    className="p-1 text-slate-400 hover:text-purple-400 transition-colors"
                    title="Download Asset"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteStudyMaterial(mat.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete Resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-purple-400" />
                Upload Resource to Subject Library
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S-Band Radar Volume Scan Calibration Manual"
                  value={uploadForm.title}
                  onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Resource Type</label>
                  <select
                    value={uploadForm.type}
                    onChange={e => setUploadForm({ ...uploadForm, type: e.target.value as MaterialType })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="pdf">PDF Handbook / Document</option>
                    <option value="video">Video Lecture (MP4)</option>
                    <option value="presentation">Presentation Deck (PPTX)</option>
                    <option value="dataset">Geospatial Dataset (NetCDF/CSV)</option>
                    <option value="code">Python / Jupyter Code</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Domain</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radar Meteorology / NWP / Tsunami"
                    value={uploadForm.subjectDomain}
                    onChange={e => setUploadForm({ ...uploadForm, subjectDomain: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 14.2 MB"
                    value={uploadForm.fileSize}
                    onChange={e => setUploadForm({ ...uploadForm, fileSize: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pages / Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 88 Pages or 45 mins"
                    value={uploadForm.durationOrPages}
                    onChange={e => setUploadForm({ ...uploadForm, durationOrPages: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Indexing Tags (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. DWR, Dual-Pol, Hydrometeor, SOP"
                  value={uploadForm.tagsString}
                  onChange={e => setUploadForm({ ...uploadForm, tagsString: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  placeholder="Syllabus alignment, operational objectives, guidelines..."
                  value={uploadForm.description}
                  onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              {/* Simulated file upload box */}
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center bg-slate-950/40">
                <UploadCloud className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-300">File Selected for Secure Storage Upload</p>
                <p className="text-[10px] text-slate-500">Target Bucket: gs://moes-capacity-connect-materials/</p>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-md"
                >
                  Publish to Subject Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Material Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                {getTypeIcon(previewMaterial.type)}
                Resource Metadata & Inspection
              </span>
              <button onClick={() => setPreviewMaterial(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">{previewMaterial.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{previewMaterial.description}</p>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain:</span>
                  <span className="text-slate-200">{previewMaterial.subjectDomain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Size & Volume:</span>
                  <span className="text-slate-200">{previewMaterial.fileSize} · {previewMaterial.durationOrPages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Uploader Faculty:</span>
                  <span className="text-purple-300">{previewMaterial.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Upload Date:</span>
                  <span className="text-slate-200">{previewMaterial.uploadDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => downloadStudyMaterialDoc(previewMaterial.title, previewMaterial.subjectDomain, previewMaterial.uploadedBy)}
                className="px-4 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resource</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
