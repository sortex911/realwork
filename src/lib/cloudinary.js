import imageCompression from 'browser-image-compression';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

export const CATEGORIES = {
  LANDSCAPING: 'landscaping',
  TEAM: 'team',
  PROJECTS: 'projects',
  GENERAL: 'general'
};

/**
 * Generates SHA-1 signature for Cloudinary Authenticated Uploads
 */
const generateSignature = async (folder, timestamp) => {
  const strToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(strToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hex;
};

export const uploadImageToCloudinary = async (file, category = CATEGORIES.GENERAL) => {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error('Missing Cloudinary environment variables.');
  }

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  let fileToUpload = file;
  try {
    console.log(`[Cloudinary] Compressing image: ${file.name}`);
    fileToUpload = await imageCompression(file, options);
  } catch (error) {
    console.error('[Cloudinary] Compression failed, proceeding with original:', error);
  }

  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = await generateSignature(category, timestamp);

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', category);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Cloudinary upload failed: ${data.error.message}`);
  }

  return data.secure_url;
};

export const uploadImagesToCloudinary = async (files, category) => {
  if (!files || files.length === 0) return [];
  return Promise.all(Array.from(files).map(f => uploadImageToCloudinary(f, category)));
};

/**
 * Generates an optimized public URL using Cloudinary Image Transformation.
 */
export const getOptimizedUrl = (url, options = {}) => {
  if (!url) return '';
  if (!url.includes('cloudinary.com/')) return url;

  const {
    width = 800,
    quality = 'auto',
    format = 'auto'
  } = options;

  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`);
};
