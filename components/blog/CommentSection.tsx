'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, User, Clock } from 'lucide-react'

interface Comment {
  id: string
  author_name: string
  content: string
  created_at: string
  parent_id: string | null
}

interface CommentSectionProps {
  postId: string
  postTitle: string
  initialCommentsCount: number
  isOpen: boolean
  onClose: () => void
  onCommentsCountChange?: (count: number) => void
}

export default function CommentSection({
  postId,
  postTitle,
  initialCommentsCount = 0,
  isOpen,
  onClose,
  onCommentsCountChange
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Charger les commentaires quand le panneau s'ouvre
  useEffect(() => {
    if (isOpen) {
      loadComments()
      // Récupérer le nom sauvegardé
      const savedName = localStorage.getItem('blog_comment_author')
      if (savedName) setAuthorName(savedName)
    }
  }, [isOpen, postId])

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Bloquer le scroll du body quand ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const loadComments = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/blog/${postId}/comments`)
      if (!response.ok) throw new Error('Erreur lors du chargement des commentaires')
      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error('Erreur chargement commentaires:', err)
      setError('Impossible de charger les commentaires')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    const finalAuthorName = authorName.trim() || 'Anonyme'

    try {
      const response = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: finalAuthorName,
          content: commentText.trim()
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de l\'envoi du commentaire')
      }

      const data = await response.json()

      // Ajouter le nouveau commentaire en haut
      setComments(prev => [data.comment, ...prev])
      setCommentText('')
      
      // Sauvegarder le nom pour la prochaine fois
      if (authorName.trim()) {
        localStorage.setItem('blog_comment_author', authorName.trim())
      }

      // Notifier le parent du nouveau compteur
      if (onCommentsCountChange) {
        onCommentsCountChange(comments.length + 1)
      }

    } catch (err: any) {
      console.error('Erreur envoi commentaire:', err)
      setError(err.message || 'Impossible d\'envoyer le commentaire')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-opacity duration-300 ease-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Panneau latéral */}
      <div 
        ref={panelRef}
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[480px]
          bg-white dark:bg-gray-900 shadow-2xl z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Commentaires
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {comments.length} commentaire{comments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Formulaire de commentaire */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Votre nom (optionnel)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="
                flex-1 px-3 py-1.5 text-sm
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-600 
                rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
              "
              maxLength={100}
            />
          </div>
          <div className="relative">
            <textarea
              ref={inputRef}
              placeholder="Écrivez votre commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="
                w-full px-4 py-3 text-sm
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-600 
                rounded-xl resize-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
                min-h-[80px]
              "
              maxLength={2000}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">
                {commentText.length}/2000
              </span>
              <button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="
                  flex items-center gap-2 px-4 py-2
                  bg-blue-500 hover:bg-blue-600 
                  text-white text-sm font-medium
                  rounded-lg shadow-sm
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Envoi...' : 'Publier'}
              </button>
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </form>

        {/* Liste des commentaires */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-sm text-gray-500">Chargement...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                Aucun commentaire pour le moment
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Soyez le premier à commenter !
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div 
                key={comment.id}
                className="
                  p-4 rounded-xl
                  bg-gray-50 dark:bg-gray-800/50
                  border border-gray-100 dark:border-gray-700/50
                "
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                      {comment.author_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {comment.author_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatDate(comment.created_at)}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
