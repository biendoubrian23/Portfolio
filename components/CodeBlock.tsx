'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'

interface CodeBlockProps {
  language?: string
  children: string
}

/**
 * Composant CodeBlock avec coloration syntaxique style VS Code
 * - Fond noir/sombre
 * - Coloration syntaxique avec le thème VS Code Dark+
 * - Bouton copier le code
 * - Affichage du langage
 */
export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Déterminer le langage (fallback sur 'text' si non spécifié)
  const lang = language?.toLowerCase() || 'text'
  
  // Mapping des langages courants
  const languageMap: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'sh': 'bash',
    'shell': 'bash',
    'yml': 'yaml',
    'md': 'markdown',
  }
  
  const displayLanguage = languageMap[lang] || lang

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      {/* Header avec le nom du langage et bouton copier */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-mono text-gray-400 uppercase">
          {displayLanguage}
        </span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copié !</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copier</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code avec coloration syntaxique */}
      <SyntaxHighlighter
        language={displayLanguage}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: '#1e1e1e', // Fond VS Code
          fontSize: '0.9rem',
          lineHeight: '1.6',
          borderRadius: 0,
        }}
        showLineNumbers={children.split('\n').length > 3}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#6e7681',
          userSelect: 'none',
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}

/**
 * Composant pour le code inline (dans une ligne de texte)
 */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
      {children}
    </code>
  )
}
