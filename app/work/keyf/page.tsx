import Link from "next/link";

export default function KeyfPage() {
  return (
    <main className="min-h-screen bg-[#14181A] px-4 py-12 md:px-8 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/work"
          className="text-[#7FA39A] hover:text-[#6B8B82] transition-colors mb-8 inline-block"
        >
          ← Back to Work
        </Link>

        <h1 className="text-4xl md:text-5xl font-mono font-bold text-[#F7F9FA] mb-4">
          KEYF Coffee & Brunch
          <span className="text-[#7FA39A]">.</span>
        </h1>

        <div className="text-[#7FA39A] text-sm font-mono mb-8">
          Coffee Brand Website · WordPress · Custom Design
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-[#0D1A17] rounded-2xl overflow-hidden mb-8 border border-[#7FA39A]/20">
          <video
            src="/videos/keyf-preview.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h2 className="text-xl font-bold text-[#F7F9FA] mb-4">Project Overview</h2>
          <p className="text-[#F7F9FA]/70 leading-relaxed mb-4">
            KEYF Coffee & Brunch is a custom-designed web platform built for an artisanal 
            coffee and brunch brand. It serves as an inviting digital retreat focused on 
            conveying quality, warmth, and the simple pleasure of slowing down.
          </p>
          <p className="text-[#F7F9FA]/70 leading-relaxed">
            The platform showcases artisanal coffee, 18-hour cold brew lineups, a full 
            brunch menu, and grab-and-go options — all within a warm, dark-toned aesthetic 
            that reflects the brand's identity.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Key Features</h3>
            <ul className="space-y-2 text-[#F7F9FA]/70 text-sm">
              <li>✅ Custom-coded responsive HTML5/CSS3 templates</li>
              <li>✅ Integrated seamlessly with WordPress + Elementor</li>
              <li>✅ Artisanal coffee and 18-hour cold brew showcase</li>
              <li>✅ Full brunch menu and grab-and-go options</li>
              <li>✅ Full-width dark and warm-toned aesthetic</li>
              <li>✅ Playfair Display + Poppins typography</li>
              <li>✅ Mobile-first responsive design</li>
              <li>✅ Optimized headers and footers</li>
            </ul>
          </div>

          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                WordPress
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Elementor
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                HTML5
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                CSS3
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Playfair Display
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Poppins
              </span>
            </div>
          </div>
        </div>

        {/* SEO & Performance Section */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">SEO & Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">🔍 Local SEO Optimization</h4>
              <p className="text-[#F7F9FA]/50 text-xs">
                Optimized for local search visibility targeting coffee and brunch enthusiasts 
                in the area. Structured with clean semantic markup for better search engine 
                understanding.
              </p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">⚡ Performance & Speed</h4>
              <p className="text-[#F7F9FA]/50 text-xs">
                Fast-loading media elements, interconnected site navigation, and full-width 
                layouts engineered to fix responsive margin issues within WordPress container 
                settings.
              </p>
            </div>
          </div>
        </div>

        {/* Design Section */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">Design & UX</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">🎨 Visual Aesthetic</h4>
              <p className="text-[#F7F9FA]/50 text-xs">
                Full-width dark and warm-toned aesthetic creating an inviting, cozy digital 
                retreat that reflects the brand's quality and warmth.
              </p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">📱 Mobile-First</h4>
              <p className="text-[#F7F9FA]/50 text-xs">
                Smooth mobile-first responsive design ensuring a seamless experience across 
                all devices — from desktop to smartphone.
              </p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">✒️ Typography</h4>
              <p className="text-[#F7F9FA]/50 text-xs">
                Playfair Display for elegant headings paired with Poppins for clean, readable 
                body text — creating a sophisticated brand voice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}