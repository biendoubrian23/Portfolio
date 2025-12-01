import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a null client if env vars are missing (for build time)
let supabase: SupabaseClient | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Types pour le blog
export interface BlogPost {
  id: string
  user_id: string | null
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  meta_title: string | null
  meta_description: string | null
  keywords: string[] | null
  canonical_url: string | null
  sources: { title: string; url: string; date?: string }[] | null
  category: string | null
  tags: string[] | null
  author_name: string
  author_avatar_url: string | null
  status: 'draft' | 'scheduled' | 'published'
  published_at: string | null
  scheduled_for: string | null
  views_count: number
  reading_time_minutes: number | null
  created_at: string
  updated_at: string
}

// Fonctions utilitaires
export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    console.warn('Supabase client not initialized - missing env vars')
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    console.warn('Supabase client not initialized - missing env vars')
    return null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export async function incrementViewCount(postId: string): Promise<void> {
  if (!supabase) return
  
  try {
    // Essayer d'abord avec la fonction RPC (plus sûr pour les concurrences)
    const { error: rpcError } = await supabase.rpc('increment_view_count', { post_id: postId })
    
    if (rpcError) {
      // Fallback: incrémenter directement si la RPC n'existe pas
      console.warn('RPC not available, using direct update:', rpcError.message)
      
      // Récupérer le count actuel
      const { data: post } = await supabase
        .from('blog_posts')
        .select('views_count')
        .eq('id', postId)
        .single()
      
      if (post) {
        await supabase
          .from('blog_posts')
          .update({ views_count: (post.views_count || 0) + 1 })
          .eq('id', postId)
      }
    }
  } catch (error) {
    console.error('Error incrementing view count:', error)
  }
}

// Récupérer les statistiques globales du blog
export async function getBlogStats(): Promise<{
  totalPosts: number
  totalViews: number
  categoryCounts: Record<string, number>
  topPosts: BlogPost[]
}> {
  if (!supabase) {
    return { totalPosts: 0, totalViews: 0, categoryCounts: {}, topPosts: [] }
  }

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')

  if (!posts) {
    return { totalPosts: 0, totalViews: 0, categoryCounts: {}, topPosts: [] }
  }

  const totalPosts = posts.length
  const totalViews = posts.reduce((sum, post) => sum + (post.views_count || 0), 0)
  
  const categoryCounts: Record<string, number> = {}
  posts.forEach(post => {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
    }
  })

  const topPosts = [...posts]
    .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
    .slice(0, 5)

  return { totalPosts, totalViews, categoryCounts, topPosts }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  if (!supabase) {
    console.warn('Supabase client not initialized - missing env vars')
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }

  return data || []
}

export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  if (!supabase) {
    console.warn('Supabase client not initialized - missing env vars')
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .overlaps('tags', tags)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return data || []
}
