export default function ActionButtons({ onNewQuote, loading }) {
  return (
    <div className="flex justify-center mt-8 mb-6">
      <button
        onClick={onNewQuote}
        disabled={loading}
        className="group relative px-8 py-3 bg-transparent border border-[#ACBAC4]/40 text-[#ACBAC4] font-sans text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:border-[#E1D9BC] hover:text-[#E1D9BC] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
      >
        <span className="relative z-10">Refresh</span>
        <div className="absolute inset-0 bg-[#ACBAC4]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
      </button>
    </div>
  )
}
