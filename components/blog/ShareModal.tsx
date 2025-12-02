'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  X, 
  Link2, 
  Mail, 
  Check,
  Share2,
  MessageCircle
} from 'lucide-react'

// Icônes SVG personnalisées pour les réseaux sociaux
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  postTitle: string
  postUrl: string
  postExcerpt?: string
  onShareComplete?: () => void
}

interface ShareOption {
  name: string
  icon: React.ReactNode
  color: string
  hoverColor: string
  action: () => void
}

export default function ShareModal({
  isOpen,
  onClose,
  postTitle,
  postUrl,
  postExcerpt = '',
  onShareComplete
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

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

  // Fermer en cliquant dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      trackShare('copy')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  const trackShare = async (platform: string) => {
    try {
      const postId = postUrl.split('/').pop() // Extraire le slug
      await fetch(`/api/blog/${postId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform })
      })
      onShareComplete?.()
    } catch (err) {
      console.error('Erreur tracking share:', err)
    }
  }

  const shareOptions: ShareOption[] = [
    {
      name: 'Copier le lien',
      icon: copied ? <Check className="w-6 h-6" /> : <Link2 className="w-6 h-6" />,
      color: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      action: handleCopyLink
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#1da851]',
      action: () => {
        const text = encodeURIComponent(`${postTitle}\n\n${postUrl}`)
        window.open(`https://wa.me/?text=${text}`, '_blank')
        trackShare('whatsapp')
      }
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#0d65d9]',
      action: () => {
        const url = encodeURIComponent(postUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400')
        trackShare('facebook')
      }
    },
    {
      name: 'X (Twitter)',
      icon: <XTwitterIcon />,
      color: 'bg-black',
      hoverColor: 'hover:bg-gray-800',
      action: () => {
        const text = encodeURIComponent(postTitle)
        const url = encodeURIComponent(postUrl)
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400')
        trackShare('twitter')
      }
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      color: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#004182]',
      action: () => {
        const url = encodeURIComponent(postUrl)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400')
        trackShare('linkedin')
      }
    },
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      action: () => {
        const subject = encodeURIComponent(postTitle)
        const body = encodeURIComponent(`Je voulais partager cet article avec toi :\n\n${postTitle}\n\n${postExcerpt}\n\nLire l'article : ${postUrl}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
        trackShare('email')
      }
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="
          relative w-full max-w-md
          bg-white dark:bg-gray-900
          rounded-2xl shadow-2xl
          transform transition-all duration-300 ease-out
          animate-in fade-in zoom-in-95
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Partager cet article
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Titre de l'article */}
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {postTitle}
          </p>
        </div>

        {/* Boutons de partage */}
        <div className="p-5 grid grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="
                flex flex-col items-center gap-2 p-4
                rounded-xl
                transition-all duration-200
                hover:scale-105 active:scale-95
                group
              "
            >
              <div className={`
                w-14 h-14 rounded-full
                ${option.color} ${option.hoverColor}
                flex items-center justify-center
                text-white
                shadow-lg
                transition-all duration-200
                group-hover:shadow-xl
              `}>
                {option.icon}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        {/* URL à copier */}
        <div className="px-5 pb-5">
          <div className="
            flex items-center gap-2 p-3
            bg-gray-100 dark:bg-gray-800
            rounded-lg
            text-sm text-gray-600 dark:text-gray-400
          ">
            <Link2 className="w-4 h-4 flex-shrink-0" />
            <span className="truncate flex-1">{postUrl}</span>
            <button
              onClick={handleCopyLink}
              className="
                px-3 py-1 
                bg-blue-500 hover:bg-blue-600 
                text-white text-xs font-medium
                rounded-md
                transition-colors
              "
            >
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
