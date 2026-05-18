import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Users, Shield, UserCheck, X, Loader2, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { adminApi, type AddUserPayload, type UpdateUserPayload, type CreateStudentPayload } from '../../api/adminApi';
import type { AdminUser } from '../../types/auth.types';

const ITEMS_PER_PAGE = 5;

const roleBadge: Record<string, { bg: string; text: string; dot: string }> = {
  admin: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
  doctor: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
  student: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
};

const defaultBadge = { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-700 dark:text-slate-300', dot: 'bg-slate-500' };

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
  const { t } = useTranslation(['dashboard', 'common', 'forms']);
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
      const message = err instanceof Error ? err.message : t('failedToFetchUsers');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [t]);

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
    if (!createForm.full_name.trim()) missing.push(t('fullName', { ns: 'forms' }));
    if (!createForm.email.trim()) missing.push(t('email', { ns: 'forms' }));
    if (!createForm.password.trim()) missing.push(t('password', { ns: 'forms' }));
    if (!createForm.national_id.trim()) missing.push(t('nationalId', { ns: 'forms' }));
    if (!createForm.date_of_birth.trim()) missing.push(t('dateOfBirth', { ns: 'forms' }));
    if (!createForm.phone.trim()) missing.push(t('phone', { ns: 'forms' }));
    if (!createForm.address.trim()) missing.push(t('address', { ns: 'forms' }));
    if (!createForm.gender) missing.push(t('gender', { ns: 'forms' }));

    if (createForm.role === 'student') {
      if (!createForm.student_code.trim()) missing.push(t('studentCode', { ns: 'forms' }));
      if (!createForm.department) missing.push(t('department', { ns: 'forms' }));
      if (!createForm.level) missing.push(t('level', { ns: 'forms' }));
      if (!createForm.semester) missing.push(t('semester', { ns: 'forms' }));
      if (!createForm.completed_credit_hours.trim()) missing.push(t('completedCreditHours', { ns: 'forms' }));
      if (!createForm.gpa.trim()) missing.push(t('gpa', { ns: 'forms' }));
      if (!createForm.cgpa.trim()) missing.push(t('cgpa', { ns: 'forms' }));
      if (!createForm.high_school_type) missing.push(t('highSchoolType', { ns: 'forms' }));
      if (!createForm.high_school_score.trim()) missing.push(t('highSchoolScore', { ns: 'forms' }));
      if (!createForm.high_school_degree.trim()) missing.push(t('highSchoolDegree', { ns: 'forms' }));
      if (!createForm.high_school_year.trim()) missing.push(t('highSchoolYear', { ns: 'forms' }));
    }

    if (createForm.phone.trim() && createForm.phone.trim().length < 11) {
      setCreateError(t('phoneMinChars'));
      return;
    }
    if (createForm.national_id.trim() && createForm.national_id.trim().length !== 14) {
      setCreateError(t('nationalIdExact'));
      return;
    }
    if (missing.length > 0) {
      setCreateError(t('requiredFields', { fields: missing.join(', ') }));
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
      toast.success(t('userCreated'));
      setShowCreateModal(false);
      setCreateForm(initialCreateForm);
      fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : t('failedToCreateUser');
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
      toast.success(t('userUpdated'));
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : t('failedToUpdateUser');
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
      toast.success(t('userDeleted'));
      setDeletingUser(null);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : t('failedToDeleteUser');
      toast.error(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const badge = (role?: string) => roleBadge[role?.toLowerCase() || ''] || defaultBadge;

  return (
    <>
      <div className="bg-surface-card rounded-xl shadow-card overflow-hidden border border-blue-600">
        <div className="flex border-b border-border px-4 lg:px-6 pt-4 overflow-x-auto">
          <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 border-b-2 border-blue-600 text-blue-600 font-semibold text-sm whitespace-nowrap">
            <Users className="w-5 h-5 shrink-0" />
            {t('userManagement')}
          </button>
          <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 text-text-tertiary hover:text-text-secondary font-medium text-sm whitespace-nowrap">
             <Shield className="w-5 h-5 shrink-0" />
             {t('permissions')}
           </button>
           <button className="flex items-center gap-2 pb-4 px-3 lg:px-4 text-text-tertiary hover:text-text-secondary font-medium text-sm whitespace-nowrap">
            <UserCheck className="w-5 h-5 shrink-0" />
            {t('courseEnrollment')}
          </button>
        </div>

        <div className="p-4 lg:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 lg:gap-4">
          <div className="relative flex-1 max-w-xs lg:max-w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-border-input rounded-md leading-5 bg-input-bg placeholder-input-placeholder focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder={t('searchByNameOrEmail')}
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <select
              className="block w-full sm:w-auto pl-3 pr-8 py-2 text-base border-border-input bg-input-bg text-text-secondary focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md"
               value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">{t('allRoles')}</option>
              <option value="admin">{t('admin')}</option>
              <option value="doctor">{t('doctor')}</option>
              <option value="student">{t('student')}</option>
            </select>
            <select
              className="block w-full sm:w-auto pl-3 pr-8 py-2 text-base border-border-input bg-input-bg text-text-secondary focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md"
               value={deptFilter}
              onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">{t('allGenders')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto"
              type="button"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5 shrink-0" />
              {t('createUser')}
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
              {t('retry', { ns: 'common' })}
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-table-header">
                   <tr>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">{t('fullName')}</th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">{t('email')}</th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">{t('gender')}</th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">{t('role')}</th>
                     <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border-muted">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-text-muted">
                        {search || statusFilter || deptFilter ? t('noUsersMatchFilters', { ns: 'common' }) : t('noUsersFound', { ns: 'common' })}
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, i) => {
                      const b = badge(user.role);
                      return (
                        <tr key={user.id || i} className="hover:bg-table-hover">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                            {user.full_name || '—'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-tertiary">
                             {user.email || '—'}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-text-tertiary">
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
                              className="text-text-muted hover:text-blue-500 mx-1"
                              title={t('editUser')}
                            >
                              <Pencil className="w-5 h-5 inline" />
                            </button>
                            <button
                              onClick={() => setDeletingUser(user)}
                              className="text-text-muted hover:text-red-500 mx-1"
                              title={t('deleteUser')}
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
                <div className="text-center text-sm text-text-muted py-8">
                  {search || statusFilter || deptFilter ? t('noUsersMatchFilters', { ns: 'common' }) : t('noUsersFound', { ns: 'common' })}
                </div>
              ) : (
                paginated.map((user, i) => {
                  const b = badge(user.role);
                  return (
                    <div key={user.id || i} className="bg-surface-muted rounded-xl p-4 border border-border space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-primary truncate">{user.full_name || '—'}</p>
                           <p className="text-xs text-text-tertiary truncate">{user.email || '—'}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${b.bg} ${b.text}`}>
                          <span className={`w-1.5 h-1.5 ${b.dot} rounded-full mr-1.5`} />
                          {user.role || '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-text-tertiary truncate">{user.gender || '—'}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-text-muted hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title={t('editUser')}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingUser(user)}
                            className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title={t('deleteUser')}
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
          <div className="px-4 lg:px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
             <div className="flex items-center text-sm text-text-tertiary">
              <span>{`${filtered.length} ${t('total', { ns: 'common' })}`}</span>
              <span className="mx-2">·</span>
              <span>{t('page', { ns: 'common' })} {safePage} {t('of', { ns: 'common' })} {totalPages}</span>
            </div>
            <nav className="flex rounded-md shadow-card -space-x-px overflow-x-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border-input bg-surface text-sm font-medium text-text-tertiary hover:bg-table-hover disabled:opacity-50"
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
                       : 'bg-surface border-border-input text-text-tertiary hover:bg-table-hover'
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 7 && (
                <span className="relative inline-flex items-center px-3 lg:px-4 py-2 border border-border-input bg-surface text-sm font-medium text-text-secondary">...</span>
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border-input bg-surface text-sm font-medium text-text-tertiary hover:bg-table-hover disabled:opacity-50"
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
          <div className="absolute inset-0 bg-surface-overlay backdrop-blur-sm" onClick={() => !createLoading && setShowCreateModal(false)} />
          <div className="relative bg-surface-elevated rounded-2xl shadow-2xl p-5 lg:p-8 max-w-md w-full border border-border max-h-[90vh] overflow-y-auto mx-auto">
             <div className="flex items-center justify-between mb-5 lg:mb-6">
               <h3 className="text-lg lg:text-xl font-bold text-text-primary">{t('createNewUser')}</h3>
               <button onClick={() => { setShowCreateModal(false); setCreateError(''); }} disabled={createLoading} className="text-text-muted hover:text-text-secondary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('fullName', { ns: 'forms' })} *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder={t('enterFullName', { ns: 'forms' })} value={createForm.full_name} onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('email', { ns: 'forms' })} *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" placeholder={t('enterEmail', { ns: 'forms' })} value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('password', { ns: 'forms' })} *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" placeholder={t('enterPassword', { ns: 'forms' })} value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('nationalId', { ns: 'forms' })} * <span className="text-text-muted font-normal">{t('digits14')}</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder={t('enterNationalId', { ns: 'forms' })} maxLength={14} value={createForm.national_id} onChange={(e) => setCreateForm({ ...createForm, national_id: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('dateOfBirth', { ns: 'forms' })} *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="date" value={createForm.date_of_birth} onChange={(e) => setCreateForm({ ...createForm, date_of_birth: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('phone', { ns: 'forms' })} * <span className="text-text-muted font-normal">{t('minDigits')}</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="tel" placeholder={t('enterPhone', { ns: 'forms' })} value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('address', { ns: 'forms' })} *</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder={t('enterAddress', { ns: 'forms' })} value={createForm.address} onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })} disabled={createLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('role', { ns: 'forms' })} *</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.role} onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })} disabled={createLoading}>
                  <option value="student">{t('student')}</option>
                  <option value="doctor">{t('doctor')}</option>
                  <option value="admin">{t('admin')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('gender', { ns: 'forms' })} *</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.gender} onChange={(e) => setCreateForm({ ...createForm, gender: e.target.value as 'male' | 'female' })} disabled={createLoading}>
                  <option value="">{t('selectGender', { ns: 'forms' })}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>
              {createForm.role === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('studentCode', { ns: 'forms' })} *</label>
                     <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder={t('enterStudentCode', { ns: 'forms' })} value={createForm.student_code} onChange={(e) => setCreateForm({ ...createForm, student_code: e.target.value })} disabled={createLoading} />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-text-secondary mb-1">{t('department', { ns: 'forms' })} *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.department} onChange={(e) => setCreateForm({ ...createForm, department: e.target.value as 'cs' | 'is' | 'it' | 'general' })} disabled={createLoading}>
                      <option value="">{t('selectDepartment', { ns: 'forms' })}</option>
                      <option value="cs">{t('cs')}</option>
                      <option value="is">{t('is')}</option>
                      <option value="it">{t('it')}</option>
                      <option value="general">{t('general')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('level', { ns: 'forms' })} *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.level} onChange={(e) => setCreateForm({ ...createForm, level: e.target.value as '1' | '2' | '3' | '4' })} disabled={createLoading}>
                      <option value="">{t('selectLevel', { ns: 'forms' })}</option>
                      <option value="1">{t('level1')}</option>
                      <option value="2">{t('level2')}</option>
                      <option value="3">{t('level3')}</option>
                      <option value="4">{t('level4')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('semester', { ns: 'forms' })} *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.semester} onChange={(e) => setCreateForm({ ...createForm, semester: e.target.value as '1' | '2' })} disabled={createLoading}>
                      <option value="">{t('selectSemester', { ns: 'forms' })}</option>
                      <option value="1">{t('semester1')}</option>
                      <option value="2">{t('semester2')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('completedCreditHours', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="0" value={createForm.completed_credit_hours} onChange={(e) => setCreateForm({ ...createForm, completed_credit_hours: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('gpa', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.gpa} onChange={(e) => setCreateForm({ ...createForm, gpa: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('cgpa', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.cgpa} onChange={(e) => setCreateForm({ ...createForm, cgpa: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('highSchoolType', { ns: 'forms' })} *</label>
                    <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={createForm.high_school_type} onChange={(e) => setCreateForm({ ...createForm, high_school_type: e.target.value as 'science_section' | 'mathematics_section' | 'general_section' })} disabled={createLoading}>
                      <option value="">{t('selectHighSchoolType', { ns: 'forms' })}</option>
                      <option value="science_section">{t('scienceSection')}</option>
                      <option value="mathematics_section">{t('mathematicsSection')}</option>
                      <option value="general_section">{t('generalSection')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('highSchoolScore', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.high_school_score} onChange={(e) => setCreateForm({ ...createForm, high_school_score: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('highSchoolDegree', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" step="0.01" placeholder="0.00" value={createForm.high_school_degree} onChange={(e) => setCreateForm({ ...createForm, high_school_degree: e.target.value })} disabled={createLoading} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">{t('highSchoolYear', { ns: 'forms' })} *</label>
                    <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="number" placeholder="e.g. 2024" value={createForm.high_school_year} onChange={(e) => setCreateForm({ ...createForm, high_school_year: e.target.value })} disabled={createLoading} />
                  </div>
                </>
              )}
              {createError && <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-800">{createError}</div>}
              <button type="submit" disabled={createLoading} className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {createLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('createUser')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-surface-overlay backdrop-blur-sm" onClick={() => !editLoading && setEditingUser(null)} />
          <div className="relative bg-surface-elevated rounded-2xl shadow-2xl p-5 lg:p-8 max-w-lg w-full border border-border max-h-[90vh] overflow-y-auto mx-auto">
             <div className="flex items-center justify-between mb-5 lg:mb-6">
               <h3 className="text-lg lg:text-xl font-bold text-text-primary">{t('editUserTitle')}</h3>
               <button onClick={() => { setEditingUser(null); setEditError(''); }} disabled={editLoading} className="text-text-muted hover:text-text-secondary p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('fullName', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" value={editForm.full_name || ''} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('email', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" value={editForm.email || ''} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('newPassword')} <span className="text-text-muted font-normal">{t('leaveBlankToKeep')}</span></label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" placeholder="Enter new password" value={editForm.password || ''} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('nationalId', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="14-digit national ID" maxLength={14} value={editForm.national_id || ''} onChange={(e) => setEditForm({ ...editForm, national_id: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('dateOfBirth', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="date" value={editForm.date_of_birth || ''} onChange={(e) => setEditForm({ ...editForm, date_of_birth: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('phone', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="tel" placeholder={t('enterPhone', { ns: 'forms' })} value={editForm.phone || ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('address', { ns: 'forms' })}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder={t('enterAddress', { ns: 'forms' })} value={editForm.address || ''} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} disabled={editLoading} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('role', { ns: 'forms' })}</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={editForm.role || 'student'} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} disabled={editLoading}>
                  <option value="student">{t('student')}</option>
                  <option value="doctor">{t('doctor')}</option>
                  <option value="admin">{t('admin')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('gender', { ns: 'forms' })}</label>
                <select className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={editForm.gender || ''} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} disabled={editLoading}>
                  <option value="">{t('selectGender', { ns: 'forms' })}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-1">{t('avatarUrl')}</label>
                <input className="block w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-input-bg border border-border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" placeholder="https://..." value={editForm.avatar || ''} onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })} disabled={editLoading} />
              </div>
              {editError && <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-800">{editError}</div>}
              <button type="submit" disabled={editLoading} className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {editLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('saveChanges')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-4">
          <div className="absolute inset-0 bg-surface-overlay backdrop-blur-sm" onClick={() => !deleteLoading && setDeletingUser(null)} />
          <div className="relative bg-surface-elevated rounded-2xl shadow-2xl p-5 lg:p-8 max-w-sm w-full border border-border mx-auto">
             <div className="flex flex-col items-center text-center">
               <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                 <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-red-600" />
               </div>
               <h3 className="text-lg lg:text-xl font-bold text-text-primary mb-2">{t('deleteUserTitle')}</h3>
               <p className="text-text-tertiary text-sm mb-6" dangerouslySetInnerHTML={{ __html: t('deleteUserConfirm', { name: deletingUser.full_name || deletingUser.email }) }} />
               <div className="flex gap-3 w-full">
                 <button
                   onClick={() => setDeletingUser(null)}
                   disabled={deleteLoading}
                   className="flex-1 py-2.5 px-4 border border-border-input rounded-xl text-sm font-semibold text-text-secondary hover:bg-table-hover transition-colors disabled:opacity-50"
                >
                  {t('cancel', { ns: 'common' })}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 py-2.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {t('delete', { ns: 'common' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
