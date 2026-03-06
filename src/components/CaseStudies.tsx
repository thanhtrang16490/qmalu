/**
 * CaseStudies Component
 * 
 * Showcases successful projects with before/after photos, results, and testimonials.
 * Designed for B2B credibility building.
 */

import React from 'react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  capacity: string;
  image: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    icon: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  // Mobile optimization: Show only 2 case studies on mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const displayedCaseStudies = isMobile ? caseStudies.slice(0, 2) : caseStudies;
  
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
            Dự án tiêu biểu
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Khám phá những dự án thành công mà chúng tôi đã thực hiện cho khách hàng
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12 md:space-y-16">
          {displayedCaseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`scroll-reveal flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-6 md:gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <img
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-[250px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                    {study.capacity}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      {study.industry}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {study.location}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {study.title}
                  </h3>
                  <p className="text-lg text-gray-600">{study.client}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                      Thách thức
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                      Giải pháp
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-md text-center">
                      <div className="text-2xl md:text-3xl mb-1 md:mb-2">{result.icon}</div>
                      <div className="text-lg md:text-2xl font-bold text-primary mb-1">{result.value}</div>
                      <div className="text-[10px] md:text-xs text-gray-600 leading-tight">{result.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-6 border-l-4 border-primary">
                  <p className="text-gray-700 italic mb-4">"{study.testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                    <div className="text-sm text-gray-600">{study.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 scroll-reveal">
          <a
            href="/du-an"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <span>Xem tất cả dự án</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
