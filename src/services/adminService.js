/**
 * adminService.js — all Firestore + Storage operations for the admin dashboard.
 * Keeps pages thin and logic centralized.
 */

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from '../firebase';

// ─── Collection names ───────────────────────────────────────────────────────
export const COL_PROJECTS   = 'projects';
export const COL_CATEGORIES = 'categories';
export const COL_USERS      = 'users';

// ─── Projects ───────────────────────────────────────────────────────────────

export const addProject = (payload) =>
  addDoc(collection(db, COL_PROJECTS), {
    ...payload,
    createdAt: serverTimestamp(),
  });

export const updateProject = (id, payload) =>
  updateDoc(doc(db, COL_PROJECTS, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });

export const deleteProject = (id) =>
  deleteDoc(doc(db, COL_PROJECTS, id));

// ─── Categories ─────────────────────────────────────────────────────────────

export const addCategory = (name) =>
  addDoc(collection(db, COL_CATEGORIES), { name: name.trim() });

export const deleteCategory = (id) =>
  deleteDoc(doc(db, COL_CATEGORIES, id));

export const fetchCategories = async () => {
  const snap = await getDocs(collection(db, COL_CATEGORIES));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
