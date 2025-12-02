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

// GET - Récupérer l'état actuel des interactions pour un post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const ipHash = getIpHash(request)

    // Récupérer les compteurs du post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('likes_count, dislikes_count')
      .eq('id', postId)
      .single()

    if (postError) {
      // Essayer avec le slug
      const { data: postBySlug, error: slugError } = await supabase
        .from('blog_posts')
        .select('id, likes_count, dislikes_count')
        .eq('slug', postId)
        .single()

      if (slugError) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }

      // Vérifier si l'utilisateur a déjà interagi
      const { data: userInteraction } = await supabase
        .from('blog_interactions')
        .select('interaction_type')
        .eq('post_id', postBySlug.id)
        .eq('ip_hash', ipHash)
        .in('interaction_type', ['like', 'dislike'])
        .single()

      return NextResponse.json({
        likes: postBySlug.likes_count || 0,
        dislikes: postBySlug.dislikes_count || 0,
        userInteraction: userInteraction?.interaction_type || null
      })
    }

    // Vérifier si l'utilisateur a déjà interagi
    const { data: userInteraction } = await supabase
      .from('blog_interactions')
      .select('interaction_type')
      .eq('post_id', postId)
      .eq('ip_hash', ipHash)
      .in('interaction_type', ['like', 'dislike'])
      .single()

    return NextResponse.json({
      likes: post.likes_count || 0,
      dislikes: post.dislikes_count || 0,
      userInteraction: userInteraction?.interaction_type || null
    })

  } catch (error) {
    console.error('Error fetching interactions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Ajouter/Toggle une interaction (like ou dislike)
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
    const { type, previousType } = body

    if (!['like', 'dislike'].includes(type)) {
      return NextResponse.json({ error: 'Invalid interaction type' }, { status: 400 })
    }

    const ipHash = getIpHash(request)
    const userAgent = request.headers.get('user-agent') || ''

    // Trouver le post (par ID ou slug)
    let actualPostId = postId
    const { data: postCheck } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', postId)
      .single()

    if (!postCheck) {
      const { data: postBySlug, error: slugError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', postId)
        .single()

      if (slugError || !postBySlug) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      actualPostId = postBySlug.id
    }

    // Vérifier l'interaction existante
    const { data: existingInteraction } = await supabase
      .from('blog_interactions')
      .select('id, interaction_type')
      .eq('post_id', actualPostId)
      .eq('ip_hash', ipHash)
      .in('interaction_type', ['like', 'dislike'])
      .single()

    if (existingInteraction) {
      if (existingInteraction.interaction_type === type) {
        // Toggle off - Supprimer l'interaction
        await supabase
          .from('blog_interactions')
          .delete()
          .eq('id', existingInteraction.id)
      } else {
        // Changer de type (like -> dislike ou vice versa)
        // Supprimer l'ancienne
        await supabase
          .from('blog_interactions')
          .delete()
          .eq('id', existingInteraction.id)
        
        // Ajouter la nouvelle
        await supabase
          .from('blog_interactions')
          .insert({
            post_id: actualPostId,
            interaction_type: type,
            ip_hash: ipHash,
            user_agent: userAgent
          })
      }
    } else {
      // Nouvelle interaction
      await supabase
        .from('blog_interactions')
        .insert({
          post_id: actualPostId,
          interaction_type: type,
          ip_hash: ipHash,
          user_agent: userAgent
        })
    }

    // Récupérer les nouveaux compteurs
    const { data: updatedPost } = await supabase
      .from('blog_posts')
      .select('likes_count, dislikes_count')
      .eq('id', actualPostId)
      .single()

    return NextResponse.json({
      success: true,
      likes: updatedPost?.likes_count || 0,
      dislikes: updatedPost?.dislikes_count || 0
    })

  } catch (error) {
    console.error('Error handling interaction:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
