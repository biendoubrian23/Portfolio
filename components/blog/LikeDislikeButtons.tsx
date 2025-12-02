'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface LikeDislikeButtonsProps {
  postId: string
  initialLikes: number
  initialDislikes: number
  showDislikeCount?: boolean // Par défaut false
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
}

type InteractionType = 'like' | 'dislike' | null

export default function LikeDislikeButtons({
  postId,
  initialLikes = 0,
  initialDislikes = 0,
  showDislikeCount = false,
  size = 'md',
  orientation = 'vertical'
}: LikeDislikeButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userInteraction, setUserInteraction] = useState<InteractionType>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Récupérer l'interaction de l'utilisateur depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`blog_interaction_${postId}`)
    if (stored === 'like' || stored === 'dislike') {
      setUserInteraction(stored)
    }
  }, [postId])

  const handleInteraction = async (type: 'like' | 'dislike') => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await fetch(`/api/blog/${postId}/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type,
          previousType: userInteraction 
        })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'interaction')
      }

      const data = await response.json()

      // Mise à jour optimiste
      if (userInteraction === type) {
        // Toggle off - retirer l'interaction
        if (type === 'like') setLikes(prev => Math.max(0, prev - 1))
        else setDislikes(prev => Math.max(0, prev - 1))
        setUserInteraction(null)
        localStorage.removeItem(`blog_interaction_${postId}`)
      } else {
        // Nouvelle interaction ou changement
        if (userInteraction === 'like') setLikes(prev => Math.max(0, prev - 1))
        if (userInteraction === 'dislike') setDislikes(prev => Math.max(0, prev - 1))
        
        if (type === 'like') setLikes(prev => prev + 1)
        else setDislikes(prev => prev + 1)
        
        setUserInteraction(type)
        localStorage.setItem(`blog_interaction_${postId}`, type)
      }

      // Si le serveur renvoie les vrais compteurs, les utiliser
      if (data.likes !== undefined) setLikes(data.likes)
      if (data.dislikes !== undefined) setDislikes(data.dislikes)

    } catch (error) {
      console.error('Erreur interaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Tailles des icônes et boutons
  const sizeClasses = {
    sm: { icon: 16, button: 'p-1.5', text: 'text-xs' },
    md: { icon: 20, button: 'p-2', text: 'text-sm' },
    lg: { icon: 24, button: 'p-3', text: 'text-base' }
  }

  const currentSize = sizeClasses[size]
  const containerClass = orientation === 'vertical' 
    ? 'flex flex-col gap-2' 
    : 'flex flex-row gap-3'

  return (
    <div className={containerClass}>
      {/* Bouton Like */}
      <button
        onClick={() => handleInteraction('like')}
        disabled={isLoading}
        className={`
          ${currentSize.button}
          flex items-center gap-1.5 rounded-full
          transition-all duration-200 ease-out
          ${userInteraction === 'like' 
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-110' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          group
        `}
        aria-label={`J'aime (${likes})`}
        title="J'aime cet article"
      >
        <ThumbsUp 
          size={currentSize.icon} 
          className={`transition-transform ${userInteraction === 'like' ? 'scale-110' : 'group-hover:scale-110'}`}
          fill={userInteraction === 'like' ? 'currentColor' : 'none'}
        />
        {likes > 0 && (
          <span className={`${currentSize.text} font-medium min-w-[1.5rem]`}>
            {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
          </span>
        )}
      </button>

      {/* Bouton Dislike */}
      <button
        onClick={() => handleInteraction('dislike')}
        disabled={isLoading}
        className={`
          ${currentSize.button}
          flex items-center gap-1.5 rounded-full
          transition-all duration-200 ease-out
          ${userInteraction === 'dislike' 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          group
        `}
        aria-label={showDislikeCount ? `Je n'aime pas (${dislikes})` : "Je n'aime pas"}
        title="Je n'aime pas cet article"
      >
        <ThumbsDown 
          size={currentSize.icon}
          className={`transition-transform ${userInteraction === 'dislike' ? 'scale-110' : 'group-hover:scale-110'}`}
          fill={userInteraction === 'dislike' ? 'currentColor' : 'none'}
        />
        {showDislikeCount && dislikes > 0 && (
          <span className={`${currentSize.text} font-medium min-w-[1.5rem]`}>
            {dislikes >= 1000 ? `${(dislikes / 1000).toFixed(1)}k` : dislikes}
          </span>
        )}
      </button>
    </div>
  )
}
