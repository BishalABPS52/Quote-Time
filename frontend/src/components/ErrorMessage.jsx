export default function ErrorMessage({ error }) {
  return (
    <div className="text-center py-32">
      <div className="text-7xl mb-8 opacity-40">⚠</div>
      <p className="text-[#E1D9BC] text-3xl font-serif mb-6 animate-fadeIn tracking-wider">Connection Failure</p>
      <p className="text-[#ACBAC4] text-sm font-sans animate-fadeIn animation-delay-300 opacity-60">Please check your connection and try again</p>
    </div>
  )
}
