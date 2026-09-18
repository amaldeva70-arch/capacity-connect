import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';
import { downloadCircularAttachment } from '../../utils/fileDownloader';
import { 
  Bell, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  Building2, 
  AlertCircle, 
  FileText, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const { announcements } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || ann.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Circular', 'Policy', 'Workshop', 'General'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-amber-400" />
          MoES Official Circulars & Capacity Building Notices
        </h2>
        <p className="text-xs text-slate-400">
          Official gazetted orders, training calendars, circulars, and announcements issued by the Ministry of Earth Sciences and IMD.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars by keyword, reference title, or authority..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredAnnouncements.map(ann => (
          <div
            key={ann.id}
            className={`bg-slate-900 border rounded-2xl p-6 transition-all hover:border-slate-700 space-y-3 ${
              ann.priority === 'urgent'
                ? 'border-rose-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/20'
                : ann.priority === 'featured'
                ? 'border-amber-500/30'
                : 'border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    ann.priority === 'urgent'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : ann.priority === 'featured'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {ann.category}
                </span>

                {ann.priority === 'urgent' && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                    Urgent Action
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {ann.publishedDate}
              </span>
            </div>

            <h3 className="text-base font-bold text-white leading-snug">
              {ann.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {ann.summary}
            </p>

            {ann.content && ann.content !== ann.summary && (
              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                {ann.content}
              </p>
            )}

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                Issuing Authority: <strong className="text-slate-300">{ann.issuingAuthority}</strong>
              </span>

              {ann.downloadAttachmentName && (
                <button
                  onClick={() => downloadCircularAttachment(ann.title, ann.issuingAuthority)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document ({ann.downloadAttachmentName})</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
