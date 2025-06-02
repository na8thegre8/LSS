export default function TrustStrip() {
  return (
    <section className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-gray-500 text-sm">Scanning data from</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 items-center">
          <div className="text-gray-500 font-medium">LoopNet</div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 font-medium">Crexi</div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 font-medium">FB Marketplace</div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 font-medium">Craigslist</div>
          <div className="text-gray-400">•</div>
          <div className="text-gray-500 font-medium">+7 more</div>
        </div>
      </div>
    </section>
  )
}
