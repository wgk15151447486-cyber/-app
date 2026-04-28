export interface ProjectImage {
  id: string;
  project_id: string;
  user_id: string;
  image_url: string;
  storage_path: string;
  image_role: string;
  is_primary: boolean;
  width: number | null;
  height: number | null;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
}

export interface ProjectImageInsert {
  project_id: string;
  user_id: string;
  image_url: string;
  storage_path: string;
  image_role?: string;
  is_primary?: boolean;
  width?: number | null;
  height?: number | null;
  file_size?: number | null;
  mime_type?: string | null;
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const MAX_IMAGES_PER_PROJECT = 5;
