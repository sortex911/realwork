/**
 * adminService.js — all Firestore + Storage operations for the admin dashboard.
 * Keeps pages thin and logic centralized.
 */

import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy, getDocs
} from 'firebase/firestore';
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject
} from 'firebase/storage';
import { db, storage } from '../firebase';

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

export const deleteProject = async (project) => {
  await deleteDoc(doc(db, COL_PROJECTS, project.id));
  // Best-effort storage cleanup
  if (project.imageUrl?.includes('firebasestorage')) {
    try {
      await deleteObject(ref(storage, project.storagePath || project.imageUrl));
    } catch (_) { /* ignore — file may already be gone */ }
  }
};

// ─── Categories ─────────────────────────────────────────────────────────────

export const addCategory = (name) =>
  addDoc(collection(db, COL_CATEGORIES), { name: name.trim() });

export const deleteCategory = (id) =>
  deleteDoc(doc(db, COL_CATEGORIES, id));

export const fetchCategories = async () => {
  const snap = await getDocs(collection(db, COL_CATEGORIES));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ─── Image Upload ────────────────────────────────────────────────────────────

/**
 * Uploads a file to /portfolio/{projectId}/{filename}
 * Returns { downloadURL, storagePath }
 * Calls onProgress(percent: number) during upload.
 */
export const uploadProjectImage = (file, projectId, onProgress) => {
  const safeFilename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const storagePath = `portfolio/${projectId}/${safeFilename}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      'state_changed',
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const downloadURL = await getDownloadURL(task.snapshot.ref);
        resolve({ downloadURL, storagePath });
      }
    );
  });
};
