'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface ViewTrackerProps {
  postId: string
}

export default function ViewTracker({ postId }: ViewTrackerProps) {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Ne tracker qu'une seule fois par visite
    if (hasTracked.current) return
    hasTracked.current = true

    const trackView = async () => {
      if (!supabase) return

      // Vérifier si cette vue a déjà été comptée dans cette session
      const sessionKey = `viewed_${postId}`
      const alreadyViewed = sessionStorage.getItem(sessionKey)
      
      if (alreadyViewed) return

      try {
        // Essayer d'abord avec la fonction RPC
        const { error: rpcError } = await supabase.rpc('increment_view_count', { post_id: postId })
        
        if (rpcError) {
          // Fallback: incrémenter directement
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

        // Marquer comme vu dans cette session
        sessionStorage.setItem(sessionKey, 'true')
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }

    // Petit délai pour s'assurer que c'est une vraie visite
    const timeout = setTimeout(trackView, 2000)
    
    return () => clearTimeout(timeout)
  }, [postId])

  // Ce composant ne rend rien visuellement
  return null
}
