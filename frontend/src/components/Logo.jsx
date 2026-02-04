export default function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="inline-block relative">
        {/* Logo Container with decorative elements */}
        <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 shadow-2xl border-4 border-blue-900">
          {/* Decorative sparkles */}
          <div className="absolute -top-2 -left-2 text-3xl animate-pulse">✨</div>
          <div className="absolute -top-2 -right-2 text-3xl animate-pulse delay-75">✨</div>
          <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse delay-150">✨</div>
          <div className="absolute -bottom-2 -right-2 text-3xl animate-pulse delay-300">✨</div>
          
          {/* Logo Text */}
          <div className="flex items-center gap-3">
            {/* Quote Icon */}
            <div className="text-6xl text-[#FFF9E5]">"</div>
            
            {/* Text */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white leading-none mb-1">
                Quote
              </h1>
              <p className="text-2xl md:text-3xl font-inter font-light text-[#FEF8AD]">
                of the Day
              </p>
            </div>
            
            {/* Quote Icon */}
            <div className="text-6xl text-[#FFF9E5] self-end">"</div>
          </div>
        </div>
        
        {/* Tagline */}
        <p className="mt-4 text-blue-900 font-inter font-semibold text-lg">
          Daily Inspiration • Timeless Wisdom
        </p>
      </div>
    </div>
  )
}
