import React from 'react';
import { X, Printer, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    title: string;
    recipientName: string;
    employeeId: string;
    designation: string;
    institution: string;
    issuingAuthority: string;
    issueDate: string;
    gradeOrScore?: string;
  };
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col print:border-none print:shadow-none print:w-full print:max-w-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="bg-slate-800/90 px-6 py-3 border-b border-slate-700 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white">
              Official Institutional Training Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-slate-100 flex flex-col items-center text-center relative overflow-hidden print:bg-white print:text-slate-900 print:p-12">
          {/* Decorative Certificate Outer Border */}
          <div className="absolute inset-3 border-2 border-amber-500/40 rounded-xl pointer-events-none print:border-amber-700" />
          <div className="absolute inset-5 border border-dashed border-amber-500/30 rounded-lg pointer-events-none print:border-amber-600/40" />

          {/* Institutional Top Crest */}
          <div className="space-y-1 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-serif font-black text-xl shadow-lg border-2 border-amber-300 mb-2">
              MoES
            </div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 print:text-amber-800">
              GOVERNMENT OF INDIA · MINISTRY OF EARTH SCIENCES
            </p>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white print:text-slate-900 tracking-wide">
              CAPACITY CONNECT ACADEMY
            </h2>
            <p className="text-[11px] text-slate-400 print:text-slate-600">
              India Meteorological Department (IMD) · National Training Framework
            </p>
          </div>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2" />

          <p className="text-xs font-serif italic text-slate-300 print:text-slate-600 mt-4 mb-2">
            This is to officially certify that
          </p>

          {/* Recipient */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 print:text-amber-900 tracking-wider">
            {certificate.recipientName}
          </h3>

          <p className="text-xs text-slate-300 print:text-slate-700 font-medium mt-1">
            {certificate.designation} · {certificate.institution}
          </p>
          <p className="text-[11px] text-slate-400 print:text-slate-500 font-mono">
            Employee Cadre ID: {certificate.employeeId}
          </p>

          <p className="text-xs text-slate-300 print:text-slate-600 max-w-lg mx-auto mt-4 leading-relaxed">
            has successfully fulfilled all institutional coursework requirements, practical simulations, and rigorous examination thresholds for the specialized program:
          </p>

          {/* Program Title */}
          <div className="my-5 px-6 py-3 bg-slate-800/80 print:bg-slate-100 rounded-xl border border-amber-500/30 max-w-xl">
            <h4 className="text-base sm:text-lg font-bold text-cyan-300 print:text-blue-900">
              {certificate.title}
            </h4>
            {certificate.gradeOrScore && (
              <span className="text-xs text-emerald-400 print:text-emerald-700 font-semibold mt-1 inline-block">
                Evaluated Score: {certificate.gradeOrScore}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 w-full max-w-xl text-left gap-4 text-xs mt-6 pt-6 border-t border-slate-800 print:border-slate-300">
            <div>
              <p className="text-[10px] text-slate-400 print:text-slate-500 uppercase">Issuing Authority</p>
              <p className="font-semibold text-slate-200 print:text-slate-800 text-[11px]">
                {certificate.issuingAuthority}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 print:text-emerald-700 font-bold bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">
                Date: {certificate.issueDate}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 print:text-slate-500 uppercase">Authorized Signature</p>
              <p className="font-serif italic font-bold text-amber-300 print:text-slate-800 text-sm">
                Dr. Rajesh Sharma
              </p>
              <p className="text-[10px] text-slate-400 print:text-slate-600">
                Director (HRD & Training), MoES
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
