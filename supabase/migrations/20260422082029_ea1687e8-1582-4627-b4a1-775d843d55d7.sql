-- Add like_count to blessings
ALTER TABLE public.blessings
  ADD COLUMN IF NOT EXISTS like_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS session_id text;

-- Table tracking which device/session liked which blessing
CREATE TABLE IF NOT EXISTS public.blessing_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blessing_id text NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blessing_id, session_id)
);

ALTER TABLE public.blessing_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blessing likes"
  ON public.blessing_likes FOR SELECT USING (true);

CREATE POLICY "Anyone can like a blessing"
  ON public.blessing_likes FOR INSERT WITH CHECK (
    char_length(trim(blessing_id)) between 1 and 64
    AND char_length(trim(session_id)) between 8 and 64
  );

CREATE POLICY "Anyone can unlike their own like"
  ON public.blessing_likes FOR DELETE USING (true);

-- Photo likes table (photos identified by stable string key)
CREATE TABLE IF NOT EXISTS public.photo_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id text NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (photo_id, session_id)
);

ALTER TABLE public.photo_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view photo likes"
  ON public.photo_likes FOR SELECT USING (true);

CREATE POLICY "Anyone can like a photo"
  ON public.photo_likes FOR INSERT WITH CHECK (
    char_length(trim(photo_id)) between 1 and 128
    AND char_length(trim(session_id)) between 8 and 64
  );

CREATE POLICY "Anyone can unlike a photo"
  ON public.photo_likes FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_blessing_likes_blessing ON public.blessing_likes(blessing_id);
CREATE INDEX IF NOT EXISTS idx_photo_likes_photo ON public.photo_likes(photo_id);

-- Allow updating likes count and message (for short edit window) by anyone (controlled by app via session_id check)
CREATE POLICY "Anyone can update blessings"
  ON public.blessings FOR UPDATE USING (true) WITH CHECK (
    char_length(trim(name)) between 1 and 80
    AND char_length(trim(message)) between 1 and 1000
  );