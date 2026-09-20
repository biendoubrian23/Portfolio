-- Script SQL pour la table scheduled_posts
-- Exécuter dans: Supabase Dashboard > SQL Editor > New Query

-- 1. Créer la table des articles programmés
CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'cancelled')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status 
ON scheduled_posts(status);

CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_at 
ON scheduled_posts(scheduled_at);

-- 3. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_scheduled_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_scheduled_posts_updated_at ON scheduled_posts;
CREATE TRIGGER trigger_scheduled_posts_updated_at
  BEFORE UPDATE ON scheduled_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_scheduled_posts_updated_at();

-- 5. RLS (Row Level Security) - optionnel
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

-- Permettre toutes les opérations pour les utilisateurs anonymes (pour le dev)
CREATE POLICY "Allow all for anon" ON scheduled_posts
  FOR ALL TO anon
  USING (true)
  WITH CHECK (true);

-- 6. Vérifier la création
SELECT 'Table scheduled_posts créée avec succès !' as message;
SELECT * FROM scheduled_posts LIMIT 5;
