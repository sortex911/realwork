/**
 * adminService.js — all Firestore + Supabase operations for the admin dashboard.
 *
 * Image Storage : Supabase Storage  (bucket: "projects")
 * Database      : Firebase Firestore
 */

import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, getDocs,
} from "firebase/firestore";
import { db } from '../firebase';
import {
  uploadImagesToSupabase,
  uploadImageToSupabase,
} from '../lib/supabase';

// ─── Re-export Supabase upload helpers so AdminDashboard only needs one import
export { uploadImageToSupabase, uploadImagesToSupabase };

// ─── Collection names ────────────────────────────────────────────────────────
export const COL_PROJECTS = 'projects';
export const COL_CATEGORIES = 'categories';
export const COL_USERS = 'users';
export const COL_TEAM = 'team';
export const COL_NEWS = 'news';

// ─── News Categories ─────────────────────────────────────────────────────────
export const NEWS_CAT_RECENT = 'recent_news';
export const NEWS_CAT_PUBLICATIONS = 'publications';
export const NEWS_CAT_INTERVIEWS = 'interviews';
export const NEWS_CAT_ONLINE = 'online_features';

// ─── News ────────────────────────────────────────────────────────────────────

/**
 * Add a new news item.
 * @param {{ title, date, text, image }} payload
 */
export const addNews = (payload) =>
  addDoc(collection(db, COL_NEWS), {
    ...payload,
    order: payload.order ?? 999, // High number to put new items at the end by default
    createdAt: serverTimestamp(),
  });

/**
 * Update an existing news item.
 */
export const updateNews = (id, payload) =>
  updateDoc(doc(db, COL_NEWS, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });

/**
 * Bulk update news order.
 * @param {Array<{id, order}>} items 
 */
export const updateNewsOrder = async (items) => {
  const promises = items.map(item => 
    updateDoc(doc(db, COL_NEWS, item.id), { order: item.order })
  );
  return Promise.all(promises);
};

/**
 * Delete a news item.
 */
export const deleteNews = (id) =>
  deleteDoc(doc(db, COL_NEWS, id));

// ─── Team ────────────────────────────────────────────────────────────────────

/**
 * Add a new team member.
 * @param {{ name, role, image }} payload
 */
export const addTeamMember = (payload) =>
  addDoc(collection(db, COL_TEAM), {
    ...payload,
    order: payload.order ?? 999,
    createdAt: serverTimestamp(),
  });

/**
 * Update an existing team member.
 */
export const updateTeamMember = (id, payload) =>
  updateDoc(doc(db, COL_TEAM, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });

/**
 * Bulk update team order.
 */
export const updateTeamOrder = async (items) => {
  const promises = items.map(item => 
    updateDoc(doc(db, COL_TEAM, item.id), { order: item.order })
  );
  return Promise.all(promises);
};

/**
 * Delete a team member.
 */
export const deleteTeamMember = (id) =>
  deleteDoc(doc(db, COL_TEAM, id));

// ─── Projects ────────────────────────────────────────────────────────────────

/**
 * Add a new project document to Firestore.
 * Call uploadImagesToSupabase() FIRST, then pass URLs here.
 *
 * @param {{ title, description, categoryId, images: string[], imageUrl: string }} payload
 */
export const addProject = (payload) =>
  addDoc(collection(db, COL_PROJECTS), {
    ...payload,
    order: payload.order ?? 999,
    createdAt: serverTimestamp(),
  });

/**
 * Update an existing project document.
 */
export const updateProject = (id, payload) =>
  updateDoc(doc(db, COL_PROJECTS, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });

/**
 * Bulk update projects order.
 */
export const updateProjectsOrder = async (items) => {
  const promises = items.map(item => 
    updateDoc(doc(db, COL_PROJECTS, item.id), { order: item.order })
  );
  return Promise.all(promises);
};

/**
 * Delete a project document from Firestore.
 * Note: Supabase Storage files are not deleted here to prevent accidental data loss.
 */
export const deleteProject = (id) =>
  deleteDoc(doc(db, COL_PROJECTS, id));

// ─── Categories ──────────────────────────────────────────────────────────────

export const addCategory = (name) =>
  addDoc(collection(db, COL_CATEGORIES), { 
    name: name.trim(),
    order: 999 
  });

/**
 * Bulk update categories order.
 */
export const updateCategoriesOrder = async (items) => {
  const promises = items.map(item => 
    updateDoc(doc(db, COL_CATEGORIES, item.id), { order: item.order })
  );
  return Promise.all(promises);
};

export const deleteCategory = (id) =>
  deleteDoc(doc(db, COL_CATEGORIES, id));

export const fetchCategories = async () => {
  const snap = await getDocs(collection(db, COL_CATEGORIES));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

