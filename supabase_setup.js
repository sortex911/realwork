import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── Manual .env Parser ──────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

const loadEnv = () => {
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Please create it first.');
    process.exit(1);
  }
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) env[key.trim()] = value.join('=').trim();
  });
  return env;
};

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const STORAGE_BUCKET = 'portfolio-assets';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setup() {
  console.log('🚀 Starting Supabase Storage Setup...');
  
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) throw listError;

    const bucketExists = buckets.some(b => b.name === STORAGE_BUCKET);

    if (!bucketExists) {
      console.log(`📦 Creating public bucket: "${STORAGE_BUCKET}"...`);
      const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });
      if (createError) throw createError;
      console.log(`✅ Bucket "${STORAGE_BUCKET}" created successfully.`);
    } else {
      console.log(`ℹ️ Bucket "${STORAGE_BUCKET}" already exists.`);
    }

    console.log('\n✨ Setup complete! You can now use the OptimizedImage component.');
    console.log('🔗 URL:', SUPABASE_URL);
    console.log('📁 Bucket:', STORAGE_BUCKET);

  } catch (err) {
    console.error('\n❌ Setup failed:', err.message);
  }
}

setup();
