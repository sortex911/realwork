import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    '[Supabase] Missing environment variables.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Constants ────────────────────────────────────────────────────────────────
export const STORAGE_BUCKET = 'portfolio-assets';
export const CATEGORIES = {
  LANDSCAPING: 'landscaping',
  TEAM: 'team',
  PROJECTS: 'projects',
  GENERAL: 'general'
};

// ─── Initialization ──────────────────────────────────────────────────────────
/**
 * Programmatically ensures the public bucket exists.
 */
export const initializeStorage = async () => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;

    const bucketExists = buckets.some(b => b.name === STORAGE_BUCKET);

    if (!bucketExists) {
      console.log(`[Supabase] Creating public bucket: ${STORAGE_BUCKET}...`);
      const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });
      if (createError) throw createError;
      console.log(`[Supabase] Bucket ${STORAGE_BUCKET} created successfully.`);
    } else {
      console.log(`[Supabase] Bucket ${STORAGE_BUCKET} already exists.`);
    }
  } catch (err) {
    console.error('[Supabase] Initialization failed:', err.message);
  }
};

// ─── Upload Logic ────────────────────────────────────────────────────────────
/**
 * Upload an image with folder categorization and automatic compression.
 * 
 * @param {File} file - The image file
 * @param {string} category - Folder category (e.g., 'projects', 'team')
 * @returns {Promise<string>} Public URL
 */
export const uploadImageToSupabase = async (file, category = CATEGORIES.GENERAL) => {
  // ── Compression Options ──
  const options = {
    maxSizeMB: 2,            // Compress to maximum 2MB
    maxWidthOrHeight: 1920,   // Max resolution 1920px
    useWebWorker: true,
  };

  let fileToUpload = file;

  try {
    console.log(`[Supabase] Compressing image: ${file.name} (Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    fileToUpload = await imageCompression(file, options);
    console.log(`[Supabase] Compression complete: ${(fileToUpload.size / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('[Supabase] Compression failed, proceeding with original file:', error);
  }

  const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  const uniqueName = `${Date.now()}_${safeName}`;
  const filePath = `${category}/${uniqueName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, fileToUpload, {
      cacheControl: '31536000',
      upsert: false,
      contentType: fileToUpload.type || 'image/jpeg'
    });

  if (uploadError) {
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);

  return data?.publicUrl;
};

// ─── CDN Optimization Helper ──────────────────────────────────────────────────
/**
 * Generates an optimized public URL using Supabase Image Transformation.
 * Requires Supabase project to have image transformation enabled.
 * 
 * @param {string} url - The original public URL
 * @param {Object} options - Optimization options (width, quality, format)
 */
export const getOptimizedUrl = (url, options = {}) => {
  if (!url) return '';
  
  // If not a Supabase URL, return as is
  if (!url.includes('supabase.co/storage/v1/object/public')) return url;

  const {
    width = 800,
    quality = 80,
    format = 'webp'
  } = options;

  // Supabase transformation URL structure:
  // [project-url]/storage/v1/render/image/public/[bucket]/[path]?width=[w]&quality=[q]&format=[f]
  
  // Note: Standard public URL is .../object/public/...
  // Transformation URL is .../render/image/public/...
  
  const optimizedBase = url.replace('/object/public/', '/render/image/public/');
  return `${optimizedBase}?width=${width}&quality=${quality}&format=${format}`;
};

export const uploadImagesToSupabase = async (files, category) => {
  if (!files || files.length === 0) return [];
  return Promise.all(Array.from(files).map(f => uploadImageToSupabase(f, category)));
};
