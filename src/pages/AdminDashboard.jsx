import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection, onSnapshot, query, orderBy
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import {
  addProject, updateProject, deleteProject,
  addCategory, deleteCategory,
  COL_PROJECTS, COL_CATEGORIES
} from '../services/adminService';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const EMPTY_FORM = { title: '', description: '', categoryId: '', imageUrl: '' };

const genId = () => Math.random().toString(36).slice(2, 10);

// ─── Toast ────────────────────────────────────────────────────────────────────
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, type = 'success') => {
    const id = genId();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  }, []);
  return { toasts, push };
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
    <div className="modal-box" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">{title}</h3>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const { toasts, push: toast } = useToast();

  // ── Data ──
  const [projects,   setProjects]   = useState([]);
  const [categories, setCategories] = useState([]);

  // ── UI state ──
  const [activeTab,    setActiveTab]    = useState('projects');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [filterCat,    setFilterCat]    = useState('all');
  const [editProject,  setEditProject]  = useState(null);  // modal target
  const [addingModal,  setAddingModal]  = useState(false);  // add modal open
  const [deleteTarget, setDeleteTarget] = useState(null);   // confirm delete id
  const [newCatName,   setNewCatName]   = useState('');

  // ── Realtime listeners ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!db) return;

    const unsubP = onSnapshot(
      query(collection(db, COL_PROJECTS), orderBy('createdAt', 'desc')),
      snap => setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    const unsubC = onSnapshot(
      collection(db, COL_CATEGORIES),
      snap => setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => { unsubP(); unsubC(); };
  }, []);

  // ── Filtered projects ───────────────────────────────────────────────────────
  const visibleProjects = projects.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCat === 'all' || p.categoryId === filterCat;
    return matchSearch && matchCat;
  });

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    try {
      await deleteProject(deleteTarget);
      toast('Project deleted.', 'info');
    } catch {
      toast('Failed to delete project.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  // ── Add Category ─────────────────────────────────────────────────────────────
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await addCategory(newCatName);
      setNewCatName('');
      toast('Category added!');
    } catch {
      toast('Failed to add category.', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      toast('Category deleted.', 'info');
    } catch {
      toast('Failed to delete.', 'error');
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="admin-dashboard">

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-icon">🌿</span>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-nav">
          {[
            { id: 'projects', label: 'Projects', icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>)},
            { id: 'categories', label: 'Categories', icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659
                     1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095
                     0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16
                     3.66A2.25 2.25 0 009.568 3z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z"/>
              </svg>)},
          ].map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-badge">
            <div className="admin-avatar">{user?.email?.[0]?.toUpperCase()}</div>
            <span className="admin-email" title={user?.email}>{user?.email}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25
                   2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15
                   M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">

        {/* Toast stack */}
        <div className="toast-stack" aria-live="polite">
          {toasts.map(t => (
            <div key={t.id} className={`admin-toast admin-toast--${t.type}`}>
              {t.type === 'success' && '✅ '}
              {t.type === 'error'   && '❌ '}
              {t.type === 'info'    && 'ℹ️ '}
              {t.message}
            </div>
          ))}
        </div>

        {/* ══ Projects Tab ══ */}
        {activeTab === 'projects' && (
          <>
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <h2 className="admin-page-title">
                  Projects
                  <span className="admin-badge">{visibleProjects.length}</span>
                </h2>
              </div>
              <div className="admin-toolbar-right">
                {/* Search */}
                <div className="search-box">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
                         4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"/>
                  </svg>
                  <input
                    type="search"
                    placeholder="Search projects…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Filter */}
                <select
                  className="admin-filter-select"
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {/* Add button */}
                <button
                  className="admin-btn-primary"
                  onClick={() => setAddingModal(true)}
                >
                  + Add Project
                </button>
              </div>
            </div>

            {/* Project grid */}
            {visibleProjects.length === 0 ? (
              <div className="admin-empty">
                {searchQuery || filterCat !== 'all'
                  ? 'No projects match your search / filter.'
                  : 'No projects yet. Click "+ Add Project" to get started.'}
              </div>
            ) : (
              <div className="admin-project-grid">
                {visibleProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    categories={categories}
                    onEdit={() => setEditProject(project)}
                    onDelete={() => setDeleteTarget(project.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══ Categories Tab ══ */}
        {activeTab === 'categories' && (
          <div className="admin-section">
            <h2 className="admin-section-title">Manage Categories</h2>

            <form className="admin-form admin-form--inline" onSubmit={handleAddCategory}>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label htmlFor="new-cat-name">Category Name</label>
                <input
                  id="new-cat-name"
                  type="text"
                  placeholder="e.g. Residence Landscape Projects"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="admin-btn-primary admin-btn--align-bottom"
              >
                Add Category
              </button>
            </form>

            <div className="admin-cat-list">
              {categories.length === 0 && (
                <div className="admin-empty">No categories yet.</div>
              )}
              {categories.map(cat => (
                <div className="admin-cat-item" key={cat.id}>
                  <div>
                    <span className="admin-cat-label">{cat.name}</span>
                    <code className="admin-cat-id">{cat.id}</code>
                  </div>
                  <button
                    className="admin-btn-danger"
                    onClick={() => handleDeleteCategory(cat.id)}
                    aria-label={`Delete ${cat.name}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ══ Add Project Modal ══ */}
      {addingModal && (
        <ProjectFormModal
          mode="add"
          categories={categories}
          onClose={() => setAddingModal(false)}
          onSuccess={(msg) => { toast(msg); setAddingModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Edit Project Modal ══ */}
      {editProject && (
        <ProjectFormModal
          mode="edit"
          project={editProject}
          categories={categories}
          onClose={() => setEditProject(null)}
          onSuccess={(msg) => { toast(msg); setEditProject(null); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Delete Confirmation Modal ══ */}
      {deleteTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteTarget(null)}>
          <p className="modal-confirm-text">
            Are you sure you want to delete this project?
            <br />
            <span className="modal-confirm-sub">This action cannot be undone.</span>
          </p>
          <div className="modal-actions">
            <button className="admin-btn-secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button className="admin-btn-danger" onClick={confirmDelete}>
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── ProjectCard ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, categories, onEdit, onDelete }) => {
  const catName = categories.find(c => c.id === project.categoryId)?.name || project.categoryId || '—';
  const createdAt = project.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) ?? '—';

  return (
    <div className="admin-project-card">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="admin-project-img"
          loading="lazy"
        />
      ) : (
        <div className="admin-project-img admin-project-img--placeholder">
          No Image
        </div>
      )}
      <div className="admin-project-info">
        <div className="admin-project-meta">
          <span className="admin-project-cat">{catName}</span>
          <span className="admin-project-date">{createdAt}</span>
        </div>
        <h3 className="admin-project-title">{project.title}</h3>
        {project.description && (
          <p className="admin-project-desc">{project.description}</p>
        )}
        <div className="admin-project-actions">
          <button className="admin-btn-edit" onClick={onEdit}>✏️ Edit</button>
          <button className="admin-btn-danger" onClick={onDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

// ─── ProjectFormModal ─────────────────────────────────────────────────────────
const ProjectFormModal = ({ mode, project, categories, onClose, onSuccess, onError }) => {
  const [form, setForm] = useState({
    title:       project?.title       ?? '',
    description: project?.description ?? '',
    categoryId:  project?.categoryId  ?? '',
    imageUrl:    project?.imageUrl    ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(project?.imageUrl ?? '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) return onError('Image URL is required.');
    
    setSaving(true);
    try {
      const payload = {
        title:       form.title.trim(),
        description: form.description.trim(),
        categoryId:  form.categoryId,
        imageUrl:    form.imageUrl.trim(),
      };

      if (mode === 'edit') {
        await updateProject(project.id, payload);
        onSuccess('Project updated!');
      } else {
        await addProject(payload);
        onSuccess('Project added!');
      }
    } catch (err) {
      onError('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const title = mode === 'edit' ? '✏️ Edit Project' : '➕ Add New Project';

  return (
    <Modal title={title} onClose={onClose}>
      <form className="admin-form" onSubmit={handleSubmit}>
        {/* Title + Category row */}
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="pf-title">Project Title *</label>
            <input
              id="pf-title"
              type="text"
              placeholder="e.g. Mr. Thrimurthy Landscape"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="pf-category">Category *</label>
            <select
              id="pf-category"
              value={form.categoryId}
              onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
              required
            >
              <option value="">— Select Category —</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="admin-form-group">
          <label htmlFor="pf-desc">Description</label>
          <textarea
            id="pf-desc"
            placeholder="Brief description of the project…"
            rows={3}
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="pf-image">Image URL *</label>
          <input
            id="pf-image"
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={form.imageUrl}
            onChange={e => {
              setForm(f => ({ ...f, imageUrl: e.target.value }));
              setPreviewSrc(e.target.value);
            }}
            required
          />
        </div>

        {/* Image Preview */}
        {previewSrc && (
          <div className="admin-img-preview">
            <img src={previewSrc} alt="Preview" onError={() => setPreviewSrc('')} />
            <div className="img-preview-label">Image Preview</div>
          </div>
        )}

        <div className="modal-actions">
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={saving}
          >
            {saving ? <><span className="btn-spinner" /> Saving…</> : mode === 'edit' ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminDashboard;
