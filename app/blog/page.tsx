import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedPosts, BlogPost } from '@/lib/supabase'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import BlogContent from '@/components/BlogContent'

export const metadata: Metadata = {
  title: 'Blog | Brian Biendou',
  description: 'Articles sur le développement web, l\'intelligence artificielle, le machine learning et les dernières tendances tech. Par Brian Biendou, Software Engineer.',
  keywords: ['blog tech', 'développement web', 'intelligence artificielle', 'machine learning', 'Brian Biendou', 'articles IA'],
  openGraph: {
    title: 'Blog | Brian Biendou',
    description: 'Articles sur le développement web, l\'IA et les tendières tech.',
    type: 'website',
  },
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  // Extraire les catégories uniques des articles avec comptage
  const categoryMap = new Map<string, number>()
  posts.forEach(p => {
    if (p.category) {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1)
    }
  })

  // Construire la liste des catégories dynamiquement depuis la DB
  const dynamicCategories = [
    { id: 'all', name: 'Tous les articles', icon: '📊' },
    ...Array.from(categoryMap.keys()).map(cat => ({
      id: cat,
      name: cat,
      icon: getCategoryIcon(cat)
    }))
  ]

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section - Fond blanc avec quadrillage */}
      <section className="relative bg-white py-16 mb-12 border-b-2 border-black overflow-hidden -mt-24 pt-32">
        {/* Quadrillage */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog de Brian Biendou
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez mes articles sur le développement web, l&apos;intelligence artificielle, 
            le machine learning et les dernières tendances tech.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6">
        <BlogContent posts={posts} categories={dynamicCategories} />
      </div>

      {/* Newsletter CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Restez informé des dernières tendances
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Suivez-moi sur LinkedIn pour ne rien manquer des nouveaux articles et actualités tech.
          </p>
          <a
            href="https://www.linkedin.com/in/brian-biendou-429106201/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Suivre sur LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}

// Fonction pour attribuer une icône à chaque catégorie
function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    'Intelligence Artificielle': '🤖',
    'IA': '🤖',
    'Développement Web': '💻',
    'Web': '💻',
    'Data Science': '📈',
    'Data': '📈',
    'Cloud & DevOps': '☁️',
    'Cloud': '☁️',
    'DevOps': '⚙️',
    'Carrière Tech': '🚀',
    'Carrière': '🚀',
    'Tutoriels': '📚',
    'Tutoriel': '📚',
    'Machine Learning': '🧠',
    'ML': '🧠',
    'Cybersécurité': '🔒',
    'Sécurité': '🔒',
    'Mobile': '📱',
    'Backend': '🖥️',
    'Frontend': '🎨',
    'Blockchain': '⛓️',
    'Productivité': '⚡',
    'Actualités': '📰',
    'News': '📰',
  }
  
  // Recherche insensible à la casse
  const lowerCategory = category.toLowerCase()
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerCategory.includes(key.toLowerCase())) {
      return icon
    }
  }
  
  return '📝' // Icône par défaut
}
