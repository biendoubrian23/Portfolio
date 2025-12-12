import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getPublishedPosts, getRelatedPosts, BlogPost } from '@/lib/supabase'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import ShareButtons from '@/components/ShareButtons'
import ViewTracker from '@/components/ViewTracker'
import { FloatingActionBar } from '@/components/blog'
import CodeBlock, { InlineCode } from '@/components/CodeBlock'

/**
 * Nettoie et formate le contenu Markdown pour un affichage professionnel
 * - Extrait le contenu si c'est du JSON mal parsé
 * - Améliore la structure des paragraphes
 * - Formate les citations avec guillemets français
 * - Ajoute des espacements appropriés
 */
function cleanAndFormatContent(rawContent: string): string {
  if (!rawContent) return ''
  
  let content = rawContent

  // 1. Remplacer les \n littéraux par de vrais retours à la ligne
  content = content.replace(/\\n/g, '\n')
  
  // 2. Détecter si c'est un JSON mal parsé et extraire le vrai contenu
  const jsonKeyPattern = /"(title|meta_description|keywords|excerpt|content|category|tags|sources|reading_time_minutes|focus_keyword)":/
  
  if (jsonKeyPattern.test(content)) {
    const contentMatch = content.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"|"\s*})/);
    if (contentMatch && contentMatch[1]) {
      content = contentMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
    } else {
      content = content
        .replace(/^\s*"(title|meta_description|keywords|excerpt|category|tags|sources|reading_time_minutes|focus_keyword)"\s*:.*$/gm, '')
        .replace(/^\s*[{}\[\]]\s*$/gm, '')
        .replace(/^\s*"content"\s*:\s*"/gm, '')
        .replace(/",?\s*$/gm, '')
    }
  }

  // 3. Nettoyer les artefacts JSON
  content = content
    .replace(/\{\s*"title"[\s\S]*?"content"\s*:\s*"/g, '')
    .replace(/^\s*"[a-z_]+"\s*:\s*(\[.*?\]|".*?"),?\s*$/gim, '')
    .replace(/"\s*,?\s*$/gm, '')
    .replace(/\n{4,}/g, '\n\n')
    .trim()

  // 4. Améliorer la structure Markdown
  content = content
    // Supprimer le titre # principal (déjà affiché dans le header)
    .replace(/^#\s+[^\n]+\n+/, '')
    // Espacer les titres ##
    .replace(/([^\n])\n(#{2,})/g, '$1\n\n$2')
    .replace(/(#{2,}[^\n]+)\n([^\n#])/g, '$1\n\n$2')
    // Espacer les listes
    .replace(/([^\n])\n([-*]\s)/g, '$1\n\n$2')
    // Espacer les images
    .replace(/([^\n])\n(!\[)/g, '$1\n\n$2')
    .replace(/(\*Crédit[^\n]+)\n([^\n])/g, '$1\n\n$2')

  // 5. AMÉLIORATION DU FORMATAGE DES PARAGRAPHES
  const lines = content.split('\n')
  const improvedLines: string[] = []
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Ignorer les lignes vides mais les conserver pour l'espacement
    if (!trimmed) {
      improvedLines.push('')
      inList = false
      continue
    }
    
    // Détecter les listes
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.match(/^\d+\.\s/)) {
      inList = true
    }
    
    // Détecter les titres (ne pas modifier)
    if (trimmed.startsWith('#')) {
      improvedLines.push(line)
      continue
    }
    
    // Détecter les images (ne pas modifier)
    if (trimmed.startsWith('![') || trimmed.startsWith('*Crédit')) {
      improvedLines.push(line)
      continue
    }
    
    // Convertir les guillemets anglais en français pour les citations
    let processedLine = line
      .replace(/"([^"]+)"/g, '« $1 »')
      .replace(/"\s*([^"]+)\s*"/g, '« $1 »')
    
    // Améliorer les citations longues (commençant par « et sur plusieurs phrases)
    if (processedLine.includes('« ') && processedLine.length > 150) {
      // C'est probablement une citation importante
      processedLine = processedLine.replace(/^(.*)$/, '*$1*')
    }
    
    improvedLines.push(processedLine)
  }
  
  content = improvedLines.join('\n')

  // 6. S'assurer que chaque paragraphe est bien séparé
  // Diviser les très longs paragraphes (plus de 500 caractères sans saut de ligne)
  const paragraphs = content.split(/\n\n+/)
  const finalParagraphs: string[] = []
  
  for (const para of paragraphs) {
    const trimmedPara = para.trim()
    if (!trimmedPara) continue
    
    // Ne pas toucher aux titres, listes, images
    if (trimmedPara.startsWith('#') || 
        trimmedPara.startsWith('-') || 
        trimmedPara.startsWith('*') ||
        trimmedPara.startsWith('![') ||
        trimmedPara.match(/^\d+\./)) {
      finalParagraphs.push(trimmedPara)
      continue
    }
    
    // Si le paragraphe est très long, essayer de le diviser sur les phrases
    if (trimmedPara.length > 600 && !trimmedPara.includes('\n')) {
      // Diviser sur les points suivis d'une majuscule
      const sentences = trimmedPara.split(/(?<=[.!?])\s+(?=[A-ZÀ-ÿ])/)
      if (sentences.length >= 4) {
        // Regrouper en paragraphes de 2-3 phrases
        const mid = Math.ceil(sentences.length / 2)
        finalParagraphs.push(sentences.slice(0, mid).join(' '))
        finalParagraphs.push(sentences.slice(mid).join(' '))
        continue
      }
    }
    
    finalParagraphs.push(trimmedPara)
  }
  
  content = finalParagraphs.join('\n\n')

  // 7. Vérification finale
  if (content.trim().length === 0) {
    return rawContent
  }

  return content
}

// Générer les pages statiques
export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Metadata dynamique
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    keywords: post.keywords || undefined,
    authors: [{ name: post.author_name }],
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  }
}

// Revalidate every 60 seconds
export const revalidate = 60

function RelatedArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          {post.reading_time_minutes && (
            <p className="text-sm text-gray-500 mt-2">{post.reading_time_minutes} min de lecture</p>
          )}
        </div>
      </article>
    </Link>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post.tags ? await getRelatedPosts(slug, post.tags, 3) : []
  const publishedDate = post.published_at
    ? format(new Date(post.published_at), 'dd MMMM yyyy', { locale: fr })
    : null

  // ✨ Nettoyer et formater le contenu
  const cleanedContent = cleanAndFormatContent(post.content)

  // Vérifier si content_image_url existe et n'est pas déjà dans le contenu
  const hasContentImageInMarkdown = post.content_image_url && cleanedContent.includes(post.content_image_url)
  const showSeparateContentImage = post.content_image_url && !hasContentImageInMarkdown

  // Diviser le contenu en 2 parties pour insérer l'image au milieu
  let contentPart1 = cleanedContent
  let contentPart2 = ''
  
  if (showSeparateContentImage) {
    // Trouver le 2ème titre ## pour couper le contenu
    const lines = cleanedContent.split('\n')
    let h2Count = 0
    let splitIndex = -1
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('## ')) {
        h2Count++
        if (h2Count === 2) {
          splitIndex = i
          break
        }
      }
    }
    
    if (splitIndex > 0) {
      contentPart1 = lines.slice(0, splitIndex).join('\n')
      contentPart2 = lines.slice(splitIndex).join('\n')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 lg:pb-16">
      {/* View Tracker - compte les vues */}
      <ViewTracker postId={post.id} />
      
      {/* Barre d'actions flottante (like, dislike, commentaires, partage) */}
      <FloatingActionBar 
        postId={post.id}
        postTitle={post.title}
        postUrl={`https://brian-biendou.com/blog/${post.slug}`}
        postExcerpt={post.excerpt || ''}
        initialLikes={post.likes_count || 0}
        initialDislikes={post.dislikes_count || 0}
        initialComments={post.comments_count || 0}
        initialShares={post.shares_count || 0}
      />
      
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-6 mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">Accueil</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      {/* Container principal */}
      <div className="flex justify-center px-4">
        {/* Contenu principal de l'article */}
        <div className="flex-1 max-w-4xl">
          <article className="px-6">
        {/* Header */}
        <header className="mb-8">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.category && (
              <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
            {post.tags?.map((tag) => (
              <span key={tag} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                BB
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author_name}</p>
                <p className="text-sm">Software Engineer</p>
              </div>
            </div>
            <span className="hidden md:block text-gray-300">•</span>
            {publishedDate && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {publishedDate}
              </span>
            )}
            {post.reading_time_minutes && (
              <>
                <span className="hidden md:block text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.reading_time_minutes} min de lecture
                </span>
              </>
            )}
            <span className="hidden md:block text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views_count} vues
            </span>
          </div>

          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 lg:p-16 mb-8">
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-700">
            {/* Première partie du contenu (ou tout si pas d'image séparée) */}
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Images avec figure et caption
                img: ({ src, alt }) => {
                  const imgSrc = typeof src === 'string' ? src : '';
                  if (!imgSrc) return null;
                  return (
                    <figure className="my-12">
                      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={imgSrc}
                          alt={alt || 'Image de l\'article'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                      {alt && !alt.includes('Image illustrative') && (
                        <figcaption className="text-center text-sm text-gray-500 mt-4 italic">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  );
                },
                // Titres H2 avec bordure bleue à gauche (style pro)
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-16 mb-8 pl-4 border-l-4 border-blue-500">
                    {children}
                  </h2>
                ),
                // Titres H3
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-12 mb-6">
                    {children}
                  </h3>
                ),
                // Paragraphes aérés avec plus d'espacement
                p: ({ children }) => {
                  // Détecter si c'est une citation longue (contient des guillemets français)
                  const text = String(children)
                  const isQuote = text.startsWith('«') || (text.includes('« ') && text.includes(' »'))
                  
                  if (isQuote && text.length > 100) {
                    return (
                      <blockquote className="my-10 pl-6 pr-4 py-4 border-l-4 border-blue-500 bg-gray-50 rounded-r-lg">
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
                          {children}
                        </p>
                      </blockquote>
                    )
                  }
                  
                  return (
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 text-justify">
                      {children}
                    </p>
                  )
                },
                // Texte en gras plus visible
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900 bg-yellow-50 px-1 rounded">
                    {children}
                  </strong>
                ),
                // Texte en italique - style citation élégant
                em: ({ children }) => {
                  const text = String(children);
                  // Citation avec guillemets français
                  if (text.startsWith('«') || text.startsWith('"')) {
                    return (
                      <span className="block my-10 pl-6 pr-4 py-5 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
                        <span className="text-gray-700 text-lg md:text-xl leading-relaxed italic block">
                          {children}
                        </span>
                      </span>
                    );
                  }
                  // Crédit photo
                  if (text.startsWith('Crédit')) {
                    return (
                      <span className="block text-center text-sm text-gray-500 italic mt-2 mb-8">
                        {children}
                      </span>
                    );
                  }
                  return <em className="italic text-gray-600">{children}</em>;
                },
                // Listes à puces stylées avec plus d'espace
                ul: ({ children }) => (
                  <ul className="my-10 space-y-4 pl-2">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-4 text-gray-700 text-lg leading-relaxed">
                    <span className="text-blue-500 mt-2 text-xl">•</span>
                    <span className="flex-1">{children}</span>
                  </li>
                ),
                // Listes numérotées
                ol: ({ children }) => (
                  <ol className="my-10 space-y-4 list-decimal list-inside pl-2">
                    {children}
                  </ol>
                ),
                // Liens
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors font-medium"
                  >
                    {children}
                  </a>
                ),
                // Blocs de code avec coloration syntaxique
                code: ({ children, className, ...props }) => {
                  // Détecter si c'est un bloc de code (avec ```) ou inline
                  const match = /language-(\w+)/.exec(className || '')
                  const isBlock = match || (typeof children === 'string' && children.includes('\n'))
                  
                  if (isBlock) {
                    const language = match ? match[1] : undefined
                    return (
                      <CodeBlock language={language}>
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    )
                  }
                  
                  // Code inline
                  return <InlineCode>{children}</InlineCode>
                },
                // Wrapper pre pour les blocs de code (juste passer les enfants)
                pre: ({ children }) => <>{children}</>,
                // Citations blockquote
                blockquote: ({ children }) => (
                  <blockquote className="my-8 pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent py-4 pr-4 rounded-r-lg">
                    <div className="text-gray-700 italic text-lg">
                      {children}
                    </div>
                  </blockquote>
                ),
                // Séparateur horizontal
                hr: () => (
                  <hr className="my-10 border-t-2 border-gray-200" />
                ),
              }}
            >
              {showSeparateContentImage ? contentPart1 : post.content}
            </ReactMarkdown>

            {/* Image du milieu (si content_image_url existe et n'est pas dans le Markdown) */}
            {showSeparateContentImage && post.content_image_url && (
              <figure className="my-16 md:my-20">
                {/* Séparateur visuel avant l'image */}
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="px-4 text-gray-400 text-sm">📷</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                
                <div className="relative w-full h-72 md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={post.content_image_url}
                    alt="Illustration de l'article"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                <figcaption className="text-center text-sm text-gray-500 mt-4 italic">
                  📷 Image via Unsplash
                </figcaption>
                
                {/* Séparateur visuel après l'image */}
                <div className="flex items-center justify-center mt-8">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="px-4 text-gray-400 text-sm">✨</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
              </figure>
            )}

            {/* Deuxième partie du contenu (si on a divisé) */}
            {showSeparateContentImage && contentPart2 && (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ src, alt }) => {
                    const imgSrc = typeof src === 'string' ? src : '';
                    if (!imgSrc) return null;
                    return (
                      <figure className="my-8">
                        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={imgSrc}
                            alt={alt || 'Image de l\'article'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                          />
                        </div>
                      </figure>
                    );
                  },
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b-2 border-blue-500">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                  em: ({ children }) => {
                    const text = String(children);
                    if (text.startsWith('«') || text.startsWith('"') || text.startsWith('Crédit')) {
                      return (
                        <span className="block my-6 pl-4 border-l-4 border-blue-500 bg-blue-50 py-3 pr-4 rounded-r-lg italic text-gray-600">
                          {children}
                        </span>
                      );
                    }
                    return <em className="italic text-gray-600">{children}</em>;
                  },
                  ul: ({ children }) => <ul className="my-6 space-y-3">{children}</ul>,
                  li: ({ children }) => (
                    <li className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-500 mt-1.5">•</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent py-4 pr-4 rounded-r-lg">
                      <div className="text-gray-700 italic text-lg">{children}</div>
                    </blockquote>
                  ),
                  // Blocs de code avec coloration syntaxique
                  code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const isBlock = match || (typeof children === 'string' && children.includes('\n'))
                    
                    if (isBlock) {
                      const language = match ? match[1] : undefined
                      return (
                        <CodeBlock language={language}>
                          {String(children).replace(/\n$/, '')}
                        </CodeBlock>
                      )
                    }
                    return <InlineCode>{children}</InlineCode>
                  },
                  pre: ({ children }) => <>{children}</>,
                }}
              >
                {contentPart2}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Sources */}
        {post.sources && post.sources.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Sources & Références
            </h2>
            <ul className="space-y-3">
              {post.sources.map((source, index) => (
                <li key={index} className="overflow-hidden">
                  <a
                    href={source.url || source.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-start gap-2 break-all"
                  >
                    <svg className="w-4 h-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="break-words">
                      {source.url ? source.title : source.title.substring(0, 60) + (source.title.length > 60 ? '...' : '')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Share */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Partager cet article</h2>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Author */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              BB
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl font-bold mb-1">{post.author_name}</h3>
              <p className="text-blue-100 mb-3">Software Engineer | IA & Data | Ex-Airbus, Sopra Steria</p>
              <a
                href="https://www.linkedin.com/in/brian-biendou-429106201/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Me suivre
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <RelatedArticleCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

      </article>
        </div>
      </div>

      {/* Back to blog */}
      <div className="max-w-4xl mx-auto px-6 mt-8 mb-24 lg:mb-0 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux articles
        </Link>
      </div>
    </main>
  )
}
