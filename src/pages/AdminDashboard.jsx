import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import {
  addProject, updateProject, deleteProject, updateProjectsOrder,
  addCategory, deleteCategory, updateCategoriesOrder,
  addTeamMember, updateTeamMember, deleteTeamMember, updateTeamOrder,
  addNews, updateNews, deleteNews, updateNewsOrder,
  COL_PROJECTS, COL_CATEGORIES, COL_TEAM, COL_NEWS,
  NEWS_CAT_RECENT, NEWS_CAT_PUBLICATIONS, NEWS_CAT_INTERVIEWS, NEWS_CAT_ONLINE,
  uploadImagesToSupabase, uploadImageToSupabase
} from '../services/adminService';

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
  const navigate = useNavigate();
  const { toasts, push: toast } = useToast();

  // ── Data ──
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [team, setTeam] = useState([]);
  const [news, setNews] = useState([]);

  // ── UI state ──
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editProject, setEditProject] = useState(null);
  const [addingModal, setAddingModal] = useState(false);
  const [addingTeamModal, setAddingTeamModal] = useState(false);
  const [editTeamMember, setEditTeamMember] = useState(null);
  const [addingNewsModal, setAddingNewsModal] = useState(false);
  const [editNewsItem, setEditNewsItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteTeamTarget, setDeleteTeamTarget] = useState(null);
  const [deleteNewsTarget, setDeleteNewsTarget] = useState(null);
  const [filterNewsCat, setFilterNewsCat] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showProjectOrderModal, setShowProjectOrderModal] = useState(false);
  const [showTeamOrderModal, setShowTeamOrderModal] = useState(false);
  const [showCatOrderModal, setShowCatOrderModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');

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
    const unsubT = onSnapshot(
      query(collection(db, COL_TEAM), orderBy('createdAt', 'desc')),
      snap => setTeam(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    const unsubN = onSnapshot(
      query(collection(db, COL_NEWS), orderBy('createdAt', 'desc')),
      snap => setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => { unsubP(); unsubC(); unsubT(); unsubN(); };
  }, []);

  // ── Filtered projects ───────────────────────────────────────────────────────
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt?.seconds ?? 0;
      const timeB = b.createdAt?.seconds ?? 0;
      return timeB - timeA;
    });
  }, [projects]);

  const visibleProjects = useMemo(() => {
    return sortedProjects.filter(p => {
      const matchSearch = p.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase()?.includes(searchQuery.toLowerCase());
      const matchCat = filterCat === 'all' || p.categoryId === filterCat;
      return matchSearch && matchCat;
    });
  }, [sortedProjects, searchQuery, filterCat]);

  // ── Team members sorting ────────────────────────────────────────────────────
  const sortedTeam = useMemo(() => {
    return [...team].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt?.seconds ?? 0;
      const timeB = b.createdAt?.seconds ?? 0;
      return timeB - timeA;
    });
  }, [team]);

  // ── Categories sorting ──────────────────────────────────────────────────────
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name?.localeCompare(b.name);
    });
  }, [categories]);

  // ── Filtered news ───────────────────────────────────────────────────────────
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      // Fallback to createdAt if order is the same
      const timeA = a.createdAt?.seconds ?? 0;
      const timeB = b.createdAt?.seconds ?? 0;
      return timeB - timeA;
    });
  }, [news]);

  const visibleNews = useMemo(() => {
    return sortedNews.filter(item => {
      return filterNewsCat === 'all' || item.category === filterNewsCat;
    });
  }, [sortedNews, filterNewsCat]);

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

  const confirmDeleteTeam = async () => {
    try {
      await deleteTeamMember(deleteTeamTarget);
      toast('Team member removed.', 'info');
    } catch {
      toast('Failed to remove team member.', 'error');
    } finally {
      setDeleteTeamTarget(null);
    }
  };

  const confirmDeleteNews = async () => {
    try {
      await deleteNews(deleteNewsTarget);
      toast('News item deleted.', 'info');
    } catch {
      toast('Failed to delete news item.', 'error');
    } finally {
      setDeleteNewsTarget(null);
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
            {
              id: 'projects', label: 'Projects', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>)
            },
            {
              id: 'categories', label: 'Categories', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659
                     1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095
                     0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16
                     3.66A2.25 2.25 0 009.568 3z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>)
            },
            {
              id: 'team', label: 'Team', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>)
            },
            {
              id: 'news', label: 'News', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>)
            },
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
              {t.type === 'error' && '❌ '}
              {t.type === 'info' && 'ℹ️ '}
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
                <div className="search-box">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817
                         4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search projects…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
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
                <button
                  className="admin-btn-secondary"
                  onClick={() => setShowProjectOrderModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  List / Order
                </button>
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
            <div className="admin-toolbar" style={{ marginBottom: '20px', padding: 0, background: 'none' }}>
              <div className="admin-toolbar-left">
                <h2 className="admin-section-title" style={{ margin: 0 }}>Manage Categories</h2>
              </div>
              <div className="admin-toolbar-right">
                <button
                  className="admin-btn-secondary"
                  onClick={() => setShowCatOrderModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  List / Order
                </button>
              </div>
            </div>

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
              {sortedCategories.length === 0 && (
                <div className="admin-empty">No categories yet.</div>
              )}
              {sortedCategories.map(cat => (
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

        {/* ══ Team Tab ══ */}
        {activeTab === 'team' && (
          <>
            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <h2 className="admin-page-title">
                  Our Team
                  <span className="admin-badge">{team.length}</span>
                </h2>
              </div>
              <div className="admin-toolbar-right">
                <button
                  className="admin-btn-secondary"
                  onClick={() => setShowTeamOrderModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  List / Order
                </button>
                <button
                  className="admin-btn-primary"
                  onClick={() => setAddingTeamModal(true)}
                >
                  + Add Team Member
                </button>
              </div>
            </div>

            {sortedTeam.length === 0 ? (
              <div className="admin-empty">No team members yet. Click "+ Add Team Member" to get started.</div>
            ) : (
              <div className="admin-project-grid">
                {sortedTeam.map(member => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    onEdit={() => setEditTeamMember(member)}
                    onDelete={() => setDeleteTeamTarget(member.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══ News Tab ══ */}
        {activeTab === 'news' && (
          <>
            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <h2 className="admin-page-title">
                  News Items
                  <span className="admin-badge">{visibleNews.length}</span>
                </h2>
              </div>
              <div className="admin-toolbar-right">
                <select
                  className="admin-filter-select"
                  value={filterNewsCat}
                  onChange={e => setFilterNewsCat(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value={NEWS_CAT_RECENT}>Home Page News</option>
                  <option value={NEWS_CAT_PUBLICATIONS}>Recent Publication</option>
                  <option value={NEWS_CAT_INTERVIEWS}>Media Interview</option>
                  <option value={NEWS_CAT_ONLINE}>Online Feature</option>
                </select>
                <button
                  className="admin-btn-secondary"
                  onClick={() => setShowOrderModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  List / Order
                </button>
                <button
                  className="admin-btn-primary"
                  onClick={() => setAddingNewsModal(true)}
                >
                  + Add News Item
                </button>
              </div>
            </div>

            {visibleNews.length === 0 ? (
              <div className="admin-empty">
                {filterNewsCat !== 'all' 
                  ? 'No news items found for this category.' 
                  : 'No news items yet. Click "+ Add News Item" to get started.'}
              </div>
            ) : (
              <div className="admin-project-grid">
                {visibleNews.map(item => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    onEdit={() => setEditNewsItem(item)}
                    onDelete={() => setDeleteNewsTarget(item.id)}
                  />
                ))}
              </div>
            )}
          </>
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



      {/* ══ Add Team Member Modal ══ */}
      {addingTeamModal && (
        <TeamFormModal
          mode="add"
          onClose={() => setAddingTeamModal(false)}
          onSuccess={(msg) => { toast(msg); setAddingTeamModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Edit Team Member Modal ══ */}
      {editTeamMember && (
        <TeamFormModal
          mode="edit"
          member={editTeamMember}
          onClose={() => setEditTeamMember(null)}
          onSuccess={(msg) => { toast(msg); setEditTeamMember(null); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Add News Modal ══ */}
      {addingNewsModal && (
        <NewsFormModal
          mode="add"
          onClose={() => setAddingNewsModal(false)}
          onSuccess={(msg) => { toast(msg); setAddingNewsModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Edit News Modal ══ */}
      {editNewsItem && (
        <NewsFormModal
          mode="edit"
          item={editNewsItem}
          onClose={() => setEditNewsItem(null)}
          onSuccess={(msg) => { toast(msg); setEditNewsItem(null); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ News Order Modal ══ */}
      {showOrderModal && (
        <NewsOrderModal
          news={news}
          onClose={() => setShowOrderModal(false)}
          onSuccess={(msg) => { toast(msg); setShowOrderModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Project Order Modal ══ */}
      {showProjectOrderModal && (
        <ProjectOrderModal
          projects={projects}
          categories={categories}
          onClose={() => setShowProjectOrderModal(false)}
          onSuccess={(msg) => { toast(msg); setShowProjectOrderModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Team Order Modal ══ */}
      {showTeamOrderModal && (
        <TeamOrderModal
          team={team}
          onClose={() => setShowTeamOrderModal(false)}
          onSuccess={(msg) => { toast(msg); setShowTeamOrderModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Category Order Modal ══ */}
      {showCatOrderModal && (
        <CategoryOrderModal
          categories={categories}
          onClose={() => setShowCatOrderModal(false)}
          onSuccess={(msg) => { toast(msg); setShowCatOrderModal(false); }}
          onError={(msg) => toast(msg, 'error')}
        />
      )}

      {/* ══ Delete News Confirmation Modal ══ */}
      {deleteNewsTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteNewsTarget(null)}>
          <p className="modal-confirm-text">
            Are you sure you want to delete this news item?
            <br />
            <span className="modal-confirm-sub">This action cannot be undone.</span>
          </p>
          <div className="modal-actions">
            <button className="admin-btn-secondary" onClick={() => setDeleteNewsTarget(null)}>
              Cancel
            </button>
            <button className="admin-btn-danger" onClick={confirmDeleteNews}>
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}

      {/* ══ Delete Team Confirmation Modal ══ */}
      {deleteTeamTarget && (
        <Modal title="Confirm Remove" onClose={() => setDeleteTeamTarget(null)}>
          <p className="modal-confirm-text">
            Are you sure you want to remove this team member?
            <br />
            <span className="modal-confirm-sub">This action cannot be undone.</span>
          </p>
          <div className="modal-actions">
            <button className="admin-btn-secondary" onClick={() => setDeleteTeamTarget(null)}>
              Cancel
            </button>
            <button className="admin-btn-danger" onClick={confirmDeleteTeam}>
              Yes, Remove
            </button>
          </div>
        </Modal>
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

  // Support both images[] array and legacy imageUrl string
  const cover = project.images?.[0] ?? project.imageUrl ?? '';
  const extraCount = (project.images?.length ?? 0) - 1;

  return (
    <div className="admin-project-card">
      {cover ? (
        <div style={{ position: 'relative' }}>
          <img
            src={cover}
            alt={project.title}
            className="admin-project-img"
            loading="lazy"
          />
          {extraCount > 0 && (
            <div style={{
              position: 'absolute', bottom: '6px', right: '6px',
              background: 'rgba(0,0,0,0.65)', color: '#fff',
              borderRadius: '12px', padding: '2px 8px', fontSize: '0.75rem',
            }}>
              +{extraCount} more
            </div>
          )}
        </div>
      ) : (
        <div className="admin-project-img admin-project-img--placeholder">No Image</div>
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
    title: project?.title ?? '',
    description: project?.description ?? '',
    categoryId: project?.categoryId ?? '',
  });

  // Each entry: { type: 'url'|'file', preview: string, file?: File }
  const initImages = () => {
    const existing = project?.images ?? (project?.imageUrl ? [project.imageUrl] : []);
    return existing.map(url => ({ type: 'url', preview: url, file: null }));
  };
  const [images, setImages] = useState(initImages);
  const [urlInput, setUrlInput] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Add image by URL
  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setImages(prev => [...prev, { type: 'url', preview: trimmed, file: null }]);
    setUrlInput('');
  };

  // Add images via file picker (multiple)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.some(f => !f.type.startsWith('image/'))) {
      onError('Only image files are allowed.');
      return;
    }
    const newEntries = files.map(file => ({
      type: 'file',
      preview: URL.createObjectURL(file),
      file,
    }));
    setImages(prev => [...prev, ...newEntries]);
    e.target.value = '';
  };

  // Remove individual image
  const handleRemove = (idx) => {
    setImages(prev => {
      const copy = [...prev];
      if (copy[idx].type === 'file') URL.revokeObjectURL(copy[idx].preview);
      copy.splice(idx, 1);
      return copy;
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return onError('Add at least one image.');

    setSaving(true);

    try {
      const urlEntries = images.filter(i => i.type === 'url');
      const fileEntries = images.filter(i => i.type === 'file');

      // Step 1 — Upload local files to Supabase Storage
      let uploadedUrls = [];
      if (fileEntries.length > 0) {
        console.log('[handleSubmit] Uploading', fileEntries.length, 'file(s) to Supabase…');
        uploadedUrls = await uploadImagesToSupabase(fileEntries.map(i => i.file));
        console.log('[handleSubmit] ✅ Supabase uploads resolved. URLs:', uploadedUrls);
      }

      // Step 2 — Rebuild final ordered URL list (preserves user ordering)
      let uploadIdx = 0;
      const finalImages = images.map(entry =>
        entry.type === 'url' ? entry.preview : uploadedUrls[uploadIdx++]
      );
      console.log('[handleSubmit] Final image list:', finalImages);

      // Step 3 — Save to Firestore
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        categoryId: form.categoryId,
        images: finalImages,
        imageUrl: finalImages[0] ?? null, // backward-compat cover
      };
      console.log('[handleSubmit] Saving payload to Firestore:', payload);

      if (mode === 'edit') {
        await updateProject(project.id, payload);
        console.log('[handleSubmit] ✅ Project updated.');
        onSuccess('Project updated!');
      } else {
        await addProject(payload);
        console.log('[handleSubmit] ✅ Project added.');
        onSuccess('Project added!');
      }
    } catch (err) {
      console.error('[handleSubmit] ❌ UPLOAD/SAVE ERROR:', err);
      onError('Upload failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={mode === 'edit' ? '✏️ Edit Project' : '➕ Add New Project'} onClose={onClose}>
      <form className="admin-form" onSubmit={handleSubmit}>

        {/* Title + Category */}
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label htmlFor="pf-title">Project Title *</label>
            <input id="pf-title" type="text"
              placeholder="e.g. Mr. Thrimurthy Landscape"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="pf-category">Category *</label>
            <select id="pf-category" value={form.categoryId}
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
          <textarea id="pf-desc" rows={3}
            placeholder="Brief description of the project…"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>

        {/* Images */}
        <div className="admin-form-group">
          <label>
            Images * <span style={{ opacity: 0.5, fontWeight: 400 }}>({images.length} added — first is the cover)</span>
          </label>

          {/* URL row */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input type="url" placeholder="Paste image URL and click Add…"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleAddUrl}
              className="admin-btn-secondary"
              style={{ whiteSpace: 'nowrap', padding: '0 14px' }}>
              + Add URL
            </button>
          </div>

          {/* File upload zone */}
          <input ref={fileInputRef} type="file" accept="image/*" multiple
            style={{ display: 'none' }} onChange={handleFileChange} />
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed rgba(61,122,94,0.5)', borderRadius: '10px',
              padding: '18px', textAlign: 'center', cursor: 'pointer',
              color: 'rgba(232,237,233,0.5)', fontSize: '0.88rem',
              background: 'rgba(61,122,94,0.04)', transition: 'border-color 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#3d7a5e'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(61,122,94,0.5)'}
          >
            📷 Click to upload photos (multiple allowed)
          </div>
        </div>

        {/* Image previews grid */}
        {images.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '8px',
          }}>
            {images.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative', borderRadius: '8px',
                overflow: 'hidden', aspectRatio: '1',
                border: idx === 0 ? '2px solid #3d7a5e' : '2px solid transparent',
              }}>
                <img src={img.preview} alt={`img-${idx}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {idx === 0 && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(61,122,94,0.85)', color: '#fff',
                    fontSize: '0.6rem', textAlign: 'center', padding: '2px',
                  }}>COVER</div>
                )}
                <button type="button" onClick={() => handleRemove(idx)}
                  style={{
                    position: 'absolute', top: '3px', right: '3px',
                    background: 'rgba(239,68,68,0.9)', border: 'none',
                    borderRadius: '50%', width: '18px', height: '18px',
                    cursor: 'pointer', color: '#fff', fontSize: '0.7rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-label="Remove"
                >×</button>
              </div>
            ))}
          </div>
        )}

        {/* Upload progress — shown as indeterminate bar while saving */}
        {saving && (
          <div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: '100%', background: '#3d7a5e',
                animation: 'indeterminate-bar 1.4s ease infinite',
                transformOrigin: 'left',
              }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(232,237,233,0.5)', marginTop: '4px' }}>
              Uploading and saving… please wait
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? <><span className="btn-spinner" /> Saving…</> : mode === 'edit' ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ─── TeamMemberCard ──────────────────────────────────────────────────────────
const TeamMemberCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className="admin-project-card">
      {member.image ? (
        <img src={member.image} alt={member.name} className="admin-project-img" loading="lazy" />
      ) : (
        <div className="admin-project-img admin-project-img--placeholder">No Photo</div>
      )}
      <div className="admin-project-info">
        <h3 className="admin-project-title" style={{ marginTop: '0' }}>{member.name}</h3>
        <p className="admin-project-cat" style={{ color: 'var(--color-accent)', fontWeight: '600' }}>{member.role}</p>
        <div className="admin-project-actions" style={{ marginTop: '12px' }}>
          <button className="admin-btn-edit" onClick={onEdit}>✏️ Edit</button>
          <button className="admin-btn-danger" onClick={onDelete}>🗑️ Remove</button>
        </div>
      </div>
    </div>
  );
};

// ─── TeamFormModal ────────────────────────────────────────────────────────────
const TeamFormModal = ({ mode, member, onClose, onSuccess, onError }) => {
  const [form, setForm] = useState({
    name: member?.name ?? '',
    role: member?.role ?? '',
    image: member?.image ?? '',
    isFounder: member?.isFounder ?? false,
  });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return onError('Only images allowed.');

    setSaving(true);
    try {
      const [url] = await uploadImagesToSupabase([file]);
      setForm(prev => ({ ...prev, image: url }));
      // onSuccess('Photo uploaded!'); // Removed to prevent premature closing of the modal
    } catch (err) {
      onError('Upload failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return onError('Name and Role are required.');

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        image: form.image,
        isFounder: form.isFounder,
      };

      if (mode === 'edit') {
        await updateTeamMember(member.id, payload);
        onSuccess('Member updated!');
      } else {
        await addTeamMember(payload);
        onSuccess('Member added!');
      }
    } catch (err) {
      onError('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={mode === 'edit' ? '✏️ Edit Member' : '➕ Add Team Member'} onClose={onClose}>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Member Photo</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {form.image ? (
              <img src={form.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3d7a5e' }} />
            ) : (
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px dashed rgba(255,255,255,0.1)' }}>👤</div>
            )}
            <div style={{ flex: 1 }}>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              <button type="button" className="admin-btn-secondary" onClick={() => fileInputRef.current.click()} disabled={saving}>
                {form.image ? 'Change Photo' : 'Upload Photo'}
              </button>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Recommended: Square image</p>
            </div>
          </div>
        </div>

        <div className="admin-form-group">
          <label htmlFor="tm-name">Full Name *</label>
          <input id="tm-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </div>

        <div className="admin-form-group">
          <label htmlFor="tm-role">Role / Designation *</label>
          <input id="tm-role" type="text" placeholder="e.g. Principal Architect" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} required />
        </div>

        <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <input
            id="tm-founder"
            type="checkbox"
            checked={form.isFounder}
            onChange={e => setForm(f => ({ ...f, isFounder: e.target.checked }))}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="tm-founder" style={{ cursor: 'pointer', marginBottom: 0, textTransform: 'none' }}>
            Is Founder / Core Team Member? (Shown in Founders section)
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : mode === 'edit' ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ─── NewsCard ─────────────────────────────────────────────────────────────────
const NewsCard = ({ item, onEdit, onDelete }) => {
  const getCatLabel = (cat) => {
    switch (cat) {
      case NEWS_CAT_RECENT: return 'Home News';
      case NEWS_CAT_PUBLICATIONS: return 'Publication';
      case NEWS_CAT_INTERVIEWS: return 'Interview';
      case NEWS_CAT_ONLINE: return 'Online Feature';
      default: return 'News';
    }
  };

  return (
    <div className="admin-project-card">
      {item.image ? (
        <img src={item.image} alt={item.title} className="admin-project-img" loading="lazy" />
      ) : (
        <div className="admin-project-img admin-project-img--placeholder">No Image</div>
      )}
      <div className="admin-project-info">
        <div className="admin-project-meta">
          <span className="admin-project-cat" style={{ background: 'var(--color-accent)', color: '#fff' }}>
            {getCatLabel(item.category)}
          </span>
          <span className="admin-project-date">{item.date}</span>
        </div>
        <h3 className="admin-project-title" style={{ marginTop: '8px' }}>{item.title}</h3>
        <p className="admin-project-desc">{item.text}</p>
        {item.link && (
          <p className="admin-project-desc" style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '4px' }}>
            🔗 {item.link}
          </p>
        )}
        <div className="admin-project-actions">
          <button className="admin-btn-edit" onClick={onEdit}>✏️ Edit</button>
          <button className="admin-btn-danger" onClick={onDelete}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

// ─── NewsFormModal ────────────────────────────────────────────────────────────
const NewsFormModal = ({ mode, item, onClose, onSuccess, onError }) => {
  const [form, setForm] = useState({
    category: item?.category ?? NEWS_CAT_PUBLICATIONS,
    title: item?.title ?? '',
    date: item?.date ?? new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, ' / '),
    text: item?.text ?? '',
    link: item?.link ?? '',
  });
  const [image, setImage] = useState({ type: 'url', preview: item?.image ?? '', file: null });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const isRecentNews = form.category === NEWS_CAT_RECENT;
  const isInterviewOrOnline = form.category === NEWS_CAT_INTERVIEWS || form.category === NEWS_CAT_ONLINE;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return onError('Only image files are allowed.');
    setImage({ type: 'file', preview: URL.createObjectURL(file), file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = image.preview;
      // Only upload if it's not Recent News (as requested)
      if (!isRecentNews && image.type === 'file' && image.file) {
        imageUrl = await uploadImageToSupabase(image.file);
      }

      const payload = { 
        ...form, 
        image: isRecentNews ? null : imageUrl,
        link: isRecentNews || form.category === NEWS_CAT_PUBLICATIONS ? null : form.link 
      };

      if (mode === 'edit') {
        await updateNews(item.id, payload);
        onSuccess('News item updated!');
      } else {
        await addNews(payload);
        onSuccess('News item added!');
      }
    } catch (err) {
      onError('Action failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={mode === 'edit' ? '✏️ Edit News' : '➕ Add News'} onClose={onClose}>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Category *</label>
          <select 
            value={form.category} 
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value={NEWS_CAT_RECENT}>Home Page - Recent News</option>
            <option value={NEWS_CAT_PUBLICATIONS}>News Page - Recent Publication</option>
            <option value={NEWS_CAT_INTERVIEWS}>News Page - Media Interview</option>
            <option value={NEWS_CAT_ONLINE}>News Page - Online Feature</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>{isRecentNews ? 'News Number (e.g. 01) *' : 'News Title *'}</label>
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>

        <div className="admin-form-group">
          <label>Date (e.g. 16 / 01 / 2025)</label>
          <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>

        <div className="admin-form-group">
          <label>Description / Text</label>
          <textarea rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} />
        </div>

        {!isRecentNews && (
          <div className="admin-form-group">
            <label>News Image *</label>
            <div 
              className="image-upload-zone"
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed rgba(61,122,94,0.5)', borderRadius: '10px',
                padding: '20px', textAlign: 'center', cursor: 'pointer',
                background: 'rgba(61,122,94,0.04)', marginBottom: '12px'
              }}
            >
              {image.preview ? (
                <img src={image.preview} alt="Preview" style={{ maxHeight: '120px', borderRadius: '6px' }} />
              ) : (
                <span style={{ opacity: 0.6 }}>📷 Click to upload news photo</span>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
        )}

        {isInterviewOrOnline && (
          <div className="admin-form-group">
            <label>External Link (e.g. Youtube/Website Link) *</label>
            <input 
              type="url" 
              placeholder="https://..." 
              value={form.link} 
              onChange={e => setForm({ ...form, link: e.target.value })} 
              required 
            />
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : mode === 'edit' ? 'Update News' : 'Add News'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ─── NewsOrderModal ───────────────────────────────────────────────────────────
const NewsOrderModal = ({ news, onClose, onSuccess, onError }) => {
  const [activeOrderCat, setActiveOrderCat] = useState(NEWS_CAT_PUBLICATIONS);
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Filter items by selected category and sort them by current order/createdAt
    const filtered = news
      .filter(n => n.category === activeOrderCat)
      .sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0);
      });
    setItems(filtered);
  }, [activeOrderCat, news]);

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      // Map new order based on current index in the list
      const updates = items.map((item, index) => ({
        id: item.id,
        order: index + 1 // 1-based ordering
      }));
      await updateNewsOrder(updates);
      onSuccess('Order updated successfully!');
    } catch (err) {
      onError('Failed to save order: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="📦 Manage News Order" onClose={onClose}>
      <div className="admin-form">
        <div className="admin-form-group">
          <label>Select Category to Reorder</label>
          <select 
            value={activeOrderCat} 
            onChange={e => setActiveOrderCat(e.target.value)}
            disabled={saving}
          >
            <option value={NEWS_CAT_RECENT}>Home Page News</option>
            <option value={NEWS_CAT_PUBLICATIONS}>Recent Publication</option>
            <option value={NEWS_CAT_INTERVIEWS}>Media Interview</option>
            <option value={NEWS_CAT_ONLINE}>Online Feature</option>
          </select>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '8px' }}>
            💡 Drag items up or down to change their display order on the website.
          </p>
        </div>

        <div className="admin-reorder-list-container" style={{ 
          maxHeight: '400px', 
          overflowY: 'auto', 
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '12px',
          padding: '10px'
        }}>
          {items.length === 0 ? (
            <div className="admin-empty" style={{ padding: '40px 0' }}>No items in this category.</div>
          ) : (
            <Reorder.Group axis="y" values={items} onReorder={setItems} className="admin-reorder-list">
              {items.map(item => (
                <Reorder.Item key={item.id} value={item} className="admin-reorder-item">
                  <div className="reorder-handle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 9h8M8 15h8" />
                    </svg>
                  </div>
                  <div className="reorder-content">
                    <span className="reorder-title">{item.title}</span>
                    <span className="reorder-date">{item.date}</span>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>
            Close
          </button>
          <button 
            type="button" 
            className="admin-btn-primary" 
            onClick={handleSaveOrder} 
            disabled={saving || items.length < 2}
          >
            {saving ? 'Saving...' : 'Save New Order'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── ProjectOrderModal ────────────────────────────────────────────────────────
const ProjectOrderModal = ({ projects, categories, onClose, onSuccess, onError }) => {
  const [activeCat, setActiveCat] = useState('all');
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const filtered = projects
      .filter(p => activeCat === 'all' || p.categoryId === activeCat)
      .sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0);
      });
    setItems(filtered);
  }, [activeCat, projects]);

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      const updates = items.map((item, index) => ({ id: item.id, order: index + 1 }));
      await updateProjectsOrder(updates);
      onSuccess('Projects order updated!');
    } catch (err) {
      onError('Failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="📦 Project Display Order" onClose={onClose}>
      <div className="admin-form">
        <div className="admin-form-group">
          <label>Filter by Category</label>
          <select value={activeCat} onChange={e => setActiveCat(e.target.value)}>
            <option value="all">All Projects</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="admin-reorder-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="admin-reorder-list">
            {items.map(item => (
              <Reorder.Item key={item.id} value={item} className="admin-reorder-item">
                <div className="reorder-handle">⠿</div>
                <div className="reorder-content">
                  <span className="reorder-title">{item.title}</span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button className="admin-btn-secondary" onClick={onClose} disabled={saving}>Close</button>
          <button className="admin-btn-primary" onClick={handleSaveOrder} disabled={saving || items.length < 2}>
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── TeamOrderModal ───────────────────────────────────────────────────────────
const TeamOrderModal = ({ team, onClose, onSuccess, onError }) => {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sorted = [...team].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0);
    });
    setItems(sorted);
  }, [team]);

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      const updates = items.map((item, index) => ({ id: item.id, order: index + 1 }));
      await updateTeamOrder(updates);
      onSuccess('Team order updated!');
    } catch (err) {
      onError('Failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="👥 Team Display Order" onClose={onClose}>
      <div className="admin-form">
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Drag members to change their sequence in the "About Us" section.</p>
        <div className="admin-reorder-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="admin-reorder-list">
            {items.map(item => (
              <Reorder.Item key={item.id} value={item} className="admin-reorder-item">
                <div className="reorder-handle">⠿</div>
                <div className="reorder-content">
                  <span className="reorder-title">{item.name}</span>
                  <span className="reorder-date">{item.role}</span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button className="admin-btn-secondary" onClick={onClose} disabled={saving}>Close</button>
          <button className="admin-btn-primary" onClick={handleSaveOrder} disabled={saving || items.length < 2}>
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── CategoryOrderModal ───────────────────────────────────────────────────────
const CategoryOrderModal = ({ categories, onClose, onSuccess, onError }) => {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sorted = [...categories].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name?.localeCompare(b.name);
    });
    setItems(sorted);
  }, [categories]);

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      const updates = items.map((item, index) => ({ id: item.id, order: index + 1 }));
      await updateCategoriesOrder(updates);
      onSuccess('Category order updated!');
    } catch (err) {
      onError('Failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="📂 Category List Order" onClose={onClose}>
      <div className="admin-form">
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Drag to change how categories appear in filter dropdowns.</p>
        <div className="admin-reorder-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="admin-reorder-list">
            {items.map(item => (
              <Reorder.Item key={item.id} value={item} className="admin-reorder-item">
                <div className="reorder-handle">⠿</div>
                <div className="reorder-content">
                  <span className="reorder-title">{item.name}</span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="modal-actions" style={{ marginTop: '20px' }}>
          <button className="admin-btn-secondary" onClick={onClose} disabled={saving}>Close</button>
          <button className="admin-btn-primary" onClick={handleSaveOrder} disabled={saving || items.length < 2}>
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AdminDashboard;

