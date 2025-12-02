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

// POST - Enregistrer un partage
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
    const { platform } = body

    const validPlatforms = ['copy', 'whatsapp', 'facebook', 'twitter', 'linkedin', 'email']
    if (!platform || !validPlatforms.includes(platform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
    }

    const actualPostId = await getPostId(postId)
    if (!actualPostId) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const ipHash = getIpHash(request)
    const userAgent = request.headers.get('user-agent') || ''

    // Enregistrer le partage (on permet plusieurs partages par IP pour les stats)
    const { error } = await supabase
      .from('blog_interactions')
      .insert({
        post_id: actualPostId,
        interaction_type: 'share',
        ip_hash: ipHash,
        user_agent: `${platform}:${userAgent.substring(0, 200)}`
      })

    if (error) {
      // Ignorer les erreurs de contrainte unique (même si normalement on n'en aura pas pour share)
      if (!error.code?.includes('23505')) {
        console.error('Error recording share:', error)
      }
    }

    // Récupérer le nouveau compteur
    const { data: updatedPost } = await supabase
      .from('blog_posts')
      .select('shares_count')
      .eq('id', actualPostId)
      .single()

    return NextResponse.json({
      success: true,
      shares: updatedPost?.shares_count || 0,
      platform
    })

  } catch (error) {
    console.error('Error recording share:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
