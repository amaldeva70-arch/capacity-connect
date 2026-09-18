import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, UserStatus, User } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  Filter, 
  Check, 
  X, 
  AlertTriangle, 
  UserCheck, 
  Building2, 
  Clock, 
  Award,
  KeyRound
} from 'lucide-react';

export const UserManagementView: React.FC = () => {
  const { allUsers, updateUserRole, updateUserStatus, verifyUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const pendingCount = allUsers.filter(u => u.status === 'pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            User Management & Role-Based Access Control (RBAC)
          </h2>
          <p className="text-xs text-slate-400">
            Verify official identity records, grant instructional authorizations, and govern access permissions across MoES centers.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{pendingCount} Officer Accounts Pending Institutional Verification</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by officer name, employee ID (e.g. MOES-), center, or post..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Roles</option>
            <option value="trainee">Trainee Officers</option>
            <option value="trainer">Trainer Faculty</option>
            <option value="admin">System Administrators</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending Approval</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* User Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider bg-slate-950/40">
                <th className="py-3 px-4">Officer Details</th>
                <th className="py-3 px-4">Center / Cadre</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Security Status</th>
                <th className="py-3 px-4 text-right">Verification & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-850/60 transition-colors">
                  {/* Officer Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                        alt={user.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-xs">{user.name}</p>
                        <span className="text-[10px] font-mono text-cyan-400">{user.employeeId}</span>
                        <span className="text-[10px] text-slate-500 block">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Institution */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-200">{user.institution.split(' - ')[0]}</p>
                    <span className="text-[10px] text-slate-400">{user.designation}</span>
                    <span className="text-[9px] text-slate-500 block">{user.stationOrLocation}</span>
                  </td>

                  {/* Role Selector */}
                  <td className="py-3.5 px-4">
                    <select
                      value={user.role}
                      onChange={e => updateUserRole(user.id, e.target.value as UserRole)}
                      className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 font-semibold focus:outline-none focus:border-cyan-500"
                    >
                      <option value="trainee">Trainee</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        user.status === 'verified'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                          : user.status === 'pending'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60 animate-pulse'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === 'pending' && (
                        <button
                          onClick={() => verifyUser(user.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors shadow-sm"
                          title="Approve Government Credentials"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      )}

                      {user.status === 'verified' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'suspended')}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 border border-slate-700 text-[10px] font-medium transition-colors"
                          title="Suspend Access"
                        >
                          Suspend
                        </button>
                      )}

                      {user.status === 'suspended' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'verified')}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-400 hover:text-emerald-300 border border-slate-700 text-[10px] font-medium transition-colors"
                          title="Reinstate Access"
                        >
                          Reinstate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
