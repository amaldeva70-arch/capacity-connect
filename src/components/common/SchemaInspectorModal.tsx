import React, { useState } from 'react';
import { SCHEMA_ENTITIES, SQL_DDL_SCRIPT, SchemaEntity } from '../../data/schemaModels';
import { Database, Table, Key, Copy, Check, X, FileCode2, Layers, CheckCircle2 } from 'lucide-react';

interface SchemaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaInspectorModal: React.FC<SchemaInspectorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'sql'>('tables');
  const [selectedTableName, setSelectedTableName] = useState<string>(SCHEMA_ENTITIES[0].tableName);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentEntity: SchemaEntity = SCHEMA_ENTITIES.find(t => t.tableName === selectedTableName) || SCHEMA_ENTITIES[0];

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_DDL_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[88vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">MoES Database Schema & Entity Architecture</h3>
              <p className="text-xs text-slate-400">PostgreSQL / Cloud SQL Relational DDL & Data Dictionary Models</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('tables')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'tables' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Data Dictionary
              </button>
              <button
                onClick={() => setActiveTab('sql')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'sql' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                SQL DDL Script
              </button>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        {activeTab === 'tables' ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar list of tables */}
            <div className="w-64 bg-slate-950/60 border-r border-slate-800 p-3 overflow-y-auto space-y-1 shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-500 px-2 tracking-wider block mb-1">
                Relational Tables ({SCHEMA_ENTITIES.length})
              </span>
              {SCHEMA_ENTITIES.map(table => (
                <button
                  key={table.tableName}
                  onClick={() => setSelectedTableName(table.tableName)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 ${
                    table.tableName === selectedTableName
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Table className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{table.tableName}</span>
                </button>
              ))}
            </div>

            {/* Table Details */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold font-mono text-white">
                    {currentEntity.tableName}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                    {currentEntity.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {currentEntity.fields.length} Fields
                  </span>
                </div>
                <p className="text-xs text-slate-400">{currentEntity.description}</p>
              </div>

              {/* Columns Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px]">
                    <tr className="border-b border-slate-800">
                      <th className="py-2.5 px-3">Field Name</th>
                      <th className="py-2.5 px-3">Data Type</th>
                      <th className="py-2.5 px-3">Constraints</th>
                      <th className="py-2.5 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {currentEntity.fields.map(field => (
                      <tr key={field.name} className="hover:bg-slate-850/40">
                        <td className="py-2.5 px-3 font-bold text-cyan-300">
                          {field.name}
                        </td>
                        <td className="py-2.5 px-3 text-purple-300 text-[11px]">
                          {field.type}
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-amber-300">
                          {field.constraints}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-xs text-slate-300">
                          {field.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Relationships & Indices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Foreign Keys & Relationships</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {currentEntity.relationships.map(rel => (
                      <li key={rel} className="flex items-center gap-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>{rel}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Index Optimizations</span>
                  <ul className="text-[11px] font-mono text-slate-400 space-y-1">
                    {currentEntity.indices.map(idx => (
                      <li key={idx} className="truncate">
                        {idx}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Production-ready PostgreSQL / Cloud SQL DDL Schema Script
              </span>
              <button
                onClick={handleCopySql}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              {SQL_DDL_SCRIPT}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-800/80 px-6 py-3 border-t border-slate-700 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Target Database: PostgreSQL 15+ / Google Cloud SQL Developer Edition</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
