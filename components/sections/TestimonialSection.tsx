'use client';

import { useState } from 'react';

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: 'J\'utilise ce produit depuis un mois et je peux dire honnêtement qu\'il a changé ma vie. Les résultats sont incroyables et je suis ravie. Je le recommande vivement !',
      author: 'Nikolas Brooten',
      role: 'Analyste financier',
      rating: 5,
    },
    {
      quote: 'Un service exceptionnel et des résultats au-delà de mes attentes. L\'équipe est professionnelle et à l\'écoute.',
      author: 'Marie Dupont',
      role: 'Directrice Marketing',
      rating: 5,
    },
    {
      quote: 'La qualité du travail fourni est remarquable. Je recommande sans hésitation pour tout projet créatif.',
      author: 'Pierre Martin',
      role: 'CEO StartupTech',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-6 bg-meelo-purple">
      <div className="max-w-5xl mx-auto">
        {/* Testimonial Card */}
        <div className="bg-meelo-beige rounded-3xl p-10 border-2 border-black relative">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <span key={i} className="text-2xl">⭐</span>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-center mb-6">
            <p className="text-lg lg:text-xl leading-relaxed text-gray-800">
              « {currentTestimonial.quote} »
            </p>
          </blockquote>

          {/* Author */}
          <div className="text-center">
            <div className="font-bold text-lg mb-1">
              {currentTestimonial.author}
            </div>
            <div className="text-gray-600 text-sm">
              {currentTestimonial.role}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextTestimonial}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
            aria-label="Témoignage suivant"
          >
            <span className="text-xl">→</span>
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-black w-8' : 'bg-gray-400'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
