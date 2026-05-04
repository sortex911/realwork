/**
 * supabase.js — Supabase client initialisation
 *
 * Used exclusively for image storage (Storage bucket: "projects").
 * Firebase Firestore is still used for all database operations.
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    '[Supabase] Missing environment variables.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Storage bucket name ──────────────────────────────────────────────────────
export const STORAGE_BUCKET = 'projects';

/**
 * Upload a single File to Supabase Storage.
 * Returns the public URL string.
 *
 * @param {File} file
 * @returns {Promise<string>} public URL
 */
export const uploadImageToSupabase = async (file) => {
  // Sanitise: strip spaces + any characters that Supabase rejects in storage keys
  const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  const uniqueName = `${Date.now()}_${safeName}`;   // e.g. 1714638123456_garden.jpg

  // Fallback MIME type for exotic formats (avif, heic, webp, etc.)
  const contentType = file.type || 'application/octet-stream';

  console.log('[Supabase] Uploading:', uniqueName, '| type:', contentType);

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(uniqueName, file, {   // ✅ No folder prefix — root of bucket
      cacheControl: '3600',
      upsert: false,
      contentType,
    });

  if (uploadError) {
    console.error('[Supabase] Upload error for', uniqueName, ':', uploadError);
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  console.log('[Supabase] Upload complete:', uniqueName);

  // getPublicUrl is synchronous — no network call needed
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(uniqueName);

  const url = data?.publicUrl;
  if (!url) throw new Error('[Supabase] Could not generate public URL for: ' + uniqueName);

  console.log('[Supabase] Public URL:', url);
  return url;
};

/**
 * Upload multiple files concurrently.
 * Returns an array of resolved public URL strings.
 *
 * @param {File[]} files
 * @returns {Promise<string[]>}
 */
export const uploadImagesToSupabase = async (files) => {
  if (!files || files.length === 0) return [];
  console.log('[Supabase] Uploading', files.length, 'file(s)…');
  const urls = await Promise.all(Array.from(files).map(uploadImageToSupabase));
  console.log('[Supabase] All uploads done. URLs:', urls);
  return urls;
};
