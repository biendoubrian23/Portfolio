'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from 'lucide-react'
import LikeDislikeButtons from './LikeDislikeButtons'
import CommentSection from './CommentSection'
import ShareModal from './ShareModal'

interface FloatingActionBarProps {
  postId: string
  postTitle: string
  postUrl: string
  postExcerpt?: string
  initialLikes: number
  initialDislikes: number
  initialComments: number
  initialShares: number
}

export default function FloatingActionBar({
  postId,
  postTitle,
  postUrl,
  postExcerpt = '',
  initialLikes = 0,
  initialDislikes = 0,
  initialComments = 0,
  initialShares = 0
}: FloatingActionBarProps) {
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [commentsCount, setCommentsCount] = useState(initialComments)
  const [sharesCount, setSharesCount] = useState(initialShares)
  const [leftPosition, setLeftPosition] = useState(0)

  // Calculer la position à gauche de l'article (max-w-4xl = 896px)
  useEffect(() => {
    const calculatePosition = () => {
      const articleWidth = 896 // max-w-4xl en px
      const barWidth = 56 // Largeur de la barre (~p-3 + icônes)
      const gap = 16 // Espace entre la barre et l'article
      const windowWidth = window.innerWidth
      
      // Position = (largeur fenêtre - largeur article) / 2 - largeur barre - gap
      const articleLeft = (windowWidth - articleWidth) / 2
      const newLeft = Math.max(12, articleLeft - barWidth - gap)
      
      setLeftPosition(newLeft)
    }

    calculatePosition()
    window.addEventListener('resize', calculatePosition)
    return () => window.removeEventListener('resize', calculatePosition)
  }, [])

  return (
    <>
      {/* Barre flottante à gauche de l'article - style MSN */}
      <div 
        className="
          fixed top-1/2 -translate-y-1/2
          hidden xl:flex flex-col items-center gap-2
          py-3 px-2
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-sm
          rounded-xl
          shadow-lg
          border border-gray-100 dark:border-gray-800
          z-30
          transition-all duration-300
        "
        style={{ left: `${leftPosition}px` }}
      >
        {/* Like / Dislike */}
        <LikeDislikeButtons 
          postId={postId}
          initialLikes={initialLikes}
          initialDislikes={initialDislikes}
          showDislikeCount={true}
          size="sm"
          orientation="vertical"
        />

        {/* Séparateur */}
        <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 my-1" />

        {/* Commentaires */}
        <button
          onClick={() => setIsCommentPanelOpen(true)}
          className="
            p-2 rounded-full
            flex flex-col items-center gap-0.5
            text-gray-500 dark:text-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            hover:text-blue-600
            transition-all duration-200
            group
          "
          aria-label={`Commentaires (${commentsCount})`}
          title="Voir les commentaires"
        >
          <MessageCircle 
            size={22} 
            className="transition-transform group-hover:scale-110"
          />
          {commentsCount > 0 && (
            <span className="text-xs font-medium">
              {commentsCount >= 1000 ? `${(commentsCount / 1000).toFixed(1)}k` : commentsCount}
            </span>
          )}
        </button>

        {/* Partage */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="
            p-2 rounded-full
            flex flex-col items-center gap-0.5
            text-gray-500 dark:text-gray-400 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            hover:text-purple-600
            transition-all duration-200
            group
          "
          aria-label={`Partager (${sharesCount})`}
          title="Partager cet article"
        >
          <Share2 
            size={22}
            className="transition-transform group-hover:scale-110"
          />
        </button>
      </div>

      {/* Barre pour écrans moyens (lg mais pas xl) - positionnée plus près */}
      <div 
        className="
          fixed left-3 top-1/2 -translate-y-1/2
          hidden lg:flex xl:hidden flex-col items-center gap-2
          py-3 px-2
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-sm
          rounded-xl
          shadow-lg
          border border-gray-100 dark:border-gray-800
          z-30
        "
      >
        <LikeDislikeButtons 
          postId={postId}
          initialLikes={initialLikes}
          initialDislikes={initialDislikes}
          showDislikeCount={false}
          size="sm"
          orientation="vertical"
        />
        <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 my-1" />
        <button
          onClick={() => setIsCommentPanelOpen(true)}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-all"
        >
          <MessageCircle size={20} />
        </button>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600 transition-all"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Barre mobile en bas */}
      <div 
        className="
          fixed bottom-0 left-0 right-0
          lg:hidden
          flex items-center justify-around
          px-4 py-3
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-md
          border-t border-gray-200 dark:border-gray-700
          shadow-lg shadow-black/10
          z-30
          safe-area-inset-bottom
        "
      >
        {/* Like / Dislike horizontal */}
        <LikeDislikeButtons 
          postId={postId}
          initialLikes={initialLikes}
          initialDislikes={initialDislikes}
          showDislikeCount={false}
          size="sm"
          orientation="horizontal"
        />

        {/* Commentaires */}
        <button
          onClick={() => setIsCommentPanelOpen(true)}
          className="
            flex items-center gap-2 px-4 py-2
            rounded-full
            bg-gray-100 dark:bg-gray-800 
            text-gray-600 dark:text-gray-400 
            hover:bg-blue-100 dark:hover:bg-blue-900/30 
            hover:text-blue-600
            transition-all
          "
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">{commentsCount}</span>
        </button>

        {/* Partage */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="
            flex items-center gap-2 px-4 py-2
            rounded-full
            bg-gray-100 dark:bg-gray-800 
            text-gray-600 dark:text-gray-400 
            hover:bg-purple-100 dark:hover:bg-purple-900/30 
            hover:text-purple-600
            transition-all
          "
        >
          <Share2 size={18} />
          <span className="text-sm font-medium">Partager</span>
        </button>
      </div>

      {/* Panneau de commentaires */}
      <CommentSection 
        postId={postId}
        postTitle={postTitle}
        initialCommentsCount={commentsCount}
        isOpen={isCommentPanelOpen}
        onClose={() => setIsCommentPanelOpen(false)}
        onCommentsCountChange={setCommentsCount}
      />

      {/* Modal de partage */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postTitle={postTitle}
        postUrl={postUrl}
        postExcerpt={postExcerpt}
        onShareComplete={() => setSharesCount(prev => prev + 1)}
      />
    </>
  )
}
