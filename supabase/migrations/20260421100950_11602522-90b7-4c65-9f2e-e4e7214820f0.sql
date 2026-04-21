CREATE TABLE public.blessings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blessings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blessings are viewable by everyone"
  ON public.blessings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a blessing"
  ON public.blessings FOR INSERT
  WITH CHECK (
    char_length(trim(name)) BETWEEN 1 AND 80
    AND char_length(trim(message)) BETWEEN 1 AND 1000
  );

CREATE INDEX idx_blessings_created_at ON public.blessings (created_at DESC);