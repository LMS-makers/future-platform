import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Users, Shield, UserCheck, X, Loader2, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { adminApi, type AddUserPayload, type UpdateUserPayload, type CreateStudentPayload } from '../../api/adminApi';
import type { AdminUser } from '../../types/auth.types';

const ITEMS_PER_PAGE = 5;

const roleBadge: Record<string, { bg: string; text: string; dot: string }> = {
  admin: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  doctor: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  student: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

const defaultBadge = { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' };

const initialCreateForm = {
  full_name: '',
  email: '',
  role: 'student',
  password: '',
  national_id: '',
  date_of_birth: '',
  phone: '',
  address: '',
  gender: '' as '' | 'male' | 'female',
  student_code: '',
  department: '' as '' | 'cs' | 'is' | 'it' | 'general',
  level: '' as '' | '1' | '2' | '3' | '4',
  semester: '' as '' | '1' | '2',
  completed_credit_hours: '',
  gpa: '',
  cgpa: '',
  high_school_type: '' as '' | 'science_section' | 'mathematics_section' | 'general_section',
  high_school_score: '',
  high_school_degree: '',
  high_school_year: '',
};

export default function UserTable() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<Partial<AdminUser> & { password?: string }>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getAllUsers();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const fullName = (u.full_name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const matchSearch = !search || fullName.includes(q) || email.includes(q);
    const matchStatus = !statusFilter || (u.role || '').toLowerCase() === statusFilter.toLowerCase();
    const matchDept = !deptFilter || (u.gender || '') === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    const missing: string[] = [];
    if (!createForm.full_name.trim()) missing.push('Full Name');
    if (!createForm.email.trim()) missing.push('Email');
    if (!createForm.password.trim()) missing.push('Password');
    if (!createForm.national_id.trim()) missing.push('National ID');
    if (!createForm.date_of_birth.trim()) missing.push('Date of Birth');
    if (!createForm.phone.trim()) missing.push('Phone');
    if (!createForm.address.trim()) missing.push('Address');
    if (!createForm.gender) missing.push('Gender');

    if (createForm.role === 'student') {
      if (!createForm.student_code.trim()) missing.push('Student Code');
      if (!createForm.department) missing.push('Department');
      if (!createForm.level) missing.push('Level');
      if (!createForm.semester) missing.push('Semester');
      if (!createForm.completed_credit_hours.trim()) missing.push('Completed Credit Hours');
      if (!createForm.gpa.trim()) missing.push('GPA');
      if (!createForm.cgpa.trim()) missing.push('CGPA');
      if (!createForm.high_school_type) missing.push('High School Type');
      if (!createForm.high_school_score.trim()) missing.push('High School Score');
      if (!createForm.high_school_degree.trim()) missing.push('High School Degree');
      if (!createForm.high_school_year.trim()) missing.push('High School Year');
    }

    if (createForm.phone.trim() && createForm.phone.trim().length < 11) {
      setCreateError('Phone must be at least 11 characters.');
      return;
    }
    if (createForm.national_id.trim() && createForm.national_id.trim().length !== 14) {
      setCreateError('National ID must be exactly 14 characters.');
      return;
    }
    if (missing.length > 0) {
      setCreateError(`Required fields: ${missing.join(', ')}`);
      return;
    }

    setCreateLoading(true);
    try {
      const base = {
        full_name: createForm.full_name.trim(),
        email: createForm.email.trim(),
        role: createForm.role,
        password: createForm.password,
        national_id: createForm.national_id.trim(),
        date_of_birth: createForm.date_of_birth.trim(),
        phone: createForm.phone.trim(),
        address: createForm.address.trim(),
        gender: createForm.gender as 'male' | 'female',
      };

      if (createForm.role === 'student') {
        const studentPayload: CreateStudentPayload = {
          ...base,
          student_code: createForm.student_code.trim(),
          department: createForm.department as 'cs' | 'is' | 'it' | 'general',
          level: Number(createForm.level),
          semester: Number(createForm.semester),
          completed_credit_hours: Number(createForm.completed_credit_hours),
          gpa: Number(createForm.gpa),
          cgpa: Number(createForm.cgpa),
          high_school_type: createForm.high_school_type as 'science_section' | 'mathematics_section' | 'general_section',
          high_school_score: Number(createForm.high_school_score),
          high_school_degree: Number(createForm.high_school_degree),
          high_school_year: Number(createForm.high_school_year),
        };
        await adminApi.createStudent(studentPayload);
      } else {
        await adminApi.addUser(base as AddUserPayload);
      }
      toast.success('User created successfully!');
      setShowCreateModal(false);
      setCreateForm(initialCreateForm);
      fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setCreateError(message);
      toast.error(message);
    } finally {
      setCreateLoading(false);
    }
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({
      full_name: user.full_name || '',
      email: user.email || '',
      role: user.role || 'student',
      password: '',
      national_id: user.national_id || '',
      date_of_birth: user.date_of_birth || '',
      phone: user.phone || '',
      address: user.address || '',
      gender: user.gender || '',
      avatar: user.avatar || '',
    });
    setEditError('');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditError('');
    setEditLoading(true);
    try {
      const payload: UpdateUserPayload = {};
      for (const [key, value] of Object.entries(editForm)) {
        if (value !== '' && value !== undefined) {
          (payload as Record<string, string>)[key] = value;
        }
      }
      await adminApi.updateUser(editingUser.id, payload);
      toast.success('User updated successfully!');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setEditError(message);
      toast.error(message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setDeleteLoading(true);
    try {
      await adminApi.deleteUser(deletingUser.id);
      toast.success('User deleted successfully!');
      setDeletingUser(null);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      toast.error(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const badge = (role?: string) => roleBadge[role?.toLowerCase() || ''] || defaultBadge;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 px-4 lg:px-6 pt-4 overflow-x-auto">
          <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 border-b-2 border-blue-600 text-blue-600 font-semibold text-sm whitespace-nowrap">
            <Users className="w-5 h-5 shrink-0" />
            User management
          </button>
          <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 text-slate-500 hover:text-slate-700 font-medium text-sm whitespace-nowrap">
            <Shield className="w-5 h-5 shrink-0" />
            Permissions
          </button>
          <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 text-slate-500 hover:text-slate-700 font-medium text-sm whitespace-nowrap">
            <UserCheck className="w-5 h-5 shrink-0" />
            Course Enrollment
          </button>
        </div>

        <div className="p-4 lg:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 lg:gap-4">
          <div className="relative flex-1 max-w-xs lg:max-w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by name or email..."
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <select
              className="block w-full sm:w-auto pl-3 pr-8 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="student">Student</option>
            </select>
            <select
              className="block w-full sm:w-auto pl-3 pr-8 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md"
              value={deptFilter}
              onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
              type="button"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5 shrink-0" />
              Create user
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 px-4">
            <p className="text-sm text-red-600 text-center">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Full Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Gender</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                        {search || statusFilter || deptFilter ? 'No users match your filters' : 'No users found'}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, i) => {
                      const b = badge(user.role);
                      return (
                        <tr key={user.id || i} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {user.full_name || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {user.email || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {user.gender || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b.bg} ${b.text}`}>
                              <span className={`w-1.5 h-1.5 ${b.dot} rounded-full mr-1.5`} />
                              {user.role || '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-slate-400 hover:text-blue-500 mx-1"
                              title="Edit user"
                            >
                              <Pencil className="w-5 h-5 inline" />
                            </button>
                            <button
                              onClick={() => setDeletingUser(user)}
                              className="text-slate-400 hover:text-red-500 mx-1"
                              title="Delete user"
                            >
                              <Trash2 className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile card layout */}
            <div className="md:hidden space-y-3 p-4">
              {paginated.length === 0 ? (
                <div className="text-center text-sm text-slate-400 py-8">
                  {search || statusFilter || deptFilter ? 'No users match your filters' : 'No users found'}
                </div>
              ) : (
                paginated.map((user, i) => {
                  const b = badge(user.role);
                  return (
                    <div key={user.id || i} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{user.full_name || '—'}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email || '—'}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${b.bg} ${b.text}`}>
                          <span className={`w-1.5 h-1.5 ${b.dot} rounded-full mr-1.5`} />
                          {user.role || '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 truncate">{user.gender || '—'}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingUser(user)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {!loading && !error && (
          <div className="px-4 lg:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center text-sm text-slate-500">
              <span>{filtered.length} total</span>
              <span className="mx-2">·</span>
              <span>Page {safePage} of {totalPages}</span>
            </div>
            <nav className="flex rounded-md shadow-sm -space-x-px overflow-x-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fillRule="evenodd" />
                </svg>
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-3 lg:px-4 py-2 border text-sm font-medium ${
                    page === safePage
                      ? 'z-10 bg-blue-600 text-white border-blue-600'
                      : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 7 && (
                <span className="relative inline-flex items-center px-3 lg:px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">...</span>
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !createLoading && setShowCreateModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-5 lg:p-8 max-w-md w-full border border-slate-200 max-h-[90vh] overflow-y-auto mx-auto">
            <div className="flex items-center justify-between mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-slate-900">Create New User</h3>
              <button onClick={() => { setShowCreateModal(false); setCreateError(''); }} disabled={createLoading} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Enter full name" value={createForm.full_name} onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" placeholder="Enter email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" placeholder="Enter password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">National ID * <span className="text-slate-400 font-normal">(14 digits)</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Enter 14-digit national ID" maxLength={14} value={createForm.national_id} onChange={(e) => setCreateForm({ ...createForm, national_id: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="date" value={createForm.date_of_birth} onChange={(e) => setCreateForm({ ...createForm, date_of_birth: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone * <span className="text-slate-400 font-normal">(min 11 digits)</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="tel" placeholder="Enter phone number" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Address *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Enter address" value={createForm.address} onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Role *</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.role} onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })} disabled={createLoading}>
                  <option value="student">Student</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Gender *</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.gender} onChange={(e) => setCreateForm({ ...createForm, gender: e.target.value as 'male' | 'female' })} disabled={createLoading}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {createForm.role === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Student Code *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Enter student code" value={createForm.student_code} onChange={(e) => setCreateForm({ ...createForm, student_code: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Department *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.department} onChange={(e) => setCreateForm({ ...createForm, department: e.target.value as 'cs' | 'is' | 'it' | 'general' })} disabled={createLoading}>
                      <option value="">Select department</option>
                      <option value="cs">Computer Science (CS)</option>
                      <option value="is">Information Systems (IS)</option>
                      <option value="it">Information Technology (IT)</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Level *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.level} onChange={(e) => setCreateForm({ ...createForm, level: e.target.value as '1' | '2' | '3' | '4' })} disabled={createLoading}>
                      <option value="">Select level</option>
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                      <option value="4">Level 4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Semester *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.semester} onChange={(e) => setCreateForm({ ...createForm, semester: e.target.value as '1' | '2' })} disabled={createLoading}>
                      <option value="">Select semester</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Completed Credit Hours *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="0" value={createForm.completed_credit_hours} onChange={(e) => setCreateForm({ ...createForm, completed_credit_hours: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">GPA *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.gpa} onChange={(e) => setCreateForm({ ...createForm, gpa: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">CGPA *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.cgpa} onChange={(e) => setCreateForm({ ...createForm, cgpa: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">High School Type *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.high_school_type} onChange={(e) => setCreateForm({ ...createForm, high_school_type: e.target.value as 'science_section' | 'mathematics_section' | 'general_section' })} disabled={createLoading}>
                      <option value="">Select type</option>
                      <option value="science_section">Science Section</option>
                      <option value="mathematics_section">Mathematics Section</option>
                      <option value="general_section">General Section</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">High School Score *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.high_school_score} onChange={(e) => setCreateForm({ ...createForm, high_school_score: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">High School Degree *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.high_school_degree} onChange={(e) => setCreateForm({ ...createForm, high_school_degree: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">High School Year *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="e.g. 2024" value={createForm.high_school_year} onChange={(e) => setCreateForm({ ...createForm, high_school_year: e.target.value })} disabled={createLoading} />
                  </div>
                </>
              )}
              {createError && <div className="text-red-600 text-sm font-medium bg-red-50 px-4 py-2.5 rounded-lg border border-red-200">{createError}</div>}
              <button type="submit" disabled={createLoading} className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {createLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create User'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !editLoading && setEditingUser(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-5 lg:p-8 max-w-lg w-full border border-slate-200 max-h-[90vh] overflow-y-auto mx-auto">
            <div className="flex items-center justify-between mb-5 lg:mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-slate-900">Edit User</h3>
              <button onClick={() => { setEditingUser(null); setEditError(''); }} disabled={editLoading} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" value={editForm.full_name || ''} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" value={editForm.email || ''} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">New Password <span className="text-slate-400 font-normal">(leave blank to keep current)</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" placeholder="Enter new password" value={editForm.password || ''} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">National ID</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="14-digit national ID" maxLength={14} value={editForm.national_id || ''} onChange={(e) => setEditForm({ ...editForm, national_id: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="date" value={editForm.date_of_birth || ''} onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="tel" placeholder="Enter phone number" value={editForm.phone || ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="Enter address" value={editForm.address || ''} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={editForm.role || 'student'} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} disabled={editLoading}>
                  <option value="student">Student</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Gender</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={editForm.gender || ''} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} disabled={editLoading}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Avatar URL</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="https://..." value={editForm.avatar || ''} onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })} disabled={editLoading} />
              </div>
              {editError && <div className="text-red-600 text-sm font-medium bg-red-50 px-4 py-2.5 rounded-lg border border-red-200">{editError}</div>}
              <button type="submit" disabled={editLoading} className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {editLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !deleteLoading && setDeletingUser(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-5 lg:p-8 max-w-sm w-full border border-slate-200 mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-red-600" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2">Delete User</h3>
              <p className="text-slate-500 text-sm mb-6">
                Are you sure you want to permanently delete <strong className="break-all">{deletingUser.full_name || deletingUser.email}</strong>?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeletingUser(null)}
                  disabled={deleteLoading}
                  className="flex-1 py-2.5 px-4 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 py-2.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
