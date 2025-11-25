import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brianbiendou.com'),
  title: {
    default: "Brian Biendou - Software Engineer | Développeur Full Stack | IA & Data",
    template: "%s | Brian Biendou"
  },
  description: "Brian Biendou, Software Engineer diplômé INSA Toulouse. Ex-Airbus, Sopra Steria, Weenav. Expert en développement web, applications mobiles, chatbots IA, intelligence artificielle, machine learning, Python, React, Next.js. Freelance disponible pour vos projets digitaux.",
  keywords: [
    // Nom et variations
    "Brian Biendou",
    "Biendou Brian", 
    "Brian BIENDOU",
    "BIENDOU Brian",
    "B. Biendou",
    
    // Avec entreprises/écoles
    "Brian Biendou Airbus",
    "Biendou Brian Airbus",
    "Brian Biendou INSA Toulouse",
    "Brian BIENDOU INSA",
    "Brian Biendou Sopra Steria",
    "Brian Biendou Weenav",
    "Brian Biendou Messages",
    
    // Titres professionnels
    "Software Engineer",
    "Développeur Full Stack",
    "Ingénieur logiciel",
    "Développeur web",
    "Développeur Python",
    "Développeur React",
    "Développeur Next.js",
    "Ingénieur IA",
    "Data Engineer",
    "Machine Learning Engineer",
    
    // Compétences techniques
    "Python développeur",
    "React développeur",
    "Next.js expert",
    "TypeScript développeur",
    "JavaScript expert",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "Scikit-learn",
    "Azure Cloud",
    "Docker",
    "FastAPI",
    "LangChain",
    
    // Services
    "Création site internet",
    "Développement application mobile",
    "Chatbot IA entreprise",
    "Intelligence artificielle",
    "Machine learning",
    "Deep learning",
    "Automatisation",
    "Solution CRM",
    "Dashboard data",
    "Analyse de données",
    
    // Localisation
    "Développeur Toulouse",
    "Freelance Toulouse",
    "Ingénieur France",
    "Développeur freelance",
    
    // Combinaisons
    "créer chatbot IA",
    "développer site web",
    "application mobile sur mesure",
    "solution digitale entreprise"
  ],
  authors: [{ name: "Brian Biendou", url: "https://www.linkedin.com/in/brian-biendou-429106201/" }],
  creator: "Brian Biendou",
  publisher: "Brian Biendou",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Brian Biendou - Portfolio",
    title: "Brian Biendou - Software Engineer | Développeur Full Stack | IA & Data",
    description: "Software Engineer diplômé INSA Toulouse. Ex-Airbus, Sopra Steria. Expert en développement web, IA, chatbots, applications mobiles. Disponible en freelance.",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Brian Biendou - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Biendou - Software Engineer | IA & Data",
    description: "Software Engineer diplômé INSA Toulouse. Expert développement web, IA, chatbots. Disponible en freelance.",
    images: ["/logo1.png"],
    creator: "@brianbiendou",
  },
  alternates: {
    canonical: "https://brianbiendou.com",
  },
  category: "technology",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
  verification: {
    google: "votre-code-google-search-console", // À remplacer après inscription
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Schema.org JSON-LD pour Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Brian Biendou",
              alternateName: ["Biendou Brian", "B. Biendou", "Brian BIENDOU"],
              jobTitle: "Software Engineer",
              description: "Software Engineer diplômé de l'INSA Toulouse, spécialisé en développement web, intelligence artificielle, machine learning et applications mobiles.",
              url: "https://brianbiendou.com",
              image: "/logo1.png",
              sameAs: [
                "https://www.linkedin.com/in/brian-biendou-429106201/",
                "https://github.com/biendoubrian23"
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "INSA Toulouse",
                alternateName: "Institut National des Sciences Appliquées de Toulouse"
              },
              worksFor: {
                "@type": "Organization",
                name: "Freelance"
              },
              knowsAbout: [
                "Software Engineering",
                "Web Development",
                "Artificial Intelligence",
                "Machine Learning",
                "Python",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "TensorFlow",
                "PyTorch",
                "Docker",
                "Azure",
                "Chatbot Development",
                "Mobile App Development",
                "Data Engineering",
                "FastAPI",
                "LangChain"
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Software Engineer",
                skills: "Python, React, Next.js, TypeScript, TensorFlow, PyTorch, Azure, Docker, FastAPI, LangChain"
              }
            })
          }}
        />
        {/* Schema pour les services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Brian Biendou - Services Développement",
              description: "Services de développement web, applications mobiles, chatbots IA et solutions data",
              provider: {
                "@type": "Person",
                name: "Brian Biendou"
              },
              areaServed: {
                "@type": "Country",
                name: "France"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services de développement",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Développement de sites web",
                      description: "Création de sites internet modernes et performants avec Next.js et React"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Chatbots IA",
                      description: "Développement de chatbots intelligents avec LangChain et OpenAI"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Applications mobiles",
                      description: "Création d'applications mobiles cross-platform"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Solutions Data & IA",
                      description: "Machine Learning, analyse de données, dashboards avec Python, TensorFlow, PyTorch"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
