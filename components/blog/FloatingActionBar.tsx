'use client'

import { useState } from 'react'
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

  return (
    <>
      {/* Barre flottante à gauche */}
      <div 
        className="
          fixed left-4 top-1/2 -translate-y-1/2
          hidden lg:flex flex-col gap-3
          p-3 rounded-2xl
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md
          shadow-xl shadow-black/10
          border border-gray-200/50 dark:border-gray-700/50
          z-30
          animate-in slide-in-from-left duration-500
        "
      >
        {/* Like / Dislike */}
        <LikeDislikeButtons 
          postId={postId}
          initialLikes={initialLikes}
          initialDislikes={initialDislikes}
          showDislikeCount={false}
          size="md"
          orientation="vertical"
        />

        {/* Séparateur */}
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700" />

        {/* Commentaires */}
        <button
          onClick={() => setIsCommentPanelOpen(true)}
          className="
            p-2 rounded-full
            flex items-center gap-1.5
            bg-gray-100 dark:bg-gray-800 
            text-gray-600 dark:text-gray-400 
            hover:bg-blue-100 dark:hover:bg-blue-900/30 
            hover:text-blue-600
            transition-all duration-200
            group
          "
          aria-label={`Commentaires (${commentsCount})`}
          title="Voir les commentaires"
        >
          <MessageCircle 
            size={20} 
            className="transition-transform group-hover:scale-110"
          />
          {commentsCount > 0 && (
            <span className="text-sm font-medium min-w-[1.5rem]">
              {commentsCount >= 1000 ? `${(commentsCount / 1000).toFixed(1)}k` : commentsCount}
            </span>
          )}
        </button>

        {/* Partage */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="
            p-2 rounded-full
            flex items-center gap-1.5
            bg-gray-100 dark:bg-gray-800 
            text-gray-600 dark:text-gray-400 
            hover:bg-purple-100 dark:hover:bg-purple-900/30 
            hover:text-purple-600
            transition-all duration-200
            group
          "
          aria-label={`Partager (${sharesCount})`}
          title="Partager cet article"
        >
          <Share2 
            size={20}
            className="transition-transform group-hover:scale-110"
          />
          {sharesCount > 0 && (
            <span className="text-sm font-medium min-w-[1.5rem]">
              {sharesCount >= 1000 ? `${(sharesCount / 1000).toFixed(1)}k` : sharesCount}
            </span>
          )}
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
