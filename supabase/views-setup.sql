-- Script SQL à exécuter dans Supabase pour le comptage des vues
-- Aller dans: Supabase Dashboard > SQL Editor > New Query

-- 1. Fonction RPC pour incrémenter les vues de manière atomique (évite les race conditions)
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Autoriser l'appel de cette fonction par les utilisateurs anonymes
GRANT EXECUTE ON FUNCTION increment_view_count(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_view_count(UUID) TO authenticated;

-- 3. S'assurer que la colonne views_count existe et a une valeur par défaut
ALTER TABLE blog_posts 
ALTER COLUMN views_count SET DEFAULT 0;

-- 4. Mettre à jour les articles existants qui ont NULL
UPDATE blog_posts 
SET views_count = 0 
WHERE views_count IS NULL;

-- 5. Créer un index pour améliorer les performances des requêtes de tri par vues
CREATE INDEX IF NOT EXISTS idx_blog_posts_views_count 
ON blog_posts(views_count DESC);

-- 6. Créer un index pour les requêtes par catégorie
CREATE INDEX IF NOT EXISTS idx_blog_posts_category 
ON blog_posts(category);

-- 7. Créer un index pour les requêtes par statut et date de publication
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published 
ON blog_posts(status, published_at DESC);

-- 8. Vue pour les statistiques du blog (optionnel)
CREATE OR REPLACE VIEW blog_stats AS
SELECT 
  COUNT(*) as total_posts,
  SUM(views_count) as total_views,
  AVG(views_count) as avg_views,
  MAX(views_count) as max_views,
  COUNT(DISTINCT category) as total_categories
FROM blog_posts
WHERE status = 'published';

-- 9. Vue pour les statistiques par catégorie (optionnel)
CREATE OR REPLACE VIEW blog_category_stats AS
SELECT 
  category,
  COUNT(*) as post_count,
  SUM(views_count) as total_views,
  AVG(views_count) as avg_views
FROM blog_posts
WHERE status = 'published' AND category IS NOT NULL
GROUP BY category
ORDER BY total_views DESC;

-- Vérifier que tout fonctionne
SELECT * FROM blog_stats;
SELECT * FROM blog_category_stats;
