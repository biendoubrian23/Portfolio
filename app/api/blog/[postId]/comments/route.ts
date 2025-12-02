import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// Créer un client Supabase pour les API routes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Générer un hash anonyme de l'IP
function getIpHash(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return createHash('sha256').update(ip + (process.env.IP_SALT || 'biendou')).digest('hex').substring(0, 32)
}

// Trouver l'ID réel du post (par ID ou slug)
async function getPostId(postIdOrSlug: string): Promise<string | null> {
  if (!supabase) return null

  // Essayer par ID d'abord
  const { data: byId } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('id', postIdOrSlug)
    .single()

  if (byId) return byId.id

  // Sinon par slug
  const { data: bySlug } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', postIdOrSlug)
    .single()

  return bySlug?.id || null
}

// GET - Récupérer les commentaires d'un post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const actualPostId = await getPostId(postId)
    if (!actualPostId) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const { data: comments, error } = await supabase
      .from('blog_comments')
      .select('id, author_name, content, created_at, parent_id')
      .eq('post_id', actualPostId)
      .eq('is_visible', true)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching comments:', error)
      return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
    }

    return NextResponse.json({
      comments: comments || [],
      total: comments?.length || 0
    })

  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Ajouter un commentaire
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { author_name, content, parent_id } = body

    // Validation
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Le commentaire est requis' }, { status: 400 })
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: 'Le commentaire est trop long (max 2000 caractères)' }, { status: 400 })
    }

    const actualPostId = await getPostId(postId)
    if (!actualPostId) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const ipHash = getIpHash(request)
    const cleanAuthorName = (author_name || 'Anonyme').trim().substring(0, 100)
    const cleanContent = content.trim()

    // Anti-spam basique : pas plus de 3 commentaires par IP par heure
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count: recentCount } = await supabase
      .from('blog_comments')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', oneHourAgo)

    if (recentCount && recentCount >= 5) {
      return NextResponse.json({ 
        error: 'Trop de commentaires récents. Veuillez patienter un peu.' 
      }, { status: 429 })
    }

    // Insérer le commentaire
    const { data: comment, error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: actualPostId,
        author_name: cleanAuthorName,
        content: cleanContent,
        ip_hash: ipHash,
        parent_id: parent_id || null,
        is_approved: true, // Auto-approuvé pour l'instant
        is_visible: true
      })
      .select('id, author_name, content, created_at, parent_id')
      .single()

    if (error) {
      console.error('Error inserting comment:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'ajout du commentaire' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      comment
    })

  } catch (error) {
    console.error('Error posting comment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
