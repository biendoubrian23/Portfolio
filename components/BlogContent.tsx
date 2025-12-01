'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/supabase'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Category {
  id: string
  name: string
  icon: string
}

interface BlogContentProps {
  posts: BlogPost[]
  categories: Category[]
}

type SortOption = 'recent' | 'popular' | 'oldest'

function ArticleCard({ post }: { post: BlogPost }) {
  const publishedDate = post.published_at 
    ? format(new Date(post.published_at), 'd MMM yyyy', { locale: fr })
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image de couverture avec badge catégorie */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">📝</span>
            </div>
          )}
          {/* Badge catégorie sur l'image */}
          {post.category && (
            <span className="absolute top-4 left-4 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-lg">
              {post.category}
            </span>
          )}
        </div>

        {/* Contenu */}
        <div className="p-5">
          {/* Meta: Date, Auteur, Temps de lecture */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            {publishedDate && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {publishedDate}
              </span>
            )}
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author_name}
            </span>
            {post.reading_time_minutes && (
              <>
                <span className="text-gray-300">•</span>
                <span>{post.reading_time_minutes} min</span>
              </>
            )}
          </div>

          {/* Titre */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>

          {/* Extrait */}
          {post.excerpt && (
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Footer: Lire l'article + Vues */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 flex items-center gap-1">
              Lire l&apos;article
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views_count || 0}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Featured Article Card (for top 3)
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block relative h-64 rounded-xl overflow-hidden">
      {post.cover_image_url ? (
        <Image
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-6xl">📝</span>
        </div>
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {post.category && (
          <span className="inline-block text-xs font-semibold bg-blue-600 px-2.5 py-1 rounded-full mb-2">
            {post.category}
          </span>
        )}
        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm mt-1 line-clamp-1">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query) ||
        p.tags?.some(t => t.toLowerCase().includes(query))
      )
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.published_at || 0).getTime() - new Date(b.published_at || 0).getTime())
        break
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime())
    }

    return result
  }, [posts, selectedCategory, sortBy, searchQuery])

  // Get featured posts (top 3 by views)
  const featuredPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
      .slice(0, 3)
  }, [posts])

  // Count posts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length }
    posts.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1
      }
    })
    return counts
  }, [posts])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Sujets d&apos;expertise
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => {
                const count = categoryCounts[cat.id] || 0
                const isActive = selectedCategory === cat.id

                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="flex-1 text-sm font-medium">{cat.name}</span>
                      {count > 0 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Suivez-moi</h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/brian-biendou-429106201/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/biendoubrian23"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Featured Section - Only show when no filters */}
        {selectedCategory === 'all' && !searchQuery && featuredPosts.length >= 3 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-2xl">🔥</span> Articles Populaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredPosts.map((post) => (
                <FeaturedCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Articles Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'Tous les articles' : selectedCategory}
            <span className="text-gray-400 font-normal ml-2">({filteredPosts.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Trier par :</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSortBy('recent')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  sortBy === 'recent' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Récent
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  sortBy === 'popular' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Populaire
              </button>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? `Aucun résultat pour "${searchQuery}"`
                : 'Aucun article dans cette catégorie pour le moment.'
              }
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Voir tous les articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
