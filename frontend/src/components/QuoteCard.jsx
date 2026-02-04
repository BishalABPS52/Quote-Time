export default function QuoteCard({ quote, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 md:py-32">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 md:h-20 md:w-20 border-t-4 border-b-4 border-[#ACBAC4]"></div>
          <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 md:h-20 md:w-20 border-4 border-[#E1D9BC] opacity-20"></div>
        </div>
        <p className="text-[#ACBAC4] font-serif text-lg md:text-xl mt-6 md:mt-8 animate-pulse">Loading inspiration...</p>
      </div>
    )
  }

  if (!quote) return null

  return (
    <div className="relative px-3 sm:px-4 md:px-6 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-16">
      {/* Animated decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-6 left-6 w-16 lg:w-20 h-16 lg:h-20 border-l-2 border-t-2 border-[#ACBAC4] opacity-40 animate-fadeIn"></div>
      <div className="hidden md:block absolute bottom-6 right-6 w-16 lg:w-20 h-16 lg:h-20 border-r-2 border-b-2 border-[#ACBAC4] opacity-40 animate-fadeIn animation-delay-300"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 md:w-48 h-24 sm:h-32 md:h-48 bg-[#E1D9BC] rounded-full opacity-5 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 bg-[#ACBAC4] rounded-full opacity-5 blur-3xl animate-float animation-delay-500"></div>
      
      <div className="text-center relative z-10">
        {/* Opening Quote Mark */}
        <div className="text-[#E1D9BC] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-4 md:mb-5 leading-none opacity-60 animate-fadeInDown">
          &ldquo;
        </div>
        
        {/* Quote Content - responsive sizing */}
        <blockquote className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-serif text-[#F0F0DB] mb-6 sm:mb-7 md:mb-8 leading-relaxed font-light tracking-wide animate-fadeInUp animation-delay-200 px-2" style={{ fontFamily: '"Playfair Display", "Crimson Text", serif' }}>
          {quote.content}
        </blockquote>
        
        {/* Closing Quote Mark */}
        <div className="text-[#E1D9BC] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 sm:mb-7 md:mb-8 leading-none opacity-60 flex justify-end animate-fadeInDown animation-delay-400">
          &rdquo;
        </div>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-6 md:mb-8 animate-fadeIn animation-delay-600 -mt-[50px]">
          <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-[#ACBAC4] to-transparent"></div>
          <div className="mx-3 md:mx-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-[#ACBAC4] rounded-full"></div>
          <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-[#ACBAC4] to-transparent"></div>
        </div>
        
        {/* Author Section */}
        <div className="animate-fadeInUp animation-delay-800">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-[#ACBAC4] tracking-widest uppercase font-light px-4">
            {quote.author}
          </p>
          
          {/* Category and Tags */}
          {quote.tags && quote.tags.length > 0 && (
            <div className="mt-3 md:mt-4 px-4">
              {/* Main Category (first tag) */}
              <div className="mb-2">
                <span className="inline-block bg-gradient-to-r from-[#ACBAC4]/20 to-[#E1D9BC]/20 text-[#F0F0DB] px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-sans tracking-widest uppercase border border-[#ACBAC4]/40 rounded-sm">
                  {quote.tags[0]}
                </span>
              </div>
              
              {/* Other tags */}
              {quote.tags.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {quote.tags.slice(1, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-[#E1D9BC] px-3 py-1 text-xs font-sans tracking-wider uppercase opacity-50"
                      style={{ animationDelay: `${index * 100 + 1000}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
